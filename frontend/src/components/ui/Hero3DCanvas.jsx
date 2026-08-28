import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    if (!currentRef) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = currentRef.clientWidth || 550;
    const height = currentRef.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentRef.appendChild(renderer.domElement);

    // Group for entire 3D Object
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Inner Glowing Core Sphere
    const coreGeo = new THREE.IcosahedronGeometry(2.4, 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x5B4BDB,
      emissive: 0x3B28C8,
      roughness: 0.1,
      metalness: 0.3,
      transmission: 0.6,
      thickness: 1.2,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.9
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Outer Wireframe Sphere Grid
    const outerGeo = new THREE.IcosahedronGeometry(3.6, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x5B4BDB,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // 3. Orbiting Glass Rings
    const ringGeo1 = new THREE.TorusGeometry(5.2, 0.06, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x10B981,
      emissive: 0x059669,
      roughness: 0.2,
      metalness: 0.8
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(6.0, 0.05, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xF43F5E,
      emissive: 0xE11D48,
      roughness: 0.2,
      metalness: 0.8
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // 4. Subtle Particle Atmosphere
    const particlesCount = 300;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      const rand = Math.random();
      if (rand < 0.5) {
        colors[i] = 0.35; colors[i + 1] = 0.29; colors[i + 2] = 0.85; // Violet
      } else if (rand < 0.8) {
        colors[i] = 0.06; colors[i + 1] = 0.72; colors[i + 2] = 0.50; // Emerald
      } else {
        colors[i] = 0.95; colors[i + 1] = 0.24; colors[i + 2] = 0.36; // Crimson
      }
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x5B4BDB, 3.5, 40);
    light1.position.set(8, 8, 8);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x10B981, 2.5, 40);
    light2.position.set(-8, -8, 8);
    scene.add(light2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = currentRef.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!currentRef) return;
      const newW = currentRef.clientWidth || 550;
      const newH = currentRef.clientHeight || 500;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Render Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      coreMesh.rotation.y += 0.008;
      outerMesh.rotation.y -= 0.004;
      outerMesh.rotation.x += 0.003;

      ring1.rotation.z += 0.006;
      ring2.rotation.z -= 0.008;

      mainGroup.rotation.y = targetX * 0.4;
      mainGroup.rotation.x = -targetY * 0.4;

      particleSystem.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentRef && renderer.domElement) {
        currentRef.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-[450px] sm:h-[500px] relative pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center" />
  );
}
