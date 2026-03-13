import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type HeroIntroProps = {
  onFinish: () => void
}

const HeroIntro = ({ onFinish }: HeroIntroProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onFinish(), 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-white"
      style={{ background: 'linear-gradient(135deg, #0f1205 0%, #1e220f 45%, #32381a 75%, #0f1205 100%)' }}
    >
      {/* Olive radial glow accents */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 25%, rgba(112,130,56,0.2) 0%, transparent 55%), radial-gradient(ellipse at 75% 75%, rgba(99,107,47,0.15) 0%, transparent 50%)',
        }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full shadow-[0_0_30px_rgba(112,130,56,0.5)] ring-2 ring-olive-500/40">
            <img
              src="/IMG-20231126-WA0021.jpg"
              alt="Vaibhav Bhatt"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h1 className="font-display text-4xl sm:text-5xl text-white">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-olive-300 to-olive-500 bg-clip-text text-transparent">
              Vaibhav Bhatt's
            </span>
            {' '}Portfolio
          </h1>
          <p className="max-w-xl text-balance text-base text-olive-200/70 sm:text-lg">
            Full Stack Developer crafting modern web experiences with cutting-edge technologies
          </p>
        </motion.div>

        <motion.div
          className="h-2 w-64 overflow-hidden rounded-full bg-olive-900/60"
          initial={{ width: 0 }}
          animate={{ width: '16rem' }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-olive-600 to-olive-400"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default HeroIntro
