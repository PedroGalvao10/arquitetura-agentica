# Blueprint: Integração 3D / WebGL (Agentic OS Premium)

## 📌 Visão Geral
Adicionar uma camada de profundidade real à Landing Page utilizando **Three.js**. O objetivo é substituir/combinar o atual sistema híbrido por uma simulação de "Rede Neural Abstrata" ou "Data Particles" em 3D, que reage sutilmente ao mouse e ao scroll da página. 

## 🏗️ Passo a Passo da Implementação

### Passo 1: Injeção de Dependências (index.html)
- Adicionar no cabeçalho ou rodapé o CDN do `Three.js`.
- Criar um contêiner no HTML `<div id="webgl-container"></div>` logo no início do `body`, posicionado estrategicamente com z-index negativo para ficar atrás do texto, mas à frente do fundo gradiente.

### Passo 2: Estilização do Canvas (styles.css)
- Configurar o `#webgl-container` com `position: fixed`, `top: 0`, `left: 0`, `width: 100vw`, `height: 100vh`, e `pointer-events: none` (para não bloquear cliques no conteúdo).
- Integrar perfeitamente o mix-blend-mode ou opacidade para que os objetos 3D pareçam fundidos no vidro escuro.

### Passo 3: Motor 3D Customizado (script.js ou 3d-engine.js)
- **Scene, Camera & Renderer**: Configuração padrão com suporte a aspect ratio dinâmico, anti-aliasing e fundo transparente (`alpha: true`).
- **Geometria & Material**:
  - Geração de InstancedMesh ou BufferGeometry para criar centenas de "nós" (partículas brilhantes) conectadas por linhas finas.
  - O material usará cores do design system (Roxo Escuro `#6E56FF` e Branco gelo).
- **Interatividade Contínua**:
  - A rotação global do eixo Y da cena responderá lentamente ao movimento do mouse (`e.clientX` / `e.clientY`).
  - O scroll da página deslocará a Câmera no eixo Z (criando a sensação de "entrar" na rede neural durante o scroll do manifesto).

## 🛡️ Gestão de Performance
- Os efeitos 3D pausarão quando as partículas saírem do viewport ou através do uso de `IntersectionObserver`.
- Uso de `requestAnimationFrame` estrito apenas quando a aba estiver focada.

## 🤝 Aprovação
Aguardando "Aprovado" ou "Pode fazer" para iniciar a execução técnica destas etapas.
