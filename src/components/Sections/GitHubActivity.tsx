import { motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import SectionTitle from '../UI/SectionTitle'
import { useTheme } from '../../context/ThemeContext'
import { FaGithub } from 'react-icons/fa'

const GitHubActivity = ({ id }: { id: string }) => {
  const username = 'vaibhav1826'
  const { theme } = useTheme()

  return (
    <section id={id} className="py-12 sm:py-20 relative overflow-hidden">
      {/* Decorative Orbs specific to GitHub */}
      <div className="absolute bottom-16 right-[5%] w-80 h-80 bg-forest-500/10 dark:bg-forest-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

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

        <div className="flex flex-col gap-10 relative z-10">
          {/* Heatmap Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full glass-panel p-6 sm:p-10 rounded-[2.5rem] border border-white/40 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-500 hover:border-forest-200 dark:hover:border-forest-800/50"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-6">
              <h3 className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent flex items-center gap-3">
                <FaGithub className="text-slate-900 dark:text-white" />
                Contribution Heatmap
              </h3>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden flex items-center gap-2 text-sm font-bold text-white transition-transform transform active:scale-95 bg-slate-900 dark:bg-white dark:text-slate-900 px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg focus:ring-4 focus:ring-forest-500/30 whitespace-nowrap"
              >
                <span className="relative z-10 flex items-center gap-2">Visit GitHub Profile</span>
                <div className="absolute inset-0 bg-gradient-to-r from-forest-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </a>
            </div>

            <div className="flex justify-center w-full px-2 py-4 overflow-x-auto custom-scrollbar bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-black/5 dark:border-white/5 shadow-inner">
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
            
            <div className="w-full flex justify-center pt-6">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-center">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-500"></span>
                </span>
                Annual contribution activity tracked via GitHub API
              </p>
            </div>
          </motion.div>

          {/* Activity Graph Section (Official Style) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full glass-panel p-2 sm:p-6 rounded-[2.5rem] border border-white/40 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-forest-200 dark:hover:border-forest-800/50 flex flex-col"
          >
            <div className="px-6 pt-6 pb-2">
              <h3 className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent flex items-center gap-3">
                Activity Overview
              </h3>
            </div>
            <div className="w-full flex justify-center overflow-hidden rounded-[1.5rem] p-2 sm:p-4 bg-white/30 dark:bg-slate-800/30 border border-black/5 dark:border-white/5 shadow-inner my-2">
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${theme === 'dark' ? 'github-dark' : 'transparent'}&hide_border=true&area=true&bg_color=${theme === 'dark' ? '0f172a' : 'ffffff00'}`}
                alt="GitHub Activity Graph"
                className="w-full h-auto max-w-5xl hover:scale-[1.01] transition-transform duration-700 filter drop-shadow-sm"
                loading="lazy"
              />
            </div>
            <div className="w-full flex justify-center pb-2 pt-4">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide bg-white/50 dark:bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-center">
                Real-time analytics generated via precise GitHub Activity Graph
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GitHubActivity
