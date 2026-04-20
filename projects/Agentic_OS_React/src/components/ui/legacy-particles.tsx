import { useEffect, useRef } from "react";
import * as THREE from "three";

export function LegacyWebGLParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particles: THREE.Points;
    let animationId: number;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const init3D = () => {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x030305, 0.001);

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        3000
      );
      camera.position.z = 1000;

      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const sizes = [];

      for (let i = 0; i < 1500; i++) {
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;
        vertices.push(x, y, z);
        sizes.push(Math.random() * 1.5 + 0.5);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 2.5,
        color: 0x6e56ff, // Agentic Purple Original
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current?.appendChild(renderer.domElement);

      document.addEventListener("mousemove", onDocumentMouseMove, false);
      window.addEventListener("resize", onWindowResize, false);
    };

    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.5;
      mouseY = (event.clientY - windowHalfY) * 0.5;
    };

    const animate3D = () => {
      animationId = requestAnimationFrame(animate3D);

      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;

      const scrollPercent =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      camera.position.z = 1000 - scrollPercent * 800;
      camera.lookAt(scene.position);

      const time = Date.now() * 0.00005;
      particles.rotation.y = time * 0.5;
      particles.rotation.x = time * 0.2;

      renderer.render(scene, camera);
    };

    init3D();
    animate3D();

    const mount = mountRef.current;
    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      cancelAnimationFrame(animationId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 w-full h-full z-1 pointer-events-none opacity-80 mix-blend-lighten" />;
}
