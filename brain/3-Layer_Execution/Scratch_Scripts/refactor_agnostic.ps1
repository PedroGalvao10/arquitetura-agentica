$directivesPath = "C:\Users\soare\.gemini\antigravity\scratch\directives\"

# 1. Substituições de conteúdo
Get-ChildItem -Path $directivesPath -Filter *.md | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace "Claude", "IA" -replace "claude", "ia"
    Set-Content $_.FullName -Value $newContent
}

# 2. Renomeação de arquivos
$renameMap = @{
    "claude-api.md" = "ai-api.md"
    "prompt_engineering_anthropic.md" = "prompt_engineering_ai.md"
}

foreach ($oldName in $renameMap.Keys) {
    $oldPath = Join-Path $directivesPath $oldName
    $newName = $renameMap[$oldName]
    $newPath = Join-Path $directivesPath $newName
    
    if (Test-Path $oldPath) {
        Move-Item -Path $oldPath -Destination $newPath -Force
        Write-Host "Renomeado: $oldName -> $newName"
    }
}
