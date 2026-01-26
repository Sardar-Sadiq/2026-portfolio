import React from "react";

const SVGDraw = ({
    path,
    className = "",
    width = "100",
    height = "100",
    duration = 1.5,
    active = false,
}) => {
    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className={`${className} pointer-events-none absolute overflow-visible`}
            fill="none"
        >
            <path
                d={path}
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    strokeDasharray: 2000,
                    strokeDashoffset: active ? 0 : 2000,
                    transition: `stroke-dashoffset ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
            />
        </svg>
    );
};

export default SVGDraw;
