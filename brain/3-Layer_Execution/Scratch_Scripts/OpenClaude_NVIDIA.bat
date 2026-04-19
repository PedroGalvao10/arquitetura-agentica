@echo off
REM ============================================================
REM OPENCLAUDE + NVIDIA NIM (Cérebro Maior)
REM ============================================================

set CLAUDE_CODE_USE_OPENAI=1
set OPENAI_BASE_URL=https://integrate.api.nvidia.com/v1
set OPENAI_MODEL=meta/llama-3.1-405b-instruct
set OPENAI_API_KEY=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

echo ========================================
echo   OpenClaude + NVIDIA (Llama 405B)
echo ========================================
echo.
echo [!] Usando modo --bare para garantir que as respostas aparecam.

openclaude --bare

pause
