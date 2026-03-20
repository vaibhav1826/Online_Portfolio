import { useEffect } from 'react'
import ProjectsShowcase from '../Sections/ProjectsShowcase'

const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <main className="relative z-10 mx-auto w-full overflow-hidden flex max-w-7xl flex-col gap-12 sm:gap-16 px-4 sm:px-6 pt-24 pb-12 sm:py-32 lg:px-8 min-h-[80vh]">
            <div className="mb-8">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
                    My <span className="text-forest-600 dark:text-forest-400 transition-colors">Projects</span>
                </h1>
                <p className="text-xl text-forest-800/80 dark:text-gray-300 max-w-3xl leading-relaxed transition-colors">
                    A comprehensive collection of my professional and personal work, showcasing full-stack development,
                    software architecture, and real-world problem solving.
                </p>
            </div>

            <ProjectsShowcase id="projects-gallery" />
        </main>
    )
}

export default ProjectsPage
