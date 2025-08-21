import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { Github, Twitter, Youtube, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-900 border-t border-slate-700">
      {/* Voxel Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: false, alpha: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          {/* Floating Blocks */}
          {Array.from({ length: 15 }).map((_, i) => (
            <FloatingBlock
              key={i}
              position={[
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
              ]}
              delay={i * 0.2}
            />
          ))}
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-white"
            >
              Minecraft
              <span className="text-green-400 block">Re-Imagined</span>
            </motion.h3>
            <p className="text-gray-400 text-sm">
              Experience the next generation of block-building adventures across all platforms.
            </p>
          </div>

          {/* Editions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Editions</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">Java Edition</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Bedrock Edition</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Education Edition</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Minecraft Legends</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Minecraft Dungeons</a></li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Community</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">Forums</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Reddit</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Feedback</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Bug Reports</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">System Requirements</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 Minecraft Re-Imagined. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <SocialIcon icon={Github} href="#" />
            <SocialIcon icon={Twitter} href="#" />
            <SocialIcon icon={Youtube} href="#" />
            <SocialIcon icon={Globe} href="#" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingBlock: React.FC<{ position: [number, number, number]; delay: number }> = ({ position, delay }) => {
  const colors = ['#4a9b3e', '#3b82f6', '#10b981', '#f97316', '#ef4444'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.group
      position={position}
      animate={{
        y: position[1] + Math.sin(Date.now() * 0.001 + delay) * 0.5,
        rotateY: Math.PI * 2,
      }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
      }}
    >
      <Box args={[0.5, 0.5, 0.5]}>
        <meshStandardMaterial color={color} />
      </Box>
    </motion.group>
  );
};

const SocialIcon: React.FC<{ icon: React.ComponentType<any>; href: string }> = ({ icon: Icon, href }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
  >
    <Icon size={18} />
  </motion.a>
);

export default Footer;