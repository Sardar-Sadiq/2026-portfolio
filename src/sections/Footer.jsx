import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowUpRight, Clock, MapPin, Globe, ThumbsUp, Github } from "lucide-react";
import confetti from "canvas-confetti";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const Footer = ({ email }) => {
    const [time, setTime] = useState(new Date());
    const [copied, setCopied] = useState(false);
    const [githubData, setGithubData] = useState({ contributions: "..." });
    const buttonRef = useRef(null);
    const [footerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);

        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { x, y },
                colors: ["#ef4444", "#22c55e", "#eab308", "#ffffff", "#3b82f6"],
                zIndex: 9999
            });
        }

        setTimeout(() => setCopied(false), 2000);
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        fetch("https://github-contributions-api.deno.dev/Sardar-Sadiq/count")
            .then(res => res.json())
            .then(data => {
                if (data && data.total && data.total.all) {
                    setGithubData({ contributions: data.total.all.toLocaleString() });
                } else if (data && data.total_count) {
                    setGithubData({ contributions: data.total_count.toLocaleString() });
                }
            })
            .catch(() => setGithubData({ contributions: "1k" }))
            .finally(() => setIsLoading(false));
    }, [isVisible]);

    const formattedTime = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <footer ref={footerRef} id="footer" className="relative pt-20 mb-20 pb-0 px-6 max-w-7xl mx-auto overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-60 blur-[120px] rounded-full pointer-events-none" />

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
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative inline-flex items-center gap-4 bg-white/[0.02] border border-white/5 px-8 py-6 rounded-2xl overflow-hidden cursor-pointer w-full md:w-auto"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex flex-col items-start flex-1 min-w-0">
                                <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Click to copy email</span>
                                <span className="text-sm md:text-lg font-medium text-white truncate text-glow-hover">{email}</span>
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

                {/* GitHub Contributions Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-32 group cursor-default">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                        <Github size={12} /> Commits Info
                    </span>
                    <div className="flex flex-col">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.span
                                    key="loader"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-2xl font-mono text-zinc-800 animate-pulse"
                                >
                                    ...
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="count"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="text-2xl font-mono text-white tracking-widest group-hover:text-emerald-400 transition-colors"
                                >
                                    {githubData.contributions}+
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <span className="text-[8px] uppercase tracking-widest text-zinc-600 mt-1">Total Lifetime Contributions</span>
                    </div>
                </div>

                {/* Location Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-32">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                        <MapPin size={12} /> Based In
                    </span>
                    <span className="text-lg text-white">Anantapur, India</span>
                </div>
            </div>

            {/* Final Logo/Name Line */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 pt-12 border-t border-white/5 flex flex-col items-center md:flex-row justify-end md:items-center gap-6"
            >

                <div className="flex flex-col items-center md:flex-row md:items-center gap-4 text-zinc-500 text-[10px] tracking-widest cursor-default text-center md:text-right">
                    <div className="flex items-center gap-4">
                        <span>DESIGNED BY SADIQ</span>
                    </div>
                    <span className="hidden md:block w-4 h-[1px] bg-zinc-800"></span>
                    <span className="text-zinc-600">© 2026 ALL RIGHTS RESERVED</span>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
