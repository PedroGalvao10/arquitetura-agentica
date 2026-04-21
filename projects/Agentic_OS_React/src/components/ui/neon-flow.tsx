import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Helper for random colors
const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"));
};

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesRef = useRef<Record<string, unknown> | null>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // Blind import to bypass TSC URL resolution
        const importTubes = new Function('url', 'return import(url)');
        const module = await importTubes(
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );
        const TubesCursor = module.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#5B21B6", "#0891B2", "#B45309"], // Agentic OS Cores Premium
            lights: {
              intensity: 80, // Subtil conforme especificado no manual
              colors: ["#7C3AED", "#EA580C", "#06B6D4", "#1E1B4B"],
            },
          },
        });

        tubesRef.current = app;

        const handleResize = () => {
          // Placeholder for resize, often the inner component hooks into windows natively
        };

        window.addEventListener("resize", handleResize);

        cleanup = () => {
          window.removeEventListener("resize", handleResize);
        };
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;

    const colors = randomColors(3);
    const lightsColors = randomColors(4);

    (tubesRef.current as any).tubes.setColors(colors);
    (tubesRef.current as any).tubes.setLightsColors(lightsColors);
  };

  return (
    <div
      className={cn(
        "relative w-[100vw] h-[100vh] overflow-hidden",
        className
      )}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block touch-none"
      />
      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
