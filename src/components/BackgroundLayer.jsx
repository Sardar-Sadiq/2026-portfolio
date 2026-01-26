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
        <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 opacity-[0.05]"
            style={{
                backgroundImage: "url('https://www.ui-layouts.com/noise.gif')",
            }}
        />
    </div>
);

export default BackgroundLayer;
