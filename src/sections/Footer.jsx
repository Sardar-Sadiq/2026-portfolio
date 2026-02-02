import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowUpRight, Clock, MapPin, Globe, ThumbsUp } from "lucide-react";
import confetti from "canvas-confetti";

const Footer = ({ name, email }) => {
    const [time, setTime] = useState(new Date());
    const [copied, setCopied] = useState(false);
    const buttonRef = useRef(null);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);

        // Calculate button position for confetti
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { x, y }, // Exactly from the button center
                colors: [
                    "#ef4444", // Red
                    "#22c55e", // Green
                    "#eab308", // Yellow
                    "#ffffff", // White
                    "#3b82f6"  // Blue
                ],
                zIndex: 9999
            });
        }

        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <footer id="footer" className="relative pt-20 mb-20 pb-0 px-6 max-w-7xl mx-auto overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-60  blur-[120px] rounded-full pointer-events-none" />

            {/* Header Section */}
            <div className="mb-24">
                <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-6 flex items-center gap-3 font-poppins">
                    <Globe size={14} className="text-zinc-300" /> 04. Contact
                </h2>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <h3 className="text-6xl md:text-8xl font-handwriting text-white tracking-tighter leading-none">
                        Let&apos;s build <br /> something <span className="text-zinc-600 italic">together</span>
                    </h3>

                    <div className="relative">
                        <motion.button
                            ref={buttonRef}
                            onClick={handleCopyEmail}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center gap-4 bg-white/[0.03] backdrop-blur-md border border-white/10 px-8 py-6 rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex flex-col items-start flex-1 min-w-0">
                                <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Click to copy email</span>
                                <span className="text-sm md:text-lg font-medium text-white truncate">{email}</span>
                            </div>
                            <div className="relative w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all flex-shrink-0">
                                <Mail size={20} />
                            </div>
                        </motion.button>

                        <AnimatePresence>
                            {copied && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: -40 }}
                                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                    className="absolute left-1/2 -translate-x-1/2 top-0 z-50 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-xl"
                                >
                                    <ThumbsUp size={16} className="text-black fill-black" />
                                    <span className="text-black font-semibold text-xs whitespace-nowrap">Copy Done</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-white/10 pt-12">
                {/* Time Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-32">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                        <Clock size={12} /> Local Time
                    </span>
                    <span className="text-2xl font-mono text-white tracking-widest">{formattedTime}</span>
                </div>

                {/* Status Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-32">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">Status</span>
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </div>
                        <span className="text-sm text-zinc-300 font-medium">Available for Hiring</span>
                    </div>
                </div>

                {/* Location Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-32">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                        <MapPin size={12} /> Based In
                    </span>
                    <span className="text-lg text-white">Anantapur, India</span>
                </div>

                {/* Copyright Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-32">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 underline decoration-zinc-800">Legal</span>
                    <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest leading-loose">
                        © 2026 Sardar Sadiq<br />All Rights Reserved
                    </p>
                </div>
            </div>

            {/* Final Logo/Name Line */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
            >
                <div className="text-[10px] tracking-[0.6em] text-zinc-700 uppercase font-poppins">
                    Crafting digital experiences with precision
                </div>
                <div className="flex items-center gap-4 text-zinc-500 text-[10px] tracking-widest cursor-default">
                    <span>DESIGNED BY SADIQ</span>
                    <span className="w-8 h-[1px] bg-zinc-800"></span>
                    <span>DEVELOPED WITH REACT.JS</span>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
