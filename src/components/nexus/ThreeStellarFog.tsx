'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Stars = (props: any) => {
    const ref = useRef<any>();

    // Generate random points in a sphere
    const sphere = useMemo(() => {
        const points = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const r = 1.5; // Radius
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            // Distribute them to fill screen but keep depth
            points[i * 3] = x * 15;
            points[i * 3 + 1] = y * 15;
            points[i * 3 + 2] = z * 15;
        }
        return points;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#007BFF"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
};

const Fog = () => {
    // A customized fog effect
    return <fog attach="fog" args={['#000000', 5, 20]} />
}


export const ThreeStellarFog = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-deep-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Fog />
                <Stars />
                <Fog />
                <Stars />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#007BFF" />
            </Canvas>
            {/* Radial Gradient Overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(0, 123, 255, 0.05) 0%, rgba(0, 0, 0, 0) 70%)'
                }}
            ></div>
        </div>
    );
};
