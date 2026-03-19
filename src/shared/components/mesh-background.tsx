export function MeshBackground({ children, className = '' }: { children?: React.ReactNode, className?: string }) {
    return (
        <div className={`relative min-h-screen w-full overflow-hidden flex flex-col ${className}`}>
            {/* Base dark background */}
            <div className="fixed inset-0 bg-[#050505] -z-20" />

            {/* Antigravity Space Effects */}
            <div className="background-fx -z-10">
                <div className="stars-small"></div>
                <div className="stars-medium"></div>
                <div className="stars-large"></div>
                <div className="atmosphere-glow"></div>
                <div className="cosmic-ocean wave-1"></div>
                <div className="cosmic-ocean wave-2"></div>
                <div className="cosmic-ocean wave-3"></div>
            </div>

            {/* Content wrapper */}
            <div className="relative z-10 h-full w-full">
                {children}
            </div>
        </div>
    )
}
