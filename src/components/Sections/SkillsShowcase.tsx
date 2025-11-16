import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import '../../utils/chartConfig'

type SkillsShowcaseProps = {
  id: string
}

const skillsData = [
  {
    category: 'Frontend',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
    level: 90,
    color: 'rgba(59, 130, 246, 0.8)',
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'PHP', 'RESTful APIs'],
    level: 85,
    color: 'rgba(16, 185, 129, 0.8)',
  },
  {
    category: 'Database',
    skills: ['MongoDB', 'MySQL', 'Database Design'],
    level: 80,
    color: 'rgba(245, 158, 11, 0.8)',
  },
  {
    category: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'C++', 'Java', 'Python', 'C'],
    level: 88,
    color: 'rgba(139, 92, 246, 0.8)',
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'VS Code', 'Postman', 'Chart.js', 'Bootstrap'],
    level: 82,
    color: 'rgba(236, 72, 153, 0.8)',
  },
]

const SkillsShowcase = ({ id }: SkillsShowcaseProps) => {
  
  return (
    <section id={id} className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-blue-500">Proficiency</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{category.category}</h3>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-lg"
                  style={{ backgroundColor: category.color }}
                >
                  {category.level}%
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
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
                    className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm hover:bg-gray-600/50 transition-colors"
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
          <div className="bg-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {Math.round(skillsData.reduce((acc, cat) => acc + cat.level, 0) / skillsData.length)}%
            </div>
            <div className="text-gray-400 text-sm">Average Proficiency</div>
          </div>
          <div className="bg-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">{skillsData.length}</div>
            <div className="text-gray-400 text-sm">Skill Categories</div>
          </div>
          <div className="bg-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)}
            </div>
            <div className="text-gray-400 text-sm">Total Technologies</div>
          </div>
          <div className="bg-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30 text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">
              {Math.max(...skillsData.map((cat) => cat.level))}%
            </div>
            <div className="text-gray-400 text-sm">Highest Proficiency</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsShowcase
