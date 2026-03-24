import { useEffect } from 'react'
import { motion } from 'framer-motion'
import GitHubActivity from '../Sections/GitHubActivity'
import LeetCodeActivity from '../Sections/LeetCodeActivity'

const CodingProfilesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Decorative Orbs specific to this module */}
      <div className="absolute top-32 left-[10%] w-[30rem] h-[30rem] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-64 right-[10%] w-[25rem] h-[25rem] bg-forest-600/10 dark:bg-forest-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 pt-24 sm:pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="px-4 py-1.5 rounded-full border border-forest-200/50 dark:border-forest-500/20 bg-forest-50/50 dark:bg-forest-500/10 text-xs sm:text-sm font-bold text-forest-700 dark:text-forest-400 uppercase tracking-[0.3em] backdrop-blur-md shadow-sm"
            >
              Performance Metrics
            </motion.span>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight transition-colors mt-2">
              Coding{' '}
              <span className="bg-gradient-to-r from-forest-500 via-emerald-500 to-teal-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                Profiles
              </span>
            </h1>
            
            <div className="h-1.5 w-24 bg-gradient-to-r from-forest-500 to-emerald-500 rounded-full mt-4 shadow-lg shadow-forest-500/30" />
            
            <p className="text-slate-600 dark:text-gray-300 max-w-2xl text-base sm:text-xl mt-6 font-medium transition-colors leading-relaxed">
              Real-time data fetched live from platform APIs. Tracking my consistency, 
              problem-solving growth, and open-source contributions.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-16 sm:gap-24 relative z-20">
          <LeetCodeActivity />
          <GitHubActivity id="github-profiles" />
        </div>
      </main>
    </div>
  )
}

export default CodingProfilesPage
