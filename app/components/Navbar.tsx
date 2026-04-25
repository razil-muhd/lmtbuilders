"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
    logoAnimated: boolean;
}

export default function Navbar({ logoAnimated }: NavbarProps) {
    const pathname = usePathname();
    const navRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (!logoAnimated) return;

        const tl = gsap.timeline({ delay: 0.05 });

        tl.fromTo(navRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        )
            .fromTo(logoRef.current,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
                "-=0.2"
            )
            .fromTo(".nav-item",
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.03, ease: "power2.out" },
                "-=0.2"
            )
            .fromTo(btnRef.current,
                { x: 20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, ease: "power4.out" },
                "-=0.2"
            );
    }, [logoAnimated]);

    const navLinks = ["Home", "Services", "Portfolio", "Contact"];

    return (
        <>
        <div className="fixed top-4 left-0 right-0 z-[150] flex justify-center px-4 md:px-6 font-outfit">
                <nav
                    ref={navRef}
                    className="relative flex items-center justify-between w-full max-w-7xl h-16 border border-white/5 opacity-0 overflow-hidden shadow-2xl"
                    style={{
                        background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
                        backdropFilter: "blur(12px)",
                        clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)",
                    }}
                >
                    {/* Left Section: Logo Icon + Text */}
                    <div className="flex items-center h-full pl-8 md:pl-14 pr-6 border-r border-white/5 cursor-pointer" onClick={() => window.location.href = "/"}>
                        <div ref={logoRef} className="flex items-center opacity-0">
                            <Image
                                src="/logo.png"
                                alt="LMT Logo"
                                width={50}
                                height={32}
                                className="object-contain"
                                priority
                            />
                            <div className="flex flex-col ml-3">
                                <span className="text-white text-sm md:text-base font-bold leading-none tracking-tight">LMT Builders</span>
                                <span className="hidden sm:block text-[#D4AF37] text-[8px] md:text-[9px] font-medium uppercase tracking-[0.1em] whitespace-nowrap">& Developers Pvt. Ltd.</span>
                            </div>
                        </div>
                    </div>

                    {/* Center Section: Links (Desktop) */}
                    <div ref={linksRef} className="hidden md:flex items-center gap-6 lg:gap-8 h-full px-4">
                        {navLinks.map((item) => {
                            const isHome = item === "Home";
                            const isServices = item === "Services";
                            const isPortfolio = item === "Portfolio";
                            const isContact = item === "Contact";
                            const targetPath = isHome ? "/" : isServices ? "/services" : isPortfolio ? "/portfolio" : isContact ? "/contact" : `#${item.toLowerCase()}`;
                            const isActive = pathname === targetPath || (isHome && pathname === "/");

                            return (
                                <Link
                                    key={item}
                                    href={targetPath}
                                    className={`nav-item opacity-0 relative text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 group z-20 ${
                                        isActive ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
                                    }`}
                                    style={{ cursor: "pointer !important" }}
                                >
                                    {item}
                                    <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 ${
                                        isActive ? "w-full" : "w-0 group-hover:w-full"
                                    }`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Section: Desktop CTA / Mobile Menu Toggle */}
                    <div className="flex h-full items-stretch">
                        <Link
                            ref={btnRef}
                            href="/contact"
                            className="hidden md:flex opacity-0 items-center px-8 lg:px-10 text-[11px] font-bold tracking-widest uppercase text-black transition-all duration-300 hover:brightness-110 cursor-pointer"
                            style={{
                                backgroundColor: "#D4AF37",
                                clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)"
                            }}
                        >
                            Get Quote
                        </Link>
                        
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex md:hidden items-center px-6 text-white hover:text-[#D4AF37] transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {isMenuOpen ? (
                                    <path d="M18 6L6 18M6 6l12 12" />
                                ) : (
                                    <path d="M4 12h16M4 6h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[200] md:hidden bg-[#080808]/95 backdrop-blur-xl flex flex-col items-center justify-center font-outfit"
                    >
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-8 right-8 text-white hover:text-[#D4AF37] transition-colors"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((item, i) => {
                                const isHome = item === "Home";
                                const isServices = item === "Services";
                                const isPortfolio = item === "Portfolio";
                                const isContact = item === "Contact";
                                const targetPath = isHome ? "/" : isServices ? "/services" : isPortfolio ? "/portfolio" : isContact ? "/contact" : `#${item.toLowerCase()}`;
                                const isActive = pathname === targetPath || (isHome && pathname === "/");

                                return (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            href={targetPath}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`text-2xl font-black tracking-[0.2em] uppercase transition-colors z-20 ${
                                                isActive ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
                                            }`}
                                            style={{ cursor: "pointer !important" }}
                                        >
                                            {item}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8"
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-10 py-4 bg-[#D4AF37] text-black text-sm font-black tracking-widest uppercase rounded-sm hover:brightness-110 transition-all"
                                >
                                    Get Quote
                                </Link>
                            </motion.div>
                        </div>

                        {/* Branding at bottom of mobile menu */}
                        <div className="absolute bottom-12 flex flex-col items-center opacity-30">
                            <Image src="/logo.png" alt="Logo" width={40} height={25} className="mb-2 grayscale invert" />
                            <span className="text-[10px] text-white tracking-widest uppercase">LMT Builders & Developers</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

