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
      className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden z-[100]"
    >
      <StarsBackground />
      
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 80%)"
      }}/>

      <div style={{ position: "relative", zIndex: 10, width: "100%", height: "55vh" }}>
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

      <div style={{
        position: "relative", zIndex: 10, marginTop: "-2vh",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "clamp(14px, 1.4vw, 20px)",
        color: "#94A3B8",
        letterSpacing: "0.05em",
        height: "2em",
        display: "flex", alignItems: "center"
      }}>
        {typed}
        {showCursor && (
          <span style={{
            display: "inline-block", width: "2px", height: "1.1em",
            background: "#7C3AED", marginLeft: "4px",
            animation: "blink 0.8s step-end infinite"
          }}/>
        )}
      </div>

      <div style={{
        position: "absolute", bottom: "40px", left: "50%",
        transform: "translateX(-50%)", zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px"
      }}>
        <span style={{ fontSize: "10px", letterSpacing: "0.2em",
          textTransform: "uppercase", color: "#475569" }}>
          scroll to enter
        </span>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: "8px", height: "8px",
            borderRight: "1px solid #7C3AED",
            borderBottom: "1px solid #7C3AED",
            transform: "rotate(45deg)", marginTop: "-4px",
            animation: `fadeDown 1.5s ease-in-out ${i * 0.2}s infinite`,
            opacity: 0
          }}/>
        ))}
      </div>
    </section>
  );
}
