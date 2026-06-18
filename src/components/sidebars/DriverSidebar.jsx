import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, MapPin, Navigation, 
  CheckSquare, ShieldCheck, DollarSign, 
  User, LogOut, Zap, Smartphone, X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toast } from 'react-hot-toast';

const DriverSidebar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Driver session terminated');
  };

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 h-screen bg-[#111827] lg:bg-[#111827]/95 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center justify-between mb-10 mt-2 px-2 shrink-0">
        <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-highlight/20 rounded-xl blur-md"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-[#161B26] to-[#0A0E17] border border-highlight/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(253,186,116,0.3)]">
            <Smartphone className="text-highlight w-6 h-6 drop-shadow-[0_0_8px_rgba(253,186,116,0.8)]" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
            DRIVE<span className="text-highlight font-light not-italic">HUB</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[0.3em] text-highlight/70 font-black mt-0.5">Mobile Node</p>
        </div>
        </div>
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-3">
        <NavLink to="/" onClick={onMenuClick} className={({ isActive }) => `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-highlight/10 text-highlight border border-highlight/20 shadow-[0_0_15px_rgba(253,186,116,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <LayoutDashboard size={22} />
          <span className="font-bold text-sm uppercase tracking-widest">Dashboard</span>
        </NavLink>

        <NavLink to="/trips" onClick={onMenuClick} className={({ isActive }) => `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-highlight/10 text-highlight border border-highlight/20 shadow-[0_0_15px_rgba(253,186,116,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <MapPin size={22} />
          <span className="font-bold text-sm uppercase tracking-widest">My Trips</span>
        </NavLink>

        <NavLink to="/inspection" onClick={onMenuClick} className={({ isActive }) => `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-highlight/10 text-highlight border border-highlight/20 shadow-[0_0_15px_rgba(253,186,116,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <ShieldCheck size={22} />
          <span className="font-bold text-sm uppercase tracking-widest">Inspection</span>
        </NavLink>

        <NavLink to="/profile" onClick={onMenuClick} className={({ isActive }) => `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-highlight/10 text-highlight border border-highlight/20 shadow-[0_0_15px_rgba(253,186,116,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <User size={22} />
          <span className="font-bold text-sm uppercase tracking-widest">Profile</span>
        </NavLink>
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 shrink-0">
        <button 
          onClick={handleLogout}
          className="group flex items-center gap-4 px-5 py-4 text-gray-500 hover:text-danger transition-all duration-300 w-full rounded-2xl hover:bg-danger/10 border border-transparent hover:border-danger/20"
        >
          <LogOut size={22} className="group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="font-bold text-sm uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default DriverSidebar;
