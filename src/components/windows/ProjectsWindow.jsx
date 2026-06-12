import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import OSWindow from '../OSWindow';
import { PROJECTS } from '../../data';

const MATRIX_CHARS = '01█▓▒░#@%&*ABCDEFabcdef';

const STATUS_CONFIG = {
  active:      { color: '#39ff82', label: 'ACTIVE',      dot: 'led-blink' },
  'in-progress': { color: '#ffe066', label: 'IN-PROGRESS', dot: 'led-blink' },
  completed:   { color: '#8b5cf6', label: 'COMPLETE',    dot: '' },
};

function StatusLed({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.active;
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`w-2 h-2 rounded-full inline-block ${cfg.dot}`}
        style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
      />
      <span style={{ color: cfg.color }} className="text-[10px] font-bold">{cfg.label}</span>
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

  return (
    <div
      ref={cardRef}
      onClick={() => onClick(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-xl p-4 cursor-pointer transition-all relative overflow-hidden"
      style={{
        background: 'rgba(30,26,46,0.7)',
        border: '1px solid rgba(139,92,246,0.35)',
        backdropFilter: 'blur(8px)',
        transformStyle: 'preserve-3d',
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open project ${project.name}`}
      onKeyDown={e => e.key === 'Enter' && onClick(project)}
    >
      {/* Classified stamp */}
      <div className="absolute top-2 right-2 text-[8px] font-bold px-2 py-0.5 rotate-12"
        style={{ border: '1.5px solid #ff4466', color: '#ff4466', borderRadius: 3, opacity: 0.8 }}>
        CLASSIFIED
      </div>
      <div className="text-[11px] font-bold mb-1" style={{ color: '#7fffd4' }}>{project.filename}</div>
      <div className="mb-2"><StatusLed status={project.status} /></div>
      <div className="text-[10px] mb-3" style={{ color: '#9580c0' }}>
        CLEARANCE LEVEL {project.clearance} — ENCRYPTED
      </div>
      <div className="text-3xl text-center my-2">🔒</div>
      <div className="text-[10px] text-center" style={{ color: '#ff6ec7' }}>[ CLICK TO DECRYPT ]</div>
    </div>
  );
}

function ProjectDetail({ project, onClose }) {
  const [phase, setPhase] = useState('locked'); // locked | decrypting | revealed
  const [matrix, setMatrix] = useState('');
  const intervalRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMatrix(Array.from({ length: 120 }, () =>
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      ).join(''));
    }, 60);
    return () => clearInterval(intervalRef.current);
  }, []);

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
        // Card flip to reveal
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

  return (
    <div ref={cardRef} style={{ transformStyle: 'preserve-3d', minHeight: 200 }}>
      {phase !== 'revealed' ? (
        <div className="text-center">
          <div className="text-[11px] mb-2" style={{ color: '#ff6ec7' }}>
            ⚠ ENCRYPTED ARCHIVE — LEVEL {project.clearance} CLEARANCE
          </div>
          <div className="text-[10px] h-[80px] overflow-hidden leading-relaxed mb-4 break-all opacity-60"
            style={{ color: '#39ff82' }}>
            {matrix}
          </div>
          <button
            onClick={decrypt}
            disabled={phase === 'decrypting'}
            className="font-bold text-[12px] px-7 py-3 rounded-lg cursor-pointer hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #00e5c8, #7fffd4)', color: '#000', boxShadow: '0 4px 0 #007755' }}
            aria-label={`Decrypt ${project.name}`}
          >
            {phase === 'decrypting' ? '⏳ DECRYPTING...' : '🔓 DECRYPT ARCHIVE'}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="text-[20px] font-bold" style={{ color: '#ff6ec7', fontFamily: 'Orbitron, monospace' }}>
              {project.name}
            </div>
            <StatusLed status={project.status} />
          </div>
          <p className="text-[12px] leading-relaxed mb-4" style={{ color: '#c8bfe8' }}>{project.desc}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(t => (
              <span key={t} className="text-[10px] px-3 py-0.5 rounded-full font-bold"
                style={{ background: 'rgba(139,92,246,0.3)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.5)' }}>
                {t}
              </span>
            ))}
          </div>
          <div className="rounded-lg p-3 mb-4" style={{ background: 'rgba(20,15,40,0.8)', border: '1px solid rgba(139,92,246,0.2)' }}>
            {Object.entries(project.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between text-[11px] mb-1.5">
                <span style={{ color: '#9580c0' }}>{k}:</span>
                <span style={{ color: '#7fffd4' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => window.open(project.demo, '_blank')}
              className="font-bold text-[11px] px-5 py-2 rounded-lg cursor-pointer hover:brightness-110 transition-all"
              style={{ background: '#ff6ec7', color: '#000', boxShadow: '0 3px 0 #b0006a' }}>
              🚀 VIEW DEMO ↗
            </button>
            <button onClick={() => window.open(project.source, '_blank')}
              className="font-bold text-[11px] px-5 py-2 rounded-lg cursor-pointer transition-all"
              style={{ background: 'transparent', border: '2px solid #7fffd4', color: '#7fffd4' }}>
              &lt;&gt; SOURCE CODE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsWindow() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <OSWindow id="projects" title="Projects.sys — CLASSIFIED MISSION FILES" defaultPos={{ x: 160, y: 60 }} width={700}>
        <div className="grid grid-cols-2 gap-4">
          {PROJECTS.map(p => (
            <ProjectCard key={p.id} project={p} onClick={setActiveProject} />
          ))}
        </div>
      </OSWindow>

      {activeProject && (
        <OSWindow
          id="project-detail"
          title={`${activeProject.filename} — DECRYPTION PORTAL`}
          defaultPos={{ x: 240, y: 110 }}
          width={640}
        >
          <ProjectDetail
            key={activeProject.id}
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        </OSWindow>
      )}
    </>
  );
}
