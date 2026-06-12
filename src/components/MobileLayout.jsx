import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ABOUT, PROJECTS, SKILLS, EXPERIENCE } from '../data';

export default function MobileLayout() {
  const [scrollPct, setScrollPct] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (window.scrollY / h) * 100;
      setScrollPct(pct);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Health bar color changes as you scroll down
  const healthColor = scrollPct < 30 ? '#39ff82' : scrollPct < 70 ? '#ffe066' : '#ff4466';

  return (
    <div ref={containerRef} className="min-h-screen pb-20 relative" style={{ background: '#0A0020' }}>
      {/* Fixed Health Bar */}
      <div className="fixed top-0 left-0 w-full h-8 z-50 bg-black/80 backdrop-blur border-b border-purple-500/30 flex items-center px-4 gap-3">
        <span className="text-[10px] text-purple-400 font-bold tracking-widest">HP</span>
        <div className="flex-1 h-2 bg-gray-900 rounded-full border border-gray-700 overflow-hidden">
          <div className="h-full scroll-progress-bar" style={{ width: `${100 - scrollPct}%`, background: healthColor }} />
        </div>
        <span className="text-[10px] text-white font-mono">{Math.floor(100 - scrollPct)}%</span>
      </div>

      <div className="pt-16 px-4 flex flex-col gap-12">
        {/* Header / About */}
        <section className="animate-[notif-slide_0.5s_ease-out]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-pink-500 shadow-[0_0_15px_rgba(255,110,199,0.4)]">
              {ABOUT.avatarEmoji}
            </div>
            <div>
              <h1 className="text-[18px] font-bold text-pink-400 font-mono tracking-wider">{ABOUT.developerName}</h1>
              <p className="text-[10px] text-teal-300 tracking-widest mt-1">LVL 99 FULL-STACK ARCHITECT</p>
            </div>
          </div>
          <div className="bg-black/40 border border-purple-500/30 rounded-lg p-4 mb-6">
            <p className="text-[12px] text-gray-300 leading-relaxed">{ABOUT.shortBio}</p>
          </div>
          <div className="flex flex-col gap-3">
            {ABOUT.gauges.map(g => (
              <div key={g.label}>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-teal-400">{g.label}</span>
                  <span className={g.valCls}>{g.val}</span>
                </div>
                <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${g.cls}`} style={{ width: `${g.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-[14px] font-bold text-pink-500 mb-4 tracking-widest border-b border-purple-500/30 pb-2">📂 MISSION_LOG</h2>
          <p className="text-[9px] text-gray-500 mb-4">(Swipe left to open terminal)</p>
          <div className="flex flex-col gap-4">
            {PROJECTS.map((p, i) => (
              <MobileProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-[14px] font-bold text-pink-500 mb-4 tracking-widest border-b border-purple-500/30 pb-2">🧬 LOADOUT_MODULES</h2>
          <div className="grid grid-cols-2 gap-3">
            {SKILLS.map(s => (
              <div key={s.name} className="bg-black/40 border border-purple-500/30 rounded-lg p-3">
                <div className="text-[11px] font-bold text-teal-400 mb-1">{s.name}</div>
                <div className="text-[8px] text-gray-400 mb-2">{s.cat}</div>
                <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-[14px] font-bold text-pink-500 mb-4 tracking-widest border-b border-purple-500/30 pb-2">📜 QUEST_LOG</h2>
          <div className="pl-4 border-l-2 border-purple-500/30 flex flex-col gap-6">
            {EXPERIENCE.map(exp => (
              <div key={exp.title} className="relative">
                <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full border-2 border-black"
                     style={{ background: exp.completed ? '#ffe066' : '#39ff82' }} />
                <div className="text-[9px] text-gray-500 mb-1">{exp.period}</div>
                <div className="text-[13px] font-bold text-purple-300">{exp.title}</div>
                <div className="text-[10px] text-teal-400 mb-2">{exp.company}</div>
                <p className="text-[11px] text-gray-400 leading-relaxed mb-2">{exp.desc}</p>
                <div className="text-[9px] text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded w-fit border border-yellow-400/30">
                  {exp.xp}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function MobileProjectCard({ project, index }) {
  const [swiped, setSwiped] = useState(false);
  const touchStart = useRef(0);

  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) setSwiped(true);
    if (diff < -50) setSwiped(false);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-purple-500/30 h-[160px]"
         onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      
      {/* Underlayer (Actions) */}
      <div className="absolute inset-0 bg-purple-900/40 flex items-center justify-end pr-6">
        <div className="flex flex-col gap-3">
          <a href={project.demo} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-pink-400 bg-black/60 px-4 py-2 rounded text-center border border-pink-500/50">DEMO ↗</a>
          <a href={project.source} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-teal-400 bg-black/60 px-4 py-2 rounded text-center border border-teal-500/50">CODE ↗</a>
        </div>
      </div>

      {/* Top Layer */}
      <div className={`absolute inset-0 bg-black/80 backdrop-blur border border-purple-500/20 p-4 transition-transform duration-300 flex flex-col justify-between ${swiped ? '-translate-x-[120px]' : 'translate-x-0'}`}>
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[14px] font-bold text-pink-400">{project.name}</h3>
            <span className="text-[8px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">LVL {project.clearance}</span>
          </div>
          <p className="text-[10px] text-gray-300 leading-relaxed line-clamp-3">{project.desc}</p>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {project.tags.map(t => (
            <span key={t} className="text-[8px] bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded-full whitespace-nowrap border border-purple-500/30">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
