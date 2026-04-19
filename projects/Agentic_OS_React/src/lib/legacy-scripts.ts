export function initLegacyScripts() {
  // ====================================
  //  2. SCROLL REVEAL (IntersectionObserver)
  // ====================================
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          }
      });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-text').forEach(el => revealObserver.observe(el));

  // ====================================
  //  3. NAVBAR SCROLL BEHAVIOR
  // ====================================
  const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (!navbar) return;
      const scrollY = window.scrollY;
      if (scrollY > 80) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  };
  window.addEventListener('scroll', handleScroll);

  // ====================================
  //  4. MAGNETIC BUTTONS & CARD GLOW
  // ====================================
  const magneticListeners: any[] = [];
  document.querySelectorAll('.magnetic').forEach((btn: any) => {
      const mm = (e: any) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      };
      const ml = () => {
          btn.style.transform = 'translate(0px, 0px)';
      };
      btn.addEventListener('mousemove', mm);
      btn.addEventListener('mouseleave', ml);
      magneticListeners.push({btn, mm, ml});
  });

  document.querySelectorAll('.glass').forEach((card: any) => {
      card.addEventListener('mousemove', (e: any) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(110, 86, 255, 0.06), rgba(18, 18, 22, 0.45) 60%)`;
      });
      card.addEventListener('mouseleave', () => {
          card.style.background = '';
      });
  });

  // ====================================
  //  6. ANIMATED COUNTERS (Metrics)
  // ====================================
  const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const el: any = entry.target;
              const target = parseFloat(el.dataset.target);
              const suffix = el.dataset.suffix || '';
              const duration = 2000;
              const startTime = performance.now();

              if (target === 0) {
                  el.textContent = `0${suffix}`;
                  counterObserver.unobserve(el);
                  return;
              }

              function updateCounter(currentTime: number) {
                  const elapsed = currentTime - startTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const easeOut = 1 - Math.pow(1 - progress, 3);
                  const current = target * easeOut;

                  if (Number.isInteger(target)) {
                      el.textContent = `${Math.round(current)}${suffix}`;
                  } else {
                      el.textContent = `${current.toFixed(1)}${suffix}`;
                  }
                  if (progress < 1) requestAnimationFrame(updateCounter);
              }
              requestAnimationFrame(updateCounter);
              counterObserver.unobserve(el);
          }
      });
  }, { threshold: 0.5 });
  document.querySelectorAll('.metric-value').forEach(el => counterObserver.observe(el));

  // ====================================
  //  7. MANIFESTO: WORD-BY-WORD
  // ====================================
  const manifesto = document.getElementById('manifesto');
  if (manifesto && !manifesto.classList.contains('initialized')) {
      const html = manifesto.innerHTML;
      const parsed = html.replace(/<[^>]+>/g, (tag) => `§TAG§${tag}§TAG§`);
      const parts = parsed.split('§TAG§');
      let wordHtml = '';
      parts.forEach(part => {
          if (part.startsWith('<')) { wordHtml += part; } 
          else {
              const words = part.split(/(\s+)/);
              words.forEach(w => {
                  if (w.trim()) wordHtml += `<span class="word">${w}</span>`;
                  else wordHtml += w;
              });
          }
      });
      manifesto.innerHTML = wordHtml;
      manifesto.classList.add('initialized');

      const words = manifesto.querySelectorAll('.word');
      const wordObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  let delay = 0;
                  words.forEach(word => {
                      setTimeout(() => word.classList.add('visible'), delay);
                      delay += 40;
                  });
                  wordObserver.unobserve(entry.target);
              }
          });
      }, { threshold: 0.3 });
      wordObserver.observe(manifesto);
  }

  // ====================================
  //  8. TERMINAL TYPING
  // ====================================
  const terminalLines = [
      { text: '$ python execution/evolutionary_engine.py --directive scrape_website', class: 'prompt' },
      { text: '[INFO] Carregando directiva: directives/scrape_website.md', class: 'info' },
      { text: '[INFO] Context Map encontrado. Aplicando padrões anteriores...', class: 'info' },
      { text: '[DEBUG] Roteando para Ollama Qwen 2.5 (tarefa local)...', class: 'muted' },
      { text: '[WARN] Rate limit detectado no target. Ativando backoff (2s → 4s → 8s)', class: 'warn' },
      { text: '[INFO] Retry #2 com delay 4s... OK', class: 'info' },
      { text: '[INFO] Dados extraídos: 847 registros em 12.4s', class: 'info' },
      { text: '[INFO] Cache salvo em ./cache/scrape_2025-04-17.json', class: 'info' },
      { text: '[SUCCESS] ✓ Execução completa. Blueprint finalizado.', class: 'success' },
      { text: '[INFO] Atualizando Context Map com novas lições...', class: 'info' },
      { text: '[SUCCESS] ✓ Dev Log gravado em Obsidian: Dev_Logs/EP_Log_2025-04-17.md', class: 'success' },
      { text: '', class: 'muted' },
      { text: '$ _', class: 'prompt' },
  ];
  const terminalBody = document.getElementById('terminal-output');
  let terminalStarted = false;
  if(terminalBody) terminalBody.innerHTML = ''; // reset on hot reload
  const terminalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
          if (entry.isIntersecting && !terminalStarted) {
              terminalStarted = true;
              let lineIndex = 0;
              function addLine() {
                  if (lineIndex >= terminalLines.length || !terminalBody) return;
                  const line = terminalLines[lineIndex];
                  const div = document.createElement('div');
                  div.className = `line ${line.class}`;
                  div.textContent = line.text;
                  terminalBody.appendChild(div);
                  terminalBody.scrollTop = terminalBody.scrollHeight;
                  lineIndex++;
                  setTimeout(addLine, 300 + Math.random() * 400);
              }
              addLine();
              terminalObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.3 });
  if (terminalBody) terminalObserver.observe(terminalBody);

  // ====================================
  //  9. FITNESS COUNTER
  // ====================================
  const fitnessEl = document.getElementById('fitness-counter');
  const fitnessFill = document.getElementById('fitness-bar-fill');
  let fitnessStarted = false;
  const fitnessObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting && !fitnessStarted) {
              fitnessStarted = true;
              const target = 94.7;
              let current = 60.0;
              const duration = 4000;
              const startTime = performance.now();

              function updateFitness(now: number) {
                  const elapsed = now - startTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const easeOut = 1 - Math.pow(1 - progress, 3);
                  current = 60 + (target - 60) * easeOut;
                  if (fitnessEl) fitnessEl.textContent = current.toFixed(1);
                  if (fitnessFill) fitnessFill.style.width = `${(current / 100) * 100}%`;
                  if (progress < 1) requestAnimationFrame(updateFitness);
              }
              requestAnimationFrame(updateFitness);
              fitnessObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });
  if (fitnessEl) fitnessObserver.observe(fitnessEl);

  // cleanup function
  return () => {
     window.removeEventListener('scroll', handleScroll);
     // Note: Intersection observers auto GC when elements are removed
  };
}
