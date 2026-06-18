import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Github, Chrome, ChevronRight, Fingerprint } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/auth/AuthLayout';
import DemoUserCard from '../../components/auth/DemoUserCard';
import { loginStart, loginSuccess } from '../../store/authSlice';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const demoUsers = [
    { name: 'Marcus Chen', role: 'Admin', desc: 'System core & telemetry', color: 'from-primary to-blue-600', roleId: 'ADMIN', glow: 'shadow-glow-primary' },
    { name: 'Sarah Miller', role: 'Operations', desc: 'Fleet deployment sync', color: 'from-accent to-emerald-600', roleId: 'OPERATIONS', glow: 'shadow-glow-accent' },
    { name: 'David Wilson', role: 'Driver', desc: 'Grid analysis & logs', color: 'from-highlight to-orange-600', roleId: 'DRIVER', glow: 'shadow-[0_0_15px_rgba(253,186,116,0.3)]' },
    { name: 'Elena Rodriguez', role: 'Customer', desc: 'Asset access portal', color: 'from-white/20 to-white/5', roleId: 'CUSTOMER', glow: 'shadow-glass' },
  ];

  const handleDemoLogin = (user) => {
    dispatch(loginStart());
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Syncing with ${user.role} interface...`,
        success: `Welcome back, Commander ${user.name.split(' ')[0]}.`,
        error: 'Authorization failed',
      },
      {
        style: { background: '#111827', color: '#00D1FF', border: '1px solid rgba(0,209,255,0.2)' }
      }
    ).then(() => {
      dispatch(loginSuccess({ user: user.name, role: user.roleId }));
      navigate('/');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Encryption key required');
    handleDemoLogin({ name: email.split('@')[0], role: 'System Admin', roleId: 'ADMIN', glow: 'shadow-glow-primary' });
  };

  return (
    <AuthLayout 
      title="Identity Check" 
      subtitle="Interface with the global mobility grid via secure telemetry."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors w-5 h-5" />
            <input 
              type="email" 
              placeholder="System Identifier (Email)" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111827]/50 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white font-bold text-sm focus:outline-none focus:border-primary/50 focus:bg-[#111827]/80 transition-all placeholder:text-gray-700"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors w-5 h-5" />
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Encryption Key" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111827]/50 border border-white/5 rounded-2xl py-5 pl-14 pr-14 text-white font-bold text-sm focus:outline-none focus:border-primary/50 focus:bg-[#111827]/80 transition-all placeholder:text-gray-700"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
               <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-lg border border-white/10 bg-white/5 checked:bg-primary/20 checked:border-primary/50 transition-all" />
               <ChevronRight className="absolute w-3 h-3 text-primary opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={4} />
            </div>
            <span className="text-gray-500 font-black uppercase tracking-widest text-[10px] group-hover:text-white transition-colors">Persistent Link</span>
          </label>
          <Link to="/forgot-password" core="true" className="text-primary hover:text-white font-black uppercase tracking-widest text-[10px] transition-colors">
            Reset Protocol
          </Link>
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-primary text-[#0A0E17] font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:shadow-[0_0_35px_rgba(0,209,255,0.5)] hover:scale-[1.01] transition-all flex items-center justify-center gap-3 group text-xs italic"
        >
          <Fingerprint size={20} className="text-[#0A0E17]" />
          Authorize Session <ChevronRight className="group-hover:translate-x-1 transition-transform" strokeWidth={3} size={18} />
        </button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#0A0E17] px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">Multi-Channel Link</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all font-black uppercase tracking-widest text-[10px]">
            <Chrome size={18} className="text-primary" /> Google
          </button>
          <button type="button" className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all font-black uppercase tracking-widest text-[10px]">
            <Github size={18} /> GitHub
          </button>
        </div>
      </form>

      <div className="mt-16 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Simulate Operational Roles</h3>
          <div className="h-[1px] flex-1 bg-white/5 ml-6 opacity-30"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demoUsers.map((user, i) => (
            <DemoUserCard 
              key={i} 
              user={user} 
              onClick={handleDemoLogin} 
            />
          ))}
        </div>
      </div>

      <p className="text-center text-gray-600 text-xs font-bold uppercase tracking-widest mt-12">
        Grid access pending? <Link to="/register" title="Create Identity" className="text-primary hover:text-white transition-colors border-b-2 border-primary/20 pb-0.5">Initialize Profile</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
