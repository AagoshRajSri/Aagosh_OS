import OSWindow from '../OSWindow';
import { useWindows } from '../../context/WindowContext';

export default function MysteryWindow() {
  const { mysteryCount } = useWindows();

  let content;
  if (mysteryCount === 1) {
    content = "You found a strange executable. It seems broken.";
  } else if (mysteryCount === 2) {
    content = "Why did you open this again? There's nothing here.";
  } else if (mysteryCount === 3) {
    content = "You're persistent. I like that. But seriously, it's just a placeholder.";
  } else if (mysteryCount === 4) {
    content = "Okay, you win. The secret password is 'AagoshRaj'. Type it during boot next time.";
  } else {
    content = "...";
  }

  return (
    <OSWindow id="mystery" title="???.exe" defaultPos={{ x: 300, y: 150 }} width={400}>
      <div className="flex flex-col items-center justify-center p-6 text-center h-[200px] bg-[#111] rounded-sm border border-[#333] mystery-glitch relative overflow-hidden">
        <div className="text-4xl mb-4 grayscale opacity-60">👁️</div>
        <div className="text-[12px] font-mono text-[#ededed] leading-relaxed">
          {content}
        </div>
        <div className="absolute inset-0 bg-[#F44336]/5 pointer-events-none led-blink mix-blend-screen" />
      </div>
    </OSWindow>
  );
}
