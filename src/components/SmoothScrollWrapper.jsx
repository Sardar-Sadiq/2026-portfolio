import React, { useEffect } from "react";

const SmoothScrollWrapper = ({ children }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://unpkg.com/@studio-freight/lenis@1.0.33/dist/lenis.min.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const lenis = new window.Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: "vertical",
                smooth: true,
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        };

        return () => {
            if (document.body.contains(script)) document.body.removeChild(script);
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScrollWrapper;
