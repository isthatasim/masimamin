import { experience } from '../data/content';

export default function Experience() {
  const exps = (experience || []) as any[];
  return (
    <section className="py-24 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="section-label">Career</p>
          <h2 className="section-heading">Experience</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800 hidden md:block" />
          <div className="space-y-5">
            {exps.map((exp, i) => (
              <div key={i} className="relative md:pl-12">
                <div className="absolute left-2.5 top-6 w-3 h-3 rounded-full bg-cyan-500/30 border-2 border-cyan-500 hidden md:block" />
                <div className="card hover:border-cyan-500/30">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-slate-200 font-semibold">{exp.title || exp.role || exp.position}</h3>
                      <span className="text-cyan-400 text-sm">{exp.organization || exp.company || exp.institution}</span>
                      {exp.location && <span className="text-slate-600 text-xs ml-2">· {exp.location}</span>}
                    </div>
                    <span className="tag tag-blue text-xs flex-shrink-0">{exp.period || exp.date || exp.duration}</span>
                  </div>
                  {exp.description && (
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {Array.isArray(exp.description) ? exp.description.join(' ') : exp.description}
                    </p>
                  )}
                  {exp.highlights && (
                    <ul className="mt-3 space-y-1">
                      {exp.highlights.map((h: string, j: number) => (
                        <li key={j} className="text-slate-500 text-xs flex gap-2"><span className="text-cyan-500">·</span>{h}</li>
                      ))}
                    </ul>
                  )}
                  {(exp.tags || exp.skills) && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800">
                      {(exp.tags || exp.skills || []).map((t: string) => <span key={t} className="tag tag-cyan">{t}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}