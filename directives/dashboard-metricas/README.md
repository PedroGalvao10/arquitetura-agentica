---
name: relatorio-metricas
description: "Cria relatórios completos de métricas de redes sociais (Instagram, TikTok, YouTube, LinkedIn) em HTML interativo com gráficos Chart.js, análise estratégica e recomendações — a partir de prints ou dados do usuário. Use sempre que pedirem relatório de métricas, analisar dados de Instagram/TikTok/YouTube, dashboard de performance, relatório pro cliente, analisar insights, apresentação de resultados, ou métricas + relatório visual. Aciona com 'relatório de Instagram', 'análise de métricas', 'dashboard de performance', 'relatório pro cliente', 'métricas do mês', 'report de social media', ou prints/screenshots de insights de redes sociais. Para agências, social media managers, freelancers, empreendedores, criadores de conteúdo."
---

# Relatório de Métricas — Skill de Criação de Relatórios Interativos

Skill para criar relatórios profissionais de performance de redes sociais em HTML interativo, com gráficos reais (Chart.js), análise estratégica automatizada e recomendações baseadas em dados.

## O que esta skill faz

Transforma dados brutos de métricas (screenshots de insights, dados colados, planilhas) em um relatório HTML profissional e interativo que inclui: dashboard de KPIs, gráficos animados, tabelas de top/bottom performers com links clicáveis, análise cruzada de dados, insights estratégicos em accordion, e recomendações acionáveis.

O relatório é um arquivo .html único que abre em qualquer navegador, pode ser apresentado em reuniões e exportado em PDF.

## Processo de criação

### Passo 1 — Coletar dados e identidade visual

Antes de gerar qualquer código, extraia do usuário:

**Dados obrigatórios (sem eles o relatório não faz sentido):**
- Prints/screenshots dos insights da plataforma OU dados colados/planilha
- Período de análise (ex: últimos 30 dias, mês de março)
- Nome do perfil/marca/cliente

**Identidade visual (perguntar se não enviada):**
- Cor primária (hex) — usada em destaques, gráficos, botões
- Cor secundária (hex) — usada em backgrounds, acentos
- Cor de fundo preferida: escuro (dashboard) ou claro (relatório formal)
- Tipografia preferida (Google Fonts) — default: Inter
- Logo do cliente (URL ou arquivo) — opcional, usado no header
- Nome do autor/agência que gerou o relatório

Se o usuário não enviar identidade visual, pergunte: "qual a paleta de cores da marca? (cor primária e secundária em hex, tipo #E8612D). se preferir, posso usar um visual padrão escuro profissional."

**Contexto estratégico (melhora muito a análise):**
- Objetivo do perfil (vender, educar, branding, tráfego)
- Público-alvo
- Mudanças recentes na estratégia
- O que aconteceu no período (campanhas, feriados, viralizações)

### Passo 2 — Extrair e organizar os dados

Leia todos os prints/dados enviados e organize em categorias. Para Instagram, as métricas típicas são:

**Métricas de alcance:**
- Visualizações totais
- Contas alcançadas (e variação %)
- % seguidores vs não seguidores
- Distribuição por formato (reels, posts, stories)

**Métricas de engajamento:**
- Interações totais
- Curtidas, comentários, salvamentos, compartilhamentos, reposts (por formato)
- Taxa de engajamento (interações / visualizações)

**Métricas de crescimento:**
- Total de seguidores
- Novos seguidores (e variação %)
- Unfollows
- Taxa de retenção (1 - unfollows/novos)

**Métricas de conversão:**
- Visitas ao perfil (e variação %)
- Toques em link
- Taxa de conversão link (toques / visitas)

**Top performers:**
- Top 10 conteúdos por visualizações (título, formato, data, views)
- Links diretos dos posts (se fornecidos)

**Bottom performers:**
- 5 piores conteúdos por visualizações ou interações
- Categorizar por pilar/tema de conteúdo

**Demografia:**
- Faixa etária (%)
- Gênero (%)
- Cidades/países (%)
- Horários mais ativos

Adapte as categorias conforme a plataforma — TikTok, YouTube e LinkedIn têm métricas diferentes. Use o que o usuário enviar.

### Passo 3 — Gerar o relatório HTML

Consulte `references/report-structure.md` para a estrutura completa do HTML. O relatório deve incluir todas as seções listadas lá. Abaixo, os princípios-chave:

#### Design system

O relatório usa CSS variables para que a identidade visual seja fácil de customizar:

```css
:root {
  --primary: #E8612D;      /* cor primária da marca */
  --secondary: #1A1A2E;    /* cor secundária */
  --bg: #0F1117;           /* fundo (escuro por padrão) */
  --surface: #1A1D27;      /* cards */
  --surface2: #242836;     /* elementos internos */
  --border: #2E3345;       /* bordas */
  --text: #E5E7EB;         /* texto principal */
  --text2: #9CA3AF;        /* texto secundário */
  --text3: #6B7280;        /* texto terciário */
  --green: #22C55E;        /* métricas positivas */
  --red: #EF4444;          /* métricas negativas */
  --blue: #3B82F6;         /* acentos */
  --purple: #8B5CF6;       /* acentos */
  --pink: #EC4899;         /* acentos */
}
```

Para tema claro, inverta: `--bg: #F8FAFC`, `--surface: #FFFFFF`, `--text: #1A1A2E`, etc.

#### Dependência externa

Usar Chart.js via CDN — é a única dependência:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
```

#### Princípios de design

O relatório deve ter cara de **dashboard profissional de analytics**, não de infográfico ou material educativo. Pense Metricool, Sprout Social, Google Analytics — design limpo, sóbrio, data-driven:

- **Tipografia**: Sem serif. Inter ou a fonte da marca. Tamanhos bem hierarquizados.
- **Cor**: Uso contido. Cores de marca nos destaques, não em tudo. O fundo e os cards são neutros.
- **Gráficos**: Chart.js reais (doughnut, bar, radar, line) — nunca simular gráficos com divs ou barras CSS.
- **Espaçamento**: Generoso. Cards com padding de 24px+. Seções com 40px+ de margem.
- **Animações**: Sutis. Counters animados nos KPIs, bars que crescem no scroll, fade-in das seções. Nunca flashy.
- **Interatividade**: Tabs pra alternar dados, accordions pra insights, hover nos gráficos com tooltips, links clicáveis nos posts.

#### Seções obrigatórias

Cada relatório deve ter, nesta ordem:

1. **Topbar** — sticky, com nome do perfil e "gerado com [autor/ferramenta]"
2. **Header** — nome do relatório, período, logo se houver
3. **KPIs principais** — grid de cards com as métricas-chave, variação % com badges verde/vermelho
4. **Distribuição por formato** — gráficos doughnut com tabs (visualizações / interações)
5. **Descoberta** — gráfico doughnut seguidores vs não seguidores
6. **Engajamento detalhado** — tabs por formato (reels/posts/stories), cards com métricas + gráfico radar ou bar
7. **Top 10 conteúdos** — tabela com ranking, título, formato, data, views. Links clicáveis se fornecidos (onclick abre no Instagram/plataforma)
8. **Bottom 5 conteúdos** — tabela com piores performers, tabs por formato, + bloco de análise do padrão em vermelho
9. **Conteúdos que mais converteram seguidores** — bar chart horizontal (se dados disponíveis)
10. **Horários mais ativos** — bar chart vertical com destaque no pico
11. **Demografia** — tabs com faixa etária (bar chart), cidades (horizontal bars), gênero (doughnut)
12. **Insights estratégicos** — accordion clicável, cada insight com badge de status (positivo/atenção/oportunidade/padrão), texto analítico com métricas inline destacadas
13. **Recomendações** — grid 2 colunas, cards numerados com título + descrição
14. **Footer** — crédito ao gerador

#### Como escrever os insights

Os insights são a parte mais valiosa do relatório. Não são resumos dos dados — são **análises cruzadas que identificam padrões**:

- Cruzar alcance com engajamento: qual formato gera mais reach? qual gera mais saves?
- Identificar o que os top performers têm em comum (tema, formato, horário, hook)
- Identificar o que os bottom performers têm em comum (tema desalinhado, formato errado, horário ruim)
- Calcular razões: saves/likes (indicador de autoridade), shares/followers (viralização), conversão perfil→link
- Comparar com benchmarks quando possível (taxa de engajamento média, ratio save/like normal)
- Conectar dados demográficos com conteúdo: o público que chega é coerente com a estratégia?

Cada insight deve ter: badge de status, título direto, texto com métricas específicas (números, percentuais), e implicação prática.

Badges:
- `positivo` (verde) — métrica acima do esperado
- `atenção` (vermelho) — problema que precisa de ação
- `oportunidade` (amarelo) — potencial não explorado
- `padrão` (azul) — tendência identificada nos dados

#### Como escrever as recomendações

Cada recomendação deve ser:
- Acionável (o que fazer, não apenas o que observar)
- Baseada nos dados (referenciar a métrica específica)
- Priorizada (as mais impactantes primeiro)
- Com contexto do porquê (conectar a recomendação ao insight que a gerou)

Mínimo: 5 recomendações. Máximo: 10.

### Passo 4 — Entregar e iterar

Salve o HTML em `/sessions/.../mnt/outputs/relatorio-[nome-do-perfil].html` e apresente ao usuário com link `computer://`.

Ofereça ajustes: "quer que eu altere alguma cor, adicione alguma seção, ou ajuste a análise?"

## Adaptação por plataforma

### Instagram
Métricas-chave: visualizações, contas alcançadas, interações (likes/comments/saves/shares), seguidores, visitas ao perfil, toques em link. Formatos: reels, posts (carrosséis/estáticos), stories.

### TikTok
Métricas-chave: visualizações, tempo médio de exibição, taxa de conclusão, curtidas, comentários, compartilhamentos, seguidores. Formatos: vídeos, lives.

### YouTube
Métricas-chave: visualizações, tempo de exibição (horas), CTR de impressões, inscritos, taxa de retenção de audiência. Formatos: vídeos, shorts, lives.

### LinkedIn
Métricas-chave: impressões, cliques, taxa de engajamento, seguidores, cliques no perfil. Formatos: posts, artigos, newsletters, vídeos.

## Checklist final

Antes de entregar, verificar:

- [ ] Todas as métricas extraídas dos prints estão no relatório?
- [ ] Identidade visual da marca aplicada (cores, fonte, logo)?
- [ ] KPIs com variação % e badges verde/vermelho?
- [ ] Gráficos Chart.js reais (não barras CSS)?
- [ ] Tabs funcionando (formato, engajamento, demografia)?
- [ ] Top 10 com links clicáveis (se fornecidos)?
- [ ] Bottom 5 com análise do padrão?
- [ ] Insights cruzam dados (não apenas repetem números)?
- [ ] Recomendações são acionáveis e baseadas em dados?
- [ ] Accordion dos insights abre/fecha ao clicar?
- [ ] Counters animados nos KPIs?
- [ ] Design profissional de dashboard (não infantil)?
- [ ] Responsivo (funciona em mobile)?
- [ ] Footer com crédito?
