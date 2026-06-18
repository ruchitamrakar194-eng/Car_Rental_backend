import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, Tag, Search, Filter, Plus, ChevronRight, 
  Info, ShieldCheck, Zap, DollarSign, BarChart3,
  Edit, Trash2, MoreHorizontal, Eye, X, Check
} from 'lucide-react';

const mockInventory = [
  { 
    id: 'UNIT-9021', 
    name: 'Rolls-Royce Spectre', 
    type: 'Electric Luxury', 
    price: '$420,000', 
    status: 'Available', 
    year: '2024', 
    color: 'Midnight Blue', 
    image: 'https://images.unsplash.com/photo-1631215423533-31681273948e?q=80&w=800&auto=format&fit=crop',
    mileage: '1,240 mi',
    fuel: '94%',
    nextService: 'June 2026',
    revenue: '$124,500',
    trips: 14
  },
  { 
    id: 'UNIT-9022', 
    name: 'Lamborghini Revuelto', 
    type: 'Hybrid Hypercar', 
    price: '$608,000', 
    status: 'Active Rental', 
    year: '2024', 
    color: 'Arancio Apodis', 
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop',
    mileage: '4,800 mi',
    fuel: '42%',
    nextService: 'Immediate',
    revenue: '$208,000',
    trips: 42
  },
  { 
    id: 'UNIT-9023', 
    name: 'Bentley Batur', 
    type: 'Luxury Grand Tourer', 
    price: '$2,000,000', 
    status: 'Maintenance', 
    year: '2024', 
    color: 'Titanium Grey', 
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop',
    mileage: '800 mi',
    fuel: '100%',
    nextService: 'In Service',
    revenue: '$0',
    trips: 0
  },
  { 
    id: 'UNIT-9024', 
    name: 'Ferrari Purosangue', 
    type: 'Luxury SUV', 
    price: '$398,350', 
    status: 'Inspection', 
    year: '2023', 
    color: 'Rosso Corsa', 
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop',
    mileage: '2,150 mi',
    fuel: '88%',
    nextService: 'Aug 2026',
    revenue: '$45,200',
    trips: 8
  },
];

const AdminDealership = () => {
  const [activeTab, setActiveTab] = useState('All Fleet');
  const [search, setSearch] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalTab, setModalTab] = useState('Overview');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredInventory = mockInventory.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) || 
                         car.id.toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === 'Available' && car.status !== 'Available') return false;
    if (activeTab === 'Active' && car.status !== 'Active Rental') return false;
    if (activeTab === 'Service' && (car.status !== 'Maintenance' && car.status !== 'Inspection')) return false;
    
    return matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
            Luxury <span className="text-highlight">Showroom</span>
          </h2>
          <p className="text-gray-500 font-bold tracking-[0.2em] uppercase text-[10px] mt-2">Asset Management & Inventory V.1.2</p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center w-full xl:w-auto">
          <div className="relative flex-1 xl:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search VIN, Model, Brand..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111827] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs font-bold text-white focus:border-highlight/50 focus:outline-none transition-all placeholder:text-gray-600"
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-highlight text-[#0A0E17] rounded-xl flex items-center gap-2 font-black uppercase tracking-widest text-[10px] shadow-glow-highlight hover:scale-105 transition-all"
          >
            <Plus size={16} /> Add Vehicle
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Inventory Value', value: '$24.8M', sub: 'High Liquid Assets', icon: DollarSign, color: 'text-highlight' },
          { label: 'Units for Sale', value: '14', sub: 'Across 3 hubs', icon: Car, color: 'text-primary' },
          { label: 'Pending Sales', value: '08', sub: 'Awaiting completion', icon: Tag, color: 'text-accent' },
          { label: 'Sales Velocity', value: '+12%', sub: 'vs last month', icon: BarChart3, color: 'text-highlight' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 border-white/5 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
              <stat.icon size={32} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
            <h3 className="text-2xl font-black text-white mt-1 italic tracking-tighter">{stat.value}</h3>
            <p className="text-[9px] font-bold text-gray-600 mt-1 uppercase">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
        {['All Fleet', 'Available', 'Active', 'Service'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap
              ${activeTab === tab 
                ? 'bg-highlight text-[#0A0E17] shadow-glow-highlight' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredInventory.map((car, index) => (
            <motion.div 
              key={car.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="glass-panel overflow-hidden border-white/5 group"
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                   src={car.image} 
                   alt={car.name} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border backdrop-blur-md
                    ${car.status === 'Available' ? 'bg-primary/20 text-primary border-primary/30' : 
                      car.status === 'Active Rental' ? 'bg-accent/20 text-accent border-accent/30 shadow-glow-accent' : 
                      'bg-highlight/20 text-highlight border-highlight/30 animate-pulse'}`}>
                    {car.status}
                  </span>
                  <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-1.5">
                     <div className={`w-1 h-1 rounded-full ${parseInt(car.fuel) < 50 ? 'bg-danger animate-ping' : 'bg-accent'}`}></div>
                     <span className="text-[8px] font-black text-white uppercase">{car.fuel}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-black text-white uppercase italic tracking-tight leading-tight">{car.name}</h4>
                    <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mt-1">{car.id}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-white">{car.revenue}</p>
                     <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Revenue</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                   <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Odometer</p>
                      <p className="text-xs font-black text-white">{car.mileage}</p>
                   </div>
                   <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Service</p>
                      <p className={`text-xs font-black ${car.nextService === 'Immediate' || car.nextService === 'In Service' ? 'text-highlight' : 'text-white'}`}>
                         {car.nextService}
                      </p>
                   </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedCar(car)}
                    className="flex-1 py-4 bg-primary text-[#0A0E17] rounded-xl font-black uppercase tracking-[0.2em] text-[10px] italic shadow-glow-primary hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <Eye size={14} /> View Details
                  </button>
                  <button className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
                    <Edit size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Vehicle Detail Drawer */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end sm:items-stretch sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-sm"
              onClick={() => setSelectedCar(null)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full sm:w-[500px] bg-[#111827] border-l border-white/10 h-full p-8 shadow-2xl flex flex-col"
            >
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                     <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <Car size={24} />
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{selectedCar.name}</h3>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selectedCar.id}</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedCar(null)} className="p-2 text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
                </div>

                {/* Tabs Navigation */}
                <div className="flex gap-4 mb-8">
                   {['Overview', 'Maintenance', 'Revenue'].map(tab => (
                      <button 
                         key={tab}
                         onClick={() => setModalTab(tab)}
                         className={`text-[10px] font-black uppercase tracking-widest pb-2 border-b-2 transition-all
                            ${modalTab === tab ? 'text-primary border-primary' : 'text-gray-600 border-transparent hover:text-gray-400'}`}
                      >
                         {tab}
                      </button>
                   ))}
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-8">
                   {modalTab === 'Overview' && (
                      <div className="space-y-8">
                         <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video">
                            <img src={selectedCar.image} className="w-full h-full object-cover" alt="Vehicle Detail" />
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                               <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Status Protocol</p>
                               <span className="text-xs font-black text-primary uppercase italic">{selectedCar.status}</span>
                            </div>
                            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                               <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Energy Level</p>
                               <span className="text-xs font-black text-accent uppercase italic">{selectedCar.fuel}</span>
                            </div>
                         </div>

                         <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Specifications</h4>
                            <div className="glass-panel p-6 border-white/5 space-y-4">
                               {[
                                 { label: 'Category', val: selectedCar.type, icon: Tag },
                                 { label: 'Odometer', val: selectedCar.mileage, icon: BarChart3 },
                                 { label: 'Acquisition', val: selectedCar.year, icon: DollarSign },
                                 { label: 'Finish', val: selectedCar.color, icon: Info },
                               ].map((item, i) => (
                                  <div key={i} className="flex justify-between items-center">
                                     <div className="flex items-center gap-3">
                                        <item.icon size={14} className="text-primary" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                                     </div>
                                     <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.val}</span>
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   )}

                   {modalTab === 'Maintenance' && (
                      <div className="space-y-8">
                         <div className="p-6 bg-highlight/5 border border-highlight/20 rounded-2xl">
                            <div className="flex items-center gap-4 mb-4">
                               <div className="p-3 bg-highlight/10 text-highlight rounded-xl">
                                  <Zap size={20} />
                                </div>
                                <div>
                                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Service Status</p>
                                   <p className="text-sm font-black text-white uppercase italic">{selectedCar.nextService}</p>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full w-[80%] bg-highlight shadow-[0_0_10px_#FDBA74]"></div>
                            </div>
                         </div>

                         <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Service History</h4>
                            {[
                               { label: 'Annual Inspection', date: 'Jan 14, 2026', status: 'Cleared' },
                               { label: 'Tire Rotation', date: 'Nov 12, 2025', status: 'Success' },
                               { label: 'Brake Fluid Flush', date: 'Aug 28, 2025', status: 'Success' },
                            ].map((item, i) => (
                               <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-center">
                                  <div>
                                     <p className="text-[10px] font-black text-white uppercase tracking-widest">{item.label}</p>
                                     <p className="text-[8px] font-bold text-gray-600 uppercase mt-1">{item.date}</p>
                                  </div>
                                  <span className="text-[8px] font-black text-accent uppercase tracking-widest">{item.status}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}

                   {modalTab === 'Revenue' && (
                      <div className="space-y-8">
                         <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 glass-panel border-primary/20 bg-primary/5">
                               <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Life Earnings</p>
                               <p className="text-2xl font-black text-white italic">{selectedCar.revenue}</p>
                            </div>
                            <div className="p-6 glass-panel border-accent/20 bg-accent/5">
                               <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Trip Count</p>
                               <p className="text-2xl font-black text-white italic">{selectedCar.trips}</p>
                            </div>
                         </div>

                         <div className="p-6 bg-[#0A0E17] border border-white/5 rounded-2xl">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4">Earnings Velocity</p>
                            <div className="h-40 flex items-end justify-between px-2">
                               {[40, 70, 45, 90, 65, 80].map((h, i) => (
                                  <div key={i} className="w-8 bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-all" style={{ height: `${h}%` }}></div>
                               ))}
                            </div>
                         </div>
                      </div>
                   )}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 shrink-0">
                  <div className="flex gap-4">
                     <button onClick={() => setSelectedCar(null)} className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all italic">
                        Close
                     </button>
                     <button className="flex-[2] py-4 bg-highlight text-[#0A0E17] rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-glow-highlight hover:scale-105 transition-all italic">
                        Change Vehicle Status
                     </button>
                  </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Vehicle Modal (Simplified) */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#111827] border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8">New Acquisition</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Vehicle Name</label>
                  <input type="text" placeholder="e.g. Ferrari 296 GTB" className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white focus:outline-none focus:border-highlight/50 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Category</label>
                    <select className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white focus:outline-none focus:border-highlight/50 transition-all">
                      <option>Electric Luxury</option>
                      <option>Supercar</option>
                      <option>Luxury SUV</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">MSRP</label>
                    <input type="text" placeholder="$0.00" className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white focus:outline-none focus:border-highlight/50 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">VIN / Chassis Number</label>
                  <input type="text" placeholder="EX: 1HGBH4..." className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white focus:outline-none focus:border-highlight/50 transition-all" />
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-colors">
                  Cancel
                </button>
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 bg-highlight text-[#0A0E17] rounded-xl font-black uppercase tracking-widest text-[10px] shadow-glow-highlight">
                  Register Asset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDealership;
