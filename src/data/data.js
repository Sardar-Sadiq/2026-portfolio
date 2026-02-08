import pro1 from "../assets/pro1.png";
import pro3 from "../assets/pro3.png";
import pro2 from "../assets/pro2.png";

export const resumeData = {
    name: "Sardar Sadiq",
    bio: "I’m  Sardar Sadiq, a frontend-focused developer building performant web interfaces with React and Next.js. I enjoy solving UI and performance problems and exploring AI-powered, serverless web applications.",
    skills: [
        "React.js",
        "Next.js",
        "JS/TS",
        "Tailwind CSS",
        "Node.js",
        "Motion",
        "MongoDB",
        "Figma",
        "UI Design",
        "SQL",
        "Python",
        "Three.js",
        "GSAP",
    ],
    experience: [
        {
            company: "Zummit Info Labs",
            role: "Web Developer Intern",
            period: "Jun — Oct 2024",
            achievements: [
                "Reduced layout shifts by 40% using CSS Containment and modern layout techniques.",
                "Optimized build pipeline reducing bundle size by 150KB.",
                "Integrated AI-driven content suggestions using DeepSeek API.",
                "Implemented responsive design for complex dashboard metrics."
            ]
        },
        {
            company: "Techplement",
            role: "Web Developer Intern",
            period: "Apr — May 2024",
            achievements: [
                "Developed interactive data visualization components using Recharts.",
                "Collaborated with UI/UX team to implement pixel-perfect Figma designs.",
                "Authored 10+ reusable UI components for the company's internal design system.",
                "Enhanced accessibility (A11y) across the main platform, achieving 95+ Lighthouse score."
            ]
        },
    ],
    projects: [
        {
            title: "AI Resume Analyzer",
            tags: ["React", "Tailwind CSS", "API", "Puter.js", "AI"],
            imgId: pro1,
            link: "https://ai-resume-analyzer-nine-pearl.vercel.app/",
        },
        {
            title: "Gifity AI",
            tags: ["React", "Tailwind CSS", "GSAP", "AI"],
            imgId: pro2,
            link: "https://giftify-ai.vercel.app/",
        },
        {
            title: "AI Image Enhancer",
            tags: ["React", "Tailwind CSS", "API", "AI"],
            imgId: pro3,
            link: "https://image-enhancer-bice.vercel.app/",
        },
    ],
    email: "sardarsadiq001@gmail.com",
};
