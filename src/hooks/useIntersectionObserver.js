import { useState, useRef, useEffect } from "react";

const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                if (options.triggerOnce) observer.unobserve(entry.target);
            } else {
                if (!options.triggerOnce) setIsIntersecting(false);
            }
        }, options);

        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, [options]);

    return [elementRef, isIntersecting];
};

export default useIntersectionObserver;
