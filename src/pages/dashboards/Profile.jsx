import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, 
  ShieldCheck, Star, Award, Zap,
  Upload, Edit3, Settings, LogOut,
  Camera, CheckCircle2, AlertCircle,
  FileText, CreditCard, Bell, DollarSign,
  TrendingUp, Clock, Target
} from 'lucide-react';

const Profile = () => {
  const { role } = useSelector(state => state.auth);
  const isDriver = role === 'DRIVER';

  return (
    <div className="space-y-10 pb-12">
      {/* Header / Cover */}
      <div className="relative">
        <div className="h-48 rounded-[3rem] bg-gradient-to-r from-primary/20 via-primary/5 to-transparent border border-white/5 overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>
        <div className="px-12 -mt-16 flex flex-col md:flex-row items-end gap-8 relative z-10">
           <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] bg-[#0A0E17] border-4 border-[#0A0E17] shadow-glow-primary overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Profile" />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-primary text-[#0A0E17] rounded-xl shadow-glow-primary hover:scale-110 transition-all">
                 <Camera size={16} />
              </button>
           </div>
           <div className="flex-1 pb-4">
              <div className="flex items-center gap-4 mb-2">
                 <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Alex Rivera</h2>
                 <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-lg shadow-glow-primary">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                       <Award size={12} /> {isDriver ? 'Elite Operator' : 'Platinum Tier'}
                    </span>
                 </div>
              </div>
              <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                 {isDriver ? 'Active Fleet Commander' : 'Member'} since Jan 2024 • Verified Identity
              </p>
           </div>
           <div className="flex gap-3 pb-4">
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-colors flex items-center gap-2">
                 <Edit3 size={16} /> Edit Profile
              </button>
              <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-white transition-all">
                 <Settings size={20} />
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-4">
        {/* Main Details */}
        <div className="lg:col-span-8 space-y-10">
           
           {/* Account Overview */}
           <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-8 border-white/5 space-y-6">
                 <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Personal Matrix</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                       <Mail size={18} className="text-gray-600" />
                       <div>
                          <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Email Address</p>
                          <p className="text-xs font-bold text-white">alex.rivera@premium.com</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                       <Phone size={18} className="text-gray-600" />
                       <div>
                          <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Contact Signal</p>
                          <p className="text-xs font-bold text-white">+1 (555) 042-8812</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                       <MapPin size={18} className="text-gray-600" />
                       <div>
                          <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Base Operations</p>
                          <p className="text-xs font-bold text-white">Beverly Hills, CA 90210</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="glass-panel p-8 border-white/5 space-y-6">
                 <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Verification Hub</h3>
                 <div className="space-y-4">
                    <div className="p-4 bg-accent/5 rounded-2xl border border-accent/20 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <ShieldCheck size={20} className="text-accent" />
                          <div>
                             <p className="text-xs font-black text-white uppercase tracking-tight">Identity KYC</p>
                             <p className="text-[9px] text-accent/70 font-bold uppercase tracking-widest">Verified 04/24</p>
                          </div>
                       </div>
                       <CheckCircle2 size={18} className="text-accent" />
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                       <div className="flex items-center gap-4">
                          <FileText size={20} className="text-gray-600 group-hover:text-primary transition-colors" />
                          <div>
                             <p className="text-xs font-black text-white uppercase tracking-tight">Driver's License</p>
                             <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Expires 08/2028</p>
                          </div>
                       </div>
                       <Edit3 size={16} className="text-gray-600 group-hover:text-white" />
                    </div>

                    <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:border-primary/30 hover:text-white transition-all flex items-center justify-center gap-2">
                       <Upload size={16} /> Update Documents
                    </button>
                 </div>
              </div>
           </section>

           {/* Performance / Benefits */}
           <section className="glass-panel p-8 border-white/5 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-8">
                 {isDriver ? 'Mission Efficiency' : 'Platinum Privileges'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {isDriver ? (
                    [
                       { icon: Target, label: 'Completion Rate', desc: '98.4% On-time delivery' },
                       { icon: Star, label: 'Driver Rating', desc: '4.95 / 5.0 (Global Rank #12)' },
                       { icon: TrendingUp, label: 'Safety Index', desc: '99% Collision-free score' },
                    ].map((stat, i) => (
                       <div key={i} className="space-y-3 group">
                          <div className="p-3 bg-white/5 rounded-xl text-primary w-fit group-hover:shadow-glow-primary transition-all">
                             <stat.icon size={20} />
                          </div>
                          <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{stat.label}</h4>
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">{stat.desc}</p>
                       </div>
                    ))
                 ) : (
                    [
                      { icon: Zap, label: 'Zero Deposit', desc: 'No holding fees on all units' },
                      { icon: CreditCard, label: 'Post-Paid', desc: 'Settle invoices after rental' },
                      { icon: Bell, label: 'Priority Access', desc: '24h early fleet booking' },
                    ].map((benefit, i) => (
                      <div key={i} className="space-y-3 group">
                         <div className="p-3 bg-white/5 rounded-xl text-primary w-fit group-hover:shadow-glow-primary transition-all">
                            <benefit.icon size={20} />
                         </div>
                         <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{benefit.label}</h4>
                         <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">{benefit.desc}</p>
                      </div>
                    ))
                 )}
              </div>
           </section>
        </div>

        {/* Sidebar: Loyalty & Stats */}
        <div className="lg:col-span-4 space-y-8">
           <div className={`glass-panel p-8 border-primary/20 ${isDriver ? 'bg-gradient-to-b from-highlight/5 to-transparent' : 'bg-gradient-to-b from-primary/5 to-transparent'}`}>
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                    {isDriver ? 'Wallet Telemetry' : 'Loyalty Core'}
                 </h3>
                 <DollarSign size={16} className="text-highlight shadow-glow-highlight" />
              </div>
              
              <div className="space-y-8">
                 <div>
                    <div className="flex justify-between items-end mb-3">
                       <p className="text-5xl font-black text-white tracking-tighter italic">
                          {isDriver ? '4,280' : '12,450'}
                       </p>
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                          {isDriver ? 'Monthly Earnings' : 'Total XP Points'}
                       </p>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '75%' }}
                         className={`h-full rounded-full ${isDriver ? 'bg-highlight shadow-glow-accent' : 'bg-primary shadow-glow-primary'}`}
                       ></motion.div>
                    </div>
                    <div className="flex justify-between mt-3">
                       <span className="text-[8px] font-black text-primary uppercase tracking-widest">
                          {isDriver ? 'Quota: 92%' : 'Platinum Status'}
                       </span>
                       <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">
                          {isDriver ? '$720 to next tier bonus' : '2,550 to Diamond'}
                       </span>
                    </div>
                 </div>

                 <div className="p-6 bg-[#0A0E17] border border-white/10 rounded-2xl">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-4">Tactical Summary</p>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                             {isDriver ? 'Missions Completed' : 'Total Trips'}
                          </span>
                          <span className="text-sm font-black text-white">{isDriver ? '142' : '42'}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                             {isDriver ? 'Active Duty' : 'Fleet Hours'}
                          </span>
                          <span className="text-sm font-black text-white">{isDriver ? '14d 6h' : '1,280h'}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                             {isDriver ? 'Asset Health Avg' : 'Active Units'}
                          </span>
                          <span className="text-sm font-black text-accent">{isDriver ? '98%' : '1'}</span>
                       </div>
                    </div>
                 </div>

                 <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    {isDriver ? 'Download Earnings Report' : 'Redeem Experience Points'}
                 </button>
              </div>
           </div>

           <button className="w-full p-6 bg-danger/5 border border-danger/20 rounded-[2rem] flex items-center justify-center gap-3 group hover:bg-danger/10 transition-all">
              <LogOut size={20} className="text-danger group-hover:translate-x-1 transition-transform" />
              <span className="text-xs font-black text-danger uppercase tracking-widest">Terminate Session</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
