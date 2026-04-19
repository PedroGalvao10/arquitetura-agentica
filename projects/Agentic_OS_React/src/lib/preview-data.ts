export interface PreviewItem {
  image: string;
  title: string;
  subtitle: string;
}

export const agenticPreviewData: Record<string, PreviewItem> = {
  // Seção Hero / Splash
  agentic_os: {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=560&h=320&fit=crop",
    title: "Agentic OS",
    subtitle: "Ecossistema autônomo de execução determinística.",
  },
  ceo: {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=560&h=320&fit=crop",
    title: "Visão Executiva",
    subtitle: "Você define a meta, o sistema desenha e executa o plano.",
  },
  workforce: {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=560&h=320&fit=crop",
    title: "Força de Trabalho Digital",
    subtitle: "Agentes que não descansam, especializados em cada camada do seu negócio.",
  },

  // Layer 1 — Directives
  directives: {
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=560&h=320&fit=crop",
    title: "Layer 1 · Directives",
    subtitle: "SOPs em Markdown que definem o comportamento determinístico.",
  },

  // Layer 2 — Orchestrator
  orchestrator: {
    image: "https://images.unsplash.com/photo-1518433278981-16c02460bb41?w=560&h=320&fit=crop",
    title: "Layer 2 · Orchestrator",
    subtitle: "Roteamento inteligente e tomada de decisão entre modelos LLM.",
  },

  // Layer 3 — Execution
  execution: {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=560&h=320&fit=crop",
    title: "Layer 3 · Execution",
    subtitle: "Scripts Python/TS que realizam o trabalho pesado sem alucinações.",
  },

  // Memory & Knowledge
  obsidian: {
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=560&h=320&fit=crop",
    title: "Obsidian Brain",
    subtitle: "Every decision logged as external memory",
  },
  notebooklm: {
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=560&h=320&fit=crop",
    title: "NotebookLM",
    subtitle: "Strategic knowledge always in context",
  },
  github: {
    image: "https://images.unsplash.com/photo-1556075798-4825dfabb46e?w=560&h=320&fit=crop",
    title: "GitHub Sync",
    subtitle: "Sincronização contínua e versionamento do histórico.",
  },

  // Governance
  gemini_rules: {
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=560&h=320&fit=crop",
    title: "GEMINI.md",
    subtitle: "A constituição operacional de 21 regras.",
  },
  backoff: {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=560&h=320&fit=crop",
    title: "Exponential Backoff",
    subtitle: "Resiliência total contra limites de taxa de API.",
  },
  context_map: {
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=560&h=320&fit=crop",
    title: "Project Context Map",
    subtitle: "Memória técnica específica de cada projeto.",
  },

  // Local Engines
  ollama: {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=560&h=320&fit=crop",
    title: "Servidor Local Ollama",
    subtitle: "Computação offline para máxima privacidade de dados.",
  },
  qwen: {
    image: "https://images.unsplash.com/photo-1676299081847-5a331f0fcc64?w=560&h=320&fit=crop",
    title: "Qwen 2.5 7B",
    subtitle: "O motor de raciocínio local ultra-veloz (~0.4s).",
  },
};
