"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./magnetic-button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  },[]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapperRef}
      className="relative h-screen w-full mt-64 footer-clip z-0"
    >
      <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden text-neutral-100 cinematic-footer-wrapper border-t border-white/5 z-[5]">
        <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
        <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none opacity-40" />

        <div
          ref={giantTextRef}
          className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
        >
          AGENTIC
        </div>

        <div className="flex w-max animate-footer-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-neutral-400 uppercase">
          <span>Rastreamento Transparente</span> <span className="text-violet-400/60">✦</span>
          <span>Privacidade Absoluta</span> <span className="text-cyan-400/60">✦</span>
          <span>Orquestração Autônoma</span> <span className="text-violet-400/60">✦</span>
          <span>Memória no Obsidian</span> <span className="text-amber-400/60">✦</span>
          <span>Você é o CEO</span> <span className="text-cyan-400/60">✦</span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
          <h2
            ref={headingRef}
            className="text-5xl md:text-8xl font-black footer-text-glow tracking-tighter mb-12 text-center text-white"
          >
            Pronto para<br />
            <span className="text-gradient-custom">
              a Era da Orquestração.
            </span>
          </h2>

          <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <MagneticButton as="a" href="#visao"
                className="footer-glass-pill px-10 py-5 rounded-full font-bold text-base flex items-center gap-3 text-white btn-cta-custom">
                <span className="dot-indicator bg-violet-500 shadow-[0_0_8px_#7C3AED] w-2 h-2 rounded-full" />
                Solicitar Acesso Antecipado
              </MagneticButton>

              <MagneticButton as="a" href="#fluxo"
                className="footer-glass-pill px-10 py-5 rounded-full font-bold text-base text-white hover:text-white">
                Ver Arquitetura
              </MagneticButton>
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
              <MagneticButton as="a" href="#" className="footer-glass-pill px-6 py-3 rounded-full text-neutral-400 font-medium text-xs md:text-sm hover:text-white">
                Documentação
              </MagneticButton>
              <MagneticButton as="a" href="#" className="footer-glass-pill px-6 py-3 rounded-full text-neutral-400 font-medium text-xs md:text-sm hover:text-white">
                GitHub
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-neutral-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
            © 2025 Agentic OS · Pedro Galvão · All rights reserved.
          </div>

          <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10">
            <span className="text-neutral-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">Built with ⚡ by</span>
            <span className="text-white font-black text-xs md:text-sm tracking-normal ml-1">Pedro Galvão</span>
          </div>

          <MagneticButton
            as="button"
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-neutral-400 hover:text-white group order-3 border-white/10"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
          </MagneticButton>
        </div>
      </footer>
    </div>
  );
}
