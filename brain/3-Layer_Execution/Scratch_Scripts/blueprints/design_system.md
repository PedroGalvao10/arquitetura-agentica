# Design System Blueprint: Organic Biomimetic 2.0

Este documento descreve o sistema de design utilizado no projeto Mariana Bermudes, baseado em tokens de cores orgânicas e tipografia refinada para uma experiência de luxo consciente.

## Paleta de Cores (MD3 Based)

| Token | Hex | Papel |
| :--- | :--- | :--- |
| `primary` | `#4a7c59` | Verde folha (Ação principal) |
| `secondary` | `#6b6358` | Marrom terra (Textos e ícones) |
| `background` | `#faf6f0` | Creme suave (Papel reciclado premium) |
| `on-surface` | `#2e3230` | Cinza carvão (Legibilidade máxima) |
| `accent/tertiary`| `#705c30` | Dourado envelhecido (Destaques) |

## Tipografia

- **Headline**: `Lora` (Serif) - Transmite elegância, autoridade e calma.
- **Body**: `Raleway` (Sans-serif) - Moderna, limpa e altamente legível.

## Componentes de Design "Signature"

### 1. Glassmorphism Orgânico
Utiliza transparência baixa com blur alto para criar profundidade sem poluição visual.
```css
.antigravity-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 2. Tilt 3D Layers
Sistema de profundidade baseado em `translateZ`.
- `tz-10`: 10px (Subtle)
- `tz-30`: 30px (Medium)
- `tz-50`: 50px (Hard)

## Dependências Necessárias
- `tailwindcss`
- `autoprefixer`
- `postcss`
- Fonts: Lora e Raleway via Google Fonts.
