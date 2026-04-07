import { Component, type ReactNode } from 'react';
import SiteBackground from './components/ui/SiteBackground';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ResearchFocus from './components/ResearchFocus';
import Experience from './components/Experience';
import Education from './components/Education';
import Publications from './components/Publications';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Awards from './components/Awards';
import Contact from './components/Contact';
import Footer from './components/Footer';

interface EBState { error: Error | null; info: string }
class ErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  state: EBState = { error: null, info: '' };
  componentDidCatch(error: Error, info: { componentStack: string }) {
    this.setState({ error, info: info.componentStack });
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: '#0a0a0a', color: '#ff6b6b',
          fontFamily: 'monospace', padding: '32px', overflow: 'auto', zIndex: 99999,
        }}>
          <h1 style={{ color: '#ff4444', fontSize: '20px', marginBottom: '16px' }}>
            ⚠ React Render Error
          </h1>
          <pre style={{ background: '#1a0a0a', padding: '16px', borderRadius: '8px',
            border: '1px solid #ff4444', fontSize: '12px', whiteSpace: 'pre-wrap',
            marginBottom: '16px', color: '#ffa0a0' }}>
            {this.state.error.message}
          </pre>
          <pre style={{ background: '#111', padding: '16px', borderRadius: '8px',
            border: '1px solid #333', fontSize: '11px', whiteSpace: 'pre-wrap', color: '#888' }}>
            {this.state.info}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen text-slate-100 antialiased overflow-x-hidden" style={{ background: '#0a1628' }}>
        {/* Full-viewport animated network mesh — sits behind everything */}
        <SiteBackground />
        <CustomCursor />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <ResearchFocus />
          <Experience />
          <Education />
          <Publications />
          <Projects />
          <Skills />
          <Awards />
          <Contact />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
