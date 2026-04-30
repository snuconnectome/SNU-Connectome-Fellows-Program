'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
}

export const Tooltip = ({ children, content }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <span
            className="relative inline-block cursor-help border-b border-dashed border-neuro-primary/50"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-neuro-surface border border-neuro-primary/30 rounded-lg shadow-xl z-50"
                    >
                        <div className="text-sm text-gray-300 leading-relaxed">
                            {content}
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neuro-surface" />
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};
