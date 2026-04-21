import { useEffect, useRef } from 'react';

// ─── Icosahedron Wireframe WebGL Layer (z-2) ───
// Extracted from geometric-blur-mesh: 3D wireframe platonic solid
// Locked to icosahedron shape, slow rotation, mouse proximity → thicker lines
// CSS opacity: 20%, blend: screen

const VERT = `
attribute vec3 a_position;
void main() { gl_Position = vec4(a_position, 1.0); }
`;

const FRAG = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_time;
uniform vec2 u_mouse;

#define PI 3.14159265
#define TWO_PI 6.28318530

mat3 rotateY(float a) {
  float s=sin(a), c=cos(a);
  return mat3(c,0,s, 0,1,0, -s,0,c);
}
mat3 rotateX(float a) {
  float s=sin(a), c=cos(a);
  return mat3(1,0,0, 0,c,-s, 0,s,c);
}
mat3 rotateZ(float a) {
  float s=sin(a), c=cos(a);
  return mat3(c,-s,0, s,c,0, 0,0,1);
}

vec2 coord(vec2 p) {
  p = p / u_resolution.xy;
  if(u_resolution.x > u_resolution.y) {
    p.x *= u_resolution.x / u_resolution.y;
    p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
  } else {
    p.y *= u_resolution.y / u_resolution.x;
    p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
  }
  p -= 0.5;
  return p;
}

vec2 project(vec3 p) {
  float perspective = 2.0 / (2.0 - p.z);
  return p.xy * perspective;
}

float distToSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p-a, ba = b-a;
  float h = clamp(dot(pa,ba)/dot(ba,ba), 0.0, 1.0);
  return length(pa - ba*h);
}

float drawLine(vec2 p, vec2 a, vec2 b, float thickness, float blur) {
  float d = distToSegment(p, a, b);
  return smoothstep(thickness+blur, thickness-blur, d);
}

void getIcosahedronVertices(out vec3 v[12]) {
  float t = (1.0 + sqrt(5.0)) / 2.0;
  float s = 1.0 / sqrt(1.0 + t*t);
  v[0]=vec3(-s,t*s,0); v[1]=vec3(s,t*s,0);
  v[2]=vec3(-s,-t*s,0); v[3]=vec3(s,-t*s,0);
  v[4]=vec3(0,-s,t*s); v[5]=vec3(0,s,t*s);
  v[6]=vec3(0,-s,-t*s); v[7]=vec3(0,s,-t*s);
  v[8]=vec3(t*s,0,-s); v[9]=vec3(t*s,0,s);
  v[10]=vec3(-t*s,0,-s); v[11]=vec3(-t*s,0,s);
}

void main() {
  vec2 st = coord(gl_FragCoord.xy);
  vec2 mouse = coord(u_mouse * u_pixelRatio) * vec2(1.0, -1.0);

  float mouseDistance = length(st - mouse);
  float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, mouseDistance);

  // Slow rotation
  float time = u_time * 0.15;
  mat3 rotation = rotateY(time + mouse.x * mouseInfluence * 0.3)
                * rotateX(time * 0.7 + mouse.y * mouseInfluence * 0.3)
                * rotateZ(time * 0.05);

  float scale = 0.35;
  // Mouse proximity: thicker lines near cursor
  float thickness = mix(0.0015, 0.004, mouseInfluence);
  float blur = mix(0.0002, 0.002, mouseInfluence);

  vec3 v[12];
  getIcosahedronVertices(v);
  for(int i=0; i<12; i++) { v[i] = rotation * (v[i] * scale); }

  float result = 0.0;
  // All 30 edges of icosahedron
  result += drawLine(st,project(v[0]),project(v[1]),thickness,blur);
  result += drawLine(st,project(v[0]),project(v[5]),thickness,blur);
  result += drawLine(st,project(v[0]),project(v[7]),thickness,blur);
  result += drawLine(st,project(v[0]),project(v[10]),thickness,blur);
  result += drawLine(st,project(v[0]),project(v[11]),thickness,blur);
  result += drawLine(st,project(v[1]),project(v[5]),thickness,blur);
  result += drawLine(st,project(v[1]),project(v[7]),thickness,blur);
  result += drawLine(st,project(v[1]),project(v[8]),thickness,blur);
  result += drawLine(st,project(v[1]),project(v[9]),thickness,blur);
  result += drawLine(st,project(v[2]),project(v[3]),thickness,blur);
  result += drawLine(st,project(v[2]),project(v[4]),thickness,blur);
  result += drawLine(st,project(v[2]),project(v[6]),thickness,blur);
  result += drawLine(st,project(v[2]),project(v[10]),thickness,blur);
  result += drawLine(st,project(v[2]),project(v[11]),thickness,blur);
  result += drawLine(st,project(v[3]),project(v[4]),thickness,blur);
  result += drawLine(st,project(v[3]),project(v[6]),thickness,blur);
  result += drawLine(st,project(v[3]),project(v[8]),thickness,blur);
  result += drawLine(st,project(v[3]),project(v[9]),thickness,blur);
  result += drawLine(st,project(v[4]),project(v[5]),thickness,blur);
  result += drawLine(st,project(v[4]),project(v[11]),thickness,blur);
  result += drawLine(st,project(v[5]),project(v[9]),thickness,blur);
  result += drawLine(st,project(v[5]),project(v[11]),thickness,blur);
  result += drawLine(st,project(v[6]),project(v[7]),thickness,blur);
  result += drawLine(st,project(v[6]),project(v[8]),thickness,blur);
  result += drawLine(st,project(v[6]),project(v[10]),thickness,blur);
  result += drawLine(st,project(v[7]),project(v[8]),thickness,blur);
  result += drawLine(st,project(v[7]),project(v[10]),thickness,blur);
  result += drawLine(st,project(v[8]),project(v[9]),thickness,blur);
  result += drawLine(st,project(v[9]),project(v[4]),thickness,blur);
  result += drawLine(st,project(v[10]),project(v[11]),thickness,blur);

  result = clamp(result, 0.0, 1.0);

  // White with subtle blue tint
  vec3 color = vec3(0.85, 0.90, 1.0) * result;

  // Soft vignette
  color *= 1.0 - length(st) * 0.15;

  gl_FragColor = vec4(color, 1.0);
}
`;

function mkShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Icosahedron:', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function IcosahedronWebGL() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseDampRef = useRef({ x: 0, y: 0 });

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

    const vertices = new Float32Array([-1,-1,0, 1,-1,0, -1,1,0, 1,1,0]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uDpr = gl.getUniformLocation(prog, 'u_pixelRatio');

    let raf: number;
    const t0 = Date.now();
    let lastFrame = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      c.style.width = `${window.innerWidth}px`;
      c.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, c.width, c.height);
    };

    const render = (now: number) => {
      const dt = (now - lastFrame) / 1000;
      lastFrame = now;

      // Smooth mouse
      mouseDampRef.current.x += (mouseRef.current.x - mouseDampRef.current.x) * 6 * dt;
      mouseDampRef.current.y += (mouseRef.current.y - mouseDampRef.current.y) * 6 * dt;

      const dpr = Math.min(window.devicePixelRatio, 2);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform2f(uRes, c.width, c.height);
      gl.uniform1f(uTime, (Date.now() - t0) / 1000);
      gl.uniform2f(uMouse, mouseDampRef.current.x, mouseDampRef.current.y);
      gl.uniform1f(uDpr, dpr);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      const rect = c.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    resize();
    raf = requestAnimationFrame(render);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);

    const vis = () => { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(render); };
    document.addEventListener('visibilitychange', vis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
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
      style={{ zIndex: 2, mixBlendMode: 'screen', opacity: 0.2, pointerEvents: 'none' }}
    />
  );
}
