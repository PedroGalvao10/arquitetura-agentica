document.addEventListener('DOMContentLoaded', () => {

    // ====================================
    //  1. 3D WEBGL PARTICLE CLOUD (Three.js)
    // ====================================
    const webglContainer = document.getElementById('webgl-container');
    
    if (webglContainer && window.THREE) {
        let scene, camera, renderer, particles;
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        function init3D() {
            scene = new THREE.Scene();
            // Fog to fade particles in the distance
            scene.fog = new THREE.FogExp2(0x030305, 0.001);

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
            camera.position.z = 1000;

            // Geometry and multiple particle clouds
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            const sizes = [];

            // Add 1500 particles
            for (let i = 0; i < 1500; i++) {
                const x = (Math.random() * 2000) - 1000;
                const y = (Math.random() * 2000) - 1000;
                const z = (Math.random() * 2000) - 1000;
                vertices.push(x, y, z);
                sizes.push(Math.random() * 1.5 + 0.5);
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

            // Custom shader material for soft glowing dots
            const material = new THREE.PointsMaterial({
                size: 2.5,
                color: 0x6e56ff, // Agentic Purple
                transparent: true,
                opacity: 0.6,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            webglContainer.appendChild(renderer.domElement);

            document.addEventListener('mousemove', onDocumentMouseMove, false);
            window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) * 0.5;
            mouseY = (event.clientY - windowHalfY) * 0.5;
        }

        function animate3D() {
            requestAnimationFrame(animate3D);

            targetX = mouseX * 0.5;
            targetY = mouseY * 0.5;

            // Mouse interaction (Orbiting)
            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (-targetY - camera.position.y) * 0.05;

            // Scroll Interaction (Z traverse)
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            // Move camera forward based on scroll
            camera.position.z = 1000 - (scrollPercent * 800);

            camera.lookAt(scene.position);

            const time = Date.now() * 0.00005;

            // Gentle rotation over time
            particles.rotation.y = time * 0.5;
            particles.rotation.x = time * 0.2;

            renderer.render(scene, camera);
        }

        init3D();
        animate3D();
    }

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
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    });

    // ====================================
    //  4. MAGNETIC BUTTONS
    // ====================================
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // ====================================
    //  5. CARD GLOW ON MOUSE
    // ====================================
    document.querySelectorAll('.glass').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(110, 86, 255, 0.06), var(--glass-bg) 60%)`;
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
                const el = entry.target;
                const target = parseFloat(el.dataset.target);
                const suffix = el.dataset.suffix || '';
                const duration = 2000;
                const startTime = performance.now();

                if (target === 0) {
                    el.textContent = `0${suffix}`;
                    counterObserver.unobserve(el);
                    return;
                }

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = target * easeOut;

                    if (Number.isInteger(target)) {
                        el.textContent = `${Math.round(current)}${suffix}`;
                    } else {
                        el.textContent = `${current.toFixed(1)}${suffix}`;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.metric-value').forEach(el => counterObserver.observe(el));

    // ====================================
    //  7. MANIFESTO: WORD-BY-WORD REVEAL
    // ====================================
    const manifesto = document.getElementById('manifesto');
    if (manifesto) {
        const html = manifesto.innerHTML;
        // Wrap each word (preserving HTML tags)
        const parsed = html.replace(/<[^>]+>/g, (tag) => `§TAG§${tag}§TAG§`);
        const parts = parsed.split('§TAG§');
        let wordHtml = '';

        parts.forEach(part => {
            if (part.startsWith('<')) {
                wordHtml += part;
            } else {
                const words = part.split(/(\s+)/);
                words.forEach(w => {
                    if (w.trim()) {
                        wordHtml += `<span class="word">${w}</span>`;
                    } else {
                        wordHtml += w;
                    }
                });
            }
        });
        manifesto.innerHTML = wordHtml;

        const words = manifesto.querySelectorAll('.word');
        const wordObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let delay = 0;
                    words.forEach((word, i) => {
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
    //  8. TERMINAL TYPING ANIMATION
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

    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !terminalStarted) {
                terminalStarted = true;
                let lineIndex = 0;

                function addLine() {
                    if (lineIndex >= terminalLines.length) return;
                    const line = terminalLines[lineIndex];
                    const div = document.createElement('div');
                    div.className = `line ${line.class}`;
                    div.textContent = line.text;
                    div.style.animationDelay = '0s';
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
    //  9. FITNESS COUNTER (Evolution)
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

                function updateFitness(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    current = 60 + (target - 60) * easeOut;
                    fitnessEl.textContent = current.toFixed(1);
                    if (fitnessFill) fitnessFill.style.width = `${(current / 100) * 100}%`;
                    if (progress < 1) requestAnimationFrame(updateFitness);
                }
                requestAnimationFrame(updateFitness);
                fitnessObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (fitnessEl) fitnessObserver.observe(fitnessEl);

    // ====================================
    //  10. SMOOTH ANCHOR SCROLL
    // ====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ====================================
    //  11. HERO SCROLL ELEVATION v2
    // ====================================
    const scrollJail = document.querySelector('.scroll-jail');
    const flyingImage = document.querySelector('.flying-image');
    
    // Lerp state
    const lerpState = {
        target: 0,
        current: 0,
        ease: 0.1
    };

    function renderHeroV2() {
        if (!scrollJail || !flyingImage) return;

        // Current scroll target
        lerpState.target = window.scrollY;
        
        // Smoothing scroll
        lerpState.current += (lerpState.target - lerpState.current) * lerpState.ease;

        const rect = scrollJail.getBoundingClientRect();
        const jailTop = scrollJail.offsetTop;
        const jailHeight = scrollJail.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Progress calculates how far we are into the 300vh jail
        // 0 = top of section at top of viewport
        // 1 = bottom of section at top of viewport
        let progress = (lerpState.current - jailTop) / (jailHeight - viewportHeight);
        progress = Math.max(0, Math.min(1, progress));

        // Interaction logic:
        // Stage 1: Entry (Bottom -> Center) | Progress 0.0 -> 0.5
        // Stage 2: Exit (Center -> Top)    | Progress 0.5 -> 1.0

        let translateY = 120; // Default out (in vh)
        let opacity = 0;
        let scale = 0.8;

        if (progress <= 0.5) {
            // Mapping 0.0-0.5 to 0.0-1.0 for entry
            const entryProgress = progress / 0.5;
            // Ease out cubic for entry
            const ease = 1 - Math.pow(1 - entryProgress, 3);
            
            translateY = 120 - (ease * 120); // 120vh -> 0vh
            opacity = ease;
            scale = 0.8 + (ease * 0.2); // 0.8 -> 1.0
        } else {
            // Mapping 0.5-1.0 to 0.0-1.0 for exit
            const exitProgress = (progress - 0.5) / 0.5;
            // Ease in cubic for exit
            const ease = Math.pow(exitProgress, 3);

            translateY = 0 - (ease * 120); // 0vh -> -120vh
            opacity = 1 - ease;
            scale = 1.0 + (ease * 0.1); // 1.0 -> 1.1 (subtle growth)
        }

        // Apply transformations
        flyingImage.style.transform = `translateX(-50%) translateY(${translateY}vh) scale(${scale})`;
        flyingImage.style.opacity = opacity;

        requestAnimationFrame(renderHeroV2);
    }

    // Initialize the loop
    if (scrollJail) requestAnimationFrame(renderHeroV2);

});
