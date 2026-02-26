import React, { useState, useEffect } from 'react';
import { Gamepad2, Search, X, Maximize2, ExternalLink, Flame, Trophy, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

interface Game {
  id: string;
  title: string;
  thumbnail: string;
  iframeUrl: string;
}

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setGames(gamesData);
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedGame(null)}>
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-display font-bold tracking-tighter text-white">
              LANE<span className="text-emerald-500">GAMES</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Search unblocked games..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <button className="hover:text-emerald-500 transition-colors">Trending</button>
            <button className="hover:text-emerald-500 transition-colors">New</button>
            <button className="hover:text-emerald-500 transition-colors">Action</button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {selectedGame ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 h-[calc(100vh-12rem)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold">{selectedGame.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleFullScreen}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2 text-sm"
                >
                  <Maximize2 className="w-4 h-4" />
                  Fullscreen
                </button>
                <a 
                  href={selectedGame.iframeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg transition-colors flex items-center gap-2 text-sm font-bold"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in New Tab
                </a>
              </div>
            </div>

            <div className="flex-1 bg-black rounded-2xl overflow-hidden border border-zinc-800 relative group">
              <iframe
                src={selectedGame.iframeUrl}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allowFullScreen
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-orange-500" /> 12k playing</span>
              <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-yellow-500" /> High Score: 45,200</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-blue-500" /> Updated 2 days ago</span>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Hero Section */}
            <section className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-8 md:p-12">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full mb-4">WEEKLY SPECIAL</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight">
                  Play the Best <br />
                  <span className="text-emerald-500">Unblocked Games.</span>
                </h2>
                <p className="text-zinc-400 text-lg mb-8">
                  Fast, free, and completely unblocked. No downloads required. Just pick a game and start playing instantly.
                </p>
                <button 
                  onClick={() => setSelectedGame(games[0])}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
                >
                  Play Now
                </button>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-l from-zinc-900 via-transparent to-transparent z-10" />
                <img 
                  src="https://picsum.photos/seed/gaming/800/600" 
                  alt="Hero" 
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
              </div>
            </section>

            {/* Games Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  Popular Games
                </h3>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Live Now</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredGames.map((game) => (
                    <motion.div
                      key={game.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedGame(game)}
                    >
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 game-card-glow mb-3">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <button className="w-full py-2 bg-emerald-500 text-black text-xs font-bold rounded-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            PLAY NOW
                          </button>
                        </div>
                      </div>
                      <h4 className="font-medium text-sm group-hover:text-emerald-500 transition-colors truncate">
                        {game.title}
                      </h4>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-zinc-500">No games found matching "{searchQuery}"</p>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-emerald-500" />
            <span className="font-display font-bold tracking-tighter">LANEGAMES</span>
          </div>
          <p className="text-zinc-500 text-xs">
            © 2026 Lane Games. All rights reserved. Unblocked and free forever.
          </p>
          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
