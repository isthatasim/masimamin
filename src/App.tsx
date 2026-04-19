import { Component } from "react";
import type { ReactNode } from "react";
import SiteBackground from "./components/ui/SiteBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import ResearchFocus from "./components/ResearchFocus";
import Experience from "./components/Experience";
import Publications from "./components/Publications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

interface EBState { hasError: boolean; msg: string; }
class EB extends Component<{ name: string; children: ReactNode }, EBState> {
  state: EBState = { hasError: false, msg: "" };
  static getDerivedStateFromError(e: Error): EBState { return { hasError: true, msg: e.message }; }
  render() {
    if (this.state.hasError)
      return <div style={{ padding: "1rem", color: "#f87171", background: "#1a0505", margin: "4px", borderRadius: "6px", fontSize: "11px", fontFamily: "monospace" }}>[{this.props.name}]: {this.state.msg}</div>;
    return this.props.children;
  }
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
      <SiteBackground />
      <div className="relative z-10">
        <EB name="Navbar"><Navbar /></EB>
        <main>
          <section id="home"><EB name="Hero"><Hero /></EB></section>
          <section id="about"><EB name="About"><About /></EB></section>
          <section id="education"><EB name="Education"><Education /></EB></section>
          <section id="research"><EB name="Research"><ResearchFocus /></EB></section>
          <section id="experience"><EB name="Experience"><Experience /></EB></section>
          <section id="publications"><EB name="Publications"><Publications /></EB></section>
          <section id="projects"><EB name="Projects"><Projects /></EB></section>
          <section id="contact"><EB name="Contact"><Contact /></EB></section>
        </main>
        <EB name="Footer"><Footer /></EB>
      </div>
    </div>
  );
}