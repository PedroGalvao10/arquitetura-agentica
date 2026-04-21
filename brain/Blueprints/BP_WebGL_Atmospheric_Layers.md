# Blueprint: Camadas WebGL Atmosféricas — Agentic OS

**Status:** ⏳ PENDENTE APROVAÇÃO  
**Escopo:** Background global do site (substituição/extensão do sistema de camadas em `App.tsx`)  
**Intocável:** Hero Section, Splash Cover, Manifesto, e todo conteúdo textual  
**Dependência:** Códigos-fonte originais dos 6 componentes (aguardando envio pelo usuário)

---

## 🎯 Objetivo

Substituir o sistema de background atual (BackgroundGradientAnimation + StarsBackground + NeuralBackground) por **5 camadas WebGL atmosféricas** empilhadas com `mix-blend-mode: screen`, criando profundidade visual cinematográfica em todo o site. Cada camada é um `<canvas>` independente com WebGL raw (sem Three.js).

A **Hero Section e todo conteúdo textual permanecem 100% intocáveis**. Os efeitos são aplicados exclusivamente como camadas de fundo globais.

---

## 🏗️ Arquitetura de Camadas (Back → Front)

```
┌─────────────────────────────────────────────────┐
│  z-0   Aurora Nebula (WebGL Fragment Shader)    │ ← Fundo mais profundo
│         FBM noise, multi-iteration aurora       │
│         Max luminance: ~6%, blend: screen       │
├─────────────────────────────────────────────────┤
│  z-1   Chromatic Wave Lines (WebGL)             │ ← Estrutura luminosa sutil
│         Sine-wave R/G/B channel offset          │
│         Opacity: 15-25%, blend: screen          │
├─────────────────────────────────────────────────┤
│  z-2   Icosahedron Wireframe (WebGL)            │ ← Geometria estrutural
│         Platonic solid, rotação lenta            │
│         Mouse proximity → espessura de linhas   │
│         Opacity: 18-22%, blend: screen          │
├─────────────────────────────────────────────────┤
│  z-3   Fluid Cursor Glow (WebGL)                │ ← Trilha fluida do cursor
│         FBM turbulence simplificado              │
│         Segue o mouse, blend: screen             │
├─────────────────────────────────────────────────┤
│  z-4   Neural Particles + Woven Connections     │ ← 2D Canvas existente (EVOLUÍDO)
│         flow-field-background.tsx ATUAL          │
│         + linhas gossamer entre partículas       │
├─────────────────────────────────────────────────┤
│  z-10  Conteúdo do Site                         │ ← LandingPage, Sections, etc.
├─────────────────────────────────────────────────┤
│  z-20  Navbar                                   │ ← Glassmorphism, blur
├─────────────────────────────────────────────────┤
│  z-100 Splash Cover                             │ ← Animação de entrada (existente)
└─────────────────────────────────────────────────┘
```

---

## 📐 Especificações Técnicas por Camada

### Camada 0: Aurora Nebula (`aurora-webgl.tsx`)

| Aspecto | Especificação |
|---------|---------------|
| **Fonte** | `animated-shader-background.tsx` |
| **Técnica** | Fragment shader com FBM noise, 6+ iterações |
| **Uniforms** | `u_time`, `u_resolution`, `u_mouse` (opcional) |
| **Paleta** | Azul-400 (#60a5fa), Azul-300 (#93c5fd), branco frio |
| **Luminância máx** | ~6% (multiplicar output final por 0.06) |
| **Blend mode** | `mix-blend-mode: screen` via CSS |
| **Posição** | `position: fixed; inset: 0; z-index: 0` |
| **Pointer events** | `none` |
| **Resize** | Handler no `useEffect`, recria viewport |

**GLSL Core (adaptação esperada):**
```glsl
// FBM noise para aurora — cores frias APENAS
// Resultado final: fragColor = vec4(aurora_rgb * 0.06, 1.0);
// PROIBIDO: tons quentes (laranja, âmbar, dourado)
```

### Camada 1: Chromatic Wave (`chromatic-wave-webgl.tsx`)

| Aspecto | Especificação |
|---------|---------------|
| **Fonte** | `web-gl-shader.tsx` |
| **Técnica** | Sine-wave com offset R/G/B (aberração cromática) |
| **Uniforms** | `u_time`, `u_resolution` |
| **Paleta** | Monocromático azulado (sem cores quentes) |
| **Opacidade CSS** | 15-25% |
| **Blend mode** | `mix-blend-mode: screen` |
| **Posição** | `position: fixed; inset: 0; z-index: 1` |
| **Pointer events** | `none` |

### Camada 2: Icosahedron Wireframe (`icosahedron-webgl.tsx`)

| Aspecto | Especificação |
|---------|---------------|
| **Fonte** | `geometric-blur-mesh` (documento 4) |
| **Técnica** | Wireframe 3D projetado em 2D (matrizes de rotação manual) |
| **Geometria** | Icosaedro (12 vértices, 30 arestas) |
| **Rotação** | ~0.002 rad/frame em Y e X |
| **Mouse proximity** | Linhas mais espessas quando cursor próximo (1px → 2.5px) |
| **Opacidade CSS** | 18-22% |
| **Blend mode** | `mix-blend-mode: screen` |
| **Posição** | `position: fixed; inset: 0; z-index: 2` |
| **Pointer events** | `none` |

**Nota técnica:** Sem Three.js. Os vértices do icosaedro são definidos manualmente, rotacionados via matrizes 3x3 em JS, projetados em 2D, e desenhados como `GL_LINES` no vertex/fragment shader.

### Camada 3: Fluid Cursor Glow (`fluid-cursor-webgl.tsx`)

| Aspecto | Especificação |
|---------|---------------|
| **Fonte** | `smokey-cursor-effect.tsx` |
| **Técnica** | FBM turbulence simplificado no fragment shader |
| **Uniforms** | `u_time`, `u_resolution`, `u_mouse`, `u_mouse_velocity` |
| **Comportamento** | Glow suave segue o mouse com delay (lerp) |
| **NÃO incluir** | Navier-Stokes solver completo (muito pesado) |
| **Blend mode** | `mix-blend-mode: screen` |
| **Posição** | `position: fixed; inset: 0; z-index: 3` |
| **Pointer events** | `none` |

### Camada 4: Neural Particles + Woven Connections (EVOLUÇÃO do existente)

| Aspecto | Especificação |
|---------|---------------|
| **Base** | `flow-field-background.tsx` (existente, manter lógica) |
| **Adição de** | `woven-light-hero.tsx` (lógica de conexão entre partículas) |
| **Técnica** | No loop de draw, após desenhar cada partícula, iterar pares e desenhar `strokeStyle` line entre partículas < threshold |
| **Threshold** | ~120px de distância |
| **Opacidade das linhas** | `alpha = 1 - (distance / threshold)`, max 0.15 |
| **Cor das linhas** | Branco (#ffffff) com alpha muito baixo |
| **Canvas** | 2D Canvas existente — NÃO migrar para WebGL |
| **Posição** | `position: fixed; inset: 0; z-index: 4` (mantém) |

---

## 🎨 Regras de Identidade Visual (Apple-Faithful)

| Regra | Valor |
|-------|-------|
| Background base | `#000000` (preto puro) |
| Paleta primária | Branco, near-white, blue-400 (#60a5fa), blue-300 (#93c5fd) |
| Tipografia | `-apple-system, "SF Pro Display", system-ui, sans-serif` |
| Blend mode global | `mix-blend-mode: screen` em TODAS as camadas |
| Luminância por camada | Sutil — nenhuma camada individual brilha demais |
| Tons proibidos | ❌ Laranja, dourado, âmbar, quaisquer tons quentes |
| Imports de fontes | ❌ Nenhum (Google Fonts proibido) |
| Glassmorphism nav | `backdrop-filter: blur(...)`, `border-white/[.08]` |
| CTA | Pill branco, texto preto, hover scale sutil |

---

## 🔧 Alterações em Arquivos Existentes

### `App.tsx` — REWRITE da seção de fundos

**Antes (atual):**
```tsx
<div className="fixed inset-0 z-0 pointer-events-none">
  <BackgroundGradientAnimation ... />      // REMOVER
  <StarsBackground ... />                  // REMOVER
  <NeuralBackground ... />                 // EVOLUIR
</div>
```

**Depois (proposto):**
```tsx
<div className="fixed inset-0 z-0 pointer-events-none" style={{ background: '#000' }}>
  <AuroraWebGL />                           {/* z-0, blend: screen */}
  <ChromaticWaveWebGL />                    {/* z-1, blend: screen, opacity: 20% */}
  <IcosahedronWebGL />                      {/* z-2, blend: screen, opacity: 20% */}
  <FluidCursorWebGL />                      {/* z-3, blend: screen */}
  <NeuralBackgroundEvolved />               {/* z-4, blend: screen, com woven lines */}
</div>
```

### Componentes removidos/substituídos:
| Componente | Ação |
|-----------|------|
| `BackgroundGradientAnimation` | **REMOVER** do App.tsx (redundante com aurora) |
| `StarsBackground` | **REMOVER** (substituído pelas novas camadas) |
| `NeuralBackground` (flow-field) | **EVOLUIR** (adicionar woven connections) |

### Componentes novos:
| Arquivo | Descrição |
|---------|-----------|
| `src/components/ui/aurora-webgl.tsx` | Camada 0 — Aurora nebula shader |
| `src/components/ui/chromatic-wave-webgl.tsx` | Camada 1 — Aberração cromática |
| `src/components/ui/icosahedron-webgl.tsx` | Camada 2 — Wireframe geométrico |
| `src/components/ui/fluid-cursor-webgl.tsx` | Camada 3 — Glow fluido do cursor |

### Componente evoluído:
| Arquivo | Descrição |
|---------|-----------|
| `src/components/ui/flow-field-background.tsx` | **EDITAR** — Adicionar lógica de woven connections |

---

## ⚡ Estratégia de Performance

1. **Visibility API**: Cada camada pausa `requestAnimationFrame` quando `document.hidden === true`
2. **GPU-bound**: Shaders WebGL são executados na GPU, não bloqueiam main thread
3. **Canvas count**: 5 canvases (4 WebGL + 1 2D) — aceitável para GPUs modernas
4. **Resize debounce**: Todas as camadas usam `debounce(handleResize, 150)` para evitar redraws excessivos
5. **Mouse throttle**: Posição do mouse atualizada a cada 16ms (1 frame a 60fps)
6. **Cleanup rigoroso**: Todo `useEffect` retorna função de cleanup que cancela RAF e remove listeners
7. **Woven connections**: Limitar pares testados via spatial grid para O(n) em vez de O(n²)
8. **Stagger init**: Camadas inicializam com 100ms de delay entre elas para não bloquear o primeiro paint

---

## 📋 Plano de Execução (6 Passos)

### Passo 1: Criar `aurora-webgl.tsx`
- Extrair fragment shader do `animated-shader-background.tsx` fornecido
- Adaptar FBM noise para paleta fria (blue-400, blue-300)
- Aplicar multiplicador de luminância 0.06
- Implementar setup WebGL completo (compile, link, draw loop)
- **Sem interação com mouse** (apenas `u_time` + `u_resolution`)

### Passo 2: Criar `chromatic-wave-webgl.tsx`
- Extrair lógica de aberração cromática do `web-gl-shader.tsx` fornecido
- Implementar offset senoidal dos canais R/G/B
- Manter em tons azulados/brancos
- CSS: `opacity: 0.2; mix-blend-mode: screen`

### Passo 3: Criar `icosahedron-webgl.tsx`
- Extrair geometria do wireframe do `geometric-blur-mesh`
- Definir 12 vértices do icosaedro manualmente
- Implementar rotação 3D (matrizes de rotação Y e X)
- Projeção perspectiva → 2D
- Draw como `GL_LINES`
- Mouse proximity: calcular distância cursor ↔ centro, escalar `lineWidth`

### Passo 4: Criar `fluid-cursor-webgl.tsx`
- Extrair conceito de trilha fluida do `smokey-cursor-effect.tsx`
- **Simplificar**: Usar FBM noise centrado na posição do mouse (com lerp delay)
- NÃO implementar Navier-Stokes completo
- Passar `u_mouse` como uniform, com smoothing no JS

### Passo 5: Evoluir `flow-field-background.tsx`
- Extrair lógica de conexão de linhas do `woven-light-hero.tsx`
- Após o loop de `particles.forEach(p => p.draw())`, adicionar loop de pares
- Desenhar `ctx.strokeStyle` com alpha inversamente proporcional à distância
- Threshold: 120px, max alpha: 0.15
- Otimização: spatial grid hash para evitar O(n²) em 600 partículas

### Passo 6: Integrar tudo no `App.tsx`
- Remover `BackgroundGradientAnimation` e `StarsBackground`
- Importar os 4 novos componentes WebGL
- Posicionar no container fixo com z-indexes corretos
- Testar composição visual
- Validar performance (target: 60fps estáveis)

---

## ✅ Critérios de Aceitação

- [ ] `npm run build` sem erros
- [ ] `npx tsc --noEmit` sem erros
- [ ] 60fps estáveis com todas as 5 camadas ativas
- [ ] Hero Section **100% preservada** (sem alterações)
- [ ] Nenhum tom quente visível em qualquer camada
- [ ] `mix-blend-mode: screen` em todas as camadas WebGL
- [ ] Background base permanece predominantemente escuro
- [ ] Cleanup completo de RAF e listeners em todas as camadas
- [ ] Sem Three.js — WebGL raw apenas
- [ ] Responsivo (resize handler em cada canvas)

---

## 📦 Dependências

**Nenhuma nova dependência necessária.**
- React + React hooks (existente)
- WebGL nativo (browser API)
- 2D Canvas (browser API)
- lucide-react (já instalado)

---

## 🔒 O que NÃO será tocado

- `LandingPage.tsx` (layout de seções)
- `SplashCover.tsx` (animação de entrada)
- `Navbar.tsx` (navegação)
- Qualquer componente dentro de `sections/`
- Hero Section (3D Spline + texto + manifesto)
- `CinematicFooter`
- `FloatingProfile`
- GSAP scroll timeline no `App.tsx` (apenas a seção de backgrounds muda)

---

> **⏳ AGUARDANDO:**
> 1. ✅ Aprovação deste Blueprint
> 2. 📨 Envio dos códigos-fonte originais dos 6 componentes pelo usuário
> 3. 🚀 Após receber os códigos, execução segue o Plano de 6 Passos acima
