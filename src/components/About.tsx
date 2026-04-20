import { personal, stats } from "../data/content";

export default function About() {
  const paragraphs = (personal.summary || "").split(/\n+/).filter(Boolean);

  return (
    <section id="about" className="py-24" style={{background:"rgba(10,15,30,0.7)"}}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[.3em] uppercase mb-3" style={{color:"#06b6d4"}}>Get to know me</p>
          <h2 className="text-4xl font-black text-white mb-4" style={{letterSpacing:"-0.02em"}}>About Me</h2>
          <div className="w-16 h-1 rounded-full mx-auto mb-4" style={{background:"linear-gradient(90deg,#06b6d4,#3b82f6)"}}/>
          <p className="text-sm max-w-lg mx-auto" style={{color:"#64748b"}}>
            Researcher, engineer, and problem-solver working at the intersection of AI and sustainable energy systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">

          {/* Biography */}
          <div className="lg:col-span-2 space-y-5">
            {paragraphs.length > 0
              ? paragraphs.map((p, i) => (
                  <p key={i} className="leading-[1.85] text-[0.925rem]" style={{color:"#94a3b8"}}>{p}</p>
                ))
              : <p className="italic" style={{color:"#475569"}}>Biography not available.</p>
            }

            {/* Profile links */}
            <div className="flex flex-wrap gap-3 pt-3">
              {[
                {href: personal.scholar,  label: "Google Scholar", bg:"rgba(6,182,212,.1)",  bo:"rgba(6,182,212,.35)",  c:"#67e8f9"},
                {href: personal.linkedin, label: "LinkedIn",        bg:"rgba(59,130,246,.1)", bo:"rgba(59,130,246,.35)", c:"#93c5fd"},
                {href: personal.publons,  label: "Web of Science",  bg:"rgba(16,185,129,.1)", bo:"rgba(16,185,129,.35)", c:"#6ee7b7"},
                {href: personal.github,   label: "GitHub",          bg:"rgba(139,92,246,.1)", bo:"rgba(139,92,246,.35)", c:"#c4b5fd"},
              ].filter(l=>l.href).map(l=>(
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                   className="text-xs px-4 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 hover:brightness-110"
                   style={{background:l.bg,border:`1px solid ${l.bo}`,color:l.c}}>
                  {l.label} ↗
                </a>
              ))}
              {personal.email && (
                <a href={`mailto:${personal.email}`}
                   className="text-xs px-4 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                   style={{background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.35)",color:"#fcd34d"}}>
                  {personal.email}
                </a>
              )}
            </div>
          </div>

          {/* Sidebar: stats + quick info */}
          <div className="flex flex-col gap-4">
            {(stats || []).map((s, i) => (
              <div key={i} className="rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
                style={{background:"rgba(15,23,42,0.7)",border:"1px solid rgba(100,116,139,.25)",boxShadow:"0 2px 20px rgba(0,0,0,.3)"}}>
                <div className="text-3xl font-black mb-1" style={{color:"#06b6d4",letterSpacing:"-0.03em"}}>{s.value}</div>
                <div className="text-sm font-semibold text-white mb-0.5">{s.label}</div>
                {s.sublabel && <div className="text-xs" style={{color:"#64748b"}}>{s.sublabel}</div>}
              </div>
            ))}

            {(personal.location || personal.website || personal.cvUrl) && (
              <div className="rounded-2xl p-5 space-y-3"
                style={{background:"rgba(15,23,42,0.7)",border:"1px solid rgba(100,116,139,.25)"}}>
                <p className="text-xs font-bold uppercase tracking-widest" style={{color:"#475569"}}>Quick Info</p>
                {personal.location && (
                  <p className="flex items-start gap-2 text-xs" style={{color:"#94a3b8"}}>
                    <span style={{color:"#06b6d4"}}>📍</span>{personal.location}
                  </p>
                )}
                {personal.website && (
                  <a href={personal.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-2 text-xs transition-colors hover:text-cyan-300" style={{color:"#06b6d4"}}>
                    <span>🌐</span>Personal Website ↗
                  </a>
                )}
                {personal.cvUrl && (
                  <a href={personal.cvUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-2 text-xs transition-colors hover:text-cyan-300" style={{color:"#06b6d4"}}>
                    <span>📄</span>Download CV ↗
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
