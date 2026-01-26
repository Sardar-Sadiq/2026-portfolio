
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

// Helper for mapped values (keeping compatibility with existing usage)
const blurMap = {
    none: 'backdrop-blur-none',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
    '3xl': 'backdrop-blur-3xl',
};

const shadowMap = {
    none: 'shadow-none',
    xs: 'shadow-xs',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
};

// Premium Liquid Glass Card Implementation
const LiquidGlassCard = ({
    children,
    className,
    intensity = 'medium',
    blurIntensity = 'md',
    shadowIntensity = 'md',
    borderRadius = '12px',
    ...props
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={cn(
                'relative overflow-hidden border border-white/10 bg-white/5 shadow-xl',
                blurMap[blurIntensity] || blurMap.md,
                shadowMap[shadowIntensity] || shadowMap.md,
                className
            )}
            style={{
                borderRadius: borderRadius,
                // Using a sophisticated gradient for the "liquid" feel without overwhelming hover effects
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            }}
            {...props}
        >
            {/* Subtle shine effect overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)',
                }}
            />

            {/* Content wrapper */}
            <div className="relative z-10 h-full w-full">
                {children}
            </div>
        </motion.div>
    );
};

export default LiquidGlassCard;
