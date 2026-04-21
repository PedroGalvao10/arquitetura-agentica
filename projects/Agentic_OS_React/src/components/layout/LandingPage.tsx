import { useEffect } from 'react';
import { initLegacyScripts } from '@/lib/legacy-scripts';
import { AgenticHoverLink } from '@/components/ui/agentic-hover-link';
import { AppleRevealText, LetterTypewriter } from '@/components/ui/apple-reveal-text';
import { SplineScene } from '@/components/ui/spline-scene';
import { Spotlight } from '@/components/ui/spotlight';
import { useScroll, useTransform, motion } from 'framer-motion';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const cleanup = initLegacyScripts();
    return cleanup;
  }, []);

  return (
    <div className="relative z-10 w-full text-white font-sans overflow-x-hidden">
      {/* PARTICLES LEGADO (REMOVIDO PARA OTIMIZAÇÃO - MANTIDO NO APP.TSX) */}

    <motion.div style={{ y: yParallax, scale: scaleParallax }} className="aurora-container pointer-events-none">
        <div className="aurora aurora-1"></div>
        <div className="aurora aurora-2"></div>
        <div className="aurora aurora-3"></div>
    </motion.div>
    <div className="grid-overlay pointer-events-none"></div>
    


    


    
    
    
    <section className="hero-section relative" id="visao">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="flex h-full min-h-screen">
          {/* Lado esquerdo — conteúdo textual */}
          <div className="w-full md:w-[45%] pl-6 md:pl-16 pr-4 relative z-10 flex flex-col justify-center">
            <div className="hero-eyebrow reveal mb-6">
                <span className="eyebrow-line"></span>
                <span>SISTEMA OPERACIONAL AGÊNTICO</span>
                <span className="eyebrow-line"></span>
            </div>
            <h1 className="hero-title text-left">
                <AppleRevealText text="O Futuro do Trabalho" className="text-white" />
                <AppleRevealText text="é Autônomo." delay={0.4} className="text-gradient" />
            </h1>
            <div className="hero-subtitle text-left max-w-xl mt-6">
                <AppleRevealText 
                   text="Você agora é o CEO de uma equipe de agentes autônomos que opera 24/7. Deixe a execução com as máquinas e foque no que importa: a sua visão."
                   delay={1}
                />
            </div>
            <div className="scroll-indicator mt-12">
                <div className="scroll-line"></div>
                <span>SCROLL</span>
            </div>
          </div>

          {/* Lado direito — robô 3D interativo */}
          <div className="hidden md:block flex-1 relative">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* MÁSCARA DE TRANSIÇÃO PARA A PRÓXIMA SEÇÃO */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#030305] via-[#030305]/80 to-transparent z-20 pointer-events-none" />
    </section>

    
    
    
    <section className="manifesto-section">
        {/* Fundo de Universo Minimalista Rotativo */}
        <div className="manifesto-bg-container">
            <div className="manifesto-universe-rotating" />
            <div className="manifesto-frosted-overlay" />
        </div>

        <div className="manifesto-wrapper">
            <blockquote className="manifesto-text reveal-word" id="manifesto">
                "Todo profissional que trabalha com IA hoje está no mesmo ponto que eu estava há meses, 
                copiando e colando prompts em chats. Eu decidi ir além. Construí um sistema onde a IA 
                não é um assistente, é um <strong>funcionário autônomo</strong> que lê documentos, 
                escreve código, testa, corrige e entrega. Sem intermediários. Sem alucinações. 
                Sem perda de contexto."
            </blockquote>
        </div>
    </section>

    
    
    
    <section className="metrics-section" id="numeros">
        <div className="metrics-header">
            <h2 className="section-title reveal-text">Resultados Reais.<br />Não Promessas.</h2>
            <p className="section-subtitle reveal">Esses números vêm do meu uso diário do sistema. Não são projeções, são dados reais de produtividade medidos ao longo de semanas de operação contínua.</p>
        </div>
        <div className="metrics-grid">
            <div className="metric-card glass reveal">
                <span className="metric-value" data-target="94.7" data-suffix="%">0%</span>
                <span className="metric-label">AI Fitness Score</span>
                <p className="metric-desc">Pontuação do motor evolutivo após 12 ciclos de auto-otimização das directivas.</p>
            </div>
            <div className="metric-card glass reveal">
                <span className="metric-value" data-target="3" data-suffix="x">0x</span>
                <span className="metric-label">Velocidade de Entrega</span>
                <p className="metric-desc">Projetos entregues 3 vezes mais rápido com o pipeline Directive → Blueprint → Execution.</p>
            </div>
            <div className="metric-card glass reveal">
                <span className="metric-value" data-target="1026" data-suffix="">0</span>
                <span className="metric-label">Skills Ativas</span>
                <p className="metric-desc">Directivas especializadas cobrindo desde web scraping até design de interfaces premium.</p>
            </div>
            <div className="metric-card glass reveal">
                <span className="metric-value" data-target="0" data-suffix=" (Local)">0</span>
                <span className="metric-label">Custo de LLM Local</span>
                <p className="metric-desc">O motor evolutivo roda 100% local via Ollama/Qwen. Zero dependência de serviços pagos para a auto-otimização.</p>
            </div>
        </div>
    </section>

    
    
    
    <section className="architecture-section" id="fluxo">
        <div className="arch-header">
             <h2 className="section-title">
                <AppleRevealText text="Arquitetura de" className="text-white" />
                <AppleRevealText text="3 Camadas." className="text-gradient" delay={0.2} />
            </h2>
            <p className="section-subtitle">
                A lógica de negócio é determinística. O sistema resolve a probabilidade dos LLMs separando tudo em{" "}<AgenticHoverLink previewKey="directives">3 camadas</AgenticHoverLink>:{" "}<AgenticHoverLink previewKey="directives">Directives</AgenticHoverLink>,{" "}<AgenticHoverLink previewKey="orchestrator">Orchestrator</AgenticHoverLink>{" "}e{" "}<AgenticHoverLink previewKey="execution">Execution</AgenticHoverLink>.
            </p>
        </div>

        <div className="layers-showcase">
            
            <div className="layer-card reveal" data-layer="1">
                <div className="layer-number">01</div>
                <div className="layer-content">
                    <div className="layer-header">
                        <span className="layer-tag directive-tag">LAYER 1</span>
                        <h3><AgenticHoverLink previewKey="directives">Directiva</AgenticHoverLink></h3>
                    </div>
                    <p className="layer-role">O "QUÊ" — Definição de Comportamento</p>
                    <p className="layer-description">
                        Esqueça prompts longos. Aqui usamos{" "}<AgenticHoverLink previewKey="directives">Directives</AgenticHoverLink>{" "}(<AgenticHoverLink previewKey="sops">SOPs</AgenticHoverLink>{" "}em Markdown). 
                        Elas definem o estado esperado, as ferramentas permitidas e os limites éticos. 
                        É a constituição que rege cada agente autonomamente.
                    </p>
                    <div className="layer-example">
                        <code>📁 directives/scrape_website.md</code>
                        <code>📁 directives/generate_report.md</code>
                        <code>📁 directives/evolutionary_protocol.md</code>
                    </div>
                </div>
                <div className="layer-visual rounded-xl border border-white/5 bg-black/50 overflow-hidden group">
                    <img 
                        src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&h=600&fit=crop" 
                        alt="Directives SOP" 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>
            </div>

            
            <div className="layer-card featured-layer reveal" data-layer="2">
                <div className="layer-number">02</div>
                <div className="layer-content">
                    <div className="layer-header">
                        <span className="layer-tag orchestrator-tag">LAYER 2 CORE</span>
                        <h3><AgenticHoverLink previewKey="orchestrator">Orquestrador</AgenticHoverLink></h3>
                    </div>
                    <p className="layer-role">O "COMO" — O Cérebro</p>
                    <p className="layer-description">
                        Sou eu. Ou melhor, é a IA operando como eu. O{" "}<AgenticHoverLink previewKey="orchestrator">Orquestrador</AgenticHoverLink>{" "}lê a{" "}<AgenticHoverLink previewKey="directives">Directiva</AgenticHoverLink>, analisa
                        os scripts disponíveis na Layer 3, e cria o plano de execução ({" "}<AgenticHoverLink previewKey="blueprint">Blueprint</AgenticHoverLink>). Ele é
                        a cola entre a intenção e a ação. Não executa nada diretamente — apenas decide
                        a rota mais eficiente e gerencia erros.
                    </p>
                    <div className="orchestrator-flow">
                        <div className="flow-node">Lê Directiva</div>
                        <div className="flow-arrow">→</div>
                        <div className="flow-node active">Analisa Scripts</div>
                        <div className="flow-arrow">→</div>
                        <div className="flow-node">Gera Blueprint</div>
                        <div className="flow-arrow">→</div>
                        <div className="flow-node">Executa</div>
                    </div>
                </div>
                <div className="layer-visual">
                    <img src="./assets/neural_network.png" alt="Rede Neural Orquestradora" loading="lazy" />
                </div>
            </div>

            
            <div className="layer-card reveal" data-layer="3">
                <div className="layer-number">03</div>
                <div className="layer-content">
                    <div className="layer-header">
                        <span className="layer-tag execution-tag">LAYER 3</span>
                        <h3><AgenticHoverLink previewKey="execution">Execução</AgenticHoverLink></h3>
                    </div>
                    <p className="layer-role">O "FAZER" — Ação Determinística</p>
                    <p className="layer-description">
                        Onde o código acontece.{" "}<AgenticHoverLink previewKey="scripts">Scripts</AgenticHoverLink>{" "}Python/JS ({" "}<AgenticHoverLink previewKey="execution">Execution</AgenticHoverLink>) focados em tarefas únicas. 
                        O{" "}<AgenticHoverLink previewKey="orchestrator">Orquestrador</AgenticHoverLink>{" "}consome estas ferramentas para interagir com o mundo real, enviando e-mails, 
                        fazendo deploy ou analisando dados.
                    </p>
                    <div className="layer-example">
                        <code>⚡ execution/scrape_single_site.py</code>
                        <code>⚡ execution/evolutionary_engine.py</code>
                        <code>⚡ execution/github_sync.ps1</code>
                    </div>
                </div>
                <div className="layer-visual">
                    <img src="./assets/server_rack.png" alt="Servidor de Execução" loading="lazy" />
                </div>
            </div>
        </div>

        
        <div className="callout-box glass reveal">
            <div className="callout-icon">💡</div>
            <div className="callout-content">
                <h4>Por que funciona?</h4>
                <p>Se a IA faz tudo sozinha, os erros se acumulam exponencialmente: 90% de precisão por passo = apenas <strong>59% de sucesso</strong> após 5 passos. A solução? Empurrar a complexidade para código determinístico. Assim, a IA foca apenas no que é boa: <strong>tomar decisões.</strong></p>
            </div>
        </div>
    </section>

    
    
    


    <section className="hybrid-section" id="motor">
        <div className="hybrid-header">
            <span className="section-label reveal">INFRAESTRUTURA</span>
            <h2 className="section-title reveal-text">Hub de Inteligência<br /><span className="text-gradient">Híbrida.</span></h2>
            <p className="section-subtitle reveal">
                O Agentic OS opera em um modelo de orquestração dupla. Para tarefas estratégicas e criação de{" "}<AgenticHoverLink previewKey="blueprint">Blueprints</AgenticHoverLink>{" "}, usamos a inteligência massiva do Claude 3.5 Sonnet. Para execução determinística, triagem de dados e auto otimização via{" "}<AgenticHoverLink previewKey="ep_engine">EP Engine</AgenticHoverLink>{" "}, usamos modelos Locais ({" "}<AgenticHoverLink previewKey="ollama">Ollama</AgenticHoverLink>{" "}).
            </p>
        </div>

        <div className="hybrid-grid">
            <div className="engine-card glass reveal">
                <div className="engine-badge cloud">☁️ CLOUD</div>
                <h3>Llama 3.1 405B</h3>
                <p className="engine-subtitle">via NVIDIA NIM / API</p>
                <ul className="engine-features">
                    <li>Planejamento estratégico complexo</li>
                    <li>Análise de documentos longos (+100K tokens)</li>
                    <li>Geração de {" "}<AgenticHoverLink previewKey="blueprint">Blueprints</AgenticHoverLink>{" "} multi etapas</li>
                    <li>Raciocínio em cadeia (Chain of Thought)</li>
                </ul>
                <div className="engine-stat">
                    <span className="stat-label">LATÊNCIA MÉDIA</span>
                    <span className="stat-value">~3.2s</span>
                </div>
            </div>

            <div className="engine-card glass featured-engine reveal">
                <div className="engine-badge local">🖥️ LOCAL</div>
                <h3>{" "}<AgenticHoverLink previewKey="qwen">Qwen 2.5 7B</AgenticHoverLink>{" "}</h3>
                <p className="engine-subtitle">via {" "}<AgenticHoverLink previewKey="ollama">Ollama</AgenticHoverLink>{" "} (100% offline)</p>
                <ul className="engine-features">
                    <li>Motor Evolutivo auto otimização de directivas</li>
                    <li>Classificação e triagem rápida</li>
                    <li>Validação de outputs antes do commit</li>
                    <li>Zero custo. Zero dependência externa.</li>
                </ul>
                <div className="engine-stat">
                    <span className="stat-label">LATÊNCIA MÉDIA</span>
                    <span className="stat-value text-gradient">~0.4s</span>
                </div>
            </div>

            <div className="engine-visual glass reveal">
                <img src="./assets/hybrid_ai_chip_1776460887134.png" alt="Chip Híbrido de IA" loading="lazy" />
                <div className="routing-label">
                    <span className="feat-icon">🎯</span>
                    <span>Roteamento Inteligente Automático via {" "}<AgenticHoverLink previewKey="orchestrator">Orquestrador</AgenticHoverLink>{" "}</span>
                </div>
            </div>
        </div>
    </section>

    
    
    
    <section className="terminal-section overflow-hidden py-10 md:py-20" id="execucao">
        <ContainerScroll
          titleComponent={
            <div className="terminal-header-info">
                <span className="section-label reveal">EXECUÇÃO EM TEMPO REAL</span>
                <h2 className="section-title reveal-text">Veja o Sistema<br />Trabalhando.</h2>
            </div>
          }
        >
          <div className="terminal-window !border-0 !bg-transparent !shadow-none !m-0 h-full w-full flex flex-col">
              <div className="terminal-bar">
                  <div className="terminal-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                  </div>
                  <span className="terminal-title">agentic os powershell ~/scratch/execution</span>
              </div>
              <div className="terminal-body !h-full flex-1" id="terminal-output">
                  <div className="terminal-line"><span className="line-num">01</span> <span className="keyword">import</span> agentic_os</div>
                  <div className="terminal-line"><span className="line-num">02</span> </div>
                  <div className="terminal-line"><span className="line-num">03</span> <LetterTypewriter text="# Inicializando Força de Trabalho Digital" className="comment" /></div>
                  <div className="terminal-line"><span className="line-num">04</span> <span className="keyword">const</span> orchestrator = agentic_os.<span className="func">boot</span>({`{`}</div>
                  <div className="terminal-line"><span className="line-num">05</span>     strategy: <span className="string">"autonomous"</span>,</div>
                  <div className="terminal-line"><span className="line-num">06</span>     context: <span className="string">"<AgenticHoverLink previewKey="obsidian">obsidian_brain</AgenticHoverLink>"</span></div>
                  <div className="terminal-line"><span className="line-num">07</span> {`})`}</div>
                  <div className="terminal-line"><span className="line-num">08</span> </div>
                  <div className="terminal-line active"><span className="line-num">09</span> <span className="keyword">await</span> {" "}<AgenticHoverLink previewKey="orchestrator">orchestrator</AgenticHoverLink>{" "}.<span className="func">solve</span>(<span className="string">"deploy modern app"</span>)</div>
              </div>
          </div>
        </ContainerScroll>
    </section>

    <section className="skills-section pt-4 overflow-visible" id="skills">

        <div className="skills-header relative z-30">
            <span className="section-label reveal">CAPACIDADES</span>
            <h2 className="section-title reveal-text pt-20">1000+ Skills.<br />Um Exército de <span className="text-gradient">Especialistas.</span></h2>
            <p className="section-subtitle reveal">
                Cada skill é uma{" "}<AgenticHoverLink previewKey="directives">directiva</AgenticHoverLink>{" "}especializada que transforma o agente generalista em um expert de domínio.
                É como ter mais de mil funcionários diferentes, cada um treinado para uma tarefa específica, disponíveis 24/7.
            </p>
        </div>
        <div className="skills-grid">
            <div className="skill-card glass reveal">
                <div className="skill-icon">🕸️</div>
                <h4>Web Scraping</h4>
                <p>Extração inteligente via{" "}<AgenticHoverLink previewKey="scripts">Layer 3 Scripts</AgenticHoverLink>{" "}de qualquer site, com caching e rate limiting.</p>
            </div>
            <div className="skill-card glass reveal">
                <div className="skill-icon">🎨</div>
                <h4>Design Expert</h4>
                <p>Interface premium Apple inspired com glassmorphism, dark mode e micro animações.</p>
            </div>
            <div className="skill-card glass reveal">
                <div className="skill-icon">🧬</div>
                <h4>Protocolo Evolutivo</h4>
                <p>Auto melhoria contínua via algoritmos genéticos. O sistema se otimiza sozinho.</p>
            </div>
            <div className="skill-card glass reveal">
                <div className="skill-icon">📊</div>
                <h4>Data Analysis</h4>
                <p>Processamento de datasets, geração de relatórios visuais e insights automatizados.</p>
            </div>
            <div className="skill-card glass reveal">
                <div className="skill-icon">🔗</div>
                <h4>API Integration</h4>
                <p>Conexão com qualquer serviço externo{" "}<AgenticHoverLink previewKey="github">GitHub</AgenticHoverLink>{" "},{" "}<AgenticHoverLink previewKey="obsidian">Obsidian</AgenticHoverLink>{" "},{" "}<AgenticHoverLink previewKey="notebooklm">NotebookLM</AgenticHoverLink>{" "}.</p>
            </div>
            <div className="skill-card glass reveal">
                <div className="skill-icon">🛡️</div>
                <h4>Error Recovery</h4>
                <p>Self annealing: quando algo quebra, o sistema lê o erro, corrige e aprende para o futuro.</p>
            </div>
            <div className="skill-card glass reveal">
                <div className="skill-icon">📝</div>
                <h4>Content Generation</h4>
                <p>Produção de textos, blog posts e documentação técnica com tom profissional calibrado.</p>
            </div>
            <div className="skill-card glass reveal">
                <div className="skill-icon">🚀</div>
                <h4>Deploy Automation</h4>
                <p>Pipeline completo: lint • test • build • {" "}<AgenticHoverLink previewKey="github">push</AgenticHoverLink>{" "} • {" "}<AgenticHoverLink previewKey="execution">deploy automático</AgenticHoverLink>{" "}.</p>
            </div>
        </div>
    </section>

    
    
    
    <section className="brain-section" id="cerebro">
        <div className="brain-content">
            <div className="brain-text">
                <span className="section-label reveal">MEMÓRIA PERSISTENTE</span>
                <h2 className="section-title reveal-text">O Segundo Cérebro.<br />Memória que <span className="text-gradient">nunca esquece.</span></h2>
                <p className="brain-description reveal">
                    Todo o conhecimento do Agentic OS é armazenado no {" "}<AgenticHoverLink previewKey="obsidian">Obsidian Brain</AgenticHoverLink>{" "} — um vault local, versionado
                    pelo Git, sincronizado com o {" "}<AgenticHoverLink previewKey="github">GitHub</AgenticHoverLink>{" "}. Não é apenas um bloco de notas: é um sistema de 
                    <strong>memória ativa</strong> onde cada decisão técnica, cada lição aprendida e cada 
                    resultado de otimização é registrado e indexado.
                </p>
                <p className="brain-description reveal">
                    Quando o agente recebe uma tarefa nova, ele primeiro consulta o {" "}<AgenticHoverLink previewKey="context_map">Context Map</AgenticHoverLink>{" "} do projeto.
                    Isso garante que ele nunca repita erros já documentados e sempre siga os padrões   
                    arquiteturais já estabelecidos. É a diferença entre um funcionário novo e um veterano
                    com anos de experiência.
                </p>
                <div className="brain-features reveal">
                    <div className="brain-feature">
                        <span className="feat-icon">📂</span>
                        <div>
                            <strong>Context Maps</strong>
                            <p>Mapas de contexto por projeto com histórico de decisões técnicas.</p>
                        </div>
                    </div>
                    <div className="brain-feature">
                        <span className="feat-icon">📋</span>
                        <div>
                            <strong>Dev Logs</strong>
                            <p>Registros automáticos de cada execução do motor evolutivo.</p>
                        </div>
                    </div>
                    <div className="brain-feature">
                        <span className="feat-icon">🔄</span>
                        <div>
                            <strong>{" "}<AgenticHoverLink previewKey="github">GitHub Sync</AgenticHoverLink>{" "}</strong>
                            <p>Versionamento automático via {" "}<AgenticHoverLink previewKey="scripts">github_sync.ps1</AgenticHoverLink>{" "} para backup e histórico.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="brain-visual reveal">
                <img src="./assets/knowledge_graph.png" alt="Grafo de Conhecimento do Segundo Cérebro" loading="lazy" />
            </div>
        </div>
    </section>

    
    
    
    <section className="evolution-section" id="evolucao">
        <div className="evo-header">
            <h2 className="section-title">
                <AppleRevealText text="O Pombo" className="text-white inline" /> {" "}<AgenticHoverLink previewKey="ep_engine">Evolutivo</AgenticHoverLink>{" "}.
                <br />
                <AppleRevealText text="O sistema que se melhora sozinho." className="text-gradient" delay={0.2} />
            </h2>
            <p className="section-subtitle">
                A {" "}<AgenticHoverLink previewKey="ep_engine">EP Engine</AgenticHoverLink>{" "} reescreve instruções usando algoritmos genéticos. Toda memória técnica é processada no {" "}<AgenticHoverLink previewKey="obsidian">Obsidian Brain</AgenticHoverLink>{" "} e contextualizada estrategicamente via {" "}<AgenticHoverLink previewKey="notebooklm">NotebookLM</AgenticHoverLink>{" "}. A inteligência auto evolucionária está viva.
            </p>
        </div>

        <div className="evo-content">
            <div className="evo-timeline reveal">
                <div className="timeline-step">
                    <div className="timeline-marker">1</div>
                    <div className="timeline-info">
                        <h4>Seleção</h4>
                        <p>O motor identifica as directivas com menor eficiência nos últimos ciclos.</p>
                    </div>
                </div>
                <div className="timeline-step">
                    <div className="timeline-marker active-marker">2</div>
                    <div className="timeline-info">
                        <h4>Mutação</h4>
                        <p>Gera N variantes da directiva original com alterações controladas via LLM local.</p>
                    </div>
                </div>
                <div className="timeline-step">
                    <div className="timeline-marker">3</div>
                    <div className="timeline-info">
                        <h4>Avaliação</h4>
                        <p>Cada mutação é avaliada por clareza, completude e alinhamento com as Regras GEMINI.md.</p>
                    </div>
                </div>
                <div className="timeline-step">
                    <div className="timeline-marker">4</div>
                    <div className="timeline-info">
                        <h4>Promoção</h4>
                        <p>Se fitness &gt; parent, a nova versão substitui a anterior. O sistema ficou mais forte e eficiente.</p>
                    </div>
                </div>
                <div className="timeline-step">
                    <div className="timeline-marker final-marker">∞</div>
                    <div className="timeline-info">
                        <h4>Loop Infinito</h4>
                        <p>O ciclo recomeça. Cada iteração reduz erros e aumenta a confiabilidade do sistema.</p>
                    </div>
                </div>
            </div>

            <div className="evo-visual glass reveal">
                <img src="./assets/evolutionary_dna_code_1776460874093.png" alt="DNA de Código Evolutivo" loading="lazy" />
                <div className="fitness-display">
                    <span className="fitness-label">FITNESS SCORE ATUAL</span>
                    <span className="fitness-value" id="fitness-counter">80.0</span>
                    <div className="fitness-bar">
                        <div className="fitness-fill" id="fitness-bar-fill"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    
    
    
    <section className="annealing-section">
        <div className="anneal-content glass reveal">
            <div className="anneal-left">
                <h3>Self Annealing Loop</h3>
                <p className="anneal-subtitle">Quando algo quebra, o sistema fica <strong>mais forte.</strong></p>
                <p>Erros não são falhas são dados de treinamento. O ciclo de auto cura funciona assim:</p>
                <ol className="anneal-steps">
                    <li><strong>Detecta:</strong> identifica o erro via stack trace estruturado</li>
                    <li><strong>Corrige:</strong> reescreve o{" "}<AgenticHoverLink previewKey="scripts">script</AgenticHoverLink>{" "}automaticamente</li>
                    <li><strong>Testa:</strong> valida a solução em ambiente isolado</li>
                    <li><strong>Atualiza:</strong> injeta a nova lição na{" "}<AgenticHoverLink previewKey="directives">directiva</AgenticHoverLink></li>
                    <li><strong>Promove:</strong> o sistema agora é imune àquele erro</li>
                </ol>
            </div>
            <div className="anneal-right">
                <img src="./assets/hands_coding.png" alt="Mãos Codificando" loading="lazy" />
            </div>
        </div>
    </section>

    
    
    
    <section className="governance-section">
        <div className="arch-header">
             <h2 className="section-title">21 Regras.<br />Zero Margem para Erro.</h2>
            <p className="section-subtitle reveal">
                O{" "}<AgenticHoverLink previewKey="gemini_rules">GEMINI.md</AgenticHoverLink>{" "}é a constituição do sistema. 21 regras operacionais que garantem que a IA
                nunca alucine, nunca gaste recursos sem permissão, e sempre documente o que faz.
            </p>
        </div>
        <div className="rules-showcase">
            <div className="rule-card glass reveal">
                <span className="rule-number">#2</span>
                <h4>Zero Alucinação</h4>
                <p>Proibido inventar dados, links ou fatos. Se não encontrar fonte confiável, diz "Não encontrado".</p>
            </div>
            <div className="rule-card glass reveal">
                <span className="rule-number">#3</span>
                <h4>Aprovação de Custos</h4>
                <p>Antes de consumir API paga, deve apresentar estimativa e pedir "Sim ou Não" explícito.</p>
            </div>
            <div className="rule-card glass reveal">
                <span className="rule-number">#15</span>
                <h4>Exponential Backoff</h4>
                <p>Toda chamada a LLM usa o utilitário <code>api_retry.py</code> com 5 tentativas, delay crescente e filtragem de erros 429/503 via{" "}<AgenticHoverLink previewKey="backoff">Exponential Backoff</AgenticHoverLink>.</p>
            </div>
            <div className="rule-card glass reveal">
                <span className="rule-number">#17</span>
                <h4>Blueprint First</h4>
                <p>Para tarefas com +3 passos, gerar Blueprint antes. Sem código antes da aprovação.</p>
            </div>
            <div className="rule-card glass reveal">
                <span className="rule-number">#21</span>
                <h4>Alta Autonomia</h4>
                <p>Após aprovação do Blueprint, execução contínua sem confirmações. Máxima eficiência.</p>
            </div>
            <div className="rule-card glass reveal">
                <span className="rule-number">#20</span>
                <h4>Memória Ativa</h4>
                <p>Após cada implementação, atualizar o Context Map com "Histórico de Decisões" e "Novas Lições".</p>
            </div>
        </div>
    </section>



    </div>
  );
};
export default LandingPage;