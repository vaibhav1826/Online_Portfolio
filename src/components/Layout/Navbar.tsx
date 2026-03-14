import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleNavigation = (id: string) => {
    setMenuOpen(false)
    if (id === 'projects') {
      navigate('/projects')
      return;
    }
    if (location.pathname !== '/') {
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
    <>
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 z-40 w-full transition ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-forest-200 shadow-sm' : ''
          }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
          <Link to="/" className="font-display text-xl text-slate-900 font-bold">
            Vaibhav&nbsp;Bhatt<span className="text-forest-600">.</span>
          </Link>

          {/* Desktop nav pills */}
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

          {/* Desktop assistant button */}
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={onOpenAssistant}
              className="rounded-full bg-forest-50 px-4 py-2 text-sm font-medium text-forest-700 border border-forest-200 transition hover:bg-forest-100 hover:border-forest-300"
            >
              Assistant
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex sm:hidden flex-col items-center justify-center gap-1.5 w-9 h-9 rounded-lg border border-forest-200 bg-white/70 transition hover:bg-forest-50"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 bg-slate-800 rounded-full origin-center"
              transition={{ duration: 0.25 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block h-0.5 w-5 bg-slate-800 rounded-full"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 bg-slate-800 rounded-full origin-center"
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden sm:hidden border-t border-forest-100 bg-white/90 backdrop-blur-md"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {sectionIds.map((id) => (
                  <button
                    key={id}
                    className={`w-full text-left rounded-xl px-4 py-3 text-sm font-medium text-forest-800 transition hover:bg-forest-50 hover:text-forest-600 ${location.pathname === '/projects' && id === 'projects' ? 'bg-forest-50 text-forest-600 font-bold' : ''}`}
                    onClick={() => handleNavigation(id)}
                  >
                    {sectionLabels[id] ?? id}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); onOpenAssistant?.() }}
                  className="w-full text-left rounded-xl px-4 py-3 text-sm font-medium text-forest-700 border border-forest-200 bg-forest-50 transition hover:bg-forest-100 mt-1"
                >
                  🤖 Assistant
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

export default Navbar
