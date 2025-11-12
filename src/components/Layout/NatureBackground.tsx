import { motion } from 'framer-motion'

const NatureBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-mint via-white/40 to-softgreen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute -left-1/3 top-0 h-[540px] w-[540px] rounded-full bg-sage/40 blur-3xl"
        animate={{ y: [0, 30, -20, 10], opacity: [0.3, 0.5, 0.4, 0.45] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-20 h-[620px] w-[620px] rounded-full bg-softgreen/40 blur-3xl"
        animate={{ y: [0, -20, 20, -30], opacity: [0.35, 0.5, 0.4, 0.45] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ['0% 0%', '100% 50%', '0% 0%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(134,167,137,0.25) 0, transparent 45%), radial-gradient(circle at 80% 0%, rgba(165,201,161,0.2) 0, transparent 55%), radial-gradient(circle at 50% 90%, rgba(134,167,137,0.15) 0, transparent 60%)',
        }}
      />
    </div>
  )
}

export default NatureBackground

