import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HeroIntro from './components/Intro/HeroIntro'
import HeroSection from './components/Sections/HeroSection'
import SkillsShowcase from './components/Sections/SkillsShowcase'
import ProjectsShowcase from './components/Sections/ProjectsShowcase'
import DynamicResume from './components/Sections/DynamicResume'
import ContactForm from './components/Sections/ContactForm'
import DarkBackground from './components/Layout/DarkBackground'
import Navbar from './components/Layout/Navbar'
import AssistantWidget from './components/Assistant/AssistantWidget'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/UI/ScrollToTop'

const SECTION_IDS = [
  'skills',
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
    <div className="relative min-h-screen bg-slate-950 text-white">
      <ToastContainer
        position="bottom-right"
        toastClassName="glass-panel !bg-slate-900/90 !text-white !shadow-glow !rounded-2xl !px-5 !py-4 !text-sm !font-medium"
        progressClassName="!bg-navy-500"
      />
      {!showDashboard ? (
        <HeroIntro onFinish={() => setHasSeenIntro(true)} />
      ) : (
        <>
          <Navbar sectionIds={SECTION_IDS} onOpenAssistant={() => setAssistantOpen(true)} />
          <DarkBackground />

          <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20 sm:px-8">
            <HeroSection id="hero" />
            <SkillsShowcase id="skills" />
            <ProjectsShowcase id="projects" />
            <DynamicResume id="resume" />
            <ContactForm id="contact" />
          </main>

          <Footer />
          <AssistantWidget open={assistantOpen} onClose={() => setAssistantOpen(false)} />
          <ScrollToTop />
        </>
      )}
    </div>
  )
}

export default App

