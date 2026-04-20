import { personal, stats } from "../data/content";

export default function About() {
  const paragraphs = (personal.summary || '').split(/\n+/).filter(Boolean);

  return (
    <section id="about" className="py-20" style={{ background: 'rgba(15,23,42,0.6)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Biography */}
          <div className="lg:col-span-2">
            {paragraphs.length > 0 ? (
              <div className="space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed text-[0.925rem]">{p}</p>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic">Summary not available.</p>
            )}

            {/* Contact + profile links */}
            <div className="flex flex-wrap gap-3 mt-7">
              {personal.scholar && (
                <a href={personal.scholar} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
                   style={{background:'rgba(6,182,212,.1)',border:'1px solid rgba(6,182,212,.35)',color:'#67e8f9'}}>
                  Google Scholar ↗
                </a>
              )}
              {personal.linkedin && (
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
                   style={{background:'rgba(59,130,246,.1)',border:'1px solid rgba(59,130,246,.35)',color:'#93c5fd'}}>
                  LinkedIn ↗
                </a>
              )}
              {personal.publons && (
                <a href={personal.publons} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
                   style={{background:'rgba(16,185,129,.1)',border:'1px solid rgba(16,185,129,.35)',color:'#6ee7b7'}}>
                  Web of Science ↗
                </a>
              )}
              {personal.github && (
                <a href={personal.github} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
                   style={{background:'rgba(139,92,246,.1)',border:'1px solid rgba(139,92,246,.35)',color:'#c4b5fd'}}>
                  GitHub ↗
                </a>
              )}
              {personal.email && (
                <a href={`mailto:${personal.email}`}
                   className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
                   style={{background:'rgba(245,158,11,.1)',border:'1px solid rgba(245,158,11,.35)',color:'#fcd34d'}}>
                  {personal.email}
                </a>
              )}
              {personal.phone && (
                <span className="text-xs px-4 py-2 rounded-full"
                   style={{background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.15)',color:'#94a3b8'}}>
                  📞 {personal.phone}
                </span>
              )}
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="flex flex-col gap-4">
            {(stats || []).map((s, i) => (
              <div key={i} className="rounded-xl p-5 text-center border border-slate-700/40 hover:border-cyan-500/40 transition-colors"
                style={{ background: 'rgba(30,41,59,0.55)' }}>
                <div className="text-3xl font-extrabold text-cyan-400 mb-1">{s.value}</div>
                <div className="text-sm font-semibold text-white mb-0.5">{s.label}</div>
                {s.sublabel && <div className="text-xs text-slate-400">{s.sublabel}</div>}
              </div>
            ))}

            {/* Quick info */}
            {(personal.location || personal.website || personal.cvUrl) && (
              <div className="rounded-xl p-5 border border-slate-700/40 space-y-3" style={{background:'rgba(30,41,59,0.55)'}}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Quick Info</p>
                {personal.location && (
                  <div className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-cyan-400 mt-0.5">📍</span> {personal.location}
                  </div>
                )}
                {personal.website && (
                  <a href={personal.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-2 text-xs text-cyan-400 hover:text-cyan-300">
                    <span>🌐</span> Personal Website ↗
                  </a>
                )}
                {personal.cvUrl && (
                  <a href={personal.cvUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-2 text-xs text-cyan-400 hover:text-cyan-300">
                    <span>📄</span> Download CV ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
