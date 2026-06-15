import { useState, useEffect, useRef } from 'react';
import { ABOUT, PROJECTS, SKILLS, EXPERIENCE } from '../data';

export default function MobileLayout() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeTab, setActiveTab] = useState('about');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      setScrollPct(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const healthColor = scrollPct < 30 ? '#4CAF50' : scrollPct < 70 ? '#FF9800' : '#F44336';

  const scrollToSection = (id) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen pb-24 relative overflow-hidden font-mono" style={{ background: '#050505', color: '#ededed' }}>
      
      {/* Retro Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 retro-grid" />

      {/* Fixed HUD / Top Bar */}
      <div className="fixed top-0 left-0 w-full h-12 z-50 bg-[#111] border-b border-[#333] flex items-center px-4 gap-4">
        <span className="text-[12px] font-bold tracking-widest text-[#ededed] bg-[#222] px-2 py-1 border border-[#444]">SYS</span>
        <div className="flex-1 h-3 bg-[#0A0A0A] border border-[#222] relative">
          <div className="h-full transition-all duration-300 ease-out border-r border-[#111]" style={{ width: `${100 - scrollPct}%`, background: healthColor }} />
        </div>
        <span className="text-[12px] font-bold bg-[#222] text-[#ededed] px-2 py-1 border border-[#444]">{Math.floor(100 - scrollPct)}%</span>
      </div>

      <div className="pt-24 px-5 flex flex-col gap-16 relative z-10">
        
        {/* Header / About */}
        <section id="section-about">
          <div className="flex flex-col gap-5 mb-8">
            <div className="w-20 h-20 bg-[#111] border border-[#333] flex items-center justify-center text-4xl">
              {ABOUT.avatarEmoji}
            </div>
            <div>
              <h1 className="text-[22px] font-bold uppercase leading-none mb-2 tracking-tight text-[#ededed]">{ABOUT.developerName}</h1>
              <span className="text-[10px] font-bold bg-[#1A1A1A] text-[#aaa] px-3 py-1 border border-[#333] inline-block uppercase">LVL 99 ARCHITECT</span>
            </div>
          </div>
          
          <div className="bg-[#111] border border-[#333] p-5 mb-8">
            <p className="text-[12px] leading-relaxed text-[#ccc] font-sans">{ABOUT.shortBio}</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {ABOUT.gauges.map((g, i) => {
              return (
                <div key={g.label} className="bg-[#0A0A0A] border border-[#222] p-3">
                  <div className="flex justify-between text-[11px] mb-2 font-bold uppercase text-[#888]">
                    <span>{g.label}</span>
                    <span className="text-[#ededed]">{g.val}</span>
                  </div>
                  <div className="h-2 border border-[#333] relative bg-[#111]">
                    <div className="h-full absolute top-0 left-0 bg-[#ededed]" style={{ width: `${g.pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects */}
        <section id="section-projects">
          <h2 className="text-[16px] font-bold uppercase mb-6 inline-block bg-[#111] text-[#ededed] px-3 py-1 border border-[#333] tracking-widest">MISSION_LOG</h2>
          <div className="flex flex-col gap-6">
            {PROJECTS.map((p, i) => (
              <MobileProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="section-skills">
          <h2 className="text-[16px] font-bold uppercase mb-6 inline-block bg-[#111] text-[#ededed] px-3 py-1 border border-[#333] tracking-widest">MODULES</h2>
          <div className="grid grid-cols-2 gap-4">
            {SKILLS.map((s, i) => (
              <div key={s.name} className="bg-[#111] border border-[#333] p-4 transition-colors hover:border-[#555]">
                <div className="text-[12px] font-bold text-[#ededed] mb-1 uppercase">{s.name}</div>
                <div className="text-[9px] bg-[#1A1A1A] text-[#888] inline-block px-1 mb-3 font-bold uppercase border border-[#333]">{s.cat}</div>
                <div className="h-1 bg-[#222] border border-[#333] w-full">
                  <div className="h-full bg-[#ededed]" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="section-experience">
          <h2 className="text-[16px] font-bold uppercase mb-8 inline-block bg-[#111] text-[#ededed] px-3 py-1 border border-[#333] tracking-widest">QUEST_LOG</h2>
          <div className="flex flex-col gap-6 border-l border-[#333] pl-6 ml-2">
            {EXPERIENCE.map((exp, i) => (
              <div key={exp.title} className="relative bg-[#111] border border-[#333] p-5">
                {/* Node on timeline */}
                <div className="absolute -left-[30px] top-4 w-3 h-3 bg-[#050505] border border-[#666]" />
                
                <div className="inline-block text-[10px] font-bold bg-[#1A1A1A] text-[#aaa] px-2 py-1 border border-[#333] mb-3">{exp.period}</div>
                <div className="text-[14px] font-bold text-[#ededed] uppercase mb-1 tracking-tight">{exp.title}</div>
                <div className="text-[11px] font-bold mb-4 uppercase text-[#888]">{exp.company}</div>
                <p className="text-[12px] leading-relaxed text-[#ccc] mb-4 font-sans">{exp.desc}</p>
                <div className="text-[10px] font-bold bg-[#0A0A0A] text-[#888] px-3 py-1 border border-[#222] inline-block">
                  XP: {exp.xp}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Nav */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-[#0A0A0A] border-t border-[#333] flex justify-around items-center px-2 z-50 pb-safe">
        {[
          { id: 'about', icon: 'SYS' },
          { id: 'projects', icon: 'LOGS' },
          { id: 'skills', icon: 'MODS' },
          { id: 'experience', icon: 'QUEST' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            className={`w-16 h-10 flex items-center justify-center border font-bold text-[11px] transition-colors
              ${activeTab === tab.id ? 'bg-[#ededed] text-[#0A0A0A] border-[#ededed]' : 'bg-transparent border-[#333] text-[#888] hover:border-[#666] hover:text-[#ccc]'}`}
          >
            {tab.icon}
          </button>
        ))}
      </div>
      
      <style>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>
    </div>
  );
}

function MobileProjectCard({ project, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative bg-[#111] border border-[#333] transition-all duration-200 cursor-pointer ${isOpen ? 'border-[#666]' : ''}`}
         onClick={() => setIsOpen(!isOpen)}>
      
      <div className="p-4 border-b border-[#333] bg-[#0A0A0A]">
        <div className="flex justify-between items-center">
          <h3 className="text-[14px] font-bold uppercase text-[#ededed] tracking-tight">{project.name}</h3>
          <div className="text-[10px] font-bold bg-[#1A1A1A] text-[#aaa] px-2 py-1 border border-[#333]">
            {isOpen ? '[ - ]' : '[ + ]'}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="inline-block text-[10px] font-bold bg-[#1A1A1A] text-[#888] px-2 py-1 border border-[#333] mb-4">
          LVL {project.clearance}
        </div>
        
        <p className={`text-[12px] text-[#ccc] leading-relaxed font-sans transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] mb-6' : 'max-h-12 line-clamp-2'}`}>
          {project.desc}
        </p>

        {/* Expanded Details */}
        <div className={`transition-all duration-300 overflow-hidden flex gap-2 ${isOpen ? 'max-h-[100px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
          <a href={project.demo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} 
             className="flex-1 text-[11px] font-bold text-[#0A0A0A] bg-[#ededed] py-2 text-center transition-colors hover:bg-white border border-[#ededed]">
            DEMO ↗
          </a>
          <a href={project.source} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} 
             className="flex-1 text-[11px] font-bold text-[#aaa] bg-transparent py-2 border border-[#444] text-center transition-colors hover:text-[#ededed] hover:border-[#888]">
            CODE
          </a>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-[#222]">
          {project.tags.map(t => (
            <span key={t} className="text-[9px] font-bold uppercase bg-[#1A1A1A] text-[#666] px-2 py-1 border border-[#333]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
