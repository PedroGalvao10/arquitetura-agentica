import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particles-typography";
import { StarsBackground } from "@/components/ui/stars-background";
import { useEffect, useState, useRef } from "react";
import cosmosBg from "@/assets/deep-cosmos.png";

export function SplashCover() {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "by Pedro Galvão";
  
  const typographyRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const cosmosRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setTyped(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2400);
        }
      }, 55); 
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleEnter = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section
      onClick={handleEnter}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden z-[100] cursor-pointer group"
    >
      <StarsBackground density={2000} opacity={0.8} />

      {/* Background Cosmos Image with Frosted Filter */}
      <img 
        ref={cosmosRef}
        src={cosmosBg} 
        alt="Cosmos"
        className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen scale-110 pointer-events-none transition-all duration-[3000ms] group-hover:scale-100 blur-[8px] saturate-[1.2]"
      />
      
      {/* Frosted/Matte Overlay */}
      <div className="absolute inset-0 z-[1] bg-[#030305]/40 backdrop-blur-[2px] pointer-events-none" />
      
      {/* Premium Vignette & Glow Effect */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.08)_0%,rgba(3,3,5,0.7)_70%,#030305_100%)]" />

      {/* Hero Typography Container */}
      <div ref={typographyRef} className="relative z-10 w-full h-[55vh] will-change-transform">
        <CursorDrivenParticleTypography
          text="Agentic OS"
          fontSize={140}
          fontFamily="'Cabinet Grotesk', 'Geist', sans-serif"
          particleSize={1.8}
          particleDensity={5}
          dispersionStrength={22}
          returnSpeed={0.06}
          color="#A78BFA"
          className="!min-h-0 h-full"
        />
      </div>

      {/* Signature & Typing Effect */}
      <div ref={signatureRef} className="relative z-10 -mt-[2vh] font-['JetBrains_Mono',_monospace] text-[clamp(14px,1.4vw,20px)] text-[#94A3B8] tracking-widest h-[2em] flex items-center will-change-transform">
        {typed}
        {showCursor && (
          <span className="inline-block w-[2px] h-[1.1em] bg-[#7C3AED] ml-1 animate-blink" />
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#7C3AED] font-bold group-hover:scale-110 transition-transform">
          CLIQUE OU SCROLL PARA ENTRAR
        </span>
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className={`w-2 h-2 border-r border-b border-[#7C3AED] -mt-1 opacity-0 animate-fade-down ${i === 0 ? '' : i === 1 ? 'delay-200' : 'delay-[400ms]'}`}
          />
        ))}
      </div>
    </section>
  );
}
