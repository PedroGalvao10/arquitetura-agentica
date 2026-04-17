# ============================================================
# START_OPENCLAUDE_NVIDIA.PS1
# Script de inicializacao com NVIDIA NIM (Cerebro Maior)
# ============================================================

# STEP 1: Atualizar PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# STEP 2: Configurar variaveis de ambiente
$env:CLAUDE_CODE_USE_OPENAI = "1"
$env:OPENAI_BASE_URL = "https://integrate.api.nvidia.com/v1"
$env:OPENAI_MODEL = "meta/llama-3.1-405b-instruct" 
$env:OPENAI_API_KEY = "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"

Write-Host ""
Write-Host ">>> Iniciando OpenClaude com NVIDIA NIM (Llama 405B)..." -ForegroundColor Cyan
Write-Host ">>> Modo: Texto Simples (--bare) para maior compatibilidade" -ForegroundColor Gray
Write-Host ""

# STEP 3: Iniciar OpenClaude em modo compativel
openclaude --bare
