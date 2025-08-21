import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Earth: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Create materials with useMemo for performance
  const earthMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: '#4a9b3e',
      roughness: 0.8,
      metalness: 0.1,
    }), []
  );

  const atmosphereMaterial = useMemo(() => 
    new THREE.MeshBasicMaterial({
      color: '#87ceeb',
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    }), []
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      {/* Earth Sphere */}
      <Sphere ref={meshRef} args={[2, 32, 32]} position={[0, 0, 0]}>
        <primitive object={earthMaterial} attach="material" />
      </Sphere>
      
      {/* Atmosphere */}
      <Sphere ref={atmosphereRef} args={[2.1, 16, 16]} position={[0, 0, 0]}>
        <primitive object={atmosphereMaterial} attach="material" />
      </Sphere>
      
      {/* Lighting */}
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#4a9b3e" />
      <pointLight position={[-3, -3, 3]} intensity={0.2} color="#87ceeb" />
    </group>
  );
};

export default Earth;