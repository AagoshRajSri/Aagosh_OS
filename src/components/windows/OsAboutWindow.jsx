import OSWindow from '../OSWindow';
import { useWindows } from '../../context/WindowContext';

export default function OsAboutWindow() {
  const { devMode, setDevMode, muted, setMuted, showNotif } = useWindows();

  const handleKonamiTip = () => {
    showNotif("HINT: Up Up Down Down Left Right Left Right B A");
  };

  return (
    <OSWindow id="os-about" title="OS_Config.sys" defaultPos={{ x: 220, y: 100 }} width={480}>
      <div className="flex flex-col gap-6">
        <div className="text-center pb-4 border-b border-purple-500/20">
          <div className="text-[20px] font-bold text-pink-500" style={{ fontFamily: 'Orbitron, monospace' }}>AagoshRaj_OS</div>
          <div className="text-[10px] text-gray-400 mt-1">Version 0.1.0-alpha (Cyber_Pop Build)</div>
          <div className="text-[10px] text-purple-400 mt-1">Environment: PRODUCTION</div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[11px] font-bold text-teal-400 tracking-widest">— SYSTEM PREFERENCES</div>
          
          <div className="flex items-center justify-between bg-black/40 p-3 rounded border border-purple-500/30">
            <div>
              <div className="text-[12px] text-gray-200 font-bold">Audio System</div>
              <div className="text-[9px] text-gray-500">Web Audio API OS SFX</div>
            </div>
            <button
              onClick={() => setMuted(!muted)}
              className={`px-4 py-1.5 rounded text-[10px] font-bold border ${muted ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-green-500/20 border-green-500 text-green-400'}`}
            >
              {muted ? 'MUTED' : 'ENABLED'}
            </button>
          </div>

          <div className="flex items-center justify-between bg-black/40 p-3 rounded border border-purple-500/30">
            <div>
              <div className="text-[12px] text-gray-200 font-bold">Developer Mode</div>
              <div className="text-[9px] text-gray-500">Unlocks hidden tools and badges</div>
            </div>
            <button
              onClick={() => setDevMode(!devMode)}
              className={`px-4 py-1.5 rounded text-[10px] font-bold border ${devMode ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-gray-800 border-gray-600 text-gray-400'}`}
            >
              {devMode ? 'ACTIVE' : 'INACTIVE'}
            </button>
          </div>

          <div className="flex items-center justify-between bg-black/40 p-3 rounded border border-purple-500/30">
            <div>
              <div className="text-[12px] text-gray-200 font-bold">Fireworks Protocol</div>
              <div className="text-[9px] text-gray-500">Manual override for particle system</div>
            </div>
            <button
              onClick={handleKonamiTip}
              className="px-4 py-1.5 rounded text-[10px] font-bold border bg-purple-600/20 border-purple-500 text-purple-300 hover:bg-purple-600/40"
            >
              REQUEST
            </button>
          </div>
        </div>

        <div className="text-center pt-4 border-t border-purple-500/20 text-[9px] text-gray-600">
          Built with React, GSAP, and Tailwind CSS.<br/>
          No actual operating systems were harmed in the making of this portfolio.
        </div>
      </div>
    </OSWindow>
  );
}
