import { useEffect, useRef } from 'react';

// ─── Fluid Cursor Glow WebGL Layer (z-3) ───
// Simplified from smokey-cursor-effect: FBM turbulence following mouse
// NO full Navier-Stokes — lightweight FBM glow centered on cursor with lerp delay
// Blend: screen (additive light)

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;     // Smoothed mouse position (normalized 0-1)
uniform vec2 u_velocity;  // Mouse velocity for trail direction

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  float a = hash(i), b = hash(i+vec2(1,0));
  float c = hash(i+vec2(0,1)), d = hash(i+1.0);
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for(int i=0; i<4; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);

  // Distance from mouse (aspect-corrected)
  vec2 mouseUV = u_mouse;
  vec2 diff = (uv - mouseUV) * aspect;
  float dist = length(diff);

  // FBM turbulence centered on mouse
  vec2 noiseCoord = diff * 3.0 + u_time * 0.3;
  float turb = fbm(noiseCoord) * 0.5 + 0.5;

  // Velocity-based trail stretch
  float vel = length(u_velocity);
  float trailStrength = smoothstep(0.0, 0.01, vel);

  // Glow falloff — stronger near cursor, fades with distance
  float glow = exp(-dist * 8.0) * turb * 1.5;

  // Secondary softer glow ring
  float ring = exp(-dist * 3.0) * turb * 0.5;

  float total = (glow + ring) * (0.8 + trailStrength * 0.6);

  // Cool blue-white color
  vec3 color = vec3(0.7, 0.85, 1.0) * total;

  gl_FragColor = vec4(color, 1.0);
}
`;

function mkShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('FluidCursor:', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function FluidCursorWebGL() {
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
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uVel = gl.getUniformLocation(prog, 'u_velocity');

    // Mouse tracking with lerp delay
    const rawMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    const prevMouse = { x: 0.5, y: 0.5 };
    const velocity = { x: 0, y: 0 };

    let raf: number;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5); // Lower DPR for performance
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      gl.viewport(0, 0, c.width, c.height);
    };

    const render = () => {
      // Lerp mouse position for smooth trail effect
      smoothMouse.x += (rawMouse.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (rawMouse.y - smoothMouse.y) * 0.08;

      // Calculate velocity
      velocity.x = smoothMouse.x - prevMouse.x;
      velocity.y = smoothMouse.y - prevMouse.y;
      prevMouse.x = smoothMouse.x;
      prevMouse.y = smoothMouse.y;

      gl.useProgram(prog);
      gl.uniform2f(uRes, c.width, c.height);
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.uniform2f(uMouse, smoothMouse.x, 1.0 - smoothMouse.y); // Flip Y for WebGL
      gl.uniform2f(uVel, velocity.x, velocity.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      rawMouse.x = e.clientX / window.innerWidth;
      rawMouse.y = e.clientY / window.innerHeight;
    };

    resize();
    render();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);

    const vis = () => { if (document.hidden) cancelAnimationFrame(raf); else render(); };
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
      className="absolute inset-0 w-full h-full z-[3] mix-blend-screen pointer-events-none"
    />
  );
}
