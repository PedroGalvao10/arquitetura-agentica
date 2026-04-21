# Frontend Master Checklist (Meticulous Quality)

Este guia serve como o protocolo final de verificação antes de qualquer deploy ou marco de desenvolvimento. Baseia-se no "Front-End Checklist" para garantir que o site seja rápido, acessível, seguro e otimizado para buscadores.

## 1. Performance (Obrigatório)
- [ ] **Estratégia de Imagens**: WebP/AVIF como formato padrão. Atributos `loading="lazy"` e `decoding="async"`.
- [ ] **Minificação**: CSS e JS minificados em produção.
- [ ] **Critical CSS**: CSS essencial carregado inline no `<head>`.
- [ ] **Fontes**: Uso de `font-display: swap` para evitar FOIT (Flash of Invisible Text).

## 2. SEO & Metadados (GEO Ready)
- [ ] **Title & Description**: Únicos para cada página, com palavras-chave relevantes.
- [ ] **Open Graph (OG)**: Tags para Twitter, Facebook e LinkedIn (imagem, título, descrição).
- [ ] **Canônicas**: URL canônica definida para evitar conteúdo duplicado.
- [ ] **Microdados**: JSON-LD implementado para Rich Snippets.

## 3. Acessibilidade (WCAG Compliance)
- [ ] **Contraste**: Verificação de contraste de cores (mínimo AA).
- [ ] **Semântica HTML**: Uso correto de `<h1>` a `<h6>`, `<main>`, `<nav>`, `<section>`.
- [ ] **ARIA**: Atributos `aria-label`, `aria-expanded` onde a semântica nativa falha.
- [ ] **Navegação via Teclado**: Foco visível (outline) e ordem lógica de tabulação.

## 4. Segurança & Head (Proteção de Borda)
- [ ] **CSP (Content Security Policy)**: Definido para mitigar ataques XSS.
- [ ] **Padrão HTTPS**: Redirecionamento forçado para conexões seguras.
- [ ] **Rel="noopener"**: Em todos os links externos com `target="_blank"`.

## 5. Performance de Imagens (Específico)
- [ ] **Alt Text**: Descrições significativas em todas as imagens não decorativas.
- [ ] **Dimensões**: Atributos `width` e `height` presentes para evitar Layout Shift (CLS).

---
*Referência baseada em: thedaviddias/Front-End-Checklist*
