import { useWindows } from '../context/WindowContext';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function NotifItem({ notif, onDismiss }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { x: 120, opacity: 0, rotate: 5 },
      { x: 0, opacity: 1, rotate: 0, duration: 0.35, ease: 'back.out(1.2)' }
    );
  }, []);

  const handleClose = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 140, opacity: 0, rotate: -8, duration: 0.3, ease: 'power2.in',
      onComplete: () => onDismiss(notif.id)
    });
  };

  return (
    <div
      ref={ref}
      onClick={handleClose}
      className="bg-black/80 border border-purple-500/50 rounded p-3 mb-2 w-[280px] shadow-[0_4px_12px_rgba(139,92,246,0.3)] cursor-pointer backdrop-blur-md"
      style={{ pointerEvents: 'auto' }}
      role="status"
    >
      <div className="text-[10px] text-green-400 font-mono flex items-start gap-2">
        <span className="text-purple-400 mt-0.5">&gt;</span>
        <span className="flex-1 leading-relaxed">{notif.msg}</span>
      </div>
    </div>
  );
}

export default function SysNotif() {
  const { notifications, dismissNotif } = useWindows();

  return (
    <div className="fixed bottom-[60px] right-4 z-[8000] flex flex-col-reverse items-end" style={{ pointerEvents: 'none' }}>
      {notifications.map(n => (
        <NotifItem key={n.id} notif={n} onDismiss={dismissNotif} />
      ))}
    </div>
  );
}
