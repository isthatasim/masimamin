import { personal } from '../data/content';

const KEYWORDS = ['Reinforcement Learning','Smart Grids','Energy Communities','Federated Learning'];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="tag tag-cyan">PhD Researcher</span>
              <span className="tag tag-blue">University of Genova</span>
              <span className="tag tag-purple">Horizon Europe CLOE</span>
            </div>
            <div>
              <p className="section-label">Hello, I'm</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">{personal.name}</h1>
              <h2 className="text-xl sm:text-2xl font-medium text-cyan-400">AI-Driven Energy Systems Researcher</h2>
            </div>
            <p className="text-slate-400 text-base leading-relaxed max-w-xl">
              Applying deep reinforcement learning and federated intelligence to transform
              energy communities and smart grids — bridging theory with deployment-grade solutions.
            </p>
            <div className="flex flex-wrap gap-2">
              {KEYWORDS.map(k => <span key={k} className="tag tag-cyan">{k}</span>)}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#research" className="px-6 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-semibold text-sm hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
                View Research
              </a>
              <a href={personal.cvUrl} target="_blank" rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full border border-slate-600 text-slate-300 font-medium text-sm hover:border-cyan-500/60 hover:text-cyan-400 transition-all">
                Download CV
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-3xl bg-cyan-500/10 scale-110" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
                {personal.image ? (
                  <img src={personal.image} alt={personal.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                    <span className="text-5xl font-bold text-cyan-400">{personal.initials}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}