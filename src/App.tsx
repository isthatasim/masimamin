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

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
      <SiteBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <section id="home"><Hero /></section>
          <section id="about"><About /></section>
          <section id="research"><ResearchFocus /></section>
          <section id="experience"><Experience /></section>
          <section id="publications"><Publications /></section>
          <section id="projects"><Projects /></section>
          <section id="contact"><Contact /></section>
        </main>
        <Footer />
      </div>
    </div>
  );
}