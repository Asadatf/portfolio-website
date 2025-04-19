"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create scene
    const scene = new THREE.Scene();

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sceneRef.current.clientWidth / sceneRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(
      sceneRef.current.clientWidth,
      sceneRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    sceneRef.current.appendChild(renderer.domElement);

    // Add a torus knot - futuristic shape
    const geometry = new THREE.TorusKnotGeometry(0.8, 0.2, 100, 16);

    // Create a shader material for a futuristic look
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorA: { value: new THREE.Color("#9D4EDD") }, // Purple
        colorB: { value: new THREE.Color("#00F5FF") }, // Neon cyan
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          // Add some subtle movement
          vec3 newPosition = position;
          newPosition.y += sin(position.x * 5.0 + time) * 0.05;
          newPosition.x += cos(position.y * 5.0 + time) * 0.05;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Create a gradient based on position
          vec3 color = mix(colorA, colorB, vUv.x + sin(vPosition.z + time * 0.5) * 0.2);
          
          // Add some glow effect
          float glow = 0.5 + 0.5 * sin(time * 0.5);
          color = mix(color, colorB, glow * 0.2);
          
          // Add some edge highlighting
          float edgeHighlight = 0.05 / abs(sin(vUv.y * 20.0 + time) - vUv.x);
          color += vec3(0.0, 0.5, 0.5) * min(edgeHighlight, 1.0) * 0.5;
          
          gl_FragColor = vec4(color, 0.9);
        }
      `,
      transparent: true,
      wireframe: false,
    });

    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Add some ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add a directional light for highlights
    const directionalLight = new THREE.DirectionalLight(0x00f5ff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current) return;

      const width = sceneRef.current.clientWidth;
      const height = sceneRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update material uniforms
      material.uniforms.time.value = elapsedTime;

      // Rotate the torus knot
      torusKnot.rotation.x = elapsedTime * 0.3;
      torusKnot.rotation.y = elapsedTime * 0.2;
      torusKnot.rotation.z = elapsedTime * 0.1;

      // Render
      renderer.render(scene, camera);

      // Call animate again on the next frame
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (sceneRef.current && sceneRef.current.contains(renderer.domElement)) {
        sceneRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={sceneRef} className="w-full h-full absolute inset-0" />;
}
