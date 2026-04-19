---
tags: [scripts, automacao, ferramentas]
---
# 🛠️ Hub de Ferramentas (Execution)

Neste espaço catalogamos os utilitários determinísticos e códigos criados (os "operários") focados em executar a **[[3 - Layer Execution (O FAZER)]]**.

Quando um Agente (como Antigravity) estiver orquestrando uma tarefa, ele deve sempre consultar primeiro as ferramentas que já existem aqui.

### Ferramentas de Sistema da IA
- **`start_openclaude.ps1`**: Liga o ambiente do OpenClaude em interface limpa (sem travas TTY ou UTF-8) com porta conectada no host `11434` (Ollama qwen2.5).
- **`start_openclaude_nvidia.ps1`**: Idem, mas consome o token da cloud para LLMs ultra gigantescos.
- **`config.json` do "Continue"**: Presente em `.continue/` para integração no VS Code bidirecional. Usado para o Autocomplete determinístico na aba lateral do IDE.

### Ferramentas Operacionais de Repositório
- **`import_skills_v2.py`**: Motor de sincronização que lê o ZIP externo de "skills" Lovable/Anthropic, trunca marcas exclusivistas (sanitização de "Claude" p/ Agente Genérico) e atualiza o `skills_index.txt`, distribuindo em Pastas Primárias e Pastas Backup (`Duplicado`). Ferramenta crítica no Self-Annealing de conhecimento.

> *Dica: Qualquer novo script `.js`, `.py` ou `.bat` incluído na base com autorização restrita do Usuário também deve parar num "Registry" daqui para não ser esquecido na poeira digital.*
