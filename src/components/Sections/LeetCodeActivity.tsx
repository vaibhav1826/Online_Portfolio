import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExternalLinkAlt, FaFire, FaTrophy, FaGlobe } from 'react-icons/fa'

interface LeetCodeData {
  totalSolved: number
  totalQuestions: number
  easySolved: number
  totalEasy: number
  mediumSolved: number
  totalMedium: number
  hardSolved: number
  totalHard: number
  ranking: number
  contributionPoints: number
}

const LeetCodeActivity = () => {
  const username = 'vaibhav1826'
  const [data, setData] = useState<LeetCodeData>({
    totalSolved: 195,
    totalQuestions: 3300,
    easySolved: 128,
    totalEasy: 830,
    mediumSolved: 63,
    totalMedium: 1720,
    hardSolved: 4,
    totalHard: 750,
    ranking: 772254,
    contributionPoints: 120,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
        const result = await response.json()
        if (result.status === 'success') {
          setData(result)
          setError(false)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('LeetCode fetch error:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [username])

  const stats = [
    { label: 'Contest Rating', value: '1415', icon: FaTrophy }, // Static as API doesn't provide this usually
    { label: 'Ranking', value: data.ranking.toLocaleString(), icon: FaGlobe },
    { label: 'Contributions', value: data.contributionPoints.toString(), icon: FaFire },
  ]

  const streakStats = [
    { label: 'Max Streak', value: '51 days', icon: FaFire, color: 'text-emerald-500' },
    { label: 'Active Days', value: '85 days', icon: FaTrophy, color: 'text-forest-400' },
  ]

  const easyOffset = 282.7 - (282.7 * (data.easySolved / data.totalSolved))
  const medOffset = 282.7 - (282.7 * ((data.easySolved + data.mediumSolved) / data.totalSolved))
  const hardOffset = 282.7 - (282.7 * (data.totalSolved / data.totalSolved))

  return (
    <div className="w-full glass-panel p-6 sm:p-10 rounded-3xl border border-white/20 dark:border-slate-800 bg-white/40 dark:bg-slate-900/60 shadow-glow dark:shadow-[0_0_30px_rgba(20,83,45,0.15)] flex flex-col gap-8 relative overflow-hidden transition-colors duration-500">
      {/* Loading Overlay Gradient pulse */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-gradient"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-forest-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-forest-500/20">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-white fill-current">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-2.003 2.003a.37.37 0 0 0 .346.617l.635.003c.335 0 .63.133.873.372l4.474 4.474a.611.611 0 0 1 .431 1.039l-1.09 1.1a1.271 1.271 0 0 0-.227 1.441 5.417 5.417 0 0 1 .525 2.083 5.45 5.45 0 0 1-5.45 5.45 5.446 5.446 0 0 1-2.251-.482 1.417 1.417 0 0 0-1.187.05L4.545 19.1c-.473.271-.537.94-.097 1.307L7.48 23.012a5.45 5.45 0 0 0 7.917-3.084 5.414 5.414 0 0 0 .151-1.392 5.45 5.45 0 0 0-5.45-5.45 5.443 5.443 0 0 0-2.455.583 1.44 1.44 0 0 1-1.454-.122l-3.04-2.13a1.196 1.196 0 0 1 .51-2.212l.3-.013a1.41 1.41 0 0 0 .915-.36l7.578-7.577a1.371 1.371 0 0 0-1.31-2.258h-.02z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">LeetCode</h3>
            <p className="text-sm text-forest-600 dark:text-forest-400 font-medium transition-colors">@{username}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {error && <span className="text-[10px] text-red-500 font-bold uppercase">Offline Mode</span>}
          <a 
            href={`https://leetcode.com/${username}`} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-forest-600 dark:text-forest-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-colors"
          >
            View Profile <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Solved Stats Circle */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 bg-forest-50/50 dark:bg-slate-900/50 rounded-2xl border border-forest-100/50 dark:border-slate-800 transition-colors">
          <div className="relative h-40 w-40">
            {/* SVG Progress Circle */}
            <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="stroke-slate-200 dark:stroke-slate-700 transition-colors" fill="transparent" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={easyOffset} />
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="#059669" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={medOffset} />
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="#064e3b" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={hardOffset} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-slate-900 dark:text-white leading-none transition-colors">{data.totalSolved}</span>
              <span className="text-[10px] text-forest-600 dark:text-forest-400 uppercase tracking-widest mt-1 transition-colors">Solved</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-[9px] font-bold uppercase tracking-tight text-center">
            <span className="flex items-center gap-1.5 text-emerald-600"><div className="h-2 w-2 rounded-full bg-emerald-600" /> EASY {data.easySolved}</span>
            <span className="flex items-center gap-1.5 text-forest-600"><div className="h-2 w-2 rounded-full bg-forest-600" /> MED {data.mediumSolved}</span>
            <span className="flex items-center gap-1.5 text-forest-800"><div className="h-2 w-2 rounded-full bg-forest-800" /> HARD {data.hardSolved}</span>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5, borderColor: 'rgba(103, 127, 76, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
              className="p-6 bg-white/40 dark:bg-slate-800/80 rounded-2xl border border-forest-100 dark:border-slate-700 flex flex-col items-center justify-center text-center gap-2 transition-all shadow-sm"
            >
              <stat.icon className={`text-forest-600 dark:text-forest-400 text-lg transition-colors ${loading ? 'animate-pulse' : ''}`} />
              <span className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">{stat.value}</span>
              <span className="text-[10px] text-forest-500 dark:text-forest-400 uppercase tracking-[0.2em] transition-colors">{stat.label}</span>
            </motion.div>
          ))}
          
          {/* Rating History Placeholder */}
          <div className="sm:col-span-3 p-4 bg-white/30 dark:bg-slate-800/50 rounded-xl border border-forest-100/50 dark:border-slate-700 transition-colors">
             <div className="flex justify-between items-center mb-4">
               <span className="text-[10px] text-forest-400 uppercase tracking-widest block font-bold">Activity Pulse</span>
               <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Global Rank #{data.ranking.toLocaleString()}</span>
             </div>
             <div className="h-20 w-full flex items-end gap-1 px-2">
                {[40, 60, 45, 70, 85, 60, 90, 75, 95, 80, 100, 60, 90, 75, 95, 80, 100].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="flex-1 bg-forest-500/20 rounded-t-sm" 
                  />
                ))}
             </div>
          </div>

          {/* Streaks */}
          {streakStats.map((stat, idx) => (
            <div key={idx} className={`sm:col-span-1.5 p-5 bg-white/40 dark:bg-slate-800/80 rounded-2xl border border-forest-100 dark:border-slate-700 flex items-center gap-4 shadow-sm transition-colors`}>
              <div className={`h-10 w-10 flex items-center justify-center rounded-xl bg-forest-50 dark:bg-slate-700/50 transition-colors ${stat.color}`}>
                <stat.icon className={`text-xl ${loading ? 'animate-pulse' : ''}`} />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900 dark:text-white block transition-colors">{stat.value}</span>
                <span className="text-[10px] text-forest-500 dark:text-forest-400 uppercase tracking-wider transition-colors">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer info */}
      <p className="text-xs text-forest-600 dark:text-forest-400 font-medium italic text-center transition-colors">
        * Dynamic statistics synced with official profile via LeetCode-Stats-API
      </p>
    </div>
  )
}

export default LeetCodeActivity
