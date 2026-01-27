import React from "react";
import SmoothScrollWrapper from "./components/SmoothScrollWrapper";
import BackgroundLayer from "./components/BackgroundLayer";
import MagnifiedDock from "./components/MagnifiedDock";

// Sections
import Hero from "./sections/Hero";
import About from "./sections/About";
import Work from "./sections/Work";
import Projects from "./sections/Projects";
import Footer from "./sections/Footer";

// Data
import { resumeData } from "./data/data";

export default function App() {
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

        {/* Sections */}
        <Hero name={resumeData.name} />
        <About bio={resumeData.bio} skills={resumeData.skills} />
        <Work experience={resumeData.experience} />
        <Projects projects={resumeData.projects} />
        <Footer name={resumeData.name} email={resumeData.email} />

        {/* UI-LAYOUTS Magnified Dock */}
        <MagnifiedDock />
      </div>
    </SmoothScrollWrapper>
  );
}
