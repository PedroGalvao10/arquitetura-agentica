# Frontend Creative Aesthetics — Antigravity

Use esta skill para criar interfaces que causem impacto visual imediato ("WOW effect"). Esta diretiva foca em escolhas audaciosas, tipografia distintiva e animações de alta performance.

## Objetivos Estéticos
- **Audácia (Boldness)**: Escolhas de design fortes que dão personalidade à marca.
- **Micro-interações**: Animações sutis que dão feedback ao toque e movimento.
- **Tipografia Distintiva**: Uso da fonte para declarar estilo e tom de voz.
- **Atenção Meticulosa aos Detalhes**: Cada pixel conta a história de um produto premium.

## Regras de Ouro

### 1. Vida e Movimento (Animations)
- Use transições suaves no `hover` (mínimo 200ms).
- Use `framer-motion` ou CSS Transitions para dar peso e física aos elementos.
- Evite movimentos lineares; use `cubic-bezier(.4, 0, .2, 1)`.

### 2. Estilo Visual Premium
- **Glassmorphism**: Use opacidades baixas com `backdrop-filter: blur()`.
- **Gradientes Suaves**: Utilize cores harmônicas (ex: cores adjacentes na roda de cores). 
- **Sombras Difusas**: Use sombras longas com opacidade baixa para simular profundidade real.

### 3. Tipografia Moderna
- Melhore a legibilidade com `letter-spacing: -0.01em` ou `-0.02em` em títulos grandes.
- Títulos devem ser curtos, diretos e impactantes.

### 4. Responsividade como Design
- A interface deve ser "inteligente" em todos os tamanhos. Não apenas esconder elementos, mas reorganizá-los com elegância.

## Execução
Quando solicitado a criar um site ou componente premium:
1. Comece pelo `index.css` definindo tokens de cores vibrantes e variáveis de animação.
2. Construa componentes focados em interatividade.
3. Aplique efeitos de profundidade (layers) e movimento.
4. **Wow o usuário na primeira carga.**
