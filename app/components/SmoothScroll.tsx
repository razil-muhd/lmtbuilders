"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Synchronize Lenis with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Ensure ScrollTrigger refreshes when Lenis scrolls
    ScrollTrigger.refresh();
  }, []);

  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.5, 
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2
    }}>
      {children}
    </ReactLenis>
  );
}
