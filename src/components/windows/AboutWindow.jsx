import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import OSWindow from '../OSWindow';
import { useWindows } from '../../context/WindowContext';
import { DIAG_LINES, ABOUT } from '../../data';

const SYSTEM_QUOTE = ABOUT.systemQuotes[Math.floor(Math.random() * ABOUT.systemQuotes.length)];
const SKILL_NODES = [
  { name: 'Node.js', x: 50, y: 20, links: [1, 2] },
  { name: 'React', x: 20, y: 50, links: [3] },
  { name: 'PostgreSQL', x: 80, y: 50, links: [4] },
  { name: 'Docker', x: 10, y: 80, links: [] },
  { name: 'Redis', x: 90, y: 80, links: [] },
];

function Gauge({ label, val, pct, cls, valCls }) {
  const fillRef = useRef(null);
  const countRef = useRef(null);
  useEffect(() => {
    gsap.to(fillRef.current, { width: pct + '%', duration: 1.6, ease: 'back.out(1.2)', delay: 0.4 });
    if (countRef.current && typeof pct === 'number') {
      const obj = { v: 0 };
      gsap.to(obj, { v: pct, duration: 1.6, ease: 'power2.out', delay: 0.4,
        onUpdate() { if (countRef.current) countRef.current.textContent = Math.floor(obj.v) + '%'; }
      });
    }
  }, [pct]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[11px]">
        <span className="text-teal-300">{label}</span>
        <span ref={countRef} className={valCls}>{val}</span>
      </div>
      <div className="h-[18px] rounded border border-purple-700 overflow-hidden" style={{ background: '#1e1a2e' }}>
        <div ref={fillRef} className={`gauge-fill ${cls}`} style={{ width: 0 }} />
      </div>
    </div>
  );
}

function SkillTree() {
  const [tooltip, setTooltip] = useState(null);
  return (
    <div className="relative w-full h-[120px] mb-4" style={{ background: 'rgba(10,8,20,0.6)', borderRadius: 8, border: '1px solid rgba(139,92,246,0.2)' }}>
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {SKILL_NODES.map((node, i) =>
          node.links.map(j => (
            <line key={`${i}-${j}`}
              x1={`${node.x}%`} y1={`${node.y}%`}
              x2={`${SKILL_NODES[j].x}%`} y2={`${SKILL_NODES[j].y}%`}
              stroke="rgba(139,92,246,0.4)" strokeWidth="1.5"
              style={{ filter: 'drop-shadow(0 0 4px rgba(139,92,246,0.6))' }}
            />
          ))
        )}
      </svg>
      {SKILL_NODES.map((node, i) => (
        <div
          key={i}
          className="absolute flex flex-col items-center cursor-pointer group"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)', zIndex: 1 }}
          onMouseEnter={() => setTooltip(node)}
          onMouseLeave={() => setTooltip(null)}
        >
          <div className="w-7 h-7 rounded-full border-2 border-purple-500 flex items-center justify-center text-[9px] font-bold"
            style={{ background: 'rgba(139,92,246,0.3)', boxShadow: '0 0 8px rgba(139,92,246,0.5)' }}>
            {i + 1}
          </div>
          <span className="text-[7px] text-purple-300 mt-0.5 whitespace-nowrap">{node.name}</span>
        </div>
      ))}
      {tooltip && (
        <div className="absolute top-1 left-1 bg-black/80 border border-purple-500 rounded px-2 py-1 text-[10px] text-purple-300 pointer-events-none z-10">
          {tooltip.name} — PROFICIENT
        </div>
      )}
    </div>
  );
}

export default function AboutWindow() {
  const { showNotif, showWarning } = useWindows();
  const [diagLines, setDiagLines] = useState([]);
  const [diagOpen, setDiagOpen]   = useState(false);
  const [typed, setTyped]         = useState('');
  const [termLog, setTermLog]     = useState([]);
  const [bioTyped, setBioTyped]   = useState('');
  const bodyRef = useRef(null);
  const bioSkipped = useRef(false);

  // Typewriter bio effect
  useEffect(() => {
    const text = ABOUT.shortBio;
    let i = 0;
    if (bioSkipped.current) { setBioTyped(text); return; }
    const id = setInterval(() => {
      i++;
      setBioTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, []);

  const skipBio = () => { bioSkipped.current = true; setBioTyped(ABOUT.shortBio); };

  const runDiag = () => {
    setDiagOpen(true);
    setDiagLines([]);
    DIAG_LINES.forEach((line, i) => {
      setTimeout(() => {
        setDiagLines(p => [...p, line]);
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }, i * 240);
    });
  };

  const injectMagic = () => {
    document.body.classList.remove('glitch-body');
    void document.body.offsetWidth;
    document.body.classList.add('glitch-body');
    setTimeout(() => document.body.classList.remove('glitch-body'), 1600);
    showNotif('✨ MAGIC INJECTED — Reality destabilized momentarily.');
    showWarning({ msg: 'MAGIC_OVERFLOW', sub: 'Too much magic detected.\nSystem stability: 73%' });
  };

  const handleTermInput = (e) => {
    if (e.key !== 'Enter') return;
    const input = typed.trim().toLowerCase();
    setTyped('');
    let response;
    const responses = ABOUT.terminalResponses;
    if (responses[input]) {
      response = typeof responses[input] === 'function' ? responses[input](input) : responses[input];
    } else {
      response = responses.default(input);
    }
    setTermLog(p => [...p, `> ${typed}`, response]);
  };

  return (
    <OSWindow id="about" title={`ABOUT_ME.exe — ${ABOUT.developerName}`} defaultPos={{ x: 200, y: 80 }} width={580}>
      <div ref={bodyRef}>
        {/* System Quote */}
        <div className="mb-4 text-[11px] text-purple-300 italic border-l-2 border-purple-500 pl-3 py-1"
          style={{ background: 'rgba(139,92,246,0.06)' }}>
          {SYSTEM_QUOTE}
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-[2rem] flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(255,110,199,0.2))', border: '2px solid rgba(139,92,246,0.5)', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}>
            {ABOUT.avatarEmoji}
          </div>
          <div>
            <div className="text-[15px] font-bold text-pink-400 mb-0.5" style={{ fontFamily: 'Orbitron, monospace' }}>
              {ABOUT.developerName}
            </div>
            <div className="text-[11px] text-purple-300">
              PERSONALITY SCANNER: <span className="blink text-teal-300">ACTIVE</span>
            </div>
            <div className="text-[10px] text-gray-500">Scanning entity for creative capacity and technical anomalies...</div>
          </div>
        </div>

        {/* Bio typewriter */}
        <div
          className="rounded-md mb-5 px-4 py-3 cursor-text typewriter-cursor"
          style={{ background: 'rgba(30,26,46,0.8)', borderLeft: '3px solid #8b5cf6' }}
          onClick={skipBio}
          title="Click to skip typewriter"
        >
          <p className="text-[12px] leading-relaxed text-gray-300">{bioTyped}</p>
        </div>

        {/* Gauges */}
        <div className="flex flex-col gap-3 mb-5">
          {ABOUT.gauges.map(g => <Gauge key={g.label} {...g} />)}
        </div>

        {/* Skill Tree */}
        <div className="text-[10px] text-teal-400 font-bold tracking-widest mb-2">— SKILL TREE</div>
        <SkillTree />

        {/* Action buttons */}
        <div className="flex gap-3 flex-wrap mb-4">
          <button onClick={runDiag}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-[11px] px-5 py-2.5 rounded-lg border-0 cursor-pointer hover:brightness-110 transition-all shadow-lg"
            aria-label="Run system diagnostic">
            ⚡ RUN DIAGNOSTIC
          </button>
          <button onClick={injectMagic}
            className="font-bold text-[11px] px-5 py-2.5 rounded-lg cursor-pointer transition-all"
            style={{ background: 'rgba(42,36,64,0.8)', border: '2px solid rgba(139,92,246,0.5)', color: '#e8e0ff' }}
            aria-label="Inject magic">
            ✨ INJECT MAGIC
          </button>
        </div>

        {/* Diagnostic terminal */}
        {diagOpen && (
          <div className="mb-4 rounded-md p-3 text-[11px] text-green-400 leading-loose max-h-[160px] overflow-y-auto"
            style={{ background: '#000', border: '1px solid #39ff82' }}>
            {diagLines.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        )}

        {/* ASK AagoshRaj_OS Terminal */}
        <div className="rounded-md overflow-hidden" style={{ border: '1px solid rgba(139,92,246,0.4)', background: '#000' }}>
          <div className="px-3 py-1.5 text-[10px] font-bold text-purple-400" style={{ borderBottom: '1px solid rgba(139,92,246,0.2)' }}>
            ASK AagoshRaj_OS:
          </div>
          <div className="p-2 max-h-[100px] overflow-y-auto text-[10px] text-green-400 leading-loose">
            {termLog.length === 0 && <div className="text-gray-600">Type "help" for available commands...</div>}
            {termLog.map((l, i) => <div key={i} className={l.startsWith('>') ? 'text-purple-300' : 'text-green-400'}>{l}</div>)}
          </div>
          <div className="flex items-center px-3 py-1.5" style={{ borderTop: '1px solid rgba(139,92,246,0.2)' }}>
            <span className="text-purple-400 text-[10px] mr-2">AagoshRaj_OS$</span>
            <input
              value={typed}
              onChange={e => setTyped(e.target.value)}
              onKeyDown={handleTermInput}
              className="flex-1 bg-transparent outline-none text-green-400 text-[11px] font-mono"
              placeholder="enter command..."
              aria-label="AagoshRaj_OS terminal input"
            />
          </div>
        </div>
      </div>
    </OSWindow>
  );
}
