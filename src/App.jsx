import React, { useState } from "react";
import { User, Briefcase, Layers } from "lucide-react";

import SmoothScrollWrapper from "./components/SmoothScrollWrapper";
import BackgroundLayer from "./components/BackgroundLayer";
import RevealSection from "./components/RevealSection";
import SVGDraw from "./components/SVGDraw";
import TextGenerateEffect from "./components/TextGenerateEffect";
import TagsInputShowcase from "./components/TagsInputShowcase";
import ImageRevealCard from "./components/ImageRevealCard";
import TextHoverEffect from "./components/TextHoverEffect";
import LiquidGlassCard from "./components/LiquidGlassCard";
import MagnifiedDock from "./components/MagnifiedDock";

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
          verticalShift={false}
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
                className="absolute bottom-[-110px] left-[-5%] w-[120%] pointer-events-none overflow-visible text-white"
                fill="none"
              >
                <path
                  d="M7,50 Q100,70 500,45 T480,60"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 2500,
                    strokeDashoffset: 2500,
                    animation: "draw-line 2.5s ease-in forwards"
                  }}
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
                  className="top-[-10px] left-[150px] w-[140px] h-[140px] text-white opacity-40 animate-spin [animation-duration:5s]"
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
          <LiquidGlassCard
            borderRadius="48px"
            shadowIntensity="2xl"
            blurIntensity="xl"
            className="p-10 md:p-24  "
          >

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
          </LiquidGlassCard>
        </RevealSection>

        {/* PROJECTS SECTION - UI-LAYOUTS Image Reveal used here */}
        <RevealSection
          id="projects"
          className="relative py-24 border-t border-white/5 max-w-6xl mx-auto px-6"
        >
          <div className="mb-20 relative">
            <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-6 flex items-center gap-3 font-poppins">
              <Layers size={14} className="text-zinc-300" /> 03. Portfolio
            </h2>
            <h3 className="text-7xl md:text-9xl font-handwriting text-white tracking-tighter">
              Projects
            </h3>
          </div>
          <LiquidGlassCard
            borderRadius="48px"
            shadowIntensity="2xl"
            blurIntensity="xl"
            className="overflow-hidden"
          >
            <div className="flex flex-col">
              {resumeData.projects.map((project, i) => (
                <ImageRevealCard key={i} project={project} index={i} />
              ))}
            </div>
          </LiquidGlassCard>
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
