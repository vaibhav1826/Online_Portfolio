import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload } from 'react-icons/fa'
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
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
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

      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-slate-900/30 to-transparent" />
      
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
              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-500 blur-md"
                animate={{
                  rotate: [0, 360],
                  scale: isHovering ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
              />
              
              {/* Multiple rotating rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-3xl border-2"
                  style={{
                    borderColor: `rgba(${100 + i * 50}, ${150 + i * 30}, 255, 0.3)`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 15 + i * 5,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    scale: {
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }
                  }}
                />
              ))}

              {/* Image container */}
              <motion.div 
                className="absolute inset-2 rounded-3xl overflow-hidden bg-slate-900 border-4 border-slate-800"
                whileHover={{ 
                  borderColor: "rgb(59, 130, 246)",
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                }}
              >
                <motion.img
                  src="/IMG-20231126-WA0021.jpg"
                  alt="Vaibhav Bhatt"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Hover overlay effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl px-6 py-4 shadow-2xl border border-blue-400/30"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
                transition={{ 
                  delay: 1, 
                  type: 'spring', 
                  stiffness: 200 
                }}
              >
                <motion.div 
                  className="text-white text-center"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-2xl font-bold">Available</div>
                  <div className="text-sm opacity-90">For Opportunities</div>
                </motion.div>
              </motion.div>

              {/* Orbiting particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`orbit-${i}`}
                  className="absolute w-3 h-3 bg-blue-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos((i * 72 * Math.PI) / 180) * 160],
                    y: [0, Math.sin((i * 72 * Math.PI) / 180) * 160],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut",
                  }}
                />
              ))}
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
                <p className="text-blue-400 font-semibold text-lg flex items-center gap-2">
                  <motion.span 
                    className="inline-block w-12 h-0.5 bg-blue-400"
                    animate={{ width: ["0px", "48px"] }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  />
                  Full Stack Developer
                </p>
              </motion.div>
              
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Vaibhav{' '}
                <motion.span 
                  className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
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
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Crafting modern web experiences with cutting-edge technologies. 
                Passionate about building scalable applications that make a difference.
              </motion.p>

              <motion.div
                className="flex items-center gap-3 text-gray-400"
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
                  <FaMapMarkerAlt className="text-blue-400" />
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
                { href: "https://github.com/vaibhav1826", icon: FaGithub, label: "GitHub", color: "blue" },
                { href: "https://linkedin.com/in/vaibhav-bhatt-382971283/", icon: FaLinkedin, label: "LinkedIn", color: "blue", bg: true },
                { href: "mailto:vaibhavbhatt145@gmail.com", icon: FaEnvelope, label: "Email", color: "cyan" },
                { href: "tel:+919058065003", icon: FaPhone, label: "Call", color: "emerald" },
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noreferrer" : undefined}
                  className={`flex items-center gap-2 ${
                    link.bg 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-slate-800 hover:bg-slate-700'
                  } text-white px-6 py-3 rounded-lg transition-all duration-300 ${
                    !link.bg ? 'border border-slate-600' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: link.color === 'blue' 
                      ? '0 10px 30px rgba(59, 130, 246, 0.4)'
                      : link.color === 'cyan'
                      ? '0 10px 30px rgba(34, 211, 238, 0.4)'
                      : '0 10px 30px rgba(16, 185, 129, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <link.icon className="text-xl" />
                  </motion.div>
                  <span>{link.label}</span>
                </motion.a>
              ))}
              
              {/* Download Resume Button */}
              <motion.a
                href="/LpuResume.pdf"
                download="Vaibhav_Bhatt_Resume.pdf"
                className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg transition-all duration-300 border border-teal-400/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: '0 10px 30px rgba(20, 184, 166, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <FaDownload className="text-xl" />
                </motion.div>
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
