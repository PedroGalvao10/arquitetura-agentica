import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/** Animated counter that counts from 0 to target when in view */
function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased * 10) / 10);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="metric-value-v2">
      {target % 1 !== 0 ? count.toFixed(1) : Math.round(count)}
      {suffix}
    </span>
  );
}

const metrics = [
  {
    value: 94.7,
    suffix: '%',
    label: 'AI Fitness Score',
    desc: 'Pontuação do motor evolutivo após 12 ciclos de auto-otimização das directivas.',
    accent: 'var(--accent)',
  },
  {
    value: 3,
    suffix: 'x',
    label: 'Velocidade de Entrega',
    desc: 'Projetos entregues 3 vezes mais rápido com o pipeline Directive → Blueprint → Execution.',
    accent: 'var(--accent-2)',
  },
  {
    value: 1026,
    suffix: '',
    label: 'Skills Ativas',
    desc: 'Directivas especializadas cobrindo desde web scraping até design de interfaces premium.',
    accent: 'var(--accent-3)',
  },
  {
    value: 0,
    suffix: '',
    label: 'Custo LLM Local',
    desc: 'O motor evolutivo roda 100% local via Ollama/Qwen. Zero dependência de serviços pagos.',
    accent: 'var(--green)',
    displayValue: '$ 0',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function MetricsSection() {
  return (
    <section className="s-metrics" id="numeros">
      <motion.div
        className="s-metrics__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="s-label">RESULTADOS</span>
        <h2 className="s-title">
          Resultados Reais.<br />
          <span className="text-gradient">Não Promessas.</span>
        </h2>
        <p className="s-subtitle">
          Esses números vêm do meu uso diário do sistema. Não são projeções, são dados reais
          de produtividade medidos ao longo de semanas de operação contínua.
        </p>
      </motion.div>

      <motion.div
        className="s-metrics__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            className={`s-metrics__card ${i === 0 ? 's-metrics__card--featured' : ''}`}
            variants={cardVariants}
          >
            <div className="s-metrics__card-shine" style={{ '--accent-color': m.accent } as React.CSSProperties} />
            <div className="s-metrics__card-content">
              {m.displayValue ? (
                <span className="metric-value-v2">{m.displayValue}</span>
              ) : (
                <AnimatedCounter target={m.value} suffix={m.suffix} />
              )}
              <span className="s-metrics__label">{m.label}</span>
              <p className="s-metrics__desc">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
