"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Edges, Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

function TechnicalBuilding({ splashDone }: { splashDone?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const mainTowerRef = useRef<THREE.Group>(null);
  const leftBuildingRef = useRef<THREE.Group>(null);
  const rightBuildingRef = useRef<THREE.Group>(null);
  const craneRef = useRef<THREE.Group>(null);
  const groundRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.002;
    if (craneRef.current) craneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    if (lightRef.current) lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
  });

  useEffect(() => {
    if (!splashDone) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Initial state
    const parts = [mainTowerRef.current, leftBuildingRef.current, rightBuildingRef.current, craneRef.current, groundRef.current];
    parts.forEach(p => { if (p) p.scale.set(0, 0, 0); });

    // 1. Ground plate
    if (groundRef.current) {
      tl.to(groundRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.7, ease: "power2.out" });
    }

    // 2. Main Tower - animate its children (floors) one by one
    if (mainTowerRef.current) {
      tl.to(mainTowerRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.1 }, "-=0.4");
      const floors = Array.from(mainTowerRef.current.children);
      tl.from(floors, {
        y: -5,
        stagger: 0.04,
        duration: 0.6,
        ease: "back.out(1.2)"
      }, "-=0.2");
      tl.from(floors.map(f => f.scale), {
        x: 0, y: 0, z: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: "back.out(1.2)"
      }, "<");
    }

    // 3. Side buildings
    if (leftBuildingRef.current && rightBuildingRef.current) {
      tl.to([leftBuildingRef.current.scale, rightBuildingRef.current.scale], {
        x: 1, y: 1, z: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");

      const leftChildren = Array.from(leftBuildingRef.current.children);
      const rightChildren = Array.from(rightBuildingRef.current.children);
      const allChildren = [...leftChildren, ...rightChildren];

      tl.from(allChildren, {
        y: -2,
        stagger: 0.03,
        duration: 0.5,
        ease: "back.out(1.1)"
      }, "-=0.7");
      tl.from(allChildren.map(c => c.scale), {
        x: 0, y: 0, z: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: "back.out(1.1)"
      }, "<");
    }

    // 4. Crane
    if (craneRef.current) {
      tl.to(craneRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.0, ease: "elastic.out(1, 0.75)" }, "-=0.5");
    }

  }, [splashDone]);

  return (
    <group ref={groupRef}>
      {/* MAIN TOWER */}
      <group ref={mainTowerRef} position={[0, 0, 0]} scale={[0, 0, 0]}>
        <Box args={[2.2, 10, 2.2]} position={[0, 5, 0]}>
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
          <Edges color="#D4AF37" threshold={10} />
        </Box>
        <Box args={[1.8, 9, 0.05]} position={[0, 5, 1.12]}>
          <meshStandardMaterial color="#D4AF37" transparent opacity={0.08} metalness={1} roughness={0} />
        </Box>
        {[...Array(11)].map((_, i) => (
          <Box key={i} args={[3.2, 0.08, 3.2]} position={[0, i * 0.95, 0]}>
            <meshStandardMaterial color="#222" metalness={0.5} />
            <Edges color="#D4AF37" threshold={10} />
          </Box>
        ))}
        {[...Array(9)].map((_, floor) =>
          [-0.6, 0, 0.6].map((x, col) => (
            <Box key={`w-${floor}-${col}`} args={[0.25, 0.35, 0.06]} position={[x, floor * 0.95 + 0.5, 1.15]}>
              <meshStandardMaterial color="#000" emissive="#D4AF37" emissiveIntensity={Math.random() > 0.4 ? 0.8 : 0.1} />
            </Box>
          ))
        )}
        <Box args={[1.2, 0.8, 1.2]} position={[0, 10.4, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
        </Box>
        <Box args={[0.3, 1.5, 0.3]} position={[0, 11.5, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0} />
        </Box>
        <Sphere args={[0.15, 16, 16]} position={[0, 12.3, 0]}>
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={5} />
          <pointLight ref={lightRef} color="#D4AF37" intensity={2} distance={8} />
        </Sphere>
      </group>

      {/* LEFT BUILDING */}
      <group ref={leftBuildingRef} position={[-3.2, 0, 0]} scale={[0, 0, 0]}>
        <Box args={[1.6, 6.5, 1.6]} position={[0, 3.25, 0]}>
          <meshStandardMaterial color="#161616" metalness={0.8} roughness={0.2} />
          <Edges color="#D4AF37" threshold={10} />
        </Box>
        {[...Array(7)].map((_, i) => (
          <Box key={i} args={[2.2, 0.06, 2.2]} position={[0, i * 0.95, 0]}>
            <meshStandardMaterial color="#222" />
            <Edges color="#D4AF37" threshold={10} />
          </Box>
        ))}
        {[...Array(6)].map((_, floor) =>
          [-0.35, 0.35].map((x) => (
            <Box key={`lw-${floor}-${x}`} args={[0.2, 0.3, 0.05]} position={[x, floor * 0.95 + 0.5, 0.83]}>
              <meshStandardMaterial color="#000" emissive="#D4AF37" emissiveIntensity={Math.random() > 0.5 ? 0.6 : 0.05} />
            </Box>
          ))
        )}
        <Box args={[0.8, 0.5, 0.8]} position={[0, 6.75, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
        </Box>
      </group>

      {/* RIGHT BUILDING */}
      <group ref={rightBuildingRef} position={[3.2, 0, 0]} scale={[0, 0, 0]}>
        <Box args={[1.4, 5, 1.4]} position={[0, 2.5, 0]}>
          <meshStandardMaterial color="#161616" metalness={0.8} roughness={0.2} />
          <Edges color="#D4AF37" threshold={10} />
        </Box>
        {[...Array(6)].map((_, i) => (
          <Box key={i} args={[2, 0.06, 2]} position={[0, i * 0.85, 0]}>
            <meshStandardMaterial color="#222" />
            <Edges color="#D4AF37" threshold={10} />
          </Box>
        ))}
        {[...Array(5)].map((_, floor) =>
          [-0.3, 0.3].map((x) => (
            <Box key={`rw-${floor}-${x}`} args={[0.18, 0.28, 0.05]} position={[x, floor * 0.85 + 0.45, 0.73]}>
              <meshStandardMaterial color="#000" emissive="#D4AF37" emissiveIntensity={Math.random() > 0.5 ? 0.6 : 0.05} />
            </Box>
          ))
        )}
        <Box args={[0.7, 0.4, 0.7]} position={[0, 5.2, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
        </Box>
      </group>

      {/* CRANE */}
      <group ref={craneRef} position={[2, 0, -2]} scale={[0, 0, 0]}>
        <Box args={[0.18, 13, 0.18]} position={[0, 6.5, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </Box>
        <Box args={[7, 0.12, 0.12]} position={[-2.5, 13, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </Box>
        <Box args={[2.5, 0.12, 0.12]} position={[2, 13, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </Box>
        <Box args={[0.02, 4, 0.02]} position={[-5.5, 11, 0]}>
          <meshBasicMaterial color="#fff" transparent opacity={0.5} />
        </Box>
        <Sphere args={[0.22, 16, 16]} position={[-5.5, 8.8, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
        </Sphere>
      </group>

      {/* GROUND */}
      <group ref={groundRef} scale={[0, 0, 0]}>
        <Box args={[12, 0.12, 10]} position={[0, -0.06, 0]}>
          <meshStandardMaterial color="#0d0d0d" metalness={0.9} roughness={0.1} />
          <Edges color="#D4AF37" threshold={10} />
        </Box>
        {[-4, -2, 0, 2, 4].map((x) => (
          <Box key={`gx-${x}`} args={[0.01, 0.01, 10]} position={[x, 0.01, 0]}>
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.15} />
          </Box>
        ))}
        {[-4, -2, 0, 2, 4].map((z) => (
          <Box key={`gz-${z}`} args={[12, 0.01, 0.01]} position={[0, 0.01, z]}>
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.15} />
          </Box>
        ))}
        {[[-5.5, -4.5], [-5.5, 4.5], [5.5, -4.5], [5.5, 4.5]].map(([x, z], i) => (
          <group key={i} position={[x, 0, z]}>
            <Cylinder args={[0.06, 0.06, 1.5, 8]} position={[0, 0.75, 0]}>
              <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0} />
            </Cylinder>
            <Sphere args={[0.1, 8, 8]} position={[0, 1.6, 0]}>
              <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={2} />
            </Sphere>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function Hero({ splashDone }: { splashDone?: boolean }) {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Independent animation for 3D model container
  useEffect(() => {
    gsap.fromTo(canvasRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "linear", delay: 0.1 }
    );
  }, []);

  // Content animation triggered by splash screen completion
  useEffect(() => {
    if (!splashDone) return;

    const tl = gsap.timeline({ delay: 0.05 });
    tl.fromTo(sidebarRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    )
      .fromTo(tagRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4 },
        "-=0.3"
      )
      .fromTo([line1Ref.current, line2Ref.current, line3Ref.current],
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power4.out" },
        "-=0.3"
      )

      .fromTo(subtitleRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.4 },
        "-=0.3"
      )
      .fromTo(btnRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.4 },
        "-=0.2"
      )
      .fromTo(statsRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.4 },
        "-=0.2"
      )
      .fromTo(socialRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-=0.2"
      );
  }, [splashDone]);

  return (
    <section
      id="home"
      className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-hidden"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 75% 50%, rgba(212,175,55,0.07) 0%, transparent 60%)" }}
      />

      {/* Sidebar */}
      <div ref={sidebarRef}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 opacity-0 z-20"
        style={{ marginTop: "30px" }}
      >
        <span className="text-[10px] font-bold tracking-[0.3em]" style={{ color: "#D4AF37" }}>01</span>
        <div className="relative w-[1px] h-24" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          <div className="absolute top-0 left-0 w-full h-1/3" style={{ backgroundColor: "#D4AF37" }} />
        </div>
        <span className="text-[10px] font-bold tracking-[0.3em] text-white/20">04</span>
      </div>

      {/* Main layout */}
      <div className="relative z-[60] w-full flex flex-col lg:flex-row items-center px-6 md:px-24 pt-32 lg:pt-0 gap-0">

        {/* LEFT — Text content */}
        <div className="flex flex-col justify-center w-full lg:w-[45%] lg:pr-8 items-start text-left">

          {/* Section tag */}
          <div ref={tagRef} className="flex items-center justify-start gap-3 mb-4 opacity-0">
            <span className="text-[10px] font-bold tracking-[0.3em]" style={{ color: "#D4AF37" }}>01</span>
            <div className="w-8 h-[1px]" style={{ backgroundColor: "rgba(212,175,55,0.4)" }} />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white">LMT Builders</span>
          </div>

          {/* Hero text */}
          <div className="mb-4">
            <div className="overflow-hidden pb-1">
              <div ref={line1Ref} className="font-playfair font-black leading-[0.95] tracking-tight opacity-0 text-white"
                style={{ fontSize: "clamp(32px, 3.8vw, 54px)" }}>
                Engineered
              </div>
            </div>
            <div className="overflow-hidden pb-1">
              <div ref={line2Ref} className="font-playfair font-black leading-[0.95] tracking-tight opacity-0 text-white"
                style={{ fontSize: "clamp(32px, 3.8vw, 54px)" }}>
                for every
              </div>
            </div>
            <div className="overflow-hidden pb-1">
              <div ref={line3Ref} className="font-playfair font-black leading-[0.95] tracking-tight opacity-0 text-white"
                style={{ fontSize: "clamp(32px, 3.8vw, 54px)" }}>
                Structure
              </div>
            </div>
          </div>



          {/* Description */}
          <div ref={subtitleRef} className="mb-6 opacity-0">
            <p className="text-white text-sm md:text-[15px] leading-[1.7] tracking-wide max-w-[450px]">
              From foundation to skyline, LMT delivers construction and interior
              excellence with precision, integrity and innovation.
            </p>
          </div>

          {/* Button — slanted like navbar */}
          <div ref={btnRef} className="opacity-0 mb-8">
            <Link href="/portfolio"
              className="inline-flex items-center gap-6 px-10 py-4 text-black text-[10px] font-black tracking-[0.25em] uppercase transition-all duration-300 hover:brightness-110 hover:gap-8"
              style={{
                backgroundColor: "#D4AF37",
                clipPath: "polygon(0% 0%, 88% 0%, 100% 100%, 0% 100%)",
                paddingRight: "48px",
              }}>
              Explore Collection
              <span>→</span>
            </Link>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex justify-start gap-8 md:gap-12 opacity-0">
            {[
              { value: "200+", label: "Projects" },
              { value: "15+", label: "Years" },
              { value: "50+", label: "Experts" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xl md:text-2xl font-black" style={{ color: "#D4AF37" }}>{s.value}</div>
                <div className="text-white text-[8px] md:text-[9px] tracking-[0.2em] uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — 3D Canvas */}
        <div ref={canvasRef} className="relative opacity-0 w-full lg:w-[55%] h-[50vh] lg:h-screen">
          <Canvas camera={{ position: [16, 10, 16], fov: 44 }} shadows>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" castShadow />
            <pointLight position={[-8, 15, -8]} intensity={3} color="#D4AF37" />
            <pointLight position={[8, 5, 8]} intensity={1} color="#D4AF37" />
            <spotLight position={[0, 25, 0]} angle={0.3} intensity={2} color="#fff" penumbra={1} />
            <group position={[0, -6, 0]}>
              <TechnicalBuilding splashDone={splashDone} />
            </group>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={!isMobile}
              minPolarAngle={Math.PI / 5}
              maxPolarAngle={Math.PI / 2.2}
            />
          </Canvas>
          <div className="absolute bottom-10 right-6 pointer-events-none">
            <span className="text-[8px] text-white/20 tracking-[0.3em] uppercase">{isMobile ? "Interactive 3D Model" : "Drag to Rotate Model"}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-8 left-6 md:left-24 right-6 md:right-10 flex justify-between items-end z-20">
        <div ref={socialRef} className="flex items-center gap-3 opacity-0">
          {["IG", "TW", "FB"].map((s) => (
            <button key={s}
              className="w-8 h-8 rounded-full border flex items-center justify-center text-[9px] font-bold transition-all duration-300 hover:text-[#D4AF37] hover:border-[#D4AF37]"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.2)" }}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
          <span className="text-[8px] font-black tracking-[0.4em] text-white/20 uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
}