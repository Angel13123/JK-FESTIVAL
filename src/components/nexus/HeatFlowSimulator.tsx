'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const HeatFlowSimulator = () => {
    // 2D Heat Map grid
    const rows = 10;
    const cols = 20;
    const [sourcePos, setSourcePos] = useState({ x: 5, y: 5 }); // Grid coords

    // Calculate temperature for each cell based on distance to source
    const getCellTemp = (r: number, c: number) => {
        const dist = Math.sqrt(Math.pow(r - sourcePos.y, 2) + Math.pow(c - sourcePos.x, 2));
        // Temp drops with distance. Max temp 100.
        const temp = Math.max(20, 100 - dist * 10);
        return temp;
    };

    // Determine arrow rotation (pointing away from heat)
    const getFlowAngle = (r: number, c: number) => {
        const dy = r - sourcePos.y;
        const dx = c - sourcePos.x;
        return (Math.atan2(dy, dx) * 180) / Math.PI;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.floor(((e.clientX - rect.left) / rect.width) * cols);
        const y = Math.floor(((e.clientY - rect.top) / rect.height) * rows);
        setSourcePos({ x, y });
    };

    return (
        <div
            className="w-full h-[400px] bg-gray-900 rounded-xl relative overflow-hidden cursor-crosshair border border-white/10"
            onMouseMove={handleMouseMove}
        >
            <div className="absolute top-4 left-4 z-20 bg-black/70 p-2 rounded text-xs text-white border border-white/10 pointer-events-none">
                <p className="text-metallic-gold mb-1">INTERACTIVE HEAT MAP ($Q$)</p>
                <p>MOVE CURSOR TO CONTROL SOURCE</p>
            </div>

            <div
                className="grid w-full h-full"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
            >
                {Array.from({ length: rows * cols }).map((_, i) => {
                    const r = Math.floor(i / cols);
                    const c = i % cols;
                    const temp = getCellTemp(r, c);
                    const angle = getFlowAngle(r, c);

                    // Color mapping: Blue (20) -> Red (100)
                    // Simple HSL: Blue ~240, Red ~0
                    const hue = Math.max(0, 240 - (temp - 20) * 3);

                    return (
                        <div
                            key={i}
                            className="flex items-center justify-center transition-colors duration-200"
                            style={{ backgroundColor: `hsla(${hue}, 70%, 50%, 0.2)` }}
                        >
                            <div
                                style={{ transform: `rotate(${angle}deg)`, opacity: temp > 30 ? 0.8 : 0.1 }}
                                className="text-white text-[10px] whitespace-nowrap"
                            >
                                ➜
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Source indicator */}
            <div
                className="absolute w-8 h-8 rounded-full bg-red-500 blur-md pointer-events-none transition-all duration-75 mix-blend-screen"
                style={{
                    left: `${(sourcePos.x / cols) * 100}%`,
                    top: `${(sourcePos.y / rows) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                }}
            ></div>
        </div>
    );
};
