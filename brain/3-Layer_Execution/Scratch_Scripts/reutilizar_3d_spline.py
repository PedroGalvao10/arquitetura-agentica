import sys
import os

def generate_spline_code(scene_url, bg_color="#faf6f0"):
    """
    Gera o boilerplate do componente SplineInterativo baseado no padrão do projeto Mariana Bermudes.
    """
    template = f'''
# --- COMPONENTE REACT REUTILIZÁVEL ---

import SplineSafe from '../components/ui/SplineSafe';
import {{ useEffect, useRef, useState }} from 'react';

export const SplineInterativo = () => {{
  const splineAreaRef = useRef(null);
  const [splineApp, setSplineApp] = useState(null);

  // Otimização de Performance: Play/Stop baseado em Viewport
  useEffect(() => {{
    if (!splineApp || !splineAreaRef.current) return;

    const observer = new IntersectionObserver((entries) => {{
      entries.forEach(entry => {{
        if (entry.isIntersecting) {{
          if (typeof splineApp.play === 'function') splineApp.play();
        }} else {{
          if (typeof splineApp.stop === 'function') splineApp.stop();
        }}
      }});
    }}, {{ threshold: 0, rootMargin: '100px' }});

    observer.observe(splineAreaRef.current);
    return () => observer.disconnect();
  }}, [splineApp]);

  return (
    <div 
        ref={{splineAreaRef}}
        className="relative w-full h-[600px] md:h-[900px] overflow-visible"
        style={{={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}}}
    >
        <SplineSafe 
            scene="{scene_url}" 
            onLoad={{(spline) => {{
                spline.setBackgroundColor('{bg_color}');
                setSplineApp(spline);
            }}}}
            className="w-full h-full scale-110 md:scale-125 transition-transform"
        />
    </div>
  );
}};

# --- ESTILIZAÇÃO CSS RECOMENDADA ---

.animate-marquee-slow {{
  animation: marquee 60s linear infinite;
}}

@keyframes marquee {{
  0% {{ transform: translateX(0); }}
  100% {{ transform: translateX(-50%); }}
}}
'''
    return template

if __name__ == "__main__":
    # URL padrão do DNA caso não seja passada por argumento
    default_url = "https://prod.spline.design/23mP4RppmrjsD4Yo/scene.splinecode"
    
    scene_url = sys.argv[1] if len(sys.argv) > 1 else default_url
    
    print("-" * 50)
    print(f"Gerando Boilerplate para: {scene_url}")
    print("-" * 50)
    print(generate_spline_code(scene_url))
    print("-" * 50)
    print("DICA: Para salvar em um arquivo, use: python execution/generate_spline_interactive.py > component.tsx")
