# ============================================================
# GENERATE_DEV_LOG.PS1
# Script para documentar automaticamente o progresso do dia
# ============================================================

$vaultLogs = "C:\Users\soare\Desktop\Segundo_Cerebro_IA\Dev_Logs"
$scratchDir = "c:\Users\soare\.gemini\antigravity\scratch"
$date = Get-Date -Format "yyyy-MM-dd"
$time = Get-Date -Format "HH:mm"
$logFile = Join-Path $vaultLogs "Log_$date.md"

# 1. Detectar arquivos modificados hoje
$recentFiles = Get-ChildItem -Path $scratchDir -Recurse | Where-Object { $_.LastWriteTime -gt (Get-Date).Date -and !$_.PSIsContainer }

$content = @"
---
type: dev_log
date: $date
timestamp: $time
status: automated_report
---
# 📓 Diário de Desenvolvimento - $date

## 🚀 Arquivos Modificados Recentemente
"@

foreach ($file in $recentFiles) {
    $content += "`n- **$($file.Name)** (Modificado em: $($file.LastWriteTime.ToString("HH:mm")))"
}

$content += @"

## 🧠 Resumo do Trabalho (Preencher com a IA)
> [!TIP] Ação Requerida
> Copie a lista acima, cole no chat da sua IA e pergunte: 
> "Com base nesses arquivos que modifiquei, resuma os principais avanços técnicos de hoje para o meu Log."

## 🚧 Pendências para Amanhã
- [ ] [Insira aqui o que falta]

"@

# 2. Salvar ou anexar ao Log do dia
if (Test-Path $logFile) {
    Add-Content -Path $logFile -Value "`n---`n### Sessão das $time`n$content"
} else {
    New-Item -ItemType File -Path $logFile -Value $content -Force
}

Write-Host "Log diário gerado no Obsidian: $logFile" -ForegroundColor Green
