import React, { useEffect, useState } from "react";

/**
 * Preloader — Luffy Gear 5 bounce animation.
 *
 * Background mirrors BackgroundLayer.jsx exactly:
 *  - Black base
 *  - Soft blurred radial glow orbs
 *  - White dot grid (40px, 15% opacity)
 *  - Noise texture overlay (5% opacity)
 *
 * GIF has a soft bottom-edge blur blend into the background.
 */

const JUMP_DURATION = 1300;
const HOLD_JUMPS = 2;
const FADE_DURATION = 800;

const FADE_AT = JUMP_DURATION * HOLD_JUMPS;  // 2600 ms
const DONE_AT = FADE_AT + FADE_DURATION;     // 3400 ms

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fade"), FADE_AT);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, DONE_AT);
    return () => { clearTimeout(t1); clearTimeout(t2); };
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
          ? `opacity ${FADE_DURATION}ms ease-in-out`
          : "none",
      }}
    >

      {/* ── 1. Blurred radial glow orbs (from BackgroundLayer) ── */}
      <div style={{
        position: "absolute",
        top: "-10%", left: "-10%",
        width: "50vw", height: "50vw",
        borderRadius: "50%",
        background: "rgba(63,63,70,0.1)",   /* zinc-800/10 */
        filter: "blur(120px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "20%", right: "-15%",
        width: "60vw", height: "60vw",
        borderRadius: "50%",
        background: "rgba(23,37,84,0.05)",  /* blue-950/5 */
        filter: "blur(140px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-10%", left: "5%",
        width: "45vw", height: "45vw",
        borderRadius: "50%",
        background: "rgba(63,63,70,0.05)",  /* zinc-700/5 */
        filter: "blur(110px)",
        pointerEvents: "none",
      }} />

      {/* ── 2. Dot grid (from BackgroundLayer) ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.15,
        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      {/* ── 3. Noise texture overlay (from BackgroundLayer) ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.05,
        backgroundImage: "url('https://www.ui-layouts.com/noise.gif')",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* ── 4. GIF with bottom-edge blur blend ── */}
      <div style={{ position: "relative", display: "inline-block", zIndex: 2 }}>

        <img
          src="/luffygear5.gif"
          alt="Loading…"
          style={{
            width: "220px",
            height: "auto",
            display: "block",
            imageRendering: "crisp-edges",
          }}
        />

        {/* bottom edge blur + gradient fade into background */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(63,63,70,0.05) 55%, #000 100%)",

          maskImage: "linear-gradient(to bottom, transparent 0%, black 45%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 45%)",
          pointerEvents: "none",
        }} />
      </div>

    </div>
  );
}
