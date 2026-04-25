"use client";

import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
    title: string;
    tagline: string;
    desc: string;
    details: string[];
    image: string;
    isNew?: boolean;
}

const detailedServices: ServiceItem[] = [

    {
        title: "Project Planning",
        tagline: "Strategic Blueprints for Success",
        desc: "Every masterpiece begins with a precise plan. We provide comprehensive feasibility studies, detailed architectural roadmaps, and risk assessment strategies that ensure your project is built on a foundation of clarity and excellence.",
        details: ["Feasibility & Site Analysis", "Regulatory Compliance", "Cost Estimation & Budgeting", "Phased Development Strategy"],
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
    },
    {
        title: "3D Modeling",
        tagline: "Visualize the Future Before it Exists",
        desc: "Experience your project in stunning detail with our advanced 3D visualization and BIM modeling services. We bridge the gap between imagination and reality, allowing you to walk through your future space with cinematic precision.",
        details: ["Photo-Realistic Rendering", "Virtual Reality Walkthroughs", "BIM Coordination", "Parametric Design Modeling"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
    },
    {
        title: "Project Management",
        tagline: "Efficiency and Precision in Every Phase",
        desc: "Our project management team ensures that every structural endeavor is executed with mathematical precision and uncompromising quality. We handle the complex logistics so you can focus on the vision, delivering results on time and beyond expectations.",
        details: ["End-to-End Coordination", "Quality Control & Assurance", "Timeline & Schedule Management", "Resource Optimization"],
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2000&auto=format&fit=crop"
    },
    {
        title: "Commercial Construction",
        tagline: "High-Performance Workspaces",
        desc: "We build environments that foster productivity and professional pride. Our commercial construction services focus on structural integrity and modern architectural aesthetics, creating landmarks that define the corporate skyline.",
        details: ["Office & Retail Structures", "Industrial Facilities", "Mixed-Use Developments", "Advanced Structural Engineering"],
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
    },
    {
        title: "Residential Construction",
        tagline: "Building Sanctuaries of Distinction",
        desc: "We specialize in the creation of ultra-luxury residential properties that serve as personal sanctuaries. Our approach combines traditional architectural values with modern sustainable practices to deliver homes that are as durable as they are beautiful.",
        details: ["Custom Luxury Homes", "Multi-Family Residences", "Sustainable Building Systems", "High-End Finishing"],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
    },
    {
        title: "Renovation",
        tagline: "Reimagining Existing Structures",
        desc: "Our renovation services breathe new life into heritage and modern buildings alike. We preserve the essence of a structure while upgrading its functionality and aesthetic to meet contemporary standards of luxury and efficiency.",
        details: ["Structural Reinforcement", "Interior Modernization", "Adaptive Reuse", "Preservation & Restoration"],
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop"
    }
];

export default function ServicesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname(); // Need to import this or just use the logic

    useEffect(() => {
        const sections = gsap.utils.toArray(".service-section");

        sections.forEach((section: any) => {
            gsap.fromTo(section.querySelector(".content-box"),
                { y: 100, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                    }
                }
            );

            gsap.fromTo(section.querySelector(".image-box"),
                { scale: 1.2, opacity: 0 },
                {
                    scale: 1, opacity: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                    }
                }
            );
        });
    }, []);

    return (
        <main className="min-h-screen font-outfit overflow-x-hidden">
            <Navbar logoAnimated={true} />

            {/* HERO SECTION */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-20 bg-[#0a0a0a]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop"
                        alt="Background"
                        fill
                        className="object-cover opacity-30 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a]" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <span className="text-[#D4AF37] text-xs font-black tracking-[0.5em] uppercase mb-4 block">Our Expertise</span>
                    <h1 className="text-6xl md:text-8xl font-playfair font-black tracking-tighter uppercase mb-6 text-white">
                        Detailed <span className="text-[#D4AF37]">Services</span>
                    </h1>
                    <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto" />
                </div>
            </section>

            {/* SERVICES LIST */}
            <section ref={containerRef} className="pb-0">
                {detailedServices.map((service, index) => {
                    const isFirst = index === 0;
                    const isLast = index === detailedServices.length - 1;
                    const isDarkMode = !isFirst && !isLast;

                    return (
                        <div
                            key={service.title}
                            className={`service-section py-32 px-6 md:px-24 flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center transition-colors duration-700 ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#FAF9F6] text-[#1a1a1a]'
                                }`}
                        >
                            {/* Image Box */}
                            <div className="image-box relative w-full lg:w-1/2 aspect-video overflow-hidden shadow-2xl border border-white/5 group">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
                                />
                                {service.isNew && (
                                    <div className="absolute top-8 left-8 z-10">
                                        <span className="relative flex h-6 w-14 items-center justify-center">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-20"></span>
                                            <span className="relative inline-flex rounded-full px-3 py-1 bg-[#D4AF37] text-black text-[10px] font-black tracking-widest leading-none border border-white/20 shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                                                NEW
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content Box */}
                            <div className="content-box w-full lg:w-1/2">
                                <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">0{index + 1}</span>
                                <h2 className="text-4xl md:text-5xl font-playfair font-black mb-4 uppercase tracking-tight">
                                    {service.title}
                                </h2>
                                <h3 className={`text-sm font-semibold tracking-[0.2em] uppercase mb-8 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                                    {service.tagline}
                                </h3>
                                <p className={`text-lg leading-relaxed mb-10 max-w-xl ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
                                    {service.desc}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                    {service.details.map((detail) => (
                                        <div key={detail} className="flex items-center gap-4">
                                            <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
                                            <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>{detail}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`px-10 py-4 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 hover:bg-[#D4AF37] hover:text-black ${!isDarkMode && 'hover:shadow-lg'
                                    }`}>
                                    Inquire Project
                                </button>
                            </div>
                        </div>
                    );
                })}
            </section>

            <Footer />
        </main>
    );
}
