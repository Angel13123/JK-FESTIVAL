'use client';

import React, { useState, useEffect } from 'react';

export const FormulaForge = () => {
    // Q = m * c * dT
    const [mass, setMass] = useState(0.5); // kg
    const [tempChange, setTempChange] = useState(80); // C (e.g. 20 -> 100)
    const [material, setMaterial] = useState('Water');
    const [energy, setEnergy] = useState(0);

    const materials: { [key: string]: number } = {
        'Water': 4186,
        'Ice': 2090,
        'Aluminum': 900,
        'Iron': 450,
        'Gold': 129
    };

    useEffect(() => {
        // Calculate Q
        const c = materials[material];
        const q = mass * c * tempChange;
        setEnergy(q);
    }, [mass, tempChange, material]);

    return (
        <div className="w-full bg-deep-black border border-white/10 rounded-xl p-6 font-mono text-white">
            <h3 className="text-center text-metallic-gold mb-8 font-headline text-2xl tracking-widest">EQUATION FORGE</h3>

            {/* Formula Display */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-xl md:text-3xl mb-10 p-4 bg-white/5 rounded-lg border border-white/5">
                <span className="text-electric-blue font-bold">Q</span>
                <span>=</span>
                <div className="flex flex-col items-center group relative">
                    <span className="border-b-2 border-white/20 pb-1 cursor-help group-hover:text-green-400">m</span>
                    <span className="text-[10px] text-gray-500 absolute -bottom-5 opacity-0 group-hover:opacity-100 transition-opacity">MASS (kg)</span>
                </div>
                <span>·</span>
                <div className="flex flex-col items-center group relative">
                    <span className="border-b-2 border-white/20 pb-1 cursor-help group-hover:text-yellow-400">c</span>
                    <span className="text-[10px] text-gray-500 absolute -bottom-5 opacity-0 group-hover:opacity-100 transition-opacity">SPECIFIC HEAT</span>
                </div>
                <span>·</span>
                <div className="flex flex-col items-center group relative">
                    <span className="border-b-2 border-white/20 pb-1 cursor-help group-hover:text-red-400">ΔT</span>
                    <span className="text-[10px] text-gray-500 absolute -bottom-5 opacity-0 group-hover:opacity-100 transition-opacity">TEMP CHANGE</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs text-gray-400 mb-2">MATERIAL (c)</label>
                        <select
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                            className="w-full bg-gray-900 border border-white/20 rounded p-2 text-metallic-gold"
                        >
                            {Object.entries(materials).map(([name, val]) => (
                                <option key={name} value={name}>{name} ({val} J/kg·°C)</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs text-green-400 mb-2">MASS (m): {mass} kg</label>
                        <input
                            type="range" min="0.1" max="5" step="0.1"
                            value={mass} onChange={(e) => setMass(Number(e.target.value))}
                            className="w-full accent-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-red-400 mb-2">CHANGE IN TEMP (ΔT): {tempChange} °C</label>
                        <input
                            type="range" min="1" max="200" step="1"
                            value={tempChange} onChange={(e) => setTempChange(Number(e.target.value))}
                            className="w-full accent-red-500"
                        />
                    </div>
                </div>

                {/* Result Visualization */}
                <div className="flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-lg border border-white/5 relative overflow-hidden">
                    <div className="z-10 text-center">
                        <div className="text-xs text-gray-400 mb-1">ENERGY REQUIRED ($Q$)</div>
                        <div className="text-4xl md:text-5xl font-bold text-electric-blue drop-shadow-[0_0_15px_rgba(0,123,255,0.5)]">
                            {energy.toLocaleString()} <span className="text-lg">J</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            = {(energy / 4184).toFixed(2)} kcal
                        </div>
                    </div>

                    {/* Visual Bar Background */}
                    <div
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-electric-blue/20 to-transparent transition-all duration-300"
                        style={{ height: `${Math.min(100, energy / 10000)}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
