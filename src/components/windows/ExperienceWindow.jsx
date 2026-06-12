import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import OSWindow from '../OSWindow';
import { EXPERIENCE } from '../../data';

function QuestEntry({ quest, index }) {
  const ref = useRef(null);

  useEffect(() => {
    // Staggered slide in from the right
    gsap.fromTo(ref.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.2)', delay: index * 0.15 + 0.3 }
    );
  }, [index]);

  return (
    <div ref={ref} className="relative pl-6 pb-8 border-l-2 border-purple-500/30 last:border-transparent last:pb-0">
      {/* Timeline Node */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-[#0A0020] flex items-center justify-center"
           style={{ background: quest.completed ? '#ffe066' : '#39ff82', boxShadow: `0 0 8px ${quest.completed ? '#ffe066' : '#39ff82'}` }}>
        {quest.completed && <span className="text-black text-[10px]">✓</span>}
      </div>

      <div className="bg-black/40 border border-purple-500/20 rounded-lg p-4 hover:border-pink-500/50 transition-colors shadow-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-3">
          <div>
            <div className="text-[10px] text-gray-500 font-mono mb-1">{quest.version}</div>
            <div className="text-[15px] font-bold text-pink-400 leading-tight">{quest.title}</div>
            <div className="text-[11px] text-teal-400">{quest.company}</div>
          </div>
          <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
            <span className="text-[9px] text-gray-400 whitespace-nowrap bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
              {quest.period}
            </span>
            <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/30">
              {quest.xp}
            </span>
          </div>
        </div>

        {/* Body */}
        <p className="text-[11px] text-gray-300 leading-relaxed mb-4">
          {quest.desc}
        </p>

        {/* Rewards / Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-purple-500/20">
          <div className="flex flex-wrap gap-1.5">
            {quest.rewards.map(r => (
              <span key={r} className="text-[9px] text-purple-300 bg-purple-900/40 px-2 py-0.5 rounded-full border border-purple-500/30">
                + {r}
              </span>
            ))}
          </div>
          <div className="text-[10px] font-bold tracking-widest flex items-center gap-1.5" style={{ color: quest.completed ? '#8b5cf6' : '#39ff82' }}>
            {!quest.completed && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
            {quest.status}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceWindow() {
  return (
    <OSWindow id="experience" title="Experience.log — QUEST JOURNAL" defaultPos={{ x: 180, y: 50 }} width={640} maxBodyH="70vh">
      <div className="pl-2 pt-2">
        {EXPERIENCE.map((q, i) => (
          <QuestEntry key={i} quest={q} index={i} />
        ))}
        
        {/* End of timeline indicator */}
        <div className="relative pl-6 mt-4">
          <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-purple-500/50" />
          <div className="text-[10px] text-gray-500 italic">...awaiting new quests...</div>
        </div>
      </div>
    </OSWindow>
  );
}
