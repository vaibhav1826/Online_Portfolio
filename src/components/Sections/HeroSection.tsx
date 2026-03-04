import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaDownload } from 'react-icons/fa'
import { useState, useRef } from 'react'

type HeroSectionProps = {
  id: string
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const [isHovering, setIsHovering] = useState(false)
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
    setIsHovering(false)
  }

  return (
    <section id={id} className="relative py-20 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-forest-400/20 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
            }}
            animate={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-forest-100/40 via-forest-50/30 to-transparent" />

      <div className="relative container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovering(true)}
          >
            <motion.div
              ref={imageRef}
              className="relative w-80 h-80 mx-auto perspective-1000"
              style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Subtle animated gradient glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-forest-500 via-emerald-400 to-teal-500 blur-xl opacity-60"
                animate={{
                  scale: isHovering ? [1, 1.05, 1] : 1,
                  opacity: isHovering ? 0.8 : 0.6
                }}
                transition={{
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
              />

              {/* Single elegant ring */}
              <motion.div
                className="absolute inset-[-4px] rounded-[2rem] border-2 border-forest-400/30"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Image container */}
              <motion.div
                className="absolute inset-2 rounded-3xl overflow-hidden bg-slate-900 border-4 border-slate-800"
                whileHover={{
                  borderColor: "rgb(34, 197, 94)", // green-500
                  boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
                }}
              >
                <motion.img
                  src="/IMG-20231126-WA0021.jpg"
                  alt="Vaibhav Bhatt"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Hover overlay effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-forest-600/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </motion.div>

              {/* Professional Floating badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-forest-200"
                initial={{ scale: 0, y: 20 }}
                animate={{
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20
                }}
              >
                <div className="text-slate-900 text-center">
                  <div className="text-xl font-bold bg-gradient-to-r from-forest-600 to-emerald-600 bg-clip-text text-transparent">Available</div>
                  <div className="text-sm text-forest-800">For Opportunities</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-forest-600 font-semibold text-lg flex items-center gap-2">
                  <motion.span
                    className="inline-block w-12 h-0.5 bg-forest-400"
                    animate={{ width: ["0px", "48px"] }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  />
                  Full Stack Developer
                </p>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl font-bold text-slate-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Vaibhav{' '}
                <motion.span
                  className="bg-gradient-to-r from-forest-400 via-emerald-400 to-forest-500 bg-clip-text text-transparent"
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
                className="text-xl text-forest-800/90 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Crafting modern web experiences with cutting-edge technologies.
                Passionate about building scalable applications that make a difference.
              </motion.p>

              <motion.div
                className="flex items-center gap-3 text-forest-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FaMapMarkerAlt className="text-forest-600" />
                </motion.div>
                <span>Jalandhar, Punjab, India</span>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
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
                    ? 'bg-forest-600 hover:bg-forest-700 text-white'
                    : 'bg-white hover:bg-forest-50 text-slate-900'
                    } px-6 py-3 rounded-lg transition-all duration-300 ${!link.bg ? 'border border-forest-200' : ''
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    boxShadow: link.color === 'forest'
                      ? '0 10px 30px rgba(34, 197, 94, 0.3)'
                      : link.color === 'emerald'
                        ? '0 10px 30px rgba(16, 185, 129, 0.3)'
                        : link.color === 'teal'
                          ? '0 10px 30px rgba(20, 184, 166, 0.3)'
                          : '0 10px 30px rgba(0, 0, 0, 0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <link.icon className="text-xl" />
                  </div>
                  <span>{link.label}</span>
                </motion.a>
              ))}

              {/* Download Resume Button */}
              <motion.a
                href="/LpuResume.pdf"
                download="Vaibhav_Bhatt_Resume.pdf"
                className="flex items-center gap-2 bg-gradient-to-r from-forest-600 to-emerald-600 hover:from-forest-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg transition-all duration-300 border border-forest-400/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div>
                  <FaDownload className="text-xl" />
                </div>
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