import React from "react";
import RevealSection from "../components/RevealSection";

const Hero = ({ name }) => {
    return (
        <RevealSection
            id="home"
            verticalShift={false}
            className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden"
        >
            <div className="relative z-10 text-center flex flex-col items-center max-w-7xl">
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                        Portfolio © 2026
                    </span>
                </div>

                <div className="relative group cursor-default mb-10">
                    <h1 className="text-8xl md:text-[14.5rem] font-handwriting text-white mb-6 tracking-tight leading-[0.7] relative z-10">
                        {name}
                    </h1>
                    <svg
                        viewBox="0 0 600 120"
                        className="absolute bottom-[-40px] md:bottom-[-110px] left-[-5%] w-[110%] md:w-[120%] pointer-events-none overflow-visible text-white"
                        fill="none"
                    >
                        <path
                            d="M7,50 Q100,70 500,45 T480,60"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                strokeDasharray: 2500,
                                strokeDashoffset: 2500,
                                animation: "draw-line 2.5s ease-in forwards",
                            }}
                        />
                    </svg>
                </div>

                <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mt-16 text-center opacity-80">
                    Crafting{" "}
                    <span className="text-zinc-300 font-medium tracking-wide">
                        high-performance
                    </span>{" "}
                    digital experiences through{" "}
                    <span className="text-zinc-300 font-medium">
                        scalable architectures
                    </span>
                    .
                </p>
            </div>
        </RevealSection>
    );
};

export default Hero;
