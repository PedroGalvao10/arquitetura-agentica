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

export const AgenticHoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [activePreview, setActivePreview] = useState<PreviewDataConfig | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const priorityKeys = ["agentic_os", "ceo", "workforce"];
    priorityKeys.forEach((key) => {
      const data = agenticPreviewData[key as keyof typeof agenticPreviewData];
      if (data) {
        const img = new Image();
        img.src = data.image;
      }
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
      const data = agenticPreviewData[key as keyof typeof agenticPreviewData];
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
