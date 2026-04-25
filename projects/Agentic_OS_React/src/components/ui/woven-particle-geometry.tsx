import { useRef, useEffect } from 'react';
import * as THREE from 'three';

// ─── Woven Particle Geometry Layer (z-4 Replacement) ───
// Interactive torus knot made of 50,000 particles that react to mouse proximity.
// Based on the "Woven by Light" code provided by the user.

export const WovenParticleGeometry = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const mouseWorld = new THREE.Vector3(0, 0, 0);
    const clock = new THREE.Clock();

    // Configuration
    const particleCount = 45000; // Optimized slightly from 50k
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.6, 0.45, 256, 40); // Slightly more detailed knot

    // Initialize particles
    const torusPositions = torusKnot.attributes.position;
    const vertexCount = torusPositions.count;

    for (let i = 0; i < particleCount; i++) {
        const vertexIndex = i % vertexCount;
        const x = torusPositions.getX(vertexIndex);
        const y = torusPositions.getY(vertexIndex);
        const z = torusPositions.getZ(vertexIndex);
        
        // Add tiny randomness for a more organic "woven" feel
        const noise = 0.02;
        const nx = x + (Math.random() - 0.5) * noise;
        const ny = y + (Math.random() - 0.5) * noise;
        const nz = z + (Math.random() - 0.5) * noise;

        positions[i * 3] = nx;
        positions[i * 3 + 1] = ny;
        positions[i * 3 + 2] = nz;
        originalPositions[i * 3] = nx;
        originalPositions[i * 3 + 1] = ny;
        originalPositions[i * 3 + 2] = nz;

        const color = new THREE.Color();
        // Cycle colors: Purple to Blue to Cyan
        const hue = 0.65 + Math.random() * 0.15; // 0.65 (Blue) to 0.8 (Purple)
        color.setHSL(hue, 0.8, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        velocities[i * 3] = 0;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.015,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
        const raf = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        // Convert mouse screen to world coords (rough approximation for 2D feel)
        mouseWorld.set(mouse.x * 3.5, mouse.y * 3.5, 0);

        const posAttr = geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            // Simple vector math without object creation for performance
            const dx = posAttr[ix] - mouseWorld.x;
            const dy = posAttr[iy] - mouseWorld.y;
            const dz = posAttr[iz] - mouseWorld.z;
            const distSq = dx*dx + dy*dy + dz*dz;
            const dist = Math.sqrt(distSq);

            if (dist < 1.2) {
                const force = (1.2 - dist) * 0.015;
                const invDist = 1.0 / (dist + 0.0001);
                velocities[ix] += (dx * invDist) * force;
                velocities[iy] += (dy * invDist) * force;
                velocities[iz] += (dz * invDist) * force;
            }

            // Return to original position (Hooke's Law lite)
            velocities[ix] += (originalPositions[ix] - posAttr[ix]) * 0.002;
            velocities[iy] += (originalPositions[iy] - posAttr[iy]) * 0.002;
            velocities[iz] += (originalPositions[iz] - posAttr[iz]) * 0.002;
            
            // Damping
            velocities[ix] *= 0.94;
            velocities[iy] *= 0.94;
            velocities[iz] *= 0.94;

            posAttr[ix] += velocities[ix];
            posAttr[iy] += velocities[iy];
            posAttr[iz] += velocities[iz];
        }
        geometry.attributes.position.needsUpdate = true;

        points.rotation.y = elapsedTime * 0.08;
        points.rotation.x = elapsedTime * 0.03;
        renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        mountRef.current?.removeChild(renderer.domElement);
        geometry.dispose();
        material.dispose();
        torusKnot.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-[4] mix-blend-screen pointer-events-none" />;
};
