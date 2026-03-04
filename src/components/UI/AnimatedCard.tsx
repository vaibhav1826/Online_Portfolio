import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type AnimatedCardProps = {
  children: ReactNode
  delay?: number
  className?: string
  onClick?: () => void
}

const AnimatedCard = ({ children, delay = 0, className = '', onClick }: AnimatedCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.96 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1], delay }}
    className={`glass-panel relative p-6 sm:p-8 ${className}`}
    onClick={onClick}
  >
    <motion.div
      className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    />
    {children}
  </motion.div>
)

export default AnimatedCard

