import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Camera, CheckCircle2, 
  ChevronRight, ArrowLeft, AlertTriangle, 
  Zap, Gauge, MapPin, Smartphone, 
  Trash2, Plus, PenTool, X, Upload, 
  BatteryCharging, MousePointer2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const DriverVerification = ({ type = 'pickup' }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [checklist, setChecklist] = useState({
    exterior: false,
    interior: false,
    tires: false,
    fluids: false,
  });
  const [telemetry, setTelemetry] = useState({ fuel: '85', odo: '12402' });
  const [photos, setPhotos] = useState({ front: null, rear: null, sideL: null, sideR: null });
  const [showDamageMarker, setShowDamageMarker] = useState(false);
  const [damagePoints, setDamagePoints] = useState([]);
  const [otp, setOtp] = useState('');
  const [signed, setSigned] = useState(false);

  const handleToggle = (item) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handleAddDamage = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setDamagePoints([...damagePoints, { x, y }]);
    toast('Damage point marked', { icon: '📍' });
  };

  const handleFinalize = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Sealing Operational Protocol...',
        success: 'Mission successfully synchronized.',
        error: 'Synchronization failed',
      }
    ).then(() => navigate('/'));
  };

  const steps = [
    { id: 1, label: 'Audit', icon: CheckCircle2 },
    { id: 2, label: 'Evidence', icon: Camera },
    { id: 3, label: 'Verify', icon: ShieldCheck },
    { id: 4, label: 'Submit', icon: Zap },
  ];

  return (
    <div className="max-w-2xl mx-auto pb-24 px-4">
      {/* Mobile-First Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-xl text-gray-400">
             <ArrowLeft size={20} />
           </button>
           <div>
             <h2 className="text-2xl font-black text-white uppercase italic tracking-tight leading-none">
               Protocol <span className="text-highlight">Node</span>
             </h2>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Sequence V.3 • {type}</p>
           </div>
        </div>
        <div className="text-right">
           <p className="text-[10px] font-black text-highlight uppercase tracking-widest">Step {step}/4</p>
           <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1">{steps[step-1].label}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-10">
        {steps.map(s => (
          <div key={s.id} className={`h-1 flex-1 rounded-full transition-all duration-700 ${step >= s.id ? 'bg-highlight shadow-glow-accent' : 'bg-white/5'}`} />
        ))}
      </div>

      <AnimatePresence mode='wait'>
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Checklist */}
            <div className="glass-panel p-6 border-white/5 space-y-6">
               <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic mb-6">Hardware Audit</h3>
               <div className="grid grid-cols-1 gap-3">
                  {Object.keys(checklist).map(item => (
                     <label key={item} className="flex items-center gap-4 p-4 bg-[#0A0E17] rounded-2xl border border-white/5 cursor-pointer hover:border-highlight/30 transition-all group">
                        <div className="relative flex items-center justify-center">
                           <input 
                              type="checkbox" 
                              checked={checklist[item]}
                              onChange={() => handleToggle(item)}
                              className="peer appearance-none w-6 h-6 rounded-lg border-2 border-white/10 bg-white/5 checked:bg-highlight/20 checked:border-highlight transition-all" 
                           />
                           <CheckCircle2 size={14} className="absolute text-highlight opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xs font-black text-white uppercase tracking-widest group-hover:text-highlight transition-colors">{item} Inspection</span>
                     </label>
                  ))}
               </div>
            </div>

            {/* Telemetry */}
            <div className="glass-panel p-6 border-white/5 space-y-6">
               <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic mb-6">Telemetry Data</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-[8px] font-black text-gray-600 uppercase tracking-widest ml-1">Energy %</label>
                     <div className="relative">
                        <BatteryCharging className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={16} />
                        <input 
                           type="number" 
                           value={telemetry.fuel}
                           onChange={(e) => setTelemetry({...telemetry, fuel: e.target.value})}
                           className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:border-highlight/50 outline-none"
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[8px] font-black text-gray-600 uppercase tracking-widest ml-1">Odometer</label>
                     <div className="relative">
                        <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                        <input 
                           type="number" 
                           value={telemetry.odo}
                           onChange={(e) => setTelemetry({...telemetry, odo: e.target.value})}
                           className="w-full bg-[#0A0E17] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:border-highlight/50 outline-none"
                        />
                     </div>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              disabled={!Object.values(checklist).every(v => v)}
              className="w-full py-6 bg-highlight text-[#0A0E17] font-black uppercase tracking-[0.2em] rounded-2xl shadow-glow-accent disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-3 text-xs italic"
            >
              Next: Evidence Capture <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-6 border-white/5 space-y-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic">Visual Evidence</h3>
                  <button 
                     onClick={() => setShowDamageMarker(!showDamageMarker)}
                     className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all
                        ${showDamageMarker ? 'bg-danger/10 border-danger text-danger' : 'bg-white/5 border-white/10 text-gray-600'}
                     `}
                  >
                     {showDamageMarker ? 'Close Marker' : 'Mark Damage'}
                  </button>
               </div>

               {showDamageMarker ? (
                  <div className="space-y-4">
                     <div className="aspect-[2/1] bg-[#0A0E17] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center cursor-crosshair group" onClick={handleAddDamage}>
                        {/* Vehicle SVG Placeholder */}
                        <div className="relative w-full h-full p-4 opacity-30 group-hover:opacity-50 transition-opacity">
                           <svg viewBox="0 0 400 200" className="w-full h-full fill-none stroke-white/20 stroke-2">
                              <path d="M50,100 Q50,40 100,30 L300,30 Q350,40 350,100 L350,150 Q350,170 300,180 L100,180 Q50,170 50,150 Z" />
                              <circle cx="100" cy="160" r="20" />
                              <circle cx="300" cy="160" r="20" />
                           </svg>
                        </div>
                        {damagePoints.map((p, i) => (
                           <motion.div 
                              key={i}
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
                              style={{ left: `${p.x}%`, top: `${p.y}%` }}
                              className="absolute w-3 h-3 bg-danger rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                           />
                        ))}
                        <div className="absolute top-4 right-4 text-[8px] font-black text-danger uppercase tracking-widest bg-danger/10 px-2 py-1 rounded border border-danger/20">Click to Mark</div>
                     </div>
                     <button onClick={() => setDamagePoints([])} className="text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                        <Trash2 size={12} /> Clear Marks
                     </button>
                  </div>
               ) : (
                  <div className="grid grid-cols-2 gap-4">
                     {['Front', 'Rear', 'Left', 'Right'].map(pos => (
                        <div key={pos} className="aspect-square bg-[#0A0E17] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 group hover:border-highlight/40 transition-all cursor-pointer overflow-hidden relative">
                           <Camera size={24} className="text-gray-700 group-hover:text-highlight transition-colors" />
                           <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest group-hover:text-white transition-colors">{pos} View</span>
                           <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                     ))}
                  </div>
               )}
            </div>

            <div className="flex gap-4">
               <button onClick={() => setStep(1)} className="flex-1 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl text-[10px]">Back</button>
               <button onClick={() => setStep(3)} className="flex-[2] py-6 bg-highlight text-[#0A0E17] font-black uppercase tracking-widest rounded-2xl shadow-glow-accent text-[10px] italic transition-all active:scale-95">Next: Client Verify</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* OTP Section */}
            <div className="glass-panel p-8 border-white/5 space-y-6">
               <div className="text-center space-y-2 mb-8">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Security Seal</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Verify client OTP to proceed</p>
               </div>
               
               <div className="flex justify-center gap-4">
                  {[1, 2, 3, 4].map(i => (
                     <input 
                        key={i} 
                        type="number" 
                        maxLength="1"
                        className="w-12 h-16 bg-[#0A0E17] border border-white/10 rounded-xl text-center text-2xl font-black text-highlight focus:border-highlight/50 outline-none"
                     />
                  ))}
               </div>
               <button className="w-full py-4 bg-white/5 rounded-xl text-[10px] font-black text-gray-600 uppercase tracking-widest hover:text-white transition-colors">Resend OTP Link</button>
            </div>

            {/* Signature Section */}
            <div className="glass-panel p-6 border-white/5 space-y-6">
               <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic mb-6">Client Signature</h3>
               <div className="h-40 bg-[#0A0E17] border border-white/10 rounded-2xl flex flex-col items-center justify-center relative group overflow-hidden cursor-pointer" onClick={() => setSigned(true)}>
                  {!signed ? (
                     <>
                        <PenTool className="text-gray-800 mb-2" size={24} />
                        <p className="text-[8px] font-black text-gray-800 uppercase tracking-[0.2em]">Touch Screen to Sign</p>
                     </>
                  ) : (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                        <CheckCircle2 className="text-highlight mb-2" size={32} />
                        <p className="text-[8px] font-black text-highlight uppercase tracking-[0.2em]">Signature Encrypted</p>
                     </motion.div>
                  )}
               </div>
            </div>

            <div className="flex gap-4">
               <button onClick={() => setStep(2)} className="flex-1 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl text-[10px]">Back</button>
               <button onClick={() => setStep(4)} disabled={!signed} className="flex-[2] py-6 bg-highlight text-[#0A0E17] font-black uppercase tracking-widest rounded-2xl shadow-glow-accent text-[10px] italic disabled:opacity-50 transition-all active:scale-95">Final Review</button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8 border-highlight/20 bg-highlight/5 text-center space-y-8 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-highlight/30"></div>
               <div className="w-24 h-24 bg-highlight/10 rounded-full flex items-center justify-center mx-auto text-highlight border border-highlight/20 shadow-glow-accent">
                  <ShieldCheck size={48} />
               </div>
               
               <div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Seal Protocol</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-3 leading-relaxed">
                     Mission Data Synchronized <br />
                     Biometric Signature Sealed <br />
                     Visual Evidence Encrypted
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                     <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Energy Sync</p>
                     <p className="text-xs font-black text-white uppercase">{telemetry.fuel}% OK</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                     <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Evidence Nodes</p>
                     <p className="text-xs font-black text-white uppercase">4/4 UPLOADED</p>
                  </div>
               </div>
            </div>

            <button 
              onClick={handleFinalize}
              className="w-full py-6 bg-highlight text-[#0A0E17] font-black uppercase tracking-[0.3em] rounded-2xl shadow-glow-accent text-sm italic transition-all active:scale-95"
            >
              Seal Mission Protocol
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DriverVerification;
