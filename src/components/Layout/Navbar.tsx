import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type NavbarProps = {
  sectionIds: string[]
  onOpenAssistant?: () => void
}

const sectionLabels: Record<string, string> = {
  skills: 'Skills',
  projects: 'Projects',
  resume: 'Resume',
  contact: 'Contact',
}

const Navbar = ({ sectionIds, onOpenAssistant }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavigation = (id: string) => {
    if (typeof window === 'undefined') return
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 z-40 w-full transition ${
        isScrolled ? 'bg-slate-950/90 backdrop-blur-lg shadow-glow' : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <a href="https://github.com/vaibhav1826" target="_blank" rel="noreferrer" className="font-display text-xl text-white">
          Vaibhav&nbsp;Bhatt<span className="text-navy-400">.</span>
        </a>

        <div className="hidden items-center gap-6 rounded-full glass-effect px-6 py-2 text-sm text-gray-400 sm:flex">
          {sectionIds.map((id) => (
            <button
              key={id}
              className="relative transition hover:text-white"
              onClick={() => handleNavigation(id)}
            >
              {sectionLabels[id] ?? id}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href="mailto:vaibhavbhatt145@gmail.com"
            className="rounded-full bg-navy-600 px-4 py-2 text-sm font-medium text-white shadow-glow transition hover:bg-navy-500"
          >
            Email
          </a>
          <button
            type="button"
            onClick={onOpenAssistant}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white border border-white/20 transition hover:bg-white/20"
          >
            Assistant
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

