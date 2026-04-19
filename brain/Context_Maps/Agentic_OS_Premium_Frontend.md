---
type: context_map
project: Agentic OS Premium Frontend
created: 2026-04-17
status: active
---
# 🗺️ Context Map: Agentic OS Immersive Experience (React v4)

## 🎯 Objetivo
Construir a presença web premium (Landing Page) para o Agentic OS, demonstrando de forma tangível, interativa e refinada a arquitetura autônoma e as capacidades do ecossistema de inteligência artificial via uma experiência "Apple-inspired".

## 🏗️ Estrutura de Camadas
- **Directives**: (UX/UI Humanizado — Proibição de traços/hífens técnicos para maior fluidez e naturalidade).
- **Execution**: `C:\Users\soare\.gemini\antigravity\scratch\projects\Agentic_OS_React`

## 🛠️ Stack Tecnológica
- **Framework**: React 19 + Vite + TypeScript.
- **Styling**: Tailwind CSS v4 (Standard shadcn tokens).
- **Animações**: GSAP (ScrollTrigger), Framer Motion, Three.js (WebGL).
- **Design System**: Cosmic Dark, Glassmorphism pesado, tipografia contrastante (Inter/Cabinet Grotesk).

## 📂 Caminhos e Arquivos Importantes (REVISED)
- `src/App.tsx` (Entry point & Backgrounds)
- `src/components/layout/LandingPage.tsx` (Main Content - Humanized)
- `src/components/ui/stars-background.tsx` (2400-star field)
- `src/components/ui/floating-profile.tsx` (Floating/Draggable Profile Card)
- `src/lib/preview-data.ts` (Metadata library for technical hovers)

## 🗝️ Estado de Progresso e Histórico de Decisões
- [x] Migração total do Vanilla HTML para React 19 + Tailwind v4 focado em componentes.
- [x] Implementação do Padrão de Humanização (Remoção total de traços artificiais em todo o corpus de texto).
- [x] Upgrade do Background Estelar para 2400 estrelas com efeito de profundidade e parallax via mouse.
- [x] Criação do `FloatingProfile` estilo "baseclub" com drag-and-drop e orbital-physics.
- [x] Resolução de bugs críticos de hidratação (div in p) e exportação (WSoD fix).
- [ ] Deploy para produção.

### 💡 Novas Lições
- **Humanismo Técinco (Zero Dash):** A remoção de hífens (`-`) e travessões (`—`) de textos estratégicos altera drasticamente a percepção de qualidade, removendo o "cheiro" de IA e aproximando a marca do tom Apple/Premium.
- **Hydration Safety (React 19):** O React 19 é rigoroso com aninhamentos ilegais. Componentes de animação de texto (`AppleRevealText`) devem ser `inline-flex` (span) para evitar quebras em cabeçalhos/parágrafos.
- **Densidade Visual vs Performance:** Usar Canvas 2D planejado com `starsCount` alto (~2400) é mais leve que instanciar milhares de objetos Three.js individuais se o objetivo for apenas um fundo imersivo de estrelas.
- **Evolutionary Programming em Código (ADAS):** Incorporado o mecanismo autônomo (Ollama, Python) de geração, compilação de mutações TS e auto-avaliação (Fitness + Compilation check) que consegue reescrever abstrações melhorando a manutenibilidade do código.

---
**Instrução para a IA**: Ao ler este mapa, priorize a preservação da voz "humanizada". Jamais gere textos técnicos com hífens ou estruturas em tópicos que usem traços. Mantenha a estética "Apple/Stitch.design" como lei suprema.
