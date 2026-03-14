import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { resumeSections, projectShowcase } from '../../utils/chartData'

type AssistantWidgetProps = {
  open: boolean
  onClose: () => void
}

type Message = { role: 'assistant' | 'user'; content: string }

const SUGGESTIONS = [
  'What are the projects?',
  'Show skills',
  'Tell me about education',
  'Any achievements?',
  'Is Vaibhav available?',
]

const AssistantWidget = ({ open, onClose }: AssistantWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm Vaibhav's portfolio assistant. Ask me about skills, projects, education, achievements, certificates, or availability.",
    },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const handleAsk = (text: string) => {
    const q = text.trim()
    if (!q) return
    setMessages((m) => [...m, { role: 'user', content: q }])
    setInput('')

    const reply = getAnswer(q)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    }, 200)
  }

  const getAnswer = (q: string): string => {
    const s = q.toLowerCase()

    // Greetings & Identity
    if (/^(hi|hello|hey|greetings|hola|sup)\b/i.test(s) || /how are you/i.test(s)) {
      return "Hi there! I'm Vaibhav's AI portfolio assistant. I'm doing great, thanks for asking! How can I help you explore his work?"
    }
    if (/(who are you|what are you|are you a human|are you an ai|bot)/i.test(s)) {
      return "I'm a custom-built digital assistant embedded in Vaibhav's portfolio. I don't have feelings, but I do have all the answers about his skills, projects, and experience!"
    }

    // "Tricky" / Interview questions
    if (/(why should.*hire|what makes.*unique|best quality|strength)/i.test(s)) {
      return "Vaibhav combines deep full-stack knowledge (MERN, PHP, React) with a strong eye for UI/UX and animation. He doesn't just build backends; he builds complete, production-ready experiences like Gamified Learning platforms with real-time sockets."
    }
    if (/(weakness|failure|mistake)/i.test(s)) {
      return "Like any dedicated developer, Vaibhav sometimes dives too deep into optimizing small details. However, he's learned to balance pixel-perfection with strict project deadlines and agile delivery."
    }
    if (/(hobbies|free time|outside of work|fun)/i.test(s)) {
      return "When he's not coding full-stack applications, Vaibhav loves exploring new UI trends, contributing to open-source, and tackling algorithmic challenges."
    }
    if (/(relocate|move to|willing to move|remote)/i.test(s)) {
      return "Vaibhav is based in Jalandhar, Punjab, but is completely open to remote work, hybrid roles, or relocating for the right opportunity!"
    }

    // About *this* portfolio site
    if (/(how did you build this portfolio|what is this site made of|portfolio stack|tech stack of this site)/i.test(s)) {
      return "This portfolio is built using React 18, TypeScript, and Vite! It uses Tailwind CSS for the design system, Framer Motion for the fluid physics-based animations, and Recharts/D3.js for the data visualizations."
    }

    // Contact information
    if (/(contact|email|linkedin|github|phone|reach|call|message)/i.test(s)) {
      return [
        '📬 You can reach Vaibhav instantly:',
        '• Email: vaibhavbhatt145@gmail.com',
        '• Phone: +91 9058065003',
        '• LinkedIn: linkedin.com/in/vaibhav-bhatt-382971283/',
        '• GitHub: github.com/vaibhav1826',
      ].join('\n')
    }

    // Skills
    if (/(skills?|tech|languages?|framework|stack|know|good at|proficient)/i.test(s)) {
      const skillsSection = resumeSections.find((x) => x.title.toLowerCase().includes('skills'))
      if (!skillsSection) return 'Skills information is temporarily unavailable.'
      return (
        '🛠️ Technical Capabilities:\n' +
        skillsSection.items.map((i) => `• ${i.title}: ${i.subtitle}`).join('\n')
      )
    }

    // Projects
    if (/(projects?|built|work|apps?|portfolio|creations|made)/i.test(s)) {
      return (
        '🚀 Featured Projects:\n\n' +
        projectShowcase
          .slice(0, 3) // Show top 3 to avoid wall of text
          .map(
            (p, i) =>
              `${i + 1}. ${p.name}\n   ${p.description}\n   Stack: ${p.stack.slice(0, 4).join(', ')}`
          )
          .join('\n\n') + 
          '\n\n(You can see all of these in detail on the Projects page!)'
      )
    }

    // Education / CGPA
    if (/(education|university|school|college|degree|cgpa|gpa|grade|marks|percentage|study|studied)/i.test(s)) {
      const ed = resumeSections.find((x) => x.title.toLowerCase().includes('education'))
      if (!ed) return 'Education details not available.'
      return (
        '🎓 Academic Background:\n\n' +
        ed.items
          .map((i) => `• ${i.title}\n  ${i.subtitle}${i.period ? `  (${i.period})` : ''}`)
          .join('\n\n')
      )
    }

    // Certificates
    if (/(certificates?|courses?|certifications?|certified)/i.test(s)) {
      const cert = resumeSections.find((x) => x.title.toLowerCase().includes('certificates'))
      if (!cert) return 'Certificates not available.'
      return (
        '📜 Certifications Highlights:\n' +
        cert.items.map((i) => `• ${i.title}${i.period ? ` (${i.period})` : ''}`).join('\n')
      )
    }

    // Achievements / hackathon
    if (/(achievements?|awards?|hackathon|recognition|volunteer|proud of)/i.test(s)) {
      const ach = resumeSections.find((x) => x.title.toLowerCase().includes('achievements'))
      if (!ach) return "Vaibhav reached the Top 20 at the Blitz Byte Hackathon (Nov 2025) and volunteers actively with local welfare associations."
      return (
        '🏆 Key Achievements:\n' +
        ach.items.map((i) => `• ${i.title}${i.period ? ` — ${i.period}` : ''}`).join('\n')
      )
    }

    // Availability / hiring
    if (/(available|hire|hiring|internship|job|opportunit|open to|looking for|recruit)/i.test(s)) {
      return (
        '✅ Yes! Vaibhav is actively looking for internship and junior developer opportunities.\n\n' +
        'He is comfortable with remote, hybrid, or on-site roles. Want to set up an interview? Email him at vaibhavbhatt145@gmail.com!'
      )
    }

    // Resume / download
    if (/(resume|cv|download|pdf|paper)/i.test(s)) {
      return (
        '📄 You can grab his full resume using the "Download Resume" button right on the main home page.'
      )
    }

    // Experience / timeline
    if (/(experience|years?|timeline|history|background|how long)/i.test(s)) {
      return [
        '📅 Experience & Timeline:',
        '• Vaibhav has been actively building full-stack applications for over a year.',
        '• Key milestones: Crop Yield Prediction (Jan 2025), Virtu Swift (May 2025), Smart Payroll (Sep 2025), and his massive Gamified Education Platform (Nov 2025).',
      ].join('\n')
    }

    // Fallback / Catch-all
    return "Hm, that's a tricky one! I'm still learning the nuances of human conversation. But I can tell you all about Vaibhav's projects, technical skills, education, or how to contact him! Try asking 'What are your top skills?'"
  }

  const container = useMemo(
    () => (
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="glass-panel relative z-10 w-full max-w-lg p-4 sm:p-6"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl text-white">Portfolio Assistant</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Ask anything about Vaibhav's profile</p>
                </div>
                <button
                  className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300 hover:bg-white/20 transition"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <motion.button
                    key={s}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/10 hover:bg-forest-900/40 hover:border-forest-500/40 transition"
                    onClick={() => handleAsk(s)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>

              <div className="max-h-72 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-3">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-3 whitespace-pre-wrap text-sm leading-relaxed ${m.role === 'assistant' ? 'text-gray-300' : 'text-white'
                      }`}
                  >
                    <span className={`font-semibold text-xs uppercase tracking-wider mr-2 ${m.role === 'assistant' ? 'text-forest-400' : 'text-emerald-300'}`}>
                      {m.role === 'user' ? 'You' : 'Assistant'}
                    </span>
                    {m.content}
                  </motion.div>
                ))}
                <div ref={endRef} />
              </div>

              <form
                className="mt-3 flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAsk(input)
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects, or experience..."
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/40"
                />
                <motion.button
                  type="submit"
                  className="rounded-2xl bg-forest-600 px-4 py-2 text-sm font-medium text-white hover:bg-forest-500 transition"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Send
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    ),
    [open, messages, input],
  )

  return container
}

export default AssistantWidget
