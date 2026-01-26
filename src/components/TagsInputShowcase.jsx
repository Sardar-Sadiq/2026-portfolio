import React from "react";
import { Check } from "lucide-react";
import LiquidGlassCard from "./LiquidGlassCard";

/**
 * UI-LAYOUTS: Tags Input (Showcase Mode)
 */
const TagsInputShowcase = ({ tags }) => {
    return (
        <LiquidGlassCard
            blurIntensity="xl"
            shadowIntensity="xl"
            borderRadius="24px"
            className="p-6"
        >
            <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                    <div
                        key={tag}
                        className="group relative flex items-center gap-3 px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl text-xs md:text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 hover:border-white/20 transition-all duration-300 cursor-default uppercase tracking-widest font-medium font-poppins"
                    >
                        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-zinc-900 border border-zinc-700 group-hover:border-zinc-500 transition-colors">
                            <Check
                                size={10}
                                className="text-zinc-500 group-hover:text-zinc-200 transition-colors"
                                strokeWidth={3}
                            />
                        </div>
                        {tag}
                    </div>
                ))}
            </div>
        </LiquidGlassCard>
    );
};

export default TagsInputShowcase;
