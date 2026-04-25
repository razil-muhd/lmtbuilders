"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Standards from "./components/Standards";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasViewed = sessionStorage.getItem("splashViewed");
    if (hasViewed) {
      setSplashDone(true);
      setShowSplash(false);
    } else {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setSplashDone(true);
    setShowSplash(false);
    sessionStorage.setItem("splashViewed", "true");
  };

  return (
    <main>
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <Navbar logoAnimated={splashDone} />
      <Hero splashDone={splashDone} />
      <About />
      <Standards />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}