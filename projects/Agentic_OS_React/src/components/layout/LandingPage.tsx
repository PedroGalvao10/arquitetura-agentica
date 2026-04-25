import { useEffect } from 'react';
import { initLegacyScripts } from '@/lib/legacy-scripts';
import { AppleRevealText } from '@/components/ui/apple-reveal-text';
import { SplineScene } from '@/components/ui/spline-scene';
import { Spotlight } from '@/components/ui/spotlight';
import { useScroll, useTransform, motion } from 'framer-motion';
import { CursorDrivenParticleTypography } from '@/components/ui/cursor-driven-particles-typography';

// ---- REBUILT SECTIONS (v2) ----
import { MetricsSection } from '@/components/sections/MetricsSection';
import { ArchitectureSection } from '@/components/sections/ArchitectureSection';
import { HybridEngineSection } from '@/components/sections/HybridEngineSection';
import { TerminalSection } from '@/components/sections/TerminalSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { BrainSection } from '@/components/sections/BrainSection';
import { EvolutionSection } from '@/components/sections/EvolutionSection';
import { AnnealingSection } from '@/components/sections/AnnealingSection';
import { GovernanceSection } from '@/components/sections/GovernanceSection';
import { CinematicFooter } from '@/components/ui/motion-footer';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const cleanup = initLegacyScripts();
    return cleanup;
  }, []);

  return (
    <div className="relative z-10 w-full text-white font-sans overflow-x-hidden">
      {/* PARTICLES LEGADO (REMOVIDO PARA OTIMIZAÇÃO - MANTIDO NO APP.TSX) */}

      <motion.div style={{ y: yParallax, scale: scaleParallax }} className="aurora-container pointer-events-none">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
      </motion.div>
      <div className="grid-overlay pointer-events-none"></div>

      {/* ============================================ */}
      {/*  COSMIC FLOW — HERO + MANIFESTO (INTOCÁVEL) */}
      {/* ============================================ */}
      <div
        className="cosmic-flow-container relative overflow-visible bg-transparent min-h-screen w-full z-10 block"
      >
        <div className="cosmic-frosted-mask" />

        <section className="hero-section relative" id="visao">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          <div className="flex h-full min-h-screen">
            {/* Lado esquerdo — conteúdo textual */}
            <div className="w-full md:w-[45%] pl-6 md:pl-16 pr-4 relative z-10 flex flex-col justify-center">
              <div className="hero-eyebrow reveal mb-6">
                <span className="eyebrow-line"></span>
                <span>SISTEMA OPERACIONAL AGÊNTICO</span>
                <span className="eyebrow-line"></span>
              </div>
              <h1 className="hero-title text-left">
                <AppleRevealText text="O Futuro do Trabalho" className="text-white" />
                <AppleRevealText text="é Autônomo." delay={0.4} className="text-gradient" />
              </h1>
              <div className="hero-subtitle text-left max-w-xl mt-6">
                <AppleRevealText
                  text="Você agora é o CEO de uma equipe de agentes autônomos que opera 24/7. Deixe a execução com as máquinas e foque no que importa: a sua visão."
                  delay={1}
                />
              </div>
              <div className="scroll-indicator mt-12">
                <div className="scroll-line"></div>
                <span>SCROLL</span>
              </div>
            </div>

            {/* Lado direito — robô 3D interativo */}
            <div className="hidden md:block flex-1 relative hero-spline-wrapper">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* MÁSCARA DE TRANSIÇÃO — HERO PARA MANIFESTO */}
          <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent z-20 pointer-events-none" />
        </section>

        <section className="manifesto-section !bg-transparent relative">
          {/* MÁSCARA DE TRANSIÇÃO — ENTRADA DO MANIFESTO */}
          <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#030305] to-transparent z-20 pointer-events-none" />

          <div className="manifesto-wrapper">
            <blockquote className="manifesto-text reveal-word" id="manifesto">
              "Todo profissional que trabalha com IA hoje está no mesmo ponto que eu estava há meses,
              copiando e colando prompts em chats. Eu decidi ir além. Construí um sistema onde a IA
              não é um assistente, é um <strong>funcionário autônomo</strong> que lê documentos,
              escreve código, testa, corrige e entrega. Sem intermediários. Sem alucinações.
              Sem perda de contexto."
            </blockquote>
          </div>
        </section>

        {/* MÁSCARA DE TRANSIÇÃO — FINALIZAÇÃO DO COSMOS */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#030305] via-[#030305]/80 to-transparent z-20 pointer-events-none" />
      </div>

      {/* ============================================ */}
      {/*  REBUILT SECTIONS (v2)                       */}
      {/* ============================================ */}

      <MetricsSection />
      <ArchitectureSection />
      <HybridEngineSection />

      {/* Assinatura Pedro Galvão (MANTIDA) */}
      <section className="relative overflow-hidden bg-transparent py-0 flex items-center justify-center min-h-[160px]">
        <div className="w-full max-w-7xl">
          <CursorDrivenParticleTypography
            text="PEDRO GALVÃO"
            fontSize={160}
            color="#ffffff"
            particleDensity={5}
            particleSize={1.5}
            dispersionStrength={25}
            returnSpeed={0.12}
            className="opacity-100"
          />
        </div>
      </section>

      <TerminalSection />
      <SkillsSection />
      <BrainSection />
      <EvolutionSection />
      <AnnealingSection />
      <GovernanceSection />
      <CinematicFooter />
    </div>
  );
}
