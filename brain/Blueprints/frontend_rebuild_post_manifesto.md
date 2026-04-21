# Blueprint: Reconstrução Total do Frontend (Pós-Manifesto)

**Status:** PENDENTE APROVAÇÃO  
**Escopo:** Todas as seções da `LandingPage.tsx` após o bloco `cosmic-flow-container` (linha 107+)  
**Intocável:** Splash → Hero → Manifesto, Fundo (FlowField, Stars, Aurora, Grid)

---

## Mapa de Seções Atuais (Pós-Manifesto)

| # | Seção | Linhas | Estado | Ação |
|---|-------|--------|--------|------|
| 1 | Metrics (Resultados Reais) | 112-139 | Glass cards simples | **REBUILD** |
| 2 | Architecture (3 Camadas) | 144-250 | Layer cards + callout | **REBUILD** |
| 3 | Hybrid Engine (Hub de IA) | 257-307 | Grid de engine cards | **REBUILD** |
| 4 | Pedro Galvão Signature | 310-323 | Particle typography | **MANTER** |
| 5 | Terminal (Execução Real) | 328-359 | ContainerScroll + terminal | **REBUILD** |
| 6 | Skills (1000+ Skills) | 361-413 | Grid 4x2 de skill cards | **REBUILD** |
| 7 | Brain (Segundo Cérebro) | 418-463 | Text + Visual split | **REBUILD** |
| 8 | Evolution (Motor Evolutivo) | 468-530 | Timeline + fitness bar | **REBUILD** |
| 9 | Self-Annealing | 535-553 | Content + img split | **REBUILD** |
| 10 | Governance (21 Regras) | 558-598 | Grid 3x2 de rule cards | **REBUILD** |

---

## Direção do Design (Apple-Inspired Premium)

### Princípios Visuais
- **Animação por scroll dominant**: Cada seção terá entrada orquestrada via GSAP/Framer Motion
- **Containers com profundidade**: Bordas luminosas sutis, hover states com glow, soft shadows multicamada
- **Tipografia dramática**: Títulos `clamp()` fluidos, gradientes animados, letterspacing negativo pesado
- **Grid assimétrico**: Quebrar a monotonia de grids uniformes com layouts 60/40, cards de tamanhos variados
- **Micro-interações**: Counters animados, barras de progresso, hover reveals com parallax interno

### Padrões de Componente
1. **Staggered Reveal**: Cards entram em sequência (delay incremental) com `translateY` + `opacity`
2. **Sticky Scroll Section**: Seções importantes ficam pinned durante scroll para maximizar impacto
3. **Glassmorphism v2**: `backdrop-filter: blur(40px)` + borda gradiente animada
4. **Number Counters**: Métricas com animação de contagem ao entrar na viewport
5. **Interactive Timeline**: Steps com highlight progressivo ao scrollar

---

## Plano de Execução (8 Passos)

### Passo 1: Criar nova seção `MetricsSection`
- Counter animado com `useInView` (Framer Motion)
- Layout: 4 cards em grid com tamanhos variados (1 grande + 3 menores)
- Borda superior com gradient shine animado
- Números com gradiente + glow

### Passo 2: Criar nova seção `ArchitectureSection`
- 3 layer cards em layout vertical com visual expandido
- Hover: card se expande revelando mais conteúdo
- Número grande (01, 02, 03) como marca d'água animada
- Flow diagram interativo entre as camadas

### Passo 3: Criar nova seção `HybridEngineSection`
- Layout assimétrico: 2 engine cards lado a lado + visual grande
- Comparativo visual Cloud vs Local com animação de roteamento
- Badge pulsante para "LOCAL" (custo zero)

### Passo 4: Manter assinatura Pedro Galvão (sem alteração)

### Passo 5: Criar nova seção `TerminalSection`
- Terminal com typing animation real (não estático)
- ContainerScroll mantido, mas com visual refinado
- Output do terminal com highlight de sintaxe melhorado

### Passo 6: Criar nova seção `SkillsSection`
- Grid de skills com hover reveal (ícone → descrição expandida)
- Categorização visual por cor/tag
- Contador total animado no header

### Passo 7: Criar nova seção `BrainSection` + `EvolutionSection`
- Brain: Layout de 2 colunas com imagem parallax
- Evolution: Timeline vertical com step highlighting via scroll
- Fitness counter com animação de preenchimento circular

### Passo 8: Criar nova seção `GovernanceSection` + `AnnealingSection`
- Governance: Cards com numeração estilo "código de lei"
- Annealing: Diagrama cíclico animado (detect → fix → test → update → promote)

---

## Arquivos Afetados

| Arquivo | Ação |
|---------|------|
| `src/components/layout/LandingPage.tsx` | **REWRITE** (seções pós-manifesto) |
| `src/legacy.css` | **UPDATE** (novas seções CSS) |
| `src/components/sections/` | **CRIAR** novos componentes de seção |

---

## Verificação
- `npm run build` sem erros
- `npx tsc --noEmit` sem erros
- Verificação visual no browser
- Responsividade mobile verificada

---

> **AGUARDANDO APROVAÇÃO PARA INICIAR EXECUÇÃO**
