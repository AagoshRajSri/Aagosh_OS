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
  const signalColor = signal < 40 ? '#F44336' : signal < 80 ? '#FF9800' : '#4CAF50';

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
        <div className="flex items-center gap-3 mb-6 bg-[#111] p-3 border border-[#333]">
          <div className="text-[10px] text-[#888] font-bold tracking-widest w-24 font-mono">SIGNAL_STRENGTH</div>
          <div className="flex-1 h-2 bg-[#050505] overflow-hidden border border-[#222]">
            <div className="signal-bar h-full transition-all" style={{ width: `${signal}%`, background: signalColor }} />
          </div>
          <div className="text-[10px] font-mono font-bold w-8 text-right" style={{ color: signalColor }}>
            {signal}%
          </div>
        </div>

        {status === 'idle' && (
          <form ref={formRef} onSubmit={handleTransmit} className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-[#aaa] font-bold ml-1 font-mono">[AGENT_CALLSIGN]</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-[#050505] border border-[#333] px-4 py-2 text-[#ededed] text-[12px] font-mono outline-none focus:border-[#888] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-[#aaa] font-bold ml-1 font-mono">[FREQUENCY/EMAIL]</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full bg-[#050505] border border-[#333] px-4 py-2 text-[#ededed] text-[12px] font-mono outline-none focus:border-[#888] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[10px] text-[#aaa] font-bold ml-1 font-mono">[TRANSMISSION_DATA]</label>
              <textarea
                required
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full h-full min-h-[120px] bg-[#050505] border border-[#333] px-4 py-3 text-[#ededed] text-[12px] font-mono outline-none focus:border-[#888] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-[#ededed] text-[#0A0A0A] font-bold font-mono text-[13px] tracking-widest py-3 cursor-pointer hover:bg-white transition-colors"
            >
              [ TRANSMIT ↗ ]
            </button>
          </form>
        )}

        {(status === 'sending' || status === 'log') && (
          <div className="flex-1 flex flex-col justify-center items-center bg-[#050505] border border-[#333] p-6 min-h-[260px]">
            {status === 'sending' && (
              <div className="text-[#ededed] font-bold font-mono text-[14px] tracking-widest flex items-center gap-3">
                <span className="w-4 h-4 border-2 border-[#ededed] border-t-transparent animate-spin" />
                ENCRYPTING...
              </div>
            )}
            {status === 'log' && (
              <div ref={logRef} className="w-full text-left font-mono text-[11px] text-[#4CAF50] space-y-3">
                {logs.map((log, i) => (
                  <div key={i} className="animate-[notif-slide_0.3s_ease-out_forwards]">
                    <span className="text-[#888] mr-2">&gt;</span>{log}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {status === 'success' && (
          <div className="flex-1 flex flex-col justify-center items-center bg-[#050505] border border-[#4CAF50] p-6 text-center min-h-[260px] animate-[win-open_0.4s_ease-out]">
            <div className="text-4xl mb-4">✅</div>
            <div className="text-[#4CAF50] font-bold font-mono text-[16px] mb-2 tracking-widest">TRANSMISSION SECURED</div>
            <div className="text-[#888] font-mono text-[11px] mb-6">Your message has been encrypted and delivered to the core. Expect a response soon.</div>
            <button onClick={() => { setStatus('idle'); setForm({name:'', email:'', message:''}); setLogs([]); }} className="px-6 py-2 border border-[#4CAF50] text-[#4CAF50] text-[11px] font-bold font-mono hover:bg-[#4CAF50] hover:text-[#0A0A0A] transition-colors cursor-pointer">
              [ SEND_ANOTHER ]
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex-1 flex flex-col justify-center items-center bg-[#050505] border border-[#F44336] p-6 text-center min-h-[260px] animate-[shake_0.4s_ease-in-out]">
            <div className="text-4xl mb-4 text-[#F44336]">⚠</div>
            <div className="text-[#F44336] font-bold font-mono text-[16px] mb-2 tracking-widest blink">SIGNAL LOST</div>
            <div className="text-[#888] font-mono text-[11px] mb-6">Failed to establish connection. The transmission was dropped.</div>
            <button onClick={() => { setStatus('idle'); setLogs([]); }} className="px-6 py-2 border border-[#F44336] text-[#F44336] text-[11px] font-bold font-mono hover:bg-[#F44336] hover:text-[#0A0A0A] transition-colors cursor-pointer">
              [ RETRY_CONNECTION ]
            </button>
          </div>
        )}

        {/* Direct Channel */}
        <div className="mt-6 pt-4 border-t border-[#333] text-center">
          <div className="text-[9px] text-[#666] font-bold font-mono tracking-widest mb-3">— DIRECT_CHANNEL —</div>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/aagoshrajsrivastava" target="_blank" rel="noreferrer" className="text-2xl hover:scale-125 transition-transform grayscale hover:grayscale-0">
              🐙
            </a>
            <a href="https://linkedin.com/in/aagoshrajsrivastava" target="_blank" rel="noreferrer" className="text-2xl hover:scale-125 transition-transform grayscale hover:grayscale-0">
              💼
            </a>
          </div>
        </div>
      </div>
    </OSWindow>
  );
}
