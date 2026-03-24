import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HeroIntro from './components/Intro/HeroIntro'
import HomeView from './components/Pages/HomeView'
import ProjectsPage from './components/Pages/ProjectsPage'
import CodingProfilesPage from './components/Pages/CodingProfilesPage'
import LightBackground from './components/Layout/LightBackground'
import Navbar from './components/Layout/Navbar'
import AssistantWidget from './components/Assistant/AssistantWidget'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/UI/ScrollToTop'

const SECTION_IDS = [
  'hero',
  'projects',
  'coding-profiles',
  'resume',
  'contact',
]

function App() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    return sessionStorage.getItem('hasSeenIntro') === 'true'
  })
  const [assistantOpen, setAssistantOpen] = useState(false)

  useEffect(() => {
    if (hasSeenIntro) {
      sessionStorage.setItem('hasSeenIntro', 'true')
      setShowDashboard(true)
    }
  }, [hasSeenIntro])

  return (
    <Router>
      <div className="relative min-h-screen text-slate-900 dark:text-gray-100 flex flex-col overflow-x-hidden bg-transparent">
        <ToastContainer
          position="bottom-right"
          toastClassName="glass-panel !bg-white/90 dark:!bg-slate-900/90 !text-slate-900 dark:!text-white !border !border-forest-100 dark:!border-slate-800 !shadow-glow !rounded-2xl !px-5 !py-4 !text-sm !font-medium transition-colors"
          progressClassName="!bg-forest-500"
        />
        {!showDashboard ? (
          <HeroIntro onFinish={() => setHasSeenIntro(true)} />
        ) : (
          <>
            <Navbar sectionIds={SECTION_IDS} onOpenAssistant={() => setAssistantOpen(true)} />
            <LightBackground />

            {/* Main Content Area */}
            <div className="flex-grow container relative z-10 mx-auto w-full">
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/coding-profiles" element={<CodingProfilesPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>

            <div className="relative z-10">
              <Footer />
            </div>
            <AssistantWidget open={assistantOpen} onClose={() => setAssistantOpen(false)} />
            <ScrollToTop />
          </>
        )}
      </div>
    </Router>
  )
}

export default App

