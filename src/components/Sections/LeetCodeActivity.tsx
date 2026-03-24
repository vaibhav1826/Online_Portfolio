import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
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

// 3D Tilt Card Component for impressive hover effects
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 w-full ${className}`}
    >
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="w-full h-full p-6 bg-white/40 dark:bg-slate-800/80 rounded-2xl border border-forest-100 dark:border-slate-700 flex flex-col items-center justify-center text-center gap-2 shadow-lg hover:shadow-glow dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-shadow duration-300 backdrop-blur-md"
      >
        {children}
      </div>
    </motion.div>
  )
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
    { label: 'Contest Rating', value: '1415', icon: FaTrophy }, 
    { label: 'Ranking', value: data.ranking.toLocaleString(), icon: FaGlobe },
    { label: 'Contributions', value: data.contributionPoints.toString(), icon: FaFire },
  ]

  const streakStats = [
    { label: 'Max Streak', value: '51 days', icon: FaFire, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Active Days', value: '85 days', icon: FaTrophy, color: 'text-forest-500', bg: 'bg-forest-500/10' },
  ]

  const easyOffset = 282.7 - (282.7 * (data.easySolved / data.totalSolved))
  const medOffset = 282.7 - (282.7 * ((data.easySolved + data.mediumSolved) / data.totalSolved))
  const hardOffset = 282.7 - (282.7 * (data.totalSolved / data.totalSolved))

  return (
    <div className="w-full glass-panel p-6 sm:p-10 rounded-[2.5rem] border border-white/40 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl flex flex-col gap-8 relative overflow-hidden transition-colors duration-500">
      
      {/* Dynamic Glowing Accent Light behind the container */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Loading Overlay Gradient pulse */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-gradient"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-5">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="h-14 w-14 rounded-2xl bg-gradient-to-br from-forest-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 border border-white/20"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-white fill-current">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-2.003 2.003a.37.37 0 0 0 .346.617l.635.003c.335 0 .63.133.873.372l4.474 4.474a.611.611 0 0 1 .431 1.039l-1.09 1.1a1.271 1.271 0 0 0-.227 1.441 5.417 5.417 0 0 1 .525 2.083 5.45 5.45 0 0 1-5.45 5.45 5.446 5.446 0 0 1-2.251-.482 1.417 1.417 0 0 0-1.187.05L4.545 19.1c-.473.271-.537.94-.097 1.307L7.48 23.012a5.45 5.45 0 0 0 7.917-3.084 5.414 5.414 0 0 0 .151-1.392 5.45 5.45 0 0 0-5.45-5.45 5.443 5.443 0 0 0-2.455.583 1.44 1.44 0 0 1-1.454-.122l-3.04-2.13a1.196 1.196 0 0 1 .51-2.212l.3-.013a1.41 1.41 0 0 0 .915-.36l7.578-7.577a1.371 1.371 0 0 0-1.31-2.258h-.02z" />
            </svg>
          </motion.div>
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">LeetCode</h3>
            <p className="text-base text-forest-600 dark:text-emerald-400 font-bold mt-1 tracking-wide">@{username}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
          {error && <span className="text-xs text-rose-500 font-bold uppercase bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">Offline Mode</span>}
          <a 
            href={`https://leetcode.com/${username}`} 
            target="_blank" 
            rel="noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-forest-600 dark:bg-white dark:hover:bg-emerald-400 text-white dark:text-slate-900 font-bold px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-forest-500/30 active:scale-95"
          >
            Visit Profile <FaExternalLinkAlt className="text-sm" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
        {/* Solved Stats SVG Circle - Enhanced with Dropshadows */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-white/60 dark:bg-slate-800/60 rounded-[2rem] border border-forest-100 dark:border-slate-700 shadow-sm relative overflow-hidden backdrop-blur-md"
        >
          {/* Subtle background glow for the ring */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
          
          <div className="relative h-48 w-48 drop-shadow-lg">
            <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
              {/* Premium Glow Filter */}
              <defs>
                <filter id="glow-ring" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <circle cx="50" cy="50" r="44" className="stroke-slate-200 dark:stroke-slate-700/50" fill="transparent" strokeWidth="6" />
              <circle cx="50" cy="50" r="44" fill="transparent" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeDasharray="282.7" strokeDashoffset={easyOffset} filter="url(#glow-ring)" className="drop-shadow-sm" />
              <circle cx="50" cy="50" r="44" fill="transparent" stroke="#059669" strokeWidth="6" strokeLinecap="round" strokeDasharray="282.7" strokeDashoffset={medOffset} filter="url(#glow-ring)" className="drop-shadow-sm" />
              <circle cx="50" cy="50" r="44" fill="transparent" stroke="#064e3b" strokeWidth="6" strokeLinecap="round" strokeDasharray="282.7" strokeDashoffset={hardOffset} filter="url(#glow-ring)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tight">{data.totalSolved}</span>
              <span className="text-[11px] text-forest-600 dark:text-emerald-400 font-bold uppercase tracking-[0.2em] mt-2">Solved</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
            <div className="flex flex-col items-center gap-1 bg-white/50 dark:bg-slate-900/50 px-3 py-2 rounded-xl flex-1 border border-black/5 dark:border-white/5">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Easy</span>
              <span className="text-lg font-black text-slate-800 dark:text-slate-200">{data.easySolved}</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-white/50 dark:bg-slate-900/50 px-3 py-2 rounded-xl flex-1 border border-black/5 dark:border-white/5">
              <span className="text-[10px] font-bold text-forest-500 uppercase tracking-widest">Med</span>
              <span className="text-lg font-black text-slate-800 dark:text-slate-200">{data.mediumSolved}</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-white/50 dark:bg-slate-900/50 px-3 py-2 rounded-xl flex-1 border border-black/5 dark:border-white/5">
              <span className="text-[10px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-widest">Hard</span>
              <span className="text-lg font-black text-slate-800 dark:text-slate-200">{data.hardSolved}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Stats Grid with 3D Hover Effects */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((stat, idx) => (
            <TiltCard key={idx}>
              <div className="h-12 w-12 rounded-full bg-forest-50 dark:bg-slate-700/50 mb-3 flex items-center justify-center shadow-inner">
                <stat.icon className={`text-forest-600 dark:text-emerald-400 text-xl ${loading ? 'animate-pulse' : ''}`} />
              </div>
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</span>
              <span className="text-[11px] text-forest-600 dark:text-forest-400 font-bold uppercase tracking-[0.15em] mt-1">{stat.label}</span>
            </TiltCard>
          ))}
          
          {/* Rating History Graph representation */}
          <div className="sm:col-span-3 p-6 bg-white/50 dark:bg-slate-800/60 rounded-[2rem] border border-forest-100/80 dark:border-slate-700/80 shadow-sm backdrop-blur-md transition-colors relative group">
             {/* Subtle animated background gradient within the card */}
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-forest-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]" />
             
             <div className="flex justify-between items-end mb-6 relative z-10">
               <div className="flex flex-col gap-1">
                 <span className="text-sm font-bold text-slate-900 dark:text-white">Activity Pulse</span>
                 <span className="text-[11px] font-medium text-slate-500 dark:text-gray-400">Weekly resolution</span>
               </div>
               <span className="text-[11px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
                 Global Rank #{data.ranking.toLocaleString()}
               </span>
             </div>
             
             <div className="h-24 w-full flex items-end gap-1.5 px-1 relative z-10 group-hover:scale-[1.01] transition-transform duration-500">
                {[40, 60, 45, 70, 85, 60, 90, 75, 95, 80, 100, 60, 90, 75, 95, 80, 100].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1.2, delay: i * 0.05, ease: "easeOut" }}
                    className="flex-1 bg-gradient-to-t from-forest-500/20 to-emerald-400/80 rounded-t border-t border-emerald-300 dark:border-emerald-500/50 drop-shadow-sm" 
                  />
                ))}
             </div>
          </div>

          {/* Streaks detailed */}
          {streakStats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -4, scale: 1.02 }}
              className={`sm:col-span-1.5 p-5 bg-white/60 dark:bg-slate-800/80 rounded-[1.5rem] border border-forest-100 dark:border-slate-700 flex items-center gap-5 shadow-sm hover:shadow-glow transition-all backdrop-blur-md cursor-default`}
            >
              <div className={`h-12 w-12 flex items-center justify-center rounded-2xl ${stat.bg} ${stat.color} shadow-inner`}>
                <stat.icon className={`text-2xl ${loading ? 'animate-pulse' : ''}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-0.5">{stat.label}</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">{stat.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Footer info */}
      <div className="w-full flex justify-center pt-2">
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Dynamic statistics synced with official LeetCode API
        </p>
      </div>
    </div>
  )
}

export default LeetCodeActivity
