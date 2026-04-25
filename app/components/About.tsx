"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const companyTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Sliding Heading
      gsap.fromTo(aboutTextRef.current, 
        { x: "-50%", opacity: 0 },
        { 
          x: "0%", opacity: 1, 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 1.5,
          }
        }
      );

      gsap.fromTo(companyTextRef.current, 
        { x: "50%", opacity: 0 },
        { 
          x: "0%", opacity: 1, 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 1.5,
          }
        }
      );

      // 2. Section Staggered Fade
      gsap.fromTo(".reveal-up",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".reveal-up",
            start: "top 90%",
          }
        }
      );

      // 3. Image Parallax
      gsap.fromTo(".parallax-img",
        { y: -30 },
        {
          y: 30,
          scrollTrigger: {
            trigger: ".parallax-img",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-6 md:px-24 overflow-hidden"
      style={{ 
        backgroundColor: "#FAF9F6",
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px"
      }}
    >
      {/* BACKGROUND WATERMARK */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 opacity-[0.02] text-[25vw] font-playfair font-black leading-none select-none pointer-events-none uppercase">
        Legacy
      </div>

      {/* 1. ANIMATED HEADING */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 mb-32">
        <div ref={aboutTextRef} className="text-6xl md:text-[9vw] font-playfair font-black tracking-tighter uppercase text-[#1a1a1a]">
          About
        </div>
        <div ref={companyTextRef} className="text-6xl md:text-[9vw] font-playfair font-black tracking-tighter uppercase text-[#D4AF37]">
          Company
        </div>
      </div>

      {/* 2. INTRO SECTION */}
      <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto mb-40 items-center">
        <div className="lg:col-span-7 relative reveal-up">
           <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37]" />
           <div className="relative aspect-video shadow-2xl overflow-hidden transition-all duration-700">
              <Image src="/about_main.png" alt="LMT Project" fill className="object-cover scale-110 parallax-img" />
           </div>
        </div>
        <div className="lg:col-span-5 reveal-up">
           <span className="text-[10px] font-black tracking-[0.6em] text-[#D4AF37] uppercase mb-4 block">Identity</span>
           <h2 className="text-4xl font-playfair font-black text-[#1a1a1a] mb-8 leading-tight uppercase">
             LMT Builders & <br />
             Developers Pvt. Ltd.
           </h2>
           <p className="text-lg leading-relaxed text-[#444] font-medium italic border-l-4 border-[#D4AF37] pl-8">
             LMT Builders & Developers Pvt. Ltd. is a leading construction and real estate development company with a proven track record of delivering high-quality projects across residential, commercial, and industrial sectors.
           </p>
        </div>
      </div>

      {/* 3. CORE PILLARS (MISSION, VISION, GOALS) */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-40">
        {[
          { 
            title: "Our Mission", 
            text: "To provide exceptional construction and real estate solutions that exceed client expectations through innovation, quality craftsmanship, and unwavering commitment to excellence." 
          },
          { 
            title: "Our Vision", 
            text: "To be the most trusted and respected construction company, recognized for transforming landscapes and creating sustainable, iconic structures that stand the test of time." 
          },
          { 
            title: "Our Goals", 
            text: "Deliver projects on time and within budget, maintain the highest safety standards, embrace sustainable building practices, and foster long-term relationships with clients and partners." 
          }
        ].map((item, i) => (
          <div key={i} className="reveal-up relative p-12 bg-white border border-[#1a1a1a]/5 hover:border-[#D4AF37]/50 transition-all duration-500 shadow-sm group">
            <div className="text-5xl font-black text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 absolute top-4 right-4 transition-colors">0{i+1}</div>
            <h3 className="text-sm font-black tracking-[0.3em] uppercase text-[#1a1a1a] mb-6">{item.title}</h3>
            <p className="text-sm leading-relaxed text-[#666] font-medium">{item.text}</p>
          </div>
        ))}
      </div>

      {/* 4. EXCELLENCE NARRATIVE */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start mb-24 -mt-16">
        <div className="reveal-up order-2 lg:order-1 flex flex-col justify-center h-full">
           <h3 className="text-4xl font-playfair font-black text-[#1a1a1a] mb-8 uppercase leading-tight">
             Building Excellence <br />
             <span className="text-[#D4AF37]">Since Day One</span>
           </h3>
           <p className="text-xl leading-relaxed text-[#555] mb-8">
             Our team of experienced professionals brings together expertise in architecture, engineering, project management, and construction to deliver comprehensive solutions tailored to your unique needs.
           </p>
           <p className="text-lg leading-relaxed text-[#777] border-t border-[#1a1a1a]/5 pt-8">
             We believe in building more than structures – we build relationships, communities, and futures. Every project is approached with meticulous attention to detail, innovative thinking, and an unwavering commitment to quality.
           </p>
        </div>
        <div className="reveal-up order-1 lg:order-2 relative">
           <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#D4AF37]/30 z-0" />
           <div className="relative aspect-square shadow-2xl overflow-hidden rounded-sm transition-all duration-1000 z-10">
              <Image src="/about_detail.png" alt="Builders Detail" fill className="object-cover scale-105 parallax-img" />
           </div>
           <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-16 h-[1px] bg-[#D4AF37] z-20" />
        </div>
      </div>



      {/* DECORATIVE LABELS */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-12 opacity-30 pointer-events-none hidden xl:flex">
         <span className="rotate-90 text-[10px] font-black tracking-widest uppercase text-[#D4AF37]">Architecture</span>
         <span className="rotate-90 text-[10px] font-black tracking-widest uppercase text-[#D4AF37]">Engineering</span>
         <span className="rotate-90 text-[10px] font-black tracking-widest uppercase text-[#D4AF37]">Management</span>
      </div>

    </section>
  );
}