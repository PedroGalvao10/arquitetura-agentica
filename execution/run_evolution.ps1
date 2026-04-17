# ============================================================
# RUN_EVOLUTION.PS1
# Launcher do Protocolo de Programacao Evolutiva
# Uso: & "execution\run_evolution.ps1" -Target "directives\meu_arquivo.md"
# ============================================================

param(
    [string]$Target = ""
)

$executionDir = "c:\Users\soare\.gemini\antigravity\scratch\execution"
$directivesDir = "c:\Users\soare\.gemini\antigravity\scratch\directives"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  PROTOCOLO DE PROGRAMACAO EVOLUTIVA (EP)" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# STEP 1: Verificar se o Ollama esta rodando
try {
    $ollamaCheck = Invoke-RestMethod -Uri "http://localhost:11434/api/tags" -Method Get -ErrorAction Stop
    Write-Host "[OK] Ollama detectado e rodando." -ForegroundColor Green
} catch {
    Write-Host "[ERRO] Ollama nao esta rodando!" -ForegroundColor Red
    Write-Host "       Inicie com: ollama serve" -ForegroundColor Yellow
    exit 1
}

# STEP 2: Selecionar o alvo
if ($Target -eq "") {
    Write-Host ""
    Write-Host "Selecione a diretriz a ser otimizada:" -ForegroundColor Yellow
    Write-Host ""

    $files = Get-ChildItem -Path $directivesDir -Filter "*.md" -Recurse | Select-Object -First 15
    for ($i = 0; $i -lt $files.Count; $i++) {
        $relativePath = $files[$i].FullName.Replace($directivesDir + "\", "")
        Write-Host "  [$($i+1)] $relativePath"
    }

    Write-Host ""
    $choice = Read-Host "Numero da diretriz (ou caminho completo)"

    if ($choice -match '^\d+$') {
        $idx = [int]$choice - 1
        if ($idx -ge 0 -and $idx -lt $files.Count) {
            $Target = $files[$idx].FullName
        } else {
            Write-Host "[ERRO] Opcao invalida." -ForegroundColor Red
            exit 1
        }
    } else {
        $Target = $choice
    }
}

# STEP 3: Executar o motor evolutivo
Write-Host ""
Write-Host "[INICIANDO] Motor Evolutivo..." -ForegroundColor Cyan
Write-Host "  Alvo: $Target" -ForegroundColor DarkGray
Write-Host ""

python "$executionDir\evolutionary_engine.py" "$Target"

Write-Host ""
Write-Host "[FIM] Verifique o log no Obsidian: Dev_Logs\" -ForegroundColor Green
