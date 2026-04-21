# Advanced CSS Excellence

Este guia consolida técnicas avançadas de estilização para criar layouts resilientes, performáticos e esteticamente superiores. Foca em CSS moderno e boas práticas de manutenção.

## 1. Layout & Estrutura Moderna
- **CSS Grid (Preferencial)**: Usar Grid para layouts complexos. Masterizar `grid-template-areas` e `subgrid`.
- **Flexbox**: Usar para alinhamento linear e componentes simples.
- **Aspect-Ratio**: Manter proporções consistentes sem hacks de padding (ex: `aspect-ratio: 16 / 9`).
- **Clamp()**: Tipografia e espaçamentos fluidos (ex: `font-size: clamp(1rem, 5vw, 2.5rem)`).

## 2. CSS Pro-Tips (Eficiência)
- **Inherit Everything**: Usar `box-sizing: inherit` no seletor global para controle total.
- **Empty Selectors**: Esconder elementos vazios com `div:empty { display: none; }`.
- **Vertical Centering**: O novo padrão: `display: grid; place-items: center;`.
- **Custom Properties (Variables)**: Centralizar tokens de design (cores, espaçamento, sombras).

## 3. Performance & Renderização
- **Content-Visibility**: Usar `content-visibility: auto` em elementos fora da viewport para reduzir o tempo de renderização inicial.
- **Will-Change**: Usar com parcimônia apenas em elementos que sofrerão animações frequentes de GPU.
- **Variable Shorthands**: Manter o código DRY usando variáveis para duplicatas de cores e degradês.

## 4. Visual Effects (Glassmorphism & Depth)
- **Backdrop-Filter**: Efeito de vidro foscado (Apple style).
- **Smooth Shadows**: Usar múltiplas camadas de sombras (`box-shadow`) para criar um efeito de elevação natural (soft shadows).
- **Linear Gradients**: Evitar gradientes de degrau (banding) usando mais pontos de parada.

## 5. CSS Architecture
- **BEM Lite**: Manter nomes de classes semânticos e hierárquicos.
- **Utility-First vs Component-First**: Priorizar estilos baseados em componentes para o Agentic OS, usando utilitários apenas para ajustes finos.

---
*Referência baseada em: AllThingsSmitty/css-protips & awesome-css*
