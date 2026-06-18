import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Star, MapPin, Zap, 
  ChevronRight, Calendar, Heart, 
  ShieldCheck, CreditCard, Clock,
  ArrowRight, Play, Compass, Award,
  Trophy, TrendingUp, CheckCircle2, MessageSquare
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { vehicles } = useSelector(state => state.fleet);
  const { bookings } = useSelector(state => state.booking);
  
  const [searchLocation, setSearchLocation] = React.useState('Beverly Hills Hub');
  const [pickupDate, setPickupDate] = React.useState('');
  const [returnDate, setReturnDate] = React.useState('');

  const recommendedCars = vehicles.slice(0, 3);
  const activeBooking = bookings.find(b => b.status === 'Confirmed' || b.status === 'Active');

  const handleSearch = () => {
    navigate('/cars');
  };

  return (
    <div className="space-y-12 pb-12">
      {/* 1. HERO BOOKING SEARCH */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[550px] rounded-[3rem] overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
      >
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] opacity-70"
          alt="Luxury Car"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E17]/60 via-transparent to-[#0A0E17]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E17]/90 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-20 space-y-10">
          <div className="space-y-6 max-w-3xl">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
               <div className="h-1 w-12 bg-primary rounded-full shadow-glow-primary"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">AERO-DRIVE PREMIER ACCESS</span>
            </motion.div>
            <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] italic">
               THE ART OF <br />
               <span className="text-primary not-italic">VELOCITY.</span>
            </h1>
            <p className="text-gray-400 text-lg font-medium max-w-lg leading-relaxed">
               Bespoke automotive experiences curated for the world's most discerning drivers.
            </p>
          </div>

          {/* Booking Search Box */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-panel !p-2 rounded-[2rem] border-white/10 flex flex-col lg:flex-row items-center gap-2 max-w-5xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 w-full">
              <div className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors rounded-2xl cursor-pointer group">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                   <MapPin size={20} />
                </div>
                <div className="flex-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Pickup Location</p>
                   <select 
                     value={searchLocation}
                     onChange={(e) => setSearchLocation(e.target.value)}
                     className="bg-transparent text-sm font-bold text-white focus:outline-none w-full cursor-pointer appearance-none"
                   >
                      <option className="bg-[#0A0E17]">Beverly Hills Hub</option>
                      <option className="bg-[#0A0E17]">Downtown Executive</option>
                      <option className="bg-[#0A0E17]">North Port Sky Station</option>
                   </select>
                </div>
              </div>
              <div className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors border-y md:border-y-0 md:border-x border-white/5 rounded-2xl cursor-pointer">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                   <Calendar size={20} />
                </div>
                <div className="flex-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Pickup Date</p>
                   <input 
                     type="date" 
                     value={pickupDate}
                     onChange={(e) => setPickupDate(e.target.value)}
                     className="bg-transparent text-sm font-bold text-white focus:outline-none w-full cursor-pointer [color-scheme:dark]"
                   />
                </div>
              </div>
              <div className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors rounded-2xl cursor-pointer">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                   <Clock size={20} />
                </div>
                <div className="flex-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Return Date</p>
                   <input 
                     type="date" 
                     value={returnDate}
                     onChange={(e) => setReturnDate(e.target.value)}
                     className="bg-transparent text-sm font-bold text-white focus:outline-none w-full cursor-pointer [color-scheme:dark]"
                   />
                </div>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full lg:w-auto px-10 py-5 bg-primary text-[#0A0E17] font-black uppercase tracking-[0.2em] rounded-2xl shadow-glow-primary hover:scale-105 transition-all text-xs italic flex items-center justify-center gap-3"
            >
               Search Vehicles <ArrowRight size={18} strokeWidth={3} />
            </button>
          </motion.div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2">
        {/* Left Column: Widgets & History */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* 2. ACTIVE RESERVATION WIDGET */}
          {activeBooking ? (
            <div className="glass-panel p-8 relative overflow-hidden border-primary/20 bg-primary/5 group cursor-pointer">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10 group-hover:bg-primary/20 transition-colors"></div>
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg text-primary animate-pulse">
                    <Compass size={20} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Active Reservation</h3>
                </div>
                <span className="text-[10px] font-black px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full uppercase tracking-widest shadow-glow-primary">
                  {activeBooking.status}
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-64 h-40 rounded-3xl overflow-hidden border border-white/10 shadow-glow-primary">
                  <img src={activeBooking.image} className="w-full h-full object-cover" alt="Active Vehicle" />
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <h4 className="text-3xl font-black text-white tracking-tighter uppercase italic">{activeBooking.vehicleName}</h4>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mt-1">Registry ID: {activeBooking.id}</p>
                  </div>
                  
                  {/* 7. UPCOMING PICKUP TIMELINE */}
                  <div className="flex items-center gap-8 py-4 border-t border-white/5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Scheduled Pickup</span>
                      <span className="text-xs font-black text-white">{activeBooking.startDate}</span>
                    </div>
                    <div className="h-8 w-px bg-white/10"></div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Hub Location</span>
                      <span className="text-xs font-black text-white">{activeBooking.pickupLocation}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-primary text-[#0A0E17] font-black uppercase tracking-widest rounded-xl text-[10px] italic shadow-glow-primary hover:scale-105 transition-all">
                      Access Telemetry
                    </button>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-xl text-[10px] italic hover:bg-white/10 transition-all">
                      Modify Itinerary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 text-center border-dashed border-white/10 group hover:border-primary/30 transition-all cursor-pointer">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calendar size={32} className="text-gray-600 group-hover:text-primary" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic">No Active Missions</h3>
              <p className="text-gray-500 font-bold text-sm mt-2 uppercase tracking-widest">The road is waiting. Start your next journey.</p>
            </div>
          )}

          {/* 3. RECOMMENDED CARS */}
          <section className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Curated <span className="text-primary">Selection</span></h2>
                <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Recommended for your driving profile</p>
              </div>
              <button className="text-primary font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors flex items-center gap-2 group">
                 Explore All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedCars.map((car) => (
                <motion.div 
                  key={car.id}
                  whileHover={{ y: -10 }}
                  className="glass-panel !p-0 border-white/5 overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-48">
                    <img src={car.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={car.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161B26] via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <button className="p-2.5 rounded-xl bg-[#0A0E17]/60 backdrop-blur-md text-white hover:text-danger transition-colors">
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-black text-white tracking-tight">{car.name}</h4>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{car.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-white tracking-tighter">${car.price}</p>
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">/ day</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4. RECENTLY VIEWED CARS */}
          <section className="space-y-6">
             <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.4em] px-2">Recently Inspected</h3>
             <div className="flex gap-4 overflow-x-auto pb-4 px-2 custom-scrollbar">
                {vehicles.slice(3, 7).map((car) => (
                  <div key={car.id} className="min-w-[200px] glass-panel !p-3 border-white/5 flex items-center gap-4 group cursor-pointer hover:border-primary/20 transition-all">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <img src={car.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" alt={car.name} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-tight truncate w-24">{car.name}</p>
                      <p className="text-[10px] font-bold text-primary mt-1">${car.price}</p>
                    </div>
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Right Column: Loyalty & Progress */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* 5. LOYALTY BENEFITS */}
          <div className="glass-panel p-8 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
             <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/20 rounded-2xl text-primary shadow-glow-primary">
                  <Award size={24} />
                </div>
                <div>
                   <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Platinum Tier</h3>
                   <p className="text-[10px] font-black text-primary/70 uppercase tracking-widest">Elite Member Since 2024</p>
                </div>
             </div>

             <div className="space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <span>Tier Progress</span>
                      <span className="text-primary">850 / 1000 PTS</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        className="h-full bg-primary shadow-glow-primary"
                      ></motion.div>
                   </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                   {[
                     { icon: Trophy, label: 'Priority Delivery', desc: 'Cars delivered to your door' },
                     { icon: TrendingUp, label: 'Free Upgrades', desc: 'On all executive class bookings' },
                     { icon: Zap, label: 'Zero Deposit', desc: 'No holding fee for platinum' }
                   ].map((benefit, i) => (
                     <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-primary/10 transition-colors flex items-start gap-4 group">
                        <benefit.icon size={18} className="text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                           <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{benefit.label}</p>
                           <p className="text-[9px] text-gray-500 font-medium">{benefit.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* 6. BOOKING PROGRESS WIDGET */}
          {activeBooking && (
            <div className="glass-panel p-8 border-white/5">
               <h3 className="text-lg font-black text-white uppercase italic tracking-tight mb-8">Trip Progression</h3>
               <div className="relative space-y-10">
                  {/* Vertical Line */}
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/5"></div>
                  
                  {[
                    { label: 'Booking Confirmed', status: 'completed', icon: CheckCircle2 },
                    { label: 'Security Clearance', status: 'completed', icon: ShieldCheck },
                    { label: 'Unit Prepared', status: 'current', icon: Zap },
                    { label: 'Ready for Pickup', status: 'upcoming', icon: MapPin },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-6 relative">
                       <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]
                          ${step.status === 'completed' ? 'bg-accent text-[#0A0E17]' : 
                            step.status === 'current' ? 'bg-primary text-[#0A0E17] animate-pulse shadow-glow-primary' : 
                            'bg-[#0A0E17] border border-white/10 text-gray-600'}`}>
                          <step.icon size={12} strokeWidth={3} />
                       </div>
                       <div>
                          <p className={`text-[10px] font-black uppercase tracking-widest
                             ${step.status === 'upcoming' ? 'text-gray-600' : 'text-white'}`}>
                             {step.label}
                          </p>
                          {step.status === 'current' && (
                            <p className="text-[8px] text-primary font-black uppercase tracking-tighter mt-1 animate-pulse">In Progress</p>
                          )}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* Support Quick Access */}
          <div className="glass-panel p-8 border-white/5 bg-[#0A0E17] group cursor-pointer hover:border-primary/30 transition-all">
             <div className="flex justify-between items-center">
                <div>
                   <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1">24/7 Concierge</h3>
                   <p className="text-[10px] text-gray-500 font-bold">Priority support for Elite members</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary group-hover:text-[#0A0E17] transition-all">
                   <MessageSquare size={18} />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
