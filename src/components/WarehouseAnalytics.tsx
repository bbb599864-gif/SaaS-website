import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Activity, 
  Zap, 
  AlertTriangle, 
  Clock, 
  Download, 
  ChevronRight,
  LayoutGrid,
  ArrowUpRight,
  Search,
  Settings,
  Package,
  Box
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { AreaChartAnalyticsCard } from "@/components/ui/area-chart-analytics-card";
import { RealTimeAnalytics } from "@/components/ui/real-time-analytics";

interface WarehouseAnalyticsProps {
  selectedWarehouse: number | null;
  onWarehouseSelect: (id: number | null) => void;
  robots: any[];
  inventory: any[];
  tasks: any[];
  isStandalone?: boolean;
  tenantId?: string;
}

export const WarehouseAnalytics = ({ 
  selectedWarehouse, 
  onWarehouseSelect, 
  robots, 
  inventory, 
  tasks,
  isStandalone = false,
  tenantId = 'TENANT-001'
}: WarehouseAnalyticsProps) => {
  const warehouses = [1, 2, 3, 4];
  
  // If no warehouse is selected, default to the first one for detailed analysis
  useEffect(() => {
    if (selectedWarehouse === null) {
      onWarehouseSelect(1);
    }
  }, [selectedWarehouse, onWarehouseSelect]);

  const currentWarehouseId = selectedWarehouse || 1;
  const warehouseName = `Warehouse ${currentWarehouseId}`;
  
  // Filter data for the current warehouse
  const warehouseRobots = robots.filter(r => r.warehouseId === currentWarehouseId || (!r.warehouseId && r.id.includes(currentWarehouseId.toString())));
  const warehouseInventory = inventory.filter(i => i.warehouseId === currentWarehouseId || (!i.warehouseId && i.id.includes(currentWarehouseId.toString())));
  const warehouseTasks = tasks.filter(t => t.warehouseId === currentWarehouseId || (!t.warehouseId && t.id.includes(currentWarehouseId.toString())));

  // Calculate real metrics
  const avgBattery = warehouseRobots.length > 0 
    ? (warehouseRobots.reduce((acc, r) => acc + (r.battery || 0), 0) / warehouseRobots.length).toFixed(1)
    : "0";
  
  const activeRobotsCount = warehouseRobots.filter(r => r.status === 'employed').length;
  const efficiency = warehouseRobots.length > 0 
    ? Math.round((activeRobotsCount / warehouseRobots.length) * 100)
    : 0;

  const lowStockCount = warehouseInventory.filter(i => i.physicalStock < i.safetyStock).length;
  const criticalHealthCount = warehouseInventory.filter(i => (i.healthScore || 100) < 50).length;

  const abcData = [
    { name: 'Category A', value: warehouseInventory.filter(i => i.category === 'A').length, color: '#3b82f6' },
    { name: 'Category B', value: warehouseInventory.filter(i => i.category === 'B').length, color: '#a855f7' },
    { name: 'Category C', value: warehouseInventory.filter(i => i.category === 'C').length, color: '#94a3b8' },
  ];

  // Simulated performance data based on warehouse ID to make them look different
  const performanceData = [
    { name: '00:00', throughput: 1000 + (currentWarehouseId * 200), robots: 700 + (currentWarehouseId * 100) },
    { name: '04:00', throughput: 800 + (currentWarehouseId * 150), robots: 500 + (currentWarehouseId * 120) },
    { name: '08:00', throughput: 3000 + (currentWarehouseId * 500), robots: 2500 + (currentWarehouseId * 300) },
    { name: '12:00', throughput: 4500 + (currentWarehouseId * 300), robots: 4000 + (currentWarehouseId * 200) },
    { name: '16:00', throughput: 4000 + (currentWarehouseId * 200), robots: 3700 + (currentWarehouseId * 200) },
    { name: '20:00', throughput: 2500 + (currentWarehouseId * 300), robots: 2000 + (currentWarehouseId * 100) },
    { name: '23:59', throughput: 1300 + (currentWarehouseId * 200), robots: 1000 + (currentWarehouseId * 100) },
  ];

  const robotHealthData = [
    { name: 'Battery', value: Math.round(Number(avgBattery)) },
    { name: 'Motor', value: 90 + currentWarehouseId },
    { name: 'Sensors', value: 85 + (currentWarehouseId * 2) },
    { name: 'Comm', value: 95 + currentWarehouseId },
  ];

  const content = (
    <div className={`flex-1 flex gap-4 overflow-hidden ${isStandalone ? 'h-screen bg-[#e8ecf0] p-4' : ''}`}>
      {/* Internal Sidebar for Warehouse Selection */}
      <div className="w-64 bg-white rounded-2xl shadow-sm border border-[#f0f2f5] flex flex-col shrink-0 overflow-hidden">
        <div className="p-4 border-b border-[#f0f2f5]">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Select Warehouse</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {warehouses.map(id => (
            <button
              key={id}
              onClick={() => onWarehouseSelect(id)}
              className={`w-full p-3 rounded-xl flex items-center justify-between transition-all ${
                selectedWarehouse === id 
                  ? "bg-blue-50 border border-blue-100 text-blue-600" 
                  : "hover:bg-gray-50 text-gray-600 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  selectedWarehouse === id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  W{id}
                </div>
                <div className="text-left">
                  <div className="text-[13px] font-bold">Warehouse {id}</div>
                  <div className="text-[10px] opacity-60">Active Fleet: {robots.filter(r => r.warehouseId === id || (!r.warehouseId && r.id.includes(id.toString()))).length}</div>
                </div>
              </div>
              {selectedWarehouse === id && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </div>
        <div className="p-4 bg-gray-50 border-t border-[#f0f2f5]">
          <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live System Monitoring
          </div>
        </div>
      </div>

      {/* Main Detailed Analysis Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#f0f2f5] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-[#f0f2f5] flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">{warehouseName} Detailed Analysis</h2>
              <p className="text-[11px] text-gray-400 font-medium">Comprehensive operational breakdown and predictive modeling</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
              <Download className="w-3.5 h-3.5" />
              Export Report
            </button>
            <div className="px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-[11px] font-bold uppercase tracking-wider border border-purple-200">
              Real-time Telemetry
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AreaChartAnalyticsCard 
              title="Fleet Efficiency" 
              value={`${efficiency}%`} 
              percentage="+2.4%" 
              subValue="Active Utilization" 
            />
            <AreaChartAnalyticsCard 
              title="Avg. Battery" 
              value={`${avgBattery}%`} 
              percentage="Stable" 
              subValue="Fleet Health" 
            />
            <AreaChartAnalyticsCard 
              title="Stock Health" 
              value={`${Math.round(warehouseInventory.reduce((acc, i) => acc + (i.healthScore || 100), 0) / (warehouseInventory.length || 1))}%`} 
              percentage={criticalHealthCount > 0 ? `-${criticalHealthCount} critical` : "Stable"} 
              subValue="Inventory Vitality" 
            />
            <AreaChartAnalyticsCard 
              title="Low Stock Items" 
              value={lowStockCount} 
              percentage={lowStockCount > 5 ? "+2" : "-1"} 
              subValue="Safety Stock Alert" 
            />
            <AreaChartAnalyticsCard 
              title="Active Tasks" 
              value={warehouseTasks.length} 
              percentage="+12" 
              subValue="Current Load" 
            />
          </div>

          {/* Real-time Telemetry Section */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <RealTimeAnalytics 
              title="Live Warehouse Telemetry" 
              subtitle={`Real-time data stream from ${warehouseName} sensor network`}
              height={250}
              className="p-6"
            />
          </div>

          {/* Performance Chart */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900">Hourly Throughput Performance</h3>
                  <p className="text-[12px] text-gray-400">Operational output vs robot utilization across 24h cycle</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-200" />
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Throughput</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500 shadow-sm shadow-purple-200" />
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Robots</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRobots" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}
                    />
                    <Area type="monotone" dataKey="throughput" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorThroughput)" />
                    <Area type="monotone" dataKey="robots" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRobots)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col">
              <h3 className="text-[16px] font-bold text-gray-900 mb-6">Fleet Health Index</h3>
              <div className="flex-1 flex flex-col justify-around">
                {robotHealthData.map((item, i) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[12px] font-bold text-gray-600 uppercase tracking-wider">{item.name}</span>
                      <span className="text-[16px] font-bold text-gray-900">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`h-full rounded-full ${
                          item.value > 90 ? "bg-green-500" : item.value > 80 ? "bg-blue-500" : "bg-yellow-500"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="text-[12px] font-bold text-purple-900">AI Recommendation</span>
                </div>
                <p className="text-[11px] text-purple-700 leading-relaxed">
                  Predictive maintenance suggested for Robot #412 in Zone B within the next 48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <h3 className="text-[16px] font-bold text-gray-900 mb-6">Inventory ABC Classification</h3>
              <div className="space-y-4">
                {abcData.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex justify-between items-end text-[12px]">
                      <span className="font-bold text-gray-600 uppercase tracking-wider">{item.name}</span>
                      <span className="font-bold text-gray-900">{item.value} SKUs</span>
                    </div>
                    <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${(item.value / (warehouseInventory.length || 1)) * 100}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-[12px] font-bold text-blue-900">Optimization Tip</span>
                </div>
                <p className="text-[11px] text-blue-700 leading-relaxed">
                  Category A items represent 80% of value. Prioritize cycle counting for these SKUs.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <h3 className="text-[16px] font-bold text-gray-900 mb-6">AI Demand Forecasting (Top SKUs)</h3>
              <div className="space-y-4">
                {warehouseInventory.sort((a, b) => (b.forecastDemand || 0) - (a.forecastDemand || 0)).slice(0, 4).map((item, i) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs">
                        {item.sku?.slice(0, 2) || 'SK'}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-gray-900">{item.name}</div>
                        <div className="text-[10px] text-gray-400">SKU: {item.sku}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-bold text-gray-900">+{item.forecastDemand || 0} units</div>
                      <div className="text-[10px] text-blue-500 font-bold">Predicted Growth</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return content;
};
