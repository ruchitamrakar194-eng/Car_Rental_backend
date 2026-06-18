import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Car, Calendar, BarChart3, Settings, LogOut, Zap, 
  Users, DollarSign, FileText, PieChart, ShieldCheck, UserCheck, 
  Wrench, Fuel, AlertTriangle, Briefcase, ShoppingBag, TrendingUp, 
  ChevronDown, ChevronRight, Bell, Tag, MessageSquare, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toast } from 'react-hot-toast';

const AdminSidebar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    toast.success('System connection terminated');
  };

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 h-screen bg-[#111827] lg:bg-[#111827]/95 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)] overflow-y-auto custom-scrollbar"
    >
      <div className="flex items-center justify-between mb-10 mt-2 px-2 shrink-0">
        <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-[#161B26] to-[#0A0E17] border border-primary/30 rounded-xl flex items-center justify-center shadow-glow-primary">
            <Zap className="text-primary w-6 h-6 drop-shadow-[0_0_8px_rgba(0,209,255,0.8)]" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-gradient uppercase italic">
            ADMIN<span className="text-white font-light not-italic">OS</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[0.3em] text-primary/70 font-black mt-0.5">Control Grid</p>
        </div>
        </div>
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink to="/" onClick={onMenuClick} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary shadow-glow-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <LayoutDashboard size={18} />
          <span className="font-medium text-sm tracking-wide">Dashboard</span>
        </NavLink>

        <NavLink to="/bookings" onClick={onMenuClick} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary shadow-glow-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <Calendar size={18} />
          <span className="font-medium text-sm tracking-wide">Bookings</span>
        </NavLink>

        <NavLink to="/fleet" onClick={onMenuClick} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary shadow-glow-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <Car size={18} />
          <span className="font-medium text-sm tracking-wide">Fleet</span>
        </NavLink>

        <NavLink to="/customers" onClick={onMenuClick} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary shadow-glow-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <Users size={18} />
          <span className="font-medium text-sm tracking-wide">Customers</span>
        </NavLink>

        <NavLink to="/finance" onClick={onMenuClick} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary shadow-glow-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <DollarSign size={18} />
          <span className="font-medium text-sm tracking-wide">Finance</span>
        </NavLink>

        <NavLink to="/settings" onClick={onMenuClick} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary shadow-glow-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
          <Settings size={18} />
          <span className="font-medium text-sm tracking-wide">Settings</span>
        </NavLink>
      </nav>

      <div className="mt-8 pt-6 border-t border-white/5 shrink-0">
        <button 
          onClick={handleLogout}
          className="group flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-danger transition-all duration-300 w-full rounded-xl hover:bg-danger/10 border border-transparent hover:border-danger/20"
        >
          <LogOut size={18} className="group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="font-bold text-xs uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
