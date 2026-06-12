import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom crosshair cursor with fading dot trail (Removed to fix flickering)
 */
export function useCustomCursor() {
  // Empty, CSS now handles cursor to prevent lag/flicker
}

/**
 * Web Audio API SFX generator — no external files
 */
export function useAudio() {
  const ctxRef = useRef(null);
  const mutedRef = useRef(false);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const playBlip = useCallback(() => {
    if (mutedRef.current) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(); osc.stop(ctx.currentTime + 0.15);
    } catch (_) {}
  }, [getCtx]);

  const playOpen = useCallback(() => {
    if (mutedRef.current) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(); osc.stop(ctx.currentTime + 0.2);
    } catch (_) {}
  }, [getCtx]);

  const playClose = useCallback(() => {
    if (mutedRef.current) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start(); osc.stop(ctx.currentTime + 0.22);
    } catch (_) {}
  }, [getCtx]);

  const playSuccess = useCallback(() => {
    if (mutedRef.current) return;
    try {
      const ctx = getCtx();
      [523, 659, 784, 1047].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        const t = ctx.currentTime + i * 0.12;
        gain.gain.setValueAtTime(0.07, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.start(t); osc.stop(t + 0.3);
      });
    } catch (_) {}
  }, [getCtx]);

  const setMuted = useCallback((v) => { mutedRef.current = v; }, []);

  return { playBlip, playOpen, playClose, playSuccess, setMuted, mutedRef };
}

/**
 * Page Visibility API — pause animations when tab hidden
 */
export function usePageVisibility(onHide, onShow) {
  useEffect(() => {
    const handler = () => {
      if (document.hidden) onHide?.();
      else onShow?.();
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [onHide, onShow]);
}

/**
 * Konami code detector
 */
export function useKonami(callback) {
  const seq = useRef([]);
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  useEffect(() => {
    const handler = (e) => {
      seq.current.push(e.key);
      if (seq.current.length > KONAMI.length) seq.current.shift();
      if (seq.current.join(',') === KONAMI.join(',')) {
        callback();
        seq.current = [];
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
}

/**
 * Fireworks burst for Konami
 */
export function triggerFireworks() {
  const colors = ['#ff6ec7','#8b5cf6','#7fffd4','#ffe066','#39ff82','#ff4466'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'firework-particle';
      const size = Math.random() * 10 + 4;
      p.style.cssText = `
        width:${size}px;height:${size}px;
        left:${Math.random()*100}vw;top:${Math.random()*100}vh;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        animation-duration:${0.5 + Math.random()*0.8}s;
        animation-delay:${i*0.02}s;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 2000);
    }, i * 20);
  }
}
