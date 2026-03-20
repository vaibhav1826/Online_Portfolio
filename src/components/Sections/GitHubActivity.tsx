import { motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import SectionTitle from '../UI/SectionTitle'
import { useTheme } from '../../context/ThemeContext'

const GitHubActivity = ({ id }: { id: string }) => {
  const username = 'vaibhav1826'
  const { theme } = useTheme()

  return (
    <section id={id} className="py-12 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionTitle
            eyebrow="Open Source"
            title="GitHub Activity"
            subtitle="Tracking my contributions, commits, and open-source journey in real-time."
          />
        </motion.div>

        <div className="flex flex-col gap-10">
          {/* Heatmap Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full glass-panel p-6 sm:p-10 rounded-3xl border border-forest-100/50 dark:border-slate-800 bg-white/40 dark:bg-slate-900/60 backdrop-blur-md shadow-xl overflow-hidden transition-colors duration-500"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-forest-500 pl-4 text-center sm:text-left transition-colors">Contribution Heatmap</h3>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-forest-600 dark:text-gray-300 hover:scale-105 transition-transform bg-forest-50 dark:bg-slate-800 px-6 py-2 rounded-xl border border-forest-200 dark:border-slate-700 shadow-sm whitespace-nowrap"
              >
                View GitHub Profile
              </a>
            </div>

            <div className="flex justify-center w-full px-2 overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[850px] lg:min-w-fit scale-90 sm:scale-100 origin-center flex justify-center">
                <GitHubCalendar
                  username={username}
                  blockSize={16}
                  blockMargin={6}
                  fontSize={14}
                  showWeekdayLabels={true}
                  theme={{
                    light: ['#dcfce7', '#86efac', '#4ade80', '#22c55e', '#10b981'],
                    dark: ['#dcfce7', '#86efac', '#4ade80', '#22c55e', '#10b981'],
                  }}
                />
              </div>
            </div>
            <p className="mt-4 text-xs text-forest-800/60 dark:text-gray-400 font-medium italic text-center transition-colors">
              * Annual contribution activity tracked via GitHub API
            </p>
          </motion.div>

          {/* Activity Graph Section (Official Style) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full glass-panel p-2 sm:p-6 rounded-3xl border border-white/20 dark:border-slate-800 bg-white/40 dark:bg-slate-900/60 shadow-glow transition-colors duration-500 flex flex-col"
          >
            <div className="px-6 pt-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 border-l-4 border-forest-500 pl-4 transition-colors">{`Vaibhav Bhatt's Activity Overview`}</h3>
            </div>
            <div className="w-full flex justify-center overflow-hidden rounded-2xl p-2 sm:p-4">
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${theme === 'dark' ? 'github-dark' : 'transparent'}&hide_border=true&area=true&bg_color=${theme === 'dark' ? '0f172a' : 'ffffff00'}`}
                alt="GitHub Activity Graph"
                className="w-full h-auto max-w-5xl hover:scale-[1.01] transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <p className="pb-6 pt-2 text-xs text-slate-500 dark:text-gray-400 font-medium text-center transition-colors">
              Real-time activity analytics generated via GitHub Activity Graph
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GitHubActivity
