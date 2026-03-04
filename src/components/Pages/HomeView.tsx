import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '../Sections/HeroSection'
import SkillsShowcase from '../Sections/SkillsShowcase'
import DynamicResume from '../Sections/DynamicResume'
import ContactForm from '../Sections/ContactForm'

const HomeView = () => {
    const location = useLocation()

    // Handle smooth scrolling when navigating back from Projects page to a specific section
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1))
            if (element) {
                setTimeout(() => {
                    window.scrollTo({
                        top: element.offsetTop - 80,
                        behavior: 'smooth',
                    })
                }, 100) // Slight delay to ensure layout has rendered
            }
        } else {
            window.scrollTo(0, 0)
        }
    }, [location])

    return (
        <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20 sm:px-8">
            <HeroSection id="hero" />
            <SkillsShowcase id="skills" />
            <DynamicResume id="resume" />
            <ContactForm id="contact" />
        </main>
    )
}

export default HomeView
