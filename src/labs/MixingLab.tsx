import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateEquilibriumTemperature, Materials } from '../utils/thermoModels';

const MixingLab: React.FC = () => {
    // Estado local para la simulación de mezcla
    const [substanceA, setSubstanceA] = useState({
        mass: 1.0,
        temp: 300,
        material: Materials.WATER
    });

    const [substanceB, setSubstanceB] = useState({
        mass: 0.5,
        temp: 350,
        material: Materials.IRON
    });

    const [isMixed, setIsMixed] = useState(false);
    const [equilibriumTemp, setEquilibriumTemp] = useState<number | null>(null);

    const handleMix = () => {
        const te = calculateEquilibriumTemperature(
            substanceA.mass, substanceA.material.specificHeat, substanceA.temp,
            substanceB.mass, substanceB.material.specificHeat, substanceB.temp
        );
        setEquilibriumTemp(te);
        setIsMixed(true);
    };

    return (
        <section className="bg-zinc-900/90 border-2 border-amber-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(251,191,36,0.1)]">
            <header className="mb-8 border-b border-amber-500/20 pb-4">
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                    CÁMARA DE MEZCLAS
                </h2>
                <p className="text-blue-400 font-mono text-sm tracking-widest mt-2 uppercase">
                    Protocolo: Equilibrio Térmico & Ley Cero
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Sustancia A */}
                <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                    <h3 className="text-amber-300 font-bold mb-4 uppercase tracking-tighter">Sustancia A</h3>
                    {/* Controles de Masa y Temperatura (Provisional) */}
                </div>

                {/* Sustancia B */}
                <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                    <h3 className="text-amber-300 font-bold mb-4 uppercase tracking-tighter">Sustancia B</h3>
                    {/* Controles de Masa y Temperatura (Provisional) */}
                </div>
            </div>

            <div className="flex justify-center">
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(251,191,36,0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMix}
                    className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black px-12 py-4 rounded-full uppercase tracking-tighter"
                >
                    Iniciar Mezcla
                </motion.button>
            </div>

            {isMixed && equilibriumTemp !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10 p-8 bg-blue-900/20 border border-blue-500/30 rounded-2xl text-center"
                >
                    <p className="text-blue-300 font-mono uppercase mb-2">Resultado de Equilibrio</p>
                    <div className="text-6xl font-black text-white">
                        {equilibriumTemp.toFixed(2)} <span className="text-blue-500">K</span>
                    </div>
                </motion.div>
            )}
        </section>
    );
};

export default MixingLab;
