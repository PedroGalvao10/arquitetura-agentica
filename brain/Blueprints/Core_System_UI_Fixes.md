# 🏗️ Blueprint: Core System & UI Fixes

## 🎯 Objetivo
Corrigir erros críticos de configuração (TypeScript), compatibilidade de estilos (Safari/CSS) e boas práticas de desenvolvimento (estilos inline) no projeto Agentic OS.

## 📝 Lista de Tarefas

### 1. Configuração do Sistema (TypeScript)
- [ ] Corrigir/Remover `ignoreDeprecations` no `tsconfig.app.json`.
  - *Motivo*: IDE reporta valor inválido "6.0".

### 2. Compatibilidade Visual (CSS Safari & Standards)
- [ ] Atualizar `src/legacy.css` para suporte total ao Safari.
  - Adicionar `-webkit-backdrop-filter` nas linhas: 168, 186, 195, 455, 569.
  - Garantir que `mask-image` esteja depois de `-webkit-mask-image` (linha 1286).
  - Ordenar prefixos: `-webkit-` primeiro.
- [ ] Atualizar `src/sections.css`.
  - Adicionar `-webkit-user-select` para acompanhar `user-select` (linha 615).

### 3. Refatoração de Componentes (Best Practices)
- [ ] Mover estilos inline para classes CSS ou Tailwind nos arquivos:
  - `src/App.tsx` (linha 105)
  - `src/components/sections/MetricsSection.tsx` (linha 115)
  - `src/components/sections/SkillsSection.tsx` (linha 65)
  - `src/components/ui/agentic-hover-link.tsx`
  - `src/components/ui/agentic-image-carousel.tsx`
  - `src/components/ui/background-gradient-animation.tsx`
  - `src/components/ui/container-scroll-animation.tsx`
  - `src/components/ui/n8n-workflow-block-shadcnui.tsx`
  - `src/components/ui/aurora-webgl.tsx`
  - `src/components/ui/chromatic-wave-webgl.tsx`
  - `src/components/ui/fluid-cursor-webgl.tsx`
  - `src/components/ui/icosahedron-webgl.tsx`

### 4. Manutenção de Sanidade
- [ ] (Opcional) Revisar "Unknown words" em comentários e strings de UI para garantir que não são erros de digitação (ex: "Fase", "Erro").

## 🚀 Próximos Passos
1. Executar as trocas no `tsconfig`.
2. Aplicar correções de prefixos no `legacy.css`.
3. Identificar e extrair estilos inline dos componentes UI.
4. Sincronizar o estado do projeto.
