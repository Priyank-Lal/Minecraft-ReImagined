import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroSection from '../components/HeroSection';
import EditionsSection from '../components/EditionsSection';
import Footer from '../components/Footer';
import { ScrollProvider } from '../contexts/ScrollContext';

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollProvider value={{ scrollProgress }}>
      <div ref={containerRef} className="relative">
        {/* Fixed 3D Canvas Background */}
        <div className="fixed inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
            performance={{ min: 0.8 }}
          >
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
          </Canvas>
        </div>

        {/* Scrollable Content */}
        <div className="relative z-10">
          <HeroSection />
          <EditionsSection />
          <Footer />
        </div>
      </div>
    </ScrollProvider>
  );
};

export default HomePage;