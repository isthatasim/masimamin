import { Suspense, Component, ReactNode } from 'react';
import SiteBackground from './components/ui/SiteBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ResearchFocus from './components/ResearchFocus';
import Experience from './components/Experience';
import Publications from './components/Publications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

interface EBState { hasError: boolean; error: string; }
class ErrorBoundary extends Component<{name:string;children:ReactNode}, EBState> {
  state: EBState = { hasError: false, error: '' };
  static getDerivedStateFromError(e: Error): EBState {
    return { hasError: true, error: e.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:'2rem',color:'#f85149',background:'#161b22',margin:'1rem',borderRadius:'8px',fontFamily:'monospace',fontSize:'12px'}}>
          <b>Section error ({this.props.name}):</b> {this.state.error}
        </div>
      );
    }
    return this.props.children;
  }
}

function Wrap({name, children}: {name:string; children:ReactNode}) {
  return <ErrorBoundary name={name}><Suspense fallback={null}>{children}</Suspense></ErrorBoundary>;
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
      <SiteBackground />
      <div className="relative z-10">
        <Wrap name="Navbar"><Navbar /></Wrap>
        <main>
          <section id="home"><Wrap name="Hero"><Hero /></Wrap></section>
          <section id="about"><Wrap name="About"><About /></Wrap></section>
          <section id="research"><Wrap name="Research"><ResearchFocus /></Wrap></section>
          <section id="experience"><Wrap name="Experience"><Experience /></Wrap></section>
          <section id="publications"><Wrap name="Publications"><Publications /></Wrap></section>
          <section id="projects"><Wrap name="Projects"><Projects /></Wrap></section>
          <section id="contact"><Wrap name="Contact"><Contact /></Wrap></section>
        </main>
        <Wrap name="Footer"><Footer /></Wrap>
      </div>
    </div>
  );
}