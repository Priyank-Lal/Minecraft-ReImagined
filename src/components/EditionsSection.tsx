import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EditionCard from './EditionCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const editions = [
  {
    id: 'java',
    name: 'Java Edition',
    description: 'The original Minecraft experience with unlimited modding possibilities',
    color: '#f97316',
    model: 'steve',
    features: ['Unlimited Mods', 'Custom Servers', 'Snapshots'],
  },
  {
    id: 'bedrock',
    name: 'Bedrock Edition',
    description: 'Cross-platform gaming across all your devices',
    color: '#3b82f6',
    model: 'alex',
    features: ['Cross-Platform', 'Marketplace', 'RTX Support'],
  },
  {
    id: 'education',
    name: 'Education Edition',
    description: 'Learn through play with classroom-focused features',
    color: '#10b981',
    model: 'villager',
    features: ['Classroom Tools', 'Coding Features', 'Assessment'],
  },
  {
    id: 'legends',
    name: 'Minecraft Legends',
    description: 'Epic strategy adventure in the Minecraft universe',
    color: '#8b5cf6',
    model: 'sword',
    features: ['Strategy Gameplay', 'Epic Battles', 'Hero Journey'],
  },
  {
    id: 'dungeons',
    name: 'Minecraft Dungeons',
    description: 'Dungeon crawler adventure with friends',
    color: '#ef4444',
    model: 'chest',
    features: ['Co-op Adventure', 'Loot Collection', 'Boss Battles'],
  },
];

const EditionsSection: React.FC = () => {
  const [visibleEditions, setVisibleEditions] = useState<Set<string>>(new Set());
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 block">
              Adventure
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each edition offers a unique way to experience the Minecraft universe.
            Discover which one calls to your creative spirit.
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {editions.map((edition, index) => (
            <EditionCard
              key={edition.id}
              edition={edition}
              index={index}
              isVisible={visibleEditions.has(edition.id)}
              onVisibilityChange={(id, visible) => {
                setVisibleEditions(prev => {
                  const newSet = new Set(prev);
                  if (visible) {
                    newSet.add(id);
                  } else {
                    newSet.delete(id);
                  }
                  return newSet;
                });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditionsSection;