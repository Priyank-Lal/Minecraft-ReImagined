import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useInView } from 'framer-motion';
import OptimizedModelLoader from './3d/OptimizedModelLoader';

interface LazyModelProps {
  modelType: string;
  color: string;
  className?: string;
}

const LazyModel: React.FC<LazyModelProps> = ({ modelType, color, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    threshold: 0.1, 
    margin: '100px',
    once: false 
  });
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldRender(true);
    }
  }, [isInView]);

  return (
    <div ref={ref} className={`model-container ${className}`}>
      {shouldRender ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ 
            antialias: true, 
            alpha: true, 
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
          }}
          performance={{ min: 0.5 }}
          frameloop={isInView ? 'always' : 'never'}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, 5]} intensity={0.3} color={color} />
          
          <Suspense fallback={null}>
            <OptimizedModelLoader 
              modelType={modelType} 
              color={color} 
              isVisible={isInView}
            />
          </Suspense>
        </Canvas>
      ) : (
        <div className="w-full h-full bg-slate-700/30 rounded-2xl flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LazyModel;