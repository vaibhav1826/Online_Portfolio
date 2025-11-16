import { motion } from 'framer-motion'
import { useState } from 'react'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'
import screenshot1 from '../../../public/Screenshot_1.png'
import screenshot7 from '../../../public/Screenshot_7.png'
import { projectShowcase } from '../../utils/chartData'

type ProjectsShowcaseProps = {
  id: string
}

// Map of project images
const projectImages: Record<number, string> = {
  0: screenshot7,
  1: screenshot1,
}

// Map of project demo links
const projectDemoLinks : Record<number, string> = {
  0: 'https://github.com/vaibhav1826/Crop_Yield_Prediction',
  1: 'https://projectvirtuswift.kesug.com/',
}

const ProjectsShowcase = ({ id }: ProjectsShowcaseProps) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <section id={id} className="flex flex-col gap-10">
      <SectionTitle
        eyebrow="featured work"
        title="Projects & Applications"
        subtitle="A collection of web applications showcasing full-stack development expertise, from concept to deployment."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectShowcase.map((project, index) => (
          <AnimatedCard
            key={project.name}
            delay={index * 0.1}
            className="group relative overflow-hidden space-y-4 cursor-pointer"
            onClick={() => setSelectedProject(selectedProject === index ? null : index)}
          >
            <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-navy-800 to-navy-900">
              <img
                src={projectImages[index] || screenshot1}
                alt={project.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xl text-white">{project.name}</h3>
              <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-navy-900/50 px-3 py-1 text-xs text-navy-300 border border-navy-700"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="rounded-full bg-navy-900/50 px-3 py-1 text-xs text-navy-300 border border-navy-700">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>

              <motion.div
                initial={false}
                animate={{ height: selectedProject === index ? 'auto' : 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-navy-900/50 px-3 py-1 text-xs text-navy-300 border border-navy-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-navy-400">
                    <span className="font-semibold text-white">Impact:</span> {project.metric}
                  </p>
                </div>
              </motion.div>

              <div className="flex gap-3 pt-2">
                <a
                  href={projectDemoLinks[index] || project.demo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 rounded-lg bg-navy-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-navy-500"
                >
                  View Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 rounded-lg border border-navy-600 px-4 py-2 text-center text-sm font-medium text-navy-400 transition hover:bg-navy-900"
                >
                  GitHub
                </a>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  )
}

export default ProjectsShowcase