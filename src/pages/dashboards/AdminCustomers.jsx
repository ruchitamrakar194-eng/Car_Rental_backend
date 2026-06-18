import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, ShieldCheck, ShieldAlert, Edit, 
  Eye, MoreVertical, X, MapPin, Phone, Mail, Clock,
  CreditCard, Calendar, Star, AlertTriangle, UserX
} from 'lucide-react';

const mockCustomers = [
  { 
    id: 'CUST-101', 
    name: 'Elena Rodriguez', 
    type: 'Platinum', 
    kyc: 'Verified', 
    status: 'Active', 
    rentals: 14, 
    spent: '$12,450', 
    joined: 'Jan 2024',
    documents: [
       { name: 'Driver License', status: 'Approved', type: 'image', url: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=400&auto=format&fit=crop' },
       { name: 'Insurance Policy', status: 'Approved', type: 'pdf' }
    ],
    lastBooking: 'BKG-7831',
    riskScore: 'Low'
  },
  { 
    id: 'CUST-103', 
    name: 'Michael Chen', 
    type: 'Standard', 
    kyc: 'Pending', 
    status: 'Active', 
    rentals: 2, 
    spent: '$850', 
    joined: 'May 2024',
    documents: [
       { name: 'Driver License', status: 'Pending Review', type: 'image', url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=400&auto=format&fit=crop' }
    ],
    lastBooking: 'BKG-9920',
    riskScore: 'Medium'
  },
  { 
    id: 'CUST-105', 
    name: 'David Wilson', 
    type: 'Standard', 
    kyc: 'Rejected', 
    status: 'Suspended', 
    rentals: 1, 
    spent: '$450', 
    joined: 'Apr 2024',
    documents: [
       { name: 'Driver License', status: 'Fraud Detected', type: 'image' }
    ],
    lastBooking: 'BKG-1102',
    riskScore: 'Critical'
  },
];

const AdminCustomers = () => {
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState(null);

  const tabs = ['All', 'Platinum', 'Gold', 'Standard'];

  const openProfile = (customer, edit = false) => {
    setSelectedCustomer(customer);
    setIsEditMode(edit);
    setPanelOpen(true);
  };

  const closeProfile = () => {
    setPanelOpen(false);
    setTimeout(() => {
      setSelectedCustomer(null);
      setIsEditMode(false);
      setViewingDoc(null);
    }, 300);
  };

  const filtered = mockCustomers.filter(c => {
    if (activeTab !== 'All' && c.type !== activeTab) return false;
    return c.name.toLowerCase().includes(search.toLowerCase()) || 
           c.id.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Client <span className="text-primary">Network</span>
          </h2>
          <p className="text-gray-500 font-bold tracking-[0.2em] uppercase text-[10px] mt-2">Global Identity Matrix</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search ID, Name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-xs font-bold text-white focus:border-primary/50 focus:outline-none focus:shadow-glow-primary transition-all placeholder:text-gray-600"
            />
          </div>
          <button className="p-3.5 bg-[#111827] border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
            <Filter size={18} />
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
                ? 'bg-primary text-[#0A0E17] shadow-glow-primary' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Clients', val: '4,285', color: 'text-primary' },
          { label: 'Active Rentals', val: '142', color: 'text-accent' },
          { label: 'KYC Pending', val: '28', color: 'text-highlight' },
          { label: 'Suspended', val: '12', color: 'text-danger' },
        ].map((stat, i) => (
           <div key={i} className="glass-panel p-5 border-white/5 flex items-center justify-between">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                 <p className="text-2xl font-black text-white">{stat.val}</p>
              </div>
              <div className={`w-2 h-8 rounded-full ${stat.color.replace('text-', 'bg-')}`}></div>
           </div>
        ))}
      </div>

      {/* Customers Table */}
      <div className="glass-panel overflow-hidden border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Client Info</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Tier</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">KYC Status</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Rentals</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Total Value</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary font-black uppercase shadow-glow-primary">
                          {customer.name.charAt(0)}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white">{customer.name}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{customer.id}</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-4">
                     <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border 
                        ${customer.type === 'Platinum' ? 'bg-primary/10 text-primary border-primary/20' : 
                          customer.type === 'Gold' ? 'bg-highlight/10 text-highlight border-highlight/20' : 
                          'bg-white/5 text-gray-400 border-white/10'}`}>
                        {customer.type}
                     </span>
                  </td>
                  <td className="p-4">
                     <div className="flex items-center gap-2">
                        {customer.kyc === 'Verified' && <ShieldCheck size={14} className="text-accent" />}
                        {customer.kyc === 'Pending' && <Clock size={14} className="text-highlight" />}
                        {customer.kyc === 'Rejected' && <ShieldAlert size={14} className="text-danger" />}
                        <span className={`text-[10px] font-black uppercase tracking-widest 
                           ${customer.kyc === 'Verified' ? 'text-accent' : 
                             customer.kyc === 'Pending' ? 'text-highlight' : 'text-danger'}`}>
                           {customer.kyc}
                        </span>
                     </div>
                  </td>
                  <td className="p-4 text-xs font-bold text-white">{customer.rentals} <span className="text-gray-500 font-normal">trips</span></td>
                  <td className="p-4 text-sm font-black text-primary">{customer.spent}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => openProfile(customer)} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Eye size={16} /></button>
                       <button onClick={() => openProfile(customer, true)} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"><Edit size={16} /></button>
                       <button onClick={() => { setSelectedCustomer(customer); setIsSuspendModalOpen(true); }} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-danger hover:bg-danger/10 transition-colors"><UserX size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Premium Profile Side Panel */}
      <AnimatePresence>
        {panelOpen && selectedCustomer && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-sm"
              onClick={closeProfile}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full sm:w-[500px] bg-[#0A0E17] border-l border-white/10 h-full flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10"
            >
               {/* Panel Header */}
               <div className="relative h-48 bg-gradient-to-br from-[#111827] to-[#161B26] p-8 border-b border-white/5">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
                  
                  <button onClick={closeProfile} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full text-gray-400 hover:text-white backdrop-blur-md">
                     <X size={20} />
                  </button>

                  <div className="flex items-end gap-6 h-full relative z-10">
                     <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center text-3xl text-primary font-black shadow-glow-primary backdrop-blur-md">
                        {selectedCustomer.name.charAt(0)}
                     </div>
                     <div className="pb-2">
                        <div className="flex items-center gap-2 mb-1">
                           <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border 
                              ${selectedCustomer.type === 'Platinum' ? 'bg-primary/10 text-primary border-primary/20' : 
                                selectedCustomer.type === 'Gold' ? 'bg-highlight/10 text-highlight border-highlight/20' : 
                                'bg-white/5 text-gray-400 border-white/10'}`}>
                              {selectedCustomer.type} Tier
                           </span>
                           {selectedCustomer.status === 'Suspended' && (
                              <span className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border bg-danger/10 text-danger border-danger/20">Blacklisted</span>
                           )}
                        </div>
                        {isEditMode ? (
                           <input 
                             type="text" 
                             defaultValue={selectedCustomer.name}
                             className="bg-white/5 border border-primary/30 rounded-lg px-2 py-1 text-xl font-black text-white focus:outline-none focus:border-primary"
                           />
                        ) : (
                           <h2 className="text-2xl font-black text-white tracking-tight">{selectedCustomer.name}</h2>
                        )}
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{selectedCustomer.id}</p>
                     </div>
                  </div>
               </div>

               {/* Panel Body */}
               <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
                  {/* Performance Matrix */}
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-[#111827] rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2 mb-2 text-gray-500">
                           <Star size={14} className="text-highlight" />
                           <span className="text-[10px] font-black uppercase tracking-widest">LTV Value</span>
                        </div>
                        <p className="text-xl font-black text-white">{selectedCustomer.spent}</p>
                     </div>
                     <div className="p-4 bg-[#111827] rounded-2xl border border-white/5">
                        <div className="flex items-center gap-2 mb-2 text-gray-500">
                           <ShieldAlert size={14} className={selectedCustomer.riskScore === 'Low' ? 'text-accent' : 'text-danger'} />
                           <span className="text-[10px] font-black uppercase tracking-widest">Risk Assessment</span>
                        </div>
                        <p className={`text-xl font-black ${selectedCustomer.riskScore === 'Low' ? 'text-accent' : 'text-danger'}`}>{selectedCustomer.riskScore}</p>
                     </div>
                  </div>

                  {/* KYC & Document Vault */}
                  <div>
                     <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-4 italic">Document Vault</h4>
                     <div className="space-y-3">
                        {selectedCustomer.documents.map((doc, idx) => (
                           <div key={idx} className="p-4 bg-[#111827] border border-white/5 rounded-2xl hover:border-primary/30 transition-all group">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-white/5 text-gray-400 group-hover:text-primary transition-colors">
                                       <FileText size={18} />
                                    </div>
                                    <div>
                                       <p className="text-xs font-bold text-white">{doc.name}</p>
                                       <p className={`text-[9px] font-black uppercase tracking-widest ${doc.status === 'Approved' ? 'text-accent' : 'text-highlight'}`}>{doc.status}</p>
                                    </div>
                                 </div>
                                 {doc.url && (
                                    <button 
                                      onClick={() => setViewingDoc(doc)}
                                      className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
                                    >
                                       <Eye size={14} />
                                    </button>
                                 )}
                              </div>
                              {viewingDoc === doc && doc.url && (
                                 <motion.div 
                                   initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                   className="mt-4 rounded-xl overflow-hidden border border-white/10"
                                 >
                                    <img src={doc.url} alt="KYC Document" className="w-full h-auto" />
                                 </motion.div>
                              )}
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Activity Log */}
                  <div>
                     <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-4 italic">Logistics History</h4>
                     <div className="p-5 bg-[#111827] rounded-2xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="p-3 rounded-xl bg-white/5 text-primary">
                              <Clock size={20} />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-white">Last Activity</p>
                              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{selectedCustomer.lastBooking}</p>
                           </div>
                        </div>
                        <button className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-[#0A0E17] transition-all">
                           Ledger
                        </button>
                     </div>
                  </div>

                  {/* Telemetry Data */}
                  <div>
                     <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-4 italic">Telemetry Data</h4>
                     <div className="space-y-3">
                        <div className="flex items-center gap-4 p-4 bg-[#111827] rounded-xl border border-white/5">
                           <Mail size={16} className="text-gray-500" />
                           <span className="text-xs font-bold text-white">{selectedCustomer.name.toLowerCase().replace(' ', '.')}@grid.sys</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-[#111827] rounded-xl border border-white/5">
                           <Phone size={16} className="text-gray-500" />
                           <span className="text-xs font-bold text-white">+1 (555) 019-2834</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-[#111827] rounded-xl border border-white/5">
                           <MapPin size={16} className="text-gray-500" />
                           <span className="text-xs font-bold text-white">Sector 4, Neo-Valley, CA</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Panel Actions */}
               <div className="p-6 bg-[#111827] border-t border-white/5 grid grid-cols-2 gap-4">
                  {isEditMode ? (
                     <button 
                       onClick={closeProfile}
                       className="col-span-2 py-4 bg-primary text-[#0A0E17] font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:shadow-glow-primary transition-all flex items-center justify-center gap-2"
                     >
                        <ShieldCheck size={14} /> Update Identity
                     </button>
                  ) : (
                     <>
                        <button 
                          onClick={() => setIsEditMode(true)}
                          className="py-4 bg-white/5 border border-white/10 rounded-xl text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                        >
                           <Edit size={14} /> Edit Identity
                        </button>
                        <button 
                          onClick={() => { closeProfile(); setIsSuspendModalOpen(true); }}
                          className="py-4 bg-danger/10 border border-danger/20 rounded-xl text-danger font-black uppercase tracking-[0.2em] text-[10px] hover:bg-danger hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2"
                        >
                           <UserX size={14} /> Suspend Access
                        </button>
                     </>
                  )}
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Suspend Confirmation Modal */}
      <AnimatePresence>
        {isSuspendModalOpen && selectedCustomer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSuspendModalOpen(false)}
              className="absolute inset-0 bg-[#0A0E17]/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md glass-panel p-8 border-danger/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center text-danger mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <AlertTriangle size={40} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Access <span className="text-danger">Termination</span></h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed mb-8">
                  Are you sure you want to suspend access for <span className="text-white">{selectedCustomer.name}</span>? This will lock all active sessions and rental capabilities immediately.
                </p>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <button onClick={() => setIsSuspendModalOpen(false)} className="py-4 bg-white/5 border border-white/10 rounded-xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
                    Abort
                  </button>
                  <button onClick={() => setIsSuspendModalOpen(false)} className="py-4 bg-danger text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)] transition-all">
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminCustomers;
