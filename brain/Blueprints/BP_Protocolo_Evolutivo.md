---
status: pending_approval
target_layer: 3_execution
complexity: high
tags: [blueprint, evolutionary_programming, auto_optimization]
created: 2026-04-17
---
# Blueprint: Protocolo de Programacao Evolutiva (EP)

## Objetivo de Negocio
Criar um sistema autonomo que evolui os prompts e diretrizes do usuario diariamente,
usando logica de algoritmo genetico: gera variacoes, testa, seleciona o melhor,
e substitui o original. O codigo melhora sozinho com o tempo.

## Logica de Raciocinio (Chain of Thought)

### Gatilho
O usuario executa o comando: `& "execution\run_evolution.ps1"`
(ou o Antigravity executa automaticamente ao final do dia).

### Processamento

**Passo 1 - Selecao do Alvo**
- Le o `skills_index.txt` e o `Context_Map` ativo.
- Identifica a diretriz/prompt que sera otimizada hoje.
- Define a **Funcao de Fitness** (o que queremos melhorar).

**Passo 2 - Geracao de Mutacoes (Populacao)**
- Envia o prompt/diretriz original para a API do Ollama.
- Pede N variacoes (mutacoes) com instrucoes como:
  - "Reescreva para ser 30% mais conciso"
  - "Adicione tratamento de erro que falta"
  - "Reorganize a logica para reduzir passos"
  - "Mude a ordem das instrucoes para testar eficiencia"
- Cada variacao e salva como um candidato.

**Passo 3 - Teste de Fitness**
- Cada candidato e testado contra um caso de uso padrao.
- Metricas coletadas:
  - Tokens usados (menos = melhor)
  - Tempo de resposta (menos = melhor)
  - Qualidade da saida (avaliada por LLM-juiz)
- Score final = media ponderada das metricas.

**Passo 4 - Selecao Natural**
- Candidatos ranqueados por score.
- Top 1 = novo campeao.
- Se o campeao superar a baseline, ele SUBSTITUI o original.
- Se nenhum superar, a baseline permanece (principio de precaucao).

**Passo 5 - Documentacao**
- Log gerado no Obsidian com: baseline, campeao, metricas, delta.

### Saida
- Diretriz otimizada na pasta `directives/`.
- Log de evolucao no Obsidian em `Dev_Logs/`.

## Entradas (Inputs)
- [x] Arquivo de diretriz alvo (.md)
- [x] Funcao de Fitness (definida no config)
- [x] API Ollama rodando localmente

## Saidas (Outputs)
- [x] Diretriz atualizada (se houve melhoria)
- [x] Relatorio de evolucao (.md no Obsidian)  
- [x] Metricas de antes/depois

## Tratamento de Excecoes
- Se Ollama nao estiver rodando: Abortar com mensagem clara.
- Se nenhuma mutacao superar baseline: Manter original, logar "Otimo local atingido".
- Se API timeout: Retry com backoff (Regra 15).

## Parametros Configuraveis
- `POPULATION_SIZE`: Numero de mutacoes por ciclo (padrao: 20, max recomendado: 50)
- `FITNESS_WEIGHTS`: Pesos para tokens/tempo/qualidade
- `TARGET_DIRECTIVE`: Caminho do arquivo a otimizar
- `TEST_PROMPT`: Prompt de teste para avaliar cada candidato

> [!CAUTION] NOTA DE REALISMO
> Gerar 1.000 mutacoes com testes completos consumiria horas de GPU.
> O padrao pratico e 20-50 mutacoes por ciclo. Isso ja produz
> evolucao significativa ao longo de semanas de uso diario.
> O usuario pode aumentar gradualmente conforme o hardware permitir.
