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

    // Contact information
    if (/(contact|email|linkedin|github|phone|reach)/i.test(s)) {
      return [
        '📬 Contact Vaibhav:',
        '• Email: vaibhavbhatt145@gmail.com',
        '• LinkedIn: linkedin.com/in/vaibhav-bhatt-382971283/',
        '• GitHub: github.com/vaibhav1826',
        '• Phone: +91 9058065003',
      ].join('\n')
    }

    // Skills
    if (/(skills?|tech|languages?|framework|stack)/i.test(s)) {
      const skillsSection = resumeSections.find((x) => x.title.toLowerCase().includes('skills'))
      if (!skillsSection) return 'Skills information is not available.'
      return (
        '🛠️ Technical Skills:\n' +
        skillsSection.items.map((i) => `• ${i.title}: ${i.subtitle}`).join('\n')
      )
    }

    // Projects
    if (/(projects?|built|work|apps?|portfolio)/i.test(s)) {
      return (
        '🚀 Projects built by Vaibhav:\n\n' +
        projectShowcase
          .map(
            (p, i) =>
              `${i + 1}. ${p.name}\n   ${p.description}\n   Stack: ${p.stack.slice(0, 4).join(', ')}${p.stack.length > 4 ? ` +${p.stack.length - 4} more` : ''}${p.demo ? `\n   Live: ${p.demo}` : ''}`,
          )
          .join('\n\n')
      )
    }

    // Education / CGPA
    if (/(education|university|school|college|degree|cgpa|gpa|grade|marks|percentage)/i.test(s)) {
      const ed = resumeSections.find((x) => x.title.toLowerCase().includes('education'))
      if (!ed) return 'Education details not available.'
      return (
        '🎓 Education:\n\n' +
        ed.items
          .map((i) => `• ${i.title}\n  ${i.subtitle}${i.period ? `  (${i.period})` : ''}`)
          .join('\n\n')
      )
    }

    // Certificates
    if (/(certificates?|courses?|certifications?)/i.test(s)) {
      const cert = resumeSections.find((x) => x.title.toLowerCase().includes('certificates'))
      if (!cert) return 'Certificates not available.'
      return (
        '📜 Certificates & Courses:\n' +
        cert.items.map((i) => `• ${i.title}${i.period ? ` (${i.period})` : ''}`).join('\n')
      )
    }

    // Achievements / hackathon
    if (/(achievements?|awards?|hackathon|recognition|volunteer)/i.test(s)) {
      const ach = resumeSections.find((x) => x.title.toLowerCase().includes('achievements'))
      if (!ach) return 'Achievements not available.'
      return (
        '🏆 Achievements:\n' +
        ach.items.map((i) => `• ${i.title}${i.period ? ` — ${i.period}` : ''}`).join('\n') +
        '\n\nVaibhav reached the Top 20 at the Blitz Byte Hackathon (Nov 2025) and volunteered with the SIDCUL Contractors and Welfare Association.'
      )
    }

    // Availability / hiring
    if (/(available|hire|hiring|internship|job|opportunit|open to|looking for)/i.test(s)) {
      return (
        '✅ Yes! Vaibhav is actively open to internship and junior developer roles.\n\n' +
        'He is based in Jalandhar, Punjab, India and is comfortable with remote or hybrid positions.\n\n' +
        'Reach out at vaibhavbhatt145@gmail.com or connect on LinkedIn.'
      )
    }

    // Resume / download
    if (/(resume|cv|download|pdf)/i.test(s)) {
      return (
        '📄 You can download Vaibhav\'s resume directly from the Hero section — look for the "Resume" button at the top of the page.'
      )
    }

    // Experience / timeline
    if (/(experience|years?|timeline|history|background)/i.test(s)) {
      return [
        '📅 Project Timeline:',
        '• Jan 2025 — Crop Yield Prediction (PHP/MySQL full-stack)',
        '• May 2025 — Virtu Swift Digital Asset Platform',
        '• Sep 2025 — Smart Payroll & Employee Management (MERN)',
        '• Nov 2025 — Education Platform with gamification & WebSockets (MERN)',
        '• Feb 2026 — Online Portfolio (React + TypeScript + Vite)',
        '',
        'Vaibhav has built 5 projects spanning 1+ year of active development.',
      ].join('\n')
    }

    return "I can help with: skills, projects, education, CGPA, certificates, achievements, availability, experience timeline, and contact info. What would you like to know?"
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
