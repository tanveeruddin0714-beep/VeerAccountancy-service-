import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 720;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    // Subtle fog to fade the horizon into dark navy background
    scene.fog = new THREE.FogExp2(0x0b1120, 0.038);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 13);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Master 3D Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 2. Beautiful 3D Undulating Perspective Wave Terrain (Halka Sa Wave Motion)
    const planeWidth = 55;
    const planeDepth = 55;
    const segmentsX = 42;
    const segmentsZ = 42;
    const planeGeo = new THREE.PlaneGeometry(planeWidth, planeDepth, segmentsX, segmentsZ);
    planeGeo.rotateX(-Math.PI / 2.35);
    planeGeo.translate(0, -3.2, -1);

    const posAttr = planeGeo.attributes.position;
    const originalY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      originalY[i] = posAttr.getY(i);
    }

    // Glowing Wireframe Lines Material
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const waveMesh = new THREE.Mesh(planeGeo, planeMat);
    worldGroup.add(waveMesh);

    // Glowing Intersection Points on the wave
    const pointsMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.14,
      transparent: true,
      opacity: 0.75
    });
    const wavePoints = new THREE.Points(planeGeo, pointsMat);
    worldGroup.add(wavePoints);

    // 3. Central Ambient Floating 3D Geometric Ring & Icosahedron (Halka Sa Slow Rotate)
    const centralGroup = new THREE.Group();
    centralGroup.position.set(0, 0.8, -3);
    worldGroup.add(centralGroup);

    // Outer slow wireframe ring
    const ringGeo = new THREE.TorusGeometry(5.2, 0.035, 12, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3.2;
    centralGroup.add(ringMesh);

    // Second counter-angled ring
    const ring2Geo = new THREE.TorusGeometry(6.4, 0.03, 12, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.35
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = -Math.PI / 3.8;
    ring2Mesh.rotation.z = Math.PI / 5;
    centralGroup.add(ring2Mesh);

    // Floating 3D Icosahedron Core in the background
    const icoGeo = new THREE.IcosahedronGeometry(2.5, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    centralGroup.add(icoMesh);

    // Inner glowing octahedron
    const octGeo = new THREE.OctahedronGeometry(1.4, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    centralGroup.add(octMesh);

    // 4. Gentle Floating 3D Data Constellations (Floating Particles)
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 36;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 16 + 1;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.15,
      transparent: true,
      opacity: 0.65
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particleSystem);

    // 5. Gentle, subtle mouse parallax (Halka Sa mouse follow)
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = normX * 0.12; // Very gentle
      targetRotX = normY * 0.08;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 720;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Smooth Gentle Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const time = clock.getElapsedTime();

      // Halka sa smooth mouse easing
      currentRotX += (targetRotX - currentRotX) * 0.03;
      currentRotY += (targetRotY - currentRotY) * 0.03;

      worldGroup.rotation.x = currentRotX;
      worldGroup.rotation.y = currentRotY;

      // Halka sa aahista rotating geometry
      icoMesh.rotation.x = time * 0.06;
      icoMesh.rotation.y = time * 0.09;

      octMesh.rotation.x = -time * 0.09;
      octMesh.rotation.z = time * 0.07;

      ringMesh.rotation.z = time * 0.08;
      ring2Mesh.rotation.z = -time * 0.06;

      // Halka sa wave motion in 3D terrain
      const positions = planeGeo.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const vx = positions.getX(i);
        const vz = positions.getZ(i);
        // Slow gentle sine wave
        const wave =
          Math.sin(vx * 0.22 + time * 0.6) * 0.45 +
          Math.cos(vz * 0.22 + time * 0.45) * 0.35;
        positions.setY(i, originalY[i] + wave);
      }
      positions.needsUpdate = true;

      // Slow particle field drift
      particleSystem.rotation.y = time * 0.015;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose
      planeGeo.dispose();
      planeMat.dispose();
      pointsMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Top & Bottom gradient fades for elegant seamless blending */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0B1120] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0B1120] to-transparent pointer-events-none" />
    </div>
  );
};
