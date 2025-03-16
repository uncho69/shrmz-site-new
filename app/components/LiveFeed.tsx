"use client";

import { motion } from 'framer-motion';
import { useState } from "react";

const recentTweets = [
  {
    id: "1",
    text: "🍄 Shroomiez RFC Proposal has been approved! 🎉",
    date: "Jan 15, 2025",
    link: "https://x.com/ShroomiezNFTs/status/1878427680451788965"
  },
  {
    id: "2",
    text: "🎯 Beranames multiplier activated for all Shroomiez holders!",
    date: "Dec 5, 2024",
    link: "https://x.com/ShroomiezNFTs/status/1864978302919676395"
  },
  {
    id: "3",
    text: "2% of SHMZ supply has been sent to $PLUG ⚡️",
    date: "Nov 20, 2024",
    link: "https://x.com/ShroomiezNFTs/status/1855733517986025914"
  }
];

export default function LiveFeed() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.h3 
        className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-green-400 to-purple-400"
        animate={{
          backgroundPosition: ["0%", "100%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        Latest Updates
      </motion.h3>

      {isLoading && (
        <div className="flex justify-center items-center">
          <motion.div
            className="relative"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-green-400 rounded-full opacity-75 blur-md"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <img
              src="/shroomiez-logo.png"
              alt="Loading..."
              className="w-16 h-16 relative"
            />
          </motion.div>
        </div>
      )}
      
      <div className="space-y-4">
        {recentTweets.map((tweet, index) => (
          <motion.a
            key={tweet.id}
            href={tweet.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-purple-600/20 hover:border-purple-400/50 transition-all duration-300 relative overflow-hidden"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
            onLoad={() => setIsLoading(false)}
          >
            {/* Effetto glow al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-green-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-start gap-3 relative z-10">
              <motion.img 
                src="/shroomiez-logo.png" 
                alt="Shroomiez" 
                className="w-8 h-8 rounded-full"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white">Shroomiez</span>
                  <span className="text-gray-400 text-sm">@ShroomiezNFTs</span>
                </div>
                <p className="text-white text-sm md:text-base break-words">{tweet.text}</p>
                <span className="text-gray-400 text-xs mt-2 block">{tweet.date}</span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      
      <motion.a
        href="https://twitter.com/ShroomiezNFTs"
        target="_blank"
        rel="noopener noreferrer"
        className="group block text-center mt-8 relative w-fit mx-auto"
        whileHover={{ scale: 1.05 }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-green-400 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        <span className="relative px-6 py-2 text-green-400 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
          View more on Twitter 
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
      </motion.a>
    </div>
  );
} 