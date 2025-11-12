import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type NavbarProps = {
  sectionIds: string[]
  onOpenAssistant?: () => void
}

const sectionLabels: Record<string, string> = {
  garden: 'Garden',
  analytics: 'Analytics',
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
        isScrolled ? 'backdrop-blur-lg' : ''
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <a href="https://github.com/vaibhav1826" target="_blank" rel="noreferrer" className="font-display text-xl text-charcoal">
          Vaibhav&nbsp;Bhatt<span className="text-sage">.</span>
        </a>

        <div className="hidden items-center gap-6 rounded-full bg-white/50 px-6 py-2 text-sm text-charcoal/70 shadow-bloom sm:flex">
          {sectionIds.map((id) => (
            <button
              key={id}
              className="relative transition hover:text-charcoal"
              onClick={() => handleNavigation(id)}
            >
              {sectionLabels[id] ?? id}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href="mailto:vaibhavbhatt145@gmail.com"
            className="rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-mint shadow-bloom transition hover:bg-[#131a16]"
          >
            Email
          </a>
          <button
            type="button"
            onClick={onOpenAssistant}
            className="rounded-full bg-sage px-4 py-2 text-sm font-medium text-charcoal shadow-bloom transition hover:bg-softgreen"
          >
            Assistant
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

