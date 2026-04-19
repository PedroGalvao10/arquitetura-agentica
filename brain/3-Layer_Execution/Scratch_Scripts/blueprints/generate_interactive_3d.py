import sys
import os

def generate_tilt_hook():
    """
    Gera o código TypeScript para o hook useTilt.
    """
    code = '''
import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useTilt(ref, intensity = 10) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      
      const tiltX = (py - 0.5) * intensity;
      const tiltY = (px - 0.5) * -intensity;
      
      gsap.to(el, {
        rotateX: tiltX,
        rotateY: tiltY,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5 });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref, intensity]);
}
'''
    return code

def generate_spline_setup():
    """
    Gera a lógica de integração do Spline com Intersection Observer.
    """
    code = '''
// No componente React:
const [splineApp, setSplineApp] = useState(null);
const splineRef = useRef(null);

useEffect(() => {
  if (!splineApp || !splineRef.current) return;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) splineApp.play();
    else splineApp.stop();
  }, { threshold: 0 });
  observer.observe(splineRef.current);
  return () => observer.disconnect();
}, [splineApp]);
'''
    return code

if __name__ == "__main__":
    print("--- USE_TILT HOOK (TSX) ---")
    print(generate_tilt_hook())
    print("\n--- SPLINE OPTIMIZATION ---")
    print(generate_spline_setup())
    print("\n--- DEPENDENCIES ---")
    print("npm install gsap @splinetool/react-spline")
