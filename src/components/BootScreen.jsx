import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useWindows } from '../context/WindowContext';

const ASCII = [
  '██████╗ ██████╗ ███████╗ █████╗ ███╗   ███╗',
  '██╔══██╗██╔══██╗██╔════╝██╔══██╗████╗ ████║',
  '██║  ██║██████╔╝█████╗  ███████║██╔████╔██║',
  '██║  ██║██╔══██╗██╔══╝  ██╔══██║██║╚██╔╝██║',
  '██████╔╝██║  ██║███████╗██║  ██║██║ ╚═╝ ██║',
  '╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝',
];

const LOG = [
  { label: '[OK]',   text: 'Initializing Dream Drive...',               color: '#39ff82', cls: 'boot-ok' },
  { label: '[OK]',   text: 'Loading Personality Matrix...',             color: '#39ff82', cls: 'boot-ok' },
  { label: '[OK]',   text: 'Mounting /dev/creativity...',               color: '#39ff82', cls: 'boot-ok' },
  { label: '[WARN]', text: 'Caffeine_Level: ERR_OVERFLOW — suppressed', color: '#ffe066', cls: 'boot-warn' },
  { label: '[OK]',   text: 'Compiling Skill Tree (LVL 99)...',          color: '#39ff82', cls: 'boot-ok' },
  { label: '[OK]',   text: 'Decrypting Project Archives...',            color: '#39ff82', cls: 'boot-ok' },
  { label: '[OK]',   text: 'Establishing Post-Quantum Uplink...',       color: '#39ff82', cls: 'boot-ok' },
  { label: '[SYS]',  text: 'All systems nominal. Booting AagoshRaj_OS...', color: '#8b5cf6', cls: 'boot-ok' },
];

const GLITCH_CHARS = '!@#$%^&*<>?|░▒▓█▀▄■□▪▫◆◇○●';

function StarfieldCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const STAR_COUNT = 180;
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.8 + 0.2,
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const onMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = (mouseRef.current.x / w - 0.5) * 12;
      const my = (mouseRef.current.y / h - 0.5) * 12;

      starsRef.current.forEach(s => {
        s.y += s.speed;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(s.x + mx * s.r, s.y + my * s.r, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 150, 255, ${s.opacity})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    const visHandler = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current);
      else rafRef.current = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', visHandler);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', visHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

function GlitchAsciiLogo({ visible }) {
  const [lines, setLines] = useState(ASCII.map(() => ''));
  const rafRefs = useRef([]);

  useEffect(() => {
    if (!visible) return;
    ASCII.forEach((target, lineIdx) => {
      let frame = 0;
      const totalFrames = 18 + lineIdx * 6;
      const scramble = () => {
        frame++;
        if (frame < totalFrames) {
          setLines(prev => {
            const next = [...prev];
            next[lineIdx] = target.split('').map((ch, ci) => {
              const progress = frame / totalFrames;
              const charProgress = ci / target.length;
              if (charProgress < progress - 0.15) return ch;
              if (Math.random() > 0.5) return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
              return ch;
            }).join('');
            return next;
          });
          rafRefs.current[lineIdx] = requestAnimationFrame(scramble);
        } else {
          setLines(prev => { const next = [...prev]; next[lineIdx] = target; return next; });
        }
      };
      setTimeout(() => {
        rafRefs.current[lineIdx] = requestAnimationFrame(scramble);
      }, lineIdx * 120);
    });
    return () => { rafRefs.current.forEach(r => cancelAnimationFrame(r)); };
  }, [visible]);

  return (
    <div className="flex flex-col gap-0.5">
      {lines.map((l, i) => (
        <span key={i} className="logo-line">{l}</span>
      ))}
      <span className="logo-sub mt-2 font-bold text-xs">CYBER_POP.SYS v0.1</span>
    </div>
  );
}

export default function BootScreen({ onComplete, isMobile }) {
  const containerRef = useRef(null);
  const fillRef      = useRef(null);
  const pctRef       = useRef(null);
  const { setDevMode } = useWindows();

  const [visibleRows, setVisibleRows]   = useState([]);
  const [showEnter, setShowEnter]       = useState(false);
  const [logDelays]                     = useState(() => LOG.map(() => 50 + Math.random() * 150));
  const [logoVisible, setLogoVisible]   = useState(false);

  // DEV MODE: typing "AAGOSHRAJ" during boot
  const typedRef = useRef('');
  useEffect(() => {
    const handler = (e) => {
      typedRef.current = (typedRef.current + e.key).slice(-9).toUpperCase();
      if (typedRef.current === 'AAGOSHRAJ') {
        setDevMode(true);
        handleComplete();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    // Fade in logo after a short delay
    setTimeout(() => setLogoVisible(true), 300);

    // Stagger log rows with variable delays
    let cumDelay = 600;
    LOG.forEach((_, i) => {
      setTimeout(() => setVisibleRows(p => [...p, i]), cumDelay);
      cumDelay += 300 + logDelays[i];
    });

    // GSAP progress bar — color shifts purple→pink→cyan
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 5,
      ease: 'power1.inOut',
      onUpdate() {
        if (!fillRef.current) return;
        const v = obj.val;
        let color;
        if (v < 33)       color = `hsl(270, 80%, 60%)`;
        else if (v < 66)  color = `hsl(${270 + (v-33)*2.7}, 80%, 65%)`;
        else              color = `hsl(${270 + 90 + (v-66)*2.7}, 80%, 70%)`;
        fillRef.current.style.width = v + '%';
        fillRef.current.style.background = color;
        if (pctRef.current) pctRef.current.textContent = Math.floor(v) + '%';
      },
      onComplete() { setShowEnter(true); },
    });
  }, []);

  const handleComplete = useCallback(() => {
    if (isMobile) document.body.classList.add('mobile-scroll');
    onComplete();
  }, [isMobile, onComplete]);

  const enter = () => {
    // Shattering pixel dissolution
    const el = containerRef.current;
    if (!el) return;
    gsap.to(el, {
      opacity: 0,
      scale: 1.04,
      filter: 'blur(12px) saturate(0)',
      duration: 0.7,
      ease: 'power2.in',
      onComplete: handleComplete,
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9000] bg-black flex items-center justify-center px-4"
      style={{ zIndex: 9000 }}
    >
      <StarfieldCanvas />
      {/* Scanlines */}
      <div className="scanlines fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      <div className="relative w-full max-w-[680px] flex flex-col gap-5" style={{ zIndex: 3 }}>
        {/* ASCII logo */}
        <div className="hidden sm:block">
          <GlitchAsciiLogo visible={logoVisible} />
        </div>
        {/* Mobile fallback */}
        <div className="block sm:hidden text-center">
          <div className="text-[22px] font-bold text-purple-400 mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>AagoshRaj_OS</div>
          <div className="text-pink-400 text-[10px] font-bold">CYBER_POP.SYS v0.1</div>
        </div>

        {/* Boot log */}
        <div className="flex flex-col gap-1.5">
          {LOG.map((entry, i) => (
            <div
              key={i}
              className={`text-[11px] transition-all duration-300 ${visibleRows.includes(i) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <span className={`mr-2 font-bold text-[11px] ${entry.cls}`}>{entry.label}</span>
              <span className="text-gray-400">{entry.text}</span>
              {visibleRows.includes(i) && (
                <span className={`ml-2 ${entry.cls}`}>✓</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-purple-400 tracking-[3px]">LOADING AagoshRaj_OS</span>
          <div className="h-[14px] border-2 border-purple-600 rounded bg-black overflow-hidden">
            <div
              ref={fillRef}
              className="h-full rounded"
              style={{ width: '0%', background: '#8b5cf6', transition: 'width 0.1s' }}
            />
          </div>
          <span ref={pctRef} className="text-[10px] text-gray-500">0%</span>
        </div>

        {/* Enter button */}
        {showEnter && (
          <button
            onClick={enter}
            className="breathe-glow border-2 bg-transparent font-mono text-[13px] px-6 py-3 cursor-pointer w-fit rounded"
            style={{ borderColor: '#8b5cf6', color: '#8b5cf6' }}
            aria-label="Enter AagoshRaj_OS"
          >
            [ PRESS ENTER TO BOOT ]
          </button>
        )}

        <div className="text-[9px] text-gray-700 mt-2">
          TIP: Type "AagoshRaj" to enter DEV_MODE
        </div>
      </div>
    </div>
  );
}
