'use client';

import { motion } from 'framer-motion';

export const BrainVisualization = () => {
    return (
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-64 h-64 md:w-96 md:h-96">
                <defs>
                    <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#f093fb" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Abstract Brain Nodes */}
                {[...Array(20)].map((_, i) => (
                    <motion.circle
                        key={i}
                        cx={100 + Math.cos(i * 0.5) * 60}
                        cy={100 + Math.sin(i * 0.5) * 50}
                        r={3}
                        fill="url(#brainGradient)"
                        initial={{ opacity: 0.3, scale: 1 }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}

                {/* Connections */}
                {[...Array(15)].map((_, i) => (
                    <motion.line
                        key={`line-${i}`}
                        x1={100 + Math.cos(i * 0.5) * 60}
                        y1={100 + Math.sin(i * 0.5) * 50}
                        x2={100 + Math.cos((i + 5) * 0.5) * 60}
                        y2={100 + Math.sin((i + 5) * 0.5) * 50}
                        stroke="url(#brainGradient)"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 0],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}

                {/* Central Core */}
                <motion.circle
                    cx="100"
                    cy="100"
                    r="20"
                    fill="none"
                    stroke="url(#brainGradient)"
                    strokeWidth="1"
                    filter="url(#glow)"
                    animate={{
                        r: [20, 25, 20],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </svg>

            {/* Floating Labels */}
            <motion.div
                className="absolute top-1/4 left-1/4 bg-neuro-surface/80 backdrop-blur-sm px-3 py-1 rounded-full border border-neuro-primary/30 text-xs text-neuro-cyan"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                Synaptic Plasticity
            </motion.div>

            <motion.div
                className="absolute bottom-1/3 right-1/4 bg-neuro-surface/80 backdrop-blur-sm px-3 py-1 rounded-full border border-neuro-secondary/30 text-xs text-neuro-accent"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                Neural Networks
            </motion.div>
        </div>
    );
};
