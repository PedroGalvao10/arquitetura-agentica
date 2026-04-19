---
type: context_map
project: IA_Coding_Environment
last_update: 2026-04-17
status: active
---
# 🗺️ Context Map: Local AI Developer Setup

Este arquivo condensa o estado atual de todo o ambiente de desenvolvimento de IA nesta máquina. **Forneça este arquivo a qualquer novo agente para situá-lo instantaneamente.**

## 🎯 Objetivo do Setup
Criar um ecossistema de desenvolvimento privado, rápido e híbrido (Local + Cloud) usando a arquitetura de 3 camadas.

## 🏗️ Arquitetura (A Regra de Ouro)
1. **Layer 1 (Directive)**: Instruções SOP e Skills (Localizadas em `[[Scratch_Directives]]`).
2. **Layer 2 (Orchestrator)**: OpenClaude e Antigravity (Decisão). 
3. **Layer 3 (Execution)**: Scripts PS1 e Python (Localizados em `[[Scratch_Scripts]]`).

## 🛠️ Stack Tecnológica
- **Backend Local**: Ollama (Modelos: `qwen2.5-coder:7b`, `nomic-embed-text`).
- **Backend Cloud**: NVIDIA NIM (Modelo: `meta/llama-3.1-405b-instruct`).
- **IDE**: VS Code + Extensão Continue.
- **Knowledge Base**: Obsidian (Este Vault).
- **CLI Agent**: OpenClaude v0.3.0.

## 📂 Caminhos Críticos (Onde as coisas moram)
- **Workdir Principal**: `c:\Users\soare\.gemini\antigravity\scratch`
- **Scripts de Launch**: `c:\Users\soare\.gemini\antigravity\scratch\execution\`
- **Vault Obsidian**: `C:\Users\soare\Desktop\Segundo_Cerebro_IA`

## ⚠️ Configurações de "Pulo do Gato" (Fixes)
- O OpenClaude no Windows exige a flag `--bare` e `--dangerously-skip-permissions`.
- Erros de `fetch failed` na NVIDIA são resolvidos com `$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"`.

---
**Instrução para a IA**: Ao ler este contexto, você deve assumir que tem permissão para operar na camada de execução (`scratch\execution`) e deve sempre priorizar a criação de notas no Obsidian para documentar novas descobertas.

## Historico de Decisoes (Memoria Ativa)

### 2026-04-17: Protocolo de Programacao Evolutiva (EP) Implementado
- **Script**: `execution/evolutionary_engine.py`
- **Launcher**: `execution/run_evolution.ps1`
- **Diretriz**: `directives/protocolo_evolutivo.md`
- **Funcao**: Otimiza diretrizes automaticamente usando algoritmo genetico via Ollama local.
- **Populacao padrao**: 20 mutacoes por ciclo.

### 2026-04-17: Regras de Alta Autonomia Ativadas
- Regras 16-21 injetadas no GEMINI.md.
- IA opera em modo autonomo apos aprovacao de Blueprint.
- NotebookLM integrado (exceto ConstitucionAI).
- Context Maps sao atualizados automaticamente apos cada marco.

