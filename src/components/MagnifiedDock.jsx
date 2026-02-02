import React, { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import {
    Github,
    Linkedin,
    Briefcase,
    User,
    Layers,
    Home,
    AtSign,
} from "lucide-react";

const MagnifiedDock = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const items = [
        { icon: <Home size={22} />, label: "Home", href: "#home" },
        { icon: <User size={22} />, label: "About", href: "#about" },
        { icon: <Briefcase size={22} />, label: "Work", href: "#work" },
        { icon: <Layers size={22} />, label: "Projects", href: "#projects" },
        { icon: <AtSign size={22} />, label: "Contact", href: "#footer" },
        {
            icon: <Github size={22} />,
            label: "GitHub",
            href: "https://github.com/Sardar-Sadiq",
            external: true,
        },
        {
            icon: <Linkedin size={22} />,
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/sardar-sadiq/",
            external: true,
        },
    ];

    const handleClick = (e, href, external) => {
        if (!external && href.startsWith("#")) {
            e.preventDefault();
            lenis?.scrollTo(href, {
                offset: 0,
                lerp: 0.1,
                duration: 1.5,
            });
        }
    };

    return (
        <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none w-full max-w-fit px-4">
            <div
                className="rounded-full px-2 md:px-4 py-2 md:py-3 pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-500 hover:gap-4 flex items-end gap-1 md:gap-2"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {items.map((item, i) => {
                    const isHovered = hoveredIndex === i;
                    const isNeighbor =
                        hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1;

                    // Responsive sizing
                    const baseSize = isMobile ? 32 : 40;
                    const iconSize = isMobile ? 18 : 22;
                    const hoverScale = isMobile ? 1.3 : 1.5;
                    const neighborScale = isMobile ? 1.1 : 1.2;

                    return (
                        <React.Fragment key={i}>
                            <a
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                onClick={(e) => handleClick(e, item.href, item.external)}
                                onMouseEnter={() => setHoveredIndex(i)}
                                className="relative flex flex-col items-center justify-center transition-all duration-300 ease-out"
                                style={{
                                    transform: `scale(${isHovered ? hoverScale : isNeighbor ? neighborScale : 1}) translateY(${isHovered ? -10 : isNeighbor ? -3 : 0}px)`,
                                    width: `${baseSize}px`,
                                    height: `${baseSize}px`,
                                }}
                            >
                                <span
                                    className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] px-2 py-1 rounded-md font-bold tracking-widest transition-opacity duration-200 uppercase pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"} font-poppins hidden md:block`}
                                >
                                    {item.label}
                                </span>
                                <div
                                    className={`transition-colors duration-300 ${isHovered ? "text-white" : "text-zinc-500"}`}
                                >
                                    {React.cloneElement(item.icon, { size: iconSize })}
                                </div>
                            </a>
                            {item.label === "Contact" && (
                                <div className="h-6 w-[1px] bg-white/10 self-center mx-1" />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default MagnifiedDock;
