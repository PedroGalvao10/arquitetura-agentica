param (
    [Parameter(Mandatory=$true)]
    [string]$Target
)

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "   ⚙️ INICIANDO AGENTIC OS CODE EVOLVER (ADAS) ⚙️" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "Alvo: $Target" -ForegroundColor Yellow
Write-Host ""

# Valida se arquivo existe
if (-Not (Test-Path -Path $Target)) {
    Write-Host "[ERRO] Arquivo não encontrado: $Target" -ForegroundColor Red
    exit 1
}

# Resolve caminho absoluto
$TargetAbs = Resolve-Path $Target

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$EngineScript = Join-Path $ScriptDir "code_evolution_engine.py"

# Executa python engine passando o absoluto do alvo
python $EngineScript $TargetAbs

Write-Host ""
Write-Host "[+] Fim do Ciclo de Evolução de Código" -ForegroundColor Green
Write-Host "Verifique os logs no Obsidian para o histórico de mutações." -ForegroundColor DarkGray
