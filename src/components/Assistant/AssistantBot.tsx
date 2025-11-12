import { useEffect, useRef, useState } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const KB: Array<{ q: RegExp; a: string }> = [
  { q: /garden|github|heatmap|growth/i, a: 'Growth Garden shows your GitHub contributions (commits heatmap) via react-github-calendar using username vaibhav1826.' },
  { q: /analytics|languages|charts|commits/i, a: 'Analytics aggregates languages from repo language breakdown and sums weekly commit activity across repos, then buckets by month.' },
  { q: /projects|cards|showcase/i, a: 'Projects Showcase highlights key projects with tech stack, impact, and links. Update src/utils/chartData.ts to change items.' },
  { q: /resume|pdf|export/i, a: 'Dynamic Resume expands by section and exports to PDF using react-to-print. Your contact header is included in the export.' },
  { q: /contact|email|emailjs/i, a: 'Contact uses EmailJS. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY to .env to enable sending.' },
  { q: /token|rate|github api/i, a: 'Add VITE_GITHUB_TOKEN in .env to increase GitHub API limits and reduce commit stats warm-up time.' },
  { q: /stack|tech|libraries/i, a: 'Stack: React + Vite, Tailwind CSS, Framer Motion, Lottie, Recharts, react-github-calendar. Optional: EmailJS.' },
]

const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY

const AssistantBot = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi, I’m your portfolio assistant. Ask me about sections, setup, or how to customize anything here.' },
  ])
  const [input, setInput] = useState('')
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const toggle = () => setOpen((v) => !v)
    const handler = () => toggle()
    window.addEventListener('assistant:toggle', handler as EventListener)
    return () => window.removeEventListener('assistant:toggle', handler as EventListener)
  }, [])

  useEffect(() => {
    if (!open) return
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight })
  }, [messages, open])

  const localAnswer = (question: string) => {
    for (const entry of KB) {
      if (entry.q.test(question)) return entry.a
    }
    return "Here's how this portfolio works: Intro → Garden → Analytics → Projects → Resume → Contact. Ask me about any piece, or type 'help' for guidance."
  }

  const send = async () => {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { role: 'user', content: text }])
    setInput('')

    // Try local KB first
    const fallback = localAnswer(text)
    let answer = fallback

    // Optional OpenAI fallback
    if (OPENAI_KEY) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are a helpful portfolio assistant for Vaibhav Bhatt’s site. Be concise and practical.' },
              { role: 'user', content: text },
            ],
          }),
        })
        if (res.ok) {
          const data = await res.json()
          answer = data.choices?.[0]?.message?.content ?? fallback
        }
      } catch {
        // ignore network errors and keep fallback
      }
    }
    setMessages((m) => [...m, { role: 'assistant', content: answer }])
  }

  if (!open) return null

  return (
    <div className="fixed bottom-20 right-6 z-50 w-[360px] max-w-[92vw] rounded-3xl border border-white/30 bg-white/80 shadow-bloom backdrop-blur-md">
      <div className="flex items-center justify-between gap-2 border-b border-white/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <h4 className="font-display text-base text-charcoal">Assistant</h4>
        </div>
        <button onClick={() => setOpen(false)} className="rounded-full px-2 py-1 text-sm text-charcoal/70 hover:text-charcoal">
          Close
        </button>
      </div>
      <div ref={boxRef} className="max-h-[320px] overflow-y-auto px-4 py-3">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-2xl px-3 py-2 text-sm ${m.role === 'user' ? 'bg-sage/70 text-charcoal' : 'bg-white/70 text-charcoal'} max-w-[80%]`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-white/30 px-3 py-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about this project..."
          className="flex-1 rounded-2xl border border-white/40 bg-white/70 px-3 py-2 text-sm outline-none focus:border-sage focus:ring-2 focus:ring-sage/40"
        />
        <button onClick={send} className="rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-mint hover:bg-[#131a16]">
          Send
        </button>
      </div>
    </div>
  )
}

export default AssistantBot

