# Interactive 3D Effects Blueprint: Depth & Tilt

Este documento detalha como implementar efeitos de profundidade e interatividade 3D utilizando GSAP para o efeito de "Tilt" (inclinação) e Spline para modelos 3D complexos.

## 1. Efeito de Tilt (Mouse Interactive)

O efeito de inclinação segue o cursor do mouse dentro de um elemento, criando uma sensação de profundidade 3D (paralaxe).

### Hooks Utilizados
- `useTilt(ref, intensity)`: Controla a rotação `X` e `Y` baseada na posição do mouse.
- Dependências: `gsap`, `react`.

### Classes de Apoio (CSS)
Para que o efeito funcione perfeitamente com elementos filhos, use:
- `.transform-style-3d`: Mantém o contexto 3D para os filhos.
- `.tilt-child`: Classe base para elementos com profundidade.
- `.tz-X`: Define o deslocamento no eixo Z (ex: `.tz-30` para 30px de profundidade).

## 2. Integração Spline 3D

Para modelos mais complexos (como o DNA do projeto), utilizamos o Spline.

### Otimizações de Performance
1. **Intersection Observer**: Pausar a aplicação Spline (`spline.stop()`) quando o elemento sair do viewport para economizar CPU/GPU.
2. **Background Match**: Definir o fundo do Spline via código (`spline.setBackgroundColor`) para evitar flashes de cor errada durante o carregamento.

### Máscaras Visuais
Utilizamos gradientes lineares como `mask-image` para suavizar as bordas do canvas 3D e integrá-lo ao fundo do site.

```css
.spline-mask {
  mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
}
```

## Dependências Necessárias
- `gsap`
- `@splinetool/react-spline`
