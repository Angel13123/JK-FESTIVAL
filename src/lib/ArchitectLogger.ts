'use client';

import { useEffect, useRef } from 'react';

type SectionMetrics = {
    [id: string]: number; // Time in milliseconds
};

export class ArchitectLogger {
    private metrics: SectionMetrics = {};
    private activeSection: string | null = null;
    private lastSwitchTime: number = Date.now();

    constructor() {
        if (typeof window !== 'undefined') {
            // Restore from session storage if available
            const saved = sessionStorage.getItem('goldenNexusMetrics');
            if (saved) {
                this.metrics = JSON.parse(saved);
            }
        }
    }

    public setActiveSection(sectionId: string) {
        if (this.activeSection === sectionId) return;

        this.updateTime();
        this.activeSection = sectionId;
        this.lastSwitchTime = Date.now();
        console.log(`[ArchitectLogger] Active Sector: ${sectionId}`);
    }

    private updateTime() {
        if (this.activeSection) {
            const now = Date.now();
            const elapsed = now - this.lastSwitchTime;
            this.metrics[this.activeSection] = (this.metrics[this.activeSection] || 0) + elapsed;
            this.lastSwitchTime = now;

            // Persist
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('goldenNexusMetrics', JSON.stringify(this.metrics));
            }
        }
    }

    public getMetrics() {
        this.updateTime(); // Ensure latest time is captured
        return this.metrics;
    }
}

export const useArchitectLogger = () => {
    const loggerRef = useRef<ArchitectLogger | null>(null);

    useEffect(() => {
        loggerRef.current = new ArchitectLogger();

        // Setup Intersection Observer used to feed the logger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loggerRef.current?.setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.5 }); // 50% visibility triggers switch

        // Tracking targets
        const targets = document.querySelectorAll('[data-track-section]');
        targets.forEach(t => observer.observe(t));

        return () => observer.disconnect();
    }, []);

    return loggerRef.current;
};
