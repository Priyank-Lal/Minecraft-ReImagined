import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScroll } from '../contexts/ScrollContext';
import { motion, useScroll as useFramerScroll, useTransform } from 'framer-motion';
import Earth from './3d/Earth';
import { Link } from 'react-router-dom';
import { Play, ArrowDown } from 'lucide-react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useGSAPAnimations } from '../hooks/useGSAPAnimations';

const HeroSection: React.FC = () => {
  const { scrollY } = useFramerScroll();
  const [isVisible, setIsVisible] = useState(true);
  
  // Initialize smooth scrolling and GSAP animations
  useSmoothScroll();
  useGSAPAnimations();
  
  // Transform scroll values
  const earthScale = useTransform(scrollY, [0, 800], [0.8, 1.5]);
  const earthX = useTransform(scrollY, [0, 800], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -100]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((value) => {
      setIsVisible(value < 800);
    });
    return unsubscribe;
  }, [scrollY]);

  return (
    <div className="hero-section relative h-screen overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="stars"></div>
        </div>
      </div>

      {/* 3D Earth Container */}
      {isVisible && (
        <motion.div 
          className="hero-earth absolute inset-0 pointer-events-none"
          style={{ 
            x: earthX,
            scale: earthScale,
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-96 h-96 relative">
              <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ 
                  antialias: true, 
                  alpha: true, 
                  powerPreference: 'high-performance' 
                }}
                performance={{ min: 0.8 }}
                dpr={[1, 2]}
              >
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <Earth />
              </Canvas>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Content */}
      <motion.div 
        className="hero-content absolute inset-0 flex items-center justify-start pl-12 md:pl-24"
        style={{ 
          opacity: heroOpacity,
          y: heroY 
        }}
      >
        <div className="max-w-2xl text-white z-20">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            MINECRAFT
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              RE-IMAGINED
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Experience the next generation of block-building adventures across multiple platforms and editions.
          </motion.p>
          
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3">
              <Play size={20} />
              <span>Explore Editions</span>
            </button>
            <button className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white/10">
              Watch Trailer
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        style={{ opacity: heroOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown size={24} />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;