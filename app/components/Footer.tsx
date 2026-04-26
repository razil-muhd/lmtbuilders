"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Company: ["About Us", "Our Process", "Careers", "Contact"],
        Services: ["Architectural Design", "Interior Planning", "Project Management", "Renovations"],
        Resources: ["Blog", "Case Studies", "FAQs", "Privacy Policy"]
    };

    return (
        <footer className="relative bg-[#0a0a0a] text-white pt-20 pb-10 overflow-hidden font-outfit border-t border-white/5">
            {/* Subtle Gradient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-6">
                            <Image
                                src="/logo.png"
                                alt="LMT Logo"
                                width={50}
                                height={32}
                                className="object-contain"
                            />
                            <div className="flex flex-col ml-3">
                                <span className="text-white text-lg font-bold leading-none tracking-tight">LMT Builders</span>
                                <span className="text-[#D4AF37] text-[10px] font-medium uppercase tracking-[0.1em]">Developers Pvt. Ltd.</span>
                            </div>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
                            Elevating architectural standards through innovative design and meticulous craftsmanship. Building your vision with precision and luxury.
                        </p>
                        <div className="mb-8">
                            <a href="mailto:info@lmtbuilders.com" className="text-[#D4AF37] text-sm hover:text-white transition-colors duration-300 font-medium">
                                info@lmtbuilders.com
                            </a>
                        </div>
                        <div className="flex gap-4">
                            {["facebook", "instagram", "linkedin", "twitter"].map((social) => (
                                <a
                                    key={social}
                                    href={`#${social}`}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37] group"
                                >
                                    <span className="sr-only">{social}</span>
                                    <div className="w-4 h-4 bg-white/20 group-hover:bg-[#D4AF37] transition-colors" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-8">{title}</h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href={link === "Contact" ? "/contact" : `#${link.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="text-white/50 text-sm hover:text-white transition-colors duration-300 flex items-center group"
                                        >
                                            <span className="w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-3 mr-0 group-hover:mr-2" />
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-medium tracking-widest uppercase text-white/40">
                    <p>© {currentYear} LMT Builders & Developers Pvt. Ltd. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>

            {/* Decorative Blueprint Lines */}
            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                    <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.1" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
                    <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.1" />
                </svg>
            </div>
        </footer>
    );
}
