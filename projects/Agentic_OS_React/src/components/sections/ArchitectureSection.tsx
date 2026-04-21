import { motion } from 'framer-motion';
import { AgenticHoverLink } from '@/components/ui/agentic-hover-link';
import { AppleRevealText } from '@/components/ui/apple-reveal-text';

const layers = [
  {
    number: '01',
    tag: 'LAYER 1',
    tagClass: 'directive',
    title: 'Directiva',
    previewKey: 'directives',
    role: 'O "QUÊ" — Definição de Comportamento',
    description:
      'Esqueça prompts longos. Aqui usamos Directives (SOPs em Markdown). Elas definem o estado esperado, as ferramentas permitidas e os limites éticos. É a constituição que rege cada agente autonomamente.',
    files: [
      '📁 directives/scrape_website.md',
      '📁 directives/generate_report.md',
      '📁 directives/evolutionary_protocol.md',
    ],
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&h=600&fit=crop',
  },
  {
    number: '02',
    tag: 'LAYER 2 — CORE',
    tagClass: 'orchestrator',
    title: 'Orquestrador',
    previewKey: 'orchestrator',
    role: 'O "COMO" — O Cérebro',
    description:
      'Sou eu. Ou melhor, é a IA operando como eu. O Orquestrador lê a Directiva, analisa os scripts disponíveis na Layer 3, e cria o plano de execução (Blueprint). Ele é a cola entre a intenção e a ação.',
    flow: ['Lê Directiva', 'Analisa Scripts', 'Gera Blueprint', 'Executa'],
    image: './assets/neural_network.png',
    featured: true,
  },
  {
    number: '03',
    tag: 'LAYER 3',
    tagClass: 'execution',
    title: 'Execução',
    previewKey: 'execution',
    role: 'O "FAZER" — Ação Determinística',
    description:
      'Onde o código acontece. Scripts Python/JS focados em tarefas únicas. O Orquestrador consome estas ferramentas para interagir com o mundo real, enviando e-mails, fazendo deploy ou analisando dados.',
    files: [
      '⚡ execution/scrape_single_site.py',
      '⚡ execution/evolutionary_engine.py',
      '⚡ execution/github_sync.ps1',
    ],
    image: './assets/server_rack.png',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -60, rotateY: -5 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ArchitectureSection() {
  return (
    <section className="s-architecture" id="fluxo">
      <motion.div
        className="s-architecture__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="s-title">
          <AppleRevealText text="Arquitetura de" className="text-white" />
          <AppleRevealText text="3 Camadas." className="text-gradient" delay={0.2} />
        </h2>
        <p className="s-subtitle">
          A lógica de negócio é determinística. O sistema resolve a probabilidade dos LLMs separando tudo em{' '}
          <AgenticHoverLink previewKey="directives">3 camadas</AgenticHoverLink>:{' '}
          <AgenticHoverLink previewKey="directives">Directives</AgenticHoverLink>,{' '}
          <AgenticHoverLink previewKey="orchestrator">Orchestrator</AgenticHoverLink> e{' '}
          <AgenticHoverLink previewKey="execution">Execution</AgenticHoverLink>.
        </p>
      </motion.div>

      <motion.div
        className="s-architecture__layers"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            className={`s-layer ${layer.featured ? 's-layer--featured' : ''}`}
            variants={cardVariants}
          >
            <div className="s-layer__number">{layer.number}</div>

            <div className="s-layer__body">
              <div className="s-layer__meta">
                <span className={`s-layer__tag s-layer__tag--${layer.tagClass}`}>{layer.tag}</span>
                <h3>
                  <AgenticHoverLink previewKey={layer.previewKey}>{layer.title}</AgenticHoverLink>
                </h3>
              </div>
              <p className="s-layer__role">{layer.role}</p>
              <p className="s-layer__desc">{layer.description}</p>

              {layer.flow && (
                <div className="s-layer__flow">
                  {layer.flow.map((step, si) => (
                    <span key={si}>
                      <span className={`s-layer__flow-node ${si === 1 ? 's-layer__flow-node--active' : ''}`}>
                        {step}
                      </span>
                      {si < layer.flow.length - 1 && <span className="s-layer__flow-arrow">→</span>}
                    </span>
                  ))}
                </div>
              )}

              {layer.files && (
                <div className="s-layer__files">
                  {layer.files.map((f, fi) => (
                    <code key={fi}>{f}</code>
                  ))}
                </div>
              )}
            </div>

            <div className="s-layer__visual">
              <img src={layer.image} alt={layer.title} loading="lazy" />
              <div className="s-layer__visual-overlay" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Callout */}
      <motion.div
        className="s-callout"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="s-callout__icon">💡</div>
        <div className="s-callout__body">
          <h4>Por que funciona?</h4>
          <p>
            Se a IA faz tudo sozinha, os erros se acumulam exponencialmente: 90% de precisão por passo = apenas{' '}
            <strong>59% de sucesso</strong> após 5 passos. A solução? Empurrar a complexidade para código
            determinístico. Assim, a IA foca apenas no que é boa: <strong>tomar decisões.</strong>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
