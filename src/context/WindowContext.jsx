import { createContext, useContext, useState, useCallback, useRef } from 'react';

const WindowContext = createContext(null);

export const WINDOW_IDS = ['about', 'projects', 'project-detail', 'skills', 'experience', 'contact', 'mystery', 'os-about'];

const EXTENDED_WARNINGS = [
  { msg: 'POST_QUANTUM_ALERT', sub: 'ML-KEM-768 layer operational.\nQuantum adversaries mitigated.' },
  { msg: 'ANOMALY_DETECTED', sub: 'Autonomous architecture active:\n"RAJ-AI" executing tasks without human prompt.' },
  { msg: 'MEMORY_WARNING', sub: 'Processing dense geospatial streams.\nThree.js GPU frustum culling engaged.' },
  { msg: 'SECURITY_SCAN_COMPLETE', sub: 'Zero vulnerabilities found.\nPost-quantum defense stack nominal.' },
  { msg: 'PERSONALITY_OVERFLOW', sub: 'Creativity index exceeded threshold.\nEntity flagged: TOO_AWESOME.' },
  { msg: 'CAFFEINE_CRITICAL', sub: 'Caffeine reserves at MAXIMUM.\nSystem performance: UNBOUNDED.' },
  { msg: 'SKILL_TREE_UPDATE', sub: 'New branch unlocked: Distributed Systems\nXP gained: +2400' },
  { msg: 'UPLINK_DETECTED', sub: 'External observer connected.\nInitiating portfolio boot sequence.' },
  { msg: 'AAGOSHRAJ_OS_UPDATE', sub: 'Version 0.2.0 available.\nChangelog: Added more caffeine.' },
  { msg: 'CURIOSITY_OVERFLOW', sub: 'User curiosity index: 99.8%\nConsider hiring this person immediately.' },
];

export function WindowProvider({ children }) {
  const [openWindows, setOpenWindows] = useState([]);
  const [hiddenWindows, setHiddenWindows] = useState([]);
  const [zMap, setZMap] = useState({});
  const [topZ, setTopZ] = useState(200);
  const [selectedProject, setSelectedProject] = useState(null);
  const [notifications, setNotifications] = useState([]); // array of {id, msg}
  const [warningVisible, setWarningVisible] = useState(false);
  const [warningData, setWarningData] = useState(null);
  const [mysteryCount, setMysteryCount] = useState(0);
  const [devMode, setDevMode] = useState(false);
  const [muted, setMuted] = useState(false);
  const notifIdRef = useRef(0);

  const bringToFront = useCallback((id) => {
    setTopZ(z => {
      const next = z + 1;
      setZMap(m => ({ ...m, [id]: next }));
      return next;
    });
  }, []);

  const openWindow = useCallback((id) => {
    setOpenWindows(prev => prev.includes(id) ? prev : [...prev, id]);
    setHiddenWindows(prev => prev.filter(w => w !== id));
    bringToFront(id);
  }, [bringToFront]);

  const closeWindow = useCallback((id) => {
    setOpenWindows(prev => prev.filter(w => w !== id));
    setHiddenWindows(prev => prev.filter(w => w !== id));
    if (id === 'project-detail') setSelectedProject(null);
  }, []);

  const minimizeWindow = useCallback((id) => {
    setHiddenWindows(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const toggleMinimize = useCallback((id) => {
    setHiddenWindows(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
    bringToFront(id);
  }, [bringToFront]);

  const isOpen    = (id) => openWindows.includes(id);
  const isHidden  = (id) => hiddenWindows.includes(id);
  const isVisible = (id) => isOpen(id) && !isHidden(id);
  const getZ      = (id) => zMap[id] || 100;

  const showNotif = useCallback((msg, duration = 5000) => {
    const id = ++notifIdRef.current;
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, duration);
  }, []);

  const dismissNotif = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const showWarning = useCallback((data) => {
    setWarningData(data);
    setWarningVisible(true);
  }, []);

  const showRandomWarning = useCallback(() => {
    const w = EXTENDED_WARNINGS[Math.floor(Math.random() * EXTENDED_WARNINGS.length)];
    showWarning(w);
  }, [showWarning]);

  const openProjectDetail = useCallback((project) => {
    setSelectedProject(project);
    setOpenWindows(prev => prev.includes('project-detail') ? prev : [...prev, 'project-detail']);
    setHiddenWindows(prev => prev.filter(w => w !== 'project-detail'));
    bringToFront('project-detail');
  }, [bringToFront]);

  const openMystery = useCallback(() => {
    setMysteryCount(c => c + 1);
    openWindow('mystery');
  }, [openWindow]);

  return (
    <WindowContext.Provider value={{
      openWindows, openWindow, closeWindow, minimizeWindow, toggleMinimize,
      isOpen, isHidden, isVisible, getZ, bringToFront,
      selectedProject, openProjectDetail,
      notifications, showNotif, dismissNotif,
      warningVisible, warningData, showWarning, showRandomWarning, setWarningVisible,
      mysteryCount, openMystery,
      devMode, setDevMode,
      muted, setMuted,
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export const useWindows = () => useContext(WindowContext);
