/**
 * LEGACY HERO SCROLL ELEVATION V2 SCRIPT
 * Preserved from Agentic OS Premium original port.
 * 
 * Logic: Smoothly translate and scale a center image based on the scroll progress
 * of a parent "jail" container.
 */

// SCRIPT.JS SNIPPET:
/*
  const scrollJail = document.querySelector('.scroll-jail');
  const flyingImage = document.querySelector('.flying-image');
  
  let animationIdV2;
  const lerpState = { target: 0, current: 0, ease: 0.1 };

  function renderHeroV2() {
      if (!scrollJail || !flyingImage) return;

      lerpState.target = window.scrollY;
      lerpState.current += (lerpState.target - lerpState.current) * lerpState.ease;

      const jailTop = scrollJail.offsetTop;
      const jailHeight = scrollJail.offsetHeight;
      const viewportHeight = window.innerHeight;

      let progress = (lerpState.current - jailTop) / (jailHeight - viewportHeight);
      progress = Math.max(0, Math.min(1, progress));

      let translateY = 120;
      let opacity = 0;
      let scale = 0.8;

      if (progress <= 0.5) {
          const entryProgress = progress / 0.5;
          const ease = 1 - Math.pow(1 - entryProgress, 3);
          translateY = 120 - (ease * 120); 
          opacity = ease;
          scale = 0.8 + (ease * 0.2); 
      } else {
          const exitProgress = (progress - 0.5) / 0.5;
          const ease = Math.pow(exitProgress, 3);
          translateY = 0 - (ease * 120); 
          opacity = 1 - ease;
          scale = 1.0 + (ease * 0.1); 
      }

      flyingImage.style.transform = `translateX(-50%) translateY(${translateY}vh) scale(${scale})`;
      flyingImage.style.opacity = opacity.toString();

      animationIdV2 = requestAnimationFrame(renderHeroV2);
  }
*/

// CSS SNIPPET:
/*
.scroll-jail {
    height: 300vh;
    position: relative;
    z-index: 5;
}

.hero-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.flying-image {
    position: absolute;
    bottom: 0px; 
    left: 50%;
    width: 65vw;
    z-index: 10;
    pointer-events: none;
    transform: translateX(-50%) translateY(120vh) scale(0.8);
    opacity: 0;
    will-change: transform, opacity;
}
*/
