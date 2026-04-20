import { useState, useEffect } from "react";
const NAV=[{label:'Home',href:'#home'},{label:'About',href:'#about'},{label:'Education',href:'#education'},{label:'Research',href:'#research'},{label:'Experience',href:'#experience'},{label:'Publications',href:'#publications'},{label:'Projects',href:'#projects'},{label:'Contact',href:'#contact'}];
export default function Navbar(){
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>20);window.addEventListener('scroll',fn);return()=>window.removeEventListener('scroll',fn);},[]);
  return(
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled?'backdrop-blur-md shadow-lg border-b border-slate-700/40':'bg-transparent'}`}
      style={scrolled?{background:'rgba(4,8,15,0.9)'}:{}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <a href="#home" className="text-cyan-400 font-bold text-base tracking-wide hover:text-cyan-300 transition-colors">M. Asim Amin</a>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(n=><a key={n.href} href={n.href} className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 rounded-md transition-all duration-200" style={{}}>{n.label}</a>)}
          </div>
          <button className="md:hidden text-slate-300 hover:text-white p-2" onClick={()=>setOpen(!open)}>
            <div className="w-5 h-0.5 bg-current mb-1"/><div className="w-5 h-0.5 bg-current mb-1"/><div className="w-5 h-0.5 bg-current"/>
          </button>
        </div>
        {open&&(
          <div className="md:hidden border-t border-slate-700/50 pb-3" style={{background:'rgba(4,8,15,0.95)'}}>
            {NAV.map(n=><a key={n.href} href={n.href} onClick={()=>setOpen(false)} className="block px-4 py-2.5 text-sm text-slate-300 hover:text-cyan-400 transition-colors">{n.label}</a>)}
          </div>
        )}
      </div>
    </nav>
  );
}
