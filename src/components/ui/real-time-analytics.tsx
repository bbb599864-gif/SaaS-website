"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface DataPoint {
  time: number
  value: number
}

export function RealTimeAnalytics({ 
  title = "Real-time Activity", 
  subtitle = "Live performance metrics",
  height = 300,
  className = ""
}: { 
  title?: string, 
  subtitle?: string,
  height?: number,
  className?: string
}) {
  const [data, setData] = useState<DataPoint[]>([])
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [containerWidth, setContainerWidth] = useState(800)

  const maxPoints = 30
  const padding = { top: 20, right: 20, bottom: 40, left: 50 }

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width)
        }
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Initialize with some data
    const initial: DataPoint[] = []
    for (let i = 0; i < 20; i++) {
      initial.push({
        time: Date.now() - (20 - i) * 1000,
        value: 30 + Math.random() * 40,
      })
    }
    setData(initial)

    // Add new data points every second
    const interval = setInterval(() => {
      setData((prev) => {
        const newPoint: DataPoint = {
          time: Date.now(),
          value: Math.max(10, Math.min(90, (prev[prev.length - 1]?.value || 50) + (Math.random() - 0.5) * 20)),
        }
        const updated = [...prev, newPoint]
        return updated.slice(-maxPoints)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getX = (time: number) => {
    if (data.length < 2) return padding.left
    const minTime = data[0]?.time || 0
    const maxTime = data[data.length - 1]?.time || 1
    const range = maxTime - minTime || 1
    return padding.left + ((time - minTime) / range) * (containerWidth - padding.left - padding.right)
  }

  const getY = (value: number) => {
    return padding.top + (1 - value / 100) * (height - padding.top - padding.bottom)
  }

  const getPath = () => {
    if (data.length < 2) return ""
    return data
      .map((point, i) => {
        const x = getX(point.time)
        const y = getY(point.value)
        return `${i === 0 ? "M" : "L"} ${x},${y}`
      })
      .join(" ")
  }

  const getAreaPath = () => {
    if (data.length < 2) return ""
    const linePath = getPath()
    const lastX = getX(data[data.length - 1].time)
    const firstX = getX(data[0].time)
    const bottomY = height - padding.bottom
    return `${linePath} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    // Find closest point
    let closest: DataPoint | null = null
    let minDist = Number.POSITIVE_INFINITY
    data.forEach((point) => {
      const px = getX(point.time)
      const dist = Math.abs(px - x)
      if (dist < minDist && dist < 30) {
        minDist = dist
        closest = point
      }
    })
    setHoveredPoint(closest)
  }

  const currentValue = data[data.length - 1]?.value || 0

  return (
    <div className={`w-full ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flowGradient {
          0% { stop-color: #6366f1; }
          50% { stop-color: #8b5cf6; }
          100% { stop-color: #6366f1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; r: 6; }
          50% { opacity: 0.7; r: 8; }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .flowing-line {
          stroke-dasharray: 1000;
          animation: drawLine 2s ease-out forwards;
        }
        .data-dot {
          animation: pulse 2s ease-in-out infinite;
        }
        .glow {
          filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.6));
        }
      `}} />

      <div className="w-full">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">{title}</h2>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{subtitle}</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Live: {currentValue.toFixed(1)}%</span>
          </div>
        </div>

        <div ref={containerRef} className="bg-slate-50/30 rounded-xl p-4 relative overflow-hidden border border-slate-100/50">
          <svg
            ref={svgRef}
            width="100%"
            height={height}
            viewBox={`0 0 ${containerWidth} ${height}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredPoint(null)}
            style={{ cursor: "crosshair" }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6">
                  <animate
                    attributeName="stop-color"
                    values="#3b82f6;#8b5cf6;#3b82f6"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor="#8b5cf6">
                  <animate
                    attributeName="stop-color"
                    values="#8b5cf6;#a855f7;#8b5cf6"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#a855f7">
                  <animate
                    attributeName="stop-color"
                    values="#a855f7;#3b82f6;#a855f7"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((val) => (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={getY(val)}
                  x2={containerWidth - padding.right}
                  y2={getY(val)}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 10}
                  y={getY(val)}
                  fill="#94a3b8"
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {val}%
                </text>
              </g>
            ))}

            {/* Area fill */}
            <path d={getAreaPath()} fill="url(#areaGradient)" />

            {/* Main line */}
            <path
              className="flowing-line glow"
              d={getPath()}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {data.map((point, i) => (
              <circle
                key={point.time}
                className={i === data.length - 1 ? "data-dot" : ""}
                cx={getX(point.time)}
                cy={getY(point.value)}
                r={i === data.length - 1 ? 6 : 3}
                fill={i === data.length - 1 ? "#a855f7" : "#3b82f6"}
                style={{
                  opacity: hoveredPoint?.time === point.time ? 1 : 0.7,
                  transition: "opacity 0.2s ease",
                }}
              />
            ))}

            {/* Hover crosshair */}
            {hoveredPoint && (
              <>
                <line
                  x1={getX(hoveredPoint.time)}
                  y1={padding.top}
                  x2={getX(hoveredPoint.time)}
                  y2={height - padding.bottom}
                  stroke="#3b82f6"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
                <circle
                  cx={getX(hoveredPoint.time)}
                  cy={getY(hoveredPoint.value)}
                  r="8"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                />
              </>
            )}
          </svg>

          {/* Tooltip */}
          {hoveredPoint && (
            <div
              style={{
                position: "absolute",
                left: getX(hoveredPoint.time),
                top: getY(hoveredPoint.value) - 60,
                transform: "translateX(-50%)",
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "8px 12px",
                pointerEvents: "none",
                zIndex: 10,
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
              }}
            >
              <div style={{ color: "#1e293b", fontWeight: "700", fontSize: "14px" }}>
                {hoveredPoint.value.toFixed(1)}%
              </div>
              <div style={{ color: "#64748b", fontSize: "11px", fontWeight: "500" }}>
                {new Date(hoveredPoint.time).toLocaleTimeString()}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            {
              label: "Average",
              value: (data.reduce((a, b) => a + b.value, 0) / data.length || 0).toFixed(1),
              unit: "%",
              color: "text-blue-600",
              bg: "bg-blue-50/50"
            },
            { 
              label: "Peak", 
              value: Math.max(...data.map((d) => d.value), 0).toFixed(1), 
              unit: "%",
              color: "text-purple-600",
              bg: "bg-purple-50/50"
            },
            { 
              label: "Samples", 
              value: data.length.toString(), 
              unit: "",
              color: "text-slate-600",
              bg: "bg-slate-50/50"
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-xl p-3 text-left border border-slate-100/50 transition-all hover:shadow-sm`}
            >
              <div className="text-[9px] text-slate-400 mb-1 font-bold uppercase tracking-widest">{stat.label}</div>
              <div className={`text-lg font-bold ${stat.color}`}>
                {stat.value}
                <span className="text-[10px] ml-0.5 opacity-70">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
