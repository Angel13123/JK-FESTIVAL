'use client';

import React from 'react';
import { Zap } from 'lucide-react';

export const NexusHeader = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-deep-black/10 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            {/* Logo Area */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-metallic-gold to-yellow-600 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    <span className="text-deep-black font-bold text-xs">GE</span>
                </div>
                <span className="text-white font-headline tracking-widest text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    GOLDEN EPIPHANY
                </span>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20">
                <div className="relative">
                    <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-electric-blue rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-xs font-mono text-electric-blue tracking-wider">
                    SYSTEM: ONLINE
                </span>
            </div>
        </header>
    );
};
