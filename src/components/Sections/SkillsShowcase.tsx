import { motion } from 'framer-motion'
import { useMemo } from 'react'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'

type SkillsShowcaseProps = {
  id: string
}

const skillsData = [
  {
    category: 'Frontend',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
    level: 90,
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'PHP', 'RESTful APIs'],
    level: 85,
  },
  {
    category: 'Database',
    skills: ['MongoDB', 'MySQL', 'Database Design'],
    level: 80,
  },
  {
    category: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'C++', 'Java', 'Python', 'C'],
    level: 88,
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'VS Code', 'Postman', 'Chart.js', 'Bootstrap'],
    level: 82,
  },
]

const SkillsShowcase = ({ id }: SkillsShowcaseProps) => {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    [],
  )

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 },
      },
    }),
    [],
  )

  return (
    <section id={id} className="flex flex-col gap-10">
      <SectionTitle
        eyebrow="technical expertise"
        title="Skills & Technologies"
        subtitle="A comprehensive overview of my technical proficiencies and the tools I use to build exceptional web applications."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {skillsData.map((category, index) => (
          <motion.div key={category.category} variants={itemVariants}>
            <AnimatedCard delay={index * 0.05} className="space-y-4 h-full">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl text-white">{category.category}</h3>
                <span className="text-sm font-medium text-navy-400">{category.level}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-navy-500 to-navy-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${category.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </AnimatedCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default SkillsShowcase
