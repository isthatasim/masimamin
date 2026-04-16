import EnergyParticles from './ui/EnergyParticles';

const STATS = [
  { value: '10+', label: 'Publications' },
  { value: '3+',  label: 'Years Research' },
  { value: '2',   label: 'EU Projects' },
  { value: 'MSc', label: 'Elec. Eng.' },
];

export default function About() {
  return (
    <section className="py-24 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="flex flex-col items-center order-2 lg:order-1">
            <div className="w-full max-w-md">
              <EnergyParticles />
            </div>
            <p className="text-slate-600 text-xs mt-3 text-center">AI-driven energy ecosystem</p>
          </div>

          <div className="order-1 lg:order-2 space-y-5">
            <div>
              <p className="section-label">About Me</p>
              <h2 className="section-heading">Bridging AI &amp; Energy Systems</h2>
            </div>
            <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
              <p>I am a PhD researcher at the <strong className="text-slate-200">University of Genova</strong>, working at the intersection of artificial intelligence and power engineering. My research focuses on applying deep reinforcement learning and federated learning to optimize energy communities and smart grid operations.</p>
              <p>As a researcher in the <strong className="text-slate-200">Horizon Europe CLOE project</strong>, I develop deployment-grade AI solutions that bridge the gap between theoretical frameworks and real-world energy challenges — with measurable impact on efficiency, sustainability, and grid resilience.</p>
              <p>My work spans multi-agent RL, predictive analytics, demand-side management, and AI-driven energy management systems (EMS) with a strong emphasis on practical validation and scalability.</p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {STATS.map(s => (
                <div key={s.label} className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-lg font-bold text-cyan-400">{s.value}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <a href="mailto:masim.amin@yahoo.com" className="tag tag-cyan">Email Me</a>
              <a href="#publications" className="tag tag-blue">Publications</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}