
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "./ui/Sparkles";
import { cn } from "../lib/utils";
import { ChevronRight, ChevronDown, Terminal } from "lucide-react";

const StackFrame = ({ exp, isOpen, onClick, index }) => {
    const companyName = exp.company.replace(/\s+/g, "");
    const roleName = exp.role.toLowerCase().replace(/\s+/g, "");

    return (
        <div className="border-b border-white/10 last:border-0 overflow-hidden">
            <button
                onClick={onClick}
                className="w-full text-left py-8 px-6 bg-black/20 hover:bg-black/40 transition-all duration-300 flex items-center justify-between group"
            >
                <div className="flex items-center gap-6">
                    <span className="text-zinc-600 font-mono text-sm group-hover:text-white transition-colors">
                        [{index.toString().padStart(2, "0")}]
                    </span>
                    <h3 className="font-handwriting text-2xl md:text-3xl font-semibold text-white tracking-wide group-hover:scale-[1.02] transition-transform origin-left">
                        at {companyName}.{roleName}()
                        <span className="text-zinc-500 text-sm ml-4 font-poppins font-normal">— {exp.period}</span>
                    </h3>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] hidden md:inline">
                        {isOpen ? "[COLLAPSE]" : "[EXPAND]"}
                    </span>
                    <div className={cn(
                        "transition-transform duration-300",
                        isOpen ? "rotate-180" : "rotate-0"
                    )}>
                        <ChevronDown size={20} className="text-white/70" />
                    </div>
                </div>
            </button>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="relative overflow-hidden"
                    >
                        {/* Background Dark Overlay */}
                        <div className="absolute inset-0 z-0 bg-[#0a0a0a]/90 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />

                        {/* Sparkles Effect (White) */}
                        <div className="absolute inset-0 z-0 opacity-40">
                            <SparklesCore
                                id={`sparkles-${index}`}
                                background="transparent"
                                minSize={0.4}
                                maxSize={1.2}
                                particleDensity={60}
                                className="w-full h-full"
                                particleColor="#FFFFFF"
                            />
                        </div>

                        <div className="relative z-10 px-12 md:px-24 py-12 space-y-6">
                            {/* Side White Gradient Line */}
                            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/0 via-white/40 to-white/0" />

                            {exp.achievements?.map((achievement, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 group/ach relative"
                                >
                                    <span className="text-white/20 font-mono text-xs mt-1 select-none w-4 text-right">
                                        {i + 1}
                                    </span>
                                    <span className="text-white/30 font-mono text-[10px] mt-1.5 select-none tracking-widest">
                                        LOG
                                    </span>
                                    <p className="text-zinc-300 font-poppins text-base leading-relaxed group-hover/ach:text-white transition-colors drop-shadow-sm font-light">
                                        {achievement}
                                    </p>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (exp.achievements?.length || 0) * 0.1 + 0.2 }}
                                className="pt-8 flex items-center gap-3"
                            >
                                <Terminal size={16} className="text-white" />
                                <span className="text-xs md:text-sm font-poppins font-bold text-white uppercase tracking-[0.3em] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                                    Process completed successfully.
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StackTrace = ({ experience }) => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="w-full rounded-3xl overflow-hidden border border-white/5 bg-white/5 shadow-2xl">
            <div className="flex flex-col">
                {experience.map((exp, i) => (
                    <StackFrame
                        key={i}
                        index={i}
                        exp={exp}
                        isOpen={openIndex === i}
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default StackTrace;
