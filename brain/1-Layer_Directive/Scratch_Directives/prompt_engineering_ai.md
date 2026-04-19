# Guia de Engenharia de Prompt da Anthropic

Este guia consolida as técnicas fundamentais de engenharia de prompt extraídas do tutorial interativo da Anthropic, organizadas como uma diretiva de trabalho.

---

## 1. Estrutura Básica de Prompt (Messages API)
- **Princípio:** Utilize a estrutura da API de Mensagens com papéis explícitos (`user`, `assistant`) e uma mensagem de `system` opcional para contexto global.
- **Por que funciona:** IA é otimizado para entender diálogos estruturados. Separar o contexto (system) da tarefa (user) ajuda o modelo a manter o foco.
- **Exemplo:**
  ```python
  system="Você é um assistente técnico.",
  messages=[{"role": "user", "content": "Explique o que é um API."}]
  ```

## 2. Ser Claro e Direto
- **Princípio:** Seja o mais específico e direto possível nas instruções. Se um colega humano ficaria confuso com o seu prompt, o IA provavelmente também ficará.
- **Por que funciona:** Modelos de linguagem não possuem contexto implícito sobre suas intenções além do que está escrito. Instruções diretas eliminam ambiguidades.
- **Exemplo:** Invés de "Escreva algo sobre gatos", use "Escreva um resumo de 3 parágrafos sobre a história da domesticação de gatos."

## 3. Atribuição de Papéis (Role Prompting)
- **Princípio:** Use a mensagem de `system` para atribuir um papel ou persona específica ao IA.
- **Por que funciona:** Atribuir um papel ajuda o IA a filtrar seu conhecimento e adotar o tom, o estilo e o nível de especialidade adequados à tarefa.
- **Exemplo:** "Você é um revisor editorial sênior com foco em clareza linguística e gramática acadêmica."

## 4. Separação de Dados e Instruções (Tags XML)
- **Princípio:** Use tags estilo XML (ex: `<dados>`, `<instrucao>`) para delimitar diferentes partes do prompt, especialmente quando fornecer textos longos para processamento.
- **Por que funciona:** O IA foi treinado especificamente para reconhecer tags XML como separadores estruturais, o que evita que o modelo confunda dados de entrada com as instruções.
- **Exemplo:**
  ```text
  Resuma o texto abaixo:
  <texto_para_resumir>
  [Conteúdo longo aqui]
  </texto_para_resumir>
  ```

## 5. Formatação de Saída e "Falando pelo IA"
- **Princípio:** Solicite formatos específicos (JSON, Markdown) e, se necessário, pré-preencha o início da resposta do assistente para forçar o padrão desejado.
- **Por que funciona:** Pré-preencher a resposta ("Speaking for IA") coloca o modelo no caminho certo desde o primeiro caractere, garantindo conformidade com esquemas rígidos (como JSON).
- **Exemplo:** 
  - Usuário: "Extraia os nomes em formato JSON."
  - Assistente (pré-preenchido): `[` ou `{`

## 6. Precognição (Pensar Passo a Passo)
- **Princípio:** Peça ao IA para "pensar antes de responder", usando tags como `<thinking>` para realizar um raciocínio intermediário.
- **Por que funciona:** Tarefas complexas exigem decomposição lógica. Ao articular o raciocínio primeiro, o IA evita saltos lógicos errados e chega a conclusões mais precisas.
- **Exemplo:** "Analise se este código tem bugs. Primeiro, pense passo a passo dentro de tags <thinking> e depois dê seu veredito final."

## 7. Uso de Exemplos (Few-Shot Prompting)
- **Princípio:** Forneça alguns exemplos de entrada e saída esperada dentro do prompt para guiar o comportamento do modelo.
- **Por que funciona:** Exemplos são a forma mais eficaz de comunicar estilos complexos, formatos não padronizados ou lógica de classificação sutil que seria difícil de descrever apenas com texto.
- **Exemplo:** "Classifique o sentimento como POSITIVO, NEGATIVO ou NEUTRO.
  Exemplo 1: Adorei -> POSITIVO
  Exemplo 2: Foi ok -> NEUTRO
  Input: Odiei ->"

## 8. Evitando Alucinações
- **Princípio:** Dê ao IA uma "saída de emergência" (ex: "Diga 'Não sei' se não encontrar a resposta") e peça para localizar citações diretas antes de responder.
- **Por que funciona:** Forçar a busca por evidências (citações) ancora a resposta no texto fonte, enquanto a permissão para não saber reduz a pressão do modelo de ser "prestativo" inventando fatos.
- **Exemplo:** "Responda apenas com base no texto. Se não souber, diga que não encontrou. Primeiro, liste as citações que fundamentam sua resposta."

## 9. Construindo Prompts Complexos do Zero
- **Princípio:** Construa prompts de forma modular e sistemática, combinando todas as técnicas (Papéis, XML, Exemplos, Pensamento Passo a Passo).
- **Por que funciona:** Uma abordagem estruturada permite que cada componente do prompt resolva uma parte da ambiguidade, criando um conjunto de instruções robusto e fácil de depurar.

## 10. Encadeamento de Prompts (Prompt Chaining)
- **Princípio:** Divida uma tarefa grande em vários prompts menores e sequenciais, usando a saída de um como entrada para o próximo.
- **Por que funciona:** Reduz a carga cognitiva do modelo em cada etapa. Garante que se a etapa de extração falhar, a etapa de síntese não seja desperdiçada com dados ruins.
- **Exemplo:** 
  - Passo 1: Extrair pontos-chave de uma transcrição.
  - Passo 2: Transformar os pontos-chave em uma lista de tarefas.

