const LightBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 bg-forest-50 overflow-hidden">
            {/* Soft, clean atmospheric gradient - no animations to prevent overlap issues */}
            <div className="absolute inset-0 bg-gradient-to-br from-forest-50/90 via-[#f3f6f0]/80 to-[#e1ead6]/90" />
            
            {/* Subtle glow in the background to add depth without movement */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-forest-200/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/30 blur-[100px] rounded-full" />
            
            {/* Vignette to keep focus on content */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(255,255,255,0.4)_100%)]" />
        </div>
    )
}

export default LightBackground
