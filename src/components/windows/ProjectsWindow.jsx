import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import OSWindow from '../OSWindow';
import { PROJECTS } from '../../data';
import { useWindows } from '../../context/WindowContext';

const MATRIX_CHARS = '01█▓▒░#@%&*ABCDEFabcdef';

const STATUS_CONFIG = {
  active:      { color: '#4CAF50', label: 'ACTIVE',      dot: 'led-blink' },
  'in-progress': { color: '#FF9800', label: 'WIP',        dot: 'led-blink' },
  completed:   { color: '#888888', label: 'COMPLETE',    dot: '' },
};

function StatusLed({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.active;
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`w-2 h-2 rounded-full inline-block ${cfg.dot}`}
        style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
      />
      <span style={{ color: cfg.color }} className="text-[10px] font-bold font-mono">{cfg.label}</span>
    </span>
  );
}

function ProjectCard({ project, onClick }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / 80;
    const dy = (e.clientY - cy) / 80;
    gsap.to(cardRef.current, { rotateX: -dy * 8, rotateY: dx * 8, duration: 0.2 });
  };
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
  };

  const isUnderConstruction = project.id === 'raj-ai';

  return (
    <div
      ref={cardRef}
      onClick={() => onClick(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-sm p-4 cursor-pointer transition-colors relative overflow-hidden bg-[#111] hover:bg-[#151515] border border-[#222] hover:border-[#444]"
      style={{ transformStyle: 'preserve-3d' }}
      role="button"
      tabIndex={0}
      aria-label={`Open project ${project.name}`}
      onKeyDown={e => e.key === 'Enter' && onClick(project)}
    >
      {/* Classified / WIP stamp */}
      {isUnderConstruction ? (
        <div className="absolute top-2 right-2 text-[8px] font-bold font-mono px-2 py-0.5 rotate-12 border-[1.5px] border-[#FF9800] text-[#FF9800] rounded-sm opacity-80">
          WIP
        </div>
      ) : (
        <div className="absolute top-2 right-2 text-[8px] font-bold font-mono px-2 py-0.5 rotate-12 border-[1.5px] border-[#F44336] text-[#F44336] rounded-sm opacity-80">
          CLASSIFIED
        </div>
      )}
      <div className="text-[11px] font-bold font-mono mb-1 text-[#ededed]">{project.filename}</div>
      <div className="mb-2"><StatusLed status={project.status} /></div>
      <div className="text-[10px] mb-3 text-[#666] font-mono">
        CLEARANCE LEVEL {project.clearance} — {isUnderConstruction ? 'RESTRICTED' : 'ENCRYPTED'}
      </div>
      <div className="text-3xl text-center my-2 grayscale opacity-80">
        {isUnderConstruction ? '🚧' : '🔒'}
      </div>
      <div className="text-[10px] text-center text-[#888] font-mono">
        {isUnderConstruction ? '[ UNDER CONSTRUCTION ]' : '[ CLICK TO DECRYPT ]'}
      </div>
    </div>
  );
}

function ProjectDetail({ project }) {
  const [phase, setPhase] = useState('locked'); // locked | decrypting | revealed
  const [matrix, setMatrix] = useState('');
  const intervalRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (project.id === 'raj-ai') return;
    intervalRef.current = setInterval(() => {
      setMatrix(Array.from({ length: 120 }, () =>
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      ).join(''));
    }, 60);
    return () => clearInterval(intervalRef.current);
  }, [project.id]);

  const decrypt = () => {
    if (phase !== 'locked') return;
    setPhase('decrypting');
    let count = 0;
    const fast = setInterval(() => {
      count++;
      setMatrix(Array.from({ length: 120 }, () =>
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      ).join(''));
      if (count > 25) {
        clearInterval(fast);
        clearInterval(intervalRef.current);
        if (cardRef.current) {
          gsap.to(cardRef.current, {
            rotateY: 90, duration: 0.35, ease: 'power2.in',
            onComplete: () => {
              setPhase('revealed');
              gsap.fromTo(cardRef.current,
                { rotateY: -90 },
                { rotateY: 0, duration: 0.35, ease: 'power2.out' }
              );
            }
          });
        } else {
          setPhase('revealed');
        }
      }
    }, 45);
  };

  if (project.id === 'raj-ai') {
    return (
      <div ref={cardRef} className="text-center py-4">
        <div className="text-[20px] font-bold text-[#FF9800] font-mono tracking-tight mb-2">
          🚧 {project.name}
        </div>
        <div className="text-[11px] font-bold font-mono text-[#888] mb-4">
          STATUS: UNDER CONSTRUCTION
        </div>
        <div className="text-[12px] leading-relaxed mb-6 max-w-md mx-auto text-[#aaa] font-sans p-4 border border-[#222] bg-[#0A0A0A] rounded-sm text-left">
          <div className="font-mono text-[10px] text-[#666] mb-2">// PROJECT OVERVIEW</div>
          {project.desc}
        </div>
        <div className="flex justify-center gap-2">
          <button disabled className="font-bold font-mono text-[11px] px-5 py-2 rounded-sm bg-[#222] text-[#666] border border-[#333] cursor-not-allowed">
            [ DECRYPTION LOCKED ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={cardRef} style={{ transformStyle: 'preserve-3d', minHeight: 200 }}>
      {phase !== 'revealed' ? (
        <div className="text-center">
          <div className="text-[11px] mb-2 font-mono text-[#F44336]">
            ⚠ ENCRYPTED ARCHIVE — LEVEL {project.clearance} CLEARANCE
          </div>
          <div className="text-[10px] h-[80px] overflow-hidden leading-relaxed mb-4 break-all opacity-60 text-[#4CAF50] font-mono bg-[#050505] p-2 border border-[#222]">
            {matrix}
          </div>
          <button
            onClick={decrypt}
            disabled={phase === 'decrypting'}
            className="font-bold text-[12px] font-mono px-7 py-3 rounded-sm cursor-pointer hover:bg-white bg-[#ededed] text-[#0A0A0A] border border-transparent transition-colors"
            aria-label={`Decrypt ${project.name}`}
          >
            {phase === 'decrypting' ? '⏳ DECRYPTING...' : '🔓 DECRYPT ARCHIVE'}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="text-[20px] font-bold text-[#ededed] font-mono tracking-tight">
              {project.name}
            </div>
            <StatusLed status={project.status} />
          </div>
          <p className="text-[12px] leading-relaxed mb-4 text-[#aaa] font-sans">{project.desc}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(t => (
              <span key={t} className="text-[10px] px-3 py-0.5 rounded-sm font-bold bg-[#1A1A1A] text-[#888] border border-[#333] font-mono">
                {t}
              </span>
            ))}
          </div>
          <div className="rounded-sm p-3 mb-4 bg-[#0A0A0A] border border-[#222]">
            {Object.entries(project.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between text-[11px] mb-1.5 font-mono">
                <span className="text-[#666]">{k}:</span>
                <span className="text-[#ccc]">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.open(project.demo, '_blank')}
              className="font-bold font-mono text-[11px] px-5 py-2 rounded-sm cursor-pointer hover:bg-white transition-colors bg-[#ededed] text-[#0A0A0A]">
              [ VIEW_DEMO ↗ ]
            </button>
            <button onClick={() => window.open(project.source, '_blank')}
              className="font-bold font-mono text-[11px] px-5 py-2 rounded-sm cursor-pointer transition-colors bg-transparent border border-[#444] text-[#aaa] hover:text-[#ededed] hover:border-[#888]">
              [ SOURCE_CODE ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsWindow() {
  const { openProjectDetail, isOpen, selectedProject } = useWindows();

  return (
    <>
      <OSWindow id="projects" title="Projects.sys — CLASSIFIED MISSION FILES" defaultPos={{ x: 160, y: 60 }} width={700}>
        <div className="grid grid-cols-2 gap-4">
          {PROJECTS.map(p => (
            <ProjectCard key={p.id} project={p} onClick={openProjectDetail} />
          ))}
        </div>
      </OSWindow>

      {isOpen('project-detail') && selectedProject && (
        <OSWindow
          id="project-detail"
          title={`${selectedProject.filename} — DECRYPTION PORTAL`}
          defaultPos={{ x: 240, y: 110 }}
          width={640}
        >
          <ProjectDetail
            key={selectedProject.id}
            project={selectedProject}
          />
        </OSWindow>
      )}
    </>
  );
}
