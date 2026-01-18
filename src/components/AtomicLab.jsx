import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import useAtomicStore from '../hooks/useAtomicStore';
import * as THREE from 'three';

const Atom = ({ position, color, vibrationIntensity }) => {
    const mesh = useRef();
    const initialPos = useRef(new THREE.Vector3(...position));
    const randomPhase = useRef(Math.random() * Math.PI * 2);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() + randomPhase.current;
        // Vibración basada en temperatura (vibrationIntensity)
        const offset = Math.sin(t * 10 * vibrationIntensity) * 0.05 * vibrationIntensity;

        mesh.current.position.x = initialPos.current.x + offset;
        mesh.current.position.y = initialPos.current.y + Math.cos(t * 8) * 0.05 * vibrationIntensity;
        mesh.current.position.z = initialPos.current.z + Math.sin(t * 12) * 0.05 * vibrationIntensity;

        // Color cambia con la temperatura (rojo = caliente, azul = frío)
        // Lerp color logic could go here
    });

    return (
        <Sphere ref={mesh} position={position} args={[0.3, 32, 32]}>
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5 + vibrationIntensity * 2}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
};

const AtomicLab = () => {
    const { moleculeCount, temperature } = useAtomicStore();

    // Normalizar temperatura para efectos visuales (0 a 1 aprox)
    const intensity = Math.max(0.1, temperature / 1000);

    // Golden Epiphany Logic: Atoms are always GOLD
    // Emissive intensity increases with vibration/temperature
    const color = '#FFD700'; // Gold

    const atoms = useMemo(() => {
        const temp = [];
        // Generar estructura cristalina (grid)
        const gridSize = Math.ceil(Math.pow(moleculeCount, 1 / 3));
        const spacing = 1.0;
        const offset = (gridSize * spacing) / 2;

        let count = 0;
        for (let x = 0; x < gridSize && count < moleculeCount; x++) {
            for (let y = 0; y < gridSize && count < moleculeCount; y++) {
                for (let z = 0; z < gridSize && count < moleculeCount; z++) {
                    temp.push([x * spacing - offset, y * spacing - offset, z * spacing - offset]);
                    count++;
                }
            }
        }
        return temp;
    }, [moleculeCount]);

    return (
        <group>
            {atoms.map((pos, i) => (
                <Atom
                    key={i}
                    position={pos}
                    color={color}
                    vibrationIntensity={intensity}
                />
            ))}
        </group>
    );
};

export default AtomicLab;
