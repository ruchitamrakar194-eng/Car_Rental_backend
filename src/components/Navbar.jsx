import { Search, Bell, Command, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const Navbar = ({ toggleMobileMenu }) => {
  const { user, role } = useSelector(state => state.auth);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-20 md:h-24 bg-transparent border-b border-white/5 flex items-center justify-between px-4 md:px-8 z-10 shrink-0"
    >
      <div className="flex items-center gap-4 flex-1 lg:flex-none">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="relative w-full md:w-[400px] group hidden sm:block">
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg transition-opacity opacity-0 group-focus-within:opacity-100"></div>
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-primary/70 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search fleet telemetry..." 
              className="w-full bg-[#111827]/80 backdrop-blur-md border border-white/10 rounded-2xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(0,209,255,0.2)] transition-all text-white placeholder-gray-500"
            />
            <div className="absolute right-4 hidden md:flex items-center gap-1 text-gray-500 text-xs font-semibold px-2 py-1 bg-white/5 rounded-md border border-white/10">
              <Command size={12} /> K
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-4">
        <button className="relative p-2 md:p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <Bell size={20} className="drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
          <span className="absolute top-1.5 md:top-2 right-1.5 md:right-2 w-2 h-2 md:w-2.5 md:h-2.5 bg-primary rounded-full border-2 border-[#0A0E17] shadow-[0_0_8px_rgba(0,209,255,0.8)] animate-pulse-slow"></span>
        </button>
        
        <div className="flex items-center gap-3 md:gap-4 pl-4 md:pl-6 border-l border-white/10 cursor-pointer group">
          <div className="text-right hidden xs:block">
            <p className="text-xs md:text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{user || 'Guest'}</p>
            <p className="text-[10px] text-primary/70 font-semibold tracking-wide uppercase">{role || 'Visitor'}</p>
          </div>
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <div className="absolute inset-0 bg-primary/30 rounded-xl blur-md group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-[#161B26] to-[#0A0E17] border border-primary/40 rounded-xl flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-glow-primary uppercase">
              {getInitials(user)}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
