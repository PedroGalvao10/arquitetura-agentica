import sys
import os

def generate_canvas_scrub_code():
    """
    Gera o boilerplate para o controle de vídeo via Canvas Scrubbing.
    """
    code = '''
// Lógica de Scrubbing para React
import { useEffect, useRef } from 'react';

export const VideoScrubHero = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const frameCount = 150; // Total de imagens na pasta
    const state = { frame: 0, targetFrame: 0 };
    const images = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Carregamento de frames
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = `/frames/frame_${i.toString().padStart(4, '0')}.webp`;
            images.push(img);
        }

        const onScroll = () => {
            const rect = containerRef.current.getBoundingClientRect();
            const progress = Math.abs(rect.top) / (rect.height - window.innerHeight);
            state.targetFrame = Math.floor(progress * (frameCount - 1));
        };

        const render = () => {
            if (state.targetFrame !== state.frame) {
                state.frame += (state.targetFrame - state.frame) * 0.2;
                const img = images[Math.round(state.frame)];
                if (img && img.complete) {
                   context.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            }
            requestAnimationFrame(render);
        };

        window.addEventListener('scroll', onScroll);
        render();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div ref={containerRef} className="h-[300vh] relative">
            <canvas ref={canvasRef} className="sticky top-0 w-full h-screen object-cover" />
        </div>
    );
};
'''
    return code

if __name__ == "__main__":
    print("--- CANVAS SCRUB LOGIC (JS) ---")
    print(generate_canvas_scrub_code())
    print("\n--- PERFORMANCE TIP ---")
    print("Use .webp para os frames e limite a resolução a 1080p ou 720p dependendo do mercado alvo.")
