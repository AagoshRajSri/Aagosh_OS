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
        <div className="text-center pb-4 border-b border-[#333]">
          <div className="text-[20px] font-bold text-[#ededed] font-mono tracking-tight">AagoshRaj_OS</div>
          <div className="text-[10px] text-[#888] mt-1 font-mono">Version 0.2.0-beta (Retro_Minimal Build)</div>
          <div className="text-[10px] text-[#666] mt-1 font-mono">Environment: PRODUCTION</div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[11px] font-bold text-[#888] tracking-widest font-mono">— SYSTEM_PREFERENCES</div>
          
          <div className="flex items-center justify-between bg-[#111] p-3 border border-[#222]">
            <div>
              <div className="text-[12px] text-[#ededed] font-bold font-mono">Audio System</div>
              <div className="text-[9px] text-[#666] font-mono">Web Audio API OS SFX</div>
            </div>
            <button
              onClick={() => setMuted(!muted)}
              className={`px-4 py-1.5 text-[10px] font-bold font-mono border cursor-pointer transition-colors ${muted ? 'bg-[#1A0505] border-[#F44336] text-[#F44336]' : 'bg-[#051A0A] border-[#4CAF50] text-[#4CAF50]'}`}
            >
              {muted ? '[ MUTED ]' : '[ ENABLED ]'}
            </button>
          </div>

          <div className="flex items-center justify-between bg-[#111] p-3 border border-[#222]">
            <div>
              <div className="text-[12px] text-[#ededed] font-bold font-mono">Developer Mode</div>
              <div className="text-[9px] text-[#666] font-mono">Unlocks hidden tools and badges</div>
            </div>
            <button
              onClick={() => setDevMode(!devMode)}
              className={`px-4 py-1.5 text-[10px] font-bold font-mono border cursor-pointer transition-colors ${devMode ? 'bg-[#1A1505] border-[#FF9800] text-[#FF9800]' : 'bg-[#1A1A1A] border-[#444] text-[#888]'}`}
            >
              {devMode ? '[ ACTIVE ]' : '[ INACTIVE ]'}
            </button>
          </div>

          <div className="flex items-center justify-between bg-[#111] p-3 border border-[#222]">
            <div>
              <div className="text-[12px] text-[#ededed] font-bold font-mono">Fireworks Protocol</div>
              <div className="text-[9px] text-[#666] font-mono">Manual override for particle system</div>
            </div>
            <button
              onClick={handleKonamiTip}
              className="px-4 py-1.5 text-[10px] font-bold font-mono border bg-transparent border-[#444] text-[#aaa] hover:text-[#ededed] hover:border-[#888] transition-colors cursor-pointer"
            >
              [ REQUEST ]
            </button>
          </div>
        </div>

        <div className="text-center pt-4 border-t border-[#333] text-[9px] text-[#555] font-mono">
          Built with React, GSAP, and Tailwind CSS.<br/>
          No actual operating systems were harmed in the making of this portfolio.
        </div>
      </div>
    </OSWindow>
  );
}
