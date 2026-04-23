import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChartAnalyticsCard } from "@/components/ui/area-chart-analytics-card";
import { ServiceCards } from "./ui/cards";
import { WarehouseAnalytics } from "./WarehouseAnalytics";
import { 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  Download,
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
  Minus,
  LayoutGrid,
  Map as MapIcon,
  Wifi,
  Battery,
  Clock,
  Zap,
  Box,
  Shield,
  Layers,
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  XCircle,
  RefreshCw,
  LogOut,
  X,
  Layout,
  ClipboardList
} from 'lucide-react';
import { 
  auth, 
  db, 
  signInWithGoogle, 
  signOut, 
  handleFirestoreError, 
  OperationType 
} from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  onSnapshot, 
  collection, 
  query, 
  where,
  orderBy, 
  limit, 
  doc, 
  getDoc,
  setDoc, 
  addDoc, 
  Timestamp,
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

// --- MOCK DATA ---
const workloadBars = [18,32,45,28,55,68,42,76,58,34,62,80,47,39,71,53,28,45,66,38,52,74,60,42,35,58,72,49,37,63,55,41,69,48,36,60,44,33,57,50];
const ordersData   = [40,55,42,68,73,58,80,92,78,65,88,95,72,60,85,90,76,82,70,88,94,79,67,83,91,86,75,80,87,93,77,69,84,96,88,74,91,85,78,95];

// --- COMPONENTS ---

const Sidebar = ({ activeTab, setActiveTab, user }: { activeTab: string, setActiveTab: (t: string) => void, user: any }) => {
  const menuGroups = [
    {
      title: "General",
      items: [
        { id: "Warehouse", icon: MapIcon, label: "Home" },
        { id: "Services", icon: LayoutGrid, label: "Services Showcase" },
        { id: "Analytics", icon: BarChart3, label: "Analytics" },
      ]
    },
    {
      title: "Operations",
      items: [
        { id: "Robot", icon: Cpu, label: "Robot Fleet" },
        { id: "Tasks", icon: ClipboardList, label: "Task Orchestration" },
        { id: "Pick Rates", icon: TrendingUp, label: "Pick Rates" },
      ]
    },
    {
      title: "Inventory",
      items: [
        { id: "Inventory", icon: Package, label: "Stock Management" },
        { id: "Audit Logs", icon: Activity, label: "Audit Logs" },
      ]
    },
    {
      title: "System",
      items: [
        { id: "Employees", icon: Users, label: "Employees" },
        { id: "Settings", icon: Settings, label: "Settings" },
      ]
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-slate-900 font-bold text-lg tracking-tight">Navexa</h1>
          <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">Warehouse OS</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 px-2">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                    activeTab === item.id 
                      ? "bg-blue-50 text-blue-600 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className={`w-4.5 h-4.5 transition-colors ${
                    activeTab === item.id ? "text-blue-600" : "group-hover:text-blue-500"
                  }`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 mt-auto">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {user?.displayName?.substring(0, 1) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 text-sm font-bold truncate">{user?.displayName || "User"}</p>
              <p className="text-slate-500 text-[10px] truncate">{user?.email || "user@navexa.ai"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopBar = ({ onAiToggle, user, onLogout }: { onAiToggle: () => void, user: any, onLogout?: () => void }) => {
  return (
    <div className="h-16 border-b border-slate-200 bg-white flex items-center px-6 justify-between shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-slate-900 text-[11px] font-bold uppercase tracking-wider">System Online</span>
          <div className="w-px h-3 bg-slate-200 mx-1" />
          <span className="text-slate-500 text-[11px] font-medium">Throughput: 345 u/h</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Cpu className="w-4 h-4" />
            <span className="text-xs font-medium">Fleet: 48/72</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-medium">Uptime: 99.9%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search warehouse..." 
            className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all w-64 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onAiToggle}
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-500/30 transition-all relative"
          >
            <BrainCircuit className="w-5 h-5" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
          </button>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-all relative">
            <Bell className="w-5 h-5" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <button 
            onClick={() => signOut()}
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-red-500 transition-all"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, children, className = "", headerAction }: { title?: string, children: React.ReactNode, className?: string, headerAction?: React.ReactNode }) => (
  <div className={`bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm ${className}`}>
    {title && (
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-slate-900 text-sm font-bold tracking-tight">{title}</h3>
        {headerAction}
      </div>
    )}
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

const BatchModal = ({ item, onClose, tenantId }: { item: any, onClose: () => void, tenantId: string }) => {
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const q = query(
          collection(db, "batches"),
          where("tenantId", "==", tenantId),
          where("sku", "==", item.sku),
          orderBy("receivedAt", "asc")
        );
        const snapshot = await getDocs(q);
        setBatches(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching batches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, [item.sku, tenantId]);

  const [sortOrder, setSortOrder] = useState<'FIFO' | 'LIFO'>('FIFO');

  const sortedBatches = [...batches].sort((a, b) => {
    const timeA = new Date(a.receivedAt).getTime();
    const timeB = new Date(b.receivedAt).getTime();
    return sortOrder === 'FIFO' ? timeA - timeB : timeB - timeA;
  });

  const eoq = Math.sqrt((2 * (item.forecastDemand || 1000) * (item.orderingCost || 50)) / (item.holdingCost || 2));

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="p-6 border-b border-[#f0f2f5] flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Batch Management: {item.name}</h3>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">SKU: {item.sku} • {item.category} Category</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Physical</span>
              <div className="text-xl font-black text-blue-600 mt-1">{item.physicalStock}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Available</span>
              <div className="text-xl font-black text-green-600 mt-1">{item.availableStock}</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Safety</span>
              <div className="text-xl font-black text-orange-600 mt-1">{item.safetyStock}</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">EOQ (Wilson)</span>
              <div className="text-xl font-black text-purple-600 mt-1">{Math.round(eoq)}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h4 className="text-sm font-bold text-gray-900">Inventory Batches</h4>
                <div className="flex bg-gray-100 p-1 rounded-lg gap-1">
                  <button 
                    onClick={() => setSortOrder('FIFO')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${sortOrder === 'FIFO' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    FIFO
                  </button>
                  <button 
                    onClick={() => setSortOrder('LIFO')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${sortOrder === 'LIFO' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    LIFO
                  </button>
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Valuation: ${batches.reduce((acc, b) => acc + (b.quantity * b.cost), 0).toLocaleString()}</span>
            </div>
            
            <div className="bg-white border border-[#f0f2f5] rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-[#f0f2f5]">
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Received</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Qty</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Unit Cost</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f2f5]">
                  {loading ? (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-xs">Loading batches...</td></tr>
                  ) : sortedBatches.length === 0 ? (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-xs">No active batches for this SKU.</td></tr>
                  ) : (
                    sortedBatches.map((batch) => (
                      <tr key={batch.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-[12px] text-gray-600 font-mono">
                          {new Date(batch.receivedAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-[12px] font-bold text-gray-900">{batch.quantity}</td>
                        <td className="px-4 py-3 text-[12px] text-gray-600">${batch.cost}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            batch.quantity > (item.safetyStock / (batches.length || 1)) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {batch.quantity > (item.safetyStock / (batches.length || 1)) ? 'Healthy' : 'Low'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-[#f0f2f5] flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">Close</button>
          <button 
            onClick={() => {
              alert(`Reorder triggered for SKU: ${item.sku}. ERP integration pending.`);
              onClose();
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl text-[13px] font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Trigger Reorder
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const AuditLogPanel = ({ tenantId }: { tenantId: string }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const q = query(
          collection(db, "audit_logs"),
          where("tenantId", "==", tenantId),
          orderBy("timestamp", "desc"),
          limit(50)
        );
        const snapshot = await getDocs(q);
        setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [tenantId]);

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">System Audit Logs</h2>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Live Monitoring
          </div>
        </div>

        <div className="bg-white border border-[#f0f2f5] rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[#f0f2f5]">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f5]">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">Loading audit trail...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">No audit logs found for this tenant.</td></tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-[13px] text-gray-500 font-mono">
                      {new Date(log.timestamp?.seconds * 1000).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                          {log.userId?.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-[13px] font-medium text-gray-900">{log.userId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        log.action?.includes('DELETE') ? 'bg-red-50 text-red-600' :
                        log.action?.includes('CREATE') ? 'bg-green-50 text-green-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-500 truncate max-w-xs">
                      {JSON.stringify(log.details)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AIIntelligencePanel = ({ inventory, selectedWarehouse, tenantId, onLogAction }: { inventory: any[], selectedWarehouse: number | null, tenantId: string, onLogAction?: (a: string, p: any) => Promise<void> }) => {
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const fetchAIInsights = async () => {
    setLoading(true);
    if (onLogAction) {
      await onLogAction("AI_INSIGHTS_REQUESTED", { warehouse: selectedWarehouse });
    }
    try {
      // Analyze the most critical SKU
      const criticalItem = inventory.sort((a, b) => (a.healthScore || 100) - (b.healthScore || 100))[0];
      if (criticalItem) {
        const response = await fetch('/api/ai/analyze-sku', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-tenant-id': tenantId },
          body: JSON.stringify({ sku: criticalItem.sku, history: [] }) // History would be fetched from audit logs in real system
        });
        const data = await response.json();
        setAiInsights([{
          id: 'ai-' + Date.now(),
          type: 'forecast',
          message: data.recommendation,
          severity: data.healthScore < 40 ? 'high' : 'medium',
          time: 'Just now'
        }]);
      }
    } catch (error) {
      console.error("AI Insight Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIInsights();
  }, [inventory.length]);

  const history = [
    { id: 'h1', type: 'report', message: 'Weekly efficiency report: 94.2% uptime achieved.', time: 'Yesterday', severity: 'low' },
    { id: 'h2', type: 'alert', message: 'System maintenance completed successfully.', time: '2 days ago', severity: 'low' },
    { id: 'h3', type: 'analysis', message: 'Q1 throughput analysis: 1.2M units processed.', time: '3 days ago', severity: 'medium' },
  ];

  return (
    <div className="flex flex-col gap-3 p-3.5 border-b border-[#f0f2f5]">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-purple-500" />
          <h3 className="text-[13px] font-semibold text-gray-900">AI Intelligence</h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${showHistory ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {showHistory ? 'Current' : 'History'}
          </button>
          <RefreshCw 
            className={`w-3.5 h-3.5 text-gray-300 cursor-pointer hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} 
            onClick={fetchAIInsights}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <AnimatePresence mode="wait">
          {(showHistory ? history : aiInsights).map((insight) => (
            <motion.div 
              key={insight.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="p-3 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] uppercase tracking-wider font-bold ${
                    insight.severity === 'high' ? 'text-red-500' : insight.severity === 'medium' ? 'text-yellow-600' : 'text-blue-500'
                  }`}>
                    {insight.type}
                  </span>
                  <span className="text-[9px] text-gray-300 font-medium">{insight.time}</span>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  insight.severity === 'high' ? 'bg-red-500' : insight.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed font-medium group-hover:text-gray-900 transition-colors">
                {insight.message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const AIAssistantPanel = ({ isOpen, onClose, inventory }: { isOpen: boolean, onClose: () => void, inventory: any[] }) => {
  const [messages, setMessages] = useState<any[]>([
    { role: "assistant", content: "Hello! I'm your Navexa warehouse AI assistant. I've analyzed your inventory and found potential optimization areas. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      // In a real app, this would call the Gemini API via a service
      const criticalItems = inventory.filter(i => (i.healthScore || 100) < 50);
      
      setTimeout(() => {
        let response = "I've analyzed the system. ";
        if (userMsg.toLowerCase().includes("replenish") || userMsg.toLowerCase().includes("stock")) {
          response += `You have ${criticalItems.length} items with critical stock levels. I recommend prioritizing SKU ${criticalItems[0]?.sku || 'SKU-001'} for immediate reorder.`;
        } else if (userMsg.toLowerCase().includes("eoq")) {
          response += "The Economic Order Quantity (EOQ) model suggests balancing ordering costs and holding costs. For your high-value items, increasing order frequency by 15% could reduce holding costs by $2.4k/month.";
        } else {
          response += "Based on current throughput, Warehouse 1 is operating at 84% capacity. Robot utilization is optimal, but battery levels for the Haulix fleet are averaging 54%.";
        }
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm sorry, I encountered an error connecting to the intelligence core." }]);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 w-[380px] h-full bg-white shadow-2xl z-[200] flex flex-col border-l border-gray-100"
        >
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">AI Warehouse Intelligence</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Live Analysis</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-[12.5px] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50/30">
            <div className="flex flex-wrap gap-2 mb-3">
              {["Replenishment alerts", "EOQ Analysis", "Robot status"].map(tag => (
                <button 
                  key={tag}
                  onClick={() => setInput(tag)}
                  className="text-[10px] font-bold px-2 py-1 bg-white border border-gray-200 rounded-md text-gray-500 hover:border-green-500 hover:text-green-600 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="relative">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about inventory, forecasts..."
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-black disabled:opacity-30 transition-all"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PickRatePanel = () => {
  const zones = [
    { zone: "Zone A", picks: 1842, accuracy: 98.7, robots: 12, avgTime: 2.3, efficiency: 94 },
    { zone: "Zone B", picks: 1124, accuracy: 97.2, robots: 8, avgTime: 3.1, efficiency: 78 },
    { zone: "Zone C", picks: 2310, accuracy: 99.1, robots: 18, avgTime: 1.8, efficiency: 97 },
    { zone: "Zone D", picks: 856, accuracy: 96.8, robots: 6, avgTime: 3.8, efficiency: 71 },
    { zone: "Zone E", picks: 432, accuracy: 98.3, robots: 4, avgTime: 2.9, efficiency: 83 }
  ];

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Total Picks Today</div>
          <div className="text-2xl font-bold text-gray-900">6,564</div>
          <div className="text-[10px] text-green-600 font-bold mt-1">+8.2% vs yesterday</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Avg Accuracy</div>
          <div className="text-2xl font-bold text-gray-900">98.0%</div>
          <div className="text-[10px] text-green-600 font-bold mt-1">Above 97% SLA</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Avg Pick Time</div>
          <div className="text-2xl font-bold text-gray-900">2.78s</div>
          <div className="text-[10px] text-green-600 font-bold mt-1">-0.3s vs last week</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Active Robots</div>
          <div className="text-2xl font-bold text-gray-900">48/72</div>
          <div className="text-[10px] text-gray-500 font-bold mt-1">Normal range</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#f0f2f5] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Pick Rate by Zone</h3>
          <button className="text-[11px] font-bold text-blue-600 hover:underline">Export CSV</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Zone</th>
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Picks Today</th>
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Accuracy</th>
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Robots</th>
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Avg Time</th>
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-sm font-bold text-gray-900">{z.zone}</td>
                  <td className="p-4 text-sm font-medium text-gray-600">{z.picks.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${z.accuracy}%` }} />
                      </div>
                      <span className="text-xs font-bold text-gray-700">{z.accuracy}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{z.robots}</td>
                  <td className="p-4 text-sm text-gray-600">{z.avgTime}s</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      z.efficiency > 90 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {z.efficiency}% {z.efficiency > 90 ? 'Optimal' : 'Good'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const EmployeePanel = () => {
  const employees = [
    { name: "Ahmad Ramadhan", role: "Warehouse Operator", shift: "Morning", zone: "A,B", picks: 312, status: "active" },
    { name: "Siti Nurhaliza", role: "Senior Picker", shift: "Morning", zone: "C", picks: 428, status: "active" },
    { name: "Budi Santoso", role: "Robot Supervisor", shift: "Evening", zone: "All", picks: 0, status: "active" },
    { name: "Rini Anggraini", role: "Inventory Manager", shift: "Morning", zone: "All", picks: 0, status: "active" },
    { name: "Dodi Pratama", role: "Warehouse Operator", shift: "Evening", zone: "D,E", picks: 198, status: "on-break" },
    { name: "Maya Sari", role: "QA Inspector", shift: "Night", zone: "B,C", picks: 0, status: "scheduled" }
  ];

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Total Staff</div>
          <div className="text-2xl font-bold text-gray-900">{employees.length}</div>
          <div className="text-[10px] text-gray-500 font-bold mt-1">Full capacity</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Active Now</div>
          <div className="text-2xl font-bold text-gray-900">{employees.filter(e => e.status === 'active').length}</div>
          <div className="text-[10px] text-green-600 font-bold mt-1">Morning shift</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Avg Picks/Staff</div>
          <div className="text-2xl font-bold text-gray-900">285</div>
          <div className="text-[10px] text-green-600 font-bold mt-1">+5% vs target</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Shifts Today</div>
          <div className="text-2xl font-bold text-gray-900">3</div>
          <div className="text-[10px] text-gray-500 font-bold mt-1">Normal schedule</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#f0f2f5] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Staff Directory</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-[11px] font-bold hover:bg-gray-100 transition-colors">Manage Schedule</button>
            <button className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-[11px] font-bold hover:bg-black transition-colors">Add Employee</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Shift</th>
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Zones</th>
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Picks Today</th>
                <th className="p-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                        {e.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-bold text-gray-900">{e.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{e.role}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-bold uppercase tracking-wider">{e.shift}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{e.zone}</td>
                  <td className="p-4 text-sm font-bold text-gray-900">{e.picks > 0 ? e.picks.toLocaleString() : '—'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      e.status === 'active' ? 'bg-green-100 text-green-600' : 
                      e.status === 'on-break' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {e.status.replace('-', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RobotCard: React.FC<{ robot: any }> = ({ robot }) => {
  const [expanded, setExpanded] = useState(false);
  const isAvailable = robot.status === "available";

  return (
    <div className="group rounded-xl transition-colors hover:bg-gray-50 p-2">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="w-7.5 h-7.5 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Cpu className="w-4 h-4 text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11.5px] font-semibold text-gray-900 truncate">{robot.id}</div>
          <div className="flex items-center gap-1 mt-0.5">
            <div className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-[10px] text-gray-500 capitalize">{robot.status}</span>
          </div>
        </div>
        <div className="text-gray-400">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 pt-2 border-t border-gray-100 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-gray-500">Battery life</span>
              <span className={`text-[10px] font-semibold ${robot.battery < 40 ? "text-red-500" : "text-gray-900"}`}>{Math.round(robot.battery)}%</span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${robot.battery}%` }}
                className={`h-full ${robot.battery < 40 ? "bg-yellow-500" : "bg-green-500"}`}
              />
            </div>
            
            {robot.tasks && robot.tasks.length > 0 && (
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center text-[9.5px] text-gray-400 px-0.5">
                  <span className="w-6">Pat.</span>
                  <span className="flex-1">Number</span>
                  <span className="w-9">Weight</span>
                  <span className="w-10">Status</span>
                </div>
                {robot.tasks.map((task: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-1.5 py-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${task.status === 'error' ? 'bg-red-500' : 'bg-green-500'}`} />
                    <span className="text-[10.5px] font-medium text-gray-700 w-4">{task.pattern || 'FA'}</span>
                    <span className="text-[10px] text-gray-400 flex-1 truncate">{task.number || '№154251'}</span>
                    <span className="text-[10px] text-gray-600 w-9">{task.weight || '120kg'}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] ${
                      task.status === 'done' ? 'bg-green-100 text-green-600' : 
                      task.status === 'error' ? 'bg-red-100 text-red-600' : 
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {task.status === 'done' ? 'Done' : task.status === 'error' ? 'Error' : '···'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WarehouseMap = ({ robots, selectedWarehouse, onWarehouseSelect }: { robots: any[], selectedWarehouse: number | null, onWarehouseSelect: (id: number | null) => void }) => {
  const warehouses = [
    { id: 1, name: "Warehouse 1", color: "blue", x: 10, y: 10, width: 130, height: 100, robots: robots.filter(r => r.warehouseId === 1 || (!r.warehouseId && r.id.includes('1'))) },
    { id: 2, name: "Warehouse 2", color: "blue", x: 154, y: 10, width: 130, height: 100, robots: robots.filter(r => r.warehouseId === 2 || (!r.warehouseId && r.id.includes('2'))) },
    { id: 3, name: "Warehouse 3", color: "blue", x: 298, y: 10, width: 130, height: 100, robots: robots.filter(r => r.warehouseId === 3 || (!r.warehouseId && r.id.includes('3'))) },
    { id: 4, name: "Warehouse 4", color: "green", x: 442, y: 10, width: 90, height: 70, robots: robots.filter(r => r.warehouseId === 4 || (!r.warehouseId && r.id.includes('4'))) },
  ];

  const activeRobots = selectedWarehouse 
    ? warehouses.find(w => w.id === selectedWarehouse)?.robots || []
    : robots;

  return (
    <div className="bg-white rounded-2xl flex-1 relative overflow-hidden flex flex-col shadow-sm border border-[#f0f2f5]">
      <div className="flex-1 relative p-10 bg-transparent cursor-crosshair" onClick={() => onWarehouseSelect(null)}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 400" preserveAspectRatio="none">
          {/* Row 1 green connection lines */}
          <line x1="50" y1="60" x2="195" y2="60" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />
          <circle cx="195" cy="60" r="3.5" fill="#22c55e" />
          <line x1="225" y1="60" x2="360" y2="60" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />
          <circle cx="360" cy="60" r="3.5" fill="#22c55e" />
          <line x1="390" y1="60" x2="545" y2="60" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />
          <circle cx="545" cy="60" r="3.5" fill="#22c55e" />

          {/* Vertical drops */}
          <line x1="210" y1="60" x2="210" y2="100" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />
          <line x1="375" y1="60" x2="375" y2="100" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />

          {/* Row 2 */}
          <line x1="50" y1="105" x2="175" y2="105" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />
          <circle cx="175" cy="105" r="3" fill="#22c55e" />
          <line x1="205" y1="105" x2="350" y2="105" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />
          <circle cx="350" cy="105" r="3" fill="#22c55e" />

          {/* Red lines (right side) */}
          <line x1="580" y1="60" x2="680" y2="60" stroke="#ef4444" strokeWidth="1.5" className="opacity-60" />
          <circle cx="680" cy="60" r="3.5" fill="#ef4444" />
          <line x1="710" y1="60" x2="780" y2="60" stroke="#ef4444" strokeWidth="1.5" className="opacity-60" />
          <line x1="680" y1="60" x2="680" y2="100" stroke="#ef4444" strokeWidth="1.5" className="opacity-60" />
          <circle cx="740" cy="105" r="3" fill="#22c55e" />
          <line x1="580" y1="105" x2="740" y2="105" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />

          {/* Row 3 connector */}
          <line x1="50" y1="170" x2="175" y2="170" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />
          <line x1="205" y1="170" x2="350" y2="170" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />
          <line x1="380" y1="170" x2="560" y2="170" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />
          <line x1="590" y1="170" x2="780" y2="170" stroke="#22c55e" strokeWidth="1.5" className="opacity-60" />
        </svg>

        {/* Storage Blocks */}
        <div className="absolute top-0 left-0 w-full h-full z-[2] pointer-events-none">
          {warehouses.map((w) => (
            <div 
              key={w.id}
              onClick={(e) => {
                e.stopPropagation();
                onWarehouseSelect(w.id);
              }}
              style={{ 
                left: w.x, 
                top: w.y, 
                width: w.width, 
                height: w.height,
                transition: 'all 0.3s ease'
              }}
              className={`absolute rounded-[10px] overflow-hidden border cursor-pointer pointer-events-auto group ${
                selectedWarehouse === w.id 
                  ? "ring-2 ring-blue-500 ring-offset-2 scale-[1.02] z-10" 
                  : "hover:scale-[1.01] opacity-90 hover:opacity-100"
              } ${
                w.color === 'blue' 
                  ? "bg-gradient-to-br from-[#6ab4f5] via-[#4a9de8] to-[#3b8dd4] border-[#5aaae0] shadow-[0_2px_8px_rgba(74,157,232,0.25)]"
                  : "bg-gradient-to-br from-[#5ddc7a] via-[#34c759] to-[#28a548] border-[#2db84a] shadow-[0_2px_8px_rgba(52,199,89,0.25)]"
              }`}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-white/20 backdrop-blur-md rounded text-[9px] font-bold text-white uppercase tracking-wider">
                {w.name}
              </div>
              <div className={`grid ${w.id === 4 ? 'grid-cols-6 grid-rows-5' : 'grid-cols-8 grid-rows-6'} gap-[2px] p-[6px] h-full pt-7`}>
                {Array.from({ length: w.id === 4 ? 30 : 48 }).map((_, i) => (
                  <div key={i} className="bg-white/20 rounded-[1px]" />
                ))}
              </div>
              {selectedWarehouse === w.id && (
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  <span className="text-[8px] font-bold text-white uppercase tracking-tighter">Tracking Active</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Active Robots */}
        {activeRobots.map((robot) => (
          <motion.div 
            key={robot.id}
            className="absolute z-[20] flex flex-col items-center"
            animate={{ left: robot.position?.x || 0, top: robot.position?.y || 0 }}
            transition={{ duration: 2, ease: "linear" }}
          >
            <div className="w-8 h-6.5 bg-[#e8ecf0] border-[1.5px] border-gray-300 rounded-md flex items-center justify-center shadow-md relative">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="1" y="2" width="14" height="8" rx="2" fill="#d1d5db"/>
                <rect x="4" y="0" width="8" height="3" rx="1" fill="#d1d5db"/>
                <circle cx="5" cy="6" r="1.5" fill="#9ca3af"/>
                <circle cx="11" cy="6" r="1.5" fill="#9ca3af"/>
              </svg>
              {robot.battery < 40 && <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold border-2 border-white">!</div>}
            </div>
            <div className="flex gap-2.5 mt-0.5">
              <div className="w-2 h-1 bg-gray-400 rounded-full" />
              <div className="w-2 h-1 bg-gray-400 rounded-full" />
            </div>
          </motion.div>
        ))}

        {/* Zoom Controls */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-[50]">
          <button className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 shadow-sm hover:bg-gray-50">+</button>
          <button className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 shadow-sm hover:bg-gray-50">−</button>
          <button className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 shadow-sm hover:bg-gray-50 mt-2">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TaskPanel = ({ tasks, tenantId }: { tasks: any[], tenantId: string }) => {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#f0f2f5] flex flex-col overflow-hidden m-6">
      <div className="p-5 border-b border-[#f0f2f5] flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Robot Task Orchestration</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[11px] font-bold uppercase tracking-wider">
            {tasks.length} Active Tasks
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <div className="bg-white border border-[#f0f2f5] rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[#f0f2f5]">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Task ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Robot</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f5]">
              {tasks.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">No tasks currently orchestrated.</td></tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-[13px] text-gray-900 font-mono">{task.id}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase tracking-wider">
                        {task.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-gray-600">{task.robotId || 'Unassigned'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        task.status === 'completed' ? 'bg-green-50 text-green-600' :
                        task.status === 'in-progress' ? 'bg-blue-50 text-blue-600' :
                        'bg-gray-50 text-gray-500'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-gray-400">
                      {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AnalyticsPanel = ({ selectedWarehouse, onWarehouseSelect, robots, inventory, tasks, tenantId }: { selectedWarehouse: number | null, onWarehouseSelect: (id: number | null) => void, robots: any[], inventory: any[], tasks: any[], tenantId: string }) => {
  return (
    <WarehouseAnalytics 
      selectedWarehouse={selectedWarehouse}
      onWarehouseSelect={onWarehouseSelect}
      robots={robots}
      inventory={inventory}
      tasks={tasks}
      tenantId={tenantId}
    />
  );
};

const InventoryPanel = ({ inventory, fullWidth, tenantId, onLogAction }: { inventory: any[], fullWidth?: boolean, tenantId: string, onLogAction?: (action: string, details: any) => void }) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const handleReorder = async (item: any) => {
    if (onLogAction) {
      await onLogAction("INVENTORY_REORDER_TRIGGERED", { sku: item.sku, name: item.name });
    }
    // Call API...
  };

  return (
    <div className={`flex-1 bg-white rounded-2xl shadow-sm border border-[#f0f2f5] flex flex-col overflow-hidden ${fullWidth ? 'm-6' : ''}`}>
      <div className="p-5 border-b border-[#f0f2f5] flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Advanced Stock Management</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[11px] font-bold uppercase tracking-wider">
            {inventory.length} SKUs Tracked
          </div>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <div className={`grid grid-cols-1 ${fullWidth ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
          {inventory.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedItem(item)}
              className="p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Box className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    item.physicalStock < item.safetyStock ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  }`}>
                    {item.physicalStock < item.safetyStock ? "Critical Stock" : "Healthy"}
                  </div>
                  <div className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded text-[9px] font-bold uppercase">
                    Category {item.category || 'C'}
                  </div>
                </div>
              </div>
              <h3 className="text-[14px] font-bold text-gray-900 mb-1">{item.name || item.id}</h3>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] text-gray-400">SKU: {item.sku || 'N/A'}</p>
                <div className="flex items-center gap-1">
                  <BrainCircuit className="w-3 h-3 text-purple-400" />
                  <span className="text-[10px] font-bold text-purple-500">{item.healthScore || 0}% Health</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">Physical Stock</span>
                  <span className="font-bold text-gray-900">{item.physicalStock} units</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${item.physicalStock < item.safetyStock ? "bg-red-500" : "bg-blue-500"}`}
                    style={{ width: `${Math.min((item.physicalStock / (item.optimalStock || 100)) * 100, 100)}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="bg-gray-50 p-1.5 rounded-lg">
                    <div className="text-[8px] text-gray-400 uppercase font-bold">Available / Net</div>
                    <div className="text-[11px] font-bold text-gray-700">{item.availableStock || 0} / {item.netStock || 0}</div>
                  </div>
                  <div className="bg-gray-50 p-1.5 rounded-lg">
                    <div className="text-[8px] text-gray-400 uppercase font-bold">Safety / Cycle</div>
                    <div className="text-[11px] font-bold text-gray-700">{item.safetyStock || 0} / {item.cycleStock || 0}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="bg-gray-50 p-1.5 rounded-lg">
                    <div className="text-[8px] text-gray-400 uppercase font-bold">Seasonal / Dead</div>
                    <div className="text-[11px] font-bold text-gray-700">{item.seasonalStock || 0} / {item.deadStock || 0}</div>
                  </div>
                  <div className="bg-gray-50 p-1.5 rounded-lg">
                    <div className="text-[8px] text-gray-400 uppercase font-bold">Optimal</div>
                    <div className="text-[11px] font-bold text-gray-700">{item.optimalStock || 0}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {inventory.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400 gap-4">
              <Package className="w-12 h-12 opacity-20" />
              <p className="text-sm font-medium">No stock items found for this selection.</p>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <BatchModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          tenantId={tenantId}
        />
      )}
    </div>
  );
};

export default function Dashboard({ onLogout }: { onLogout?: () => void }) {
  const [user, setUser] = useState<any>(null);
  const [robots, setRobots] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Warehouse");
  const [filter, setFilter] = useState("all");
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);
  const [aiOpen, setAiOpen] = useState(false);

  const logAction = async (action: string, details: any) => {
    try {
      await addDoc(collection(db, "audit_logs"), {
        tenantId: user?.tenantId || "TENANT-001",
        userId: user?.uid || "SYSTEM",
        action,
        details,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error logging action:", error);
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user?.email || user.tenantId) return;

    // Fetch user profile to get tenantId
    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.email));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser((prev: any) => ({ ...prev, ...userData }));
        } else {
          setUser((prev: any) => ({ ...prev, tenantId: 'TENANT-001' }));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser((prev: any) => ({ ...prev, tenantId: 'TENANT-001' }));
      }
    };
    fetchUserProfile();
  }, [user?.email, user?.tenantId]);

  useEffect(() => {
    if (!user?.tenantId) return;

    // Fetch data using getDocs instead of onSnapshot to prevent gRPC stream timeouts on idle collections
    const fetchData = async () => {
      try {
        const robotsQuery = query(collection(db, 'robots'), where('tenantId', '==', user.tenantId || 'TENANT-001'));
        const robotsSnapshot = await getDocs(robotsQuery);
        setRobots(robotsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const inventorySnapshot = await getDocs(collection(db, 'inventory'));
        setInventory(inventorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const tasksSnapshot = await getDocs(collection(db, 'tasks'));
        setTasks(tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();

    // WebSocket for telemetry
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}`);
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'robot.updated') {
          setRobots(prev => prev.map(r => r.id === message.data.id ? { ...r, ...message.data } : r));
        } else if (message.type === 'order.received') {
          // New order and tasks from ERP
          setTasks(prev => [...message.data.tasks, ...prev]);
          console.log(`[${message.tenantId}] ERP Order Received:`, message.data.order.id);
        }
      } catch (e) {
        console.error("Error parsing WebSocket message:", e);
      }
    };

    return () => {
      ws.close();
    };
  }, [user?.tenantId]);

  const filteredRobots = robots.filter(r => {
    const matchesFilter = filter === "all" || r.status === filter;
    const matchesWarehouse = !selectedWarehouse || r.warehouseId === selectedWarehouse || (!r.warehouseId && r.id.includes(selectedWarehouse.toString()));
    return matchesFilter && matchesWarehouse;
  });

  const filteredTasks = tasks.filter(t => {
    const matchesWarehouse = !selectedWarehouse || t.warehouseId === selectedWarehouse || (!t.warehouseId && t.id.includes(selectedWarehouse.toString()));
    return matchesWarehouse;
  });

  const filteredInventory = inventory.filter(item => {
    const matchesWarehouse = !selectedWarehouse || item.warehouseId === selectedWarehouse || (!item.warehouseId && item.id.includes(selectedWarehouse.toString()));
    return matchesWarehouse;
  });

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#e8ecf0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
          <span className="text-gray-400 font-bold tracking-widest uppercase text-[10px]">Initializing_Electro_OS...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen bg-[#e8ecf0] flex items-center justify-center relative overflow-hidden font-sans">
        <div className="p-16 rounded-[2rem] flex flex-col items-center gap-10 bg-white shadow-2xl shadow-black/5 border border-white/10 relative z-10 max-w-md w-full mx-4">
          <div className="flex items-center gap-3 font-bold text-3xl tracking-tighter text-gray-900">
            elecc
            <span className="relative inline-flex items-center justify-center">
              <span className="absolute w-6 h-6 bg-[#ffb800] rounded-full -z-10"></span>
              t
            </span>
            ro
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">Command Center</h1>
            <p className="text-gray-500 font-medium text-sm">AI-Powered Warehouse Intelligence System</p>
          </div>
          <button 
            onClick={() => signInWithGoogle().catch(console.error)}
            className="w-full py-5 rounded-2xl flex items-center justify-center gap-4 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 group"
          >
            <Users className="w-5 h-5" />
            Authenticate System
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Secure_Access_Only</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden font-sans text-slate-900 bg-[#F8FAFC] flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onAiToggle={() => setAiOpen(true)} user={user} onLogout={onLogout} />
        
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col gap-6"
            >
              {activeTab === "Services" ? (
                <ServiceCards />
              ) : activeTab === "Analytics" ? (
                <AnalyticsPanel 
                  selectedWarehouse={selectedWarehouse} 
                  onWarehouseSelect={setSelectedWarehouse} 
                  robots={robots} 
                  inventory={inventory} 
                  tasks={tasks}
                  tenantId={user.tenantId || 'TENANT-001'}
                />
              ) : activeTab === "Pick Rates" ? (
                <PickRatePanel />
              ) : activeTab === "Employees" ? (
                <EmployeePanel />
              ) : activeTab === "Inventory" ? (
                <InventoryPanel inventory={filteredInventory} fullWidth tenantId={user.tenantId || 'TENANT-001'} onLogAction={logAction} />
              ) : activeTab === "Audit Logs" ? (
                <AuditLogPanel tenantId={user.tenantId || 'TENANT-001'} />
              ) : activeTab === "Tasks" ? (
                <TaskPanel tasks={tasks} tenantId={user.tenantId || 'TENANT-001'} />
              ) : activeTab === "Warehouse" ? (
                <div className="grid grid-cols-12 grid-rows-6 gap-6 h-full min-h-[800px]">
                  {/* Top Stats Row */}
                  <div className="col-span-12 row-span-1 grid grid-cols-4 gap-6">
                    {[
                      { label: "Active Robots", value: filteredRobots.length, icon: Cpu, color: "text-blue-600", trend: "+12%" },
                      { label: "Daily Throughput", value: "3,452", icon: Zap, color: "text-amber-600", trend: "+5.4%" },
                      { label: "Inventory Health", value: "94%", icon: Shield, color: "text-emerald-600", trend: "+0.2%" },
                      { label: "Active Tasks", value: filteredTasks.length, icon: ClipboardList, color: "text-indigo-600", trend: "-2" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                        <div>
                          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                          <div className="flex items-baseline gap-2">
                            <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
                            <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{stat.trend}</span>
                          </div>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Main Chart Area */}
                  <DashboardCard 
                    title="Warehouse Throughput" 
                    className="col-span-8 row-span-3"
                    headerAction={
                      <div className="flex bg-slate-50 p-1 rounded-lg gap-1 border border-slate-200">
                        {["7D", "30D", "Custom"].map(t => (
                          <button key={t} className={`px-3 py-1 text-[10px] font-bold rounded-md ${t === "7D" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}>{t}</button>
                        ))}
                      </div>
                    }
                  >
                    <div className="h-full p-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ordersData.map((v, i) => ({ name: i, value: v, value2: v * 0.8 }))}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                          <XAxis dataKey="name" hide />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#0F172A' }}
                          />
                          <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                          <Area type="monotone" dataKey="value2" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue2)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </DashboardCard>

                  {/* Right Detail Panel */}
                  <DashboardCard title="Warehouse Intelligence" className="col-span-4 row-span-3">
                    <div className="p-5 space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                          <BrainCircuit className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="text-slate-900 font-bold">Navexa Core AI</h4>
                          <p className="text-slate-500 text-xs">Processing 1.2M events/sec</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-xs font-medium">Network Latency</span>
                          <span className="text-slate-900 text-xs font-bold">12ms</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-xs font-medium">Robot Sync Rate</span>
                          <span className="text-emerald-600 text-xs font-bold">99.8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-xs font-medium">Storage Utilization</span>
                          <span className="text-slate-900 text-xs font-bold">84.2%</span>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                        <p className="text-blue-600 text-[11px] leading-relaxed font-medium">
                          AI Insight: Warehouse 1 throughput is projected to increase by 15% in the next 4 hours. Recommend pre-staging SKU-004 in Zone B.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all">System Logs</button>
                        <button className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">Optimize Fleet</button>
                      </div>
                    </div>
                  </DashboardCard>

                  {/* Bottom Row */}
                  <DashboardCard title="Quick Dispatch" className="col-span-4 row-span-2">
                    <div className="p-5 space-y-4">
                      <div className="space-y-2">
                        <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Select SKU</label>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                          <span className="text-slate-900 text-sm">SKU-412589</span>
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Quantity</label>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                          <span className="text-slate-900 text-sm">1,250</span>
                          <span className="text-slate-400 text-xs">MAX</span>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all mt-2 shadow-lg shadow-blue-500/20">Dispatch Robot</button>
                    </div>
                  </DashboardCard>

                  <DashboardCard title="Active Tasks" className="col-span-5 row-span-2">
                    <div className="overflow-auto h-full">
                      <table className="w-full text-left">
                        <thead className="sticky top-0 bg-white z-10">
                          <tr className="border-b border-slate-200">
                            <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Task</th>
                            <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Robot</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredTasks.slice(0, 5).map((task, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                              <td className="px-5 py-3 text-xs text-slate-900 font-medium">{task.type}</td>
                              <td className="px-5 py-3">
                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${
                                  task.status === 'completed' ? 'text-emerald-600 bg-emerald-50' : 'text-blue-600 bg-blue-50'
                                }`}>
                                  {task.status}
                                </span>
                              </td>
                              <td className="px-5 py-3 text-xs text-slate-500">{task.robotId || 'Auto'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DashboardCard>

                  <DashboardCard title="Fleet Status" className="col-span-3 row-span-2">
                    <div className="p-5 space-y-4">
                      {[
                        { label: "Available", value: "32", color: "bg-emerald-500" },
                        { label: "Charging", value: "12", color: "bg-amber-500" },
                        { label: "Maintenance", value: "4", color: "bg-rose-500" },
                      ].map((item, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">{item.label}</span>
                            <span className="text-slate-900 font-bold">{item.value}</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: `${(parseInt(item.value) / 48) * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </DashboardCard>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400 flex-col gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                    <Layout className="w-8 h-8 opacity-20" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-slate-900">{activeTab} Module</h3>
                    <p className="text-sm">This module is currently being optimized for tenant {user?.tenantId}.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AIAssistantPanel isOpen={aiOpen} onClose={() => setAiOpen(false)} inventory={inventory} />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}} />
    </div>
  );
}
