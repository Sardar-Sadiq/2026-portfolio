import React from "react";
import { User } from "lucide-react";
import RevealSection from "../components/RevealSection";
import SVGDraw from "../components/SVGDraw";
import TextGenerateEffect from "../components/TextGenerateEffect";
import TagsInputShowcase from "../components/TagsInputShowcase";
import profileImage from "../assets/ProfileImage.png";
import sticker from "../assets/sticker.png";

const About = ({ bio, skills }) => {
    return (
        <RevealSection id="about" className="relative py-40 px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[1fr_1.8fr] gap-20 items-start">
                <div className="relative">
                    <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-6 flex items-center gap-3">
                        <User size={14} className="text-zinc-300" /> 01. Identification
                    </h2>
                    <h3 className="text-7xl font-handwriting text-white leading-tight tracking-tight relative inline-block mb-12">
                        About Me
                    </h3>

                    {/* Profile Polaroid Image */}
                    <div className="relative w-full max-w-[300px] md:mt-10">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                </div>

                <div className="relative">
                    <div className="mb-20">
                        <TextGenerateEffect text={bio} />
                    </div>
                    <h4 className="text-white font-handwriting text-4xl mb-8 opacity-80">
                        Tech Stack Showcase
                    </h4>

                    <div className="relative">
                        <TagsInputShowcase tags={skills} />

                        {/* Red Sticker at Bottom Right */}
                        <div className="absolute -right-4 -bottom-10 z-20 w-48 md:w-56 pointer-events-none select-none">
                            <img
                                src={sticker}
                                alt="Sticker"
                                className="w-full h-auto drop-shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </RevealSection>
    );
};

export default About;
