import{Component}from"react";import type{ReactNode}from"react";
import SiteBackground from"./components/ui/SiteBackground";
import Navbar from"./components/Navbar";
import Hero from"./components/Hero";
import About from"./components/About";
import ResearchFocus from"./components/ResearchFocus";
import Experience from"./components/Experience";
import Publications from"./components/Publications";
import Projects from"./components/Projects";
import Contact from"./components/Contact";
import Footer from"./components/Footer";
class EB extends Component<{n:string;children:ReactNode},{e:boolean;m:string}>{
  state={e:false,m:""};
  static getDerivedStateFromError(err:Error){return{e:true,m:err.message};}
  render(){
    if(this.state.e)return<div style={{padding:"1rem",color:"#f87171",background:"#1a0505",margin:"4px",borderRadius:"6px",fontSize:"11px",fontFamily:"monospace"}}>[{this.props.n}]: {this.state.m}</div>;
    return this.props.children;
  }
}
export default function App(){
  return(
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
      <SiteBackground/>
      <div className="relative z-10">
        <EB n="Nav"><Navbar/></EB>
        <main>
          <section id="home"><EB n="Hero"><Hero/></EB></section>
          <section id="about"><EB n="About"><About/></EB></section>
          <section id="research"><EB n="Research"><ResearchFocus/></EB></section>
          <section id="experience"><EB n="Exp"><Experience/></EB></section>
          <section id="publications"><EB n="Pubs"><Publications/></EB></section>
          <section id="projects"><EB n="Projects"><Projects/></EB></section>
          <section id="contact"><EB n="Contact"><Contact/></EB></section>
        </main>
        <EB n="Footer"><Footer/></EB>
      </div>
    </div>
  );
}