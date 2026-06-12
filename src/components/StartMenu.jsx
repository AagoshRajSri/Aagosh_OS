import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useWindows } from '../context/WindowContext';
import { useAudio } from '../hooks/useOSEffects';

const ITEMS = [
  { id: 'about',      icon: '👤', label: 'About_Me.exe' },
  { id: 'projects',   icon: '📁', label: 'Projects.sys' },
  { id: 'skills',     icon: '🧬', label: 'Skills.dll' },
  { id: 'experience', icon: '📜', label: 'Experience.log' },
  { id: 'contact',    icon: '📡', label: 'Contact.exe' },
  { id: 'mystery',    icon: '⚙️',  label: '???.exe', isMystery: true },
];

export default function StartMenu({ isOpen, onClose }) {
  const { openWindow, openMystery, devMode } = useWindows();
  const { playBlip, playClose } = useAudio();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.fromTo(menuRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)', display: 'block' }
      );
    } else {
      gsap.to(menuRef.current, {
        y: 10, opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in',
        onComplete: () => { if (menuRef.current) menuRef.current.style.display = 'none'; }
      });
    }
  }, [isOpen]);

  const handleItem = (item) => {
    playBlip();
    item.isMystery ? openMystery() : openWindow(item.id);
    onClose();
  };

  const handleShutdown = () => {
    playClose();
    onClose();
    
    // Animate everything away
    gsap.to('body > div:not(#root)', { opacity: 0, duration: 0.5 });
    
    setTimeout(() => {
      document.body.innerHTML = `
        <div style="background:#0A0020; color:#8b5cf6; font-family:'Space Mono', monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-size:1.1rem; gap:10px;">
          <div style="animation: blink 1s infinite">AagoshRaj_OS shutting down...</div>
          <div style="color:#ff6ec7; margin-top:20px; font-size: 0.8rem; animation: float-up 3s ease-in-out infinite;">See you, space cowboy.</div>
        </div>
      `;
    }, 500);
  };

  return (
    <div
      ref={menuRef}
      className="absolute bottom-[52px] left-0 w-[320px] rounded-xl z-[600] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.8)] border border-purple-500/40"
      style={{ display: 'none', background: 'rgba(20,15,40,0.9)', backdropFilter: 'blur(20px)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: 'linear-gradient(135deg, #ff6ec7, #8b5cf6)' }}>
        <div className="text-[14px] font-bold text-white tracking-widest" style={{ fontFamily: 'Orbitron, monospace' }}>
          AagoshRaj_OS
        </div>
        {devMode && (
          <span className="bg-black/40 text-yellow-400 text-[8px] font-bold px-2 py-0.5 rounded border border-yellow-400/50">
            DEV_MODE
          </span>
        )}
      </div>

      {/* System Info Panel */}
      <div className="px-4 py-3 border-b border-purple-500/20 bg-black/20">
        <div className="text-[9px] text-teal-400 font-bold mb-1">SYSTEM CONFIGURATION</div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] text-gray-400">
          <div>Memory: <span className="text-gray-200">1024 TB</span></div>
          <div>CPU: <span className="text-gray-200">Neural Core</span></div>
          <div>Uptime: <span className="text-gray-200">Infinite</span></div>
          <div>Version: <span className="text-gray-200">v0.1.0</span></div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="p-3 grid grid-cols-3 gap-2">
        {ITEMS.map(item => (
          <button key={item.id}
            onClick={() => handleItem(item)}
            className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg bg-white/5 border border-transparent hover:bg-purple-500/20 hover:border-purple-500/30 transition-all cursor-pointer"
          >
            <span className="text-[20px] drop-shadow-[0_2px_4px_rgba(139,92,246,0.6)]">{item.icon}</span>
            <span className="text-[9px] text-gray-300 font-mono text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Footer / Shutdown */}
      <div className="px-4 py-2 border-t border-purple-500/20 bg-black/30 flex justify-end">
        <button
          onClick={handleShutdown}
          className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-red-400 font-bold hover:bg-red-500/10 rounded border border-transparent hover:border-red-500/30 transition-colors cursor-pointer"
        >
          <span className="text-[12px]">⏻</span> SHUTDOWN
        </button>
      </div>
    </div>
  );
}
