import React from "react";

/**
 * ACETERNITY UI: Text Hover Effect (Signature Overlay)
 */
const TextHoverEffect = ({ text, active }) => {
    return (
        <div className="relative group inline-block cursor-default w-full md:w-auto transition-transform duration-500 hover:scale-[1.02]">
            <div
                className={`text-5xl md:text-[12rem] font-handwriting transition-all duration-1000 block tracking-tighter leading-none relative z-10 break-all md:break-normal ${active ? "text-white" : "text-white/10 md:text-white/5"}`}
            >
                {text}
            </div>
            {/* Hand-drawn Signature stroke sitting at the BOTTOM */}
            <svg
                viewBox="0 0 600 120"
                className={`absolute bottom-[-50px] md:bottom-[-160px] left-1/2 -translate-x-1/2 w-[90%] md:w-[110%] pointer-events-none overflow-visible text-white/40`}
                fill="none"
            >
                <path
                    d="M222.462 12.8345C177.074 10.0328 132.077 4.80881 86.6062 3.64623C60.4691 2.97796 -17.6945 1.02174 8.17755 4.79475C50.7028 10.9964 94.6534 10.7971 137.47 14.9675C154.059 16.5834 170.516 18.7493 187.021 21.0384C193.373 21.9193 198.334 23.4078 188.17 22.8432C142.806 20.323 97.6784 14.7225 52.3141 12.0141C47.4732 11.7251 33.1304 11.5843 37.7934 12.9165C54.8856 17.8 73.2224 19.7239 90.7081 22.433C111.764 25.6952 133.161 27.7326 154.042 32.0315C161.542 33.5757 171.588 34.0575 178.571 37.1999C190.929 42.7607 151.511 39.3406 137.962 39.0868C115.414 38.6643 92.8916 37.3627 70.3626 36.4616"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="square"
                    style={{
                        strokeDasharray: 2000,
                        strokeDashoffset: active ? 0 : 2000,
                        transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        opacity: active ? 1 : 0,
                    }}
                />
            </svg>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/10 blur-3xl transition-opacity duration-1000 pointer-events-none ${active ? "opacity-100" : "opacity-0"}`} />
        </div>
    );
};

export default TextHoverEffect;
