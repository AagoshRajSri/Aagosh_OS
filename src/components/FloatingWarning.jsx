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
      className="fixed top-6 right-6 z-[9999] max-w-[320px] rounded-sm overflow-hidden border border-[#F44336] shadow-lg cursor-pointer bg-[#050505]"
      onClick={close}
      role="alert"
    >
      <div className="px-3 py-1.5 flex items-center gap-2 bg-[#1A0505] border-b border-[#F44336]">
        <span className="text-[12px] animate-pulse">⚠</span>
        <span className="text-[10px] font-bold text-[#F44336] tracking-widest font-mono">{warningData.msg}</span>
      </div>
      <div className="p-4 text-[11px] font-mono text-[#ededed] leading-relaxed whitespace-pre-line">
        {warningData.sub}
      </div>
      <div className="h-1 bg-[#111]">
        <div className="h-full bg-[#F44336] origin-left" style={{ animation: 'scan-wipe 7s linear forwards' }} />
      </div>
    </div>
  );
}
