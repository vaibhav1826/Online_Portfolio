import { useEffect } from 'react'
import ProjectsShowcase from '../Sections/ProjectsShowcase'

const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 py-32 sm:px-8 min-h-[80vh]">
            <div className="mb-8">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                    My <span className="text-forest-600">Projects</span>
                </h1>
                <p className="text-xl text-forest-800/80 max-w-3xl leading-relaxed">
                    A comprehensive collection of my professional and personal work, showcasing full-stack development,
                    software architecture, and real-world problem solving.
                </p>
            </div>

            <ProjectsShowcase id="projects-gallery" />
        </main>
    )
}

export default ProjectsPage
