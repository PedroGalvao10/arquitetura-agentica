import { motion } from 'framer-motion';
import { AgenticHoverLink } from '@/components/ui/agentic-hover-link';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HybridEngineSection() {
  return (
    <section className="s-hybrid" id="motor">
      <motion.div
        className="s-hybrid__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="s-label">INFRAESTRUTURA</span>
        <h2 className="s-title">
          Hub de Inteligência<br />
          <span className="text-gradient">Híbrida.</span>
        </h2>
        <p className="s-subtitle">
          O Agentic OS opera em um modelo de orquestração dupla. Para tarefas estratégicas e criação de{' '}
          <AgenticHoverLink previewKey="blueprint">Blueprints</AgenticHoverLink>, usamos a inteligência massiva
          do Claude 3.5 Sonnet. Para execução determinística, triagem e auto-otimização via{' '}
          <AgenticHoverLink previewKey="ep_engine">EP Engine</AgenticHoverLink>, usamos modelos Locais (
          <AgenticHoverLink previewKey="ollama">Ollama</AgenticHoverLink>).
        </p>
      </motion.div>

      <motion.div
        className="s-hybrid__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {/* CLOUD ENGINE */}
        <motion.div className="s-engine" variants={cardVariants}>
          <div className="s-engine__badge s-engine__badge--cloud">☁️ CLOUD</div>
          <h3>Llama 3.1 405B</h3>
          <p className="s-engine__sub">via NVIDIA NIM / API</p>
          <ul className="s-engine__features">
            <li>Planejamento estratégico complexo</li>
            <li>Análise de documentos longos (+100K tokens)</li>
            <li>
              Geração de <AgenticHoverLink previewKey="blueprint">Blueprints</AgenticHoverLink> multi-etapas
            </li>
            <li>Raciocínio em cadeia (Chain of Thought)</li>
          </ul>
          <div className="s-engine__stat">
            <span className="s-engine__stat-label">LATÊNCIA MÉDIA</span>
            <span className="s-engine__stat-value">~3.2s</span>
          </div>
        </motion.div>

        {/* LOCAL ENGINE (Featured) */}
        <motion.div className="s-engine s-engine--featured" variants={cardVariants}>
          <div className="s-engine__glow" />
          <div className="s-engine__badge s-engine__badge--local">🖥️ LOCAL</div>
          <h3>
            <AgenticHoverLink previewKey="qwen">Qwen 2.5 7B</AgenticHoverLink>
          </h3>
          <p className="s-engine__sub">
            via <AgenticHoverLink previewKey="ollama">Ollama</AgenticHoverLink> (100% offline)
          </p>
          <ul className="s-engine__features">
            <li>Motor Evolutivo — auto-otimização de directivas</li>
            <li>Classificação e triagem rápida</li>
            <li>Validação de outputs antes do commit</li>
            <li>Zero custo. Zero dependência externa.</li>
          </ul>
          <div className="s-engine__stat">
            <span className="s-engine__stat-label">LATÊNCIA MÉDIA</span>
            <span className="s-engine__stat-value text-gradient">~0.4s</span>
          </div>
        </motion.div>

        {/* VISUAL */}
        <motion.div className="s-engine s-engine--visual" variants={cardVariants}>
          <img src="./assets/hybrid_ai_chip_1776460887134.png" alt="Chip Híbrido de IA" loading="lazy" />
          <div className="s-engine__routing">
            <span className="s-engine__routing-icon">🎯</span>
            <span>
              Roteamento Inteligente Automático via{' '}
              <AgenticHoverLink previewKey="orchestrator">Orquestrador</AgenticHoverLink>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
