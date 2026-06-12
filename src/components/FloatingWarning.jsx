import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useWindows } from '../context/WindowContext';
import { useAudio } from '../hooks/useOSEffects';

export default function FloatingWarning() {
  const { warningData, warningVisible, setWarningVisible } = useWindows();
  const { playBlip } = useAudio();
  const ref = useRef(null);

  useEffect(() => {
    if (warningVisible && warningData && ref.current) {
      playBlip();
      gsap.fromTo(ref.current,
        { x: 300, opacity: 0, scale: 0.9, rotate: 5 },
        { x: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.2)' }
      );
      
      const timer = setTimeout(() => {
        close();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [warningVisible, warningData]);

  const close = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 300, opacity: 0, rotate: -5, duration: 0.4, ease: 'power2.in',
      onComplete: () => setWarningVisible(false)
    });
  };

  if (!warningVisible || !warningData) return null;

  return (
    <div
      ref={ref}
      className="fixed top-6 right-6 z-[9999] max-w-[320px] rounded-lg overflow-hidden border border-red-500/50 shadow-[0_10px_40px_rgba(255,68,102,0.4)] cursor-pointer"
      style={{ background: 'linear-gradient(135deg, rgba(30,10,15,0.95), rgba(40,10,20,0.95))', backdropFilter: 'blur(12px)' }}
      onClick={close}
      role="alert"
    >
      <div className="px-3 py-1.5 flex items-center gap-2 bg-red-600/30 border-b border-red-500/40">
        <span className="text-[12px] animate-pulse">⚠</span>
        <span className="text-[10px] font-bold text-red-400 tracking-widest">{warningData.msg}</span>
      </div>
      <div className="p-4 text-[11px] font-mono text-pink-300 leading-relaxed whitespace-pre-line">
        {warningData.sub}
      </div>
      <div className="h-1 bg-red-900/50">
        <div className="h-full bg-red-500 origin-left" style={{ animation: 'scan-wipe 7s linear forwards' }} />
      </div>
    </div>
  );
}
