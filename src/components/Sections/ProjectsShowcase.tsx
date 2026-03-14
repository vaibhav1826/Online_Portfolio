import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'
import ImageCarousel from '../UI/ImageCarousel'
import { projectShowcase } from '../../utils/chartData'

import { Link } from 'react-router-dom'

type ProjectsShowcaseProps = {
  id: string
  featuredOnly?: boolean
}

const ProjectsShowcase = ({ id, featuredOnly = false }: ProjectsShowcaseProps) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const featuredProjectNames = [
    'Virtu Swift Platform',
    'Smart Payroll & Employee Management',
    'Education Platform — Gamified Learning'
  ]

  const displayedProjects = featuredOnly
    ? projectShowcase.filter((p) => featuredProjectNames.includes(p.name))
    : projectShowcase

  return (
    <section id={id} className="flex flex-col gap-10">
      <SectionTitle
        eyebrow={featuredOnly ? "latest work" : "featured work"}
        title={featuredOnly ? "Featured Projects" : "Projects & Applications"}
        subtitle={featuredOnly 
          ? "A selection of my recent full-stack applications, highlighting complex real-world problem solving." 
          : "A curated set of full-stack applications — from intelligent data tools to real-time platforms — each built with production quality in mind."}
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayedProjects.map((project, index) => (
          <motion.div
            key={project.name}
            whileHover={{ y: featuredOnly ? -4 : -6, boxShadow: '0 20px 40px rgba(22,101,52,0.12)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className={`rounded-3xl ${featuredOnly ? 'max-w-[340px] mx-auto w-full' : ''}`}
          >
            <AnimatedCard
              delay={index * 0.08}
              className={`group relative overflow-hidden space-y-3 cursor-pointer flex flex-col justify-between h-full ${featuredOnly ? 'p-4 sm:p-5' : 'p-6 sm:p-8'}`}
              onClick={() => setSelectedProject(selectedProject === index ? null : index)}
            >
              {/* Project image */}
              <div className={`relative w-full shrink-0 overflow-hidden rounded-xl bg-forest-100 border border-forest-200 ${featuredOnly ? 'h-40' : 'h-48'}`}>
                <ImageCarousel images={project.images} altText={project.name} />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
              </div>

              <div className="space-y-2.5 flex-grow flex flex-col">
                <h3 className={`font-display text-slate-900 font-bold ${featuredOnly ? 'text-lg leading-snug' : 'text-xl'}`}>{project.name}</h3>
                <p className={`text-forest-800/90 line-clamp-2 mb-1 ${featuredOnly ? 'text-xs' : 'text-sm line-clamp-3'}`}>{project.description}</p>

                {/* Top 3 tech badges */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.slice(0, 3).map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 + i * 0.05 }}
                      className={`rounded-full bg-forest-50 border border-forest-200 font-medium ${featuredOnly ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'} text-forest-700`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className={`rounded-full bg-forest-50 border border-forest-200 font-medium ${featuredOnly ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'} text-forest-700`}>
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
                <div className={`flex gap-2 pt-2 ${featuredOnly ? 'mt-1' : ''}`}>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex-1 rounded-lg bg-forest-600 font-medium text-white text-center shadow-sm transition hover:bg-forest-500 ${featuredOnly ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}
                    >
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`flex-1 rounded-lg border border-forest-300 font-medium text-center text-forest-700 transition hover:bg-forest-50 hover:border-forest-400 ${featuredOnly ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        ))}
      </div>

      {featuredOnly && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-4"
        >
          <Link
            to="/projects"
            className="group flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5"
          >
            View All Projects
            <motion.svg 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </Link>
        </motion.div>
      )}
    </section>
  )
}

export default ProjectsShowcase