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
import CertificationsWindow from './windows/CertificationsWindow';
import ResumeWindow from './windows/ResumeWindow';
import FloatingWarning from './FloatingWarning';
import SysNotif from './SysNotif';
import Taskbar from './Taskbar';
import Pets from './Pets';
import { useKonami, triggerFireworks } from '../hooks/useOSEffects';
import bgImage from '../assets/background.jpg';

const ICONS = [
  { id: 'about',          icon: '👤', label: 'About_Me.exe' },
  { id: 'projects',       icon: '📁', label: 'Projects.sys' },
  { id: 'skills',         icon: '🧬', label: 'Skills.dll' },
  { id: 'experience',     icon: '📜', label: 'Experience.log' },
  { id: 'certifications', icon: '🎖️', label: 'Certifications.pem' },
  { id: 'resume',         icon: '📄', label: 'Resume.pdf' },
  { id: 'contact',        icon: '📡', label: 'Contact.exe' },
  { id: 'mystery',        icon: '⚙️',  label: '???.exe', isMystery: true },
];

function DesktopIcon({ id, icon, label, onClick }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      id={`icon-${id}`}
      onClick={onClick}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      tabIndex={0}
      role="button"
      aria-label={`Open ${label}`}
      className="flex flex-col items-center justify-center gap-2 cursor-pointer w-[90px] h-[90px] transition-all relative border border-transparent rounded-sm hover:bg-[#111]"
      style={{
        background: focused ? '#111' : 'transparent',
        borderColor: focused ? '#333' : 'transparent',
      }}
    >
      <span className="text-[2rem] text-gray-200">
        {icon}
      </span>
      <span className="text-[11px] text-gray-300 font-mono text-center break-words leading-tight bg-[#050505] px-1 rounded-sm">
        {label}
      </span>
    </div>
  );
}

let warningIdx = 0;

export default function Desktop() {
  const { openWindow, openMystery, isVisible, showWarning, openWindows, showNotif } = useWindows();

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
      className="fixed inset-0 bottom-[48px] overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 1,
      }}
    >
      {/* Retro Grid */}
      <div className="retro-grid fixed inset-0 pointer-events-none z-0" />

      {/* Desktop Icons */}
      <div className="absolute left-4 top-4 flex flex-col gap-2" style={{ zIndex: 10 }}>
        {ICONS.map((item) => (
          <DesktopIcon key={item.id} {...item} onClick={() => handleIcon(item)} />
        ))}
      </div>

      {/* Watermark */}
      <div className="absolute bottom-4 right-4 text-[11px] text-[#444] font-mono tracking-widest" style={{ zIndex: 3 }}>
        AAGOSH_OS // V_0.1
      </div>

      {/* Pets */}
      <Pets />

      {/* Windows */}
      <div style={{ zIndex: 100 }}>
        {isVisible('about')          && <AboutWindow />}
        {isVisible('projects')       && <ProjectsWindow />}
        {isVisible('skills')         && <SkillsWindow />}
        {isVisible('experience')     && <ExperienceWindow />}
        {isVisible('certifications') && <CertificationsWindow />}
        {isVisible('resume')         && <ResumeWindow />}
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
