# Site Clone & Design Reference — Antigravity

Use esta skill para replicar a estrutura, estilo e funcionalidade de um site existente a partir de uma URL. Esta skill combina capacidades de navegação e extração de design para criar um clone funcional ou uma referência de alta fidelidade.

## Protocolo de Execução

### 1. Fase de Captura (Inspecionar)
- Use o `browser_subagent` para visitar a URL alvo.
- Tire screenshots da seção Hero, navegação e blocos principais.
- Extraia o HTML estrutural (DOM) das seções mais importantes.
- Capture as variáveis CSS (Computed Styles) para cores, fontes e espaçamentos.

### 2. Fase de Mapeamento (Extract)
- Identifique a paleta de cores dominante.
- Identifique as famílias de fontes usadas (Google Fonts ou local).
- Mapeie o grid (Tailwind, Flexbox ou Grid CSS).
- Identifique bibliotecas de terceiros (Framer Motion, GSAP, Spline).

### 3. Fase de Reconstrução (Clone)
- Crie uma estrutura `index.css` com os tokens extraídos.
- Implemente os componentes seguindo a hierarquia visual capturada.
- **Adaptação Antigravity**: Não apenas copie o código bruto; reconstrua usando as melhores práticas de performance do Antigravity (lazy loading, otimização de imagem, hooks customizados).

### 4. Fase de Refinamento (Audit & Critique)
- Execute `interface-design-audit` para garantir consistência.
- Execute `interface-design-critique` para elevar o acabamento visual.

## Quando usar esta skill?
- Quando o usuário diz: "Gostei desse site, faça um igual" ou "Clone essa landing page".
- Quando precisar de uma base estruturada inspirada em um competidor ou referência premium.

## Regras de Atuação
- **Zero Placeholders**: Se o site alvo tiver uma imagem, gere uma similar usando `generate_image`.
- **Limpeza de Branding**: Remova logos e nomes da marca original, substituindo pelas definições do usuário ou do Antigravity.
