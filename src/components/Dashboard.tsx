import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  ChevronUp, 
  Settings, 
  Bookmark, 
  Maximize2, 
  Grid, 
  ArrowUpRight, 
  MoreHorizontal,
  Package,
  BarChart3,
  Cpu,
  TrendingUp,
  Users,
  Activity,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react';

// --- MOCK DATA ---

const mockRobots = [
  {
    id: "Haulix – №52561",
    status: "available",
    battery: 72,
    expanded: true,
    tasks: [
      { pattern: "FA", number: "№154251", weight: "120kg", status: "done" },
      { pattern: "A",  number: "№674314", weight: "320kg", status: "done" },
      { pattern: "BF", number: "№753215", weight: "54kg",  status: "error" },
    ],
  },
  {
    id: "Haulix – №98645",
    status: "employed",
    battery: 34,
    expanded: true,
    tasks: [
      { pattern: "FA", number: "№814532", weight: "244kg", status: "processing" },
      { pattern: "MS", number: "№745888", weight: "20kg",  status: "done" },
    ],
  },
  { id: "Haulix – №57215", status: "available", battery: 88, expanded: false, tasks: [] },
  { id: "Haulix – №28941", status: "employed",  battery: 51, expanded: false, tasks: [] },
];

const workloadBars = [18,32,45,28,55,68,42,76,58,34,62,80,47,39,71,53,28,45,66,38,52,74,60,42,35,58,72,49,37,63,55,41,69,48,36,60,44,33,57,50];
const ordersData   = [40,55,42,68,73,58,80,92,78,65,88,95,72,60,85,90,76,82,70,88,94,79,67,83,91,86,75,80,87,93,77,69,84,96,88,74,91,85,78,95];

// --- COMPONENTS ---

const Logo = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
    <rect x="0" y="0" width="10" height="10" rx="2" fill="#3b82f6"/>
    <rect x="12" y="0" width="16" height="10" rx="2" fill="#3b82f6" opacity="0.6"/>
    <rect x="0" y="12" width="16" height="10" rx="2" fill="#3b82f6" opacity="0.4"/>
    <rect x="18" y="12" width="10" height="10" rx="2" fill="#3b82f6"/>
  </svg>
);

const RobotIconSVG = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="2" y="4" width="10" height="7" rx="2" fill="#9ca3af"/>
    <rect x="4" y="2" width="6" height="3" rx="1" fill="#9ca3af"/>
    <circle cx="4.5" cy="7.5" r="1" fill="white"/>
    <circle cx="9.5" cy="7.5" r="1" fill="white"/>
    <rect x="0" y="8" width="2" height="4" rx="1" fill="#9ca3af"/>
    <rect x="12" y="8" width="2" height="4" rx="1" fill="#9ca3af"/>
  </svg>
);

function Navbar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = ["Warehouse", "Analytics", "Robot", "Pick Rates", "Employees", "Inventory"];
  return (
    <nav className="h-[52px] bg-white border-b border-[#f0f2f5] flex items-center px-5 gap-0 relative z-50">
      <div className="flex items-center gap-2 mr-8">
        <Logo />
        <div>
          <div className="text-[13px] font-bold text-[#111827] leading-[1.1]">Navexa</div>
          <div className="text-[10px] text-[#9ca3af] leading-[1.1]">Warehouse</div>
        </div>
      </div>
      <div className="flex items-center gap-0.5 flex-1 justify-center">
        {tabs.map(t => (
          <button 
            key={t} 
            className={`px-3.5 py-1.5 text-[13px] font-medium cursor-pointer rounded-md transition-all duration-150 whitespace-nowrap border-none outline-none ${
              activeTab === t ? "text-[#111827] bg-[#f3f4f6] shadow-sm" : "text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]"
            }`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f3f4f6] text-[#6b7280]">
          <Search className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f3f4f6] text-[#6b7280] relative">
          <Bell className="w-4 h-4" />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#ef4444] rounded-full border-[1.5px] border-white" />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f3f4f6] text-[#6b7280]">
          <User className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}

function StatCard({ value, label, color, trend }: { value: string, label: string, color: string, trend?: 'up' | 'down' }) {
  const bars = [3,5,4,7,5,8,6,9,7,10,8,6];
  return (
    <div className="flex items-center gap-3">
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-[26px] font-bold text-[#111827] tracking-tighter leading-none">{value}</span>
          <div className={`w-[7px] h-[7px] rounded-full ${color === "#ef4444" ? "bg-[#ef4444] pulse" : "bg-[#22c55e]"}`} />
        </div>
        <div className="text-[12px] text-[#9ca3af] mt-0.5 leading-none">{label}</div>
      </div>
      <div className="flex items-end gap-0.5 h-[30px] w-[52px]">
        {bars.map((h, i) => (
          <div 
            key={i} 
            className="w-1 rounded-t-[2px] bg-[#22c55e]" 
            style={{ 
              height: `${h * 3}px`, 
              opacity: i > bars.length - 4 ? 1 : 0.5 
            }} 
          />
        ))}
      </div>
    </div>
  );
}

function StatsHeader() {
  return (
    <div className="flex items-center gap-9">
      <StatCard value="72" label="Robots" color="#22c55e" />
      <div className="w-px h-9 bg-[#e5e7eb]" />
      <StatCard value="30" label="Associates" color="#22c55e" />
      <div className="w-px h-9 bg-[#e5e7eb]" />
      <StatCard value="345" label="Throughput" color="#ef4444" />
    </div>
  );
}

function BlueBlock({ cols = 8, rows = 6, width = 130, height = 100 }) {
  return (
    <div className="grid-node-blue rounded-[10px] overflow-hidden" style={{ width, height }}>
      <div className="grid gap-[2px] p-1.5 h-full" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div key={i} className="bg-white/18 rounded-[1px]" />
        ))}
      </div>
    </div>
  );
}

function GreenBlock({ cols = 6, rows = 5, width = 90, height = 70 }) {
  return (
    <div className="grid-node-green rounded-[8px] overflow-hidden" style={{ width, height }}>
      <div className="grid gap-[2px] p-1.5 h-full" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div key={i} className="bg-white/20 rounded-[1px]" />
        ))}
      </div>
    </div>
  );
}

function ShelfUnit({ width = 44, height = 66 }) {
  return (
    <div className="grid-node-white rounded-[8px] overflow-hidden" style={{ width, height }}>
      <div className="flex flex-col gap-[3px] p-1.25 h-full">
        {Array.from({ length: 5 }).map((_, r) => (
          <div key={r} className="flex gap-[2px]">
            {Array.from({ length: 2 }).map((_, c) => (
              <div key={c} className="flex-1 h-2 bg-[#e2e8f0] rounded-[1px] border border-[#cbd5e1]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniBot({ hasAlert = false }: { hasAlert?: boolean }) {
  return (
    <div className="flex flex-col items-center relative">
      {hasAlert && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#ef4444] rounded-full flex items-center justify-center text-white text-[9px] font-bold shadow-[0_0_0_2px_white]">!</div>
      )}
      <div className="minibot-body">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="1" y="2" width="14" height="8" rx="2" fill="#d1d5db"/>
          <rect x="4" y="0" width="8" height="3" rx="1" fill="#d1d5db"/>
          <circle cx="5" cy="6" r="1.5" fill="#9ca3af"/>
          <circle cx="11" cy="6" r="1.5" fill="#9ca3af"/>
        </svg>
      </div>
      <div className="flex gap-2.5 mt-[1px]">
        <div className="w-2 h-[5px] bg-[#9ca3af] rounded-[3px]" />
        <div className="w-2 h-[5px] bg-[#9ca3af] rounded-[3px]" />
      </div>
    </div>
  );
}

function WarehouseGrid() {
  return (
    <div className="relative flex-1 overflow-hidden bg-transparent">
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 400" preserveAspectRatio="none">
        {/* Row 1 green connection lines */}
        <line x1="50" y1="60" x2="195" y2="60" stroke="#22c55e" strokeWidth="1.5"/>
        <circle cx="195" cy="60" r="3.5" fill="#22c55e"/>
        <line x1="225" y1="60" x2="360" y2="60" stroke="#22c55e" strokeWidth="1.5"/>
        <circle cx="360" cy="60" r="3.5" fill="#22c55e"/>
        <line x1="390" y1="60" x2="545" y2="60" stroke="#22c55e" strokeWidth="1.5"/>
        <circle cx="545" cy="60" r="3.5" fill="#22c55e"/>

        {/* Vertical drops */}
        <line x1="210" y1="60" x2="210" y2="100" stroke="#22c55e" strokeWidth="1.5"/>
        <line x1="375" y1="60" x2="375" y2="100" stroke="#22c55e" strokeWidth="1.5"/>

        {/* Row 2 */}
        <line x1="50" y1="105" x2="175" y2="105" stroke="#22c55e" strokeWidth="1.5"/>
        <circle cx="175" cy="105" r="3" fill="#22c55e"/>
        <line x1="205" y1="105" x2="350" y2="105" stroke="#22c55e" strokeWidth="1.5"/>
        <circle cx="350" cy="105" r="3" fill="#22c55e"/>

        {/* Red lines (right side) */}
        <line x1="580" y1="60" x2="680" y2="60" stroke="#ef4444" strokeWidth="1.5"/>
        <circle cx="680" cy="60" r="3.5" fill="#ef4444"/>
        <line x1="710" y1="60" x2="780" y2="60" stroke="#ef4444" strokeWidth="1.5"/>
        <line x1="680" y1="60" x2="680" y2="100" stroke="#ef4444" strokeWidth="1.5"/>
        <circle cx="740" cy="105" r="3" fill="#22c55e"/>
        <line x1="580" y1="105" x2="740" y2="105" stroke="#22c55e" strokeWidth="1.5"/>

        {/* Row 3 connector */}
        <line x1="50" y1="170" x2="175" y2="170" stroke="#22c55e" strokeWidth="1.5"/>
        <line x1="205" y1="170" x2="350" y2="170" stroke="#22c55e" strokeWidth="1.5"/>
        <line x1="380" y1="170" x2="560" y2="170" stroke="#22c55e" strokeWidth="1.5"/>
        <line x1="590" y1="170" x2="780" y2="170" stroke="#22c55e" strokeWidth="1.5"/>

        {/* Vertical connectors row 2-3 */}
        <line x1="87" y1="105" x2="87" y2="165" stroke="#22c55e" strokeWidth="1.5"/>
        <line x1="370" y1="105" x2="370" y2="165" stroke="#22c55e" strokeWidth="1.5"/>
        <line x1="600" y1="105" x2="600" y2="165" stroke="#22c55e" strokeWidth="1.5"/>
        <circle cx="600" cy="165" r="3" fill="#22c55e"/>
      </svg>

      {/* Row 1: Blue storage blocks */}
      <div className="absolute top-[10px] left-[10px] flex items-center gap-[14px] z-[2]">
        <BlueBlock cols={8} rows={6} width={130} height={100} />
        <BlueBlock cols={8} rows={6} width={130} height={100} />
        <BlueBlock cols={8} rows={6} width={130} height={100} />
        <BlueBlock cols={7} rows={6} width={120} height={100} />
        {/* Shelf units */}
        <div className="flex gap-1.5">
          <ShelfUnit width={40} height={90} />
          <ShelfUnit width={40} height={90} />
        </div>
        <BlueBlock cols={7} rows={5} width={120} height={90} />
      </div>

      {/* Row 1 robots */}
      <div className="absolute top-[122px] left-[16px] z-[3]">
        <MiniBot />
      </div>
      <div className="absolute top-[122px] left-[165px] z-[3]">
        <MiniBot hasAlert />
      </div>
      <div className="absolute top-[122px] left-[320px] z-[3]">
        <MiniBot />
      </div>

      {/* Row 2: Mixed blocks */}
      <div className="absolute top-[158px] left-[10px] flex items-center gap-[10px] z-[2]">
        {/* Green block left */}
        <div className="flex gap-[3px]">
          <GreenBlock cols={5} rows={4} width={76} height={58} />
          <GreenBlock cols={5} rows={4} width={76} height={58} />
        </div>
        <GreenBlock cols={6} rows={5} width={90} height={64} />
        <GreenBlock cols={6} rows={5} width={90} height={64} />
        <GreenBlock cols={6} rows={5} width={90} height={64} />
        <div className="flex gap-[3px]">
          <ShelfUnit width={38} height={60} />
          <ShelfUnit width={38} height={60} />
        </div>
        <GreenBlock cols={6} rows={5} width={88} height={64} />
      </div>

      {/* Floating info card */}
      <div className="absolute top-10 right-[120px] z-10">
        <div className="bg-white rounded-xl p-[10px_14px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-[#f0f2f5] w-40">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-[#f3f4f6] rounded-md flex items-center justify-center text-sm">
              <RobotIconSVG />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#111827]">Haulix – №64854</div>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                <span className="text-[10px] text-[#6b7280]">Available</span>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex justify-between mb-[3px]">
              <span className="text-[10px] text-[#6b7280]">Battery life</span>
              <span className="text-[10px] font-semibold text-[#111827]">54%</span>
            </div>
            <div className="h-1 bg-[#e5e7eb] rounded-full overflow-hidden flex-1">
              <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: "54%" }} />
            </div>
            <div className="flex justify-end mt-0.5">
              <span className="text-[9px] text-[#9ca3af]">▼</span>
            </div>
          </div>
          <div className="bg-[#f9fafb] rounded-[7px] p-[5px_8px] flex items-center justify-center">
            <span className="text-[11px] font-medium text-[#374151]">On the base</span>
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute right-2 top-[45%] flex flex-col gap-1 z-10">
        <button className="w-7 h-7 bg-white border border-[#e5e7eb] rounded-md flex items-center justify-center cursor-pointer text-[#374151] text-sm font-normal transition-colors hover:bg-[#f9fafb] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">+</button>
        <button className="w-7 h-7 bg-white border border-[#e5e7eb] rounded-md flex items-center justify-center cursor-pointer text-[#374151] text-sm font-normal transition-colors hover:bg-[#f9fafb] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">−</button>
      </div>
      <div className="absolute right-2 top-[60%] z-10">
        <button className="w-7 h-7 bg-white border border-[#e5e7eb] rounded-md flex items-center justify-center cursor-pointer text-[#374151] text-sm font-normal transition-colors hover:bg-[#f9fafb] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <Maximize2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function TaskRow({ pattern, number, weight, status }: { pattern: string, number: string, weight: string, status: string }) {
  const dot = pattern.length > 1 ? "#22c55e" : "#3b82f6";
  return (
    <div className="flex items-center gap-1.5 py-[3px]">
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: status === "error" ? "#ef4444" : dot }} />
      <span className="text-[10.5px] font-medium text-[#374151] w-5">{pattern}</span>
      <span className="text-[10px] text-[#9ca3af] flex-1">{number}</span>
      <span className="text-[10px] text-[#6b7280] w-9">{weight}</span>
      <span className={`text-[10px] font-semibold px-[7px] py-[2px] rounded-[4px] ${
        status === "done" ? "bg-[#dcfce7] text-[#16a34a]" : 
        status === "error" ? "bg-[#fee2e2] text-[#dc2626]" : 
        "bg-[#f3f4f6] text-[#6b7280]"
      }`}>
        {status === "done" ? "Done" : status === "error" ? "Error" : "···"}
      </span>
      <div className="cursor-pointer text-[#d1d5db] text-xs flex items-center">
        <MoreHorizontal className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}

function RobotCard({ robot }: { robot: any }) {
  const [expanded, setExpanded] = useState(robot.expanded);
  const isAvailable = robot.status === "available";
  return (
    <div className="rounded-[10px] transition-colors hover:bg-[#f9fafb] p-[8px_10px]">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="w-[30px] h-[30px] bg-[#f3f4f6] rounded-[7px] flex items-center justify-center flex-shrink-0">
          <RobotIconSVG />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11.5px] font-semibold text-[#111827] whitespace-nowrap overflow-hidden text-overflow-ellipsis">{robot.id}</div>
          <div className="flex items-center gap-1 mt-0.5">
            <div className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-[#22c55e]" : "bg-[#ef4444]"}`} />
            <span className="text-[10px] text-[#6b7280] capitalize">{robot.status}</span>
          </div>
        </div>
        <div className="text-[#9ca3af]">{expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}</div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 pt-2 border-t border-[#f3f4f6] overflow-hidden"
          >
            <div className="mb-1.5">
              <div className="flex justify-between mb-[3px]">
                <span className="text-[10px] text-[#6b7280]">Battery life</span>
                <span className={`text-[10px] font-semibold ${robot.battery < 40 ? "text-[#ef4444]" : "text-[#111827]"}`}>{robot.battery}%</span>
              </div>
              <div className="h-1 bg-[#e5e7eb] rounded-full overflow-hidden flex-1">
                <div className={`h-full rounded-full ${robot.battery < 40 ? "bg-[#f59e0b]" : "bg-[#22c55e]"}`} style={{ width: `${robot.battery}%` }} />
              </div>
              <div className="flex justify-end mt-0.5">
                <span className="text-[9px] text-[#9ca3af]">▼</span>
              </div>
            </div>
            {robot.tasks.length > 0 && (
              <div>
                <div className="flex py-[2px_0_4px_0] gap-1.5">
                  <span className="text-[9.5px] text-[#9ca3af] w-[26px]">Pattern</span>
                  <span className="text-[9.5px] text-[#9ca3af] flex-1">Number</span>
                  <span className="text-[9.5px] text-[#9ca3af] w-9">Weight</span>
                  <span className="text-[9.5px] text-[#9ca3af] w-10">Status</span>
                  <span className="w-3.5" />
                </div>
                {robot.tasks.map((t: any, i: number) => <TaskRow key={i} {...t} />)}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarPanel() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? mockRobots : mockRobots.filter(r => r.status === filter);
  return (
    <div className="sidebar-panel w-[270px] flex-shrink-0 flex flex-col overflow-hidden max-h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="p-[12px_14px_8px_14px] border-b border-[#f0f2f5]">
        <div className="flex items-center justify-between mb-[10px]">
          <span className="text-[13px] font-semibold text-[#111827]">Report operations</span>
          <div className="flex gap-0.5">
            <button className="w-6.5 h-6.5 rounded-md flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f3f4f6] text-[#6b7280]"><Search className="w-3.5 h-3.5" /></button>
            <button className="w-6.5 h-6.5 rounded-md flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f3f4f6] text-[#6b7280]"><Settings className="w-3.5 h-3.5" /></button>
          </div>
        </div>
        <div className="flex gap-1 p-[3px] bg-[#f3f4f6] rounded-lg">
          {["all", "available", "employed"].map(f => (
            <button 
              key={f} 
              className={`flex-1 border-none outline-none text-[11px] py-1 rounded-md cursor-pointer transition-all duration-150 ${
                filter === f ? "bg-[#111827] text-white" : "bg-transparent text-[#6b7280] hover:bg-[#f3f4f6]"
              }`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : (
                <span className="flex items-center gap-1 justify-center">
                  <div className={`w-1.25 h-1.25 rounded-full ${f === "available" ? "bg-[#22c55e]" : "bg-[#ef4444]"}`} />
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Robot list */}
      <div className="flex-1 overflow-y-auto p-[6px_8px]">
        {filtered.map((r, i) => (
          <div key={i} className="mb-0.5">
            <RobotCard robot={r} />
            {i < filtered.length - 1 && <div className="h-px bg-[#f3f4f6] mx-2 my-0.5" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniLineChart({ data, color = "#22c55e" }: { data: number[], color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 280, h = 50;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.01"/>
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts} strokeLinecap="round" strokeLinejoin="round"/>
      <polygon fill={`url(#grad-${color})`} points={`0,${h} ${pts} ${w},${h}`}/>
      <circle cx={(data.length-1)/(data.length-1)*w} cy={h - ((data[data.length-1]-min)/(max-min))*h} r="3.5" fill={color}/>
    </svg>
  );
}

function WorkloadChart() {
  const bars = workloadBars.slice(0, 28);
  const maxH = 44;
  return (
    <div className="flex gap-0.5 items-end h-[44px]">
      {bars.map((v, i) => (
        <div key={i} className="flex-1 rounded-t-[2px] opacity-80" style={{ height: `${(v / 100) * maxH}px`, background: i % 4 === 0 ? "#d1fae5" : "#22c55e" }} />
      ))}
    </div>
  );
}

function ChartCard({ title, value, unit, processed, processedPct, chartType = "bar" }: { title: string, value: string, unit: string, processed: string, processedPct: number, chartType?: "bar" | "line" }) {
  return (
    <div className="flex-1 bg-white rounded-[14px] p-[14px_16px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#f0f2f5] min-w-0">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-semibold text-[#374151]">{title}</span>
        <div className="flex gap-1">
          <button className="w-[26px] h-[26px] bg-[#f3f4f6] rounded-md flex items-center justify-center cursor-pointer text-[#6b7280] transition-colors hover:bg-[#e5e7eb]"><Grid className="w-3 h-3" /></button>
          <button className="w-[26px] h-[26px] bg-[#f3f4f6] rounded-md flex items-center justify-center cursor-pointer text-[#6b7280] transition-colors hover:bg-[#e5e7eb]"><ArrowUpRight className="w-3 h-3" /></button>
        </div>
      </div>
      <div className="flex items-end gap-3 mb-2.5">
        <div>
          <div className="flex items-baseline gap-[3px]">
            <span className="flex items-center gap-1.25">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] mb-0.5" />
              <span className="text-2xl font-bold text-[#111827] tracking-tighter leading-none">{value}</span>
            </span>
            <span className="text-[11px] text-[#9ca3af]">{unit}</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="text-[10px] text-[#9ca3af]">{processed}</span>
            <span className="text-[10px] font-semibold text-[#111827]">{processedPct}%</span>
          </div>
          <div className="h-[3px] bg-[#e5e7eb] rounded-full overflow-hidden flex-1">
            <div className="h-full bg-[#22c55e] rounded-full" style={{ width: `${processedPct}%` }} />
          </div>
          <div className="flex justify-end mt-0.5">
            <span className="text-[9px] text-[#9ca3af]">▼</span>
          </div>
        </div>
      </div>
      <div className="relative">
        {chartType === "bar" ? <WorkloadChart /> : <MiniLineChart data={ordersData} />}
        {/* Y axis labels */}
        <div className="absolute -left-3.5 top-0 flex flex-col justify-between h-full pointer-events-none">
          {["", "", ""].map((_, i) => (
            <span key={i} className="text-[8px] text-[#d1d5db]">{i === 0 ? "14k" : i === 1 ? "11k" : "8k"}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Warehouse");
  return (
    <div className="h-screen flex flex-col bg-[#e8ecf0] overflow-hidden font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden p-4 gap-3.5">
        {/* Title + Stats Row */}
        <div className="flex items-center justify-between bg-white rounded-[14px] p-[14px_20px] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3.5">
            <button className="w-7 h-7 bg-[#f3f4f6] rounded-lg flex items-center justify-center cursor-pointer text-[#6b7280] transition-colors hover:bg-[#e5e7eb]">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <div>
              <div className="text-[22px] font-bold text-[#111827] tracking-tighter leading-none">Warehouse 1</div>
              <div className="text-[10.5px] text-[#9ca3af] mt-0.5 leading-none">№412589815</div>
            </div>
          </div>

          <StatsHeader />

          <div className="flex items-center gap-2">
            <div className="flex bg-[#f3f4f6] rounded-lg p-[3px] gap-[1px]">
              <button className="px-2.5 py-1 text-[11px] font-medium rounded-[5px] cursor-pointer transition-all duration-150 bg-white text-[#111827] shadow-[0_1px_3px_rgba(0,0,0,0.12)] border-none outline-none">Floor 1</button>
              <div className="w-px bg-[#e5e7eb] my-0.5" />
              <div className="flex items-center px-1 text-[#9ca3af]"><MoreHorizontal className="w-3.5 h-3.5 rotate-90" /></div>
              <div className="w-px bg-[#e5e7eb] my-0.5" />
              <button className="px-2.5 py-1 text-[11px] font-medium rounded-[5px] cursor-pointer transition-all duration-150 text-[#9ca3af] border-none outline-none hover:text-[#111827]">Floor 2</button>
            </div>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f3f4f6] text-[#6b7280]"><Settings className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f3f4f6] text-[#6b7280]"><Bookmark className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-3.5 overflow-hidden min-h-0">
          {/* Left Sidebar */}
          <SidebarPanel />

          {/* Warehouse Map + Charts */}
          <div className="flex-1 flex flex-col gap-3.5 min-w-0">
            {/* Map Area */}
            <div className="flex-1 bg-white rounded-[14px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] relative min-h-0">
              <WarehouseGrid />
            </div>

            {/* Bottom Charts */}
            <div className="flex gap-3.5 h-[160px]">
              <ChartCard
                title="Warehouse workload"
                value="5.867"
                unit="/ uploads"
                processed="Warehouse"
                processedPct={84}
                chartType="bar"
              />
              <ChartCard
                title="Daily picked orders"
                value="125.321"
                unit="/ orders"
                processed="Processed"
                processedPct={62}
                chartType="line"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
