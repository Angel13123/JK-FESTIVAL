"use client";

import { useState } from 'react';
import { Play, Pause, Music } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50">
      <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md border border-primary/30 rounded-full p-2 pr-4 shadow-lg animate-fade-in-up">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-primary/20 text-accent rounded-full p-2 transition-all hover:bg-primary/40 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <div className="overflow-hidden whitespace-nowrap">
          <div className={`flex items-center gap-2 ${isPlaying ? 'animate-marquee' : ''}`}>
             <Music className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-xs font-semibold text-white">JK Radio - Urban Vibes 24/7</span>
             <Music className="h-4 w-4 text-primary flex-shrink-0" />
             <span className="text-xs font-semibold text-white">JK Radio - Urban Vibes 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}
