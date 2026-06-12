import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useWindows } from '../context/WindowContext';
import { WARNINGS } from '../data';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import ContactWindow from './windows/ContactWindow';
import MysteryWindow from './windows/MysteryWindow';
import OsAboutWindow from './windows/OsAboutWindow';
import FloatingWarning from './FloatingWarning';
import SysNotif from './SysNotif';
import Taskbar from './Taskbar';
import Pets from './Pets';
import { useKonami, triggerFireworks } from '../hooks/useOSEffects';

const ICONS = [
  { id: 'about',      icon: '👤', label: 'About_Me.exe',   cls: 'icon-float-0' },
  { id: 'projects',   icon: '📁', label: 'Projects.sys',   cls: 'icon-float-1' },
  { id: 'skills',     icon: '🧬', label: 'Skills.dll',     cls: 'icon-float-2' },
  { id: 'experience', icon: '📜', label: 'Experience.log', cls: 'icon-float-3' },
  { id: 'contact',    icon: '📡', label: 'Contact.exe',    cls: 'icon-float-4' },
  { id: 'mystery',    icon: '⚙️',  label: '???.exe',        cls: 'icon-float-5 pulse-icon', isMystery: true },
];

function AuroraCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let t = 0;

    // Hex particles
    const HEXES = Array.from({ length: 18 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      size: Math.random() * 40 + 20,
      speed: Math.random() * 0.2 + 0.05,
      opacity: Math.random() * 0.08 + 0.02,
      hue: Math.random() * 60 + 240,
    }));

    const drawHex = (cx, cy, r, opacity, hue) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const onMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.008;

      // Aurora radial
      const mx = mouseRef.current.x || w / 2;
      const my = mouseRef.current.y || h / 2;
      const r1 = ctx.createRadialGradient(mx * 0.8, my * 0.6, 0, w / 2, h / 3, w * 0.8);
      const hue = 260 + Math.sin(t * 0.5) * 40;
      r1.addColorStop(0, `hsla(${hue}, 90%, 25%, 0.5)`);
      r1.addColorStop(0.4, `hsla(${hue + 40}, 80%, 15%, 0.3)`);
      r1.addColorStop(1, 'transparent');
      ctx.fillStyle = r1;
      ctx.fillRect(0, 0, w, h);

      // Hex particles
      HEXES.forEach(hex => {
        hex.y -= hex.speed;
        if (hex.y + hex.size < 0) { hex.y = h + hex.size; hex.x = Math.random() * w; }
        const px = hex.x + (mouseRef.current.x - w / 2) * 0.02;
        const py = hex.y + (mouseRef.current.y - h / 2) * 0.02;
        drawHex(px, py, hex.size, hex.opacity, hex.hue + Math.sin(t) * 20);
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

function DesktopIcon({ id, icon, label, cls, onClick }) {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / 40;
    const dy = (e.clientY - cy) / 40;
    gsap.to(ref.current, { rotateX: -dy * 12, rotateY: dx * 12, duration: 0.2, ease: 'power1.out' });
  };
  const handleMouseLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
  };
  const handleClick = () => {
    gsap.timeline()
      .to(ref.current, { scale: 0.88, duration: 0.1 })
      .to(ref.current, { scale: 1, duration: 0.3, ease: 'elastic.out(1.5, 0.5)' });
    onClick();
  };

  return (
    <div
      ref={ref}
      id={`icon-${id}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      tabIndex={0}
      role="button"
      aria-label={`Open ${label}`}
      className="flex flex-col items-center gap-1.5 cursor-pointer p-2.5 rounded-xl w-[88px] transition-colors relative"
      style={{
        transformStyle: 'preserve-3d',
        background: focused ? 'rgba(139,92,246,0.2)' : 'transparent',
        backdropFilter: 'blur(8px)',
        border: focused ? '1px solid rgba(139,92,246,0.6)' : '1px solid transparent',
      }}
    >
      {/* Glassy tile */}
      <div className="w-14 h-14 rounded-xl flex items-center justify-center relative"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(255,110,199,0.08))',
          border: '1px solid rgba(139,92,246,0.25)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <span className={`text-[2rem] drop-shadow-[0_4px_12px_rgba(139,92,246,0.7)] ${cls}`}>
          {icon}
        </span>
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ boxShadow: 'inset 0 0 12px rgba(139,92,246,0.3)' }} />
      </div>
      <span className="text-[10px] text-white text-center drop-shadow-[0_1px_4px_black] break-words leading-tight">
        {label}
      </span>
    </div>
  );
}

let warningIdx = 0;

export default function Desktop() {
  const { openWindow, openMystery, isVisible, showWarning, openWindows, showNotif } = useWindows();

  // Konami code → fireworks
  useKonami(useCallback(() => {
    triggerFireworks();
    showNotif('🎆 KONAMI CODE ACTIVATED — Deploying fireworks protocol!');
  }, [showNotif]));

  useEffect(() => {
    setTimeout(() => openWindow('about'), 500);
    setTimeout(() => showWarning(WARNINGS[0]), 4500);

    const id = setInterval(() => {
      if (Math.random() < 0.35) {
        warningIdx = (warningIdx + 1) % WARNINGS.length;
        showWarning(WARNINGS[warningIdx]);
      }
    }, 28000);

    // Curiosity warning at 5 windows
    const watchInterval = setInterval(() => {
      if (openWindows.length >= 5) {
        showNotif('🔍 USER IS TOO CURIOUS — Monitoring level: MAXIMUM');
        clearInterval(watchInterval);
      }
    }, 2000);

    return () => { clearInterval(id); clearInterval(watchInterval); };
  }, []);

  const handleIcon = (item) => item.isMystery ? openMystery() : openWindow(item.id);

  return (
    <div
      className="fixed inset-0 bottom-[52px] overflow-hidden"
      style={{
        background: '#0A0020',
        zIndex: 1,
      }}
    >
      {/* Aurora canvas */}
      <AuroraCanvas />

      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(139,92,246,0.12) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          zIndex: 1,
        }}
      />

      {/* Scanlines */}
      <div
        className="scanlines fixed inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Desktop Icons */}
      <div className="absolute left-2 top-4 flex flex-col gap-0.5" style={{ zIndex: 10 }}>
        {ICONS.map((item, i) => (
          <DesktopIcon key={item.id} {...item} onClick={() => handleIcon(item)} />
        ))}
      </div>

      {/* Watermark */}
      <div className="absolute bottom-3 right-4 text-[10px] text-white/10 font-mono" style={{ zIndex: 3 }}>
        AagoshRaj_OS v0.1
      </div>

      {/* Pets */}
      <div style={{ zIndex: 10, position: 'relative' }}>
        <Pets />
      </div>

      {/* Windows */}
      <div style={{ zIndex: 100 }}>
        {isVisible('about')          && <AboutWindow />}
        {isVisible('projects')       && <ProjectsWindow />}
        {isVisible('skills')         && <SkillsWindow />}
        {isVisible('experience')     && <ExperienceWindow />}
        {isVisible('contact')        && <ContactWindow />}
        {isVisible('mystery')        && <MysteryWindow />}
        {isVisible('os-about')       && <OsAboutWindow />}
      </div>

      <FloatingWarning />
      <SysNotif />
      <Taskbar />
    </div>
  );
}
