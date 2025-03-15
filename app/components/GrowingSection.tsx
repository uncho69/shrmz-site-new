"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GrowingSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const GrowingSection = ({ children, className = "", id }: GrowingSectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ 
        scale: 0.8,
        opacity: 0,
        filter: "blur(10px)",
      }}
      whileInView={{ 
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // spring-like easing
      }}
      className={`relative ${className}`}
    >
      {/* Effetto miceli che si espandono */}
      <motion.div
        className="absolute inset-0 opacity-50"
        initial={{ 
          background: "radial-gradient(circle at center, rgba(134, 239, 172, 0.1) 0%, transparent 0%)",
        }}
        whileInView={{ 
          background: "radial-gradient(circle at center, rgba(134, 239, 172, 0.1) 100%, transparent 100%)",
        }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2 }}
      />
      
      {/* Piccoli funghi decorativi */}
      <motion.div
        className="absolute -left-4 -top-4 w-8 h-8 bg-green-400/20 rounded-full"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      <motion.div
        className="absolute -right-4 -bottom-4 w-6 h-6 bg-purple-400/20 rounded-full"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
      />

      {children}
    </motion.section>
  );
};

export default GrowingSection; 