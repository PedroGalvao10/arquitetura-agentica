---
tags: [setup, agentes, ollama, nvidia, llm]
---
# 🤖 Configuração OpenClaude, NVIDIA e Ollama

Aqui documentamos tudo o que instalamos na máquina principal para habilitar a **[[2 - Layer Orchestrator (O CEM da Decisão)]]** offline e na nuvem.

### O Setup do OpenClaude
O OpenClaude é nossa "Mão Obra CLI". Ao longo desta máquina `soare`, usamos ele conectado a dois "Cérebros" diferentes:

#### 1. Cérebro Local Privado (Ollama)
Modelo principal: `qwen2.5-coder:7b`
Executa sem internet, garantindo que logs e códigos das empresas não fiquem exfiltrados.
**Script Mestre (Execution):**
> `c:\Users\soare\.gemini\antigravity\scratch\execution\start_openclaude.ps1`
> (Também acessível pelo atalho `.bat` no mesmo lugar)

#### 2. Cérebro Maior em Nuvem (NVIDIA NIM)
Modelo: `meta/llama-3.1-405b-instruct`
Quando se precisa de altíssimo raciocínio que 7 bilhões de parâmetros não cobrem. Utiliza integração local da chave `nvapi-*`.
**Script Mestre (Execution):**
> `c:\Users\soare\.gemini\antigravity\scratch\execution\start_openclaude_nvidia.ps1`

### Troubleshooting (Resolução de Erros)
- Se der **fetch failed** com o NVIDIA via console: Rode via "bare mode" (`openclaude --bare --dangerously-skip-permissions`) p/ evitar falha de HTTPS em redes com TLS rigoroso.
- Terminal quebrando símbolos: A codificação Windows/Powershell tem problemas com UTF-8 BOM, usamos Scripts desprovidos de emojis no Output real.
