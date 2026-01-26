import React from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

/**
 * ACETERNITY UI: Text Generate Effect
 * Blurs text into focus as it enters viewport.
 */
const TextGenerateEffect = ({ text }) => {
    const [ref, isVisible] = useIntersectionObserver({
        threshold: 0.2,
        triggerOnce: true,
    });
    return (
        <div ref={ref} className="flex flex-wrap gap-x-2">
            {text.split(" ").map((word, i) => (
                <span
                    key={i}
                    className="inline-block text-zinc-400 font-poppins text-xl md:text-2xl leading-relaxed transition-all duration-1000 ease-out"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        filter: isVisible ? "blur(0px)" : "blur(10px)",
                        transform: isVisible ? "translateY(0)" : "translateY(10px)",
                        transitionDelay: `${i * 30}ms`,
                    }}
                >
                    {word}
                </span>
            ))}
        </div>
    );
};

export default TextGenerateEffect;
