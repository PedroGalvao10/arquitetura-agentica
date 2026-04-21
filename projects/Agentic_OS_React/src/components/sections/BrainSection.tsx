import { motion } from 'framer-motion';
import { AgenticHoverLink } from '@/components/ui/agentic-hover-link';

export function BrainSection() {
  return (
    <section className="s-brain" id="cerebro">
      <div className="s-brain__content">
        <motion.div
          className="s-brain__text"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="s-label">MEMÓRIA PERSISTENTE</span>
          <h2 className="s-title">
            O Segundo Cérebro.<br />
            Memória que <span className="text-gradient">nunca esquece.</span>
          </h2>
          <p className="s-brain__desc">
            Todo o conhecimento do Agentic OS é armazenado no{' '}
            <AgenticHoverLink previewKey="obsidian">Obsidian Brain</AgenticHoverLink> — um vault local,
            versionado pelo Git, sincronizado com o{' '}
            <AgenticHoverLink previewKey="github">GitHub</AgenticHoverLink>. Não é apenas um bloco de notas: é
            um sistema de <strong>memória ativa</strong> onde cada decisão técnica, cada lição aprendida e cada
            resultado de otimização é registrado e indexado.
          </p>
          <p className="s-brain__desc">
            Quando o agente recebe uma tarefa nova, ele primeiro consulta o{' '}
            <AgenticHoverLink previewKey="context_map">Context Map</AgenticHoverLink> do projeto. Isso garante
            que ele nunca repita erros já documentados e sempre siga os padrões arquiteturais já estabelecidos.
          </p>

          <div className="s-brain__features">
            <div className="s-brain__feature">
              <span className="s-brain__feature-icon">📂</span>
              <div>
                <strong>Context Maps</strong>
                <p>Mapas de contexto por projeto com histórico de decisões técnicas.</p>
              </div>
            </div>
            <div className="s-brain__feature">
              <span className="s-brain__feature-icon">📋</span>
              <div>
                <strong>Dev Logs</strong>
                <p>Registros automáticos de cada execução do motor evolutivo.</p>
              </div>
            </div>
            <div className="s-brain__feature">
              <span className="s-brain__feature-icon">🔄</span>
              <div>
                <strong>
                  <AgenticHoverLink previewKey="github">GitHub Sync</AgenticHoverLink>
                </strong>
                <p>Versionamento automático via github_sync.ps1 para backup e histórico.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="s-brain__visual"
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="./assets/knowledge_graph.png" alt="Grafo de Conhecimento" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}
