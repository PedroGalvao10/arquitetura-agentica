# ============================================================
# START_OPENCLAUDE.PS1
# Script de inicializacao do OpenClaude com Ollama local
# ============================================================

# STEP 1: Atualizar PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# STEP 2: Verificar se o Ollama esta rodando
try {
    $response = Invoke-RestMethod -Uri "http://localhost:11434/v1/models" -ErrorAction Stop -TimeoutSec 3
    Write-Host "[OK] Ollama esta rodando." -ForegroundColor Green
} catch {
    Write-Host "[!] Ollama nao esta respondendo. Iniciando..." -ForegroundColor Yellow
    Start-Process "ollama" -ArgumentList "serve" -WindowStyle Hidden
    Start-Sleep -Seconds 5
}

# STEP 3: Configurar variaveis de ambiente
$env:CLAUDE_CODE_USE_OPENAI = "1"
$env:OPENAI_BASE_URL = "http://localhost:11434/v1"
$env:OPENAI_MODEL = "qwen2.5-coder:7b"
$env:OPENAI_API_KEY = "ollama"

Write-Host ""
Write-Host ">>> Iniciando OpenClaude com modelo: $($env:OPENAI_MODEL)" -ForegroundColor Magenta
Write-Host ">>> Endpoint: $($env:OPENAI_BASE_URL)" -ForegroundColor Gray
Write-Host ""

# STEP 4: Iniciar OpenClaude
openclaude
