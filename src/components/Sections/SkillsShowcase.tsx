import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Radar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

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
  const [activeView, setActiveView] = useState<'radar' | 'bar' | 'doughnut'>('radar')

  // Radar Chart Data
  const radarData = {
    labels: skillsData.map((cat) => cat.category),
    datasets: [
      {
        label: 'Proficiency Level',
        data: skillsData.map((cat) => cat.level),
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  }

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: '#e5e7eb',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        ticks: {
          color: '#9ca3af',
          backdropColor: 'transparent',
          stepSize: 20,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f3f4f6',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
  }

  // Bar Chart Data
  const barData = {
    labels: skillsData.map((cat) => cat.category),
    datasets: [
      {
        label: 'Proficiency Level (%)',
        data: skillsData.map((cat) => cat.level),
        backgroundColor: skillsData.map((cat) => cat.color),
        borderColor: skillsData.map((cat) => cat.color.replace('0.8', '1')),
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          callback: (value: any) => value + '%',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#e5e7eb',
          font: {
            size: 11,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f3f4f6',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => `Proficiency: ${context.parsed.y}%`,
        },
      },
    },
  }

  // Doughnut Chart Data
  const doughnutData = {
    labels: skillsData.map((cat) => cat.category),
    datasets: [
      {
        data: skillsData.map((cat) => cat.level),
        backgroundColor: skillsData.map((cat) => cat.color),
        borderColor: skillsData.map((cat) => cat.color.replace('0.8', '1')),
        borderWidth: 2,
      },
    ],
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#e5e7eb',
          padding: 15,
          font: {
            size: 12,
            weight: 'bold',
          },
          generateLabels: (chart: any) => {
            const data = chart.data
            return data.labels.map((label: string, i: number) => ({
              text: `${label}: ${data.datasets[0].data[i]}%`,
              fillStyle: data.datasets[0].backgroundColor[i],
              hidden: false,
              index: i,
            }))
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f3f4f6',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => `Proficiency: ${context.parsed}%`,
        },
      },
    },
  }

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

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveView('radar')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeView === 'radar'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Radar Chart
          </button>
          <button
            onClick={() => setActiveView('bar')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeView === 'bar'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setActiveView('doughnut')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeView === 'doughnut'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Doughnut Chart
          </button>
        </motion.div>

        {/* Chart Display */}
        <motion.div
          key={activeView}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700 mb-12"
        >
          <div className="max-w-4xl mx-auto" style={{ height: '500px' }}>
            {activeView === 'radar' && <Radar data={radarData} options={radarOptions} />}
            {activeView === 'bar' && <Bar data={barData} options={barOptions} />}
            {activeView === 'doughnut' && <Doughnut data={doughnutData} options={doughnutOptions} />}
          </div>
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
