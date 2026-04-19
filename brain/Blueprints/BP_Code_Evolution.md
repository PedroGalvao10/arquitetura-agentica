---
status: approved
target_layer: 3_execution
complexity: high
tags: [blueprint, evolutionary_programming, adas, code_evolution]
created: 2026-04-19
---
# Blueprint: Code Evolution Engine (ADAS)

## Objetivo de Negócio
Criar um ecossistema autônomo e local capaz de aplicar princípios de Programação Evolutiva (EP) e Automated Design of Agentic Systems (ADAS) diretamente no código-fonte de sistemas baseados em Next.js/React.
Ao invés de apenas testar *prompts*, o motor usará LLM local para fazer "mutações" de código e medirá o fitness de maneira objetiva (ex: TypeScript compilation) e subjetiva (LLM Judge).

## Lógica de Raciocínio (Chain of Thought)

### Gatilho
O usuário (ou sistema) executa o comando: `& "execution\run_code_evolution.ps1" -Target "caminho\do\arquivo.tsx"`

### Processamento

**Passo 1 - Leitura e Parsing:**
- O script `code_evolution_engine.py` lê o arquivo alvo. 
- Um extrator de AST ou de Regex simples separa imports do bloco lógico central, ou o LLM analisa o arquivo inteiro.

**Passo 2 - Geração de Mutações (Mutators):**
- Utilizando a API local do Ollama (`qwen2.5-coder:7b` ou similar), o script gera `N` mutações com diretrizes como:
  - "Refatore para torná-lo mais performático."
  - "Aplique nomenclatura clean code e remova loops redundantes."
  - "Reduza as classes Tailwind mantendo o mesmo design."

**Passo 3 - Compilação e Fitness (O Diferencial):**
1. **Compilation Check (Fitness Físico):** O script compila a mutação usando `npx tsc --noEmit` ou similar. Se falhar, fitness zera (mutação letal).
2. **Quality Check (Fitness Estético/Lógico):** Um prompt "Juiz" analisa a mutação e atribui uma nota de qualidade de 0-100 baseada na fidelidade da mutação ao objetivo e estética limpa exigida por `Agentic OS`.

**Passo 4 - Seleção Natural:**
- O candidato com maior Score (e que compilou com sucesso) é selecionado. 
- Se superar a baseline original (score base), o arquivo alvo é substituído e o backup `_bkp` é salvo.

**Passo 5 - Log e Registro:**
- Registro do delta de melhoria no Obsidian (`Dev_Logs`).

## Entradas (Inputs)
- Arquivos de código-fonte (`.ts`, `.tsx`, `.js`).

## Saídas (Outputs)
- Código fonte mutado, testado e evoluído de forma autônoma.
- Logs e Backups no Obsidian e no sistema de arquivos local.

> [!TIP] OTIMIZAÇÃO
> O foco inicial deve ser em arquivos TypeScript utilitários (ex: `utils.ts`) para minimizar o risco de quebra de UI, antes de expandir o escopo do meta-agente para arquivos visuais complexos como `LandingPage.tsx`.
