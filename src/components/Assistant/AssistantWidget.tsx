import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { askGemini, isGeminiConfigured } from '../../services/geminiService'
import { findBestMatch } from '../../utils/assistantData'

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
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open, isTyping])

  const handleAsk = async (text: string) => {
    const q = text.trim()
    if (!q || isTyping) return
    
    setMessages((m) => [...m, { role: 'user', content: q }])
    setInput('')
    setIsTyping(true)

    try {
      if (isGeminiConfigured()) {
        try {
          const reply = await askGemini(q)
          setMessages((m) => [...m, { role: 'assistant', content: reply }])
          return
        } catch (apiError) {
          console.error('Gemini API failed, falling back to static logic:', apiError)
          // Fall through to the backup logic below
        }
      }

      // Fallback to static regex logic if api key is missing or API request fails
      const reply = getAnswer(q)
      await new Promise((resolve) => setTimeout(resolve, 600)) // simulate typing
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
      
    } catch (error) {
      console.error('Assistant Error:', error)
      setMessages((m) => [...m, { role: 'assistant', content: "I'm having a little trouble thinking clearly right now. But feel free to explore the portfolio or contact Vaibhav directly!" }])
    } finally {
      setIsTyping(false)
    }
  }

  const getAnswer = (q: string): string => {
    return findBestMatch(q)
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
              className="relative z-10 w-full max-w-lg p-4 sm:p-6 rounded-3xl border border-forest-100 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-glow dark:shadow-none"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl text-slate-900 dark:text-white transition-colors">Portfolio Assistant</h3>
                  <p className="text-xs text-forest-700 dark:text-gray-400 mt-0.5 transition-colors">Ask anything about Vaibhav's profile</p>
                </div>
                <button
                  className="rounded-full bg-forest-100 dark:bg-white/10 px-3 py-1 text-sm text-forest-800 dark:text-gray-300 hover:bg-forest-200 dark:hover:bg-white/20 transition-colors"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <motion.button
                    key={s}
                    className="rounded-full bg-forest-50 dark:bg-white/5 px-3 py-1 text-xs text-forest-800 dark:text-gray-300 border border-forest-200 dark:border-white/10 hover:bg-forest-100 dark:hover:bg-forest-900/40 dark:hover:border-forest-500/40 transition-colors"
                    onClick={() => handleAsk(s)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>

              <div className="max-h-72 overflow-y-auto rounded-2xl border border-forest-100 dark:border-white/10 bg-forest-50/50 dark:bg-white/5 p-3 custom-scrollbar">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-3 whitespace-pre-wrap text-sm leading-relaxed ${m.role === 'assistant' ? 'text-forest-800 dark:text-gray-300' : 'text-slate-900 dark:text-white'
                      }`}
                  >
                    <span className={`font-semibold text-xs uppercase tracking-wider mr-2 ${m.role === 'assistant' ? 'text-forest-600 dark:text-forest-400' : 'text-emerald-600 dark:text-emerald-300'}`}>
                      {m.role === 'user' ? 'You' : 'Assistant'}
                    </span>
                    {m.content}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 text-sm text-forest-700 dark:text-gray-400 flex items-center gap-1.5"
                  >
                    <span className="font-semibold text-xs uppercase tracking-wider text-forest-600 dark:text-forest-400 mr-2">Assistant</span>
                    <span className="flex gap-1">
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0 }} className="h-1.5 w-1.5 bg-forest-400 rounded-full" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }} className="h-1.5 w-1.5 bg-forest-400 rounded-full" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }} className="h-1.5 w-1.5 bg-forest-400 rounded-full" />
                    </span>
                  </motion.div>
                )}
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
                  className="flex-1 rounded-2xl border border-forest-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-forest-400 dark:placeholder-gray-500 outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/40 transition-colors shadow-sm"
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
    [open, messages, input, isTyping],
  )

  return container
}

export default AssistantWidget
