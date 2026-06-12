import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useWindows } from '../context/WindowContext';

const SPEECH_BUBBLES = {
  cat: ['meow.exe', 'Sleeping...', 'Need fish_data', 'Purr_routine()', 'Syntax error?', 'Too many windows!'],
  dog: ['bark.sh', 'Good boy?', 'Fetching data...', 'Woof!', 'Tracing packets...', '*pant* *pant*']
};

export default function Pets() {
  const { openWindows } = useWindows();
  const containerRef = useRef(null);
  const catRef = useRef(null);
  const dogRef = useRef(null);
  
  const [catSpeech, setCatSpeech] = useState(null);
  const [dogSpeech, setDogSpeech] = useState(null);

  useEffect(() => {
    // Random walk pathfinding setup
    const movePet = (ref, isDog) => {
      if (!ref.current) return;
      const x = (Math.random() - 0.5) * (window.innerWidth * 0.7);
      const y = (Math.random() - 0.5) * (window.innerHeight * 0.6);
      
      const tl = gsap.timeline();
      // Flip direction
      const currentX = gsap.getProperty(ref.current, 'x') || 0;
      if (x < currentX) {
        gsap.to(ref.current, { scaleX: -1, duration: 0.2 });
      } else {
        gsap.to(ref.current, { scaleX: 1, duration: 0.2 });
      }
      
      tl.to(ref.current, {
        x, y,
        duration: Math.random() * 4 + 4,
        ease: 'power1.inOut',
        onComplete: () => {
          // Pause and move again
          setTimeout(() => movePet(ref, isDog), Math.random() * 3000 + 2000);
        }
      });
    };

    setTimeout(() => movePet(catRef, false), 1000);
    setTimeout(() => movePet(dogRef, true), 2000);

    return () => {
      gsap.killTweensOf(catRef.current);
      gsap.killTweensOf(dogRef.current);
    };
  }, []);

  // React to too many windows
  useEffect(() => {
    if (openWindows.length >= 4) {
      // Scare behavior: run to corners
      if (catRef.current) gsap.to(catRef.current, { x: -window.innerWidth/2 + 60, y: window.innerHeight/2 - 100, duration: 1.5, ease: 'power2.out' });
      if (dogRef.current) gsap.to(dogRef.current, { x: window.innerWidth/2 - 60, y: window.innerHeight/2 - 100, duration: 1.5, ease: 'power2.out' });
      setCatSpeech('Too many windows!');
      setDogSpeech('*scared*');
      setTimeout(() => { setCatSpeech(null); setDogSpeech(null); }, 3000);
    }
  }, [openWindows.length]);

  const handleInteract = (type) => {
    const isCat = type === 'cat';
    const ref = isCat ? catRef : dogRef;
    const setSpeech = isCat ? setCatSpeech : setDogSpeech;
    const pool = SPEECH_BUBBLES[type];
    
    // Jump animation
    if (ref.current) {
      gsap.timeline()
        .to(ref.current, { scaleY: 0.8, scaleX: 1.2, duration: 0.1 })
        .to(ref.current, { y: '-=40', scaleY: 1.1, scaleX: 0.9, duration: 0.25, ease: 'power2.out' })
        .to(ref.current, { y: '+=40', scaleY: 0.9, scaleX: 1.1, duration: 0.25, ease: 'power2.in' })
        .to(ref.current, { scaleY: 1, scaleX: 1, duration: 0.15, ease: 'bounce.out' });
    }

    setSpeech(pool[Math.floor(Math.random() * pool.length)]);
    setTimeout(() => setSpeech(null), 2500);
  };

  return (
    <div ref={containerRef} className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none" style={{ zIndex: 50 }}>
      {/* CAT */}
      <div ref={catRef} className="absolute pointer-events-auto cursor-pointer" style={{ transform: 'translate(-100px, 0)' }} onClick={() => handleInteract('cat')}>
        {catSpeech && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap speech-pop">
            {catSpeech}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
          </div>
        )}
        <div className="pet-float">
          <img src="/assets/cat.png" alt="Cat" className="w-16 h-16 object-contain filter drop-shadow-[0_4px_12px_rgba(255,110,199,0.5)]"
               style={{ imageRendering: 'pixelated' }} onError={(e) => { e.target.outerHTML = '<div class="text-4xl filter drop-shadow-[0_0_10px_#ff6ec7]">🐱</div>' }} />
        </div>
      </div>

      {/* DOG */}
      <div ref={dogRef} className="absolute pointer-events-auto cursor-pointer" style={{ transform: 'translate(100px, 0)' }} onClick={() => handleInteract('dog')}>
        {dogSpeech && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap speech-pop">
            {dogSpeech}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
          </div>
        )}
        <div className="pet-float" style={{ animationDelay: '-1.2s' }}>
          <img src="/assets/dog.png" alt="Dog" className="w-16 h-16 object-contain filter drop-shadow-[0_4px_12px_rgba(127,255,212,0.5)]"
               style={{ imageRendering: 'pixelated' }} onError={(e) => { e.target.outerHTML = '<div class="text-4xl filter drop-shadow-[0_0_10px_#7fffd4]">🐕</div>' }} />
        </div>
      </div>
    </div>
  );
}
