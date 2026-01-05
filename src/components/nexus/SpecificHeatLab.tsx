'use client';

import React, { useState, useEffect } from 'react';

export const SpecificHeatLab = () => {
    // c values (J/kg*C)
    const materials = {
        Water: { c: 4186, density: 1, color: '#007BFF' },
        Iron: { c: 450, density: 7.8, color: '#A0A0A0' }, // Approximate for steel/iron
        Gold: { c: 129, density: 19.3, color: '#D4AF37' }
    };

    const [mat1, setMat1] = useState<keyof typeof materials>('Water');
    const [mat2, setMat2] = useState<keyof typeof materials>('Iron');
    const [temp1, setTemp1] = useState(20);
    const [temp2, setTemp2] = useState(20);
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    // Constant Power input (Watts) to 1kg sample
    const POWER = 1000;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(t => t + 0.1);

                // Q = P * t = m * c * dT  => dT = (P * dt) / (m * c)
                // m = 1kg
                // dt = 0.1s
                const dt = 0.1;
                const dTemp1 = (POWER * dt) / materials[mat1].c;
                const dTemp2 = (POWER * dt) / materials[mat2].c;

                setTemp1(curr => curr + dTemp1);
                setTemp2(curr => curr + dTemp2);

                if (temp1 > 100 || temp2 > 100) {
                    setIsRunning(false); // Stop when one boils
                }

            }, 100);
        }
        return () => clearInterval(interval);
    }, [isRunning, mat1, mat2, temp1, temp2]);

    const reset = () => {
        setIsRunning(false);
        setTemp1(20);
        setTemp2(20);
        setTime(0);
    };

    return (
        <div className="w-full bg-deep-black border border-white/10 rounded-xl p-6">
            <h3 className="text-center text-metallic-gold mb-6 font-headline tracking-widest text-xl">THERMAL RESISTANCE LAB</h3>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-8">
                {/* Material 1 */}
                <div className="flex flex-col items-center gap-2">
                    <select
                        value={mat1}
                        onChange={(e) => { setMat1(e.target.value as any); reset(); }}
                        className="bg-gray-900 text-white border border-white/20 rounded p-2 text-sm"
                    >
                        {Object.keys(materials).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                    <div className="w-24 h-48 bg-gray-800 rounded-b-lg relative overflow-hidden border border-white/10">
                        {/* Liquid Level */}
                        <div
                            className="absolute bottom-0 w-full transition-all duration-300"
                            style={{
                                height: `${Math.min(100, (temp1 - 20) * 1.5)}%`,
                                backgroundColor: materials[mat1].color,
                                opacity: 0.8
                            }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center font-bold font-mono z-10 drop-shadow-md">
                            {temp1.toFixed(1)}°C
                        </div>
                    </div>
                </div>

                {/* Info / Controls */}
                <div className="flex flex-col items-center gap-4 min-w-[150px]">
                    <div className="text-xl font-mono text-electric-blue">{time.toFixed(1)}s</div>
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`px-6 py-2 rounded font-bold transition-all ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white shadow-[0_0_15px_rgba(0,123,255,0.3)]`}
                    >
                        {isRunning ? 'STOP' : time > 0 ? 'RESUME' : 'IGNITE'}
                    </button>
                    <button onClick={reset} className="text-xs text-gray-400 underline hover:text-white">RESET LAB</button>
                </div>

                {/* Material 2 */}
                <div className="flex flex-col items-center gap-2">
                    <select
                        value={mat2}
                        onChange={(e) => { setMat2(e.target.value as any); reset(); }}
                        className="bg-gray-900 text-white border border-white/20 rounded p-2 text-sm"
                    >
                        {Object.keys(materials).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                    <div className="w-24 h-48 bg-gray-800 rounded-b-lg relative overflow-hidden border border-white/10">
                        {/* Liquid Level */}
                        <div
                            className="absolute bottom-0 w-full transition-all duration-300"
                            style={{
                                height: `${Math.min(100, (temp2 - 20) * 1.5)}%`,
                                backgroundColor: materials[mat2].color,
                                opacity: 0.8
                            }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center font-bold font-mono z-10 drop-shadow-md">
                            {temp2.toFixed(1)}°C
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-xs text-left text-gray-300 font-mono">
                    <thead className="text-metallic-gold uppercase bg-white/5">
                        <tr>
                            <th className="px-4 py-2">Material</th>
                            <th className="px-4 py-2">Specific Heat (c)</th>
                            <th className="px-4 py-2 hidden md:table-cell">Density</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(materials).map(([name, props]) => (
                            <tr key={name} className="border-b border-white/5 hover:bg-white/5">
                                <td className="px-4 py-2 font-bold" style={{ color: props.color }}>{name}</td>
                                <td className="px-4 py-2">{props.c} J/kg·°C</td>
                                <td className="px-4 py-2 hidden md:table-cell">{props.density} g/cm³</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
