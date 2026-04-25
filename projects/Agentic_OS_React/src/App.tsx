import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplashCover } from "@/components/sections/SplashCover";
import { AgenticHoverProvider } from "@/components/ui/agentic-hover-link";
import LandingPage from "@/components/layout/LandingPage";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingProfile } from "@/components/ui/floating-profile";

// ─── Atmospheric Background System (5 Layers) ───
import { AuroraWebGL } from "@/components/ui/aurora-webgl";
import { ChromaticWaveWebGL } from "@/components/ui/chromatic-wave-webgl";
import { WovenParticleGeometry } from "@/components/ui/woven-particle-geometry";
import { FluidSimulationBackground } from "@/components/ui/fluid-simulation-background";
import NeuralBackground from "@/components/ui/flow-field-background";
import { StarsBackground } from "@/components/ui/stars-background";
import cosmicBg from './assets/cosmic_bg.png';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function App() {
  const splashRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!splashRef.current || !landingRef.current) return;

    // Garante estado inicial limpo
    gsap.set(splashRef.current, { clipPath: "circle(100% at 50% 50%)", opacity: 1 });
    gsap.set(landingRef.current, { opacity: 0, scale: 0.95, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "100vh",
        scrub: 1.5, 
        pin: landingRef.current,
        pinSpacing: true, // Isso substitui o divisor h-screen manual
        invalidateOnRefresh: true,
      },
    });

    // Fase 2: Conteúdo da Capa "voa" para longe (Zoom Out)
    tl.to(".will-change-transform", {
        scale: 1.5,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1,
        ease: "power2.in"
    }, 0);

    // Fase 3: Abertura da Iris (Cosmos Reveal)
    tl.to(splashRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      opacity: 0,
      scale: 1.2,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0.2);

    // Fase 4: Landing Page surge suavemente
    tl.to(landingRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
    }, 0.5);

    // Desativa eventos do splash quando sumir
    ScrollTrigger.create({
      trigger: "body",
      start: "90vh top",
      onEnter: () => {
        if (splashRef.current) splashRef.current.style.display = 'none';
      },
      onLeaveBack: () => {
        if (splashRef.current) splashRef.current.style.display = 'block';
      }
    });

    // Fallback: Revela o site automaticamente após 8 segundos se o usuário não rolar
    const autoReveal = setTimeout(() => {
      if (window.scrollY < 10) {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    }, 8500);

    return () => {
      clearTimeout(autoReveal);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <AgenticHoverProvider>
      {/* ═══ ATMOSPHERIC BACKGROUND SYSTEM (Fixed) ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-[#030305] z-0">
        <div className="absolute inset-0 z-0"><StarsBackground density={1400} opacity={0.8} /></div>
        <div 
          className="absolute inset-0 z-1 opacity-45 cosmic-bg-overlay mix-blend-screen"
          style={{ "--cosmic-url": `url(${cosmicBg})` } as React.CSSProperties}
        />
        <div className="absolute inset-0 z-2 opacity-45"><AuroraWebGL /></div>
        <div className="absolute inset-0 z-3 opacity-35"><ChromaticWaveWebGL /></div>
        <div className="absolute inset-0 z-4 opacity-50"><WovenParticleGeometry /></div>
        <div className="absolute inset-0 z-5 opacity-60">
          <NeuralBackground color="#8b5cf6" trailOpacity={0.15} particleCount={1400} particleSize={2.5} speed={0.4} />
        </div>
        <div className="absolute inset-0 z-6 opacity-80 mix-blend-screen pointer-events-none">
          <FluidSimulationBackground />
        </div>
      </div>

      {/* ═══ MAIN CONTENT LAYER (Scrollable) ═══ */}
      <div className="relative w-full min-h-screen text-white font-sans selection:bg-purple-500/30 z-10">
        <Navbar />

        {/* SPLASH COVER (Initial Reveal) */}
        <div 
          ref={splashRef} 
          className="fixed inset-0 z-[100] w-full h-screen will-change-[clip-path,opacity] bg-[#030305]"
        >
          <SplashCover />
        </div>

        {/* LANDING PAGE CONTENT (Scroll Triggered) */}
        <main 
          ref={landingRef} 
          className="relative z-10 w-full min-h-screen overflow-visible will-change-[transform,opacity]"
        >
          <LandingPage />
        </main>

        <FloatingProfile />
      </div>
    </AgenticHoverProvider>
  );
}

export default App;
