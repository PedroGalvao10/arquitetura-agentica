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

  useEffect(() => {
    if (!splashRef.current) return;

    // Transição de Revelação Estilo Cortina (Splash -> Hero)
    gsap.to(splashRef.current, {
      opacity: 0,
      scale: 1.1,
      y: -50,
      filter: "blur(20px)",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "60vh",
        scrub: true,
        onUpdate: (self) => {
          if (splashRef.current) {
            splashRef.current.style.pointerEvents = self.progress > 0.8 ? 'none' : 'auto';
          }
        }
      },
    });
  }, []);

  return (
    <AgenticHoverProvider>
      <div className="relative w-full min-h-screen bg-[#030305] text-white font-sans overflow-x-hidden">
      
      {/* GLOBAL BACKGROUNDS */}
      <div className="fixed inset-0 z-0">
        <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(18, 5, 28)"
            gradientBackgroundEnd="rgb(3, 3, 5)"
            firstColor="110, 86, 255"
            secondColor="33, 212, 253"
            thirdColor="192, 132, 252"
            fourthColor="20, 0, 40"
            fifthColor="5, 20, 40"
            pointerColor="140, 100, 255"
            size="80%"
            blendingValue="soft-light"
            interactive={true}
            containerClassName="w-full h-full"
            className="w-full h-full"
        />
      </div>

      <div className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-auto">
        <NeuralBackground color="#6e56ff" trailOpacity={0.15} particleCount={400} speed={0.6} />
      </div>

      <div className="fixed inset-0 z-0 opacity-80 mix-blend-color-dodge pointer-events-auto">
        <TubesBackground className="w-full h-screen bg-transparent" enableClickInteraction={true} />
      </div>

      {/* SPLASH COVER FIXA COM TRANSIÇÃO DE REVELAÇÃO */}
      <div 
        ref={splashRef} 
        className="fixed inset-0 z-[100] w-full h-screen"
      >
        <SplashCover />
      </div>
      
      {/* CONTEÚDO DO SITE */}
      <div className="relative z-10 w-full pt-[100vh]">
        <LandingPage />
      </div>

      <CinematicFooter />
      
      <FloatingProfile />

    </div>
    </AgenticHoverProvider>
  );
}

export default App;
