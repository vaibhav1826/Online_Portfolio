import { motion } from 'framer-motion'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'
import { projectShowcase } from '../../utils/chartData'

type ProjectsShowcaseProps = {
  id: string
}

const ProjectsShowcase = ({ id }: ProjectsShowcaseProps) => {
  return (
    <section id={id} className="flex flex-col gap-10">
      <SectionTitle
        eyebrow="project bloom"
        title="Selected works that made an impact"
        subtitle="Each project is a living organism—supported by thoughtful design, sustainable code, and measurable outcomes."
      />

      <div className="grid gap-8 md:grid-cols-2">
        {projectShowcase.map((project, index) => (
          <AnimatedCard key={project.name} delay={index * 0.05} className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl">{project.name}</h3>
              <motion.span
                role="img"
                aria-label="leaf bloom"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                🌱
              </motion.span>
            </div>
            <p className="text-sm text-charcoal/70">{project.description}</p>
            <ul className="flex flex-wrap gap-2 text-sm text-charcoal/70">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-white/40 px-4 py-1 text-xs uppercase tracking-[0.25em]"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium text-charcoal">
              Impact: <span className="text-sage">{project.metric}</span>
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-sage">
              <a
                className="underline decoration-dotted underline-offset-4 transition hover:text-charcoal"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
              >
                Live demo →
              </a>
              <a
                className="underline decoration-dotted underline-offset-4 transition hover:text-charcoal"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub repo →
              </a>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  )
}

export default ProjectsShowcase

