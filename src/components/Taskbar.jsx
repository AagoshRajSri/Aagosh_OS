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
    <div onClick={handleClick} className="text-[#ededed] font-mono text-[12px] cursor-pointer hover:text-white transition-colors select-none bg-[#111] px-2 py-1 rounded-sm" aria-label="System Clock">
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
    <div className="fixed bottom-0 left-0 right-0 h-[48px] flex items-center px-2 gap-3 z-[600]"
         style={{ background: '#0A0A0A', borderTop: '1px solid #222' }}>
      
      {/* Start button */}
      <div className="relative h-full flex items-center">
        <button
          onClick={handleStartToggle}
          className="bg-[#ededed] text-[#0A0A0A] font-bold text-[12px] tracking-widest px-4 py-1.5 rounded-sm shadow-sm cursor-pointer hover:bg-white active:scale-[0.98] transition-all"
        >
          AAGOSH_OS
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
              className={`font-mono text-[10px] px-3 py-1.5 rounded-sm border cursor-pointer max-w-[150px] truncate transition-all outline-none ${
                vis 
                  ? 'bg-[#222] border-[#444] text-[#ededed]' 
                  : 'bg-transparent border-[#222] text-[#888] hover:border-[#444] hover:text-[#ccc]'
              }`}
            >
              {WIN_LABELS[id] || id}
            </button>
          );
        })}
      </div>

      {/* Right side indicators */}
      <div className="flex items-center gap-3 text-[#888] text-[13px] flex-shrink-0 h-full">
        <button onClick={toggleMute} className="flex items-center justify-center w-6 h-6 rounded-sm hover:bg-[#222] hover:text-[#ccc] transition-colors" title={muted ? "Unmute" : "Mute"} aria-label="Toggle Sound">
          {muted ? '🔇' : '🔊'}
        </button>
        <div className="flex gap-1.5 items-center select-none" title="Battery: 87%">
          <span className="text-[14px]">🔋</span>
          <span className="text-[10px] font-mono font-bold text-[#ccc]">87%</span>
        </div>
        <div className="text-[14px] select-none" title="Connected">📶</div>
        <Clock />
      </div>
    </div>
  );
}
