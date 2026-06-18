import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  DollarSign, Car, Zap, Activity, Users, 
  TrendingUp, ArrowUpRight, ArrowDownRight, 
  ShieldCheck, Briefcase, Globe, FileText,
  ChevronRight, AlertCircle, Calendar
} from 'lucide-react';

const revenueData = [
  { name: 'Jan', revenue: 45000, margin: 32 },
  { name: 'Feb', revenue: 52000, margin: 35 },
  { name: 'Mar', revenue: 48000, margin: 30 },
  { name: 'Apr', revenue: 61000, margin: 38 },
  { name: 'May', revenue: 55000, margin: 34 },
  { name: 'Jun', revenue: 67000, margin: 40 },
];

const fleetStatusData = [
  { name: 'Active', value: 65, color: '#00D1FF' },
  { name: 'Maintenance', value: 15, color: '#FDBA74' },
  { name: 'Available', value: 20, color: '#7CFFB2' },
];

const AdminDashboard = () => {
  const { stats } = useSelector(state => state.fleet);

  return (
    <div className="space-y-8 pb-12">
      {/* Executive Header */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
            Executive <span className="text-primary">Overview</span>
          </h2>
          <p className="text-gray-500 mt-2 font-bold tracking-[0.2em] uppercase text-[10px]">AERO-DRIVE BI INTERFACE V.2.4</p>
        </div>
        <div className="flex gap-4">
           <div className="text-right px-4 border-r border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Global Utilization</p>
              <p className="text-xl font-black text-white">94.2%</p>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Active Nodes</p>
              <p className="text-xl font-black text-accent">1,204</p>
           </div>
        </div>
      </header>

      {/* High-Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Net Revenue', val: '$2.4M', trend: '+12.4%', icon: DollarSign, color: 'text-primary' },
          { label: 'Fleet Equity', val: '$18.5M', trend: '+5.2%', icon: Car, color: 'text-accent' },
          { label: 'Op. Expenses', val: '$420K', trend: '-2.1%', icon: Activity, color: 'text-highlight' },
          { label: 'Customer LTV', val: '$4,250', trend: '+8.1%', icon: Users, color: 'text-primary' },
        ].map((kpi, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="glass-panel p-6 border-white/5 relative overflow-hidden group"
          >
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${kpi.color}`}>
                <kpi.icon size={20} className="drop-shadow-[0_0_8px_currentColor]" />
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg border ${kpi.trend.startsWith('+') ? 'bg-accent/10 text-accent border-accent/20' : 'bg-danger/10 text-danger border-danger/20'}`}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-3xl font-black text-white tracking-tighter">{kpi.val}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Financial Analytics */}
        <div className="lg:col-span-2 glass-panel p-8 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
             <div>
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Revenue Dynamics</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">H1 2026 Fiscal Analysis</p>
             </div>
             <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[10px] font-black uppercase tracking-widest">Revenue</button>
                <button className="px-4 py-1.5 bg-white/5 text-gray-500 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest">Margin</button>
             </div>
          </div>
          
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="adminGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00D1FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(0,209,255,0.2)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#00D1FF" strokeWidth={4} fill="url(#adminGlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Composition */}
        <div className="glass-panel p-8 flex flex-col justify-between">
           <div>
              <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Fleet Status</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Real-time Allocation</p>
           </div>

           <div className="h-[250px] flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fleetStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={10}
                    dataKey="value"
                  >
                    {fleetStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <p className="text-3xl font-black text-white">842</p>
                 <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest">Total Units</p>
              </div>
           </div>

           <div className="space-y-3">
              {fleetStatusData.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.name}</span>
                   </div>
                   <span className="text-sm font-black text-white">{item.value}%</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Operational Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Operations & Activity */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Today's Operations Widget */}
          <section className="glass-panel p-8 border-primary/20 bg-primary/5">
             <div className="flex justify-between items-center mb-8">
                <div>
                   <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Today's <span className="text-primary">Operations</span></h3>
                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Real-time Logistics Monitoring</p>
                </div>
                <Zap size={20} className="text-primary animate-pulse" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Pickups Today', val: '14', color: 'text-primary' },
                  { label: 'Returns Today', val: '08', color: 'text-accent' },
                  { label: 'Pending KYC', val: '22', color: 'text-highlight' },
                  { label: 'Units In Service', val: '05', color: 'text-gray-400' },
                ].map((op, i) => (
                  <div key={i} className="p-4 bg-[#0A0E17] border border-white/5 rounded-2xl">
                     <p className="text-[8px] font-black uppercase tracking-widest text-gray-600 mb-1">{op.label}</p>
                     <p className={`text-2xl font-black ${op.color}`}>{op.val}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Quick Actions */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { label: 'Create Booking', icon: Calendar, color: 'hover:bg-primary/20 hover:border-primary/40' },
               { label: 'Add Vehicle', icon: Car, color: 'hover:bg-accent/20 hover:border-accent/40' },
               { label: 'Generate Invoice', icon: FileText, color: 'hover:bg-highlight/20 hover:border-highlight/40' },
               { label: 'Assign Driver', icon: Users, color: 'hover:bg-primary/20 hover:border-primary/40' },
             ].map((action, i) => (
               <button key={i} className={`p-6 glass-panel border-white/5 transition-all flex flex-col items-center gap-4 group ${action.color}`}>
                  <div className="p-3 bg-white/5 rounded-xl text-gray-500 group-hover:text-white group-hover:scale-110 transition-all">
                     <action.icon size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">{action.label}</span>
               </button>
             ))}
          </section>

          {/* Live Activity Feed */}
          <section className="glass-panel p-8 border-white/5">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">System <span className="text-primary">Pulse</span></h3>
                <Activity size={18} className="text-primary" />
             </div>
             <div className="space-y-6">
                {[
                  { user: 'Sarah Connor', action: 'New Booking Confirmed', time: '2m ago', id: 'RSV-8829', status: 'Success' },
                  { user: 'System Alpha', action: 'Payment Received ($1,250)', time: '14m ago', id: 'INV-4412', status: 'Success' },
                  { user: 'Marcus Wright', action: 'Vehicle Returned (Inspection Required)', time: '45m ago', id: 'UNIT-092', status: 'Alert' },
                  { user: 'Admin 01', action: 'Driver Assigned to Trip', time: '1h ago', id: 'TRP-7712', status: 'Info' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 hover:bg-white/5 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                     <div className={`w-2 h-2 rounded-full ${item.status === 'Alert' ? 'bg-danger shadow-[0_0_10px_#EF4444]' : item.status === 'Success' ? 'bg-primary shadow-[0_0_10px_#00D1FF]' : 'bg-accent'}`}></div>
                     <div className="flex-1">
                        <div className="flex justify-between mb-1">
                           <p className="text-xs font-black text-white uppercase tracking-tight">{item.action}</p>
                           <span className="text-[9px] font-bold text-gray-600 uppercase">{item.time}</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                           {item.user} • <span className="text-primary/70">{item.id}</span>
                        </p>
                     </div>
                     <ChevronRight size={16} className="text-gray-800 group-hover:text-white transition-colors" />
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Right Column: Alerts & Compliance */}
        <div className="lg:col-span-4 space-y-8">
           {/* Alert Center */}
           <section className="glass-panel p-8 border-danger/20 bg-danger/5">
              <div className="flex items-center gap-4 mb-8">
                 <div className="p-3 bg-danger/20 rounded-2xl text-danger">
                    <AlertCircle size={24} />
                 </div>
                 <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Alert <span className="text-danger">Center</span></h3>
              </div>
              <div className="space-y-4">
                 {[
                   { label: 'Insurance Expiry', desc: 'Tesla Model S (UNIT-01) expires in 48h', type: 'Critical' },
                   { label: 'Maintenance Due', desc: 'Porsche Taycan (UNIT-04) exceeded mileage', type: 'Warning' },
                   { label: 'Pending KYC', desc: '14 Customers awaiting manual verification', type: 'Action' },
                   { label: 'Overdue Payments', desc: '$4,200 total outstanding from 3 accounts', type: 'Warning' },
                 ].map((alert, i) => (
                   <div key={i} className="p-5 bg-[#0A0E17] border border-white/5 rounded-2xl hover:border-danger/30 transition-all cursor-pointer group">
                      <div className="flex justify-between items-center mb-2">
                         <p className="text-[10px] font-black text-white uppercase tracking-widest">{alert.label}</p>
                         <span className={`text-[8px] font-black px-2 py-0.5 rounded border 
                            ${alert.type === 'Critical' ? 'bg-danger/20 text-danger border-danger/30' : 'bg-highlight/20 text-highlight border-highlight/30'}`}>
                            {alert.type}
                         </span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight leading-relaxed group-hover:text-gray-300 transition-colors">{alert.desc}</p>
                   </div>
                 ))}
              </div>
           </section>

           {/* Security Status */}
           <section className="glass-panel p-8 border-white/5">
              <div className="flex items-center gap-4 mb-8">
                 <ShieldCheck size={24} className="text-accent" />
                 <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Security Protocol</h3>
              </div>
              <div className="space-y-6">
                 <div className="p-4 bg-accent/5 border border-accent/20 rounded-2xl">
                    <div className="flex justify-between mb-2">
                       <span className="text-[9px] font-black text-accent uppercase tracking-widest">Biometric Access</span>
                       <span className="text-[9px] font-black text-white uppercase">Enforced</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full w-full bg-accent"></div>
                    </div>
                 </div>
                 <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Encrypted Logs</p>
                    <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">Hash: 8829-AFX-9912-K</p>
                 </div>
              </div>
           </section>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
