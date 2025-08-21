import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface ModelLoaderProps {
  modelType: string;
  color: string;
}

const ModelLoader: React.FC<ModelLoaderProps> = ({ modelType, color }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const model = useMemo(() => {
    switch (modelType) {
      case 'steve':
        return <SteveModel color={color} />;
      case 'alex':
        return <AlexModel color={color} />;
      case 'villager':
        return <VillagerModel color={color} />;
      case 'sword':
        return <SwordModel color={color} />;
      case 'chest':
        return <ChestModel color={color} />;
      default:
        return <Box args={[1, 1, 1]}><meshStandardMaterial color={color} /></Box>;
    }
  }, [modelType, color]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {model}
    </group>
  );
};

// Simplified Steve Model
const SteveModel: React.FC<{ color: string }> = ({ color }) => (
  <group>
    {/* Head */}
    <Box position={[0, 1.5, 0]} args={[0.8, 0.8, 0.8]}>
      <meshStandardMaterial color="#fdbcb4" />
    </Box>
    {/* Body */}
    <Box position={[0, 0.5, 0]} args={[0.8, 1, 0.4]}>
      <meshStandardMaterial color="#00BFFF" />
    </Box>
    {/* Arms */}
    <Box position={[-0.6, 0.5, 0]} args={[0.4, 1, 0.4]}>
      <meshStandardMaterial color="#fdbcb4" />
    </Box>
    <Box position={[0.6, 0.5, 0]} args={[0.4, 1, 0.4]}>
      <meshStandardMaterial color="#fdbcb4" />
    </Box>
    {/* Legs */}
    <Box position={[-0.2, -0.5, 0]} args={[0.4, 1, 0.4]}>
      <meshStandardMaterial color="#0000CD" />
    </Box>
    <Box position={[0.2, -0.5, 0]} args={[0.4, 1, 0.4]}>
      <meshStandardMaterial color="#0000CD" />
    </Box>
  </group>
);

// Simplified Alex Model
const AlexModel: React.FC<{ color: string }> = ({ color }) => (
  <group>
    <Box position={[0, 1.5, 0]} args={[0.8, 0.8, 0.8]}>
      <meshStandardMaterial color="#fdbcb4" />
    </Box>
    <Box position={[0, 0.5, 0]} args={[0.8, 1, 0.4]}>
      <meshStandardMaterial color="#90EE90" />
    </Box>
    <Box position={[-0.6, 0.5, 0]} args={[0.35, 1, 0.4]}>
      <meshStandardMaterial color="#fdbcb4" />
    </Box>
    <Box position={[0.6, 0.5, 0]} args={[0.35, 1, 0.4]}>
      <meshStandardMaterial color="#fdbcb4" />
    </Box>
    <Box position={[-0.2, -0.5, 0]} args={[0.4, 1, 0.4]}>
      <meshStandardMaterial color="#8B4513" />
    </Box>
    <Box position={[0.2, -0.5, 0]} args={[0.4, 1, 0.4]}>
      <meshStandardMaterial color="#8B4513" />
    </Box>
  </group>
);

// Simplified Villager Model
const VillagerModel: React.FC<{ color: string }> = ({ color }) => (
  <group>
    <Box position={[0, 1.5, 0]} args={[1, 1, 1]}>
      <meshStandardMaterial color="#D2691E" />
    </Box>
    <Box position={[0, 0.3, 0]} args={[1.2, 1.5, 0.6]}>
      <meshStandardMaterial color="#8B4513" />
    </Box>
    <Cylinder position={[0, -0.8, 0]} args={[0.8, 0.8, 0.6]}>
      <meshStandardMaterial color="#654321" />
    </Cylinder>
  </group>
);

// Simplified Sword Model
const SwordModel: React.FC<{ color: string }> = ({ color }) => (
  <group rotation={[0, 0, Math.PI / 4]}>
    <Box position={[0, 1, 0]} args={[0.2, 2, 0.1]}>
      <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
    </Box>
    <Box position={[0, -0.2, 0]} args={[0.6, 0.2, 0.1]}>
      <meshStandardMaterial color="#8B4513" />
    </Box>
    <Box position={[0, -0.6, 0]} args={[0.3, 0.6, 0.1]}>
      <meshStandardMaterial color="#654321" />
    </Box>
  </group>
);

// Simplified Chest Model
const ChestModel: React.FC<{ color: string }> = ({ color }) => (
  <group>
    <Box position={[0, -0.2, 0]} args={[1.5, 0.8, 1]}>
      <meshStandardMaterial color="#8B4513" />
    </Box>
    <Box position={[0, 0.4, 0]} args={[1.5, 0.8, 1]}>
      <meshStandardMaterial color="#A0522D" />
    </Box>
    <Box position={[0, 0.1, 0.6]} args={[0.2, 0.2, 0.2]}>
      <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
    </Box>
  </group>
);

export default ModelLoader;