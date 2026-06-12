import { useState, useEffect } from 'react';
import { WindowProvider } from './context/WindowContext';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';
import MobileLayout from './components/MobileLayout';
import './index.css';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <WindowProvider>
      {/* Custom Cursor is injected via CSS/Hook inside OS elements, but we keep the wrapper clean */}
      {!booted ? (
        <BootScreen onComplete={() => setBooted(true)} isMobile={isMobile} />
      ) : isMobile ? (
        <MobileLayout />
      ) : (
        <Desktop />
      )}
    </WindowProvider>
  );
}
