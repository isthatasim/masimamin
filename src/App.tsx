import { Component, ReactNode, ErrorInfo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Publications from "./components/Publications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

interface EBState { hasError: boolean; error?: Error; }
interface EBProps { children: ReactNode; name: string; }

class EB extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.name}]`, error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="py-16 text-center text-slate-500 border border-red-900/30 rounded-xl mx-6 my-4 bg-red-950/20">
          <p className="text-sm font-semibold text-red-400 mb-1">{this.props.name} failed to render</p>
          <p className="text-xs text-slate-600">{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <EB name="Navbar"><Navbar /></EB>

      <main>
        <EB name="Hero">
          <Hero />
        </EB>

        <section id="about">
          <EB name="About"><About /></EB>
        </section>

        <section id="education">
          <EB name="Education"><Education /></EB>
        </section>

        <section id="research">
          <EB name="Publications"><Publications /></EB>
        </section>

        <section id="experience">
          <EB name="Experience"><Experience /></EB>
        </section>

        <section id="projects">
          <EB name="Projects"><Projects /></EB>
        </section>

        <section id="contact">
          <EB name="Contact"><Contact /></EB>
        </section>
      </main>
    </div>
  );
}
