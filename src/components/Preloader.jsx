import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * Preloader — Comic Brush Reveal & Erase animation using comic.png.
 *
 * 1. Brush Reveal: Staggered paint brush strokes sweep left-to-right to reveal the comic sticker.
 * 2. Hold: Sticker stays visible with comic Spider-Verse drop-shadow & tilt bounce.
 * 3. Brush Erase: Brush strokes sweep left-to-right again, erasing the sticker in the exact same brushing motion.
 * 4. Website Transition: Preloader fades out smoothly into the main website.
 */

const TOTAL_ANIMATION_TIME = 3100;
const FADE_OUT_TIME = 500;

const PATH_LENGTH = 1200;

// Organic angled brush stroke paths
const BRUSH_PATHS = [
  { d: "M -80,50 C 140,10 360,80 580,40", width: 110, delay: 0 },
  { d: "M -80,135 C 160,180 340,95 580,145", width: 120, delay: 0.07 },
  { d: "M -80,225 C 140,190 360,265 580,215", width: 115, delay: 0.14 },
  { d: "M -80,315 C 160,360 340,285 580,325", width: 110, delay: 0.21 },
];

export const SpiderStickerLoader = ({ src = "/comic.png", className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center p-4 select-none ${className}`}>
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          filter: [
            "drop-shadow(0 0 0 transparent)",
            "drop-shadow(-8px -4px 0 #00ffff) drop-shadow(8px 4px 0 #ff0055)",
            "drop-shadow(6px -3px 0 #00ffff) drop-shadow(-6px 3px 0 #ff0055)",
            "drop-shadow(-10px 4px 0 #00ffff) drop-shadow(10px -4px 0 #ff0055)",
            "drop-shadow(4px 4px 0 #000000)",
            "drop-shadow(-6px 0 0 #00ffff) drop-shadow(6px 0 0 #ff0055)",
            "drop-shadow(8px -2px 0 #00ffff) drop-shadow(-8px 2px 0 #ff0055)",
            "drop-shadow(-4px 3px 0 #00ffff) drop-shadow(4px -3px 0 #ff0055)",
            "drop-shadow(0 0 0 transparent)",
          ],
        }}
        transition={{
          duration: 2.9,
          times: [0, 0.2, 0.35, 0.48, 0.6, 0.72, 0.85, 0.93, 1],
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 500 380"
          className="w-[300px] sm:w-[420px] md:w-[480px] h-auto overflow-visible"
        >
          <defs>
            {/* SVG Brush Mask */}
            <mask id="comic-brush-mask">
              {/* Black background = hidden */}
              <rect x="-100" y="-100" width="700" height="580" fill="black" />

              {/* White animated brush stroke paths = reveal / erase window */}
              {BRUSH_PATHS.map((path, i) => (
                <motion.path
                  key={i}
                  d={path.d}
                  fill="none"
                  stroke="white"
                  strokeWidth={path.width}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={`${PATH_LENGTH} ${PATH_LENGTH}`}
                  initial={{ strokeDashoffset: PATH_LENGTH }}
                  animate={{
                    // 1. Reveal (PATH_LENGTH -> 0)
                    // 2. Hold (0 -> 0)
                    // 3. Erase (0 -> -PATH_LENGTH)
                    strokeDashoffset: [PATH_LENGTH, 0, 0, -PATH_LENGTH],
                  }}
                  transition={{
                    duration: 2.9,
                    times: [0, 0.36, 0.64, 1],
                    ease: "easeInOut",
                    delay: path.delay,
                  }}
                />
              ))}
            </mask>
          </defs>

          {/* Masked Comic Image */}
          <g mask="url(#comic-brush-mask)">
            <image
              href={src}
              x="0"
              y="0"
              width="500"
              height="380"
              preserveAspectRatio="xMidYMid meet"
              style={{ imageRendering: "pixelated" }}
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fade"), TOTAL_ANIMATION_TIME);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, TOTAL_ANIMATION_TIME + FADE_OUT_TIME);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        opacity: phase === "fade" ? 0 : 1,
        transition: phase === "fade"
          ? `opacity ${FADE_OUT_TIME}ms ease-in-out`
          : "none",
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
    >
      {/* ── 1. Blurred radial glow orbs ── */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "rgba(63,63,70,0.1)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-15%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "rgba(23,37,84,0.05)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "5%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background: "rgba(63,63,70,0.05)",
          filter: "blur(110px)",
          pointerEvents: "none",
        }}
      />

      {/* ── 2. Dot grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* ── 3. Noise texture overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: "url('https://www.ui-layouts.com/noise.gif')",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── 4. Spider Sticker Brush Loader ── */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <SpiderStickerLoader src="/comic.png" />
      </div>
    </div>
  );
}


