---
tags: [arquitetura, manifesto, regras]
---
# 🏛️ A Arquitetura de 3 Camadas

Baseado nas diretrizes do `GEMINI.md`, nosso sistema é dividido para separar a probabilidade da IA da previsibilidade da máquina estrutural. Isso resolve a imprecisão comum dos LLMs.

### [[1 - Layer Directive (O QUÊ fazer)]]
Protocolos Operacionais Padrões (SOPs) escritos em Markdown. 
São instruções em linguagem natural para direcionar os agentes (como dar ordens a um funcionário humano).
*Ex: Guias de Web Scraping, Checklists de SEO, Princípios UI/UX.*

### [[2 - Layer Orchestrator (O CEM da Decisão)]]
É a "colher do pedreiro", o maestro (Agentes como Antigravity, OpenClaude).
A inteligência lê a **Layer 1**, resolve erros de imprevisibilidade, toma as decisões e descobre como prosseguir, então aciona a **Layer 3**.

### [[3 - Layer Execution (O FAZER)]]
Scripts puramente determinísticos (ex: `.py`, `.ps1`). Processam APIs sem errar, não alucinam, são estáveis. 
Agentes não executam tarefas manuais repetitivas; eles chamam essas ferramentas estruturadas.

---
**Regra de Ouro (Self-Annealing):**
> Ferramenta falhou? O Orquestrador conserta (Layer 3), testa e depois atualiza o Procedimento Piloto (Layer 1) com base no que ele aprendeu. O sistema nunca comete o mesmo erro num ciclo temporal vasto.
