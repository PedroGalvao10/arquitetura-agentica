@echo off
REM ============================================================
REM OPENCLAUDE + OLLAMA — Inicializador Rápido
REM Duplo-clique para abrir o OpenClaude com modelo local
REM ============================================================

echo.
echo ========================================
echo   OpenClaude + Ollama (qwen2.5-coder)
echo ========================================
echo.

REM Configurar variáveis de ambiente
set CLAUDE_CODE_USE_OPENAI=1
set OPENAI_BASE_URL=http://localhost:11434/v1
set OPENAI_MODEL=qwen2.5-coder:7b
set OPENAI_API_KEY=ollama

echo [OK] Variáveis de ambiente configuradas.
echo [OK] Modelo: %OPENAI_MODEL%
echo [OK] Endpoint: %OPENAI_BASE_URL%
echo.

REM Iniciar OpenClaude
openclaude

pause
