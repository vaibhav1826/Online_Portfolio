import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'

type MirrorIntroProps = {
  onFinish: () => void
}

const MIRROR_ANIMATION_URL =
  'https://assets4.lottiefiles.com/packages/lf20_jcikwtux.json'

const MirrorIntro = ({ onFinish }: MirrorIntroProps) => {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null)
  const [stage, setStage] = useState<'scanning' | 'complete'>('scanning')

  useEffect(() => {
    let isMounted = true

    const loadAnimation = async () => {
      try {
        const response = await fetch(MIRROR_ANIMATION_URL)
        if (!response.ok) throw new Error('Failed to fetch animation')
        const data = (await response.json()) as Record<string, unknown>
        if (isMounted) {
          setAnimationData(data)
        }
      } catch (error) {
        console.warn('Could not load intro animation', error)
      }
    }

    void loadAnimation()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const stageTimer = setTimeout(() => setStage('complete'), 2400)
    const finishTimer = setTimeout(() => onFinish(), 3300)

    return () => {
      clearTimeout(stageTimer)
      clearTimeout(finishTimer)
    }
  }, [onFinish])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-mint via-softgreen to-sage px-6 text-charcoal">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-10">
        <div className="glass-panel relative flex h-72 w-72 items-center justify-center overflow-hidden">
          <AnimatePresence>
            {animationData ? (
              <motion.div
                key="scanner"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full w-full"
              >
                <Lottie animationData={animationData} loop={stage === 'scanning'} />
              </motion.div>
            ) : (
              <motion.div
                key="scanner-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-full w-full flex-col items-center justify-center gap-4"
              >
                <div className="h-24 w-24 animate-pulse rounded-full bg-sage/50" />
                <p className="text-sm uppercase tracking-[0.4em] text-charcoal/70">
                  calibrating
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="absolute inset-0 border border-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <p className="text-sm uppercase tracking-[0.55em] text-charcoal/60">
            eco-status sync
          </p>
          <h1 className="font-display text-4xl sm:text-5xl">
            Welcome to Vaibhav Bhatt’s{' '}
            <span className="bg-gradient-to-r from-charcoal to-sage bg-clip-text text-transparent">
              Living Portfolio
            </span>
          </h1>
          <p className="max-w-xl text-balance text-base text-charcoal/70 sm:text-lg">
            A living ecosystem of code, creativity, and mindful growth. Sit tight while we
            prepare your personal dashboard.
          </p>
        </motion.div>

        <motion.div
          className="h-1 w-64 overflow-hidden rounded-full bg-white/40"
          initial={{ width: 0 }}
          animate={{ width: '16rem' }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.div
            className="h-full w-full bg-gradient-to-r from-sage to-charcoal"
            initial={{ x: '-100%' }}
            animate={{ x: stage === 'complete' ? '0%' : '20%' }}
            transition={{ duration: 2.6, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default MirrorIntro

