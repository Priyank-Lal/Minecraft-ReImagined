import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useModelDisposal } from '../../hooks/useModelDisposal';

interface OptimizedModelLoaderProps {
  modelType: string;
  color: string;
  isVisible: boolean;
}

const OptimizedModelLoader: React.FC<OptimizedModelLoaderProps> = ({ 
  modelType, 
  color, 
  isVisible 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { registerGeometry, registerMaterial, dispose } = useModelDisposal(isVisible);

  useFrame((state, delta) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const model = useMemo(() => {
    if (!isVisible) return null;

    switch (modelType) {
      case 'steve':
        return <SteveModel color={color} registerMaterial={registerMaterial} />;
      case 'alex':
        return <AlexModel color={color} registerMaterial={registerMaterial} />;
      case 'villager':
        return <VillagerModel color={color} registerMaterial={registerMaterial} />;
      case 'sword':
        return <SwordModel color={color} registerMaterial={registerMaterial} />;
      case 'chest':
        return <ChestModel color={color} registerMaterial={registerMaterial} />;
      default:
        return (
          <Box args={[1, 1, 1]}>
            <meshStandardMaterial color={color} />
          </Box>
        );
    }
  }, [modelType, color, isVisible, registerMaterial]);

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {model}
    </group>
  );
};

// Enhanced model components with disposal registration
const SteveModel: React.FC<{ color: string; registerMaterial: (material: THREE.Material) => void }> = ({ 
  color, 
  registerMaterial 
}) => {
  const skinMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#fdbcb4" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  const shirtMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#00BFFF" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  const pantsMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#0000CD" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  return (
    <group>
      <Box position={[0, 1.5, 0]} args={[0.8, 0.8, 0.8]}>
        <primitive object={skinMaterial} attach="material" />
      </Box>
      <Box position={[0, 0.5, 0]} args={[0.8, 1, 0.4]}>
        <primitive object={shirtMaterial} attach="material" />
      </Box>
      <Box position={[-0.6, 0.5, 0]} args={[0.4, 1, 0.4]}>
        <primitive object={skinMaterial} attach="material" />
      </Box>
      <Box position={[0.6, 0.5, 0]} args={[0.4, 1, 0.4]}>
        <primitive object={skinMaterial} attach="material" />
      </Box>
      <Box position={[-0.2, -0.5, 0]} args={[0.4, 1, 0.4]}>
        <primitive object={pantsMaterial} attach="material" />
      </Box>
      <Box position={[0.2, -0.5, 0]} args={[0.4, 1, 0.4]}>
        <primitive object={pantsMaterial} attach="material" />
      </Box>
    </group>
  );
};

const AlexModel: React.FC<{ color: string; registerMaterial: (material: THREE.Material) => void }> = ({ 
  color, 
  registerMaterial 
}) => {
  const skinMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#fdbcb4" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  const shirtMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#90EE90" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  const pantsMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#8B4513" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  return (
    <group>
      <Box position={[0, 1.5, 0]} args={[0.8, 0.8, 0.8]}>
        <primitive object={skinMaterial} attach="material" />
      </Box>
      <Box position={[0, 0.5, 0]} args={[0.8, 1, 0.4]}>
        <primitive object={shirtMaterial} attach="material" />
      </Box>
      <Box position={[-0.6, 0.5, 0]} args={[0.35, 1, 0.4]}>
        <primitive object={skinMaterial} attach="material" />
      </Box>
      <Box position={[0.6, 0.5, 0]} args={[0.35, 1, 0.4]}>
        <primitive object={skinMaterial} attach="material" />
      </Box>
      <Box position={[-0.2, -0.5, 0]} args={[0.4, 1, 0.4]}>
        <primitive object={pantsMaterial} attach="material" />
      </Box>
      <Box position={[0.2, -0.5, 0]} args={[0.4, 1, 0.4]}>
        <primitive object={pantsMaterial} attach="material" />
      </Box>
    </group>
  );
};

const VillagerModel: React.FC<{ color: string; registerMaterial: (material: THREE.Material) => void }> = ({ 
  color, 
  registerMaterial 
}) => {
  const headMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#D2691E" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  const robeMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#8B4513" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  const baseMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#654321" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  return (
    <group>
      <Box position={[0, 1.5, 0]} args={[1, 1, 1]}>
        <primitive object={headMaterial} attach="material" />
      </Box>
      <Box position={[0, 0.3, 0]} args={[1.2, 1.5, 0.6]}>
        <primitive object={robeMaterial} attach="material" />
      </Box>
      <Cylinder position={[0, -0.8, 0]} args={[0.8, 0.8, 0.6]}>
        <primitive object={baseMaterial} attach="material" />
      </Cylinder>
    </group>
  );
};

const SwordModel: React.FC<{ color: string; registerMaterial: (material: THREE.Material) => void }> = ({ 
  color, 
  registerMaterial 
}) => {
  const bladeMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ 
      color: "#C0C0C0", 
      metalness: 0.8, 
      roughness: 0.2 
    });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  const handleMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#8B4513" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  const gripMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#654321" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Box position={[0, 1, 0]} args={[0.2, 2, 0.1]}>
        <primitive object={bladeMaterial} attach="material" />
      </Box>
      <Box position={[0, -0.2, 0]} args={[0.6, 0.2, 0.1]}>
        <primitive object={handleMaterial} attach="material" />
      </Box>
      <Box position={[0, -0.6, 0]} args={[0.3, 0.6, 0.1]}>
        <primitive object={gripMaterial} attach="material" />
      </Box>
    </group>
  );
};

const ChestModel: React.FC<{ color: string; registerMaterial: (material: THREE.Material) => void }> = ({ 
  color, 
  registerMaterial 
}) => {
  const bottomMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#8B4513" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  const topMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ color: "#A0522D" });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  const lockMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({ 
      color: "#FFD700", 
      metalness: 0.8, 
      roughness: 0.2 
    });
    registerMaterial(material);
    return material;
  }, [registerMaterial]);

  return (
    <group>
      <Box position={[0, -0.2, 0]} args={[1.5, 0.8, 1]}>
        <primitive object={bottomMaterial} attach="material" />
      </Box>
      <Box position={[0, 0.4, 0]} args={[1.5, 0.8, 1]}>
        <primitive object={topMaterial} attach="material" />
      </Box>
      <Box position={[0, 0.1, 0.6]} args={[0.2, 0.2, 0.2]}>
        <primitive object={lockMaterial} attach="material" />
      </Box>
    </group>
  );
};

export default OptimizedModelLoader;