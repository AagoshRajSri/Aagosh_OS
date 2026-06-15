import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useWindows } from '../context/WindowContext';

const SPEECH = {
  cat: ['meow.exe', 'Sleeping...', 'Need fish_data', 'Purr_routine()', '*yawn*', 'Too many windows!'],
  dog: ['bark.sh', 'Good boi?', 'Fetching data...', 'Woof!', '*pant* *pant*', 'I am scared!']
};

function Pet({ type, initialX, initialY, onMount }) {
  const ref = useRef(null);
  const timerRef = useRef(null);
  const [speech, setSpeech] = useState(null);
  const [imgFailed, setImgFailed] = useState(false);
  const posRef = useRef({ x: initialX, y: initialY });

  const randomWalk = useCallback(() => {
    if (!ref.current) return;
    const minX = 150; // Keep pets to the right of the desktop icons
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 120; // leave taskbar room

    const newX = Math.max(minX, Math.min(maxX, posRef.current.x + (Math.random() - 0.5) * 300));
    const newY = Math.max(20, Math.min(maxY, posRef.current.y + (Math.random() - 0.5) * 200));

    const dx = newX - posRef.current.x;
    gsap.to(ref.current, { scaleX: dx < 0 ? -1 : 1, duration: 0.2 });

    gsap.to(ref.current, {
      x: newX,
      y: newY,
      duration: Math.random() * 5 + 3,
      ease: 'power1.inOut',
      onComplete: () => {
        posRef.current = { x: newX, y: newY };
        timerRef.current = setTimeout(randomWalk, Math.random() * 3000 + 1500);
      }
    });
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    // Set initial position immediately
    gsap.set(ref.current, { x: initialX, y: initialY });
    posRef.current = { x: initialX, y: initialY };
    timerRef.current = setTimeout(randomWalk, Math.random() * 1000 + 500);
    if (onMount) onMount(ref, type);

    return () => {
      clearTimeout(timerRef.current);
      gsap.killTweensOf(ref.current);
    };
  }, []);

  const handleClick = () => {
    if (!ref.current) return;
    gsap.timeline()
      .to(ref.current, { scaleY: 0.7, scaleX: 1.3, duration: 0.08 })
      .to(ref.current, { y: '-=50', scaleY: 1.2, scaleX: 0.8, duration: 0.2, ease: 'power2.out' })
      .to(ref.current, { y: '+=50', scaleY: 0.9, scaleX: 1.1, duration: 0.2, ease: 'bounce.out' })
      .to(ref.current, { scaleY: 1, scaleX: 1, duration: 0.1 });

    const pool = SPEECH[type];
    setSpeech(pool[Math.floor(Math.random() * pool.length)]);
    setTimeout(() => setSpeech(null), 2500);
  };

  const emoji = type === 'cat' ? '🐱' : '🐕';

  return (
    <div
      ref={ref}
      onClick={handleClick}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 64,
        height: 64,
        cursor: 'pointer',
        zIndex: 200,
        userSelect: 'none',
        willChange: 'transform',
      }}
    >
      {/* Speech bubble */}
      {speech && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#111',
          color: '#ededed',
          border: '1px solid #333',
          fontSize: 10,
          fontWeight: 'bold',
          fontFamily: 'monospace',
          padding: '4px 8px',
          borderRadius: 2,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
          marginBottom: 6,
          animation: 'speechPop 0.2s ease-out',
        }}>
          {speech}
          <div style={{
            position: 'absolute',
            bottom: -5,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #333',
          }} />
        </div>
      )}

      {/* Pet body */}
      <div style={{
        width: 64,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'petFloat 3s ease-in-out infinite',
        animationDelay: type === 'dog' ? '-1.5s' : '0s',
        filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.5)) grayscale(100%) opacity(80%)',
      }}>
        {imgFailed ? (
          <span style={{ fontSize: 40, lineHeight: 1 }}>{emoji}</span>
        ) : (
          <img
            src={`/assets/${type}.png`}
            alt={type}
            style={{ width: 52, height: 52, objectFit: 'contain', imageRendering: 'pixelated' }}
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

export default function Pets() {
  const { openWindows } = useWindows();
  const catRefExternal = useRef(null);
  const dogRefExternal = useRef(null);

  const handleMount = (ref, type) => {
    if (type === 'cat') catRefExternal.current = ref.current;
    if (type === 'dog') dogRefExternal.current = ref.current;
  };

  // Scare reaction when too many windows open
  useEffect(() => {
    if (openWindows.length >= 4) {
      if (catRefExternal.current) {
        gsap.to(catRefExternal.current, { x: 150, y: window.innerHeight - 150, duration: 1.2, ease: 'power3.out' });
      }
      if (dogRefExternal.current) {
        gsap.to(dogRefExternal.current, { x: window.innerWidth - 90, y: window.innerHeight - 150, duration: 1.2, ease: 'power3.out' });
      }
    }
  }, [openWindows.length]);

  return (
    <>
      <style>{`
        @keyframes petFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes speechPop {
          from { opacity: 0; transform: translateX(-50%) scale(0.8); }
          to { opacity: 1; transform: translateX(-50%) scale(1); }
        }
      `}</style>
      <Pet type="cat" initialX={180} initialY={window.innerHeight - 200} onMount={handleMount} />
      <Pet type="dog" initialX={window.innerWidth - 200} initialY={window.innerHeight - 200} onMount={handleMount} />
    </>
  );
}
