import OSWindow from '../OSWindow';
// Professional Dossier & Resume Component
import resumePdf from '../../assets/aagoshrajSDE.pdf';

export default function ResumeWindow() {
  return (
    <OSWindow
      id="resume"
      title="Resume.pdf — ACADEMIC_PROFESSIONAL_DOSSIER"
      defaultPos={{ x: 220, y: 90 }}
      width={720}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-end justify-between border-b border-[#222] pb-3">
          <div>
            <div className="text-[18px] font-bold text-[#ededed] tracking-widest font-mono">
              RESUME_VIEWER
            </div>
            <div className="text-[10px] text-[#888] font-mono mt-0.5">
              Interactive document reader for professional dossier.
            </div>
          </div>
          <div className="text-right flex items-center gap-3">
            <button
              onClick={() => window.open(resumePdf, '_blank')}
              className="font-bold font-mono text-[10px] px-4 py-2 rounded-sm cursor-pointer bg-[#ededed] text-[#0A0A0A] hover:bg-white transition-colors"
            >
              [ FULLSCREEN ↗ ]
            </button>
          </div>
        </div>

        {/* PDF / Document Embed */}
        <div className="relative border border-[#222] bg-[#0A0A0A] rounded-sm overflow-hidden flex flex-col">
          {/* We'll use a direct iframe to embed the PDF */}
          <iframe 
            src={`${resumePdf}#toolbar=0`} 
            title="Aagosh Raj SDE Resume"
            className="w-full h-[540px] bg-[#111] border-none"
          />
        </div>

        {/* Footer info */}
        <div className="text-[9px] text-[#666] font-mono border-t border-[#1A1A1A] pt-2 flex justify-between">
          <span>// Local copy loaded successfully.</span>
          <a href={resumePdf} download="AagoshRaj_SDE_Resume.pdf" className="text-[#888] hover:text-[#ededed] underline transition-colors">
            [ DOWNLOAD_COPY ]
          </a>
        </div>
      </div>
    </OSWindow>
  );
}
