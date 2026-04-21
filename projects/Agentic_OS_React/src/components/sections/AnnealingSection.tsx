import { motion } from 'framer-motion';
import { AgenticHoverLink } from '@/components/ui/agentic-hover-link';

export function AnnealingSection() {
  return (
    <section className="s-annealing">
      <motion.div
        className="s-annealing__card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="s-annealing__text">
          <h3>Self-Annealing Loop</h3>
          <p className="s-annealing__subtitle">
            Quando algo quebra, o sistema fica <strong>mais forte.</strong>
          </p>
          <p>Erros não são falhas — são dados de treinamento. O ciclo de auto-cura funciona assim:</p>
          <ol className="s-annealing__steps">
            <li>
              <strong>Detecta:</strong> identifica o erro via stack trace estruturado
            </li>
            <li>
              <strong>Corrige:</strong> reescreve o{' '}
              <AgenticHoverLink previewKey="scripts">script</AgenticHoverLink> automaticamente
            </li>
            <li>
              <strong>Testa:</strong> valida a solução em ambiente isolado
            </li>
            <li>
              <strong>Atualiza:</strong> injeta a nova lição na{' '}
              <AgenticHoverLink previewKey="directives">directiva</AgenticHoverLink>
            </li>
            <li>
              <strong>Promove:</strong> o sistema agora é imune àquele erro
            </li>
          </ol>
        </div>
        <div className="s-annealing__visual">
          <img src="./assets/hands_coding.png" alt="Mãos Codificando" loading="lazy" />
        </div>
      </motion.div>
    </section>
  );
}
