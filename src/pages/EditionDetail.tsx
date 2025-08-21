import React, { Suspense, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ArrowLeft, Play, Download, Star, Users, Gamepad2 } from 'lucide-react';
import ModelLoader from '../components/3d/ModelLoader';
import LoadingScreen from '../components/LoadingScreen';

const editions = {
  java: {
    name: 'Java Edition',
    tagline: 'The Original Experience',
    description: 'The classic Minecraft experience that started it all. With unlimited modding possibilities, custom servers, and the latest snapshots, Java Edition offers the most comprehensive and flexible Minecraft experience available.',
    color: '#f97316',
    model: 'steve',
    platforms: ['Windows', 'macOS', 'Linux'],
    features: [
      { icon: Star, title: 'Unlimited Mods', desc: 'Access thousands of community-created mods' },
      { icon: Users, title: 'Custom Servers', desc: 'Join unique multiplayer experiences' },
      { icon: Gamepad2, title: 'Latest Features', desc: 'Get early access to new content' },
    ],
    stats: {
      players: '140M+',
      mods: '50K+',
      servers: '100K+',
    },
    trailer: 'https://www.youtube.com/embed/MmB9b5njVbA',
  },
  bedrock: {
    name: 'Bedrock Edition',
    tagline: 'Cross-Platform Gaming',
    description: 'Play with friends across all devices with cross-platform compatibility. Bedrock Edition brings Minecraft to mobile, console, and PC with seamless multiplayer and the official Marketplace.',
    color: '#3b82f6',
    model: 'alex',
    platforms: ['Windows 10', 'Xbox', 'PlayStation', 'Nintendo Switch', 'Mobile'],
    features: [
      { icon: Users, title: 'Cross-Platform', desc: 'Play with friends on any device' },
      { icon: Star, title: 'Marketplace', desc: 'Official content from creators' },
      { icon: Gamepad2, title: 'RTX Support', desc: 'Ray tracing on supported hardware' },
    ],
    stats: {
      players: '200M+',
      platforms: '10',
      marketplace: '1K+',
    },
    trailer: 'https://www.youtube.com/embed/0VWnQHS-ffs',
  },
  education: {
    name: 'Education Edition',
    tagline: 'Learn Through Play',
    description: 'Designed specifically for classrooms, Education Edition includes lesson plans, classroom management features, and tools that make learning engaging and collaborative.',
    color: '#10b981',
    model: 'villager',
    platforms: ['Windows', 'macOS', 'iPad'],
    features: [
      { icon: Star, title: 'Lesson Plans', desc: 'Curriculum-aligned educational content' },
      { icon: Users, title: 'Classroom Tools', desc: 'Manage students and assignments' },
      { icon: Gamepad2, title: 'Coding Features', desc: 'Learn programming through blocks' },
    ],
    stats: {
      schools: '35K+',
      students: '40M+',
      countries: '115',
    },
    trailer: 'https://www.youtube.com/embed/hl9ZQiektJE',
  },
  legends: {
    name: 'Minecraft Legends',
    tagline: 'Epic Strategy Adventure',
    description: 'A new action strategy game that combines the familiar world of Minecraft with exciting real-time strategy gameplay. Lead your allies in heroic battles to defend the Overworld.',
    color: '#8b5cf6',
    model: 'sword',
    platforms: ['PC', 'Xbox', 'PlayStation', 'Nintendo Switch'],
    features: [
      { icon: Star, title: 'Strategy Gameplay', desc: 'Real-time tactical combat' },
      { icon: Users, title: 'Epic Battles', desc: 'Large-scale PvP and PvE modes' },
      { icon: Gamepad2, title: 'Hero Journey', desc: 'Compelling single-player campaign' },
    ],
    stats: {
      battles: '100+',
      units: '50+',
      biomes: '15',
    },
    trailer: 'https://www.youtube.com/embed/wd8S7pZfXvM',
  },
  dungeons: {
    name: 'Minecraft Dungeons',
    tagline: 'Dungeon Crawler Adventure',
    description: 'An action-adventure game inspired by classic dungeon crawlers. Fight your way through thrilling dungeons with friends, collect unique gear, and face challenging boss battles.',
    color: '#ef4444',
    model: 'chest',
    platforms: ['PC', 'Xbox', 'PlayStation', 'Nintendo Switch'],
    features: [
      { icon: Users, title: 'Co-op Adventure', desc: 'Up to 4 players local and online' },
      { icon: Star, title: 'Unique Gear', desc: 'Hundreds of weapons and artifacts' },
      { icon: Gamepad2, title: 'Boss Battles', desc: 'Epic encounters and challenges' },
    ],
    stats: {
      dungeons: '25+',
      items: '300+',
      dlc: '10+',
    },
    trailer: 'https://www.youtube.com/embed/Xvf23rfNTsw',
  },
};

const EditionDetail: React.FC = () => {
  const { editionId } = useParams<{ editionId: string }>();
  const [showTrailer, setShowTrailer] = useState(false);
  const edition = editionId ? editions[editionId as keyof typeof editions] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!edition) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Edition not found</h1>
          <Link
            to="/"
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 text-white hover:text-green-400 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Editions
          </Link>
          
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">{edition.name}</h1>
            <p className="text-sm text-gray-400">{edition.tagline}</p>
          </div>
          
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: edition.color }}
                  />
                  <span className="text-gray-400 font-medium tracking-wider uppercase text-sm">
                    {edition.tagline}
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  {edition.name}
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  {edition.description}
                </p>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center gap-3"
                >
                  <Download size={20} />
                  Get {edition.name}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTrailer(true)}
                  className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:bg-white/10 flex items-center gap-3"
                >
                  <Play size={20} />
                  Watch Trailer
                </motion.button>
              </div>
            </motion.div>

            {/* 3D Model */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 lg:h-[500px]"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50">
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 50 }}
                  gl={{ antialias: true, alpha: true }}
                >
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={0.8} />
                  <pointLight position={[-10, -10, 5]} intensity={0.3} color={edition.color} />
                  
                  <Suspense fallback={null}>
                    <ModelLoader modelType={edition.model} color={edition.color} />
                  </Suspense>
                </Canvas>
              </div>
              
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-20 blur-xl -z-10"
                style={{ backgroundColor: edition.color }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {Object.entries(edition.stats).map(([key, value], index) => (
              <div key={key} className="text-center space-y-2">
                <div className="text-4xl font-bold text-white">{value}</div>
                <div className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-12"
          >
            Key Features
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {edition.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${edition.color}20` }}
                  >
                    <feature.icon size={24} style={{ color: edition.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-12"
          >
            Available Platforms
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {edition.platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-slate-700/50 text-white px-6 py-3 rounded-lg border border-slate-600/50"
              >
                {platform}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trailer Modal */}
      {showTrailer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-slate-800 rounded-2xl overflow-hidden max-w-4xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={edition.trailer}
              title={`${edition.name} Trailer`}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EditionDetail;