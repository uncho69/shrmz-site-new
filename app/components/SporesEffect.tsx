"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SporesEffect = () => {
  const [spores, setSpores] = useState<{ id: number; x: number; size: number }[]>([]);

  useEffect(() => {
    // Crea nuove spore ogni 200ms
    const interval = setInterval(() => {
      const newSpore = {
        id: Math.random(),
        x: Math.random() * 100, // posizione random orizzontale (0-100%)
        size: Math.random() * 4 + 2, // dimensione random (2-6px)
      };
      
      setSpores(prev => [...prev.slice(-20), newSpore]); // mantiene max 20 spore
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {spores.map((spore) => (
        <motion.div
          key={spore.id}
          className="absolute bg-white/20 rounded-full"
          style={{
            left: `${spore.x}%`,
            width: spore.size,
            height: spore.size,
          }}
          initial={{ top: "-5%", opacity: 0.2 }}
          animate={{
            top: "105%",
            opacity: [0.2, 0.8, 0.2],
            x: [0, Math.random() * 100 - 50], // movimento ondeggiante
          }}
          transition={{
            duration: Math.random() * 5 + 5, // durata random (5-10s)
            ease: "linear"
          }}
          onAnimationComplete={() => {
            setSpores(prev => prev.filter(s => s.id !== spore.id));
          }}
        />
      ))}
    </div>
  );
};

export default SporesEffect; 