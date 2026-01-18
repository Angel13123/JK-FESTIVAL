import { useEffect } from 'react';
import { useAtomicStore } from './useAtomicStore';

export const useArchitectLogger = () => {
    const { logs, addLog } = useAtomicStore();

    const logInteraction = (action, details = {}) => {
        const entry = {
            timestamp: new Date().toISOString(),
            phase: 2,
            action,
            details,
        };
        addLog(entry);
        console.log('[ArchitectLogger]', entry);
    };

    // Sync to localStorage
    useEffect(() => {
        if (logs.length > 0) {
            localStorage.setItem('architect_logs_v1', JSON.stringify(logs));
        }
    }, [logs]);

    return { logInteraction };
};
