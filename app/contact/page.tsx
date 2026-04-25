"use client";

import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero Animation
        gsap.fromTo(headerRef.current, 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
        );

        // Form and Info Reveal
        gsap.fromTo(".reveal-stagger", 
            { y: 50, opacity: 0 },
            { 
                y: 0, opacity: 1, 
                stagger: 0.15, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".reveal-stagger",
                    start: "top 85%"
                }
            }
        );

        // Map Parallax/Reveal
        gsap.fromTo(mapRef.current,
            { scale: 1.1, opacity: 0 },
            { 
                scale: 1, opacity: 1, 
                duration: 1.5, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: mapRef.current,
                    start: "top 80%"
                }
            }
        );
    }, []);

    return (
        <main className="min-h-screen bg-[#FAF9F6] font-outfit overflow-x-hidden">
            <Navbar logoAnimated={true} />

            {/* HERO SECTION */}
            <section className="pt-48 pb-24 px-6 md:px-24 bg-[#0a0a0a] text-white">
                <div ref={headerRef} className="max-w-7xl mx-auto text-center">
                    <span className="text-[#D4AF37] text-xs font-black tracking-[0.5em] uppercase mb-6 block">Ready to Build?</span>
                    <h1 className="text-6xl md:text-9xl font-playfair font-black tracking-tighter uppercase mb-8 leading-none">
                        Get In <span className="text-[#D4AF37]">Touch</span>
                    </h1>
                    <p className="text-white/50 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed tracking-wide">
                        Whether you have a vision for a luxury home or a high-performance commercial structure, our team is ready to bring it to life with precision and excellence.
                    </p>
                </div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="py-32 px-6 md:px-24">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-20">
                    
                    {/* Left Side: Info */}
                    <div ref={infoRef} className="lg:col-span-5 space-y-16">
                        <div className="reveal-stagger">
                            <h3 className="text-[#D4AF37] text-[10px] font-black tracking-[0.4em] uppercase mb-6">Our Location</h3>
                            <p className="text-3xl font-black text-[#1a1a1a] leading-tight uppercase tracking-tighter">
                                LMT Builders & <br /> Developers Pvt. Ltd.<br />
                                <span className="text-[#D4AF37]">Business Bay, Tower A</span><br />
                                Suite 1204, Dubai, UAE
                            </p>
                        </div>

                        <div className="reveal-stagger">
                            <h3 className="text-[#D4AF37] text-[10px] font-black tracking-[0.4em] uppercase mb-6">Inquiries</h3>
                            <div className="space-y-4">
                                <p className="text-2xl font-black text-[#1a1a1a] hover:text-[#D4AF37] transition-colors cursor-pointer tracking-tighter uppercase">info@lmtbuilders.com</p>
                                <p className="text-4xl font-black text-[#1a1a1a] tracking-tighter">+971 4 123 4567</p>
                            </div>
                        </div>

                        <div className="reveal-stagger pt-8 border-t border-[#1a1a1a]/5">
                            <h3 className="text-[#D4AF37] text-[10px] font-black tracking-[0.4em] uppercase mb-8">Follow Our Legacy</h3>
                            <div className="flex gap-8">
                                {["Instagram", "LinkedIn", "Twitter"].map((social) => (
                                    <a key={social} href="#" className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-[#D4AF37] transition-colors">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div ref={formRef} className="lg:col-span-7 reveal-stagger">
                        <div className="bg-white p-12 md:p-16 shadow-[0_40px_80px_rgba(0,0,0,0.05)] border-t-[6px] border-[#D4AF37] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] select-none pointer-events-none -mr-16 -mt-16">
                                <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>

                            <form className="space-y-12">
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="relative group">
                                        <input type="text" id="name" required className="peer w-full bg-transparent border-b border-[#1a1a1a]/10 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent" placeholder="Name" />
                                        <label htmlFor="name" className="absolute left-0 top-4 text-[10px] font-black tracking-[0.2em] uppercase text-[#1a1a1a]/30 transition-all peer-focus:-top-4 peer-focus:text-[#D4AF37] peer-focus:text-[8px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px]">Full Name</label>
                                    </div>
                                    <div className="relative group">
                                        <input type="email" id="email" required className="peer w-full bg-transparent border-b border-[#1a1a1a]/10 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent" placeholder="Email" />
                                        <label htmlFor="email" className="absolute left-0 top-4 text-[10px] font-black tracking-[0.2em] uppercase text-[#1a1a1a]/30 transition-all peer-focus:-top-4 peer-focus:text-[#D4AF37] peer-focus:text-[8px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px]">Email Address</label>
                                    </div>
                                </div>
                                
                                <div className="relative group">
                                    <select id="service" defaultValue="" className="peer w-full bg-transparent border-b border-[#1a1a1a]/10 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer">
                                        <option value="" disabled>Select Service</option>
                                        <option value="commercial">Commercial Construction</option>
                                        <option value="residential">Residential Construction</option>
                                        <option value="renovation">Renovation</option>
                                        <option value="planning">Project Planning</option>
                                    </select>
                                    <label htmlFor="service" className="absolute left-0 -top-4 text-[8px] font-black tracking-[0.2em] uppercase text-[#D4AF37]">Service Interest</label>
                                    <div className="absolute right-0 top-6 pointer-events-none">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                            <path d="M1 1L5 5L9 1" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <textarea id="message" rows={4} required className="peer w-full bg-transparent border-b border-[#1a1a1a]/10 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent resize-none" placeholder="Message" />
                                    <label htmlFor="message" className="absolute left-0 top-4 text-[10px] font-black tracking-[0.2em] uppercase text-[#1a1a1a]/30 transition-all peer-focus:-top-4 peer-focus:text-[#D4AF37] peer-focus:text-[8px] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[8px]">How can we help?</label>
                                </div>

                                <button type="submit" className="w-full py-6 bg-[#1a1a1a] text-white text-[11px] font-black tracking-[0.4em] uppercase group relative overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                                    <span className="relative z-10 group-hover:tracking-[0.6em] transition-all">Send Inquiry</span>
                                    <div className="absolute inset-0 bg-[#D4AF37] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAP SECTION */}
            <section ref={mapRef} className="h-[60vh] w-full grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-1000 relative">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115535.80718501168!2d55.2017387!3d25.186637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4334ad467883%3A0x683c31671239c01d!2sBusiness%20Bay%20-%20Dubai!5e0!3m2!1sen!2sae!4v1714000000000!5m2!1sen!2sae" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                />
                <div className="absolute inset-0 pointer-events-none border-[20px] border-white/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] px-8 py-4 text-black text-[10px] font-black tracking-widest uppercase shadow-2xl pointer-events-none">
                    LMT HQ Location
                </div>
            </section>

            <Footer />
        </main>
    );
}
