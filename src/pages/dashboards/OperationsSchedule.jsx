import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, ChevronRight, 
  Search, Filter, Plus, User, Car, 
  AlertCircle, CheckCircle2, MoreVertical,
  Activity, ArrowRightLeft, X, Send
} from 'lucide-react';

import toast from 'react-hot-toast';

const OperationsSchedule = () => {
  const [scheduleItems, setScheduleItems] = useState([
    { 
      id: 'JOB-901', 
      type: 'Pickup', 
      time: '09:00', 
      customer: { name: 'Marcus Chen', id: 'CUST-881', tier: 'Gold' }, 
      vehicle: { name: 'Model S Plaid', id: 'UNIT-102', fuel: '92%', mileage: '12,402 km', status: 'Available' }, 
      hub: 'Downtown Hub', 
      status: 'Scheduled', 
      driver: 'Not Assigned',
      inspection: 'Pending',
      payment: 'Paid',
      color: 'text-primary' 
    },
    { 
      id: 'JOB-902', 
      type: 'Pickup', 
      time: '11:30', 
      customer: { name: 'Elena R.', id: 'CUST-102', tier: 'Platinum' }, 
      vehicle: { name: 'Lucid Air GT', id: 'UNIT-405', fuel: '85%', mileage: '4,100 km', status: 'Cleaning' }, 
      hub: 'Airport Hub', 
      status: 'Driver Assigned', 
      driver: 'Sarah Jenkins',
      inspection: 'In-Progress',
      payment: 'Paid',
      color: 'text-accent' 
    },
    { 
      id: 'JOB-903', 
      type: 'Return', 
      time: '14:00', 
      customer: { name: 'James Wilson', id: 'CUST-334', tier: 'Standard' }, 
      vehicle: { name: 'Rivian R1S', id: 'UNIT-901', fuel: '42%', mileage: '8,200 km', status: 'Active' }, 
      hub: 'Service Bay 2', 
      status: 'Active', 
      driver: 'Internal Staff',
      inspection: 'Completed',
      payment: 'Finalizing',
      color: 'text-highlight' 
    },
  ]);

  const [activeDate, setActiveDate] = useState('May 14');
  const [search, setSearch] = useState('');
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isCalendarView, setIsCalendarView] = useState(false);

  const handleUpdateStatus = (jobId, newStatus) => {
    setScheduleItems(prev => prev.map(item => {
      if (item.id === jobId) {
        let update = { status: newStatus };
        if (newStatus === 'Driver Assigned') update.driver = 'Sarah Jenkins';
        if (newStatus === 'Active') update.inspection = 'Completed';
        
        toast.success(`${jobId}: Status updated to ${newStatus}`, {
           icon: '⚡',
           style: { background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
        });
        
        return { ...item, ...update };
      }
      return item;
    }));
  };

  const filteredSchedule = scheduleItems.filter(job => 
    job.customer.name.toLowerCase().includes(search.toLowerCase()) || 
    job.id.toLowerCase().includes(search.toLowerCase()) ||
    job.vehicle.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Tactical <span className="text-accent">Schedule</span>
          </h2>
          <p className="text-gray-500 font-bold tracking-[0.2em] uppercase text-[10px] mt-2">Mission Timeline & Fleet Deployment</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setIsCalendarView(!isCalendarView)}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-gray-400 hover:text-white transition-all font-black uppercase tracking-widest text-[10px]"
          >
            <Calendar size={16} /> {isCalendarView ? 'List View' : 'Calendar View'}
          </button>
          <button 
            onClick={() => setIsDispatchModalOpen(true)}
            className="px-6 py-3 bg-accent/10 text-accent border border-accent/20 rounded-xl flex items-center gap-2 font-black uppercase tracking-widest text-[10px] shadow-glow-accent hover:scale-105 transition-all"
          >
            <Plus size={16} /> Create Dispatch
          </button>
        </div>
      </div>

      {/* Date Selector & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 glass-panel !p-4 border-white/5">
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto custom-scrollbar">
          {['May 12', 'May 13', 'May 14', 'May 15', 'May 16'].map((date) => (
            <button
              key={date}
              onClick={() => setActiveDate(date)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border
                ${activeDate === date 
                  ? 'bg-accent/20 border-accent/40 text-accent shadow-glow-accent' 
                  : 'bg-white/5 border-transparent text-gray-500 hover:text-white hover:bg-white/10'}
              `}
            >
              {date} {date === 'May 14' && '(Today)'}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50 group-focus-within:text-accent transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by ID, Client, Vehicle..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-xs font-bold text-white focus:outline-none focus:border-accent/50 transition-all placeholder-gray-600"
            />
          </div>
          <button className="p-3.5 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-white hover:bg-white/10 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Schedule Timeline Grid */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode='popLayout'>
          {filteredSchedule.map((job, index) => (
            <motion.div 
              key={job.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedJob(job)}
              className="glass-panel p-6 border-white/5 hover:border-accent/30 transition-all group relative overflow-hidden cursor-pointer"
            >
              {/* Status Glow Line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${job.status === 'Driver Assigned' || job.status === 'Active' ? 'bg-accent shadow-glow-accent' : 'bg-white/5'}`} />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Time & Type */}
                <div className="flex items-center gap-6 min-w-[150px]">
                  <div className="text-center">
                    <p className="text-2xl font-black text-white italic leading-none">{job.time}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-600 mt-1">Scheduled</p>
                  </div>
                  <div className={`px-3 py-1 rounded-lg border bg-white/5 ${job.color} border-white/10`}>
                    <span className="text-[10px] font-black uppercase tracking-widest">{job.type}</span>
                  </div>
                </div>

                {/* Main Info */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-accent transition-colors">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-600">Client Identity</p>
                      <p className="text-sm font-bold text-white uppercase">{job.customer.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors">
                      <Car size={20} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-600">Assigned Unit</p>
                      <p className="text-sm font-bold text-white uppercase">{job.vehicle.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-highlight transition-colors">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-600">Tactical Node</p>
                      <p className="text-sm font-bold text-white uppercase">{job.hub}</p>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-8">
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-600 mb-1">Mission Status</p>
                    <div className="flex items-center gap-2">
                       {job.status === 'Completed' ? <CheckCircle2 size={14} className="text-accent" /> : <Activity size={14} className="text-highlight animate-pulse" />}
                       <span className={`text-[10px] font-black uppercase tracking-widest ${job.status === 'Completed' ? 'text-accent' : 'text-highlight'}`}>
                        {job.status}
                       </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 relative" onClick={e => e.stopPropagation()}>
                    {job.status === 'Scheduled' && (
                       <button 
                        onClick={() => handleUpdateStatus(job.id, 'Driver Assigned')}
                        className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-xl text-[9px] font-black uppercase tracking-widest text-accent hover:bg-accent hover:text-black transition-all">
                          Assign Driver
                       </button>
                    )}
                    {job.status === 'Driver Assigned' && (
                       <button 
                        onClick={() => handleUpdateStatus(job.id, 'Active')}
                        className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all">
                          Start Pickup
                       </button>
                    )}
                    {job.status === 'Active' && (
                       <button 
                        onClick={() => handleUpdateStatus(job.id, 'Completed')}
                        className="px-4 py-2 bg-highlight/10 border border-highlight/20 rounded-xl text-[9px] font-black uppercase tracking-widest text-highlight hover:bg-highlight hover:text-black transition-all">
                          Mark Completed
                       </button>
                    )}
                    <button 
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Daily Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Dispatches', val: '08', color: 'text-primary' },
          { label: 'Active Missions', val: '14', color: 'text-accent' },
          { label: 'Maintenance Hold', val: '03', color: 'text-highlight' },
          { label: 'Completed Today', val: '22', color: 'text-gray-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-5 flex items-center justify-between border-white/5">
             <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-white">{stat.val}</p>
             </div>
             <div className={`w-1.5 h-10 rounded-full ${stat.color.replace('text-', 'bg-')}`}></div>
          </div>
        ))}
      </div>

      {/* Schedule Detail Drawer */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-sm"
              onClick={() => setSelectedJob(null)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full sm:w-[500px] bg-[#111827] border-l border-white/10 h-full p-8 shadow-2xl flex flex-col"
            >
               <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                  <div>
                     <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Mission Brief</h3>
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selectedJob.id}</p>
                  </div>
                  <button onClick={() => setSelectedJob(null)} className="p-2 text-gray-500 hover:text-white transition-colors">
                     <X size={20} />
                  </button>
               </div>

               <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
                  {/* Status Progress */}
                  <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl">
                     <div className="flex justify-between items-end mb-4">
                        <span className="text-[10px] font-black text-accent uppercase tracking-widest italic">Operational Phase</span>
                        <span className="text-xs font-black text-white uppercase">{selectedJob.status}</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
                        {[1, 2, 3, 4, 5, 6].map((step) => (
                           <div key={step} className={`h-full flex-1 rounded-full ${step <= 3 ? 'bg-accent shadow-glow-accent' : 'bg-white/10'}`}></div>
                        ))}
                     </div>
                  </div>

                  {/* Customer & Vehicle Grid */}
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3">Client Profile</p>
                        <p className="text-sm font-black text-white uppercase mb-1">{selectedJob.customer.name}</p>
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest px-2 py-0.5 border border-primary/20 rounded bg-primary/5">{selectedJob.customer.tier} Tier</span>
                     </div>
                     <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3">Assigned Asset</p>
                        <p className="text-sm font-black text-white uppercase mb-1">{selectedJob.vehicle.name}</p>
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{selectedJob.vehicle.id}</span>
                     </div>
                  </div>

                  {/* Operational Telemetry */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Tactical Data</h4>
                     <div className="glass-panel p-6 border-white/5 space-y-4">
                        {[
                           { label: 'Energy Level', val: selectedJob.vehicle.fuel, icon: Activity, color: 'text-accent' },
                           { label: 'Odometer', val: selectedJob.vehicle.mileage, icon: Car, color: 'text-primary' },
                           { label: 'Inspection', val: selectedJob.inspection, icon: CheckCircle2, color: 'text-highlight' },
                           { label: 'Payment', val: selectedJob.payment, icon: Send, color: 'text-accent' },
                           { label: 'Operator', val: selectedJob.driver, icon: User, color: 'text-primary' },
                        ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                 <item.icon size={14} className={item.color} />
                                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                              </div>
                              <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{item.val}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Hub / Location */}
                  <div className="p-5 bg-[#0A0E17] border border-white/5 rounded-2xl flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 text-primary rounded-xl">
                           <MapPin size={20} />
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Deployment Node</p>
                           <p className="text-sm font-black text-white uppercase italic">{selectedJob.hub}</p>
                        </div>
                     </div>
                     <button className="p-2 text-gray-500 hover:text-white transition-colors">
                        <ArrowRightLeft size={16} />
                     </button>
                  </div>
               </div>

               <div className="mt-8 pt-8 border-t border-white/10 flex gap-4 shrink-0">
                  <button onClick={() => setSelectedJob(null)} className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all italic">
                     Close
                  </button>
                  <button 
                    onClick={() => {
                       let nextStatus = '';
                       if (selectedJob.status === 'Scheduled') nextStatus = 'Driver Assigned';
                       else if (selectedJob.status === 'Driver Assigned') nextStatus = 'Active';
                       else if (selectedJob.status === 'Active') nextStatus = 'Completed';
                       
                       if (nextStatus) {
                          handleUpdateStatus(selectedJob.id, nextStatus);
                          setSelectedJob(null);
                       }
                    }}
                    className="flex-[2] py-4 bg-accent text-[#0A0E17] rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-glow-accent hover:scale-105 transition-all italic"
                  >
                     Advance Status Flow
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODALS */}
      <AnimatePresence>
        {isDispatchModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDispatchModalOpen(false)}
              className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl glass-panel !p-0 border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="bg-accent/10 p-8 border-b border-accent/20 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Initialize <span className="text-accent">Dispatch</span></h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/70 mt-1">Assign Tactical Asset to Mission</p>
                </div>
                <button onClick={() => setIsDispatchModalOpen(false)} className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Mission Type</label>
                    <select className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-gray-300 focus:outline-none focus:border-accent/50 transition-all appearance-none">
                      <option>Pickup Operations</option>
                      <option>Return Processing</option>
                      <option>Maintenance Relocation</option>
                      <option>Client Delivery</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Target Node (Hub)</label>
                    <select className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-gray-300 focus:outline-none focus:border-accent/50 transition-all appearance-none">
                      <option>Downtown Hub</option>
                      <option>Airport Station</option>
                      <option>Service Bay Alpha</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Asset Allocation (Vehicle)</label>
                    <input type="text" placeholder="Select Unit ID or Scan..." className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white focus:outline-none focus:border-accent/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Operator Assignment</label>
                    <input type="text" placeholder="Assign Driver..." className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white focus:outline-none focus:border-accent/50 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Mission Time</label>
                  <div className="flex gap-4">
                    <input type="time" defaultValue="09:00" className="w-1/3 bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white focus:outline-none focus:border-accent/50 transition-all [color-scheme:dark]" />
                    <input type="date" className="w-2/3 bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white focus:outline-none focus:border-accent/50 transition-all [color-scheme:dark]" />
                  </div>
                </div>

                <div className="pt-4">
                  <button onClick={() => setIsDispatchModalOpen(false)} className="w-full py-5 bg-accent text-[#0A0E17] font-black uppercase tracking-[0.2em] rounded-2xl shadow-glow-accent hover:scale-[1.01] transition-all flex items-center justify-center gap-3 text-xs italic">
                    <Send size={18} /> Launch Dispatch
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

export default OperationsSchedule;
