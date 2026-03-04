import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'
import ImageCarousel from '../UI/ImageCarousel'
import { projectShowcase } from '../../utils/chartData'

type ProjectsShowcaseProps = {
  id: string
}

const ProjectsShowcase = ({ id }: ProjectsShowcaseProps) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <section id={id} className="flex flex-col gap-10">
      <SectionTitle
        eyebrow="featured work"
        title="Projects &amp; Applications"
        subtitle="A curated set of full-stack applications — from intelligent data tools to real-time platforms — each built with production quality in mind."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectShowcase.map((project, index) => (
          <motion.div
            key={project.name}
            whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(22,101,52,0.12)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="rounded-3xl"
          >
            <AnimatedCard
              delay={index * 0.08}
              className="group relative overflow-hidden space-y-4 cursor-pointer flex flex-col justify-between h-full"
              onClick={() => setSelectedProject(selectedProject === index ? null : index)}
            >
              {/* Project image */}
              <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-forest-100 border border-forest-200">
                <ImageCarousel images={project.images} altText={project.name} />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
              </div>

              <div className="space-y-3 flex-grow flex flex-col">
                <h3 className="font-display text-xl text-slate-900 font-bold">{project.name}</h3>
                <p className="text-sm text-forest-800/90 line-clamp-3 mb-2">{project.description}</p>

                {/* Top 3 tech badges */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.slice(0, 3).map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 + i * 0.05 }}
                      className="rounded-full bg-forest-50 px-3 py-1 text-xs text-forest-700 border border-forest-200 font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="rounded-full bg-forest-50 px-3 py-1 text-xs text-forest-700 border border-forest-200 font-medium">
                      +{project.stack.length - 3} more
                    </span>
                  )}
                </div>

                {/* Expandable: Key highlight + remaining stack */}
                <motion.div
                  initial={false}
                  animate={{ height: selectedProject === index ? 'auto' : 0, opacity: selectedProject === index ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-3 border-t border-forest-100">
                    {/* Key highlight */}
                    <div className="flex items-start gap-2 rounded-xl bg-forest-50 border border-forest-200 px-3 py-2">
                      <FaStar className="text-forest-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-forest-700 leading-snug">{project.metric}</p>
                    </div>

                    {/* Remaining tech stack chips */}
                    {project.stack.length > 3 && (
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-white px-3 py-1 text-xs text-forest-700 border border-forest-200 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* CTA buttons */}
                <div className="flex gap-3 pt-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 rounded-lg bg-forest-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition hover:bg-forest-500"
                    >
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 rounded-lg border border-forest-300 px-4 py-2 text-center text-sm font-medium text-forest-700 transition hover:bg-forest-50 hover:border-forest-400"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ProjectsShowcase