import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { resumeSections, projectShowcase } from '../../utils/chartData'

type AssistantWidgetProps = {
  open: boolean
  onClose: () => void
}

type Message = { role: 'assistant' | 'user'; content: string }

const SUGGESTIONS = [
  'Tell me about skills',
  'What projects have been built?',
  'How to contact?',
  'Show education',
  'List certificates',
]

const AssistantWidget = ({ open, onClose }: AssistantWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm Vaibhav's assistant. Ask me about skills, projects, education, certificates, or achievements.",
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

  const getAnswer = (q: string) => {
    const s = q.toLowerCase()

    if (/(contact|email|linkedin|github|phone)/i.test(s)) {
      return [
        'Contact Information:',
        '- Email: vaibhavbhatt145@gmail.com',
        '- LinkedIn: linkedin.com/in/vaibhav-bhatt-382971283/',
        '- GitHub: github.com/vaibhav1826',
        '- Phone: +91 9058065003',
      ].join('\n')
    }

    if (/(skills?|tech|languages?)/i.test(s)) {
      const skillsSection = resumeSections.find((x) => x.title.toLowerCase().includes('skills'))
      if (!skillsSection) return 'Skills information is not available.'
      return skillsSection.items.map((i) => `${i.title}: ${i.subtitle}`).join('\n')
    }

    if (/(projects?|work)/i.test(s)) {
      return projectShowcase.map((p) => `${p.name}: ${p.description}`).join('\n\n')
    }

    if (/(education|university|school)/i.test(s)) {
      const ed = resumeSections.find((x) => x.title.toLowerCase().includes('education'))
      if (!ed) return 'Education details not available.'
      return ed.items.map((i) => `${i.title}\n${i.subtitle}${i.period ? ` (${i.period})` : ''}`).join('\n\n')
    }

    if (/(certificates?|courses?)/i.test(s)) {
      const cert = resumeSections.find((x) => x.title.toLowerCase().includes('certificates'))
      if (!cert) return 'Certificates not available.'
      return cert.items.map((i) => `${i.title}${i.period ? ` (${i.period})` : ''}`).join('\n')
    }

    if (/(achievements?|awards?)/i.test(s)) {
      const ach = resumeSections.find((x) => x.title.toLowerCase().includes('achievements'))
      if (!ach) return 'Achievements not available.'
      return ach.items.map((i) => `${i.title}${i.period ? ` (${i.period})` : ''}`).join('\n')
    }

    return "I can help with: skills, projects, education, certificates, achievements, and contact information."
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
                <h3 className="font-display text-xl text-white">Assistant</h3>
                <button
                  className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300 hover:bg-white/20 transition"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/10 hover:bg-white/10 transition"
                    onClick={() => handleAsk(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="max-h-72 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`mb-2 whitespace-pre-wrap text-sm ${
                      m.role === 'assistant' ? 'text-gray-300' : 'text-white'
                    }`}
                  >
                    {m.role === 'user' ? 'You: ' : 'Assistant: '}
                    {m.content}
                  </div>
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
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/40"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500 transition"
                >
                  Send
                </button>
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
