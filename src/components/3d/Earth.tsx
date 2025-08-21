import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Earth: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Earth Sphere */}
      <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#4a9b3e"
          distort={0.1}
          speed={2}
          roughness={0.4}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Atmosphere */}
      <Sphere args={[2.1, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Glow Effect */}
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#4a9b3e" />
    </group>
  );
};

export default Earth;