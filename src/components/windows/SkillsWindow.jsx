import { useState, useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import OSWindow from '../OSWindow';
import { SKILLS } from '../../data';

function RarityBadge({ rarity }) {
  const label = rarity.toUpperCase();
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 font-mono bg-[#1A1A1A] text-[#888] border border-[#333]`}>
      {label}
    </span>
  );
}

function SkillCard({ skill }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  const handleHover = (isHovering) => {
    setFlipped(isHovering);
    if (!innerRef.current) return;
    if (isHovering) {
      gsap.to(innerRef.current, { rotateY: 180, duration: 0.5, ease: 'power2.out' });
      gsap.to(cardRef.current, { scale: 1.05, duration: 0.3, zIndex: 10 });
    } else {
      gsap.to(innerRef.current, { rotateY: 0, duration: 0.5, ease: 'power2.out' });
      gsap.to(cardRef.current, { scale: 1, duration: 0.3, zIndex: 1 });
    }
  };

  return (
    <div
      ref={cardRef}
      className="flip-card cursor-pointer h-[120px] w-full relative"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      tabIndex={0}
      role="button"
      aria-label={`Skill: ${skill.name}`}
    >
      <div ref={innerRef} className="flip-card-inner w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
        {/* Front */}
        <div className="flip-card-front bg-[#111] border border-[#333] p-3 flex flex-col justify-between hover:border-[#555]">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="text-[12px] font-bold text-[#ededed] font-mono leading-tight pr-2">{skill.name}</div>
              <RarityBadge rarity={skill.rarity} />
            </div>
            <div className="text-[9px] text-[#aaa] font-bold tracking-widest font-mono">{skill.cat}</div>
            <div className="text-[9px] text-[#666] font-mono mt-1">{skill.power}</div>
          </div>
          <div>
            <div className="flex justify-between text-[9px] mb-1 font-mono">
              <span className="text-[#666]">POWER LVL</span>
              <span className="text-[#ededed] font-bold">{skill.level}</span>
            </div>
            <div className="h-1 bg-[#222] overflow-hidden border border-[#333]">
              <div className="h-full bg-[#ededed]" style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back bg-[#1A1A1A] border border-[#555] p-3 flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-[#aaa] mb-1 font-mono">LEARNED: <span className="text-[#ededed]">{skill.learned}</span></div>
            <div className="text-[9px] text-[#888] leading-snug mb-2 font-sans">"{skill.desc}"</div>
            <div className="text-[8px] text-[#666] font-mono">
              <span className="font-bold text-[#aaa]">USED IN:</span> {skill.usedIn.join(' • ')}
            </div>
          </div>
          <div className="text-[9px] text-[#888] italic text-center font-mono">
            {skill.quip}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SkillsWindow() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [totalPower, setTotalPower] = useState(0);
  const powerRef = useRef(null);
  const containerRef = useRef(null);

  const categories = useMemo(() => {
    const cats = ['ALL'];
    SKILLS.forEach(s => { if (!cats.includes(s.cat)) cats.push(s.cat); });
    return cats;
  }, []);

  const filteredSkills = useMemo(() => {
    return activeTab === 'ALL' ? SKILLS : SKILLS.filter(s => s.cat === activeTab);
  }, [activeTab]);

  const maxPower = useMemo(() => SKILLS.reduce((acc, s) => acc + s.level, 0), []);

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: maxPower,
      duration: 2.5,
      ease: 'power3.out',
      onUpdate: () => setTotalPower(Math.floor(obj.val)),
    });
  }, [maxPower]);

  const handleTabChange = (cat) => {
    if (cat === activeTab) return;
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
    setActiveTab(cat);
  };

  return (
    <OSWindow id="skills" title="Skills.dll — TECH_ARSENAL" defaultPos={{ x: 140, y: 70 }} width={760} maxBodyH="75vh">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-end mb-6 border-b border-[#333] pb-4">
          <div>
            <div className="text-[20px] font-bold text-[#ededed] tracking-widest font-mono">
              LOADOUT_MODULES
            </div>
            <div className="text-[10px] text-[#888] font-mono">Select category to filter active equipment.</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-[#888] font-bold font-mono">TOTAL POWER LEVEL</div>
            <div ref={powerRef} className="text-[28px] font-bold text-[#ededed] font-mono">
              {totalPower}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleTabChange(cat)}
              className={`whitespace-nowrap px-4 py-2 text-[10px] font-mono font-bold transition-colors cursor-pointer border rounded-sm ${
                activeTab === cat 
                  ? 'bg-[#ededed] text-[#0A0A0A] border-transparent' 
                  : 'bg-transparent text-[#888] border-[#333] hover:border-[#666] hover:text-[#ccc]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4" style={{ minHeight: '300px' }}>
          {filteredSkills.map(skill => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </OSWindow>
  );
}
