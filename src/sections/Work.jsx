import React from "react";
import { Briefcase } from "lucide-react";
import RevealSection from "../components/RevealSection";
import LiquidGlassCard from "../components/LiquidGlassCard";

const Work = ({ experience }) => {
    return (
        <RevealSection
            id="work"
            className="relative py-40 px-6 max-w-6xl mx-auto font-poppins"
        >
            <LiquidGlassCard
                borderRadius="48px"
                shadowIntensity="2xl"
                blurIntensity="xl"
                className="p-6 md:p-24"
            >
                <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-16 flex items-center gap-3">
                    <Briefcase size={14} className="text-zinc-300" /> 02. Narrative
                </h2>
                <div className="space-y-16 md:space-y-32 relative z-10">
                    {experience.map((exp, i) => (
                        <div
                            key={i}
                            className={`relative ${i !== 0 ? "pt-16 md:pt-32 border-t border-white/5" : ""}`}
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8">
                                <h3 className="text-5xl md:text-6xl font-handwriting text-white tracking-tight">
                                    {exp.company}
                                </h3>
                                <span className="text-zinc-600 font-mono text-sm tracking-tighter uppercase">
                                    {exp.period}
                                </span>
                            </div>
                            <p className="text-zinc-400 text-lg leading-relaxed font-light italic">
                                Built high-performance UIs and optimized complex dashboard
                                architectures with focus on code quality.
                            </p>
                        </div>
                    ))}
                </div>
            </LiquidGlassCard>
        </RevealSection>
    );
};

export default Work;
