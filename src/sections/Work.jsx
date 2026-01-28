import React from "react";
import { Terminal } from "lucide-react";
import RevealSection from "../components/RevealSection";
import StackTrace from "../components/StackTrace";


const Work = ({ experience }) => {
    return (
        <RevealSection
            id="work"
            className="relative py-40 px-6 max-w-6xl mx-auto"
        >
            <div className="flex flex-col gap-12 relative z-10">
                <div className="flex flex-col gap-4">
                    <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3 font-poppins">
                        <Terminal size={14} className="text-zinc-300" /> 02. Lifecycle
                    </h2>
                    <h3 className="text-5xl md:text-7xl font-handwriting text-white tracking-tight">
                        Career <span className="text-zinc-500">Runtime.</span>
                    </h3>
                </div>

                <div className="relative z-10">
                    <StackTrace experience={experience} />
                </div>
            </div>
        </RevealSection>
    );
};

export default Work;
