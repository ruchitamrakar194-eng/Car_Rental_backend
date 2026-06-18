import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Clock, MapPin, CheckCircle2, AlertCircle, 
  ArrowRight, Filter, ChevronRight, Activity,
  Calendar, Wrench, ShieldAlert, Zap, Car, Plus
} from 'lucide-react';

const tasks = [
  { id: 1, type: 'Pickup', vehicle: 'Model S Plaid', time: '14:30', customer: 'James T.', status: 'Pending', color: 'text-primary' },
  { id: 2, type: 'Return', vehicle: 'Rivian R1T', time: '15:45', customer: 'Sarah M.', status: 'En-route', color: 'text-accent' },
  { id: 3, type: 'Inspection', vehicle: 'Lucid Air', time: '16:00', customer: 'Elena R.', status: 'Waiting', color: 'text-highlight' },
  { id: 4, type: 'Maintenance', vehicle: 'Model 3', time: '17:15', customer: 'Internal', status: 'Scheduled', color: 'text-danger' },
];

const OperationsDashboard = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Ops Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-glow-accent"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Real-Time Operational Feed</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">Tactical <span className="text-accent">Control</span></h2>
        </div>
        <div className="flex gap-4">
           <div className="glass-panel !py-2 !px-4 border-white/10">
              <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Scheduled Today</p>
              <p className="text-lg font-black text-white">42 Jobs</p>
           </div>
           <div className="glass-panel !py-2 !px-4 border-white/10">
              <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Ops Efficiency</p>
              <p className="text-lg font-black text-accent">98%</p>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Priorities & Incidents */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Today Priorities */}
           <div className="glass-panel p-8 border-accent/10">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <Zap size={20} className="text-accent" /> Today Priorities
                 </h3>
                 <span className="text-[10px] font-black text-accent uppercase tracking-widest px-2 py-1 bg-accent/10 rounded-md">3 Urgent</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                    { id: 'JOB-901', type: 'Urgent Pickup', vehicle: 'Lucid Air GT', time: '14:30', loc: 'Downtown Hub', priority: 'High' },
                    { id: 'JOB-905', type: 'Pending Inspection', vehicle: 'Tesla Model S', time: '15:15', loc: 'Airport Hub', priority: 'Medium' },
                    { id: 'JOB-908', type: 'Maintenance Alert', vehicle: 'Rivian R1S', time: 'ASAP', loc: 'Service Center', priority: 'High' },
                 ].map((job, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-accent/30 transition-all cursor-pointer group">
                       <div className="flex justify-between items-start mb-3">
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${job.priority === 'High' ? 'bg-danger/20 text-danger' : 'bg-highlight/20 text-highlight'}`}>
                             {job.priority} Priority
                          </span>
                          <span className="text-[9px] font-bold text-gray-500">{job.id}</span>
                       </div>
                       <h4 className="text-sm font-black text-white uppercase">{job.type}</h4>
                       <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase italic">{job.vehicle}</p>
                       <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                             <Clock size={12} className="text-accent" />
                             <span className="text-[10px] font-black text-white italic">{job.time}</span>
                          </div>
                          <ChevronRight size={14} className="text-gray-600 group-hover:translate-x-1 transition-all" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Active Incidents Panel */}
           <div className="glass-panel p-8 border-danger/10 bg-danger/[0.02]">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <ShieldAlert size={20} className="text-danger" /> Active Incidents
                 </h3>
                 <button className="text-[9px] font-black text-danger uppercase tracking-widest hover:underline">View All Critical</button>
              </div>
              <div className="space-y-3">
                 {[
                    { id: 'INC-102', msg: 'Late Return: UNIT-9021 (Rolls-Royce) - 45 mins overdue', status: 'Inquiry Sent', type: 'Late' },
                    { id: 'INC-105', msg: 'Vehicle Damage Reported: UNIT-8831 (Tesla) - Front bumper scuff', status: 'Awaiting Photos', type: 'Damage' },
                    { id: 'INC-108', msg: 'Driver Unavailable: Marcus J. (Scheduled 15:00 Pickup)', status: 'Urgent Reassign', type: 'Dispatch' },
                 ].map((inc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-danger/30 transition-all cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className="p-2 bg-danger/10 text-danger rounded-lg">
                             <AlertCircle size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-white uppercase tracking-wide">{inc.msg}</p>
                             <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">{inc.id} • {inc.type}</p>
                          </div>
                       </div>
                       <span className="text-[8px] font-black text-danger uppercase tracking-widest px-2 py-1 border border-danger/20 rounded-md">
                          {inc.status}
                       </span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column: Actions & Pulse */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Quick Actions */}
           <div className="glass-panel p-8 border-primary/10">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Operational Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                 {[
                    { label: 'Create Task', icon: Plus, color: 'bg-primary/10 text-primary' },
                    { label: 'Assign Driver', icon: Activity, color: 'bg-accent/10 text-accent' },
                    { label: 'Start Inspection', icon: CheckCircle2, color: 'bg-highlight/10 text-highlight' },
                    { label: 'Mark Ready', icon: Zap, color: 'bg-accent/10 text-accent' },
                 ].map((action, i) => (
                    <button key={i} className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-primary/40 transition-all group gap-2">
                       <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform`}>
                          <action.icon size={20} />
                       </div>
                       <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{action.label}</span>
                    </button>
                 ))}
                 <button className="col-span-2 py-4 bg-danger text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all italic">
                    Emergency Dispatch
                 </button>
              </div>
           </div>

           {/* Live Vehicle Status */}
           <div className="glass-panel p-8">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Asset Readiness</h3>
              <div className="space-y-5">
                 {[
                    { label: 'Available Inventory', val: '18', color: 'bg-accent' },
                    { label: 'In-Cleaning / Prep', val: '05', color: 'bg-primary' },
                    { label: 'Under Inspection', val: '03', color: 'bg-highlight' },
                    { label: 'Deployment Ready', val: '12', color: 'bg-accent shadow-glow-accent' },
                    { label: 'Active Rentals', val: '24', color: 'bg-white/20' },
                    { label: 'In-Maintenance', val: '02', color: 'bg-danger' },
                 ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</span>
                       </div>
                       <span className="text-xs font-black text-white italic">{stat.val} Units</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Location Snapshot */}
           <div className="glass-panel p-8 border-white/5">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Hub Telemetry</h3>
              <div className="space-y-4">
                 {[
                    { hub: 'Downtown Hub', active: 12, capacity: 20 },
                    { hub: 'Airport Hub', active: 25, capacity: 30 },
                 ].map((hub, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                       <div className="flex items-center gap-3">
                          <MapPin size={16} className="text-primary" />
                          <span className="text-xs font-bold text-white tracking-wide">{hub.hub}</span>
                       </div>
                       <span className="text-xs font-black text-gray-500">{hub.active}/{hub.capacity}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsDashboard;
