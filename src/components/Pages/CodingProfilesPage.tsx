import { useEffect } from 'react'
import { motion } from 'framer-motion'
import GitHubActivity from '../Sections/GitHubActivity'
import LeetCodeActivity from '../Sections/LeetCodeActivity'

const CodingProfilesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 pt-24 sm:pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs sm:text-sm font-bold text-forest-600 dark:text-forest-400 uppercase tracking-[0.4em] inline-block py-1 pr-[-0.4em] transition-colors">
              Performance Metrics
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white leading-tight transition-colors">
              Coding <span className="bg-gradient-to-r from-forest-500 via-emerald-500 to-forest-600 dark:from-forest-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">Profiles</span>
            </h1>
            <div className="h-1.5 w-24 bg-gradient-to-r from-forest-500 to-emerald-500 rounded-full mt-2" />
            <p className="text-slate-600 dark:text-gray-300 max-w-2xl text-base sm:text-lg mt-4 font-medium transition-colors">
              Real-time data fetched live from platform APIs. Tracking my consistency, 
              problem-solving growth, and open-source contributions.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-12 sm:gap-20">
          <LeetCodeActivity />
          <GitHubActivity id="github-profiles" />
        </div>
      </main>
    </div>
  )
}

export default CodingProfilesPage
