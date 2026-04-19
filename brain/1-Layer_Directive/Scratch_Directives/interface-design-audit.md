# Interface Design Audit — Antigravity

Use esta skill para verificar o código existente contra o sistema de design estabelecido, identificando violações de espaçamento, profundidade, cor e padrões.

## O Que Verificar

### 1. Violações de Espaçamento
- Identifique valores que não estão no grid definido (ex: 17px em um grid de 4px).
- Sugira o valor mais próximo no grid.

### 2. Violações de Profundidade
- Se o sistema for "border-only", aponte o uso de sombras.
- Controle a densidade das sombras para evitar layouts pesados.

### 3. Violações de Cor
- Se uma paleta estiver definida, verifique cores fora do padrão.
- Permita cinzas semânticos, mas aponte inconsistências.

### 4. Desvio de Padrões (Pattern Drift)
- Componentes que não seguem o padrão centralizado (ex: botões com alturas diferentes, cards com paddings variados).

## Formato de Relatório Sugerido

```markdown
**Resultados da Auditoria:**

**Violações:**
- Button.tsx:12 — Altura 38px (padrão: 36px)
- Card.tsx:8 — Sombras detectadas (sistema: apenas bordas)
- Input.tsx:20 — Espaçamento 14px (grid: 4px, sugerido: 12px ou 16px)

**Sugestões:**
- Atualizar altura do botão para o padrão.
- Substituir sombra por borda de 1px.
- Ajustar espaçamentos para múltiplos de 4.
```

## Implementação
Se não houver um sistema de design (`system.md`) definido, execute primeiro a skill `interface-design-extract` para criar um a partir do código existente.
