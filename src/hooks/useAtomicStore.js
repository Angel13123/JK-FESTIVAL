import { create } from 'zustand';

export const useAtomicStore = create((set) => ({
    // Physics State
    temperature: 20, // Celsius
    moleculeCount: 100,
    isHeatInjected: false,

    // UI State
    unlockedSections: ['intro'], // 'intro', 'mass', 'heat', 'temp', 'specific-heat'

    // Telemetry
    logs: [],

    // Actions
    setTemperature: (temp) => set({ temperature: temp }),
    setMoleculeCount: (count) => set({ moleculeCount: count }),
    injectHeat: (active) => set((state) => ({
        isHeatInjected: active,
        temperature: active ? state.temperature + 500 : 20 // Simulate heat spike
    })),
    unlockSection: (section) => set((state) => ({
        unlockedSections: [...new Set([...state.unlockedSections, section])]
    })),
    addLog: (entry) => set((state) => ({ logs: [...state.logs, entry] })),
}));

export default useAtomicStore;
