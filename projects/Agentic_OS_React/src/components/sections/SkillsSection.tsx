import { motion } from 'framer-motion';
import { AgenticHoverLink } from '@/components/ui/agentic-hover-link';

const skills = [
  { icon: '🕸️', title: 'Web Scraping', desc: 'Extração inteligente via Layer 3 Scripts de qualquer site, com caching e rate limiting.', color: '#6E56FF' },
  { icon: '🎨', title: 'Design Expert', desc: 'Interface premium Apple-inspired com glassmorphism, dark mode e micro-animações.', color: '#C084FC' },
  { icon: '🧬', title: 'Protocolo Evolutivo', desc: 'Auto-melhoria contínua via algoritmos genéticos. O sistema se otimiza sozinho.', color: '#30d158' },
  { icon: '📊', title: 'Data Analysis', desc: 'Processamento de datasets, geração de relatórios visuais e insights automatizados.', color: '#21D4FD' },
  { icon: '🔗', title: 'API Integration', desc: 'Conexão com qualquer serviço externo: GitHub, Obsidian, NotebookLM.', color: '#FF6B6B' },
  { icon: '🛡️', title: 'Error Recovery', desc: 'Self-annealing: quando algo quebra, o sistema lê o erro, corrige e aprende.', color: '#FFD93D' },
  { icon: '📝', title: 'Content Generation', desc: 'Produção de textos, blog posts e documentação técnica com tom profissional.', color: '#A78BFA' },
  { icon: '🚀', title: 'Deploy Automation', desc: 'Pipeline completo: lint → test → build → push → deploy automático.', color: '#F472B6' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function SkillsSection() {
  return (
    <section className="s-skills" id="skills">
      <motion.div
        className="s-skills__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="s-label">CAPACIDADES</span>
        <h2 className="s-title">
          1000+ Skills.<br />
          Um Exército de <span className="text-gradient">Especialistas.</span>
        </h2>
        <p className="s-subtitle">
          Cada skill é uma{' '}
          <AgenticHoverLink previewKey="directives">directiva</AgenticHoverLink> especializada que transforma o
          agente generalista em um expert de domínio. É como ter mais de mil funcionários diferentes, cada um
          treinado para uma tarefa específica, disponíveis 24/7.
        </p>
      </motion.div>

      <motion.div
        className="s-skills__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            className="s-skill"
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
          >
            <div
              className="s-skill__glow"
              style={{ '--skill-color': skill.color } as React.CSSProperties}
            />
            <div className="s-skill__icon">{skill.icon}</div>
            <h4>{skill.title}</h4>
            <p>{skill.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
