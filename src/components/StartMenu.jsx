import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useWindows } from '../context/WindowContext';
import { useAudio } from '../hooks/useOSEffects';

const ITEMS = [
  { id: 'about',          icon: '👤', label: 'About_Me.exe' },
  { id: 'projects',       icon: '📁', label: 'Projects.sys' },
  { id: 'skills',         icon: '🧬', label: 'Skills.dll' },
  { id: 'experience',     icon: '📜', label: 'Experience.log' },
  { id: 'certifications', icon: '🎖️', label: 'Certifications.pem' },
  { id: 'resume',         icon: '📄', label: 'Resume.pdf' },
  { id: 'contact',        icon: '📡', label: 'Contact.exe' },
  { id: 'mystery',        icon: '⚙️',  label: '???.exe', isMystery: true },
];

export default function StartMenu({ isOpen, onClose }) {
  const { openWindow, openMystery, devMode } = useWindows();
  const { playBlip, playClose } = useAudio();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.fromTo(menuRef.current,
        { y: 10, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out', display: 'block' }
      );
    } else {
      gsap.to(menuRef.current, {
        y: 5, opacity: 0, scale: 0.98, duration: 0.15, ease: 'power2.in',
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
    
    gsap.to('body > div:not(#root)', { opacity: 0, duration: 0.5 });
    
    setTimeout(() => {
      document.body.innerHTML = `
        <div style="background:#050505; color:#ededed; font-family:'Fira Code', monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-size:1.1rem; gap:10px;">
          <div style="animation: blink 1s infinite">SYSTEM OFFLINE</div>
          <div style="color:#888; margin-top:20px; font-size: 0.8rem;">You may now safely close this tab.</div>
        </div>
      `;
    }, 500);
  };

  return (
    <div
      ref={menuRef}
      className="absolute bottom-[48px] left-0 w-[300px] rounded-sm z-[600] overflow-hidden shadow-lg border border-[#333]"
      style={{ display: 'none', background: '#0F0F0F' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border-b border-[#333]">
        <div className="text-[12px] font-bold text-[#ededed] tracking-widest font-mono">
          AAGOSH_OS
        </div>
        {devMode && (
          <span className="bg-[#333] text-[#FF9800] text-[9px] font-bold px-2 py-0.5 rounded-sm">
            DEV
          </span>
        )}
      </div>

      {/* System Info Panel */}
      <div className="px-4 py-3 border-b border-[#222]">
        <div className="text-[9px] text-[#888] font-mono font-bold mb-2">SYSTEM CONFIGURATION</div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-[#666] font-mono">
          <div>Memory: <span className="text-[#ccc]">1024 TB</span></div>
          <div>CPU: <span className="text-[#ccc]">Neural Core</span></div>
          <div>Uptime: <span className="text-[#ccc]">Infinite</span></div>
          <div>Version: <span className="text-[#ccc]">v0.1.0</span></div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="p-3 grid grid-cols-3 gap-2">
        {ITEMS.map(item => (
          <button key={item.id}
            onClick={() => handleItem(item)}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-sm bg-[#151515] hover:bg-[#222] transition-colors cursor-pointer border border-[#2A2A2A] hover:border-[#444]"
          >
            <span className="text-[18px] grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0">{item.icon}</span>
            <span className="text-[9px] text-[#aaa] font-mono text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Footer / Shutdown */}
      <div className="px-4 py-2 bg-[#151515] border-t border-[#333] flex justify-end">
        <button
          onClick={handleShutdown}
          className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-[#F44336] font-mono font-bold hover:bg-[#2A1111] rounded-sm transition-colors cursor-pointer"
        >
          <span className="text-[12px]">⏻</span> SHUTDOWN
        </button>
      </div>
    </div>
  );
}
