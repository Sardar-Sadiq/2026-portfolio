import React, { useState, useRef } from "react";

const ImageRevealCard = ({ project, index }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative py-12 md:py-20 w-full border-b border-white/5 flex flex-col justify-center px-8 md:px-12 cursor-pointer overflow-hidden transition-colors hover:bg-white/[0.02]"
        >
            <div className="relative z-10 flex items-baseline gap-6 pointer-events-none">
                <span className="font-mono text-zinc-700 text-sm">0{index + 1}</span>
                <h3 className="text-5xl md:text-8xl font-handwriting text-white tracking-tight transition-all duration-500">
                    {project.title}
                </h3>
            </div>
            <div className="relative z-10 mt-4 ml-12 md:ml-20 flex flex-wrap gap-4 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500 font-poppins">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-[10px] uppercase tracking-[0.25em] font-medium text-zinc-300"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div
                className="absolute pointer-events-none z-20 w-64 h-80 rounded-2xl overflow-hidden opacity-0 scale-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0.5}) rotate(${isHovering ? (mousePos.x % 10) - 5 : 0}deg)`,
                    opacity: isHovering ? 1 : 0,
                }}
            >
                <img
                    src={`https://images.unsplash.com/photo-${project.imgId}?auto=format&fit=crop&q=80&w=800`}
                    alt={project.title}
                    className="w-full h-full object-cover scale-110"
                />
            </div>
        </div>
    );
};

export default ImageRevealCard;
