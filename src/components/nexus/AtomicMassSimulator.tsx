'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

const Atom = ({ position, mass, color }: { position: [number, number, number], mass: number, color: string }) => {
    const mesh = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);
    const [velocity, setVelocity] = useState(new THREE.Vector3(0, 0, 0));

    useFrame(() => {
        if (mesh.current) {
            // Damping (inertia)
            mesh.current.position.add(velocity);
            velocity.multiplyScalar(0.95); // Friction

            // Gentle float
            if (velocity.length() < 0.01) {
                mesh.current.position.y += Math.sin(Date.now() / 1000 + position[0]) * 0.002;
            }
        }
    });

    const handleClick = () => {
        // Force F applied. a = F/m. Heavier mass = smaller acceleration.
        const force = 0.2;
        const acceleration = force / (mass / 10); // Simple physics proxy

        // Random direction for "hit"
        const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        setVelocity(dir.multiplyScalar(acceleration));
    };

    return (
        <Sphere
            ref={mesh}
            position={position}
            args={[mass > 50 ? 0.3 : 0.2, 32, 32]} // Bigger atoms if massive? Or denser? Keeping size similar for density effect
            onClick={handleClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <meshStandardMaterial
                color={hovered ? '#007BFF' : color}
                metalness={0.8}
                roughness={0.2}
            />
        </Sphere>
    );
};

export const AtomicMassSimulator = () => {
    const [massValue, setMassValue] = useState(10); // 10 to 100

    // Regenerate atoms based on mass/density
    const atoms = useMemo(() => {
        const count = Math.floor(massValue / 2); // More mass = more atoms
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 6;
            const y = (Math.random() - 0.5) * 4;
            const z = (Math.random() - 0.5) * 2;
            temp.push({ id: i, pos: [x, y, z] as [number, number, number] });
        }
        return temp;
    }, [massValue]);

    // Darker gold for higher density/mass
    const baseColor = new THREE.Color('#D4AF37');
    const atomColor = baseColor.clone().lerp(new THREE.Color('#554000'), massValue / 150).getStyle();

    return (
        <div className="w-full h-[500px] relative bg-black rounded-xl border border-white/10 overflow-hidden">
            <div className="absolute top-4 left-4 z-10 text-white bg-black/50 p-4 rounded-lg backdrop-blur-md border border-white/5">
                <label className="block text-xs font-mono text-gray-400 mb-2">ATOMIC MASS REGULATOR ({massValue}u)</label>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={massValue}
                    onChange={(e) => setMassValue(Number(e.target.value))}
                    className="w-48 accent-electric-blue cursor-pointer"
                />
                <p className="text-[10px] text-electric-blue mt-1">CLICK ATOMS TO TEST INERTIA</p>
            </div>

            <Canvas camera={{ position: [0, 0, 6] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#007BFF" />

                {atoms.map((atom) => (
                    <Atom key={atom.id} position={atom.pos} mass={massValue} color={atomColor} />
                ))}
            </Canvas>
        </div>
    );
};
