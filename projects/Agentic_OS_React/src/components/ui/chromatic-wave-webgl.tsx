import { useEffect, useRef } from 'react';

// ─── Chromatic Wave WebGL Layer (z-1) ───
// Extracted from web-gl-shader.tsx: sine-wave R/G/B channel offset
// Creates subtle light structure lines with chromatic aberration
// CSS opacity: 20%, blend: screen

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - u_res) / min(u_res.x, u_res.y);

  float distortion = 0.05;
  float d = length(p) * distortion;

  float rx = p.x * (1.0 + d);
  float gx = p.x;
  float bx = p.x * (1.0 - d);

  float xScale = 1.0;
  float yScale = 0.5;

  float r = 0.05 / abs(p.y + sin((rx + u_time) * xScale) * yScale);
  float g = 0.05 / abs(p.y + sin((gx + u_time) * xScale) * yScale);
  float b = 0.05 / abs(p.y + sin((bx + u_time) * xScale) * yScale);

  // Shift to blue spectrum: reduce red, boost blue
  gl_FragColor = vec4(r * 0.4, g * 0.6, b * 1.0, 1.0);
}
`;

function mkShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('ChromaticWave:', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function ChromaticWaveWebGL() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const gl = c.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const vs = mkShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = mkShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    let raf: number;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      gl.viewport(0, 0, c.width, c.height);
    };

    const render = () => {
      gl.useProgram(prog);
      gl.uniform2f(uRes, c.width, c.height);
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    const vis = () => { if (document.hidden) cancelAnimationFrame(raf); else render(); };
    document.addEventListener('visibilitychange', vis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', vis);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1, mixBlendMode: 'screen', opacity: 0.2, pointerEvents: 'none' }}
    />
  );
}
