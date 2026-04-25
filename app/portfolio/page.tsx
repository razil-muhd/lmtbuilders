"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
    {
        id: 1,
        title: "Modern Commercial Plaza",
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
        span: "lg:col-span-2 lg:row-span-2",
        direction: "left"
    },
    {
        id: 2,
        title: "Luxury Retail Boutique",
        category: "Retail",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
        span: "lg:col-span-1 lg:row-span-1",
        direction: "top"
    },
    {
        id: 3,
        title: "Skyline Office Suites",
        category: "Office",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
        span: "lg:col-span-1 lg:row-span-2",
        direction: "right"
    },
    {
        id: 4,
        title: "Minimalist Penthouse",
        category: "Residential",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
        span: "lg:col-span-1 lg:row-span-1",
        direction: "bottom"
    },
    {
        id: 5,
        title: "Industrial Site Development",
        category: "Industrial",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2000&auto=format&fit=crop",
        span: "lg:col-span-2 lg:row-span-1",
        direction: "left"
    },
    {
        id: 6,
        title: "Geometric Facade Detail",
        category: "Architectural",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
        span: "lg:col-span-1 lg:row-span-2",
        direction: "right"
    },
    {
        id: 7,
        title: "Modern Loft Concept",
        category: "Residential",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        span: "lg:col-span-1 lg:row-span-1",
        direction: "top"
    }
];

export default function PortfolioPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Commercial", "Retail", "Residential", "Office"];

    useEffect(() => {
        // Header Animation
        gsap.fromTo(headerRef.current, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
        );

        // Grid Items "Building" Animation
        const items = gridRef.current?.querySelectorAll(".portfolio-item");
        if (items) {
            items.forEach((item, index) => {
                const direction = (item as HTMLElement).dataset.direction || "bottom";
                let x = 0, y = 0;
                
                if (direction === "left") x = -100;
                else if (direction === "right") x = 100;
                else if (direction === "top") y = -100;
                else if (direction === "bottom") y = 100;

                gsap.fromTo(item, 
                    { 
                        x: x, 
                        y: y, 
                        opacity: 0, 
                        scale: 0.8,
                        clipPath: "inset(100% 0% 0% 0%)"
                    },
                    { 
                        x: 0, 
                        y: 0, 
                        opacity: 1, 
                        scale: 1,
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 1.5,
                        ease: "expo.out",
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                        }
                    }
                );
            });
        }
    }, [filter]);

    const filteredItems = filter === "All" 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === filter);

    return (
        <main className="min-h-screen bg-[#FAF9F6] font-outfit overflow-x-hidden">
            <Navbar logoAnimated={true} />

            {/* HERO SECTION */}
            <section className="pt-40 pb-20 px-6 md:px-24">
                <div ref={headerRef} className="max-w-7xl mx-auto text-center md:text-left">
                    <span className="text-[#D4AF37] text-xs font-black tracking-[0.5em] uppercase mb-4 block">Our Work</span>
                    <h1 className="text-6xl md:text-8xl font-playfair font-black tracking-tighter uppercase mb-8 text-[#1a1a1a]">
                        Our <span className="text-[#D4AF37]">Portfolio</span>
                    </h1>
                    <div className="w-24 h-[2px] bg-[#D4AF37] mb-12" />
                    
                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 ${
                                    filter === cat ? "text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1" : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* PORTFOLIO GRID */}
            <section className="pb-32 px-4 md:px-24">
                <div 
                    ref={gridRef}
                    className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]"
                >
                    {filteredItems.map((item, index) => (
                        <div 
                            key={item.id}
                            data-direction={item.direction}
                            className={`portfolio-item relative overflow-hidden group cursor-pointer ${item.span}`}
                        >
                            <Image 
                                src={item.image} 
                                alt={item.title} 
                                fill 
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">0{index + 1} / {item.category}</span>
                                <h3 className="text-xl font-playfair font-black text-white uppercase tracking-tight">
                                    {item.title}
                                </h3>
                                <div className="w-8 h-[1px] bg-[#D4AF37] mt-4 group-hover:w-16 transition-all duration-500" />
                            </div>
                        </div>
                    ))}
                    

                </div>
            </section>

            <Footer />
        </main>
    );
}
