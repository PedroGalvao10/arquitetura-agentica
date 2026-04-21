"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CursorDrivenParticleTypography } from "./cursor-driven-particles-typography"

interface ImageCard {
  id: string
  src: string
  alt: string
  rotation: number
}

interface ImageCarouselHeroProps {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  onCtaClick?: () => void
  images?: ImageCard[]
  features?: Array<{
    title: string
    description: string
  }>
}

const defaultImages: ImageCard[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop", alt: "Code", rotation: -5 },
  { id: "2", src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop", alt: "Cyber", rotation: 5 },
  { id: "3", src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop", alt: "Hardware", rotation: -10 },
  { id: "4", src: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&h=600&fit=crop", alt: "Notebook", rotation: 8 },
  { id: "5", src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", alt: "Data", rotation: -3 },
];

export function AgenticImageCarousel({
  images = defaultImages,
}: ImageCarouselHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [rotatingCards, setRotatingCards] = useState<number[]>(() => 
    images.map((_, i) => i * (360 / images.length))
  )

  // Continuous rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingCards((prev) => prev.map((val) => (val + 0.5) % 360))
    }, 50)

    return () => clearInterval(interval)
  }, [])



  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <div className="relative w-full bg-transparent overflow-visible">
      {/* Container do Carrossel */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          className="relative w-full max-w-4xl h-[1000px] overflow-visible"
          onMouseMove={handleMouseMove}
        >
          {/* Fundo de Partículas Tipográficas */}
          <div className="absolute inset-0 z-0 opacity-20 flex items-center justify-center">
            <CursorDrivenParticleTypography 
              text="Pedro Galvão" 
              fontSize={320} 
              color="#ffffff" 
              particleDensity={5}
              particleSize={1.5}
            />
          </div>

          {/* Rotating Image Cards */}
          <div className="absolute inset-0 flex items-center justify-center z-10 [perspective:1500px]">
            {images.map((image, index) => {
              const angle = (rotatingCards[index] || 0) * (Math.PI / 180)
              const radius = 220
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              // 3D perspective effect based on mouse position
              const perspectiveX = (mousePosition.x - 0.5) * 30
              const perspectiveY = (mousePosition.y - 0.5) * 30

              return (
                <div
                  key={image.id}
                  className="absolute w-40 h-52 sm:w-48 sm:h-64 transition-all duration-300 [transform-style:preserve-3d]"
                  style={{
                    transform: `
                      translate(${x}px, ${y}px)
                      rotateX(${perspectiveY}deg)
                      rotateY(${perspectiveX}deg)
                      rotateZ(${image.rotation}deg)
                    `,
                  }}
                >
                  <div
                    className={cn(
                      "relative w-full h-full rounded-2xl overflow-hidden shadow-2xl",
                      "transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-110",
                      "cursor-pointer group border border-white/10 [transform-style:preserve-3d]",
                    )}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
