import React from "react";
import { ReactLenis } from "lenis/react";

const SmoothScrollWrapper = ({ children }) => {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1, // Adjusted for responsiveness
                duration: 1.2,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            }}
        >
            {children}
        </ReactLenis>
    );
};

export default SmoothScrollWrapper;
