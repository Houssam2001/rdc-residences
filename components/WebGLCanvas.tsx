"use client";

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform float uProgress;
uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

// Simple pseudo-random noise
float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  
  // Distortion effect based on progress and noise
  float disp = rand(uv) * 0.1 * sin(uProgress * 3.1415);
  vec2 distortedUv1 = uv + vec2(disp);
  vec2 distortedUv2 = uv - vec2(disp);
  
  // Parallax zoom effect
  vec2 p1 = (distortedUv1 - 0.5) * (1.0 - uProgress * 0.1) + 0.5;
  vec2 p2 = (distortedUv2 - 0.5) * (1.0 - (1.0 - uProgress) * 0.1) + 0.5;
  
  vec4 color1 = texture2D(uTex1, p1);
  vec4 color2 = texture2D(uTex2, p2);
  
  // Smooth mix
  vec4 finalColor = mix(color1, color2, uProgress);
  
  gl_FragColor = finalColor;
}
`;

function Scene({ currentImage }: { currentImage: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  
  const [textures, setTextures] = useState({ tex1: null as THREE.Texture | null, tex2: null as THREE.Texture | null });
  const [progress, setProgress] = useState(0);
  const isTransitioning = useRef(false);

  // Keep track of the current image loaded to avoid reloading
  const loadedImage = useRef(currentImage);

  // Initialize first texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(currentImage, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setTextures({ tex1: tex, tex2: tex });
    });
  }, []);

  // Handle image changes
  useEffect(() => {
    if (currentImage === loadedImage.current) return;
    if (isTransitioning.current) return; // Ignore clicks while transitioning

    isTransitioning.current = true;
    loadedImage.current = currentImage;

    const loader = new THREE.TextureLoader();
    loader.load(currentImage, (newTex) => {
      newTex.colorSpace = THREE.SRGBColorSpace;
      
      // Setup the next texture
      setTextures((prev) => ({ tex1: prev.tex1, tex2: newTex }));
      
      // Animate progress 0 -> 1
      if (!materialRef.current) return;
      gsap.fromTo(
        materialRef.current.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (materialRef.current) setProgress(materialRef.current.uniforms.uProgress.value);
          },
          onComplete: () => {
            // Swap textures so tex1 is now the new texture, and reset progress to 0
            setTextures({ tex1: newTex, tex2: newTex });
            if (materialRef.current) materialRef.current.uniforms.uProgress.value = 0;
            setProgress(0);
            isTransitioning.current = false;
          }
        }
      );
    });
  }, [currentImage]);

  const uniforms = useMemo(
    () => ({
      uTex1: { value: null },
      uTex2: { value: null },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uTex1.value = textures.tex1;
      materialRef.current.uniforms.uTex2.value = textures.tex2;
    }
  });

  if (!textures.tex1) return null;

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function WebGLCanvas({ currentImage }: { currentImage: string }) {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene currentImage={currentImage} />
      </Canvas>
    </div>
  );
}
