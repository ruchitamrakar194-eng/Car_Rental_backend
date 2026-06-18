import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Clock, AlertTriangle, Plus, Search, CheckCircle2, User, Car, MapPin, X, Send } from 'lucide-react';

import toast from 'react-hot-toast';

const OperationsTasks = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 'TSK-101', 
      title: 'Sanitize Cabin & Restock', 
      type: 'Cleaning', 
      vehicle: 'Lucid Air GT (UNIT-405)', 
      assignee: 'Alex R.', 
      status: 'In Progress', 
      priority: 'High',
      due: '14:30',
      location: 'Cleaning Bay 1',
      description: 'Full interior sanitation required. Restock water bottles and mints.',
      proofRequired: true
    },
    { 
      id: 'TSK-102', 
      title: 'Tire Pressure & Alignment', 
      type: 'Maintenance', 
      vehicle: 'Model S Plaid (UNIT-102)', 
      assignee: 'Unassigned', 
      status: 'Pending', 
      priority: 'Medium',
      due: '16:00',
      location: 'Service Hub Alpha',
      description: 'Check PSI on all tires. Perform alignment check if needed.',
      proofRequired: false
    },
    { 
      id: 'TSK-103', 
      title: 'Fleet Relocation', 
      type: 'Logistics', 
      vehicle: 'Rivian R1T (UNIT-901)', 
      assignee: 'Sarah M.', 
      status: 'Waiting Approval', 
      priority: 'High',
      due: '12:00',
      location: 'Downtown Hub',
      description: 'Relocate unit from Downtown to Airport Hub for upcoming rental.',
      proofRequired: true
    },
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [isDirectiveModalOpen, setIsDirectiveModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const tabs = ['All', 'Pending', 'In Progress', 'Waiting Approval', 'Completed'];

  const handleTaskAction = (taskId, action) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        let update = {};
        if (action === 'Assign') {
           update = { status: 'In Progress', assignee: 'Alex R.' };
        } else if (action === 'Complete') {
           update = { status: task.proofRequired ? 'Waiting Approval' : 'Completed' };
        } else if (action === 'Approve') {
           update = { status: 'Completed' };
        }

        toast.success(`Directive ${taskId}: ${action} successful`, {
           icon: '🎯',
           style: { background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
        });

        return { ...task, ...update };
      }
      return task;
    }));
  };

  const filteredTasks = tasks.filter(t => {
    if (activeTab !== 'All' && t.status !== activeTab) return false;
    return t.title.toLowerCase().includes(search.toLowerCase()) || t.vehicle.toLowerCase().includes(search.toLowerCase());
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-danger bg-danger/10 border-danger/20';
      case 'Medium': return 'text-highlight bg-highlight/10 border-highlight/20';
      case 'Low': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-white bg-white/5 border-white/10';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Mission <span className="text-accent">Directives</span>
          </h2>
          <p className="text-gray-500 font-bold tracking-[0.2em] uppercase text-[10px] mt-2">Operational Task Management</p>
        </div>
        <button 
          onClick={() => setIsDirectiveModalOpen(true)}
          className="px-6 py-3 bg-accent/10 text-accent border border-accent/20 rounded-xl flex items-center gap-2 font-black uppercase tracking-widest text-[10px] shadow-glow-accent hover:scale-105 transition-all"
        >
          <Plus size={16} /> New Directive
        </button>
      </div>

      {/* TOP TABS NAVIGATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-4">
        <div className="flex gap-2 overflow-x-auto custom-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap
                ${activeTab === tab 
                  ? 'bg-accent text-[#0A0E17] shadow-glow-accent' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search directives..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111827] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-white focus:border-accent/50 focus:outline-none transition-all placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedTask(task)}
              className="glass-panel p-6 border-white/5 hover:border-accent/30 transition-colors group cursor-pointer relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${getPriorityColor(task.priority)}`}>
                  {task.priority} Priority
                </span>
                <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">{task.id}</span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent transition-colors">{task.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">{task.type} • Due {task.due}</p>
              
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-sm font-bold text-white">
                  <Car size={16} className="text-primary" /> {task.vehicle}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                    <User size={16} className="text-gray-500" /> {task.assignee}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
                    task.status === 'In Progress' ? 'text-highlight border-highlight/20 bg-highlight/5 animate-pulse' :
                    task.status === 'Waiting Approval' ? 'text-accent border-accent/20 bg-accent/5' :
                    'text-gray-500 border-white/10'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>

              {/* Quick Actions at bottom of card */}
              <div className="mt-6 flex gap-2" onClick={e => e.stopPropagation()}>
                 {task.status === 'Pending' && (
                    <button 
                      onClick={() => handleTaskAction(task.id, 'Assign')}
                      className="flex-1 py-2 bg-accent/10 border border-accent/20 rounded-lg text-[8px] font-black uppercase tracking-widest text-accent hover:bg-accent hover:text-black transition-all">Assign</button>
                 )}
                 {task.status === 'In Progress' && (
                    <button 
                      onClick={() => handleTaskAction(task.id, 'Complete')}
                      className="flex-1 py-2 bg-primary/10 border border-primary/20 rounded-lg text-[8px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all">Complete</button>
                 )}
                 {task.status === 'Waiting Approval' && (
                    <button 
                      onClick={() => handleTaskAction(task.id, 'Approve')}
                      className="flex-1 py-2 bg-highlight/10 border border-highlight/20 rounded-lg text-[8px] font-black uppercase tracking-widest text-highlight hover:bg-highlight hover:text-black transition-all">Approve</button>
                 )}
                 <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
                    <Send size={14} />
                 </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* TASK DETAIL DRAWER */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-sm"
              onClick={() => setSelectedTask(null)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full sm:w-[500px] bg-[#111827] border-l border-white/10 h-full p-8 shadow-2xl flex flex-col"
            >
               <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                  <div>
                     <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Directive Intel</h3>
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selectedTask.id}</p>
                  </div>
                  <button onClick={() => setSelectedTask(null)} className="p-2 text-gray-500 hover:text-white transition-colors">
                     <X size={20} />
                  </button>
               </div>

               <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getPriorityColor(selectedTask.priority)}`}>
                           {selectedTask.priority} Priority
                        </span>
                        <span className="text-sm font-black text-white uppercase italic">{selectedTask.status}</span>
                     </div>
                     <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">{selectedTask.title}</h2>
                     <p className="text-sm text-gray-400 font-bold leading-relaxed">{selectedTask.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Target Asset</p>
                        <div className="flex items-center gap-3">
                           <Car size={16} className="text-primary" />
                           <span className="text-sm font-bold text-white uppercase">{selectedTask.vehicle.split('(')[0]}</span>
                        </div>
                     </div>
                     <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Operational Hub</p>
                        <div className="flex items-center gap-3">
                           <MapPin size={16} className="text-accent" />
                           <span className="text-sm font-bold text-white uppercase">{selectedTask.location}</span>
                        </div>
                     </div>
                  </div>

                  {/* Task Proof / Photos */}
                  {selectedTask.proofRequired && (
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Photographic Proof</h4>
                        <div className="grid grid-cols-2 gap-3">
                           {[1, 2].map(i => (
                              <div key={i} className="aspect-square bg-white/5 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-2 group hover:border-accent/40 transition-all cursor-pointer">
                                 <Plus size={20} className="text-gray-600 group-hover:text-accent" />
                                 <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest group-hover:text-white">Upload View {i}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] ml-2">Audit Logs</h4>
                     <div className="space-y-3">
                        {[
                           { action: 'Task Initialized', time: '10:00', user: 'System' },
                           { action: 'Assigned to Operator', time: '10:15', user: 'Admin' },
                           { action: 'Status Changed to In Progress', time: '10:45', user: selectedTask.assignee },
                        ].map((log, i) => (
                           <div key={i} className="flex justify-between items-center p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                              <div>
                                 <p className="text-[10px] font-bold text-white uppercase">{log.action}</p>
                                 <p className="text-[8px] font-black text-gray-600 uppercase mt-1">{log.user}</p>
                              </div>
                              <span className="text-[10px] font-black text-gray-500">{log.time}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="mt-8 pt-8 border-t border-white/10 flex gap-4 shrink-0">
                  <button onClick={() => setSelectedTask(null)} className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all italic">
                     Abort
                  </button>
                  <button 
                    onClick={() => {
                       handleTaskAction(selectedTask.id, 'Approve');
                       setSelectedTask(null);
                    }}
                    className="flex-[2] py-4 bg-accent text-[#0A0E17] rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-glow-accent hover:scale-105 transition-all italic"
                  >
                     Approve Directive
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NEW DIRECTIVE MODAL */}
      <AnimatePresence>
        {isDirectiveModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDirectiveModalOpen(false)}
              className="absolute inset-0 bg-[#0A0E17]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl glass-panel !p-0 border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="bg-accent/10 p-8 border-b border-accent/20 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Initialize <span className="text-accent">Directive</span></h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/70 mt-1">Deploy New Task to Operational Grid</p>
                </div>
                <button onClick={() => setIsDirectiveModalOpen(false)} className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Directive Title</label>
                  <input type="text" placeholder="e.g. Sanitize Cabin & Restock" className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white focus:outline-none focus:border-accent/50 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Task Category</label>
                    <select className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-gray-300 focus:outline-none focus:border-accent/50 transition-all appearance-none">
                      <option>Cleaning</option>
                      <option>Maintenance</option>
                      <option>Logistics</option>
                      <option>Charging</option>
                      <option>Inspection</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Priority Level</label>
                    <select className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-gray-300 focus:outline-none focus:border-accent/50 transition-all appearance-none">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Target Asset</label>
                    <input type="text" placeholder="Vehicle ID..." className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white focus:outline-none focus:border-accent/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Assign Operator</label>
                    <input type="text" placeholder="Operator Name/ID..." className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 px-5 text-sm font-bold text-white focus:outline-none focus:border-accent/50 transition-all" />
                  </div>
                </div>

                <div className="pt-4">
                  <button onClick={() => setIsDirectiveModalOpen(false)} className="w-full py-5 bg-accent text-[#0A0E17] font-black uppercase tracking-[0.2em] rounded-2xl shadow-glow-accent hover:scale-[1.01] transition-all flex items-center justify-center gap-3 text-xs italic">
                    <Send size={18} /> Deploy Directive
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OperationsTasks;
