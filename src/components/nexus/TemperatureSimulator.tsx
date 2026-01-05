'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ThermalAtom = ({ position, temperature }: { position: [number, number, number], temperature: number }) => {
    const mesh = useRef<THREE.Mesh>(null!);
    const originalPos = useRef(new THREE.Vector3(...position));

    // Random phase for vibration so they don't move in unison
    const phase = useRef(Math.random() * Math.PI * 2);

    useFrame((state) => {
        if (mesh.current) {
            const time = state.clock.getElapsedTime();
            // Amplitude increases with temperature
            const amp = (temperature / 100) * 0.5; // Max 0.5 units

            // Harmonic motion
            mesh.current.position.x = originalPos.current.x + Math.sin(time * 10 + phase.current) * amp;
            mesh.current.position.y = originalPos.current.y + Math.cos(time * 12 + phase.current) * amp;
            mesh.current.position.z = originalPos.current.z + Math.sin(time * 8 + phase.current) * amp;

            // Color shift: Gold (Cold) -> Blue/White (Hot)
            // 0K = Gold #D4AF37, 300K+ -> White/Blue #007BFF
            // Simple lerp for visual effect
            const cold = new THREE.Color('#D4AF37');
            const hot = new THREE.Color('#007BFF');
            // If temp > 50, start glowing blue
            const t = Math.min(1, temperature / 100);

            if (Array.isArray(mesh.current.material)) return;
            (mesh.current.material as THREE.MeshStandardMaterial).color.lerpColors(cold, hot, t);
            (mesh.current.material as THREE.MeshStandardMaterial).emissive.lerpColors(new THREE.Color('#000000'), hot, t * 0.8);
        }
    });

    return (
        <Sphere ref={mesh} position={position} args={[0.25, 32, 32]}>
            <meshStandardMaterial metalness={0.9} roughness={0.1} />
        </Sphere>
    );
};

export const TemperatureSimulator = () => {
    const [temperature, setTemperature] = useState(0); // 0 (Absolute Zero) to 100 (Plasma/Hot)

    const atoms = useMemo(() => {
        const temp = [];
        // Grid of atoms
        for (let x = -2; x <= 2; x++) {
            for (let y = -2; y <= 2; y++) {
                temp.push([x * 1.2, y * 1.2, 0] as [number, number, number]);
            }
        }
        return temp;
    }, []);

    return (
        <div className="w-full h-[500px] relative bg-black rounded-xl border border-white/10 overflow-hidden">
            <div className="absolute bottom-6 w-full flex justify-center z-10 gap-4">
                <button
                    onClick={() => setTemperature(0)}
                    className={`px-4 py-2 rounded-full border border-metallic-gold/50 ${temperature === 0 ? 'bg-metallic-gold text-black' : 'bg-black/50 text-metallic-gold'}`}
                >
                    ICE (0 K)
                </button>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-64 accent-electric-blue"
                />

                <button
                    onClick={() => setTemperature(100)}
                    className={`px-4 py-2 rounded-full border border-electric-blue/50 ${temperature >= 80 ? 'bg-electric-blue text-white' : 'bg-black/50 text-electric-blue'}`}
                >
                    FIRE (High K)
                </button>
            </div>

            <div className="absolute top-4 right-4 z-10 font-mono text-xs text-white">
                CURRENT STATE: {temperature === 0 ? "ABSOLUTE ZERO" : temperature > 80 ? "HIGH ENTROPY" : "MOLECULAR CHAOS"}
            </div>

            <Canvas camera={{ position: [0, 0, 8] }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                {atoms.map((pos, i) => (
                    <ThermalAtom key={i} position={pos} temperature={temperature} />
                ))}
            </Canvas>
        </div>
    );
};
