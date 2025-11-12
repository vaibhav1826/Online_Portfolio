import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MirrorIntro from './components/Intro/MirrorIntro'
import GrowthGarden from './components/Sections/GrowthGarden'
import AnalyticsDashboard from './components/Sections/AnalyticsDashboard'
import ProjectsShowcase from './components/Sections/ProjectsShowcase'
import DynamicResume from './components/Sections/DynamicResume'
import ContactForm from './components/Sections/ContactForm'
import NatureBackground from './components/Layout/NatureBackground'
import DotNetwork from './components/Layout/DotNetwork'
import Navbar from './components/Layout/Navbar'
import AssistantWidget from './components/Assistant/AssistantWidget'
import Footer from './components/Layout/Footer'

const SECTION_IDS = [
  'garden',
  'analytics',
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
    <div className="relative min-h-screen bg-mint text-charcoal">
      <ToastContainer
        position="bottom-right"
        toastClassName="glass-panel !bg-white/90 !text-charcoal !shadow-bloom !rounded-2xl !px-5 !py-4 !text-sm !font-medium"
        progressClassName="!bg-sage"
      />
      {!showDashboard ? (
        <MirrorIntro onFinish={() => setHasSeenIntro(true)} />
      ) : (
        <>
          <Navbar sectionIds={SECTION_IDS} onOpenAssistant={() => setAssistantOpen(true)} />
          <NatureBackground />
          <DotNetwork />

          <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20 sm:px-8">
            <GrowthGarden id="garden" />
            <AnalyticsDashboard id="analytics" />
            <ProjectsShowcase id="projects" />
            <DynamicResume id="resume" />
            <ContactForm id="contact" />
          </main>

          <Footer />
          <AssistantWidget open={assistantOpen} onClose={() => setAssistantOpen(false)} />
        </>
      )}
    </div>
  )
}

export default App

