"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { agenticPreviewData } from "@/lib/preview-data";

type PreviewDataConfig = {
  image: string;
  title: string;
  subtitle: string;
};

// -------------------------------------------------------------------------
// CONTEXT FOR GLOBAL CARD STATE
// -------------------------------------------------------------------------
interface HoverPreviewContextType {
  handleHoverStart: (key: string, e: React.MouseEvent) => void;
  handleHoverMove: (e: React.MouseEvent) => void;
  handleHoverEnd: () => void;
}

const HoverPreviewContext = createContext<HoverPreviewContextType | null>(null);

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------
const STYLES = `
  .agentic-hover-link {
    color: #A78BFA;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    display: inline-block;
  }

  .agentic-hover-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, #7C3AED, #06B6D4);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .agentic-hover-link:hover::after { width: 100%; }
  .agentic-hover-link:hover { color: #C4B5FD; }

  .preview-card {
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, opacity;
  }

  .preview-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .preview-card-inner {
    background: rgba(8, 8, 15, 0.9);
    border: 1px solid rgba(124, 58, 237, 0.3);
    border-radius: 12px;
    padding: 6px;
    box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.9),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      0 0 40px rgba(124, 58, 237, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    overflow: hidden;
  }

  .preview-card img {
    width: 260px;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
    display: block;
  }

  .preview-card-title {
    padding: 12px 8px 4px;
    font-size: 0.9rem;
    color: #F8F8FF;
    font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .preview-card-subtitle {
    padding: 0 8px 8px;
    font-size: 0.75rem;
    color: #94A3B8;
  }
`;

// -------------------------------------------------------------------------
// PROVIDER
// -------------------------------------------------------------------------
export const AgenticHoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [activePreview, setActivePreview] = useState<PreviewDataConfig | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Object.values(agenticPreviewData).forEach((data) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = data.image;
    });
  }, []);

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 280;
    const cardHeight = 220;
    const offsetY = 20;

    let x = e.clientX - cardWidth / 2;
    let y = e.clientY - cardHeight - offsetY;

    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20;
    }
    if (x < 20) {
      x = 20;
    }

    if (y < 20) {
      y = e.clientY + offsetY;
    }

    setPosition({ x, y });
  }, []);

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      const data = (agenticPreviewData as any)[key];
      if (data) {
        setActivePreview(data);
        setIsVisible(true);
        updatePosition(e);
      }
    },
    [updatePosition]
  );

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) updatePosition(e);
    },
    [isVisible, updatePosition]
  );

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <HoverPreviewContext.Provider value={{ handleHoverStart, handleHoverMove, handleHoverEnd }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      {children}
      {/* GLOBAL CARD */}
      <div
        ref={cardRef}
        className={`preview-card ${isVisible && activePreview ? "visible" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <div className="preview-card-inner">
          <img src={activePreview?.image} alt={activePreview?.title} crossOrigin="anonymous" />
          <div className="preview-card-title">{activePreview?.title}</div>
          <div className="preview-card-subtitle">{activePreview?.subtitle}</div>
        </div>
      </div>
    </HoverPreviewContext.Provider>
  );
};

// -------------------------------------------------------------------------
// LINK COMPONENT
// -------------------------------------------------------------------------
export const AgenticHoverLink = ({
  previewKey,
  children,
  className,
}: {
  previewKey: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const context = useContext(HoverPreviewContext);

  if (!context) {
    console.warn("AgenticHoverLink must be used inside AgenticHoverProvider");
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={`agentic-hover-link ${className || ""}`}
      onMouseEnter={(e) => context.handleHoverStart(previewKey, e)}
      onMouseMove={context.handleHoverMove}
      onMouseLeave={context.handleHoverEnd}
    >
      {children}
    </span>
  );
};
