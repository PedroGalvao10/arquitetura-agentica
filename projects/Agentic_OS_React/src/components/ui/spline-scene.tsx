'use client'

import { Suspense, lazy, useState, useEffect, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

/**
 * SplineScene
 * Wrapper com carregamento inteligente para cenas 3D do Spline.
 * 
 * Estratégia de performance:
 * 1. Só carrega quando o elemento está visível na viewport (IntersectionObserver)
 * 2. Aguarda o browser estar idle (requestIdleCallback) para não competir com outras animações
 * 3. Delay mínimo de 3s para garantir que o conteúdo principal renderize primeiro
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false

    // Só carrega quando visível + idle + após 3s
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !cancelled) {
          // Espera 3s após ficar visível
          const timer = setTimeout(() => {
            if (cancelled) return
            // Usa requestIdleCallback para não competir com animações
            if ('requestIdleCallback' in window) {
              (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(() => {
                if (!cancelled) setShouldLoad(true)
              }, { timeout: 5000 })
            } else {
              setShouldLoad(true)
            }
          }, 3000)

          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(container)

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className={`w-full h-full ${className || ''}`}>
      {shouldLoad ? (
        <Suspense 
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin" />
                <span className="text-white/40 text-sm tracking-widest uppercase">Renderizando 3D...</span>
              </div>
            </div>
          }
        >
          <Spline
            scene={scene}
            className="w-full h-full"
          />
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 opacity-40">
            <div className="w-12 h-12 rounded-full border border-purple-500/30 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin" />
            </div>
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Carregando modelo 3D...</span>
          </div>
        </div>
      )}
    </div>
  )
}
