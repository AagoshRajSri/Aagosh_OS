import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useDraggable } from '../hooks/useDraggable';
import { useWindows } from '../context/WindowContext';
import { useAudio } from '../hooks/useOSEffects';

export default function OSWindow({ id, title, children, defaultPos, width = 560, maxBodyH = '62vh' }) {
  const { closeWindow, minimizeWindow, bringToFront, getZ } = useWindows();
  const { pos, onMouseDown } = useDraggable(defaultPos || { x: 160, y: 80 });
  const winRef = useRef(null);
  const [maximized, setMaximized] = useState(false);
  const [focused, setFocused] = useState(true);
  const { playOpen, playClose, playBlip } = useAudio();

  // GSAP open animation
  useEffect(() => {
    bringToFront(id);
    if (winRef.current) {
      playOpen();
      gsap.fromTo(winRef.current,
        { scale: 0.82, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.32, ease: 'back.out(1.8)' }
      );
    }
  }, []);

  const handleMax = () => {
    playBlip();
    setMaximized(v => !v);
  };

  const handleClose = () => {
    playClose();
    if (winRef.current) {
      gsap.to(winRef.current, {
        scale: 0.85, opacity: 0, y: -15, duration: 0.22, ease: 'power2.in',
        onComplete: () => closeWindow(id),
      });
    } else {
      closeWindow(id);
    }
  };

  const handleMinimize = () => {
    playBlip();
    if (winRef.current) {
      gsap.to(winRef.current, {
        y: 80, opacity: 0, scale: 0.8, duration: 0.28, ease: 'power2.in',
        onComplete: () => minimizeWindow(id),
      });
    } else {
      minimizeWindow(id);
    }
  };

  const handleFocus = () => {
    setFocused(true);
    bringToFront(id);
  };

  const style = maximized
    ? { position: 'fixed', left: 0, top: 0, width: '100vw', height: 'calc(100vh - 52px)', zIndex: getZ(id) }
    : { position: 'absolute', left: pos.x, top: pos.y, width, zIndex: getZ(id) };

  const isFoc = focused; // simplification; use actual focus tracking if needed

  return (
    <div
      ref={winRef}
      style={style}
      className={`flex flex-col rounded-xl ${isFoc ? 'glass-window-focused' : 'glass-window'}`}
      onMouseDown={handleFocus}
      aria-label={`Window: ${title}`}
      role="dialog"
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-3 py-2 rounded-t-xl cursor-move select-none flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #ff6ec7, #8b5cf6)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        onMouseDown={onMouseDown}
      >
        <span className="text-[11px] font-bold tracking-widest text-white truncate opacity-95">
          {title}
        </span>
        <div className="flex gap-1.5 flex-shrink-0">
          <button
            className="win-btn w-[18px] h-[18px] rounded-full bg-yellow-400 border-2 border-black/20 text-[8px] text-black font-bold hover:scale-110 transition-transform"
            onClick={handleMinimize}
            aria-label="Minimize"
          >—</button>
          <button
            className="win-btn w-[18px] h-[18px] rounded-full bg-green-400 border-2 border-black/20 text-[8px] text-black font-bold hover:scale-110 transition-transform"
            onClick={handleMax}
            aria-label="Maximize"
          >□</button>
          <button
            className="win-btn w-[18px] h-[18px] rounded-full bg-red-500 border-2 border-black/20 text-[8px] text-white font-bold hover:scale-110 transition-transform"
            onClick={handleClose}
            aria-label="Close"
          >✕</button>
        </div>
      </div>

      {/* Body */}
      <div
        className="p-5 overflow-y-auto"
        style={{
          maxHeight: maximized ? 'calc(100vh - 100px)' : maxBodyH,
          scrollbarWidth: 'thin',
          scrollbarColor: '#8b5cf6 transparent',
        }}
      >
        {children}
      </div>
    </div>
  );
}
