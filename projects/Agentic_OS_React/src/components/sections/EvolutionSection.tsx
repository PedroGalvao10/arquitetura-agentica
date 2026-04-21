import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AppleRevealText } from '@/components/ui/apple-reveal-text';
import { AgenticHoverLink } from '@/components/ui/agentic-hover-link';

const steps = [
  { num: 1, title: 'Seleção', desc: 'O motor identifica as directivas com menor eficiência nos últimos ciclos.', marker: '' },
  { num: 2, title: 'Mutação', desc: 'Gera N variantes da directiva original com alterações controladas via LLM local.', marker: 'active' },
  { num: 3, title: 'Avaliação', desc: 'Cada mutação é avaliada por clareza, completude e alinhamento com as Regras GEMINI.md.', marker: '' },
  { num: 4, title: 'Promoção', desc: 'Se fitness > parent, a nova versão substitui a anterior. O sistema ficou mais forte.', marker: '' },
  { num: '∞', title: 'Loop Infinito', desc: 'O ciclo recomeça. Cada iteração reduz erros e aumenta a confiabilidade.', marker: 'final' },
];

export function EvolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const fitnessWidth = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '94.7%']);

  return (
    <section className="s-evolution" id="evolucao" ref={sectionRef}>
      <motion.div
        className="s-evolution__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="s-title">
          <AppleRevealText text="O Motor" className="text-white" />{' '}
          <AgenticHoverLink previewKey="ep_engine">Evolutivo</AgenticHoverLink>.
          <br />
          <AppleRevealText text="O sistema que se melhora sozinho." className="text-gradient" delay={0.2} />
        </h2>
        <p className="s-subtitle">
          A <AgenticHoverLink previewKey="ep_engine">EP Engine</AgenticHoverLink> reescreve instruções usando
          algoritmos genéticos. Toda memória técnica é processada no{' '}
          <AgenticHoverLink previewKey="obsidian">Obsidian Brain</AgenticHoverLink> e contextualizada
          estrategicamente via <AgenticHoverLink previewKey="notebooklm">NotebookLM</AgenticHoverLink>.
        </p>
      </motion.div>

      <div className="s-evolution__body">
        {/* Timeline */}
        <div className="s-evolution__timeline">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="s-evolution__step"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`s-evolution__marker ${step.marker ? `s-evolution__marker--${step.marker}` : ''}`}>
                {step.num}
              </div>
              <div className="s-evolution__step-info">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fitness Visual */}
        <motion.div
          className="s-evolution__visual"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src="./assets/evolutionary_dna_code_1776460874093.png"
            alt="DNA de Código Evolutivo"
            loading="lazy"
          />
          <div className="s-evolution__fitness">
            <span className="s-evolution__fitness-label">FITNESS SCORE ATUAL</span>
            <span className="s-evolution__fitness-value">94.7</span>
            <div className="s-evolution__fitness-bar">
              <motion.div className="s-evolution__fitness-fill" style={{ width: fitnessWidth }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
