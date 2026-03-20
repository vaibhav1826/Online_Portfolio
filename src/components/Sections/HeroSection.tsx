import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaDownload } from 'react-icons/fa'
import { useRef } from 'react'

type HeroSectionProps = {
  id: string
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const imageRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  const springConfig = { stiffness: 150, damping: 20 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section id={id} className="relative py-12 sm:py-20 overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-forest-100/40 dark:from-slate-900/40 via-forest-50/30 dark:via-slate-800/30 to-transparent pointer-events-none transition-colors duration-500" />

      <div className="relative container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-2 lg:items-center">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full flex justify-center order-first lg:order-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              ref={imageRef}
              className="relative w-52 h-52 sm:w-72 sm:h-72 lg:w-80 lg:h-80 perspective-1000"
              style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Static gradient ring */}
              <div className="absolute inset-[-6px] rounded-[2.5rem] border-2 border-forest-400/20 dark:border-forest-500/10 transition-colors" />

              {/* Image container */}
              <motion.div
                className="absolute inset-0 rounded-3xl overflow-hidden bg-forest-100 dark:bg-slate-900 border-4 border-forest-200 dark:border-slate-800 shadow-2xl transition-colors"
                whileHover={{
                  borderColor: "rgb(34, 197, 94)",
                  boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)",
                }}
              >
                <motion.img
                  src="/IMG-20231126-WA0021.jpg"
                  alt="Vaibhav Bhatt"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>

              {/* Professional Floating badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 sm:-bottom-6 sm:-right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-6 sm:py-4 shadow-xl border border-forest-100 dark:border-slate-800 transition-colors z-10"
                initial={{ scale: 0, y: 10 }}
                animate={{
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.6,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20
                }}
              >
                <div className="text-slate-900 dark:text-white text-center transition-colors">
                  <div className="text-sm sm:text-xl font-bold bg-gradient-to-r from-forest-600 to-emerald-600 dark:from-forest-400 dark:to-emerald-400 bg-clip-text text-transparent">Available</div>
                  <div className="text-[10px] sm:text-sm text-forest-800 dark:text-gray-300 font-medium whitespace-nowrap">For Opportunities</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 text-center lg:text-left z-20 w-full"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <div className="h-0.5 w-8 bg-forest-400 hidden sm:block" />
                <p className="text-forest-600 font-bold text-sm sm:text-lg uppercase tracking-wider">
                  Full Stack Developer
                </p>
                <div className="h-0.5 w-8 bg-forest-400 hidden sm:block" />
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Vaibhav{' '}
                <motion.span
                  className="bg-gradient-to-r from-forest-500 via-emerald-500 to-forest-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Bhatt
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-xl text-forest-800/90 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                I am a results-oriented 3rd-year Computer Science and Engineering student at Lovely Professional University, 
                with a core focus on high-performance software engineering and building user-centric web applications.
              </motion.p>

              <motion.div
                className="flex items-center gap-2 text-forest-700 dark:text-emerald-400 justify-center lg:justify-start text-sm sm:text-base font-medium transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <FaMapMarkerAlt className="text-forest-600 dark:text-forest-400 transition-colors" />
                <span>Jalandhar, Punjab, India</span>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {[
                { href: "https://github.com/vaibhav1826", icon: FaGithub, label: "GitHub", color: "slate" },
                { href: "https://linkedin.com/in/vaibhav-bhatt-382971283/", icon: FaLinkedin, label: "LinkedIn", color: "forest", bg: true },
                { href: "mailto:vaibhavbhatt145@gmail.com", icon: FaEnvelope, label: "Email", color: "emerald" },
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noreferrer" : undefined}
                  className={`flex items-center gap-2 ${link.bg
                    ? 'bg-forest-600 hover:bg-forest-700 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 hover:bg-forest-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-forest-200 dark:border-slate-700'
                    } px-4 py-2.5 rounded-xl transition-all duration-300 text-xs sm:text-sm font-bold`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  <link.icon className="text-lg" />
                  <span>{link.label}</span>
                </motion.a>
              ))}

              <motion.a
                href="/Lpu_Resume.pdf"
                download="Vaibhav_Bhatt_Resume.pdf"
                className="flex items-center gap-2 bg-forest-600 dark:bg-forest-500 text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:bg-forest-700 dark:hover:bg-forest-400 shadow-md text-xs sm:text-sm font-bold border border-forest-700 dark:border-forest-600"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <FaDownload className="text-lg" />
                <span>Resume</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection