import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particles-typography";
import { StarsBackground } from "@/components/ui/stars-background";
import { useEffect, useState } from "react";

export function SplashCover() {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "by Pedro Galvão";

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

  return (
    <section
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden z-[100]"
    >
      <StarsBackground />
      
      {/* Glow Effect */}
      <div className="absolute inset-0 z-1 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1)_0%,transparent_80%)]" />

      {/* Hero Typography Container */}
      <div className="relative z-10 w-full h-[55vh]">
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
      <div className="relative z-10 -mt-[2vh] font-['JetBrains_Mono',_monospace] text-[clamp(14px,1.4vw,20px)] text-[#94A3B8] tracking-widest h-[2em] flex items-center">
        {typed}
        {showCursor && (
          <span className="inline-block w-[2px] h-[1.1em] bg-[#7C3AED] ml-1 animate-blink" />
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#475569]">
          scroll to enter
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
