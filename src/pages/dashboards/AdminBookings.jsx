import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Calendar as CalendarIcon, MoreHorizontal, 
  Eye, Edit, Trash2, UserPlus, FileText, X, Check, CheckCircle2,
  MapPin, Zap, Activity
} from 'lucide-react';

const mockBookings = [
  { 
    id: 'BKG-7829', 
    customer: 'James T.', 
    customerEmail: 'james@skyline.com',
    vehicle: 'Model S Plaid', 
    vehicleId: 'UNIT-01',
    pickup: 'May 14, 2026', 
    returnDate: 'May 18, 2026', 
    status: 'Active Rental', 
    payment: 'Paid',
    totalPrice: 1250,
    driver: 'Alex Chen',
    location: 'Beverly Hills Hub',
    docs: ['License_Verified', 'Insurance_Confirmed'],
    tripStatus: '74% Energy • In Transit',
    notes: 'Premium member, requested full charge at pickup.'
  },
  { 
    id: 'BKG-7830', 
    customer: 'Sarah M.', 
    customerEmail: 'sarah.m@gmail.com',
    vehicle: 'Rivian R1T', 
    vehicleId: 'UNIT-14',
    pickup: 'May 15, 2026', 
    returnDate: 'May 20, 2026', 
    status: 'Pending', 
    payment: 'Pending',
    totalPrice: 1800,
    driver: null,
    location: 'Downtown Executive',
    docs: ['KYC_Pending'],
    tripStatus: 'Pre-flight Check',
    notes: 'New customer, verify documents manually.'
  },
  { 
    id: 'BKG-7831', 
    customer: 'Elena R.', 
    customerEmail: 'elena@vortex.io',
    vehicle: 'Lucid Air', 
    vehicleId: 'UNIT-09',
    pickup: 'May 12, 2026', 
    returnDate: 'May 14, 2026', 
    status: 'Completed', 
    payment: 'Paid',
    totalPrice: 950,
    driver: 'David Wilson',
    location: 'North Port Sky Station',
    docs: ['Archive_Complete'],
    tripStatus: 'Returned • Inspected',
    notes: 'Returned with minor wheel scuff, reported to maintenance.'
  },
  { 
    id: 'BKG-7832', 
    customer: 'David W.', 
    customerEmail: 'david.w@proton.me',
    vehicle: 'Model Y', 
    vehicleId: 'UNIT-22',
    pickup: 'May 16, 2026', 
    returnDate: 'May 18, 2026', 
    status: 'Approved', 
    payment: 'Paid',
    totalPrice: 600,
    driver: null,
    location: 'Beverly Hills Hub',
    docs: ['Verified'],
    tripStatus: 'Staging Area',
    notes: 'Assign driver by EOD.'
  },
];

const AdminBookings = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view', 'edit', 'delete', 'assign', 'invoice'

  const filteredBookings = mockBookings.filter(b => {
    if (activeTab === 'Pending' && b.status !== 'Pending') return false;
    if (activeTab === 'Active Rental' && b.status !== 'Active Rental') return false;
    if (activeTab === 'Completed' && b.status !== 'Completed') return false;
    
    return b.customer.toLowerCase().includes(search.toLowerCase()) || 
           b.id.toLowerCase().includes(search.toLowerCase()) ||
           b.vehicle.toLowerCase().includes(search.toLowerCase());
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-highlight bg-highlight/10 border-highlight/20';
      case 'Approved': return 'text-primary bg-primary/10 border-primary/20 shadow-glow-primary';
      case 'Vehicle Assigned': return 'text-accent bg-accent/10 border-accent/20';
      case 'Pickup Ready': return 'text-accent bg-accent/10 border-accent/20 shadow-glow-accent';
      case 'Active Rental': return 'text-accent bg-accent/10 border-accent/20 animate-pulse';
      case 'Completed': return 'text-gray-400 bg-white/5 border-white/10';
      case 'Cancelled': return 'text-danger bg-danger/10 border-danger/20';
      default: return 'text-white bg-white/5 border-white/10';
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-accent';
      case 'Pending': return 'text-highlight';
      case 'Refunded': return 'text-gray-500';
      default: return 'text-white';
    }
  };

  const handleAction = (type, booking) => {
    setSelectedBooking(booking);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setTimeout(() => setSelectedBooking(null), 300);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Global <span className="text-primary">Reservations</span>
          </h2>
          <p className="text-gray-500 font-bold tracking-[0.2em] uppercase text-[10px] mt-2">Central Booking Ledger V.3</p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center w-full xl:w-auto">
          <div className="relative flex-1 xl:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search ID, Customer, Vehicle..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs font-bold text-white focus:border-primary/50 focus:outline-none focus:shadow-glow-primary transition-all placeholder:text-gray-600"
            />
          </div>
          <button className="px-4 py-3 bg-[#111827] border border-white/10 rounded-xl flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
             <CalendarIcon size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest">May 14 - 21</span>
          </button>
          <button className="p-3 bg-[#111827] border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
        {['All', 'Calendar', 'Pending', 'Completed'].map(tab => (
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

      {/* Responsive Table */}
      <div className="glass-panel overflow-hidden border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Node ID</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Identity</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Assigned Unit</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Window</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Lifecycle</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Escrow</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Directives</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredBookings.map((booking, index) => (
                  <motion.tr 
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-4 text-xs font-bold text-white">{booking.id}</td>
                    <td className="p-4">
                       <div className="flex flex-col">
                          <span className="text-sm font-black text-white italic uppercase">{booking.customer}</span>
                          <span className="text-[9px] font-bold text-gray-600 tracking-tighter">{booking.customerEmail}</span>
                       </div>
                    </td>
                    <td className="p-4">
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-white uppercase tracking-tight">{booking.vehicle}</span>
                          <span className="text-[9px] font-black text-primary/70 tracking-[0.2em]">{booking.vehicleId}</span>
                       </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{booking.pickup}</span>
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{booking.returnDate}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col items-start gap-1">
                         <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${getPaymentColor(booking.payment).replace('text-', 'bg-')}`}></div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${getPaymentColor(booking.payment)}`}>{booking.payment}</span>
                         </div>
                         <span className="text-[11px] font-black text-white">${booking.totalPrice}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleAction('view', booking)} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors" title="View Details"><Eye size={16} /></button>
                        
                        {booking.status === 'Pending' && (
                          <button onClick={() => handleAction('approve', booking)} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-accent hover:bg-accent/10 transition-colors" title="Approve"><Check size={16} /></button>
                        )}
                        
                        {(booking.status === 'Approved' || booking.status === 'Vehicle Assigned') && !booking.driver && (
                          <button onClick={() => handleAction('assign', booking)} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors" title="Assign Driver"><UserPlus size={16} /></button>
                        )}

                        {booking.status === 'Vehicle Assigned' && (
                          <button onClick={() => handleAction('mark-ready', booking)} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-highlight hover:bg-highlight/10 transition-colors" title="Mark Pickup Ready"><Zap size={16} /></button>
                        )}

                        <button onClick={() => handleAction('invoice', booking)} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors" title="Compile Invoice"><FileText size={16} /></button>
                        <button onClick={() => handleAction('cancel', booking)} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-danger hover:bg-danger/10 transition-colors" title="Terminate"><X size={16} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-12 text-center text-gray-500 font-black uppercase tracking-widest text-xs">
                      No matching records found in database.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals/Drawers - Simplified visually working representations */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end sm:items-stretch sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            {/* Operational Drawer */}
            {['view', 'approve', 'assign', 'mark-ready'].includes(modalType) && (
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full sm:w-[500px] bg-[#111827] border-l border-white/10 h-full p-8 shadow-2xl flex flex-col"
              >
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-xl bg-white/5 ${getStatusColor(selectedBooking?.status)}`}>
                        <Activity size={20} />
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Booking Interface</h3>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selectedBooking?.id}</p>
                     </div>
                  </div>
                  <button onClick={closeModal} className="p-2 text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
                </div>
                
                <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
                  {/* Status Progression */}
                  <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">Workflow Status</p>
                     <div className="flex justify-between items-center px-2">
                        {['Pending', 'Approved', 'Ready', 'Active'].map((s, i) => (
                           <div key={i} className="flex flex-col items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${i <= 1 ? 'bg-primary shadow-glow-primary' : 'bg-white/10'}`}></div>
                              <span className="text-[8px] font-black uppercase text-gray-500">{s}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                       <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Customer Profile</p>
                       <p className="text-sm font-black text-white uppercase italic">{selectedBooking?.customer}</p>
                       <p className="text-[9px] font-bold text-primary/70">{selectedBooking?.customerEmail}</p>
                    </div>
                    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                       <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Assigned Unit</p>
                       <p className="text-sm font-black text-white uppercase italic">{selectedBooking?.vehicle}</p>
                       <p className="text-[9px] font-bold text-accent">{selectedBooking?.vehicleId}</p>
                    </div>
                  </div>

                  {/* Logistics Detail */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Logistics Profile</h4>
                     <div className="glass-panel p-6 border-white/5 space-y-4">
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-3">
                              <CalendarIcon size={14} className="text-primary" />
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration</span>
                           </div>
                           <span className="text-[10px] font-black text-white uppercase tracking-widest">{selectedBooking?.pickup} — {selectedBooking?.returnDate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-3">
                              <CheckCircle2 size={14} className="text-primary" />
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hub Location</span>
                           </div>
                           <span className="text-[10px] font-black text-white uppercase tracking-widest">{selectedBooking?.location}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-3">
                              <Zap size={14} className="text-primary" />
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trip Status</span>
                           </div>
                           <span className="text-[10px] font-black text-accent uppercase tracking-widest">{selectedBooking?.tripStatus}</span>
                        </div>
                     </div>
                  </div>

                  {/* Documents & Verification */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Verification Vault</h4>
                     <div className="grid grid-cols-1 gap-3">
                        {selectedBooking?.docs.map((doc, i) => (
                           <div key={i} className="flex items-center justify-between p-4 bg-[#0A0E17] border border-white/5 rounded-xl group cursor-pointer hover:border-primary/30 transition-all">
                              <div className="flex items-center gap-3">
                                 <FileText size={14} className="text-gray-500 group-hover:text-primary transition-colors" />
                                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">{doc}</span>
                              </div>
                              <CheckCircle2 size={14} className="text-primary" />
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Notes Section */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Internal Directives</h4>
                     <div className="p-5 bg-primary/5 border border-primary/10 rounded-2xl italic">
                        <p className="text-[11px] text-gray-300 leading-relaxed font-medium">"{selectedBooking?.notes}"</p>
                     </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 shrink-0">
                  <div className="flex gap-4">
                     <button onClick={closeModal} className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all italic">
                        Cancel
                     </button>
                     <button onClick={closeModal} className="flex-[2] py-4 bg-primary text-[#0A0E17] rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-glow-primary hover:scale-105 transition-all italic flex justify-center items-center gap-2">
                        <CheckCircle2 size={16} /> 
                        {modalType === 'approve' ? 'Approve Protocol' : modalType === 'assign' ? 'Commit Assignment' : 'Execute Directive'}
                     </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Delete/Invoice Center Modal */}
            {['delete', 'invoice'].includes(modalType) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl p-8 shadow-2xl m-4"
              >
                <div className="text-center space-y-6">
                  <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-opacity-10 
                    ${modalType === 'delete' ? 'bg-danger text-danger' : 'bg-primary text-primary'}`}>
                    {modalType === 'delete' ? <Trash2 size={32} /> : <FileText size={32} />}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                      {modalType === 'delete' ? 'Terminate Record' : 'Generate Invoice'}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                      {modalType === 'delete' 
                        ? `Are you sure you want to permanently delete booking ${selectedBooking?.id}? This action cannot be reversed.`
                        : `Drafting invoice for ${selectedBooking?.id} (${selectedBooking?.customer}). Proceed to compile PDF?`}
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button onClick={closeModal} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-colors">
                      Cancel
                    </button>
                    <button onClick={closeModal} className={`flex-1 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all
                      ${modalType === 'delete' ? 'bg-danger/20 text-danger border border-danger/30 hover:bg-danger hover:text-white' : 'bg-primary text-[#0A0E17] shadow-glow-primary hover:scale-105'}`}>
                      {modalType === 'delete' ? 'Confirm Delete' : 'Compile Document'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBookings;
