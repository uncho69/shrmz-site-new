"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTwitter, FaDiscord, FaSeedling, FaBook, FaPuzzlePiece, FaRocket, FaChartLine, FaPlug, FaCode } from "react-icons/fa";
import LiveFeed from "./components/LiveFeed";
import SporesEffect from './components/SporesEffect';
import GrowingSection from './components/GrowingSection';

const timelineData = [
  {
    title: "Shroomlisting begins",
    date: "May 2023",
    description:
      "A group of passionate Web3 users meets on CT,\nwith shared on-chain passions along with a drive to bring\na positive experience to those who enter the Web3 space",
  },
  {
    title: "A guide to Web3 for the people",
    date: "July 2023",
    description:
      "The mission is established and forged on the Shroomiez community discord,\nand the first shroompaper is published on-chain.",
    button: {
      text: "Visit the article",
      link: "https://mirror.xyz/shroomieznfts.eth/VoKDwE9rQ06PKZjtPLPbCReTxXlmnXNExnqKK877NOc",
    },
  },
  {
    title: "The Shroomiez mint goes live on Scatter",
    date: "Sep 2023",
    description:
      "660 hand-drawn digital mushrooms are uploaded to IPFS\nand made available to mint on the Ethereum blockchain.",
  },
  {
    title: "Public release and full ecosystem integration",
    date: "October 2023",
    description:
      "The first Shroomiez yield farm October 2023\nOur first yield farm is established on Baton (founded by one of the pump.fun co-founders, A1on)\nThe rewards: 1 Shroomiez a day for 30 days\nParticipants received a pro-rata share proportional to their Shroomiez deposits.",
  },
  {
    title: "Shroomiez traits leaked",
    date: "November 2023",
    button: {
      text: "Check the leak",
      link: "https://x.com/ShroomiezNFTs/status/1720860197449543878",
    },
  },
  {
    title: "Shroomiez get plugged",
    date: "Mar 2024",
    description: "Each shroomiez received 66250 $plug",
    buttons: [
      {
        text: "Announcement",
        link: "https://x.com/ShroomiezNFTs/status/1766868501124329953",
      },
      {
        text: "BeraPlug Tweet",
        link: "https://x.com/beraplug/status/1766870922957320643",
      },
    ],
  },
  {
    title: "137 BeraShroomiez on berachain Artio whitelisting",
    date: "Mar 2024",
    description:
      "Todd Fine shoutouts BS mint:\nBera Plug begins Shroomiez distribution via brown hole:",
    buttons: [
      {
        text: "BeraShroomiez whitelisting",
        link: "https://x.com/ShroomiezNFTs/status/1769445209694187633",
      },
      {
        text: "Todd Fine shoutouts",
        link: "https://x.com/ShroomiezNFTs/status/1769996241457361080",
      },
      {
        text: "Bera Plug distribution",
        link: "https://x.com/beraplug/status/1770171338117828770",
      },
    ],
  },
  {
    title: "BeraShroomiez mint on Artio",
    date: "May 2024",
    button: {
      text: "See the tweet",
      link: "https://x.com/ShroomiezNFTs/status/1786081637865808185",
    },
  },
  // New timeline entries added below:
  {
    title: "BS migrate to bArtio",
    date: "Jun 2024",
    description: "",
  },
  {
    title: "Francis joins Safary Club & Shroomiez launch",
    date: "Aug 2024",
    description:
      "Core contributor Francis joins Safary Club (Web3 marketing DAO).\nFermented & Mad Shroomiez go live on bArtio.",
  },
  {
    title: "Brown Hole distributes last shroomiez & Whitelisting Votes",
    date: "Sep 2024",
    description:
      "Brown Hole distributes its last shroomiez.\nFirst votes on project whitelisting on Shroomiez discord. 500 USDC in rewards for participants.",
    button: {
      text: "See Tweet",
      link: "https://x.com/unch4ined69/status/1838906294645698584",
    },
  },
  {
    title: "ETH Milan, Panel, and More",
    date: "Oct 2024",
    description:
      "Core contributor Francis speaks at ETH Milan.\nBERA ECO panel discussion.\nShroomiez get free mint for Satori.\nShroomiez receive 20 Searchies WL spots (record for most expensive NFT on testnet).\nCub quest goes live.",
    buttons: [
      { text: "ETH Milan", link: "https://x.com/eth_milano/status/1838216750875447520" },
      { text: "Announcement", link: "https://x.com/ShroomiezNFTs/status/1840821683751375195" },
      { text: "BERA ECO Panel", link: "https://x.com/zerufinance/status/1839977394200805882" },
      { text: "Free Mint for Satori", link: "https://x.com/ShroomiezNFTs/status/1848064463142096953" },
      { text: "Cub Quest Live", link: "https://x.com/ShroomiezNFTs/status/1848467234055983603" },
    ],
  },
  {
    title: "SHMZ supply sent to Plug",
    date: "Nov 2024",
    description: "2% of SHMZ supply sent to plug.",
    button: {
      text: "See Tweet",
      link: "https://x.com/ShroomiezNFTs/status/1855733517986025914",
    },
  },
  {
    title: "Beranames Multiplier for Holders",
    date: "Dec 2024",
    description: "Beranames multiplier for Shroomiez holders.",
    button: {
      text: "See Tweet",
      link: "https://x.com/ShroomiezNFTs/status/1864978302919676395",
    },
  },
  {
    title: "Approved for RFC",
    date: "Jan 2025",
    description: "",
    button: {
      text: "See Tweet",
      link: "https://x.com/ShroomiezNFTs/status/1878427680451788965",
    },
  },
  {
    title: "1887 BERA RFC Grant",
    date: "Feb 2025",
    description: "1887 BERA RFC grant for Shroomiez.",
  },
];

export default function Home() {
  const handleScroll = () => {
    const roadmapSection = document.getElementById("roadmap");
    if (roadmapSection) {
      const offset = window.innerHeight * 0.1;
      const top = roadmapSection.offsetTop - offset;
      window.scrollTo({
        top,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-500 text-white relative">
      <SporesEffect />
      
      {/* Social Links in alto a destra */}
      <div className="fixed top-4 right-4 flex gap-4 z-50">
        <a
          href="https://twitter.com/ShroomiezNFTs"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <FaTwitter className="w-8 h-8" />
        </a>
        <a
          href="https://discord.gg/AnTwX7YS3S"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <FaDiscord className="w-8 h-8" />
        </a>
      </div>

      {/* Hero Section */}
      <GrowingSection className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Particelle animate sullo sfondo */}
        <div className="absolute inset-0">
          <div className="absolute w-2 h-2 bg-purple-400 rounded-full animate-float-1" style={{ left: '10%', top: '20%' }} />
          <div className="absolute w-3 h-3 bg-green-400 rounded-full animate-float-2" style={{ left: '20%', top: '70%' }} />
          <div className="absolute w-2 h-2 bg-pink-400 rounded-full animate-float-3" style={{ right: '15%', top: '25%' }} />
          <div className="absolute w-4 h-4 bg-purple-500 rounded-full animate-float-4" style={{ right: '25%', top: '65%' }} />
        </div>

        {/* Logo con effetti */}
        <div className="relative">
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-green-400 rounded-full opacity-75 blur-lg"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.img
            src="/shroomiez-logo.png"
            alt="Shroomiez Logo"
            className="w-32 h-32 mb-8 relative"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-green-400 to-pink-600 text-center relative"
        >
          Shroomiez
          <span className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-green-400 to-pink-600 opacity-30 blur-xl -z-10"></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl text-gray-300 mb-12 text-center max-w-2xl px-4"
        >
          Discover the first mushroom collection of <span className="text-green-400">Berachain</span>
        </motion.p>

        {/* Pulsanti CTA */}
        <div className="flex flex-wrap gap-6 justify-center mb-12">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            href="https://scatter.art/shroomiez"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-3"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></span>
            <span className="relative text-lg font-semibold text-white px-8 py-3">
              MINT NOW
            </span>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            href="https://discord.gg/AnTwX7YS3S"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-3"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 rounded-full"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></span>
            <span className="relative text-lg font-semibold text-white px-8 py-3 flex items-center gap-2">
              <FaDiscord className="text-xl" /> Join Discord
            </span>
          </motion.a>
        </div>

        {/* Freccia per abilitare lo scroll e andare al roadmap - nascosta su mobile */}
        <motion.button
          onClick={handleScroll}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group hidden md:block z-50"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <ChevronDown className="w-12 h-12 text-white opacity-80 group-hover:text-green-400 transition-colors" />
        </motion.button>
      </GrowingSection>

      {/* Roadmap Section */}
      <GrowingSection id="roadmap" className="py-24 px-4 md:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-purple-500/50"></div>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-green-400 glow relative z-10">
          Our History & Accomplishments
        </h2>
        <div className="max-w-6xl mx-auto relative">
          {/* Linea verticale centrale con effetto glow */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-green-400 to-purple-600 rounded-full glow-line md:block hidden"></div>
          
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                y: 20
              }}
              whileInView={{ 
                opacity: 1,
                x: 0,
                y: 0
              }}
              viewport={{ 
                once: true,
                amount: 0.2,
                margin: "50px"
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`flex ${
                index % 2 === 0
                  ? "md:justify-end md:pr-8 justify-start px-4"
                  : "md:justify-start md:pl-8 justify-start px-4"
              } mb-8 md:mb-16 relative`}
            >
              {/* Punto sulla timeline */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full z-20 glow-dot"></div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] bg-gray-900/80 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-xl border border-purple-600/20 relative overflow-hidden group"
              >
                {/* Sfondo animato al hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-green-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    {index === 0 && <FaSeedling className="text-green-400 text-xl" />}
                    {index === 1 && <FaBook className="text-green-400 text-xl" />}
                    {index === 2 && <FaPuzzlePiece className="text-green-400 text-xl" />}
                    {index === 3 && <FaRocket className="text-green-400 text-xl" />}
                    {index === 4 && <FaChartLine className="text-green-400 text-xl" />}
                    {index === 5 && <FaPlug className="text-green-400 text-xl" />}
                    {index > 5 && <FaCode className="text-green-400 text-xl" />}
                    <h3 className="text-2xl font-bold text-purple-300">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4 font-medium">{item.date}</p>
                  {item.description && (
                    <p className="text-gray-300 whitespace-pre-line mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.button && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={item.button.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                    >
                      {item.button.text}
                    </motion.a>
                  )}
                  {item.buttons && (
                    <div className="flex flex-wrap gap-4">
                      {item.buttons.map((btn, btnIndex) => (
                        <motion.a
                          key={btnIndex}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={btn.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                        >
                          {btn.text}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </GrowingSection>

      {/* Live Feed Section */}
      <GrowingSection className="py-24 px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-green-400 glow">
          Live Updates
        </h2>
        <LiveFeed />
      </GrowingSection>

      {/* Esempio di stile glow extra */}
      <style jsx>{`
        .glow {
          text-shadow: 0 0 8px rgba(0, 255, 255, 0.8);
        }
        .glow-line {
          box-shadow: 0 0 12px rgba(128, 0, 128, 0.7);
        }
        .glow-dot {
          box-shadow: 0 0 12px rgba(74, 222, 128, 0.8);
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -20px) rotate(180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-25px, -15px) rotate(-180deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, 25px) rotate(180deg); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, 20px) rotate(-180deg); }
        }
        .animate-float-1 {
          animation: float-1 15s infinite ease-in-out;
        }
        .animate-float-2 {
          animation: float-2 18s infinite ease-in-out;
        }
        .animate-float-3 {
          animation: float-3 20s infinite ease-in-out;
        }
        .animate-float-4 {
          animation: float-4 17s infinite ease-in-out;
        }
      `}</style>
    </main>
  );
}

