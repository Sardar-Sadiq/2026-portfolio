import React from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const RevealSection = ({ children, className = "", id, verticalShift = true }) => {
    const [ref, isVisible] = useIntersectionObserver({
        threshold: 0.1,
        triggerOnce: true,
    });
    return (
        <section
            ref={ref}
            id={id}
            className={`${className} transition-all duration-[1.5s] ease-out ${isVisible ? "opacity-100 blur-0 translate-y-0" : `opacity-0 blur-2xl ${verticalShift ? "translate-y-20" : "translate-y-0"}`}`}
        >
            {children}
        </section>
    );
};

export default RevealSection;
