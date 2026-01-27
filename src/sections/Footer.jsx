import React, { useState } from "react";
import TextHoverEffect from "../components/TextHoverEffect";

const Footer = ({ name, email }) => {
    const [footerHovered, setFooterHovered] = useState(false);

    return (
        <footer className="relative pt-60 pb-32 px-6 text-center overflow-hidden">
            <h2 className="text-xs uppercase tracking-[0.5em] text-zinc-600 mb-16 font-medium italic underline underline-offset-8 decoration-zinc-800 font-poppins">
                Collaboration & Inquiries
            </h2>
            <div
                className="flex justify-center"
                onMouseEnter={() => setFooterHovered(true)}
                onMouseLeave={() => setFooterHovered(false)}
            >
                <a href={`mailto:${email}`} className="block">
                    <TextHoverEffect text={`${name.replace(/\s+/g, "-")}`} active={footerHovered} />
                </a>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 tracking-[0.4em] gap-8 max-w-6xl mx-auto border-t border-white/5 pt-12 font-poppins mt-20">
                <p>© 2026 {name.toUpperCase()} • ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    );
};

export default Footer;
