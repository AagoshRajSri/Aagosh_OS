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
      <div className="flex flex-col items-center justify-center p-6 text-center h-[200px] bg-black/60 rounded border border-purple-500/20 mystery-glitch relative overflow-hidden">
        <div className="text-4xl mb-4 opacity-50 filter drop-shadow-[0_0_10px_#ff6ec7]">👁️</div>
        <div className="text-[12px] font-mono text-purple-300 leading-relaxed">
          {content}
        </div>
        <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay pointer-events-none led-blink" />
      </div>
    </OSWindow>
  );
}
