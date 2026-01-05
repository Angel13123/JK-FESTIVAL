'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { NexusHeader } from '@/components/nexus/NexusHeader';
import { ThreeStellarFog } from '@/components/nexus/ThreeStellarFog';
import { useArchitectLogger } from '@/lib/ArchitectLogger';
import { AtomicMassSimulator } from '@/components/nexus/AtomicMassSimulator';
import { TemperatureSimulator } from '@/components/nexus/TemperatureSimulator';
import { HeatFlowSimulator } from '@/components/nexus/HeatFlowSimulator';
import { SpecificHeatLab } from '@/components/nexus/SpecificHeatLab';
import { FormulaForge } from '@/components/nexus/FormulaForge';

const ScrollySection = ({
  id,
  title,
  children,
  align = 'center',
  academicSource
}: {
  id: string,
  title: string,
  children?: React.ReactNode,
  align?: 'left' | 'center' | 'right',
  academicSource?: React.ReactNode
}) => {
  return (
    <section
      id={id}
      data-track-section
      className="min-h-screen w-full flex flex-col justify-center px-6 md:px-20 py-24 relative snap-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className={`max-w-5xl w-full z-10 ${align === 'center' ? 'mx-auto text-center' : align === 'right' ? 'ml-auto text-right' : 'mr-auto text-left'}`}
      >
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter text-[#D4AF37] mb-8 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          {title}
        </h1>

        {academicSource && (
          <div className={`mb-10 text-lg md:text-xl text-white font-light tracking-wide leading-relaxed ${align === 'center' ? 'mx-auto' : 'ml-0'} max-w-3xl`}>
            {academicSource}
          </div>
        )}

        {/* Simulator Container */}
        {children && (
          <div className="w-full bg-deep-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-8 shadow-[0_0_60px_rgba(0,123,255,0.08)]">
            {children}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default function GoldenNexusPage() {
  useArchitectLogger();

  return (
    <main className="relative w-full text-white overflow-x-hidden snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth bg-deep-black">
      <NexusHeader />
      <ThreeStellarFog />

      {/* INTRO */}
      <ScrollySection
        id="nexus-intro"
        title="EL NEXO ATÓMICO"
        academicSource={
          <p>Bienvenido a la convergencia de la Termodinámica y la Alquimia Digital. <br />
            <span className="text-electric-blue text-sm font-mono mt-2 block">PROTOCOLO FASE 2: INICIADO</span></p>
        }
      >
        <div className="p-10 border border-dashed border-white/20 rounded-lg flex items-center justify-center">
          <span className="text-metallic-gold animate-pulse font-mono">SCROLL PARA INICIAR INVESTIGACIÓN ▼</span>
        </div>
      </ScrollySection>

      {/* SECCION 1: MASA / INERCIA */}
      <ScrollySection
        id="atomic-mass"
        title="LA INERCIA TÉRMICA ($m$)"
        academicSource={
          <div className="text-left space-y-4 border-l-4 border-metallic-gold pl-6">
            <p>"La masa no es solo peso; en termodinámica es la medida de la inercia térmica."</p>
            <p className="text-sm text-gray-400 font-mono">
              <strong className="text-white">UNAM (CCH):</strong> "La masa determina la cantidad de energía necesaria para alterar el equilibrio térmico de un sistema."
              <br />
              <strong className="text-white">MIT OCW:</strong> "Representa el número total de partículas con grados de libertad traslacional que pueden almacenar energía."
            </p>
          </div>
        }
      >
        <AtomicMassSimulator />
      </ScrollySection>

      {/* SECCION 2: TEMPERATURA / TEORIA CINETICA */}
      <ScrollySection
        id="kinetic-temperature"
        title="TEORÍA CINÉTICA ($T$)"
        align="left"
        academicSource={
          <div className="text-left space-y-4 border-l-4 border-electric-blue pl-6">
            <p>"La temperatura no se posee, se mide. Es el promedio de la energía cinética de las moléculas."</p>
            <p className="text-sm text-gray-400 font-mono">
              <strong className="text-white">FACULTAD DE CIENCIAS (UNAM):</strong> "0 Kelvin es el punto teórico donde cesa toda vibración atómica."
              <br />
              <strong className="text-white">HARVARD PHYSICS:</strong> "Propiedad estadística que surge del caos molecular."
            </p>
          </div>
        }
      >
        <TemperatureSimulator />
      </ScrollySection>

      {/* SECCION 3: CALOR vs ENERGIA */}
      <ScrollySection
        id="heat-flow"
        title="CALOR EN MOVIMIENTO ($Q$)"
        align="right"
        academicSource={
          <div className="text-right space-y-4 border-r-4 border-red-500 pr-6">
            <p>"El calor es energía en tránsito que fluye por diferencia de potencial térmico."</p>
            <p className="text-sm text-gray-400 font-mono">
              <strong className="text-white">NASA GLENN:</strong> "Conducción, Convección y Radiación son los mecanismos de transporte."
              <br />
              <strong className="text-white">UC BERKELEY:</strong> "El calor no es un fluido, es movimiento mecánico desordenado (Joule)."
            </p>
          </div>
        }
      >
        <HeatFlowSimulator />
      </ScrollySection>

      {/* SECCION 4: CALOR ESPECIFICO */}
      <ScrollySection
        id="specific-heat"
        title="RESISTENCIA TÉRMICA ($c$)"
        academicSource={
          <div className="text-center space-y-4">
            <p>"¿Por qué el agua es el regulador de la vida? Su alto calor específico le permite absorber energía sin cambios drásticos."</p>
          </div>
        }
      >
        <SpecificHeatLab />
      </ScrollySection>

      {/* SECCION 5: FORMULA FINALE */}
      <ScrollySection
        id="formula-forge"
        title="LA FORJA MATEMÁTICA"
        academicSource={
          <p className="font-mono text-electric-blue">Q = mcΔT</p>
        }
      >
        <FormulaForge />
      </ScrollySection>

      {/* Footer */}
      <div className="w-full py-20 text-center text-gray-600 text-xs font-mono snap-end">
        <p>THERMODYNAMICS: THE GOLDEN NEXUS &copy; 2024</p>
        <p>SYSTEM ARCHITECT: ANTIGRAVITY AGENT | PROTOCOL 3.0 COMPLETE</p>
      </div>
    </main>
  );
}
