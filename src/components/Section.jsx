import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useArchitectLogger } from '../hooks/useArchitectLogger';
import { clsx } from 'clsx';

export default function Section({ id, children, className, onActive }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });
    const { logInteraction } = useArchitectLogger();

    useEffect(() => {
        if (isInView && onActive) {
            onActive(id);
            logInteraction('SectionView', { sectionId: id });
        }
    }, [isInView, id]);

    return (
        <section
            ref={ref}
            id={id}
            className={clsx(
                "min-h-screen w-full flex flex-col items-center justify-center p-8 snap-start relative",
                className
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-4xl z-10"
            >
                {children}
            </motion.div>
        </section>
    );
}
