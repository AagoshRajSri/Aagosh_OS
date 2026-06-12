import { useState, useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import OSWindow from '../OSWindow';
import { SKILLS } from '../../data';

function RarityBadge({ rarity }) {
  const label = rarity.toUpperCase();
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full rarity-${rarity}`}>
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
        <div className="flip-card-front bg-surface2 border border-purple-500/40 p-3 flex flex-col justify-between"
             style={{ background: 'linear-gradient(135deg, rgba(30,26,46,0.9), rgba(42,36,64,0.9))' }}>
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="text-[12px] font-bold text-pink-400 leading-tight pr-2">{skill.name}</div>
              <RarityBadge rarity={skill.rarity} />
            </div>
            <div className="text-[9px] text-teal-400 font-bold tracking-widest">{skill.cat}</div>
            <div className="text-[9px] text-gray-400">{skill.power}</div>
          </div>
          <div>
            <div className="flex justify-between text-[9px] mb-1">
              <span className="text-gray-500">POWER LVL</span>
              <span className="text-yellow-400 font-bold">{skill.level}</span>
            </div>
            <div className="h-1.5 bg-black rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500" style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back bg-surface border border-pink-500 p-3 flex flex-col justify-between"
             style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(255,110,199,0.15))' }}>
          <div>
            <div className="text-[10px] text-teal-300 mb-1">LEARNED: <span className="text-white">{skill.learned}</span></div>
            <div className="text-[9px] text-gray-300 leading-snug mb-2">"{skill.desc}"</div>
            <div className="text-[8px] text-purple-300">
              <span className="font-bold">USED IN:</span> {skill.usedIn.join(' • ')}
            </div>
          </div>
          <div className="text-[9px] text-pink-400 italic text-center font-bold">
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
      // Scan-line wipe transition
      gsap.fromTo(containerRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power2.out' }
      );
    }
    setActiveTab(cat);
  };

  return (
    <OSWindow id="skills" title="Skills.dll — TECH ARSENAL" defaultPos={{ x: 140, y: 70 }} width={760} maxBodyH="75vh">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-end mb-6 border-b border-purple-500/30 pb-4">
          <div>
            <div className="text-[24px] font-bold text-pink-500 tracking-widest" style={{ fontFamily: 'Orbitron, monospace' }}>
              LOADOUT MODULES
            </div>
            <div className="text-[10px] text-gray-400">Select category to filter active equipment.</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-teal-400 font-bold">TOTAL POWER LEVEL</div>
            <div ref={powerRef} className="text-[28px] font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,224,102,0.6)]">
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
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                activeTab === cat 
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)] border border-purple-400' 
                  : 'bg-black/40 text-gray-400 border border-purple-500/30 hover:border-purple-400 hover:text-white'
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
