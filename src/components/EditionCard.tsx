import React, { useRef, useEffect, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ArrowRight, Gamepad2 } from 'lucide-react';
import OptimizedModelLoader from './3d/OptimizedModelLoader';

interface Edition {
  id: string;
  name: string;
  description: string;
  color: string;
  model: string;
  features: string[];
}

interface EditionCardProps {
  edition: Edition;
  index: number;
  isVisible: boolean;
  onVisibilityChange: (id: string, visible: boolean) => void;
}

const EditionCard: React.FC<EditionCardProps> = ({ 
  edition, 
  index, 
  isVisible, 
  onVisibilityChange 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3, margin: '100px' });
  const isEven = index % 2 === 0;

  useEffect(() => {
    onVisibilityChange(edition.id, inView);
  }, [inView, edition.id, onVisibilityChange]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-12 ${isEven ? 'flex-row' : 'flex-row-reverse'} 
                  bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-slate-800/70 
                  transition-all duration-500 border border-slate-700/50 group cursor-pointer`}
    >
      {/* Content Side */}
      <div className="flex-1 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: edition.color }}
              animate={{ 
                scale: inView ? [1, 1.2, 1] : 1,
                boxShadow: inView 
                  ? [`0 0 0 ${edition.color}`, `0 0 20px ${edition.color}40`, `0 0 0 ${edition.color}`]
                  : `0 0 0 ${edition.color}`
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-gray-400 font-medium tracking-wider uppercase text-sm">
              {edition.id === 'java' ? 'PC Edition' : 
               edition.id === 'bedrock' ? 'Cross-Platform' : 
               edition.id === 'education' ? 'Educational' :
               'Adventure Game'}
            </span>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {edition.name}
          </h3>
          
          <p className="text-xl text-gray-300 leading-relaxed max-w-lg group-hover:text-gray-200 transition-colors duration-300">
            {edition.description}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Key Features:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {edition.features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-slate-700/50 hover:bg-slate-600/50 rounded-lg px-4 py-3 text-sm text-gray-300 flex items-center gap-2 transition-all duration-300 cursor-pointer"
              >
                <Gamepad2 size={16} style={{ color: edition.color }} />
                {feature}
              </motion.div>
            ))}
          </div>
        </div>

        <Link
          to={`/edition/${edition.id}`}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-700 to-slate-600 
                     hover:from-slate-600 hover:to-slate-500 text-white px-8 py-4 rounded-lg 
                     font-semibold text-lg transition-all duration-300 hover:scale-105 group-hover:shadow-xl"
          style={{ 
            boxShadow: inView ? `0 4px 20px ${edition.color}30` : 'none',
          }}
        >
          Explore {edition.name}
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* 3D Model Side */}
      <div className="w-80 h-80 relative">
        <motion.div 
          className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50 group-hover:border-slate-500/50 transition-all duration-300"
          whileHover={{ rotateY: 5, rotateX: 2 }}
          style={{ perspective: '1000px' }}
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            performance={{ min: 0.5 }}
            frameloop={inView ? 'always' : 'never'}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, 5]} intensity={0.3} color={edition.color} />
            
            <Suspense fallback={null}>
              <OptimizedModelLoader 
                modelType={edition.model} 
                color={edition.color} 
                isVisible={inView}
              />
            </Suspense>
          </Canvas>
        </motion.div>
        
        {/* Enhanced Glow Effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl blur-xl -z-10"
          style={{ backgroundColor: edition.color }}
          animate={{ 
            opacity: inView ? [0.1, 0.3, 0.1] : 0.1,
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Hover Particles Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ 
                backgroundColor: edition.color,
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-5, -15, -5],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EditionCard;