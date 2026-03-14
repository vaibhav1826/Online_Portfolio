import { motion } from 'framer-motion'

type SkillsShowcaseProps = {
  id: string
}

const skillsData = [
  {
    category: 'Frontend',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
    level: 90,
    color: 'rgba(34, 197, 94, 0.8)', // green-500
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'PHP', 'RESTful APIs'],
    level: 85,
    color: 'rgba(16, 185, 129, 0.8)', // emerald-500
  },
  {
    category: 'Database',
    skills: ['MongoDB', 'MySQL', 'Database Design'],
    level: 80,
    color: 'rgba(20, 184, 166, 0.8)', // teal-500
  },
  {
    category: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'C++', 'Java', 'Python', 'C'],
    level: 88,
    color: 'rgba(74, 222, 128, 0.8)', // green-400
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'VS Code', 'Postman', 'Chart.js', 'Bootstrap'],
    level: 82,
    color: 'rgba(52, 211, 153, 0.8)', // emerald-400
  },
]

const SkillsShowcase = ({ id }: SkillsShowcaseProps) => {

  return (
    <section id={id} className="py-12 sm:py-20 bg-forest-50/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Technical <span className="text-forest-600">Proficiency</span>
          </h2>
          <p className="text-forest-800/80 text-lg max-w-2xl mx-auto">
            Statistical overview of my technical skills and expertise across different domains
          </p>
        </motion.div>

        {/* Skills Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-forest-100 hover:border-forest-300 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">{category.category}</h3>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-sm"
                  style={{ backgroundColor: category.color }}
                >
                  {category.level}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-forest-100 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${category.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-forest-50 border border-forest-100 text-forest-800 rounded-full text-sm hover:bg-forest-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-forest-50/50 backdrop-blur-sm rounded-xl p-6 border border-forest-200 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-forest-600 mb-2">
              {Math.round(skillsData.reduce((acc, cat) => acc + cat.level, 0) / skillsData.length)}%
            </div>
            <div className="text-forest-800/80 text-sm font-medium">Average Proficiency</div>
          </div>
          <div className="bg-emerald-50/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-200 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-emerald-600 mb-2">{skillsData.length}</div>
            <div className="text-forest-800/80 text-sm font-medium">Skill Categories</div>
          </div>
          <div className="bg-teal-50/50 backdrop-blur-sm rounded-xl p-6 border border-teal-200 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-teal-600 mb-2">
              {skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)}
            </div>
            <div className="text-forest-800/80 text-sm font-medium">Total Technologies</div>
          </div>
          <div className="bg-green-50/50 backdrop-blur-sm rounded-xl p-6 border border-green-200 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {Math.max(...skillsData.map((cat) => cat.level))}%
            </div>
            <div className="text-forest-800/80 text-sm font-medium">Highest Proficiency</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsShowcase