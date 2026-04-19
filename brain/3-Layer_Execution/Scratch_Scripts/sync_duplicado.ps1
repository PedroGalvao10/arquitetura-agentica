$sourcePath = "C:\Users\soare\.gemini\antigravity\scratch\directives\"
$destPath = "C:\Users\soare\.gemini\antigravity\Duplicado\execution\"

# 1. Remover arquivos antigos renomeados no destino
$filesToRemove = @("claude-api.md", "prompt_engineering_anthropic.md")
foreach ($file in $filesToRemove) {
    if (Test-Path (Join-Path $destPath $file)) {
        Remove-Item (Join-Path $destPath $file) -Force
        Write-Host "Removido do destino: $file"
    }
}

# 2. Copiar todos os arquivos .md de directives para Duplicado\execution
Get-ChildItem -Path $sourcePath -Filter *.md | ForEach-Object {
    Copy-Item $_.FullName -Destination $destPath -Force
    Write-Host "Copiado: $($_.Name)"
}
