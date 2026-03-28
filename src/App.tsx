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

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 antialiased overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      <main>
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
  );
}
