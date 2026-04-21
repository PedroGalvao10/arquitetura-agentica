import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplashCover } from "@/components/sections/SplashCover";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { AgenticHoverProvider } from "@/components/ui/agentic-hover-link";
import { LandingPage } from "@/components/layout/LandingPage";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingProfile } from "@/components/ui/floating-profile";

// ─── Atmospheric Background System (5 Layers) ───
import { AuroraWebGL } from "@/components/ui/aurora-webgl";
import { ChromaticWaveWebGL } from "@/components/ui/chromatic-wave-webgl";
import { IcosahedronWebGL } from "@/components/ui/icosahedron-webgl";
import { FluidCursorWebGL } from "@/components/ui/fluid-cursor-webgl";
import NeuralBackground from "@/components/ui/flow-field-background";

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
      <div className="relative w-full min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
        <Navbar />
        
        {/* ═══ ATMOSPHERIC BACKGROUND SYSTEM ═══
             5 camadas empilhadas com mix-blend-mode: screen (aditivo)
             Tudo fixed + pointer-events: none → conteúdo intocável */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
          {/* z-0: Aurora Nebula — FBM noise, brilho atmosférico ~6% */}
          <AuroraWebGL />

          {/* z-1: Chromatic Wave — Aberração cromática senoidal */}
          <ChromaticWaveWebGL />

          {/* z-2: Icosahedron Wireframe — Sólido platônico rotativo */}
          <IcosahedronWebGL />

          {/* z-3: Fluid Cursor — Glow FBM seguindo o mouse */}
          <FluidCursorWebGL />

          {/* z-4: Neural Particles — Canvas 2D flow field (camada mais alta) */}
          <div className="absolute inset-0" style={{ zIndex: 4, mixBlendMode: 'screen', opacity: 0.5 }}>
            <NeuralBackground 
              color="#6e56ff" 
              trailOpacity={0.04} 
              particleCount={600} 
              particleSize={2.0}
              speed={0.3} 
            />
          </div>
        </div>

        {/* SPLASH COVER */}
        <div 
          ref={splashRef} 
          className="fixed inset-0 z-[100] w-full h-screen will-change-[clip-path,opacity] bg-[#030305]"
        >
          <SplashCover />
        </div>

        {/* CONTEÚDO PRINCIPAL (LANDING PAGE COM PIN) */}
        <main 
          ref={landingRef} 
          className="relative z-10 w-full min-h-screen overflow-visible will-change-[transform,opacity]"
        >
          <LandingPage />
        </main>

        <CinematicFooter />
        <FloatingProfile />
      </div>
    </AgenticHoverProvider>
  );
}

export default App;
