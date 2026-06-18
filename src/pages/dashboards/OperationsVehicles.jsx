import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Plus, ChevronRight, X, 
  BatteryCharging, Gauge, Zap, MapPin, 
  CheckCircle2, AlertCircle, Wrench, Activity, 
  Droplets, ShieldCheck, Eye, MoreHorizontal
} from 'lucide-react';

const mockVehicles = [
  { 
    id: 'UNIT-405', 
    name: 'Lucid Air GT', 
    status: 'Cleaning', 
    fuel: '85%', 
    mileage: '4,100 km', 
    location: 'Cleaning Bay 1', 
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=800&auto=format&fit=crop',
    readiness: 65,
    tasks: ['Interior Vacuum', 'Exterior Wash', 'Restock Supplies']
  },
  { 
    id: 'UNIT-102', 
    name: 'Model S Plaid', 
    status: 'Inspection', 
    fuel: '92%', 
    mileage: '12,402 km', 
    location: 'Service Hub Alpha', 
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
    readiness: 40,
    tasks: ['Brake Check', 'Tire Pressure', 'Software Update']
  },
  { 
    id: 'UNIT-901', 
    name: 'Rivian R1S', 
    status: 'Ready', 
    fuel: '100%', 
    mileage: '8,200 km', 
    location: 'Downtown Hub', 
    image: 'https://images.unsplash.com/photo-1669062334460-7a87e5960098?q=80&w=800&auto=format&fit=crop',
    readiness: 100,
    tasks: []
  },
];

const OperationsVehicles = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filteredVehicles = mockVehicles.filter(v => {
    if (activeTab === 'Ready' && v.status !== 'Ready') return false;
    if (activeTab === 'Maintenance' && (v.status !== 'Cleaning' && v.status !== 'Inspection')) return false;
    return v.name.toLowerCase().includes(search.toLowerCase()) || v.id.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Fleet <span className="text-accent">Readiness</span>
          </h2>
          <p className="text-gray-500 font-bold tracking-[0.2em] uppercase text-[10px] mt-2">Operational Asset Inventory & Prep Flow</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-gray-400 hover:text-white transition-all font-black uppercase tracking-widest text-[10px]"
          >
            <Activity size={16} /> Readiness Report
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between glass-panel !p-4 border-white/5">
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto custom-scrollbar">
          {['All', 'Ready', 'In Use', 'Maintenance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border
                ${activeTab === tab 
                  ? 'bg-accent/20 border-accent/40 text-accent shadow-glow-accent' 
                  : 'bg-white/5 border-transparent text-gray-500 hover:text-white hover:bg-white/10'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/50 group-focus-within:text-accent transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search asset ID or model..." 
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

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode='popLayout'>
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="glass-panel overflow-hidden border-white/5 group relative"
            >
               {/* Readiness Progress Bar Top */}
               <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden z-10">
                  <div className={`h-full bg-accent shadow-glow-accent transition-all duration-1000`} style={{ width: `${vehicle.readiness}%` }}></div>
               </div>

              <div className="h-56 relative overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B26] via-transparent to-transparent" />
                
                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md z-10 
                   ${vehicle.status === 'Ready' ? 'bg-accent/10 text-accent border-accent/20' : 
                     vehicle.status === 'Cleaning' ? 'bg-primary/10 text-primary border-primary/20' : 
                     'bg-highlight/10 text-highlight border-highlight/20'}`}>
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse 
                       ${vehicle.status === 'Ready' ? 'bg-accent' : 
                         vehicle.status === 'Cleaning' ? 'bg-primary' : 
                         'bg-highlight'}`}></span>
                    {vehicle.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <h3 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">{vehicle.name}</h3>
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">{vehicle.id} • {vehicle.location}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-lg font-black text-white italic tracking-tighter">{vehicle.readiness}%</p>
                       <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-none">Readiness</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                       <div className="flex items-center gap-2 mb-1">
                          <BatteryCharging size={12} className="text-accent" />
                          <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Energy</span>
                       </div>
                       <p className="text-xs font-black text-white">{vehicle.fuel}</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                       <div className="flex items-center gap-2 mb-1">
                          <Gauge size={12} className="text-primary" />
                          <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Odo</span>
                       </div>
                       <p className="text-xs font-black text-white">{vehicle.mileage}</p>
                    </div>
                 </div>

                 <div className="flex gap-2">
                    <button 
                       onClick={() => setSelectedVehicle(vehicle)}
                       className="flex-1 py-4 bg-accent/10 border border-accent/20 text-accent rounded-xl font-black uppercase tracking-widest text-[10px] italic hover:bg-accent hover:text-black transition-all flex items-center justify-center gap-2"
                    >
                       <Zap size={14} /> Readiness Flow
                    </button>
                    <button className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-white transition-all">
                       <Eye size={16} />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* READINESS DETAIL DRAWER */}
      <AnimatePresence>
        {selectedVehicle && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-sm"
              onClick={() => setSelectedVehicle(null)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full sm:w-[500px] bg-[#111827] border-l border-white/10 h-full p-8 shadow-2xl flex flex-col"
            >
               <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                  <div>
                     <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Readiness Protocol</h3>
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selectedVehicle.id}</p>
                  </div>
                  <button onClick={() => setSelectedVehicle(null)} className="p-2 text-gray-500 hover:text-white transition-colors">
                     <X size={20} />
                  </button>
               </div>

               <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
                  {/* Summary Card */}
                  <div className="p-6 bg-[#0A0E17] border border-white/5 rounded-2xl relative overflow-hidden">
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                           <h4 className="text-xl font-black text-white uppercase italic tracking-tight leading-none">{selectedVehicle.name}</h4>
                           <span className="text-[9px] font-black text-accent uppercase tracking-widest mt-2 block italic">{selectedVehicle.status} Operations</span>
                        </div>
                        <div className="text-right">
                           <p className="text-3xl font-black text-accent italic leading-none">{selectedVehicle.readiness}%</p>
                           <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">Readiness</p>
                        </div>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-accent shadow-glow-accent transition-all duration-1000" style={{ width: `${selectedVehicle.readiness}%` }}></div>
                     </div>
                  </div>

                  {/* Readiness Checklist */}
                  <div className="space-y-4">
                     <div className="flex justify-between items-center ml-2">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Readiness Checklist</h4>
                        <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{selectedVehicle.tasks.length} Pending</span>
                     </div>
                     <div className="space-y-3">
                        {selectedVehicle.tasks.length > 0 ? (
                           selectedVehicle.tasks.map((task, i) => (
                              <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-accent/20 transition-all cursor-pointer group">
                                 <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-accent/50 transition-all">
                                    <div className="w-2 h-2 rounded-sm bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 </div>
                                 <span className="text-[10px] font-bold text-white uppercase tracking-wide group-hover:text-accent transition-all">{task}</span>
                              </div>
                           ))
                        ) : (
                           <div className="p-6 bg-accent/5 border border-dashed border-accent/20 rounded-xl flex flex-col items-center justify-center gap-3">
                              <ShieldCheck className="text-accent" size={32} />
                              <p className="text-[10px] font-black text-accent uppercase tracking-widest">Asset Fully Optimized</p>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Photolog */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Inspection Photolog</h4>
                     <div className="grid grid-cols-2 gap-3">
                        {[
                           { label: 'Exterior Front', status: 'Verified', icon: ShieldCheck, color: 'text-accent' },
                           { label: 'Interior Cabin', status: 'Pending', icon: Droplets, color: 'text-gray-600' },
                           { label: 'Engine Bay', status: 'Verified', icon: ShieldCheck, color: 'text-accent' },
                           { label: 'Tire Condition', status: 'Pending', icon: Wrench, color: 'text-gray-600' },
                        ].map((img, i) => (
                           <div key={i} className="aspect-video bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-2 group hover:border-accent/40 transition-all cursor-pointer relative overflow-hidden">
                              <img src={selectedVehicle.image} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity" alt="Inspection" />
                              <div className="relative z-10 flex flex-col items-center">
                                 <img.icon size={20} className={img.color} />
                                 <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-2 group-hover:text-white">{img.label}</span>
                                 <span className={`text-[7px] font-black uppercase mt-1 ${img.status === 'Verified' ? 'text-accent' : 'text-gray-700'}`}>{img.status}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="mt-8 pt-8 border-t border-white/10 flex gap-4 shrink-0">
                  <button onClick={() => setSelectedVehicle(null)} className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all italic">
                     Abort
                  </button>
                  <button className="flex-[2] py-4 bg-accent text-[#0A0E17] rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-glow-accent hover:scale-105 transition-all italic">
                     Deploy to Global Pool
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OperationsVehicles;
