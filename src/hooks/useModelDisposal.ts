import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const useModelDisposal = (isVisible: boolean) => {
  const geometriesRef = useRef<THREE.BufferGeometry[]>([]);
  const materialsRef = useRef<THREE.Material[]>([]);
  const texturesRef = useRef<THREE.Texture[]>([]);

  const registerGeometry = (geometry: THREE.BufferGeometry) => {
    geometriesRef.current.push(geometry);
  };

  const registerMaterial = (material: THREE.Material) => {
    materialsRef.current.push(material);
  };

  const registerTexture = (texture: THREE.Texture) => {
    texturesRef.current.push(texture);
  };

  const dispose = () => {
    // Dispose geometries
    geometriesRef.current.forEach(geometry => {
      geometry.dispose();
    });
    geometriesRef.current = [];

    // Dispose materials
    materialsRef.current.forEach(material => {
      if (material.dispose) {
        material.dispose();
      }
    });
    materialsRef.current = [];

    // Dispose textures
    texturesRef.current.forEach(texture => {
      texture.dispose();
    });
    texturesRef.current = [];
  };

  useEffect(() => {
    if (!isVisible) {
      dispose();
    }

    return () => {
      dispose();
    };
  }, [isVisible]);

  return {
    registerGeometry,
    registerMaterial,
    registerTexture,
    dispose,
  };
};