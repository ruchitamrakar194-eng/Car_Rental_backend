import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Calendar, Clock, 
  MapPin, ChevronRight, User, Car, 
  CheckCircle2, Navigation, Phone, 
  X, Info, Send, FileText
} from 'lucide-react';

const mockPersonalTrips = [
  { 
    id: 'TRP-1092', 
    status: 'Active', 
    customer: 'Marcus Chen', 
    vehicle: 'Tesla Model S Plaid', 
    pickup: 'Downtown Hub', 
    dropoff: 'Airport Terminal 2', 
    time: '14:30', 
    eta: '12 min', 
    payment: 'Paid',
    plate: 'EV-992-X'
  },
  { 
    id: 'TRP-1088', 
    status: 'Completed', 
    customer: 'Sarah Jenkins', 
    vehicle: 'Lucid Air GT', 
    pickup: 'West End Station', 
    dropoff: 'Corporate Plaza', 
    time: '11:00', 
    payment: 'Paid',
    plate: 'EV-405-L'
  },
  { 
    id: 'TRP-1093', 
    status: 'Assigned', 
    customer: 'Elena Rodriguez', 
    vehicle: 'Rivian R1T', 
    pickup: 'Central Logistics', 
    dropoff: 'North Station', 
    time: '16:00', 
    payment: 'Pending',
    plate: 'EV-901-R'
  }
];

const MyTrips = () => {
  const [activeTab, setActiveTab] = useState('Active'); // Assigned, Active, Completed
  const [selectedTrip, setSelectedTrip] = useState(null);

  const filteredTrips = mockPersonalTrips.filter(t => t.status === activeTab);

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <header className="px-2">
         <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
            My <span className="text-highlight">Missions</span>
         </h2>
         <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-2">Personal Assignment Log</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 bg-[#111827] p-1 rounded-2xl border border-white/5">
         {['Assigned', 'Active', 'Completed'].map(tab => (
            <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                  ${activeTab === tab ? 'bg-highlight text-[#0A0E17] shadow-glow-accent' : 'text-gray-500 hover:text-white'}
               `}
            >
               {tab}
            </button>
         ))}
      </div>

      {/* Trip List */}
      <div className="space-y-4">
         <AnimatePresence mode='wait'>
            {filteredTrips.length > 0 ? (
               <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
               >
                  {filteredTrips.map(trip => (
                     <div 
                        key={trip.id}
                        onClick={() => setSelectedTrip(trip)}
                        className="glass-panel p-6 border-white/5 hover:border-highlight/30 transition-all group cursor-pointer relative overflow-hidden"
                     >
                        {/* Status Accent */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${trip.status === 'Active' ? 'bg-highlight shadow-glow-accent' : 'bg-white/10'}`} />

                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <p className="text-[8px] font-black text-gray-600 uppercase tracking-[0.3em] mb-1">{trip.id}</p>
                              <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{trip.vehicle}</h3>
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] font-black text-white italic">{trip.time}</p>
                              <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">Scheduled</p>
                           </div>
                        </div>

                        <div className="space-y-4 relative">
                           <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/5" />
                           
                           <div className="flex items-center gap-4">
                              <div className="w-4 h-4 rounded-full border border-highlight bg-[#0A0E17] z-10" />
                              <p className="text-[10px] font-bold text-gray-400 uppercase truncate">{trip.pickup}</p>
                           </div>

                           <div className="flex items-center gap-4">
                              <div className="w-4 h-4 rounded-full border border-accent bg-[#0A0E17] z-10" />
                              <p className="text-[10px] font-bold text-gray-400 uppercase truncate">{trip.dropoff}</p>
                           </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500">
                                 <User size={14} />
                              </div>
                              <span className="text-[10px] font-black text-white uppercase">{trip.customer}</span>
                           </div>
                           <ChevronRight size={18} className="text-gray-800 group-hover:text-highlight transition-colors" />
                        </div>
                     </div>
                  ))}
               </motion.div>
            ) : (
               <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                  <Calendar size={48} className="text-gray-600" />
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">No Missions in this quadrant</p>
               </div>
            )}
         </AnimatePresence>
      </div>

      {/* TRIP DETAIL DRAWER */}
      <AnimatePresence>
         {selectedTrip && (
            <div className="fixed inset-0 z-[110] flex justify-end">
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-md"
                  onClick={() => setSelectedTrip(null)}
               />
               <motion.div 
                  initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="relative w-full sm:w-[500px] bg-[#111827] border-l border-white/10 h-full p-8 shadow-2xl flex flex-col"
               >
                  <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                     <div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Mission Brief</h3>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selectedTrip.id}</p>
                     </div>
                     <button onClick={() => setSelectedTrip(null)} className="p-2 text-gray-500 hover:text-white"><X size={24} /></button>
                  </div>

                  <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
                     {/* Client Profile */}
                     <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-2xl bg-highlight/20 border border-highlight/30 flex items-center justify-center text-highlight">
                              <User size={28} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Client Name</p>
                              <h4 className="text-lg font-black text-white uppercase italic">{selectedTrip.customer}</h4>
                           </div>
                        </div>
                        <button className="p-4 bg-highlight/10 text-highlight rounded-xl hover:bg-highlight hover:text-black transition-all">
                           <Phone size={20} />
                        </button>
                     </div>

                     {/* Asset Details */}
                     <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Assigned Asset</p>
                        <div className="flex items-center gap-4">
                           <Car className="text-primary" size={24} />
                           <div>
                              <h4 className="text-md font-bold text-white uppercase tracking-tight">{selectedTrip.vehicle}</h4>
                              <p className="text-[10px] text-gray-600 font-black uppercase mt-1">{selectedTrip.plate}</p>
                           </div>
                        </div>
                     </div>

                     {/* Strategic Route */}
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Strategic Route</h4>
                        <div className="glass-panel p-6 border-white/5 space-y-6">
                           <div className="flex gap-4">
                              <MapPin className="text-highlight mt-1" size={18} />
                              <div>
                                 <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Deployment Point</p>
                                 <p className="text-sm font-bold text-white uppercase mt-1">{selectedTrip.pickup}</p>
                              </div>
                           </div>
                           <div className="flex gap-4">
                              <Navigation className="text-accent mt-1" size={18} />
                              <div>
                                 <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Target Destination</p>
                                 <p className="text-sm font-bold text-white uppercase mt-1">{selectedTrip.dropoff}</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Operational Notes */}
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Operational Notes</h4>
                        <div className="p-6 bg-[#0A0E17] border border-white/5 rounded-2xl text-xs text-gray-400 leading-relaxed font-bold">
                           "Client requested contactless delivery. Verify OTP at dropoff and capture photo of the unit in Zone B. Ensure battery is above 80%."
                        </div>
                     </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 flex gap-4 shrink-0">
                     <button className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all italic">
                        View Proofs
                     </button>
                     <button className="flex-[2] py-4 bg-highlight text-[#0A0E17] rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-glow-accent hover:scale-105 transition-all italic flex items-center justify-center gap-3">
                        <Navigation size={16} /> Launch Mission
                     </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default MyTrips;
