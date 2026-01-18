import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import AtomicLab from './components/AtomicLab';
import useAtomicStore from './hooks/useAtomicStore';

function App() {
    const { temperature } = useAtomicStore();

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">

            {/* 3D Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                    <color attach="background" args={['#050505']} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#fbbf24" />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Suspense fallback={null}>
                        <AtomicLab />
                    </Suspense>
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* UI Overlay */}
            <div className="relative z-10 container mx-auto px-6 py-12">
                <header className="mb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                    >
                        EL NEXO ATÓMICO
                    </motion.h1>
                    <p className="mt-4 text-xl text-blue-400 tracking-widest uppercase font-mono">Protocolo Fase 2: Inyectando Conocimiento</p>
                </header>

                <div className="space-y-32">

                    {/* Section 1: Introduction */}
                    <section className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
                        <h2 className="text-4xl font-bold mb-6 text-amber-300">Bienvenido al Laboratorio</h2>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            En este entorno simulado, observarás cómo la energía térmica (calor) se transforma en movimiento cinético molecular (temperatura).
                            <br /><br />
                            <span className="text-blue-400 font-bold">Estado del Sistema:</span> Operativo - Fase 2 Activa.
                        </p>
                    </section>

                    {/* Section 2: Definitions (Critical Academic Content) */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Mass */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-zinc-900/80 p-8 rounded-xl border-l-4 border-amber-500"
                        >
                            <h3 className="text-3xl font-bold text-white mb-4">1. Masa (<span className="text-amber-400 italic">m</span>)</h3>
                            <p className="text-gray-300 mb-4">
                                "La masa es la medida de la inercia de un cuerpo, es decir, la resistencia que opone a cambiar su estado de movimiento."
                            </p>
                            <cite className="block text-right text-sm text-blue-400 font-mono">— Facultad de Ciencias, UNAM</cite>
                        </motion.div>

                        {/* Heat */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-zinc-900/80 p-8 rounded-xl border-l-4 border-red-500"
                        >
                            <h3 className="text-3xl font-bold text-white mb-4">2. Calor (<span className="text-red-400 italic">Q</span>)</h3>
                            <p className="text-gray-300 mb-4">
                                "El calor no es un fluido, es energía en tránsito que fluye espontáneamente de un sistema de mayor temperatura a otro de menor temperatura."
                            </p>
                            <cite className="block text-right text-sm text-blue-400 font-mono">— MIT Physics Department</cite>
                        </motion.div>

                        {/* Temperature */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-zinc-900/80 p-8 rounded-xl border-l-4 border-blue-500"
                        >
                            <h3 className="text-3xl font-bold text-white mb-4">3. Temperatura (<span className="text-blue-400 italic">T</span>)</h3>
                            <p className="text-gray-300 mb-4">
                                "La temperatura es una magnitud física que refleja la energía cinética promedio de las partículas que componen un sistema."
                            </p>
                            <cite className="block text-right text-sm text-blue-400 font-mono">— Harvard University / Berkeley</cite>
                        </motion.div>

                        {/* Specific Heat */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-zinc-900/80 p-8 rounded-xl border-l-4 border-purple-500"
                        >
                            <h3 className="text-3xl font-bold text-white mb-4">4. Calor Específico (<span className="text-purple-400 italic">c</span>)</h3>
                            <p className="text-gray-300 mb-4">
                                "La cantidad de calor necesaria para elevar la temperatura de una unidad de masa de una sustancia en un grado Celsius."
                            </p>
                            <div className="mt-4 p-4 bg-black/50 rounded font-mono text-center text-lg text-green-400">
                                Q = m · c · ΔT
                            </div>
                        </motion.div>

                    </section>

                    {/* Interactive Controls Preview */}
                    <section className="text-center py-12">
                        <h2 className="text-3xl font-bold text-white mb-8">Control de Simulación</h2>
                        <div className="inline-block p-6 bg-zinc-900 rounded-2xl border border-zinc-700">
                            <p className="text-2xl font-mono text-amber-400 mb-2">Temperatura del Sistema</p>
                            <div className="text-5xl font-black text-white">{Math.round(temperature)} K</div>
                            <p className="text-sm text-gray-500 mt-2">Interactúa con los átomos para aumentar la energía cinética.</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}

export default App;
