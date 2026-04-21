import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import NeuralBackground from "@/components/ui/flow-field-background";
import { TubesBackground } from "@/components/ui/neon-flow";
import { SplashCover } from "@/components/sections/SplashCover";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { AgenticHoverProvider } from "@/components/ui/agentic-hover-link";
import { LandingPage } from "@/components/layout/LandingPage";
import { Navbar } from "@/components/layout/Navbar";

import { FloatingProfile } from "@/components/ui/floating-profile";
import { StarsBackground } from "@/components/ui/stars-background";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function App() {
  const splashRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const [warpSpeed, setWarpSpeed] = useState(0);
  
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

    // Fase 1: Início do Warp Speed e Zoom Out da Tipografia
    tl.to({ val: 0 }, {
      val: 1,
      duration: 0.8,
      onUpdate: function() {
        setWarpSpeed(this.targets()[0].val);
      },
      ease: "power2.in"
    }, 0);

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
      <div className="relative w-full min-h-screen bg-[#030305] text-white font-sans selection:bg-purple-500/30">
        <Navbar />
        
        {/* Camadas de Fundo Otimizadas */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Layer 1: Ambient Gradients (Very Fast) */}
          <div className="absolute inset-0 z-0">
             <BackgroundGradientAnimation
                blendingValue="soft-light"
                interactive={false}
                containerClassName="w-full h-full"
                className="w-full h-full opacity-60"
             />
          </div>

          {/* Layer 1.5: Stars Background with Warp Control */}
          <StarsBackground density={800} opacity={0.4} warpSpeed={warpSpeed} />

          {/* Layer 2: Neural Particles (Reduced for performance) */}
          <div className="absolute inset-0 z-10 opacity-30 mix-blend-screen">
            <NeuralBackground 
              color="#6e56ff" 
              trailOpacity={0.05} 
              particleCount={80} 
              speed={0.2} 
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
