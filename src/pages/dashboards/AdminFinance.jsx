import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { 
  DollarSign, FileText, ArrowUpRight, ArrowDownRight, 
  Plus, CreditCard, RefreshCw, X, CheckCircle2
} from 'lucide-react';

const revenueData = [
  { name: 'Jan', revenue: 45000, expenses: 22000 },
  { name: 'Feb', revenue: 52000, expenses: 25000 },
  { name: 'Mar', revenue: 48000, expenses: 21000 },
  { name: 'Apr', revenue: 61000, expenses: 28000 },
  { name: 'May', revenue: 55000, expenses: 26000 },
  { name: 'Jun', revenue: 67000, expenses: 29000 },
];

const branchData = [
  { name: 'Downtown Hub', value: 45, color: '#00D1FF' },
  { name: 'Airport Terminal', value: 35, color: '#7CFFB2' },
  { name: 'West End', value: 20, color: '#FDBA74' },
];

const recentTransactions = [
  { id: 'TRX-9921', type: 'Invoice Paid', amount: '+$1,250.00', status: 'Completed', date: 'Today, 14:30', entity: 'Marcus Corp.' },
  { id: 'TRX-9922', type: 'Expense', amount: '-$420.00', status: 'Processed', date: 'Today, 11:15', entity: 'AutoParts Inc.' },
  { id: 'TRX-9923', type: 'Deposit', amount: '+$500.00', status: 'Holding', date: 'Yesterday', entity: 'Elena R.' },
  { id: 'TRX-9924', type: 'Refund', amount: '-$150.00', status: 'Completed', date: 'Yesterday', entity: 'James T.' },
];

const AdminFinance = () => {
  const [modalType, setModalType] = useState(null);
  const [activeTab, setActiveTab] = useState('Payments');
  const [selectedTrx, setSelectedTrx] = useState(null);

  const tabs = ['Payments', 'Invoices', 'Expenses', 'Reports'];

  const closeModal = () => {
    setModalType(null);
    setSelectedTrx(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Financial <span className="text-highlight">Intelligence</span>
          </h2>
          <p className="text-gray-500 font-bold tracking-[0.2em] uppercase text-[10px] mt-2">Treasury & Ledger Analytics</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setModalType('invoice')} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-white hover:bg-white/10 transition-colors shadow-glass text-xs font-black uppercase tracking-widest">
            <FileText size={16} className="text-primary" /> Create Invoice
          </button>
          <button onClick={() => setModalType('expense')} className="px-6 py-3 bg-highlight/10 text-highlight border border-highlight/20 rounded-xl flex items-center gap-2 hover:bg-highlight hover:text-[#0A0E17] transition-all shadow-[0_0_15px_rgba(253,186,116,0.15)] hover:shadow-[0_0_25px_rgba(253,186,116,0.4)] text-xs font-black uppercase tracking-widest">
            <Plus size={16} /> Record Expense
          </button>
        </div>
      </div>

      {/* TOP TABS */}
      <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap
              ${activeTab === tab 
                ? 'bg-highlight text-[#0A0E17] shadow-[0_0_15px_rgba(253,186,116,0.3)]' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', val: '$328,000', trend: '+14.2%', icon: DollarSign, color: 'text-primary' },
          { label: 'Active Deposits', val: '$45,500', trend: '+5.1%', icon: CreditCard, color: 'text-accent' },
          { label: 'Total Expenses', val: '$151,000', trend: '-2.4%', icon: ArrowDownRight, color: 'text-danger' },
          { label: 'Net Profit', val: '$177,000', trend: '+18.5%', icon: ArrowUpRight, color: 'text-highlight' },
        ].map((kpi, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} className="glass-panel p-6 border-white/5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Expenses */}
        <div className="lg:col-span-2 glass-panel p-8 border-white/5">
          <div className="flex justify-between items-center mb-8">
             <div>
                <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Cash Flow Dynamics</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">H1 2026 Analysis</p>
             </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00D1FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke="#00D1FF" strokeWidth={3} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Profits */}
        <div className="glass-panel p-8 border-white/5 flex flex-col">
          <div>
            <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Branch Profits</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Revenue Distribution</p>
          </div>
          <div className="flex-1 min-h-[200px] mt-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={branchData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {branchData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-white">100%</span>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {branchData.map((branch, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: branch.color }}></div>
                  <span className="text-gray-400 font-bold">{branch.name}</span>
                </div>
                <span className="font-black text-white">{branch.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="glass-panel overflow-hidden border-white/5">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Recent Ledger Activity</h3>
          <button className="text-primary hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            View All <RefreshCw size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Transaction ID</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Type</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Entity</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Date</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trx, index) => (
                <tr 
                  key={index} 
                  onClick={() => setSelectedTrx(trx)}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer group"
                >
                  <td className="p-4 text-xs font-bold text-white group-hover:text-primary transition-colors">{trx.id}</td>
                  <td className="p-4 text-xs font-bold text-gray-400">{trx.type}</td>
                  <td className="p-4 text-sm font-bold text-white italic uppercase">{trx.entity}</td>
                  <td className="p-4 text-xs font-bold text-gray-500">{trx.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border 
                      ${trx.status === 'Completed' ? 'bg-primary/10 text-primary border-primary/20 shadow-glow-primary' : 
                        trx.status === 'Holding' ? 'bg-highlight/10 text-highlight border-highlight/20' : 
                        'bg-white/5 text-gray-400 border-white/10'}`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className={`p-4 text-sm font-black text-right ${trx.amount.startsWith('+') ? 'text-accent' : 'text-danger'}`}>
                    {trx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Detail Drawer */}
      <AnimatePresence>
        {selectedTrx && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-sm"
              onClick={() => setSelectedTrx(null)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full sm:w-[450px] bg-[#111827] border-l border-white/10 h-full p-8 shadow-2xl flex flex-col"
            >
               <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                  <div>
                     <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Ledger Interface</h3>
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selectedTrx.id}</p>
                  </div>
                  <button onClick={() => setSelectedTrx(null)} className="p-2 text-gray-500 hover:text-white transition-colors">
                     <X size={20} />
                  </button>
               </div>

               <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Transaction Magnitude</p>
                     <p className={`text-4xl font-black italic ${selectedTrx.amount.startsWith('+') ? 'text-accent shadow-glow-accent' : 'text-danger'}`}>
                        {selectedTrx.amount}
                     </p>
                  </div>

                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Audit Profile</h4>
                     <div className="glass-panel p-6 border-white/5 space-y-4">
                        {[
                           { label: 'Category', val: selectedTrx.type },
                           { label: 'Entity', val: selectedTrx.entity },
                           { label: 'Timestamp', val: selectedTrx.date },
                           { label: 'Network Status', val: selectedTrx.status },
                        ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                              <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{item.val}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl">
                     <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 italic">Blockchain Verification</p>
                     <div className="bg-[#0A0E17] p-3 rounded-lg border border-white/5 overflow-hidden">
                        <p className="text-[8px] font-mono text-gray-500 break-all leading-relaxed">
                           HASH: 0x72a1...9b2c | NONCE: 4209 | SIG: VRTX_0912_AC7
                        </p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 pt-8 border-t border-white/10 flex gap-4">
                  <button className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all italic">
                     Export PDF
                  </button>
                  <button className="flex-1 py-4 bg-primary text-[#0A0E17] rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-glow-primary hover:scale-105 transition-all italic">
                     Flag Entry
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                    {modalType === 'invoice' ? 'Generate Invoice' : 'Record Expense'}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Financial Entry Protocol</p>
                </div>
                <button onClick={closeModal} className="p-2 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">
                    {modalType === 'invoice' ? 'Target Entity / Customer' : 'Vendor / Category'}
                  </label>
                  <input type="text" placeholder="Enter name..." className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-4 text-sm font-bold text-white focus:outline-none focus:border-primary/50 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <input type="number" placeholder="0.00" className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 pl-10 pr-4 text-sm font-bold text-white focus:outline-none focus:border-primary/50 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Date</label>
                    <input type="date" className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-4 text-sm font-bold text-gray-400 focus:outline-none focus:border-primary/50 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Description</label>
                  <textarea rows="3" placeholder="Enter details..." className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-4 text-sm font-bold text-white focus:outline-none focus:border-primary/50 transition-all resize-none"></textarea>
                </div>

                <button onClick={closeModal} className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex justify-center items-center gap-3
                  ${modalType === 'invoice' ? 'bg-primary text-[#0A0E17] shadow-glow-primary' : 'bg-highlight text-[#0A0E17] shadow-[0_0_20px_rgba(253,186,116,0.3)]'}`}>
                  <CheckCircle2 size={18} /> {modalType === 'invoice' ? 'Generate & Send' : 'Save Expense Record'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminFinance;
