import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HeroIntro from './components/Intro/HeroIntro'
import HomeView from './components/Pages/HomeView'
import ProjectsPage from './components/Pages/ProjectsPage'
import LightBackground from './components/Layout/LightBackground'
import Navbar from './components/Layout/Navbar'
import AssistantWidget from './components/Assistant/AssistantWidget'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/UI/ScrollToTop'

const SECTION_IDS = [
  'hero',
  'projects',
  'resume',
  'contact',
]

function App() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)

  useEffect(() => {
    if (hasSeenIntro) {
      setShowDashboard(true)
    }
  }, [hasSeenIntro])

  return (
    <Router>
      <div className="relative min-h-screen bg-forest-50 text-slate-950 flex flex-col">
        <ToastContainer
          position="bottom-right"
          toastClassName="glass-panel !bg-slate-900/90 !text-white !shadow-glow !rounded-2xl !px-5 !py-4 !text-sm !font-medium"
          progressClassName="!bg-forest-500"
        />
        {!showDashboard ? (
          <HeroIntro onFinish={() => setHasSeenIntro(true)} />
        ) : (
          <>
            <Navbar sectionIds={SECTION_IDS} onOpenAssistant={() => setAssistantOpen(true)} />
            <LightBackground />

            {/* Main Content Area */}
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/projects" element={<ProjectsPage />} />
              </Routes>
            </div>

            <Footer />
            <AssistantWidget open={assistantOpen} onClose={() => setAssistantOpen(false)} />
            <ScrollToTop />
          </>
        )}
      </div>
    </Router>
  )
}

export default App

