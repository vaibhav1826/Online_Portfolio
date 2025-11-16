import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from 'react'

type HeroSectionProps = {
  id: string
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 120, friction: 14 },
  })

  return (
    <section id={id} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-slate-900/30 to-transparent" />
      
      <div className="relative container mx-auto px-4 max-w-6xl">
        <animated.div style={fadeIn} className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div className="absolute inset-2 rounded-3xl overflow-hidden bg-slate-900 border-4 border-slate-800">
                <img
                  src="/IMG-20231126-WA0021.jpg"
                  alt="Vaibhav Bhatt"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.div
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl px-6 py-4 shadow-2xl border border-blue-400/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
              >
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">Available</div>
                  <div className="text-sm opacity-90">For Opportunities</div>
                </div>
              </motion.div>
            </div>
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
                  <span className="inline-block w-12 h-0.5 bg-blue-400"></span>
                  Full Stack Developer
                </p>
              </motion.div>
              
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Vaibhav <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Bhatt</span>
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
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Jalandhar, Punjab, India</span>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <a
                href="https://github.com/vaibhav1826"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 border border-slate-600 hover:border-blue-500"
              >
                <FaGithub className="text-xl" />
                <span>GitHub</span>
              </a>
              
              <a
                href="https://linkedin.com/in/vaibhav-bhatt-382971283/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <FaLinkedin className="text-xl" />
                <span>LinkedIn</span>
              </a>
              
              <a
                href="mailto:vaibhavbhatt145@gmail.com"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 border border-slate-600 hover:border-purple-500"
              >
                <FaEnvelope className="text-xl" />
                <span>Email</span>
              </a>
              
              <a
                href="tel:+919058065003"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 border border-slate-600 hover:border-green-500"
              >
                <FaPhone className="text-xl" />
                <span>Call</span>
              </a>
            </motion.div>
          </motion.div>
        </animated.div>
      </div>
    </section>
  )
}

export default HeroSection
