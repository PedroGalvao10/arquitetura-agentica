# Interface Design Core — Antigravity

Este documento estabelece os fundamentos de design engineering para o sistema Antigravity. Use esta skill para garantir que todas as interfaces criadas tenham "craft" (refinamento técnico) e intencionalidade.

## Estratégia Principal
1. **Build**: Construa o rascunho estrutural normalmente.
2. **Audit**: Verifique contra o sistema de design real ou extraído.
3. **Critique**: Realize uma revisão de "Design Lead" focada em composição e detalhes.
4. **Rebuild**: Refaça as partes que foram "padrão" (default) em vez de decididas.

## Princípios de Composição
- **Ritmo Visual**: Evite densidade uniforme. Áreas abertas devem alternar com áreas densas.
- **Proporção Intencional**: Cada número (largura de sidebar, padding de card) declara o que importa na hierarquia.
- **Foco Central**: Cada tela deve ter um único objetivo dominante, destacado por tamanho, posição ou contraste.

## Refinamento Técnico (Craft)
- **Grid de 4px**: Todos os valores de espaçamento e tipografia devem ser múltiplos de 4. Sem exceções.
- **Hierarquia Tipográfica**: Não use apenas o tamanho. Use peso, tracking e opacidade para criar camadas de leitura.
- **Hierarquia de Superfícies**: Prefira mudanças tonais sutis em vez de bordas grossas ou sombras dramáticas.
- **Vida nos Elementos**: Todo elemento interativo deve ter estados de hover e press sutis. Uma interface sem estados é apenas uma fotografia de software.

## Integridade de Conteúdo
- Uma interface bonita com conteúdo sem nexo é apenas um cenário de filme. Garanta que dados de exemplo contem uma história coerente e real para o usuário.
