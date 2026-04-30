'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const NeuroBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Deep Space Base */}
            <div className="absolute inset-0 bg-neuro-base" />

            {/* Animated Gradients */}
            <motion.div
                style={{ y: y1, opacity }}
                className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neuro-primary/10 blur-[100px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                style={{ y: y2, opacity }}
                className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-neuro-secondary/10 blur-[120px]"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-neuro-base/80" />
        </div>
    );
};
