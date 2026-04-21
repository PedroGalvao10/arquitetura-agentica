import { motion } from 'framer-motion';
import { AgenticHoverLink } from '@/components/ui/agentic-hover-link';
import { LetterTypewriter } from '@/components/ui/apple-reveal-text';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export function TerminalSection() {
  return (
    <section className="s-terminal" id="execucao">
      <ContainerScroll
        titleComponent={
          <motion.div
            className="s-terminal__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="s-label">EXECUÇÃO EM TEMPO REAL</span>
            <h2 className="s-title">
              Veja o Sistema<br />
              <span className="text-gradient">Trabalhando.</span>
            </h2>
          </motion.div>
        }
      >
        <div className="s-terminal__window">
          <div className="s-terminal__bar">
            <div className="s-terminal__dots">
              <span className="s-terminal__dot s-terminal__dot--red" />
              <span className="s-terminal__dot s-terminal__dot--yellow" />
              <span className="s-terminal__dot s-terminal__dot--green" />
            </div>
            <span className="s-terminal__title">agentic os powershell ~/scratch/execution</span>
          </div>
          <div className="s-terminal__body">
            <div className="s-terminal__line">
              <span className="s-terminal__ln">01</span> <span className="s-terminal__kw">import</span> agentic_os
            </div>
            <div className="s-terminal__line">
              <span className="s-terminal__ln">02</span>
            </div>
            <div className="s-terminal__line">
              <span className="s-terminal__ln">03</span>{' '}
              <LetterTypewriter text="# Inicializando Força de Trabalho Digital" className="s-terminal__comment" />
            </div>
            <div className="s-terminal__line">
              <span className="s-terminal__ln">04</span> <span className="s-terminal__kw">const</span> orchestrator =
              agentic_os.<span className="s-terminal__fn">boot</span>({'{'}
            </div>
            <div className="s-terminal__line">
              <span className="s-terminal__ln">05</span>     strategy: <span className="s-terminal__str">"autonomous"</span>,
            </div>
            <div className="s-terminal__line">
              <span className="s-terminal__ln">06</span>     context:{' '}
              <span className="s-terminal__str">
                "<AgenticHoverLink previewKey="obsidian">obsidian_brain</AgenticHoverLink>"
              </span>
            </div>
            <div className="s-terminal__line">
              <span className="s-terminal__ln">07</span> {'})'}
            </div>
            <div className="s-terminal__line">
              <span className="s-terminal__ln">08</span>
            </div>
            <div className="s-terminal__line s-terminal__line--active">
              <span className="s-terminal__ln">09</span> <span className="s-terminal__kw">await</span>{' '}
              <AgenticHoverLink previewKey="orchestrator">orchestrator</AgenticHoverLink>.
              <span className="s-terminal__fn">solve</span>(<span className="s-terminal__str">"deploy modern app"</span>)
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
