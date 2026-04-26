"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.1,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="bg-[#FAF9F6] py-32 px-8 md:px-24 border-t border-[#1a1a1a]/5"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
        
        {/* Left: Contact Info */}
        <div className="flex flex-col">
          <div className="contact-reveal mb-12">
            <span className="text-[10px] font-black tracking-[0.6em] text-[#D4AF37] uppercase mb-4 block">Connect</span>
            <h2 className="text-5xl md:text-7xl font-playfair font-black text-[#1a1a1a] uppercase leading-none tracking-tighter">
              Get In <br />
              <span className="text-[#D4AF37]">Touch</span>
            </h2>
          </div>

          <div className="flex flex-col gap-12 mt-12">
            <div className="contact-reveal">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#D4AF37] mb-4 block">Our Offices</span>
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#1a1a1a]/40 uppercase mb-2 block">Qatar</span>
                  <p className="text-xl font-black text-[#1a1a1a] leading-tight">
                    Next to Asmakh Mall, <br />
                    Al Sadd St, Doha, Qatar
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#1a1a1a]/40 uppercase mb-2 block">India</span>
                  <p className="text-xl font-black text-[#1a1a1a] leading-tight">
                    Opp. Private Bus Station, <br />
                    Aban Junction, Pathanamthitta, <br />
                    Kerala, 689645
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-reveal">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#D4AF37] mb-4 block">Inquiries</span>
              <a href="mailto:info@lmtbuilders.com" className="text-2xl font-black text-[#1a1a1a] hover:text-[#D4AF37] transition-colors block mb-4 uppercase tracking-tighter">info@lmtbuilders.com</a>
              <div className="flex flex-col gap-2">
                <a href="tel:+918111936632" className="text-2xl font-black text-[#D4AF37] hover:text-[#1a1a1a] transition-colors tracking-tighter">+91 81119 36632</a>
                <a href="tel:+917907694541" className="text-2xl font-black text-[#D4AF37] hover:text-[#1a1a1a] transition-colors tracking-tighter">+91 79076 94541</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-reveal bg-white p-12 shadow-2xl border-t-4 border-[#D4AF37]">
          <form className="flex flex-col gap-10">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-transparent border-b border-[#1a1a1a]/10 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:uppercase placeholder:text-[10px] placeholder:font-black placeholder:tracking-[0.2em]"
              />
            </div>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border-b border-[#1a1a1a]/10 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:uppercase placeholder:text-[10px] placeholder:font-black placeholder:tracking-[0.2em]"
              />
            </div>
            <div className="relative group">
              <textarea 
                rows={4}
                placeholder="Your Message" 
                className="w-full bg-transparent border-b border-[#1a1a1a]/10 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:uppercase placeholder:text-[10px] placeholder:font-black placeholder:tracking-[0.2em] resize-none"
              />
            </div>
            
            <button className="self-start px-12 py-6 bg-[#1a1a1a] text-white text-[11px] font-black tracking-[0.3em] uppercase group relative overflow-hidden">
               <span className="relative z-10">Send Message</span>
               <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
            </button>
          </form>
        </div>

      </div>

      {/* Decorative large text */}
      <div className="mt-40 text-center opacity-[0.03] select-none pointer-events-none">
         <div className="text-[15vw] font-playfair font-black uppercase leading-none text-[#1a1a1a]">Contact</div>
      </div>
    </section>
  );
}
