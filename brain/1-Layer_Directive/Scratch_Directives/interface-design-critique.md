# Interface Design Critique — Antigravity

Use esta skill para elevar o nível de uma entrega visual, saindo do "correto" para o "refinado" (crafted). Analise a interface como um Diretor de Design revisando o trabalho de um pleno/júnior.

## A Diferença entre Correto e Refinado
O "Correto" funciona: o grid alinha, as cores não brigam. O "Refinado" tem presença: cada decisão de pixel foi intencional. Esta skill puxa o seu output do primeiro rascunho para o produto final.

## Dimensões da Crítica

### 1. Composição e Ritmo
- A interface tem "fôlego"? Espaços abertos devem equilibrar áreas densas.
- O foco central está claro? O que o usuário veio fazer deve dominar a tela através de contraste e espaço.

### 2. Craft (Nível de Pixel)
- O grid de 4px está sendo respeitado fielmente?
- A tipografia sobrevive se o usuário "espremer os olhos" (squint test)? A hierarquia deve ser sentida mesmo sem ler as palavras.
- As superfícies sussurram hierarquia? Use tons e camadas em vez de bordas duras ou sombras óbvias.

### 3. Conteúdo e Verdade
- Os dados de exemplo fazem sentido para o contexto do produto?
- A história contada pela interface é coerente?

### 4. Estrutura de Código
- Encontre as "mentiras" do CSS: margens negativas para corrigir falhas de padding, posicionamentos absolutos usados como atalho, etc.
- A solução correta é sempre mais simples que o "hack".

## Processo de Execução
1. Analise o código/interface recém-criado.
2. Identifique onde você "aceitou o padrão" em vez de "decidir".
3. Refaça essas partes a partir da decisão, não de um patch.
4. **Não narre a crítica para o usuário**. Faça o trabalho e entregue o resultado refinado.
