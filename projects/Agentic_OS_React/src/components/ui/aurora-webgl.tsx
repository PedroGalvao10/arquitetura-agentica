import { useEffect, useRef } from 'react';

// ─── Aurora Nebula WebGL Layer (z-0) ───
// Adapted from animated-shader-background FBM noise aurora
// Palette: cool blues only (#60a5fa, #93c5fd)
// Max luminance: ~6%

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f*f*(3.0-2.0*f);
  float a = rnd(i), b = rnd(i+vec2(1,0)), c = rnd(i+vec2(0,1)), d = rnd(i+1.0);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

float fbm(vec2 p) {
  float t = 0.0, a = 1.0;
  mat2 m = mat2(1.0,-0.5,0.2,1.2);
  for(int i=0; i<5; i++) { t += a*noise(p); p *= 2.0*m; a *= 0.5; }
  return t;
}

float clouds(vec2 p) {
  float d = 1.0, t = 0.0;
  for(float i=0.0; i<3.0; i++) {
    float a = d*fbm(i*10.0 + p.x*0.2 + 0.2*(1.0+i)*p.y + d + i*i + p);
    t = mix(t, d, a); d = a; p *= 2.0/(i+1.0);
  }
  return t;
}

void main() {
  vec2 FC = gl_FragCoord.xy;
  float MN = min(u_res.x, u_res.y);
  vec2 uv = (FC - 0.5*u_res) / MN;
  vec2 st = uv * vec2(2.0, 1.0);
  vec3 col = vec3(0.0);
  float bg = clouds(vec2(st.x + u_time*0.3, -st.y));

  uv *= 1.0 - 0.3*(sin(u_time*0.15)*0.5+0.5);

  for(float i=1.0; i<10.0; i++) {
    uv += 0.1*cos(i*vec2(0.1+0.01*i, 0.8) + i*i + u_time*0.3 + 0.1*uv.x);
    vec2 p = uv;
    float d = length(p);
    // Blue-shifted: emphasize blue channel
    col += 0.00125/d * (cos(sin(i)*vec3(3.0, 2.5, 1.0))+1.0);
    float b = noise(i + p + bg*1.731);
    col += 0.002*b / length(max(p, vec2(b*p.x*0.02, p.y)));
    // Cool blue palette
    col = mix(col, vec3(bg*0.04, bg*0.10, bg*0.22), d);
  }

  // Cap luminance at ~6%
  col *= 0.06;
  gl_FragColor = vec4(col, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Aurora shader:', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function AuroraWebGL() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const gl = c.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Aurora link:', gl.getProgramInfoLog(prog));
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
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
      style={{ zIndex: 0, mixBlendMode: 'screen', pointerEvents: 'none' }}
    />
  );
}
