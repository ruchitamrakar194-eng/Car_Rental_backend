import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Navigation, MapPin, Clock, 
  ArrowRight, CheckCircle2, Zap, 
  DollarSign, Smartphone, ShieldCheck,
  ChevronRight, Calendar, AlertTriangle, 
  Phone, X, ChevronDown, ChevronUp, AlertOctagon, 
  Wrench, LifeBuoy
} from 'lucide-react';
import toast from 'react-hot-toast';

const DriverDashboard = () => {
  const [driverStatus, setDriverStatus] = useState('Online'); // Online, Offline, Busy, Break
  const [showEmergency, setShowEmergency] = useState(false);
  const [showLaterTasks, setShowLaterTasks] = useState(false);
  
  // Trip States: Assigned -> Accepted -> En Route -> Arrived -> Verified -> Active -> Completed
  const [tripState, setTripState] = useState('Assigned'); 

  const currentMission = {
    id: 'TRP-1092',
    vehicle: 'Tesla Model S Plaid',
    plate: 'EV-992-X',
    pickup: 'Downtown Hub (Zone B)',
    dropoff: 'Airport Terminal 2',
    client: 'Marcus Chen',
    clientPhone: '+1 (555) 902-1122',
    eta: '12 min',
    battery: 82
  };

  const nextMission = {
    id: 'TRP-1093',
    type: 'Pickup',
    location: 'West End Hub',
    time: '16:00',
    vehicle: 'Rivian R1T'
  };

  const laterMissions = [
    { id: 'TRP-1094', type: 'Return', location: 'Station A', time: '17:30', vehicle: 'Lucid Air' },
    { id: 'TRP-1095', type: 'Pickup', location: 'Central Hub', time: '19:00', vehicle: 'Model 3' },
  ];

  const getPrimaryCTA = () => {
    switch (tripState) {
      case 'Assigned': return { label: 'ACCEPT MISSION', icon: CheckCircle2, color: 'bg-primary' };
      case 'Accepted': return { label: 'START NAVIGATION', icon: Navigation, color: 'bg-highlight' };
      case 'En Route': return { label: 'ARRIVED AT PICKUP', icon: MapPin, color: 'bg-accent' };
      case 'Arrived': return { label: 'START INSPECTION', icon: ShieldCheck, color: 'bg-primary' };
      case 'Verified': return { label: 'START TRIP', icon: Zap, color: 'bg-highlight' };
      case 'Active': return { label: 'COMPLETE MISSION', icon: CheckCircle2, color: 'bg-accent' };
      default: return { label: 'NO ACTIVE MISSION', icon: Clock, color: 'bg-gray-600' };
    }
  };

  const handleCTAAction = () => {
    const states = ['Assigned', 'Accepted', 'En Route', 'Arrived', 'Verified', 'Active', 'Completed'];
    const currentIndex = states.indexOf(tripState);
    if (currentIndex < states.length - 1) {
      const nextState = states[currentIndex + 1];
      setTripState(nextState);
      toast.success(`Status updated: ${nextState}`, {
         icon: '🛰️',
         style: { background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      });
    }
  };

  const cta = getPrimaryCTA();

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-32">
      {/* Mobile-Friendly Header with Availability */}
      <header className="flex justify-between items-center px-2">
         <div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none">Command <span className="text-highlight">Node</span></h2>
            <div className="flex items-center gap-2 mt-2">
               <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${driverStatus === 'Online' ? 'bg-highlight' : 'bg-gray-500'}`}></div>
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Status: {driverStatus}</p>
            </div>
         </div>
         
         <div className="flex gap-2">
            {['Online', 'Busy', 'Break'].map(status => (
               <button 
                  key={status}
                  onClick={() => {
                     setDriverStatus(status);
                     toast(`Status changed to ${status}`, { icon: '🔄' });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all
                     ${driverStatus === status ? 'bg-highlight/10 border-highlight text-highlight shadow-glow-accent' : 'bg-white/5 border-transparent text-gray-600'}
                  `}
               >
                  {status}
               </button>
            ))}
         </div>
      </header>

      {/* ACTIVE NOW - ONE TASK FOCUS */}
      <section className="space-y-4">
         <div className="flex justify-between items-end px-2">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-highlight italic">Active Now</h3>
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{currentMission.id}</span>
         </div>

         <motion.div 
            layout
            className="glass-panel !p-0 border-highlight/30 overflow-hidden shadow-[0_0_50px_rgba(253,186,116,0.1)] relative"
         >
            {/* Status Header */}
            <div className="bg-highlight/10 p-6 flex justify-between items-center border-b border-highlight/20">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-highlight/20 rounded-lg text-highlight">
                     <Zap size={20} className="animate-pulse" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-highlight italic">{tripState}</span>
               </div>
               {tripState !== 'Assigned' && (
                  <span className="text-xs font-black text-white bg-[#0A0E17] px-3 py-1 rounded-full border border-highlight/30">
                     {currentMission.eta} ETA
                  </span>
               )}
            </div>

            <div className="p-8 space-y-8">
               <div className="flex justify-between items-start">
                  <div>
                     <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">{currentMission.vehicle}</h3>
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mt-2">{currentMission.plate} • {currentMission.battery}% ENERGY</p>
                  </div>
                  <button className="p-4 bg-white/5 rounded-2xl text-highlight hover:bg-highlight hover:text-black transition-all">
                     <Phone size={20} />
                  </button>
               </div>

               {/* Route Info */}
               <div className="space-y-6 relative">
                  <div className="absolute left-[9px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-highlight via-accent to-primary opacity-30"></div>
                  
                  <div className="flex gap-6 items-start">
                     <div className="w-4 h-4 rounded-full border-2 border-highlight bg-[#0A0E17] z-10 mt-1 shadow-glow-accent"></div>
                     <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-gray-600">Client / Pickup Origin</p>
                        <p className="text-lg font-bold text-white leading-tight">{currentMission.client}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{currentMission.pickup}</p>
                     </div>
                  </div>

                  <div className="flex gap-6 items-start">
                     <div className="w-4 h-4 rounded-full border-2 border-accent bg-[#0A0E17] z-10 mt-1 shadow-glow-primary"></div>
                     <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-gray-600">Dropoff Destination</p>
                        <p className="text-sm font-bold text-white uppercase">{currentMission.dropoff}</p>
                     </div>
                  </div>
               </div>

               {/* SINGLE PRIMARY CTA */}
               {tripState !== 'Completed' ? (
                  <button 
                     onClick={handleCTAAction}
                     className={`w-full py-6 ${cta.color} text-[#0A0E17] font-black uppercase tracking-[0.3em] rounded-2xl shadow-2xl flex items-center justify-center gap-4 text-sm italic transition-all active:scale-95 group`}
                  >
                     <cta.icon size={20} className="group-hover:scale-125 transition-transform" /> {cta.label}
                  </button>
               ) : (
                  <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl flex flex-col items-center justify-center gap-3">
                     <CheckCircle2 className="text-accent" size={40} />
                     <p className="text-xs font-black text-accent uppercase tracking-widest">Mission Successfully Sealed</p>
                     <button 
                        onClick={() => setTripState('Assigned')}
                        className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white underline mt-2"
                     >
                        Reset Mock State
                     </button>
                  </div>
               )}
            </div>
         </motion.div>
      </section>

      {/* UP NEXT - SECONDARY FOCUS */}
      <section className="space-y-4">
         <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-600 px-2 italic">Up Next</h3>
         <div className="glass-panel p-6 flex items-center justify-between border-white/5 opacity-60">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                  <Calendar size={20} />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-white tracking-tight uppercase">{nextMission.vehicle}</h4>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">{nextMission.location} • {nextMission.time}</p>
               </div>
            </div>
            <ChevronRight size={20} className="text-gray-800" />
         </div>
      </section>

      {/* LATER TODAY - COLLAPSED QUEUE */}
      <section className="space-y-4">
         <button 
            onClick={() => setShowLaterTasks(!showLaterTasks)}
            className="w-full flex items-center justify-between px-2 text-gray-600 hover:text-white transition-colors"
         >
            <h3 className="text-xs font-black uppercase tracking-[0.4em] italic">Later Today</h3>
            {showLaterTasks ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
         </button>
         
         <AnimatePresence>
            {showLaterTasks && (
               <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden space-y-3"
               >
                  {laterMissions.map(mission => (
                     <div key={mission.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between opacity-40">
                        <div className="flex items-center gap-3">
                           <Clock size={14} className="text-gray-600" />
                           <span className="text-[10px] font-bold text-gray-400 uppercase">{mission.vehicle}</span>
                        </div>
                        <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">{mission.time}</span>
                     </div>
                  ))}
               </motion.div>
            )}
         </AnimatePresence>
      </section>

      {/* EMERGENCY SUPPORT - BOTTOM SHEET */}
      <div className="fixed bottom-24 right-4 z-40">
         <button 
            onClick={() => setShowEmergency(!showEmergency)}
            className="w-14 h-14 bg-danger/10 border border-danger/30 rounded-full flex items-center justify-center text-danger shadow-glow-danger active:scale-95 transition-all"
         >
            <AlertOctagon size={24} />
         </button>
      </div>

      <AnimatePresence>
         {showEmergency && (
            <div className="fixed inset-0 z-50 flex items-end">
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0A0E17]/90 backdrop-blur-md"
                  onClick={() => setShowEmergency(false)}
               />
               <motion.div 
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  className="relative w-full bg-[#111827] border-t border-white/10 p-8 rounded-t-[32px] space-y-6"
               >
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Support <span className="text-danger">Node</span></h3>
                     <button onClick={() => setShowEmergency(false)} className="p-2 text-gray-500 hover:text-white"><X size={24} /></button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                     <button className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-danger/10 hover:border-danger/30 transition-all text-left">
                        <AlertTriangle className="text-danger" size={24} />
                        <div>
                           <p className="text-sm font-bold text-white uppercase">Report Critical Damage</p>
                           <p className="text-[10px] text-gray-600 font-medium uppercase tracking-widest mt-1">For new structural integrity issues</p>
                        </div>
                     </button>
                     <button className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary/10 hover:border-primary/30 transition-all text-left">
                        <Wrench className="text-primary" size={24} />
                        <div>
                           <p className="text-sm font-bold text-white uppercase">Vehicle Malfunction</p>
                           <p className="text-[10px] text-gray-600 font-medium uppercase tracking-widest mt-1">Hardware/Software errors detected</p>
                        </div>
                     </button>
                     <button className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-highlight/10 hover:border-highlight/30 transition-all text-left">
                        <LifeBuoy className="text-highlight" size={24} />
                        <div>
                           <p className="text-sm font-bold text-white uppercase">Connect with Dispatch</p>
                           <p className="text-[10px] text-gray-600 font-medium uppercase tracking-widest mt-1">Direct tactical line to command center</p>
                        </div>
                     </button>
                  </div>
                  
                  <button onClick={() => setShowEmergency(false)} className="w-full py-4 bg-white/5 text-gray-500 font-black uppercase tracking-widest rounded-2xl text-[10px]">Cancel</button>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* MOBILE PERSISTENT STATUS BAR */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-lg z-30 pointer-events-none">
         <div className="w-full py-4 bg-[#111827]/80 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl backdrop-blur-xl">
            <Smartphone size={16} className="text-highlight" /> Active Node: {driverStatus} • {tripState}
         </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
