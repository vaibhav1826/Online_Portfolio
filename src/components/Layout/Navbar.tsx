import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type NavbarProps = {
  sectionIds: string[]
  onOpenAssistant?: () => void
}

const sectionLabels: Record<string, string> = {
  hero: 'Home',
  projects: 'Projects',
  resume: 'Resume',
  contact: 'Contact',
}

const Navbar = ({ sectionIds, onOpenAssistant }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavigation = (id: string) => {
    if (id === 'projects') {
      navigate('/projects')
      return;
    }

    if (location.pathname !== '/') {
      // If we're not on the home page, navigate back home and pass the hash
      navigate(`/#${id}`)
      return;
    }

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
      className={`fixed top-0 z-40 w-full transition ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-forest-200 shadow-sm' : ''
        }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <Link to="/" className="font-display text-xl text-slate-900 font-bold">
          Vaibhav&nbsp;Bhatt<span className="text-forest-600">.</span>
        </Link>

        <div className="hidden items-center gap-6 rounded-full bg-white/60 border border-forest-200 px-6 py-2 text-sm text-forest-800 font-medium sm:flex shadow-sm">
          {sectionIds.map((id) => (
            <button
              key={id}
              className={`relative transition hover:text-forest-600 ${location.pathname === '/projects' && id === 'projects' ? 'text-forest-600 font-bold' : ''}`}
              onClick={() => handleNavigation(id)}
            >
              {sectionLabels[id] ?? id}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={onOpenAssistant}
            className="rounded-full bg-forest-50 px-4 py-2 text-sm font-medium text-forest-700 border border-forest-200 transition hover:bg-forest-100 hover:border-forest-300"
          >
            Assistant
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

