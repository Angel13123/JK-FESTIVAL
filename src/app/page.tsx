'use client';

import React from 'react';
import { NexusHeader } from '@/components/nexus/NexusHeader';
import { ThreeStellarFog } from '@/components/nexus/ThreeStellarFog';
import { useArchitectLogger } from '@/lib/ArchitectLogger';

const ScrollySection = ({
  id,
  title,
  subtitle,
  children,
  align = 'center'
}: {
  id: string,
  title: string,
  subtitle?: string,
  children?: React.ReactNode,
  align?: 'left' | 'center' | 'right'
}) => {
  return (
    <section
      id={id}
      data-track-section
      className="min-h-screen w-full flex flex-col justify-center px-6 md:px-20 py-20 relative snap-center opacity-100"
    >
      <div className={`max-w-4xl w-full z-10 ${align === 'center' ? 'mx-auto text-center' : align === 'right' ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter text-[#D4AF37] mb-6 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white font-medium tracking-wide max-w-2xl mb-12 leading-relaxed drop-shadow-md">
            {subtitle}
          </p>
        )}

        {/* Container for future simulations */}
        <div className="w-full bg-deep-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
          {children}
        </div>
      </div>
    </section>
  );
};

export default function GoldenNexusPage() {
  useArchitectLogger(); // Initialize the logger

  return (
    <main className="relative w-full text-white overflow-x-hidden snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      <NexusHeader />
      <ThreeStellarFog />

      {/* Intro Section */}
      <ScrollySection id="nexus-intro" title="THE GOLDEN NEXUS" subtitle="Welcome to the convergence of Thermodynamics and Digital Alchemy.">
        <div className="p-10 border border-dashed border-white/20 rounded-lg flex items-center justify-center">
          <span className="text-electric-blue animate-pulse">Initializing Phase 1 Protocols...</span>
        </div>
      </ScrollySection>

      {/* Atomic Microscope Container */}
      <ScrollySection id="atomic-microscope-section" title="ATOMIC MICROSCOPE" subtitle="Observe the fundamental chaos of matter.">
        <div id="atomic-microscope" className="w-full h-[400px] flex items-center justify-center bg-black/40 rounded-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-electric-blue/5 group-hover:bg-electric-blue/10 transition-colors duration-500"></div>
          <p className="text-gray-500 font-mono text-sm">[ MODULE: ATOMIC_MICROSCOPE // STATUS: AWAITING_INJECTION ]</p>
        </div>
      </ScrollySection>

      {/* Equation Forge Container */}
      <ScrollySection id="equation-forge-section" title="EQUATION FORGE" subtitle="Where mathematical truths are tempered." align="left">
        <div id="equation-forge" className="w-full h-[400px] flex items-center justify-center bg-black/40 rounded-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-metallic-gold/5 group-hover:bg-metallic-gold/10 transition-colors duration-500"></div>
          <p className="text-gray-500 font-mono text-sm">[ MODULE: EQUATION_FORGE // STATUS: AWAITING_INJECTION ]</p>
        </div>
      </ScrollySection>

      {/* Carnot Simulator Container */}
      <ScrollySection id="carnot-simulator-section" title="CARNOT ENGINE" subtitle="The perfect cycle. The theoretical limit." align="right">
        <div id="carnot-simulator" className="w-full h-[400px] flex items-center justify-center bg-black/40 rounded-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-electric-blue/5 group-hover:bg-metallic-gold/10 transition-colors duration-500"></div>
          <p className="text-gray-500 font-mono text-sm">[ MODULE: CARNOT_SIMULATOR // STATUS: AWAITING_INJECTION ]</p>
        </div>
      </ScrollySection>

      {/* Footer Helper */}
      <div className="w-full py-10 text-center text-gray-600 text-xs font-mono snap-end">
        <p>THERMODYNAMICS: THE GOLDEN NEXUS &copy; 2024</p>
        <p>SYSTEM ARCHITECT: ANTIGRAVITY AGENT</p>
      </div>
    </main>
  );
}
