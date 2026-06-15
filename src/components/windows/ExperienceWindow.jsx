import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import OSWindow from '../OSWindow';
import { EXPERIENCE } from '../../data';

function QuestEntry({ quest, index }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', delay: index * 0.1 }
    );
  }, [index]);

  return (
    <div ref={ref} className="relative pl-6 pb-8 border-l border-[#333] last:border-transparent last:pb-0">
      {/* Timeline Node */}
      <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-sm bg-[#0A0A0A] border border-[#666] flex items-center justify-center"
           style={{ borderColor: quest.completed ? '#4CAF50' : '#FF9800' }}>
      </div>

      <div className="bg-[#111] border border-[#222] p-4 hover:border-[#444] transition-colors rounded-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-3">
          <div>
            <div className="text-[10px] text-[#666] font-mono mb-1">{quest.version}</div>
            <div className="text-[14px] font-bold text-[#ededed] leading-tight font-mono tracking-tight">{quest.title}</div>
            <div className="text-[11px] text-[#888] font-mono">{quest.company}</div>
          </div>
          <div className="flex flex-col sm:items-end gap-2 flex-shrink-0">
            <span className="text-[9px] text-[#aaa] font-mono whitespace-nowrap bg-[#1A1A1A] px-2 py-0.5 rounded-sm border border-[#333]">
              {quest.period}
            </span>
            <span className="text-[10px] font-bold font-mono text-[#ededed] bg-[#222] px-2 py-0.5 rounded-sm border border-[#444]">
              {quest.xp}
            </span>
          </div>
        </div>

        {/* Body */}
        <p className="text-[12px] text-[#aaa] leading-relaxed mb-4 font-sans">
          {quest.desc}
        </p>

        {/* Rewards / Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#222]">
          <div className="flex flex-wrap gap-1.5">
            {quest.rewards.map(r => (
              <span key={r} className="text-[9px] font-mono text-[#888] bg-[#1A1A1A] px-2 py-0.5 rounded-sm border border-[#333]">
                + {r}
              </span>
            ))}
          </div>
          <div className="text-[10px] font-bold tracking-widest font-mono flex items-center gap-1.5" style={{ color: quest.completed ? '#888' : '#4CAF50' }}>
            {!quest.completed && <span className="w-1.5 h-1.5 bg-[#4CAF50] animate-pulse" />}
            {quest.status}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceWindow() {
  return (
    <OSWindow id="experience" title="Experience.log — MISSION_ARCHIVE" defaultPos={{ x: 180, y: 50 }} width={640} maxBodyH="70vh">
      <div className="pl-2 pt-2">
        {EXPERIENCE.map((q, i) => (
          <QuestEntry key={i} quest={q} index={i} />
        ))}
        
        {/* End of timeline indicator */}
        <div className="relative pl-6 mt-4">
          <div className="absolute left-[-3px] top-2 w-1.5 h-1.5 bg-[#444] rounded-sm" />
          <div className="text-[10px] text-[#555] font-mono italic">...awaiting new parameters...</div>
        </div>
      </div>
    </OSWindow>
  );
}
