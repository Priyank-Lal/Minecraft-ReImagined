import React, { useEffect, useRef, useState } from 'react';
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
        {/* Scrollable Content */}
        <div className="relative">
          <HeroSection />
          <EditionsSection />
          <Footer />
        </div>
      </div>
    </ScrollProvider>
  );
};

export default HomePage;