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
    gsap.to(fillRef.current, { width: pct + '%', duration: 1.6, ease: 'power2.out', delay: 0.4 });
    if (countRef.current && typeof pct === 'number') {
      const obj = { v: 0 };
      gsap.to(obj, { v: pct, duration: 1.6, ease: 'power2.out', delay: 0.4,
        onUpdate() { if (countRef.current) countRef.current.textContent = Math.floor(obj.v) + '%'; }
      });
    }
  }, [pct]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[11px] font-mono">
        <span className="text-[#aaa]">{label}</span>
        <span ref={countRef} className="text-[#ededed]">{val}</span>
      </div>
      <div className="h-[12px] border border-[#333] overflow-hidden" style={{ background: '#111' }}>
        <div ref={fillRef} className={`gauge-fill ${cls}`} style={{ width: 0 }} />
      </div>
    </div>
  );
}

function SkillTree() {
  const [tooltip, setTooltip] = useState(null);
  return (
    <div className="relative w-full h-[120px] mb-4" style={{ background: '#0d0d0d', borderRadius: 2, border: '1px solid #222' }}>
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {SKILL_NODES.map((node, i) =>
          node.links.map(j => (
            <line key={`${i}-${j}`}
              x1={`${node.x}%`} y1={`${node.y}%`}
              x2={`${SKILL_NODES[j].x}%`} y2={`${SKILL_NODES[j].y}%`}
              stroke="#333" strokeWidth="1"
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
          <div className="w-6 h-6 border border-[#555] bg-[#111] flex items-center justify-center text-[9px] font-mono text-[#aaa] group-hover:bg-[#ededed] group-hover:text-[#111] transition-colors">
            {i + 1}
          </div>
          <span className="text-[9px] text-[#666] mt-1 whitespace-nowrap font-mono">{node.name}</span>
        </div>
      ))}
      {tooltip && (
        <div className="absolute top-1 left-1 bg-[#111] border border-[#444] px-2 py-1 text-[10px] text-[#ededed] font-mono pointer-events-none z-10 shadow-lg">
          {tooltip.name} // PROFICIENT
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
    showNotif('SYS_ADMIN GRANTED — Executing override.');
    showWarning({ msg: 'SYS_OVERRIDE', sub: 'Manual override initiated.\nLogging action to mainframe.' });
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
        <div className="mb-5 text-[12px] text-[#aaa] border-l border-[#444] pl-3 py-1 font-mono bg-[#0D0D0D]">
          {SYSTEM_QUOTE}
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 flex items-center justify-center text-[1.8rem] flex-shrink-0 border border-[#333] bg-[#111]">
            {ABOUT.avatarEmoji}
          </div>
          <div>
            <div className="text-[16px] font-bold text-[#ededed] mb-1 font-mono tracking-tight">
              {ABOUT.developerName}
            </div>
            <div className="text-[11px] text-[#888] font-mono">
              STATUS: <span className="text-[#4CAF50]">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Bio typewriter */}
        <div
          className="mb-6 cursor-text typewriter-cursor border-l-2 border-[#ededed] pl-3 py-1"
          onClick={skipBio}
          title="Click to skip typewriter"
        >
          <p className="text-[13px] leading-relaxed text-[#ccc] font-sans">{bioTyped}</p>
        </div>

        {/* Gauges */}
        <div className="flex flex-col gap-4 mb-6">
          {ABOUT.gauges.map(g => <Gauge key={g.label} {...g} />)}
        </div>

        {/* Skill Tree */}
        <div className="text-[10px] text-[#888] font-bold tracking-widest mb-2 font-mono">— SKILL_TOPOLOGY</div>
        <SkillTree />

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap mb-5">
          <button onClick={runDiag}
            className="bg-[#ededed] text-[#050505] font-bold font-mono text-[11px] px-4 py-2 rounded-sm cursor-pointer hover:bg-white transition-colors"
            aria-label="Run system diagnostic">
            [ RUN_DIAGNOSTIC ]
          </button>
          <button onClick={injectMagic}
            className="bg-transparent border border-[#444] text-[#aaa] font-bold font-mono text-[11px] px-4 py-2 rounded-sm cursor-pointer hover:border-[#888] hover:text-[#ededed] transition-colors"
            aria-label="Inject magic">
            [ OVERRIDE ]
          </button>
        </div>

        {/* Diagnostic terminal */}
        {diagOpen && (
          <div className="mb-4 p-3 text-[11px] text-[#4CAF50] font-mono leading-loose max-h-[160px] overflow-y-auto bg-[#0A0A0A] border border-[#222]">
            {diagLines.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        )}

        {/* ASK AagoshRaj_OS Terminal */}
        <div className="border border-[#222] bg-[#0A0A0A]">
          <div className="px-3 py-1.5 text-[10px] font-bold text-[#888] font-mono border-b border-[#222] bg-[#111]">
            TERMINAL // INPUT_REQUIRED
          </div>
          <div className="p-3 max-h-[120px] overflow-y-auto text-[11px] font-mono text-[#ededed] leading-relaxed">
            {termLog.length === 0 && <div className="text-[#666]">Type "help" for available commands...</div>}
            {termLog.map((l, i) => <div key={i} className={l.startsWith('>') ? 'text-[#888]' : 'text-[#ededed]'}>{l}</div>)}
          </div>
          <div className="flex items-center px-3 py-2 border-t border-[#222] bg-[#0D0D0D]">
            <span className="text-[#666] text-[11px] font-mono mr-2">ROOT$</span>
            <input
              value={typed}
              onChange={e => setTyped(e.target.value)}
              onKeyDown={handleTermInput}
              className="flex-1 bg-transparent outline-none text-[#ededed] text-[11px] font-mono"
              placeholder="_"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </OSWindow>
  );
}
