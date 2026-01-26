import React from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const RevealSection = ({ children, className = "", id }) => {
    const [ref, isVisible] = useIntersectionObserver({
        threshold: 0.1,
        triggerOnce: true,
    });
    return (
        <section
            ref={ref}
            id={id}
            className={`${className} transition-all duration-[1.5s] ease-out ${isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-2xl translate-y-20"}`}
        >
            {children}
        </section>
    );
};

export default RevealSection;
