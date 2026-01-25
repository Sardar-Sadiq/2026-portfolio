import React, { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  ExternalLink,
  Code2,
  Briefcase,
  User,
  Layers,
  Home,
  Mail,
  Check,
} from "lucide-react";

/* =============================================================================
  1. SMOOTH SCROLL ENGINE (LENIS CDN WRAPPER)
  =============================================================================
*/

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

/* =============================================================================
  2. ANIMATION UTILITIES
  =============================================================================
*/

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

/* =============================================================================
  3. UI-LAYOUTS COMPONENTS (RECREATED)
  =============================================================================
*/

/**
 * UI-LAYOUTS: Background Snippets (Asymmetric Glow + Dot Grid)
 */
const BackgroundLayer = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black font-poppins">
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-800/10 rounded-full blur-[120px]" />
    <div className="absolute top-[20%] right-[-15%] w-[60vw] h-[60vw] bg-blue-950/5 rounded-full blur-[140px]" />
    <div className="absolute bottom-[-10%] left-[5%] w-[45vw] h-[45vw] bg-zinc-700/5 rounded-full blur-[110px]" />
    <div
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  </div>
);

/**
 * UI-LAYOUTS: SVG Line Draw Component
 */
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

/**
 * UI-LAYOUTS: Image Reveal Card for Projects
 */
const ImageRevealCard = ({ project, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group relative py-12 md:py-20 w-full border-b border-white/5 flex flex-col justify-center px-8 md:px-12 cursor-pointer overflow-hidden transition-colors hover:bg-white/[0.02]"
    >
      <div className="relative z-10 flex items-baseline gap-6 pointer-events-none">
        <span className="font-mono text-zinc-700 text-sm">0{index + 1}</span>
        <h3 className="text-5xl md:text-8xl font-handwriting text-white tracking-tight transition-all duration-500">
          {project.title}
        </h3>
      </div>
      <div className="relative z-10 mt-4 ml-12 md:ml-20 flex flex-wrap gap-4 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500 font-poppins">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-[0.25em] font-medium text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <div
        className="absolute pointer-events-none z-20 w-64 h-80 rounded-2xl overflow-hidden opacity-0 scale-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0.5}) rotate(${isHovering ? (mousePos.x % 10) - 5 : 0}deg)`,
          opacity: isHovering ? 1 : 0,
        }}
      >
        <img
          src={`https://images.unsplash.com/photo-${project.imgId}?auto=format&fit=crop&q=80&w=800`}
          alt={project.title}
          className="w-full h-full object-cover scale-110"
        />
      </div>
    </div>
  );
};

/**
 * UI-LAYOUTS: Magnified Dock Component
 */
const MagnifiedDock = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const items = [
    { icon: <Home size={22} />, label: "Home", href: "#home" },
    { icon: <User size={22} />, label: "About", href: "#about" },
    { icon: <Briefcase size={22} />, label: "Work", href: "#work" },
    { icon: <Layers size={22} />, label: "Projects", href: "#projects" },
    {
      icon: <Github size={22} />,
      label: "GitHub",
      href: "https://github.com/sardarsadiq",
    },
    {
      icon: <Linkedin size={22} />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/sardarsadiq",
    },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none">
      <div
        className="flex items-end gap-2 px-4 py-3 bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-full pointer-events-auto shadow-2xl transition-all duration-500 hover:gap-4"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {items.map((item, i) => {
          const isHovered = hoveredIndex === i;
          const isNeighbor =
            hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1;
          return (
            <a
              key={i}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(i)}
              className="relative flex flex-col items-center justify-center transition-all duration-300 ease-out"
              style={{
                transform: `scale(${isHovered ? 1.5 : isNeighbor ? 1.2 : 1}) translateY(${isHovered ? -12 : isNeighbor ? -4 : 0}px)`,
                width: "40px",
                height: "40px",
              }}
            >
              <span
                className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] px-2 py-1 rounded-md font-bold tracking-widest transition-opacity duration-200 uppercase pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"} font-poppins`}
              >
                {item.label}
              </span>
              <div
                className={`transition-colors duration-300 ${isHovered ? "text-white" : "text-zinc-500"}`}
              >
                {item.icon}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

/**
 * UI-LAYOUTS: Tags Input (Showcase Mode)
 */
const TagsInputShowcase = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2 p-6 bg-zinc-950/30 border border-white/5 rounded-3xl backdrop-blur-sm">
      {tags.map((tag) => (
        <div
          key={tag}
          className="group flex items-center gap-2 px-5 py-2.5 bg-zinc-900/50 border border-white/5 rounded-xl text-[11px] text-zinc-400 hover:text-white transition-all uppercase tracking-widest pointer-events-none font-poppins"
        >
          <Check
            size={10}
            className="text-zinc-600 group-hover:text-white transition-colors"
          />
          {tag}
        </div>
      ))}
    </div>
  );
};

/* =============================================================================
  4. ACETERNITY UI COMPONENTS (RECREATED)
  =============================================================================
*/

/**
 * ACETERNITY UI: Text Generate Effect
 * Blurs text into focus as it enters viewport.
 */
const TextGenerateEffect = ({ text }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });
  return (
    <div ref={ref} className="flex flex-wrap gap-x-2">
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block text-zinc-400 font-poppins text-xl md:text-2xl leading-relaxed transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? "blur(0px)" : "blur(10px)",
            transform: isVisible ? "translateY(0)" : "translateY(10px)",
            transitionDelay: `${i * 30}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

/**
 * ACETERNITY UI: Text Hover Effect (Signature Overlay)
 */
const TextHoverEffect = ({ text, active }) => {
  return (
    <div className="relative group inline-block cursor-default">
      <div className="text-7xl md:text-[12rem] font-handwriting text-white/5 group-hover:text-white transition-all duration-1000 block tracking-tighter leading-none relative z-10">
        {text}
      </div>
      {/* Hand-drawn Signature stroke sitting at the BOTTOM */}
      <svg
        viewBox="0 0 600 120"
        className={`absolute bottom-[-180px] left-[90%] -translate-x-1/2 w-[110%] pointer-events-none overflow-visible text-white`}
        fill="none"
      >
        <path
          d="M222.462 12.8345C177.074 10.0328 132.077 4.80881 86.6062 3.64623C60.4691 2.97796 -17.6945 1.02174 8.17755 4.79475C50.7028 10.9964 94.6534 10.7971 137.47 14.9675C154.059 16.5834 170.516 18.7493 187.021 21.0384C193.373 21.9193 198.334 23.4078 188.17 22.8432C142.806 20.323 97.6784 14.7225 52.3141 12.0141C47.4732 11.7251 33.1304 11.5843 37.7934 12.9165C54.8856 17.8 73.2224 19.7239 90.7081 22.433C111.764 25.6952 133.161 27.7326 154.042 32.0315C161.542 33.5757 171.588 34.0575 178.571 37.1999C190.929 42.7607 151.511 39.3406 137.962 39.0868C115.414 38.6643 92.8916 37.3627 70.3626 36.4616"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="square"
          animationDuration={2}
          animationDelay={0}
          animationBounce={0.3}
          reverseAnimation={false}
          enableHoverAnimation={true}
          hoverAnimationType="redraw"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: active ? 0 : 2000,
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: active ? 0.9 : 0,
          }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
};

/* =============================================================================
  5. PAGE SECTIONS & MAIN APPLICATION
  =============================================================================
*/

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

export default function App() {
  const [footerHovered, setFooterHovered] = useState(false);

  const resumeData = {
    name: "Sardar Sadiq",
    bio: "I am a Computer Science Engineer specializing in AI, with a proven track record of reducing page load times by 20% through code splitting and architecture optimization. I bridge frontend expertise with serverless architectures and AI-driven integrations.",
    skills: [
      "React.js",
      "Next.js",
      "GSAP",
      "Tailwind CSS",
      "Node.js",
      "SQL",
      "MongoDB",
      "Puter.js",
      "Figma",
      "UI/UX Design",
      "Java",
      "Python",
      "Three.js",
      "Framer Motion",
    ],
    experience: [
      {
        company: "Zummit Info Labs",
        role: "Web Developer Intern",
        period: "Jun — Nov 2024",
      },
      {
        company: "Techplement",
        role: "Web Developer Intern",
        period: "Apr — May 2024",
      },
    ],
    projects: [
      {
        title: "AI Resume Analyzer",
        tags: ["React", "Puter.js", "AI"],
        imgId: "1586717791222-2bb281405a41",
      },
      {
        title: "Online Exam Portal",
        tags: ["Node.js", "SQL", "React"],
        imgId: "1454165851113-557228a16d27",
      },
      {
        title: "AI Image Enhancer",
        tags: ["API", "React", "GSAP"],
        imgId: "1550751827-4bd374c3f58b",
      },
    ],
  };

  return (
    <SmoothScrollWrapper>
      <div className="bg-black text-zinc-300 min-h-screen selection:bg-white selection:text-black font-poppins overflow-x-hidden relative">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Poppins:wght@100;200;300;400;500;600&display=swap');
          :root { --font-handwriting: 'Caveat', cursive; --font-poppins: 'Poppins', sans-serif; }
          .font-handwriting { font-family: var(--font-handwriting) !important; }
          .font-poppins { font-family: var(--font-poppins) !important; }
          ::-webkit-scrollbar { width: 0px; }
          html { scrollbar-width: none; }
        `,
          }}
        />

        {/* Global UI-LAYOUTS Background Layer */}
        <BackgroundLayer />

        {/* HERO SECTION */}
        <RevealSection
          id="home"
          className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden"
        >
          <div className="relative z-10 text-center flex flex-col items-center max-w-7xl">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                Portfolio © 2024
              </span>
            </div>

            <div className="relative group cursor-default mb-10">
              <h1 className="text-8xl md:text-[14.5rem] font-handwriting text-white mb-6 tracking-tight leading-[0.7] relative z-10">
                {resumeData.name}
              </h1>
              {/* UI-LAYOUTS SVG Line Sitting at the bottom */}
              <svg
                viewBox="0 0 600 120"
                className="absolute bottom-[-110px] left-[-5%] w-[110%] pointer-events-none overflow-visible text-white"
                fill="none"
              >
                <path
                  d="M7,50 Q100,70 500, 45 T480,60"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ strokeDasharray: 2000 }}
                />
              </svg>
            </div>

            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mt-16 text-center opacity-80">
              Crafting{" "}
              <span className="text-zinc-300 font-medium tracking-wide">
                high-performance
              </span>{" "}
              digital experiences through{" "}
              <span className="text-zinc-300 font-medium">
                scalable architectures
              </span>
              .
            </p>
          </div>
        </RevealSection>

        {/* ABOUT SECTION - ACETERNITY UI Text Generate used here */}
        <RevealSection
          id="about"
          className="relative py-40 px-6 max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-[1fr_1.8fr] gap-20 items-start">
            <div className="relative">
              <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-6 flex items-center gap-3">
                <User size={14} className="text-zinc-300" /> 01. Identification
              </h2>
              <h3 className="text-7xl font-handwriting text-white leading-tight tracking-tight relative inline-block">
                About <br /> Me
                <SVGDraw
                  width="200"
                  height="200"
                  className="top-[-10px] left-[-20px] w-[140px] h-[140px] text-white opacity-40"
                  path="M100,20 C150,20 180,70 180,100 C180,130 150,180 100,180 C50,180 20,130 20,100 C20,70 50,20 100,20"
                  active={true}
                />
              </h3>
            </div>
            <div>
              <div className="mb-20">
                <TextGenerateEffect text={resumeData.bio} />
              </div>
              <h4 className="text-white font-handwriting text-4xl mb-8 opacity-80">
                Tech Stack Showcase
              </h4>
              {/* UI-LAYOUTS Tags Showcase */}
              <TagsInputShowcase tags={resumeData.skills} />
            </div>
          </div>
        </RevealSection>

        {/* WORK SECTION */}
        <RevealSection
          id="work"
          className="relative py-40 px-6 max-w-6xl mx-auto font-poppins"
        >
          <div className="bg-zinc-950/30 border border-white/5 rounded-[3rem] p-10 md:p-24 relative overflow-hidden backdrop-blur-md">
            <SVGDraw
              width="100"
              height="100"
              className="top-6 right-6 w-32 h-32 opacity-20 text-white"
              path="M10,10 L90,10 L90,90 M20,20 L80,20 L80,80"
              active={true}
            />
            <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-16 flex items-center gap-3">
              <Briefcase size={14} className="text-zinc-300" /> 02. Narrative
            </h2>
            <div className="space-y-32 relative z-10">
              {resumeData.experience.map((exp, i) => (
                <div
                  key={i}
                  className={`relative ${i !== 0 ? "pt-32 border-t border-white/5" : ""}`}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8">
                    <h3 className="text-5xl md:text-6xl font-handwriting text-white tracking-tight">
                      {exp.company}
                    </h3>
                    <span className="text-zinc-600 font-mono text-sm tracking-tighter uppercase">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-lg leading-relaxed font-light italic">
                    Built high-performance UIs and optimized complex dashboard
                    architectures with focus on code quality.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* PROJECTS SECTION - UI-LAYOUTS Image Reveal used here */}
        <RevealSection
          id="projects"
          className="relative py-24 border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 mb-20 relative">
            <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-6 flex items-center gap-3 font-poppins">
              <Layers size={14} className="text-zinc-300" /> 03. Portfolio
            </h2>
            <h3 className="text-7xl md:text-9xl font-handwriting text-white tracking-tighter">
              Case Studies
            </h3>
          </div>
          <div className="flex flex-col border-t border-white/5">
            {resumeData.projects.map((project, i) => (
              <ImageRevealCard key={i} project={project} index={i} />
            ))}
          </div>
        </RevealSection>

        {/* FOOTER SECTION - ACETERNITY UI Text Hover used here */}
        <footer className="relative pt-60 pb-32 px-6 text-center overflow-hidden border-t border-white/5">
          <h2 className="text-xs uppercase tracking-[0.5em] text-zinc-600 mb-16 font-medium italic underline underline-offset-8 decoration-zinc-800 font-poppins">
            Collaboration & Inquiries
          </h2>
          <div
            onMouseEnter={() => setFooterHovered(true)}
            onMouseLeave={() => setFooterHovered(false)}
          >
            <TextHoverEffect text="@Sardar-Sadiq" active={footerHovered} />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 tracking-[0.4em] gap-8 max-w-6xl mx-auto border-t border-white/5 pt-12 font-poppins mt-20">
            <p>© 2024 SARDAR SADIQ ALI BASHA • ALL RIGHTS RESERVED</p>
          </div>
        </footer>

        {/* UI-LAYOUTS Magnified Dock */}
        <MagnifiedDock />
      </div>
    </SmoothScrollWrapper>
  );
}

// path="M7,50 Q100,70 500, 45 T480,60"
