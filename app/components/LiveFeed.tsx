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
      {isLoading && (
        <div className="flex justify-center items-center">
          <motion.img
            src="/shroomiez-logo.png"
            alt="Loading..."
            className="w-16 h-16"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
      
      <div className="space-y-4">
        {recentTweets.map((tweet) => (
          <motion.a
            key={tweet.id}
            href={tweet.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-purple-600/20 hover:border-green-400/50 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onLoad={() => setIsLoading(false)}
          >
            <div className="flex items-start gap-3">
              <img src="/shroomiez-logo.png" alt="Shroomiez" className="w-8 h-8 rounded-full" />
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
        className="block text-center mt-6 text-green-400 hover:text-green-300 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
      >
        View more on Twitter →
      </motion.a>
    </div>
  );
} 