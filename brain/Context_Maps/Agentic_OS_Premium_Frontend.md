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
- [x] Implementação do Zero Gap Protocol (layout ultra-compacto eliminando dead space vertical).
- [x] Otimização de Densidade Visual (Neural Background com 600 partículas e tamanho 2.0).
- [ ] Deploy para produção.

### 💡 Novas Lições
- **Zero Gap Protocol (Layout Densidade):** Para atingir uma estética premium tipo Apple, deve-se combater o "dead space". Componentes de terceiros (como Aceternity) frequentemente trazem `min-h` e `paddings` internos agressivos que devem ser sistematicamente removidos para permitir que as seções se toquem, criando um fluxo contínuo.
- **Transições de Máscara (Cosmic Seamless):** O uso de `mask-image: linear-gradient(to bottom, transparent, black 25%)` em elementos 3D (Spline) permite "fundir" objetos complexos no fundo escuro, evitando bordas secas e mantendo a imersão.
- **Hierarquia de Partículas:** O sistema de fundo agora opera em 3 camadas: Estrelas (estático/fundo), Neural Flow (dinâmico/meio) e Tipografia (interativo/frente). O equilíbrio perfeito para 2026 exige alta contagem de partículas no meio (Neural) com opacidade controlada (0.5) para não sobrecarregar visualmente.
- **Humanismo Técinco (Zero Dash):** A remoção de hífens (`-`) e travessões (`—`) de textos estratégicos altera drasticamente a percepção de qualidade, removendo o "cheiro" de IA e aproximando a marca do tom Apple/Premium.

---
**Instrução para a IA**: Ao ler este mapa, priorize a preservação da voz "humanizada" e o "Zero Gap Protocol". Mantenha a estética "Apple/Stitch.design" como lei suprema.
