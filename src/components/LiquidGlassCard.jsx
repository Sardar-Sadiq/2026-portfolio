import React from "react";

const LiquidGlassCard = ({ children, className = "", style = {} }) => {
    return (
        <div
            className={`
                bg-[#aeaeae0f] 
                backdrop-brightness-[108.0%] 
                backdrop-saturate-[105.0%] 
                backdrop-hue-rotate-[10.0deg] 
                [-webkit-backdrop-filter:brightness(108.0%)_saturate(105.0%)_hue-rotate(10.0deg)] 
                shadow-[inset_1px_0_0_rgba(255,255,255,0.32),inset_-1px_0_1px_rgba(0,0,0,0.16)]
                rounded-3xl
                overflow-hidden
                ${className}
            `}
            style={style}
        >
            {children}
        </div>
    );
};

export default LiquidGlassCard;



