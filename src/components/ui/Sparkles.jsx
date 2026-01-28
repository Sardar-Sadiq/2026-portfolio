"use strict";
import React, { useId, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const SparklesCore = (props) => {
    const {
        id,
        className,
        background,
        minSize,
        maxSize,
        speed,
        particleColor,
        particleDensity,
    } = props;
    const [opacity, setOpacity] = useState(0);
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                const resizeCanvas = () => {
                    const { width, height } = containerRef.current.getBoundingClientRect();
                    canvas.width = width;
                    canvas.height = height;
                    initParticles();
                };

                const initParticles = () => {
                    const { width, height } = canvas;
                    const density = particleDensity || 100;
                    particles.current = [];
                    for (let i = 0; i < density; i++) {
                        particles.current.push({
                            x: Math.random() * width,
                            y: Math.random() * height,
                            size: Math.random() * (maxSize - minSize) + minSize,
                            speedX: (Math.random() - 0.5) * (speed || 1),
                            speedY: (Math.random() - 0.5) * (speed || 1),
                            opacity: Math.random(),
                        });
                    }
                };

                const animate = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    particles.current.forEach((p) => {
                        p.x += p.speedX;
                        p.y += p.speedY;

                        if (p.x < 0) p.x = canvas.width;
                        if (p.x > canvas.width) p.x = 0;
                        if (p.y < 0) p.y = canvas.height;
                        if (p.y > canvas.height) p.y = 0;

                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fillStyle = particleColor || "#FFFFFF";
                        ctx.globalAlpha = p.opacity;
                        ctx.fill();
                    });
                    requestAnimationFrame(animate);
                };

                resizeCanvas();
                animate();
                window.addEventListener("resize", resizeCanvas);
                setOpacity(1);

                return () => {
                    window.removeEventListener("resize", resizeCanvas);
                };
            }
        }
    }, [maxSize, minSize, particleColor, particleDensity, speed]);

    return (
        <motion.div
            ref={containerRef}
            animate={{ opacity: opacity }}
            className={cn("h-full w-full", className)}
        >
            <canvas
                ref={canvasRef}
                id={id || "sparkles-canvas"}
                style={{
                    background: background || "transparent",
                    display: "block",
                }}
            />
        </motion.div>
    );
};
