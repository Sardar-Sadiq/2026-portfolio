import React, { useEffect, useState } from "react";

/**
 * Preloader — Luffy Gear 5 bounce animation.
 *
 * Sequence:
 *  1. Jump 1 & 2   → GIF plays normally (opacity 1, stationary)
 *  2. 3rd jump     → overlay starts fading out
 *  3. Fade done    → combined slide-up + fade-away kicks in:
 *                    • slides from 0 → -50vh (first half, opacity 1→1)
 *                    • at 50% of slide, smoothly fades to 0 while still rising
 *                    • completely invisible before hitting top
 */

const JUMP_DURATION  = 1300;  // ms per bounce cycle
const HOLD_JUMPS     = 2;     // full visible jumps
const FADE_DURATION  = 600;   // initial fade on 3rd jump (ms)
const EXIT_DURATION  = 900;   // combined slide-up + fade-away (ms)

const FADE_AT  = JUMP_DURATION * HOLD_JUMPS;   // 2600 ms
const EXIT_AT  = FADE_AT  + FADE_DURATION;     // 3200 ms
const DONE_AT  = EXIT_AT  + EXIT_DURATION;     // 4100 ms

/* Keyframe injected once into <head> */
const KEYFRAME_ID = "preloader-exit-kf";
function injectKeyframes() {
  if (document.getElementById(KEYFRAME_ID)) return;
  const style = document.createElement("style");
  style.id = KEYFRAME_ID;
  style.textContent = `
    @keyframes preloader-exit {
      0%   { transform: translateY(0);      opacity: 1;   }
      48%  { transform: translateY(-50vh);  opacity: 0.95; }
      72%  { transform: translateY(-62vh);  opacity: 0.3;  }
      100% { transform: translateY(-72vh);  opacity: 0;    }
    }
  `;
  document.head.appendChild(style);
}

export default function Preloader({ onComplete }) {
  // phases: "show" → "fade" → "exit" → "done"
  const [phase, setPhase] = useState("show");

  useEffect(() => {
    injectKeyframes();
    const t1 = setTimeout(() => setPhase("fade"),  FADE_AT);
    const t2 = setTimeout(() => setPhase("exit"),  EXIT_AT);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, DONE_AT);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (phase === "done") return null;

  /* ── per-phase overlay styles ── */
  const overlayStyle = {
    position:        "fixed",
    inset:           0,
    zIndex:          9999,
    backgroundColor: "#000",
    display:         "flex",
    alignItems:      "center",
    justifyContent:  "center",
    overflow:        "hidden",
  };

  if (phase === "fade") {
    /* fade the whole overlay out smoothly */
    overlayStyle.opacity    = 0;
    overlayStyle.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
  }

  if (phase === "exit") {
    /* keyframe: slide up to -50vh (first half) then fade away while still rising */
    overlayStyle.opacity   = 0; /* keep it at end-opacity so no flash on unmount */
    overlayStyle.animation = `preloader-exit ${EXIT_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`;
  }

  return (
    <div style={overlayStyle}>
      <img
        src="/luffygear5.gif"
        alt="Loading…"
        style={{
          width:          "220px",
          height:         "auto",
          imageRendering: "crisp-edges",
        }}
      />
    </div>
  );
}
