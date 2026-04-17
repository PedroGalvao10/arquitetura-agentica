# Interface Design Extract — Antigravity

Use esta skill para converter arquivos de estilo (CSS, SCSS ou variáveis em arquivos JS/TS) em um sistema de design (`system.md`) documentado e processável. É o primeiro passo para o comando `Audit`.

## A Missão
Extrair as regras implícitas no código para torná-las explícitas e garantidas.

## O Que Extrair

### 1. Sistema de Cores (Theming)
- Mapeie a paleta Core (Primária, Secundária, Superfície, Texto).
- Identifique a densidade cromática e se há suporte nativo para Dark Mode.

### 2. Tipografia
- Mapeie as famílias, pesos, line-heights e tracking (espaçamento entre letras).
- Entenda a hierarquia pretendida (H1 até Body Small).

### 3. Sistema de Grid e Espaçamento
- Identifique o "átomo" do grid (ex: base 4px ou 8px).
- Mapeie os tokens de padding e margin recorrentes.

### 4. Linguagem Visual (Tokens de Forma)
- Raios de borda (Border-radius).
- Estilo de bordas (espessura e cor padrão).
- Sombras/Elevação.

## Saída Esperada
Crie (ou atualize) um arquivo `system.md` na raiz do projeto com estas definições formatadas como tokens.
