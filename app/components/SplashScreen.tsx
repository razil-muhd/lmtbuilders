"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

const SEQUENCE = ["000", "011", "022", "033", "044", "055", "066", "077", "088", "099", "100"];

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const splashRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterWrapRef = useRef<HTMLDivElement>(null);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Logo fade in
    gsap.fromTo(logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Line grow
    gsap.fromTo(lineRef.current,
      { width: "0px" },
      { width: "180px", duration: 1.5, ease: "power2.inOut" }
    );

    // Smooth number scroll - synchronized with line animation
    const wrap = counterWrapRef.current;
    if (!wrap) return;

    // Animate the wrapper scrolling upward smoothly to reach 100
    gsap.fromTo(
      wrap,
      { y: 0 },
      {
        y: -1000, // Scroll exactly to 100 (10 numbers × 100px each)
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0,
      }
    );

    gsap.delayedCall(1.5, () => {
      gsap.fromTo(
        splashRef.current,
        { clipPath: "ellipse(120% 120% at 50% -10%)" },
        {
          clipPath: "ellipse(120% 0% at 50% -10%)",
          duration: 1.0,
          ease: "power4.inOut",
          onStart: () => {
            gsap.delayedCall(0.15, handleComplete);
          }
        }
      );
    });

  }, [handleComplete]);

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
     style={{ clipPath: "ellipse(120% 120% at 50% -10%)" }}
    >
      {/* Logo */}
      <div ref={logoRef} className="mb-16 opacity-0">
        <Image
          src="/logo.png"
          alt="Interior Design Logo"
          width={250}
          height={100}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Gold line */}
      <div
        ref={lineRef}
        className="mb-8 h-0.5"
       style={{ backgroundColor: "#D4AF37", width: "0px" }}
      />

      {/* Smooth scrolling counter */}
      <div style={{ position: "relative", height: "100px", width: "260px", overflow: "hidden" }}>
        <div
          ref={counterWrapRef}
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            fontSize: "80px",
            fontWeight: "700",
            color: "#000000",
            letterSpacing: "-2px",
            top: "0px",
            display: "flex",
            flexDirection: "column",
            y: 0,
          }}
        >
          {SEQUENCE.map((num, i) => (
            <div
              key={i}
              style={{
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}