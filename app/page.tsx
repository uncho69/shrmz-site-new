"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTwitter, FaDiscord, FaSeedling, FaBook, FaPuzzlePiece, FaRocket, FaChartLine, FaPlug, FaCode } from "react-icons/fa";
import LiveFeed from "./components/LiveFeed";
import LoadingScreen from "./components/LoadingScreen";

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
  const [showArrow, setShowArrow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [tweetsLoaded, setTweetsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      
      // Aggiungi script di Twitter
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      
      // Quando lo script è caricato, carica i tweet
      script.onload = () => {
        if ((window as any).twttr) {
          (window as any).twttr.widgets.load();
          setTweetsLoaded(true);
        }
      };
      
      document.body.appendChild(script);

      // Handle scroll - Nasconde la freccia immediatamente appena si scrolla
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setShowArrow(false);
        } else {
          setShowArrow(true);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // Aggiorna lo stato di caricamento
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 text-white relative">
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      
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
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
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
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <img
            src="/shroomiez-logo.png"
            alt="Shroomiez Logo"
            className="w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-8 relative"
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-green-400 to-pink-600 text-center relative"
        >
          Shroomiez
          <span className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-green-400 to-pink-600 opacity-30 blur-xl -z-10"></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 text-center max-w-2xl px-4"
        >
          Discover the first mushrooms collection of <span className="text-green-400">🐻⛓️</span>
        </motion.p>

        {/* Pulsanti CTA */}
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center mb-8 md:mb-12">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            href="https://scatter.art/shroomiez"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-6 py-2 md:px-8 md:py-3"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></span>
            <span className="relative text-base md:text-lg font-semibold text-white px-4 md:px-8 py-2 md:py-3">
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
            className="group relative inline-flex items-center justify-center px-6 py-2 md:px-8 md:py-3"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 rounded-full"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></span>
            <span className="relative text-base md:text-lg font-semibold text-white px-4 md:px-8 py-2 md:py-3 flex items-center gap-2">
              <FaDiscord className="text-lg md:text-xl" /> Join Discord
            </span>
          </motion.a>
        </div>

        {/* Pulsante BBW Minigame */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          href="https://bbw.shroomiezworld.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-6 py-2 md:px-8 md:py-3 mb-8 md:mb-12"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></span>
          <span className="relative text-base md:text-lg font-semibold text-white px-4 md:px-8 py-2 md:py-3">
            BBW Minigame
          </span>
        </motion.a>

        {/* Freccia indicatore di scroll */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center pb-8 z-50 pointer-events-none">
          <motion.div
            className={`transition-opacity duration-300 ${
              showArrow && !isLoading ? 'opacity-100' : 'opacity-0'
            }`}
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <ChevronDown className="w-12 h-12 text-white opacity-80 pointer-events-auto group-hover:text-green-400 transition-colors" />
          </motion.div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div id="roadmap" className="pt-0 pb-16 md:pb-24 px-4 md:px-8 relative">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.3 }}
        >
          <span className="bg-gradient-to-r from-purple-400/90 via-green-400/90 to-purple-400/90 bg-clip-text text-transparent">
            Our History & Accomplishments
          </span>
        </motion.h2>
        <div className="max-w-6xl mx-auto relative">
          {/* Linea verticale centrale */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-purple-300/20 to-transparent rounded-full blur-sm md:block hidden"></div>
          
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0,
                x: index % 2 === 0 ? -20 : 20,
              }}
              whileInView={{ 
                opacity: 1,
                x: 0,
              }}
              viewport={{ 
                once: true,
                amount: 0.1,
                margin: "-50px"
              }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05
              }}
              className={`flex ${
                index % 2 === 0
                  ? "md:justify-end md:pr-8 justify-start px-2 md:px-4"
                  : "md:justify-start md:pl-8 justify-start px-2 md:px-4"
              } mb-6 md:mb-12 relative`}
            >
              {/* Punto sulla timeline */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-purple-300/50 to-green-300/50 rounded-full z-20"></div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-[calc(100%-1rem)] md:w-[calc(50%-2rem)] bg-purple-800/20 backdrop-blur-sm p-3 md:p-6 rounded-lg shadow-xl border border-purple-400/10 relative overflow-hidden group"
              >
                {/* Sfondo animato al hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-green-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                    {index === 0 && <FaSeedling className="text-green-400 text-lg md:text-xl" />}
                    {index === 1 && <FaBook className="text-green-400 text-lg md:text-xl" />}
                    {index === 2 && <FaPuzzlePiece className="text-green-400 text-lg md:text-xl" />}
                    {index === 3 && <FaRocket className="text-green-400 text-lg md:text-xl" />}
                    {index === 4 && <FaChartLine className="text-green-400 text-lg md:text-xl" />}
                    {index === 5 && <FaPlug className="text-green-400 text-lg md:text-xl" />}
                    {index > 5 && <FaCode className="text-green-400 text-lg md:text-xl" />}
                    <h3 className="text-xl md:text-2xl font-bold text-purple-300">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-3 md:mb-4 font-medium text-sm md:text-base">{item.date}</p>
                  {item.description && (
                    <p className="text-gray-300 whitespace-pre-line mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
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
                      className="inline-block px-4 py-1 md:px-6 md:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 text-sm md:text-base"
                    >
                      {item.button.text}
                    </motion.a>
                  )}
                  {item.buttons && (
                    <div className="flex flex-wrap gap-2 md:gap-4">
                      {item.buttons.map((btn, btnIndex) => (
                        <motion.a
                          key={btnIndex}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={btn.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-1 md:px-6 md:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 text-sm md:text-base"
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
      </div>

      {/* Tweet Section */}
      <div id="tweet-section" className="py-16 md:py-24 px-4 md:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 text-green-400/90">
          Latest Tweets
        </h2>
        <div className="max-w-xl md:max-w-3xl mx-auto">
          <div className="bg-purple-800/20 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-xl border border-purple-400/10">
            <div className="flex flex-col space-y-6">
              {/* Tweet 1 */}
              <div className="bg-black rounded-xl p-4 border border-gray-800">
                <div className="flex items-center mb-3">
                  <img 
                    src="/shroomiez-logo.png" 
                    alt="Shroomiez Profile" 
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <p className="font-bold text-white">Shroomiez</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1D9BF0" className="ml-1">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                      </svg>
                      <p className="text-gray-500 ml-2">@ShroomiezNFTs</p>
                    </div>
                    <p className="text-gray-500 text-sm">Mar 18</p>
                  </div>
                </div>
                <p className="text-white mb-3">
                  Bera Brice Wars (BBW) now live on Berachain 🐻💰⚔️<br/><br/>
                  Guess the Brice of $BERA tomorrow at 4:20 PM UTC. Closest guess receives da Great Bera Brize Bool 🪙🐻<br/><br/>
                  Brice Bool Starting at 33 BERA, with 33% of each guess entry added to da brice bool. Guess entry is 0.69 BERA. Enjoy....
                </p>
                <a 
                  href="https://twitter.com/ShroomiezNFTs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  View on Twitter
                </a>
              </div>
              
              {/* Tweet 2 */}
              <div className="bg-black rounded-xl p-4 border border-gray-800">
                <div className="flex items-center mb-3">
                  <img 
                    src="/shroomiez-logo.png" 
                    alt="Shroomiez Profile" 
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <p className="font-bold text-white">Shroomiez</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1D9BF0" className="ml-1">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                      </svg>
                      <p className="text-gray-500 ml-2">@ShroomiezNFTs</p>
                    </div>
                    <p className="text-gray-500 text-sm">Feb 28</p>
                  </div>
                </div>
                <p className="text-white mb-3">
                  Shroomiez are getting plugged 🔌<br/><br/>
                  Each Shroomiez holder will receive 66,250 $PLUG tokens 🍄<br/><br/>
                  Snapshot has been taken ✅
                </p>
                <a 
                  href="https://twitter.com/ShroomiezNFTs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  View on Twitter
                </a>
              </div>
              
              {/* Tweet 3 */}
              <div className="bg-black rounded-xl p-4 border border-gray-800">
                <div className="flex items-center mb-3">
                  <img 
                    src="/shroomiez-logo.png" 
                    alt="Shroomiez Profile" 
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <p className="font-bold text-white">Shroomiez</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1D9BF0" className="ml-1">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                      </svg>
                      <p className="text-gray-500 ml-2">@ShroomiezNFTs</p>
                    </div>
                    <p className="text-gray-500 text-sm">Feb 10</p>
                  </div>
                </div>
                <p className="text-white mb-3">
                  BeraShroomiez are coming to Berachain 🐻🍄<br/><br/>
                  137 BeraShroomiez will be available to mint on Artio testnet for Shroomiez holders 🧪<br/><br/>
                  Snapshot will be taken on Feb 15th at 4:20 PM UTC 📸
                </p>
                <a 
                  href="https://twitter.com/ShroomiezNFTs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  View on Twitter
                </a>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <a 
                href="https://twitter.com/ShroomiezNFTs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
              >
                Tutti i Tweet
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="pb-6 md:pb-8 text-center text-gray-400 text-xs md:text-sm">
        © 2025 Shroomiez. All rights reserved.
      </div>

      {/* Stili per la scrollbar personalizzata */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>

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

