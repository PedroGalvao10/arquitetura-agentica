# ============================================================
# AGENTIC OS - GITHUB AUTO-SYNC
# ============================================================
# Este script sincroniza o OS e o Obsidian com o GitHub.
# ============================================================

$date = Get-Date -Format "yyyy-MM-dd HH:mm"
$paths = @(
    "c:\Users\soare\.gemini\antigravity\scratch"
)

Write-Host "`n[GisHub Sync] Iniciando sincronizacao..." -ForegroundColor Cyan

foreach ($path in $paths) {
    if (Test-Path $path) {
        Write-Host "`n>> Processando: $path" -ForegroundColor Yellow
        Set-Location $path
        
        # Inicializa Git se nao existir
        if (!(Test-Path ".git")) {
            Write-Host "   Iniciando repositório Git..."
            git init
        }

        # Adiciona alterações
        git add .
        
        # Verifica se há algo para commitar
        $status = git status --porcelain
        if ($status) {
            Write-Host "   Alterações detectadas. Commitando..."
            git commit -m "Auto-sync Agentic OS: $date"
            
            # Tenta dar push (apenas se houver remote configurado)
            $remotes = git remote
            if ($remotes) {
                Write-Host "   Enviando para o GitHub..."
                git push
            } else {
                Write-Host "   [!] Alerta: Nenhum 'remote' configurado para este caminho." -ForegroundColor Gray
                Write-Host "   Dica: Configure o repositório no GitHub e use 'git remote add origin URL'" -ForegroundColor Gray
            }
        } else {
            Write-Host "   Nenhuma alteração detectada." -ForegroundColor Green
        }
    }
}

Write-Host "`n[Concluido] Sistema sincronizado.`n" -ForegroundColor Cyan
Set-Location "c:\Users\soare\.gemini\antigravity\scratch"
