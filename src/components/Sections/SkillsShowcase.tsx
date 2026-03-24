import { motion } from 'framer-motion'
import { 
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaPhp, FaPython, FaJava, FaGitAlt, FaDatabase, FaCode
} from 'react-icons/fa'
import { 
  SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiMysql, 
  SiCplusplus, SiC, SiPostman, SiChartdotjs, SiBootstrap
} from 'react-icons/si'

type SkillsShowcaseProps = {
  id: string
}

const skillsData = [
  {
    category: 'Frontend',
    level: 90,
    color: 'rgba(34, 197, 94, 0.8)', // green-500
    skills: [
      { name: 'React.js', icon: FaReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
      { name: 'JavaScript', icon: FaJs },
    ]
  },
  {
    category: 'Backend',
    level: 85,
    color: 'rgba(16, 185, 129, 0.8)', // emerald-500
    skills: [
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'PHP', icon: FaPhp },
      { name: 'RESTful APIs', icon: FaDatabase },
    ]
  },
  {
    category: 'Database',
    level: 80,
    color: 'rgba(20, 184, 166, 0.8)', // teal-500
    skills: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Database Design', icon: FaDatabase },
    ]
  },
  {
    category: 'Languages',
    level: 88,
    color: 'rgba(74, 222, 128, 0.8)', // green-400
    skills: [
      { name: 'JavaScript', icon: FaJs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'C++', icon: SiCplusplus },
      { name: 'Java', icon: FaJava },
      { name: 'Python', icon: FaPython },
      { name: 'C', icon: SiC },
    ]
  },
  {
    category: 'Tools & Platforms',
    level: 82,
    color: 'rgba(52, 211, 153, 0.8)', // emerald-400
    skills: [
      { name: 'Git', icon: FaGitAlt },
      { name: 'VS Code', icon: FaCode },
      { name: 'Postman', icon: SiPostman },
      { name: 'Chart.js', icon: SiChartdotjs },
      { name: 'Bootstrap', icon: SiBootstrap },
    ]
  },
]

const SkillsShowcase = ({ id }: SkillsShowcaseProps) => {

  return (
    <section id={id} className="py-12 sm:py-20 bg-forest-50/50 dark:bg-slate-950/50 transition-colors">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
            Technical <span className="text-forest-600 dark:text-forest-400">Proficiency</span>
          </h2>
          <p className="text-forest-800/80 dark:text-gray-400 text-lg max-w-2xl mx-auto transition-colors">
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
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-forest-100 dark:border-slate-800 hover:border-forest-300 dark:hover:border-slate-600 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">{category.category}</h3>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-sm"
                  style={{ backgroundColor: category.color }}
                >
                  {category.level}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-forest-100 dark:bg-slate-800 rounded-full h-3 mb-4 overflow-hidden shadow-inner transition-colors">
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
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-50 dark:bg-slate-800 border border-forest-100 dark:border-slate-700 text-forest-800 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-forest-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
                  >
                    <skill.icon className="text-forest-600 dark:text-emerald-400 text-[16px]" />
                    {skill.name}
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
          <div className="bg-forest-50/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-forest-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-all">
            <div className="text-4xl font-bold text-forest-600 dark:text-forest-400 mb-2">
              {Math.round(skillsData.reduce((acc, cat) => acc + cat.level, 0) / skillsData.length)}%
            </div>
            <div className="text-forest-800/80 dark:text-gray-400 text-sm font-medium transition-colors">Average Proficiency</div>
          </div>
          <div className="bg-emerald-50/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-all">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{skillsData.length}</div>
            <div className="text-forest-800/80 dark:text-gray-400 text-sm font-medium transition-colors">Skill Categories</div>
          </div>
          <div className="bg-teal-50/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-teal-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-all">
            <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              {skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)}
            </div>
            <div className="text-forest-800/80 dark:text-gray-400 text-sm font-medium transition-colors">Total Technologies</div>
          </div>
          <div className="bg-green-50/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-green-200 dark:border-slate-800 text-center shadow-sm hover:shadow-md transition-all">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {Math.max(...skillsData.map((cat) => cat.level))}%
            </div>
            <div className="text-forest-800/80 dark:text-gray-400 text-sm font-medium transition-colors">Highest Proficiency</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsShowcase