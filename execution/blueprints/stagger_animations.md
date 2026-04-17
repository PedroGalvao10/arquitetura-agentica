# Stagger Animations Blueprint: Progress Reveal

Este blueprint descreve o sistema de animação de entrada em cascata (stagger) utilizando `Framer Motion`. Este padrão é ideal para listas, grids e seções de texto que devem surgir de forma fluida conforme o usuário faz o scroll.

## Componentes Centrais

### 1. `StaggerReveal` (Container)
Define o contexto da animação e o trigger de visibilidade.
- Propriedades: `staggerInterval`, `delay`, `amount` (threshold de scroll).

### 2. `StaggerItem` (Criança)
Define o tipo de animação individual.
- Direções suportadas: `up` (padrão) e `left`.

## Exemplo de Uso
```tsx
<StaggerReveal staggerInterval={0.15}>
  <StaggerItem><h1>Título</h1></StaggerItem>
  <StaggerItem><p>Subtítulo</p></StaggerItem>
  <StaggerItem><button>Ação</button></StaggerItem>
</StaggerReveal>
```

## Dependências Necessárias
- `framer-motion`
- `react`

## Detalhes de Implementação
- Utiliza `useInView` com o parâmetro `once: true` para evitar que a animação dispare repetidamente.
- Utiliza `staggerChildren` no objeto de transição do Framer Motion para automação da cascata.
