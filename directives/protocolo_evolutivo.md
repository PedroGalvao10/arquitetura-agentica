---
status: stable
type: directive
layer: 1_directive
tags: [evolution, optimization, core_protocol]
---
# Diretriz: Protocolo de Programacao Evolutiva (EP)

## Quando Usar
- No inicio ou final do dia de trabalho.
- Quando uma diretriz ou prompt nao esta gerando resultados satisfatorios.
- Quando o usuario diz: "Ative o EP" ou "Rode o Pombo Evolutivo".

## Fluxo de Execucao

### Passo 1: Identificar o Alvo
O Orquestrador (Antigravity) deve:
1. Ler o `Context_Map` ativo.
2. Identificar qual diretriz precisa de melhoria.
3. Definir a Funcao de Fitness (o que queremos melhorar).

### Passo 2: Gerar o Blueprint
Criar um Blueprint em `Blueprints/BP_EP_[DATA].md` com:
- Qual arquivo sera otimizado.
- Qual metrica sera priorizada.
- Aguardar aprovacao do usuario.

### Passo 3: Executar o Motor
Rodar o script:
```powershell
& "c:\Users\soare\.gemini\antigravity\scratch\execution\run_evolution.ps1" -Target "caminho\da\diretriz.md"
```

### Passo 4: Validar Resultado
- Se o motor encontrou uma melhoria: a diretriz original foi atualizada.
- Um backup do original foi salvo automaticamente com extensao `.backup_YYYYMMDD_HHMM`.
- O log foi registrado no Obsidian em `Dev_Logs/EP_Log_YYYY-MM-DD.md`.

### Passo 5: Atualizar Contexto
O Orquestrador DEVE atualizar o `Context_Map` relevante com:
- A data da ultima evolucao.
- O delta de fitness obtido.

## Scripts Associados
- Motor Python: `execution/evolutionary_engine.py`
- Launcher PS1: `execution/run_evolution.ps1`

## Observacoes
- O motor usa Ollama local por padrao (privacidade e custo zero).
- Populacao padrao: 20 mutacoes. Ajustavel no CONFIG do script.
- Principio de Precaucao: se nenhuma mutacao superar o original, ele e mantido.
