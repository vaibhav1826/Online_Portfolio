const LightBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 bg-white dark:bg-slate-950 overflow-hidden">
            {/* Soft, clean atmospheric gradient - no animations to prevent overlap issues */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 dark:from-slate-950/90 via-slate-50/80 dark:via-slate-900/80 to-white/90 dark:to-slate-950/90" />
            
            {/* Subtle glow in the background to add depth without movement */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-200/40 dark:bg-forest-900/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/40 dark:bg-emerald-900/10 blur-[100px] rounded-full" />
            
            {/* Vignette to keep focus on content */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>
    )
}

export default LightBackground
