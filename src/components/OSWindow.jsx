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

  useEffect(() => {
    bringToFront(id);
    if (winRef.current) {
      playOpen();
      gsap.fromTo(winRef.current,
        { scale: 0.95, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
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
        scale: 0.95, opacity: 0, y: -5, duration: 0.15, ease: 'power2.in',
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
        y: 40, opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in',
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
    ? { position: 'fixed', left: 0, top: 0, width: '100vw', height: 'calc(100vh - 48px)', zIndex: getZ(id) }
    : { position: 'absolute', left: pos.x, top: pos.y, width, zIndex: getZ(id) };

  const isFoc = focused; 

  return (
    <div
      ref={winRef}
      style={style}
      className={`flex flex-col rounded-sm ${isFoc ? 'glass-window-focused' : 'glass-window'}`}
      onMouseDown={handleFocus}
      aria-label={`Window: ${title}`}
      role="dialog"
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-3 py-1.5 cursor-move select-none flex-shrink-0 bg-[#111] border-b border-[#333]"
        onMouseDown={onMouseDown}
      >
        <span className="text-[11px] font-mono tracking-wider text-gray-300 truncate">
          {title}
        </span>
        <div className="flex gap-2 flex-shrink-0 items-center">
          <button
            className="w-3 h-3 bg-[#444] hover:bg-[#888] rounded-sm transition-colors"
            onClick={handleMinimize}
            aria-label="Minimize"
          />
          <button
            className="w-3 h-3 bg-[#444] hover:bg-[#888] rounded-sm transition-colors"
            onClick={handleMax}
            aria-label="Maximize"
          />
          <button
            className="w-3 h-3 bg-[#ff4444] hover:bg-[#ff6666] rounded-sm transition-colors"
            onClick={handleClose}
            aria-label="Close"
          />
        </div>
      </div>

      {/* Body */}
      <div
        className="p-5 overflow-y-auto bg-[#0a0a0a]"
        style={{
          maxHeight: maximized ? 'calc(100vh - 80px)' : maxBodyH,
          scrollbarWidth: 'thin',
          scrollbarColor: '#444 transparent',
        }}
      >
        {children}
      </div>
    </div>
  );
}
