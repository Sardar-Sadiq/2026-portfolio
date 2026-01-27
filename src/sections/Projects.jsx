import React from "react";
import { Layers, Plus, Github, ExternalLink } from "lucide-react";
import RevealSection from "../components/RevealSection";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogImage,
    DialogClose,
    DialogDescription,
    DialogContainer,
} from "../components/ui/linear-modal";

const Projects = ({ projects }) => {
    return (
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                    <Dialog
                        key={i}
                        transition={{
                            type: "spring",
                            bounce: 0.05,
                            duration: 0.5,
                        }}
                    >
                        <DialogTrigger
                            style={{
                                borderRadius: "20px",
                            }}
                            className="flex w-full flex-col overflow-hidden border border-white/10 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors group"
                        >
                            <DialogImage
                                src={`https://images.unsplash.com/photo-${project.imgId}?auto=format&fit=crop&q=80&w=800`}
                                alt={project.title}
                                className="h-64 w-full object-cover"
                            />
                            <div className="flex grow flex-row items-center justify-between p-6">
                                <div>
                                    <DialogTitle className="text-white text-2xl font-handwriting">
                                        {project.title}
                                    </DialogTitle>
                                </div>
                                <div className="p-2 bg-white/5 border border-white/10 rounded-lg group-hover:bg-white/10 transition-colors">
                                    <Plus className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContainer
                            className="flex items-center justify-center pb-10"
                            overlayClassName="bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.2)_0%,rgba(0,0,0,1)_100%)]"
                        >
                            <DialogContent
                                style={{
                                    borderRadius: "24px",
                                }}
                                className="relative flex h-fit max-h-[90vh] mx-auto flex-col overflow-y-auto border border-white/10 bg-black lg:w-[600px] w-[90%]"
                            >
                                <DialogImage
                                    src={`https://images.unsplash.com/photo-${project.imgId}?auto=format&fit=crop&q=80&w=1200`}
                                    alt={project.title}
                                    className="h-72 w-full object-cover"
                                />
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <DialogTitle className="text-4xl text-white font-handwriting">
                                            {project.title}
                                        </DialogTitle>
                                        <div className="flex gap-3">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-500 hover:text-white transition-colors"
                                            >
                                                <Github size={20} />
                                            </a>
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-500 hover:text-white transition-colors"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        </div>
                                    </div>

                                    <DialogDescription
                                        disableLayoutAnimation
                                        variants={{
                                            initial: { opacity: 0, scale: 0.8, y: -40 },
                                            animate: { opacity: 1, scale: 1, y: 0 },
                                            exit: { opacity: 0, scale: 0.8, y: -50 },
                                        }}
                                    >
                                        <p className="text-zinc-400 text-base leading-relaxed font-light mb-8">
                                            Exploring the boundaries of digital design with{" "}
                                            <strong>{project.title}</strong>. This project focuses on
                                            integrating seamless user experiences with cutting-edge
                                            technology.
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium bg-zinc-800/50 border border-white/5 text-zinc-400"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </DialogDescription>
                                </div>
                                <DialogClose className="text-white bg-zinc-900/80 backdrop-blur-md border border-white/10 p-2 hover:bg-zinc-800 rounded-lg right-4 top-4 absolute" />
                            </DialogContent>
                        </DialogContainer>
                    </Dialog>
                ))}
            </div>
        </RevealSection>
    );
};

export default Projects;
