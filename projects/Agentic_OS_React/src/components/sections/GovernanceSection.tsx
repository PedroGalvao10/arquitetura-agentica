import { motion } from 'framer-motion';
import { AgenticHoverLink } from '@/components/ui/agentic-hover-link';

const rules = [
  { num: '#2', title: 'Zero Alucinação', desc: 'Proibido inventar dados, links ou fatos. Se não encontrar fonte confiável, diz "Não encontrado".' },
  { num: '#3', title: 'Aprovação de Custos', desc: 'Antes de consumir API paga, deve apresentar estimativa e pedir "Sim ou Não" explícito.' },
  { num: '#15', title: 'Exponential Backoff', desc: 'Toda chamada a LLM usa o utilitário api_retry.py com 5 tentativas, delay crescente e filtragem de erros 429/503.' },
  { num: '#17', title: 'Blueprint First', desc: 'Para tarefas com +3 passos, gerar Blueprint antes. Sem código antes da aprovação.' },
  { num: '#21', title: 'Alta Autonomia', desc: 'Após aprovação do Blueprint, execução contínua sem confirmações. Máxima eficiência.' },
  { num: '#20', title: 'Memória Ativa', desc: 'Após cada implementação, atualizar o Context Map com "Histórico de Decisões" e "Novas Lições".' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function GovernanceSection() {
  return (
    <section className="s-governance">
      <motion.div
        className="s-governance__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="s-title">
          21 Regras.<br />
          Zero Margem para Erro.
        </h2>
        <p className="s-subtitle">
          O <AgenticHoverLink previewKey="gemini_rules">GEMINI.md</AgenticHoverLink> é a constituição do
          sistema. 21 regras operacionais que garantem que a IA nunca alucine, nunca gaste recursos sem
          permissão, e sempre documente o que faz.
        </p>
      </motion.div>

      <motion.div
        className="s-governance__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {rules.map((rule, i) => (
          <motion.div
            key={i}
            className="s-governance__rule"
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
          >
            <span className="s-governance__rule-num">{rule.num}</span>
            <h4>{rule.title}</h4>
            <p>{rule.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
