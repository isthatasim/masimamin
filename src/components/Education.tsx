import * as content from "../data/content";

type Degree = {
  degree?: string; title?: string; name?: string;
  field?: string; major?: string; subject?: string; program?: string;
  institution?: string; university?: string; school?: string; organization?: string;
  period?: string; date?: string; year?: string | number; duration?: string;
  location?: string; country?: string;
  description?: string | string[];
  thesis?: string;
  gpa?: string | number;
  highlights?: string[];
  tags?: string[];
};

function getEdu(): Degree[] {
  const raw = (content as any).education
    || (content as any).educations
    || (content as any).degrees
    || (content as any).academic
    || (content as any).academics
    || (content as any).academicBackground
    || [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "object") {
    return Object.values(raw).reduce((acc: Degree[], v: any) =>
      Array.isArray(v) ? acc.concat(v) : acc, []);
  }
  return [];
}

const degrees = getEdu();

export default function Education() {
  if (!degrees.length) return null;
  return (
    <section className="py-24 border-t border-slate-900" id="education">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl mb-12">
          <p className="section-label">Academic Background</p>
          <h2 className="section-heading">Education</h2>
        </div>

        <div className="space-y-6">
          {degrees.map((d: Degree, i: number) => (
            <div key={i} className="card hover:border-cyan-500/30">
              <div className="flex flex-wrap items-start justify-between gap-4">

                {/* Left: icon + details */}
                <div className="flex gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-xs font-mono">
                      {i === 0 ? "PhD" : i === 1 ? "MSc" : "BSc"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-100 font-semibold text-base leading-snug">
                      {d.degree || d.title || d.name || ""}
                    </h3>
                    {(d.field || d.major || d.subject || d.program) && (
                      <p className="text-cyan-400 text-sm mt-0.5">
                        {d.field || d.major || d.subject || d.program}
                      </p>
                    )}
                    <p className="text-slate-400 text-sm mt-1">
                      {d.institution || d.university || d.school || d.organization || ""}
                      {(d.location || d.country) && (
                        <span className="text-slate-600"> &middot; {d.location || d.country}</span>
                      )}
                    </p>
                    {d.thesis && (
                      <p className="text-slate-500 text-xs mt-2 italic">
                        Thesis: {d.thesis}
                      </p>
                    )}
                    {d.description && (
                      <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                        {Array.isArray(d.description) ? d.description.join(" ") : d.description}
                      </p>
                    )}
                    {(d.highlights || []).length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {(d.highlights || []).map((h: string, j: number) => (
                          <li key={j} className="text-slate-500 text-xs flex gap-2">
                            <span className="text-cyan-500">&middot;</span>{h}
                          </li>
                        ))}
                      </ul>
                    )}
                    {(d.tags || []).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800">
                        {(d.tags || []).map((t: string) => (
                          <span key={t} className="tag tag-cyan">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: period + GPA */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="tag tag-blue">{d.period || d.date || d.duration || String(d.year || "")}</span>
                  {d.gpa && (
                    <span className="tag tag-green">GPA: {d.gpa}</span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}