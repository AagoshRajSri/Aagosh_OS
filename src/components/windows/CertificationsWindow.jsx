import OSWindow from '../OSWindow';
import javaCert from '../../assets/JavaCertificate.pdf';
import mongodbCert from '../../assets/MongoDB Certificate.pdf';

const CERTS = [
  { 
    id: 1, 
    label: 'JavaCertificate.pdf', 
    issuer: 'Oracle', 
    date: '2026', 
    path: javaCert,
    icon: '☕'
  },
  { 
    id: 2, 
    label: 'MongoDB Certificate.pdf', 
    issuer: 'MongoDB', 
    date: '2026', 
    path: mongodbCert,
    icon: '🍃'
  },
];

function CertRow({ cert }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border border-[#222] bg-[#0A0A0A] hover:bg-[#111] transition-colors rounded-sm">
      <div className="flex items-center gap-3">
        <span className="text-[20px]">{cert.icon}</span>
        <div>
          <div className="text-[11px] font-bold font-mono text-[#ededed]">{cert.label}</div>
          <div className="text-[9px] text-[#888] font-mono mt-0.5">ISSUER: {cert.issuer}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <div className="text-[9px] font-mono text-[#666]">YEAR: {cert.date}</div>
          <span className="text-[8px] px-2 py-0.5 font-mono font-bold bg-[#152215] text-[#4CAF50] border border-[#223322] rounded-sm mt-1 inline-block">
            VERIFIED
          </span>
        </div>
        <button 
          onClick={() => window.open(cert.path, '_blank')}
          className="font-bold font-mono text-[10px] px-4 py-2 rounded-sm cursor-pointer bg-[#ededed] text-[#0A0A0A] hover:bg-white transition-colors"
        >
          [ OPEN ↗ ]
        </button>
      </div>
    </div>
  );
}

export default function CertificationsWindow() {
  return (
    <OSWindow
      id="certifications"
      title="Certifications.pem — VERIFIED_CREDENTIALS"
      defaultPos={{ x: 200, y: 80 }}
      width={680}
    >
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-end justify-between border-b border-[#222] pb-4">
          <div>
            <div className="text-[20px] font-bold text-[#ededed] tracking-widest font-mono">
              CREDENTIALS
            </div>
            <div className="text-[10px] text-[#888] font-mono mt-1">
              Verified certifications and professional credentials.
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-[#888] font-mono font-bold">VAULT STATUS</div>
            <div className="text-[11px] font-bold font-mono text-[#4CAF50] mt-0.5">
              ● SECURED
            </div>
          </div>
        </div>

        {/* Certifications List */}
        <div className="flex flex-col gap-2">
          <div className="text-[9px] text-[#888] font-mono font-bold tracking-widest mb-1">
            ACTIVE CREDENTIALS ({CERTS.length})
          </div>
          {CERTS.map(cert => (
            <CertRow key={cert.id} cert={cert} />
          ))}
        </div>

        {/* Footer note */}
        <div className="text-[9px] text-[#666] font-mono border-t border-[#1A1A1A] pt-3">
          // Secure vault connection established. Click on any credential to view the corresponding certificate.
        </div>
      </div>
    </OSWindow>
  );
}
