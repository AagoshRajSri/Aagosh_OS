import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useWindows } from '../context/WindowContext';
import StartMenu from './StartMenu';
import { useAudio } from '../hooks/useOSEffects';

function Clock() {
  const { openWindow, showNotif } = useWindows();
  const [time, setTime] = useState('');
  const clicksRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleClick = () => {
    clicksRef.current += 1;
    if (clicksRef.current >= 7) {
      clicksRef.current = 0;
      openWindow('os-about');
      showNotif('🔓 DEVELOPER MENU UNLOCKED');
    }
    setTimeout(() => { clicksRef.current = 0; }, 3000);
  };

  return (
    <div onClick={handleClick} className="text-gray-200 font-bold text-[12px] cursor-pointer hover:text-pink-400 transition-colors select-none" aria-label="System Clock">
      {time}
    </div>
  );
}

export default function Taskbar() {
  const { openWindows, isVisible, toggleMinimize } = useWindows();
  const { muted, setMuted, playBlip } = useAudio();
  const [startOpen, setStartOpen] = useState(false);

  const WIN_LABELS = {
    about: '👤 About_Me.exe', projects: '📁 Projects.sys', skills: '🧬 Skills.dll',
    experience: '📜 Experience.log', contact: '📡 Contact.exe', mystery: '⚙️ ???.exe',
    'project-detail': '🔓 Project_Detail', 'os-about': '⚙️ OS_Config',
  };

  const handleStartToggle = () => {
    playBlip();
    setStartOpen(o => !o);
  };

  const toggleMute = () => {
    playBlip();
    setMuted(!muted);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[48px] flex items-center px-3 gap-3 z-[600]"
         style={{ background: 'rgba(20,15,40,0.85)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(139,92,246,0.3)', boxShadow: '0 -4px 20px rgba(0,0,0,0.4)' }}>
      
      {/* Start button */}
      <div className="relative h-full flex items-center">
        <button
          onClick={handleStartToggle}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-[13px] tracking-widest px-4 py-1.5 rounded shadow-[0_2px_0_rgba(109,40,217,1)] cursor-pointer hover:brightness-110 active:translate-y-px active:shadow-none transition-all"
        >
          <span className="mr-2">⚡</span>AagoshRaj
        </button>
        <StartMenu isOpen={startOpen} onClose={() => setStartOpen(false)} />
      </div>

      {/* Open windows */}
      <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-none items-center h-full">
        {openWindows.map(id => {
          const vis = isVisible(id);
          return (
            <button key={id}
              onClick={() => { playBlip(); toggleMinimize(id); }}
              className={`font-mono text-[10px] px-3 py-1.5 rounded-full border cursor-pointer max-w-[150px] truncate transition-all outline-none ${
                vis 
                  ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_8px_rgba(139,92,246,0.5)]' 
                  : 'bg-black/40 border-purple-500/30 text-gray-400 hover:border-purple-400'
              }`}
            >
              {WIN_LABELS[id] || id}
            </button>
          );
        })}
      </div>

      {/* Right side indicators */}
      <div className="flex items-center gap-4 text-gray-400 text-[13px] flex-shrink-0 h-full">
        <button onClick={toggleMute} className="mute-btn flex items-center justify-center w-6 h-6 rounded hover:bg-white/10 transition-colors" title={muted ? "Unmute" : "Mute"} aria-label="Toggle Sound">
          {muted ? '🔇' : '🔊'}
        </button>
        <div className="flex gap-1.5 items-center select-none" title="Battery: 87%">
          <span className="text-[14px]">🔋</span>
          <span className="text-[10px] font-bold text-gray-300">87%</span>
        </div>
        <div className="text-[14px] select-none" title="Connected">📶</div>
        <Clock />
      </div>
    </div>
  );
}
