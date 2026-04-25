"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Interior Designing",
    desc: "Bespoke interior solutions that combine luxury, comfort, and functionality.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    isNew: true
  },
  {
    id: "02",
    title: "Project Planning",
    desc: "Comprehensive planning including feasibility studies and detailed roadmaps.",
    image: "/services/planning.png"
  },
  {
    id: "03",
    title: "3D Modeling",
    desc: "Advanced visualization to help you see the project before construction begins.",
    image: "/services/modeling.png"
  },
  {
    id: "04",
    title: "Project Management",
    desc: "End-to-end management ensuring timely delivery and quality control.",
    image: "/services/management.png"
  },
  {
    id: "05",
    title: "Commercial Construction",
    desc: "Expert services for office buildings and retail spaces with high functionality.",
    image: "/services/commercial.png"
  },
  {
    id: "06",
    title: "Residential Construction",
    desc: "Custom home building transforming dreams into reality with precision.",
    image: "/services/residential.png"
  },
  {
    id: "07",
    title: "Renovation",
    desc: "Professional remodeling to breathe new life into existing structures.",
    image: "/services/renovation.png"
  }
];

export default function Services() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a single timeline for the entire pinned section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${sectionRef.current!.scrollWidth * 0.4}`,
          scrub: 0.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Move the section horizontally
      tl.to(sectionRef.current, {
        x: () => -(sectionRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="bg-[#FAF9F6] h-screen w-full flex flex-col justify-center overflow-hidden">
      
      {/* HEADING SECTION — Now stays visible because it's pinned */}
      <div className="pt-20 pb-8 px-8 md:px-24 w-full">
        <div className="max-w-7xl">
          <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#D4AF37] mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-5xl md:text-[6vw] font-playfair font-black leading-none tracking-tighter uppercase text-[#1a1a1a]">
            What <span className="text-[#D4AF37]">We Do</span>
          </h2>
          <div className="w-20 h-[2px] bg-[#D4AF37] mt-6" />
          <p className="mt-6 text-sm md:text-base text-[#555] max-w-xl leading-relaxed">
            We offer a comprehensive range of construction and development services designed to meet all your building needs with excellence.
          </p>
        </div>
      </div>

      {/* HORIZONTAL GRID */}
      <div 
        ref={sectionRef} 
        className="flex gap-10 w-max px-8 md:px-24 items-start will-change-transform pb-12"
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="relative w-[85vw] md:w-[35vw] h-[45vh] md:h-[50vh] group overflow-hidden shadow-2xl rounded-sm shrink-0 bg-white"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="text-3xl font-black text-[#D4AF37]/30 mb-2">{service.id}</span>
              <h3 className="text-xl md:text-3xl font-black text-white uppercase leading-tight mb-3 group-hover:text-[#D4AF37] transition-colors flex items-center gap-3">
                {service.title}
                {service.isNew && (
                  <span className="relative flex h-5 w-12 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-20"></span>
                    <span className="relative inline-flex rounded-full px-2.5 py-1 bg-[#D4AF37] text-black text-[9px] font-black tracking-widest leading-none border border-white/20 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                      NEW
                    </span>
                  </span>
                )}
              </h3>
              <p className="text-xs md:text-base text-white/70 leading-relaxed max-w-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                {service.desc}
              </p>

              <Link href="/portfolio" className="mt-8 flex items-center gap-4 group/btn cursor-pointer">
                <div className="w-8 h-[1px] bg-[#D4AF37] group-hover/btn:w-12 transition-all" />
                <span className="text-[9px] font-black tracking-[0.3em] uppercase text-[#D4AF37]">Explore Portfolio</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
