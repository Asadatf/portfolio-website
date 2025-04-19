"use client";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Check if WebGL is available
      if (!WebGL.isWebGLAvailable() && !WebGL.isWebGL2Available()) {
        console.error("WebGL is not available");
        setWebGLFailed(true);
        return;
      }

      // Basic Three.js setup
      const scene = new THREE.Scene();

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);
      renderer.domElement.addEventListener("webglcontextlost", (event) => {
        event.preventDefault();
        console.warn("WebGL context lost");
        setWebGLFailed(true);
      });

      // Create particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 2000;

      const posArray = new Float32Array(particleCount * 3);
      const scaleArray = new Float32Array(particleCount);

      // Fill the arrays
      for (let i = 0; i < particleCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 15; // x
        posArray[i + 1] = (Math.random() - 0.5) * 15; // y
        posArray[i + 2] = (Math.random() - 0.5) * 15; // z

        // Scale
        scaleArray[i / 3] = Math.random();
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );
      particlesGeometry.setAttribute(
        "scale",
        new THREE.BufferAttribute(scaleArray, 1)
      );

      // Create materials
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        transparent: true,
        opacity: 0.8,
        color: new THREE.Color("#00F5FF"), // Neon cyan
        blending: THREE.AdditiveBlending,
      });

      // Create the particle system
      const particleSystem = new THREE.Points(
        particlesGeometry,
        particlesMaterial
      );
      scene.add(particleSystem);

      // Mouse interaction
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      document.addEventListener("mousemove", handleMouseMove);

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      // Animation function
      const animate = () => {
        requestAnimationFrame(animate);

        // Slowly rotate particles
        particleSystem.rotation.x += 0.0005;
        particleSystem.rotation.y += 0.0005;

        // Make the particles follow the mouse slightly
        particleSystem.rotation.x +=
          (mouseY * 0.0008 - particleSystem.rotation.x) * 0.05;
        particleSystem.rotation.y +=
          (mouseX * 0.0008 - particleSystem.rotation.y) * 0.05;

        renderer.render(scene, camera);
      };

      animate();

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("mousemove", handleMouseMove);

        if (
          containerRef.current &&
          containerRef.current.contains(renderer.domElement)
        ) {
          containerRef.current.removeChild(renderer.domElement);
        }

        scene.remove(particleSystem);
        particlesGeometry.dispose();
        particlesMaterial.dispose();
      };
    } catch (error) {
      console.error("Error in ThreeBackground:", error);
      setWebGLFailed(true);
    }
  }, []);

  if (webGLFailed) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-primary-dark to-black opacity-50">
        {/* Fallback gradient background */}
      </div>
    );
  }

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
