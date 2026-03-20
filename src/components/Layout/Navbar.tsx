import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

type NavbarProps = {
  sectionIds: string[]
  onOpenAssistant?: () => void
}

const sectionLabels: Record<string, string> = {
  hero: 'Home',
  projects: 'Projects',
  'coding-profiles': 'Coding Profiles',
  resume: 'Resume',
  contact: 'Contact',
}

const Navbar = ({ sectionIds, onOpenAssistant }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, setMode } = useTheme()

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
    if (id === 'coding-profiles') {
      navigate('/coding-profiles')
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
        className={`fixed top-0 z-40 w-full transition border-b ${
          isScrolled 
            ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-forest-200 dark:border-white/10 shadow-sm' 
            : 'border-transparent dark:border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
          <Link to="/" className="font-display text-xl text-slate-900 dark:text-white font-bold transition-colors">
            Vaibhav&nbsp;Bhatt<span className="text-forest-600 dark:text-forest-400">.</span>
          </Link>

          {/* Desktop nav pills */}
          <div className="hidden items-center gap-6 rounded-full bg-white/60 dark:bg-slate-900/60 transition-colors border border-forest-200 dark:border-white/10 px-6 py-2 text-sm text-forest-800 dark:text-gray-300 font-medium sm:flex shadow-sm">
            {sectionIds.map((id) => (
              <button
                key={id}
                className={`relative transition hover:text-forest-600 dark:hover:text-forest-400 ${location.pathname === '/projects' && id === 'projects' ? 'text-forest-600 dark:text-forest-400 font-bold' : ''}`}
                onClick={() => handleNavigation(id)}
              >
                {sectionLabels[id] ?? id}
              </button>
            ))}
          </div>

          {/* Desktop assistant button & theme toggle */}
          <div className="hidden items-center gap-4 sm:flex">
            <div className="relative flex items-center bg-gray-100/50 dark:bg-slate-900/50 rounded-full border border-gray-200 dark:border-white/10 p-1 backdrop-blur-sm">
              {['light', 'dark'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setMode(mode as 'light' | 'dark')}
                  className={`relative px-4 py-1.5 text-sm font-semibold z-10 transition-colors duration-500 capitalize ${theme === mode ? (mode === 'light' ? 'text-forest-800' : 'text-white') : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                  aria-label={`${mode} Mode`}
                >
                  {theme === mode && (
                    <motion.div
                      layoutId="desktop-theme-bubble"
                      className={`absolute inset-0 rounded-full -z-10 shadow-sm border border-black/5 dark:border-white/5 ${mode === 'light' ? 'bg-white' : 'bg-slate-800'}`}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                    />
                  )}
                  {mode}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onOpenAssistant}
              className="rounded-full bg-forest-50 dark:bg-slate-900 px-4 py-2 text-sm font-medium text-forest-700 dark:text-gray-300 border border-forest-200 dark:border-white/10 transition hover:bg-forest-100 dark:hover:bg-slate-800"
            >
              Assistant
            </button>
          </div>

          {/* Mobile hamburger & theme toggle */}
          <div className="flex items-center gap-3 sm:hidden">
            <div className="relative flex items-center bg-white/70 dark:bg-slate-900/70 rounded-full border border-forest-200 dark:border-white/10 p-1 backdrop-blur-sm">
              {['light', 'dark'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setMode(mode as 'light' | 'dark')}
                  className={`relative px-3 py-1.5 text-xs font-semibold z-10 transition-colors duration-500 capitalize ${theme === mode ? (mode === 'light' ? 'text-forest-800' : 'text-white') : 'text-gray-500 dark:text-gray-400'}`}
                  aria-label={`${mode} Mode`}
                >
                  {theme === mode && (
                    <motion.div
                      layoutId="mobile-theme-bubble"
                      className={`absolute inset-0 rounded-full -z-10 shadow-sm border border-black/5 dark:border-white/5 ${mode === 'light' ? 'bg-white' : 'bg-slate-800'}`}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                    />
                  )}
                  {mode}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex flex-col items-center justify-center gap-1.5 w-9 h-9 rounded-lg border border-forest-200 dark:border-white/10 bg-white/70 dark:bg-slate-900 transition hover:bg-forest-50 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 bg-slate-800 dark:bg-white rounded-full origin-center"
              transition={{ duration: 0.25 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block h-0.5 w-5 bg-slate-800 dark:bg-white rounded-full"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 bg-slate-800 dark:bg-white rounded-full origin-center"
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden sm:hidden border-t border-forest-100 dark:border-white/10 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {sectionIds.map((id) => (
                  <button
                    key={id}
                    className={`w-full text-left rounded-xl px-4 py-3 text-sm font-medium transition ${
                      location.pathname === '/projects' && id === 'projects' 
                        ? 'bg-forest-50 dark:bg-slate-900 text-forest-600 dark:text-forest-400 font-bold' 
                        : 'text-forest-800 dark:text-gray-300 hover:bg-forest-50 dark:hover:bg-slate-900 hover:text-forest-600 dark:hover:text-forest-400'
                    }`}
                    onClick={() => handleNavigation(id)}
                  >
                    {sectionLabels[id] ?? id}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); onOpenAssistant?.() }}
                  className="w-full text-left rounded-xl px-4 py-3 text-sm font-medium text-forest-700 dark:text-gray-300 border border-forest-200 dark:border-white/10 bg-forest-50 dark:bg-slate-900 transition hover:bg-forest-100 dark:hover:bg-slate-800 mt-1"
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
