import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import NeuralBackground from "@/components/ui/flow-field-background";
import { TubesBackground } from "@/components/ui/neon-flow";
import { SplashCover } from "@/components/sections/SplashCover";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { AgenticHoverProvider } from "@/components/ui/agentic-hover-link";
import { LandingPage } from "@/components/layout/LandingPage";

import { FloatingProfile } from "@/components/ui/floating-profile";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function App() {
  const splashRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!splashRef.current || !landingRef.current) return;

    // Inicializa o clip-path
    gsap.set(splashRef.current, { clipPath: "circle(100% at 50% 50%)" });

    // Timeline para a transição do Splash (Sticky Reveal)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "100vh",
        scrub: 1,
      },
    });

    tl.to(splashRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      scale: 1.1,
      filter: "blur(15px) brightness(0.5)",
      opacity: 0,
      duration: 1,
    });

    tl.fromTo(landingRef.current, 
      { opacity: 0, scale: 0.95, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6 }, 
      0.4
    );

    // Gestão de eventos
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "90vh",
      onUpdate: (self) => {
        if (splashRef.current) {
          splashRef.current.style.pointerEvents = self.progress > 0.8 ? 'none' : 'auto';
        }
      }
    });
  }, []);

  return (
    <AgenticHoverProvider>
      <div className="relative w-full min-h-screen bg-[#030305] text-white font-sans">
        
        {/* GLOBAL BACKGROUNDS - Optimize density for performance */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <BackgroundGradientAnimation
              blendingValue="soft-light"
              interactive={true}
              containerClassName="w-full h-full"
              className="w-full h-full"
          />
        </div>

        {/* Reduced Particle Density for better loading/GPU performance */}
        <div className="fixed inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none">
          <NeuralBackground color="#6e56ff" trailOpacity={0.1} particleCount={150} speed={0.4} />
        </div>

        <div className="fixed inset-0 z-0 opacity-80 mix-blend-color-dodge pointer-events-none">
          <TubesBackground className="w-full h-screen bg-transparent" enableClickInteraction={true} />
        </div>

        {/* SPLASH COVER - Fixed until scrolled */}
        <div 
          ref={splashRef} 
          className="fixed inset-0 z-[100] w-full h-screen will-change-[clip-path,opacity,transform] overflow-hidden"
        >
          <SplashCover />
        </div>
        
        {/* CONTEÚDO DO SITE - Natural flow after splash height */}
        <div className="relative z-10 w-full pt-[100vh]">
          <div ref={landingRef} className="w-full h-full">
             <LandingPage />
          </div>
        </div>

        <CinematicFooter />
        <FloatingProfile />
      </div>
    </AgenticHoverProvider>
  );
}

export default App;
