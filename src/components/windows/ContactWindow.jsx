import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import OSWindow from '../OSWindow';
import { useWindows } from '../../context/WindowContext';
import { useAudio } from '../../hooks/useOSEffects';

export default function ContactWindow() {
  const { showNotif } = useWindows();
  const { playBlip, playSuccess } = useAudio();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | log | success | error
  const [logs, setLogs] = useState([]);
  const formRef = useRef(null);
  const logRef = useRef(null);

  const getSignalStrength = () => {
    let score = 0;
    if (form.name.length > 2) score += 30;
    if (form.email.includes('@') && form.email.length > 5) score += 30;
    if (form.message.length > 10) score += 40;
    return score;
  };

  const signal = getSignalStrength();
  const signalColor = signal < 40 ? '#ff4466' : signal < 80 ? '#ffe066' : '#39ff82';

  const handleTransmit = async (e) => {
    e.preventDefault();
    if (signal < 100) {
      showNotif('⚠ SIGNAL TOO WEAK. Fill all fields to transmit.', 3000);
      playBlip();
      return;
    }

    setStatus('sending');
    playBlip();

    const sequence = [
      'Encoding message payload... [OK]',
      'Establishing quantum uplink... [OK]',
      'Routing through secure nodes... [OK]',
    ];

    try {
      setStatus('log');
      for (let i = 0; i < sequence.length; i++) {
        await new Promise(r => setTimeout(r, 600));
        setLogs(prev => [...prev, sequence[i]]);
        playBlip();
      }
      await new Promise(r => setTimeout(r, 800));

      // Sending using FormSubmit API direct to email
      const response = await fetch("https://formsubmit.co/ajax/aagosh0000@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New AagoshRaj_OS Transmission from ${form.name}`
        })
      });

      if (!response.ok) throw new Error("Transmission failed");

      setLogs(prev => [...prev, 'Message delivered to AagoshRaj_OS HQ [SUCCESS]']);
      playSuccess();
      setTimeout(() => setStatus('success'), 1500);

    } catch (err) {
      console.error(err);
      setStatus('error');
      playBlip();
    }
  };

  return (
    <OSWindow id="contact" title="Contact.exe — SECURE UPLINK TERMINAL" defaultPos={{ x: 260, y: 120 }} width={600}>
      <div className="flex flex-col h-full relative">
        {/* Signal Indicator */}
        <div className="flex items-center gap-3 mb-6 bg-black/40 p-3 rounded-lg border border-purple-500/30">
          <div className="text-[10px] text-purple-300 font-bold tracking-widest w-24">SIGNAL_STRENGTH</div>
          <div className="flex-1 h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
            <div className="signal-bar h-full" style={{ width: `${signal}%`, background: signalColor }} />
          </div>
          <div className="text-[10px] font-mono font-bold w-8 text-right" style={{ color: signalColor }}>
            {signal}%
          </div>
        </div>

        {status === 'idle' && (
          <form ref={formRef} onSubmit={handleTransmit} className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-teal-500 font-bold ml-1">[AGENT CALLSIGN]</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-black/80 border border-purple-500/50 rounded px-4 py-2.5 text-green-400 text-[12px] font-mono outline-none focus:border-pink-500 focus:bg-black transition-colors shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-teal-500 font-bold ml-1">[FREQUENCY / EMAIL]</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full bg-black/80 border border-purple-500/50 rounded px-4 py-2.5 text-green-400 text-[12px] font-mono outline-none focus:border-pink-500 focus:bg-black transition-colors shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[10px] text-teal-500 font-bold ml-1">[TRANSMISSION]</label>
              <textarea
                required
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full h-full min-h-[120px] bg-black/80 border border-purple-500/50 rounded px-4 py-3 text-green-400 text-[12px] font-mono outline-none focus:border-pink-500 focus:bg-black transition-colors resize-none shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-[13px] tracking-widest py-3.5 rounded-lg border-0 cursor-pointer hover:brightness-110 shadow-[0_4px_15px_rgba(255,110,199,0.3)] transition-all active:translate-y-1 active:shadow-none"
            >
              TRANSMIT ↗
            </button>
          </form>
        )}

        {(status === 'sending' || status === 'log') && (
          <div className="flex-1 flex flex-col justify-center items-center bg-black/80 rounded-lg border border-purple-500/30 p-6 min-h-[260px]">
            {status === 'sending' && (
              <div className="text-pink-500 font-bold text-[14px] tracking-widest flex items-center gap-3">
                <span className="w-4 h-4 rounded-full border-2 border-pink-500 border-t-transparent animate-spin" />
                ENCRYPTING...
              </div>
            )}
            {status === 'log' && (
              <div ref={logRef} className="w-full text-left font-mono text-[11px] text-green-400 space-y-3">
                {logs.map((log, i) => (
                  <div key={i} className="animate-[notif-slide_0.3s_ease-out_forwards]">
                    <span className="text-purple-400 mr-2">&gt;</span>{log}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {status === 'success' && (
          <div className="flex-1 flex flex-col justify-center items-center bg-black/80 rounded-lg border border-green-500/50 p-6 text-center min-h-[260px] animate-[win-open_0.4s_ease-out]">
            <div className="text-4xl mb-4">✅</div>
            <div className="text-green-400 font-bold text-[16px] mb-2 tracking-widest">TRANSMISSION SECURED</div>
            <div className="text-gray-400 text-[11px] mb-6">Your message has been encrypted and delivered to the core. Expect a response soon.</div>
            <button onClick={() => { setStatus('idle'); setForm({name:'', email:'', message:''}); setLogs([]); }} className="px-6 py-2 rounded border border-green-500 text-green-400 text-[11px] font-bold hover:bg-green-500/20 transition-colors cursor-pointer">
              SEND ANOTHER
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex-1 flex flex-col justify-center items-center bg-black/80 rounded-lg border border-red-500/50 p-6 text-center min-h-[260px] animate-[shake_0.4s_ease-in-out]">
            <div className="text-4xl mb-4 text-red-500">⚠</div>
            <div className="text-red-500 font-bold text-[16px] mb-2 tracking-widest blink">SIGNAL LOST</div>
            <div className="text-gray-400 text-[11px] mb-6">Failed to establish connection. The transmission was dropped.</div>
            <button onClick={() => { setStatus('idle'); setLogs([]); }} className="px-6 py-2 rounded border border-red-500 text-red-500 text-[11px] font-bold hover:bg-red-500/20 transition-colors cursor-pointer">
              RETRY CONNECTION
            </button>
          </div>
        )}

        {/* Direct Channel */}
        <div className="mt-6 pt-4 border-t border-purple-500/20 text-center">
          <div className="text-[9px] text-gray-500 font-bold tracking-widest mb-3">— DIRECT CHANNEL —</div>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/aagoshrajsrivastava" target="_blank" rel="noreferrer" className="text-2xl hover:scale-125 transition-transform hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ color: '#e8e0ff' }}>
              🐙
            </a>
            <a href="https://linkedin.com/in/aagoshrajsrivastava" target="_blank" rel="noreferrer" className="text-2xl hover:scale-125 transition-transform hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" style={{ color: '#3b82f6' }}>
              💼
            </a>
          </div>
        </div>
      </div>
    </OSWindow>
  );
}
