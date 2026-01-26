import React, { useState } from "react";
import {
    Github,
    Linkedin,
    Briefcase,
    User,
    Layers,
    Home,
} from "lucide-react";

const MagnifiedDock = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const items = [
        { icon: <Home size={22} />, label: "Home", href: "#home" },
        { icon: <User size={22} />, label: "About", href: "#about" },
        { icon: <Briefcase size={22} />, label: "Work", href: "#work" },
        { icon: <Layers size={22} />, label: "Projects", href: "#projects" },
        {
            icon: <Github size={22} />,
            label: "GitHub",
            href: "https://github.com/sardarsadiq",
        },
        {
            icon: <Linkedin size={22} />,
            label: "LinkedIn",
            href: "https://linkedin.com/in/sardarsadiq",
        },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none">
            <div
                className="flex items-end gap-2 px-4 py-3 bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-full pointer-events-auto shadow-2xl transition-all duration-500 hover:gap-4"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {items.map((item, i) => {
                    const isHovered = hoveredIndex === i;
                    const isNeighbor =
                        hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1;
                    return (
                        <a
                            key={i}
                            href={item.href}
                            onMouseEnter={() => setHoveredIndex(i)}
                            className="relative flex flex-col items-center justify-center transition-all duration-300 ease-out"
                            style={{
                                transform: `scale(${isHovered ? 1.5 : isNeighbor ? 1.2 : 1}) translateY(${isHovered ? -12 : isNeighbor ? -4 : 0}px)`,
                                width: "40px",
                                height: "40px",
                            }}
                        >
                            <span
                                className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] px-2 py-1 rounded-md font-bold tracking-widest transition-opacity duration-200 uppercase pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"} font-poppins`}
                            >
                                {item.label}
                            </span>
                            <div
                                className={`transition-colors duration-300 ${isHovered ? "text-white" : "text-zinc-500"}`}
                            >
                                {item.icon}
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default MagnifiedDock;
