"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const standards = [
  { 
    title: "Quality Policy", 
    desc: "Our commitment to excellence is reflected in every aspect of our work. We adhere to the highest quality standards and continuously improve our processes.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22V12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12L3 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12l9-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  { 
    title: "Quality Assurance", 
    desc: "Rigorous quality control processes at every stage to ensure superior construction standards.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  { 
    title: "Safety First", 
    desc: "Unwavering commitment to workplace safety with comprehensive training and strict compliance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  { 
    title: "Certified Excellence", 
    desc: "ISO certified processes and industry-leading standards ensuring world-class quality.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  { 
    title: "Client Trust", 
    desc: "Building lasting relationships through transparency, integrity, and consistent delivery.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

export default function Standards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".standards-header",
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".standards-header",
            start: "top 85%"
          }
        }
      );

      gsap.fromTo(".standard-box",
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".standards-grid",
            start: "top 80%"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#0a0a0a] py-32 px-6 md:px-24 overflow-hidden relative">
      {/* Decorative Blueprint Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white" />
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white" />
        <div className="absolute top-2/4 left-0 w-full h-[1px] bg-white" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="standards-header mb-24">
          <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Foundations of Integrity</span>
          <h2 className="text-5xl md:text-7xl font-playfair font-black text-white uppercase tracking-tighter leading-none">
            Our <span className="text-[#D4AF37]">Standards</span>
          </h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mt-8" />
        </div>

        <div className="standards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {standards.map((std, i) => (
            <div 
              key={std.title}
              className={`standard-box p-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 group ${
                i === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="text-[#D4AF37] mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                    {std.icon}
                  </div>
                  <h3 className="text-white text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-[#D4AF37] transition-colors">
                    {std.title}
                  </h3>
                  <p className="text-white/40 text-[13px] leading-relaxed tracking-wide group-hover:text-white/60 transition-colors">
                    {std.desc}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-[1px] bg-[#D4AF37]" />
                  <span className="text-[8px] font-black tracking-[0.3em] uppercase text-[#D4AF37]">Verified Excellence</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
