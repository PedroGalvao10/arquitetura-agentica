# Video Scroll Scrubbing Blueprint: Cinematic Scrolling

Este blueprint descreve a técnica de "video scrubbing" via scroll, onde um vídeo (ou sequência de imagens) avança e retrocede conforme o usuário rola a página. Esta técnica oferece controle total sobre o tempo visual do site.

## Mecanismo Técnico (Canvas API)

Em vez de usar um elemento `<video>` simples (que tem lag e limitações de scrubbing), utilizamos uma sequência de frames renderizados em um `<canvas>`.

### Benefícios:
1. **Controle de Quadro**: Scrubbing perfeitamente suave sem lag de decodificação.
2. **Performance**: Pré-carregamento seletivo de frames.
3. **Interpolação**: Movimento suave mesmo com scroll "travado" do mouse.

## Fluxo de Implementação

1. **Geração de Frames**: O vídeo original deve ser convertido em uma sequência de imagens (ex: `.webp`).
2. **Pré-carregamento**: Carregar os primeiros quadros imediatamente e o restante em background.
3. **Cálculo de Progresso**: Relacionar a posição de scroll do container com o índice do frame.
4. **Loop de Renderização**: Utilizar `requestAnimationFrame` para desenhar o frame atual no canvas com interpolação suave.

## Exemplo de Lógica de Interpolação
```javascript
const renderLoop = () => {
    if (state.targetFrame !== state.frame) {
        const difference = state.targetFrame - state.frame;
        // Interpola para suavizar a transição (0.1 a 0.3 são boas velocidades)
        state.frame += difference * 0.25; 
        drawFrame(Math.round(state.frame));
    }
    requestAnimationFrame(renderLoop);
};
```

## Dependências Necessárias
- Nenhuma (Utiliza APIs nativas do Navegador: Canvas, RequestAnimationFrame).
- Ferramenta externa recomendada: `ffmpeg` para exportar quadros do vídeo.
