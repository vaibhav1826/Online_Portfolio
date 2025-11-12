import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  DEFAULT_GITHUB_USERNAME,
  fetchGitHubProfile,
  fetchUserRepos,
  aggregateLanguages,
  type RepoLanguages,
} from '../../utils/githubAPI'
import { resumeSections, projectShowcase } from '../../utils/chartData'

type AssistantWidgetProps = {
  open: boolean
  onClose: () => void
}

type Message = { role: 'assistant' | 'user'; content: string }
type GHProfileLite = { name?: string; followers?: number; public_repos?: number; html_url?: string }

const SUGGESTIONS = [
  'How do I enable GitHub analytics?',
  'How do I configure EmailJS?',
  'How can I export my résumé to PDF?',
  'How is the GitHub heatmap generated?',
  'How do I deploy this?',
]

const AssistantWidget = ({ open, onClose }: AssistantWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi, I’m Vaibhav’s assistant. Ask about his skills, projects, contact, education, certificates, achievements, or GitHub activity. 🌿",
    },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)

  // Live data pulled strictly from Vaibhav's public sources and local resume
  const [profile, setProfile] = useState<GHProfileLite | null>(null)
  const [topLanguages, setTopLanguages] = useState<Array<{ name: string; percent: number }>>([])
  const [topRepos, setTopRepos] = useState<Array<{ name: string; stars: number; url: string }>>([])
  const [leetcode, setLeetcode] = useState<{ total?: number; easy?: number; med?: number; hard?: number } | null>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const gh = await fetchGitHubProfile(DEFAULT_GITHUB_USERNAME)
        if (!mounted) return
        setProfile(gh ? { name: gh.name, followers: gh.followers, public_repos: gh.public_repos, html_url: gh.html_url } : null)

        const repos = await fetchUserRepos(DEFAULT_GITHUB_USERNAME, { perPage: 50 })
        if (!mounted) return
        setTopRepos(
          repos
            .slice(0, 8)
            .map((r) => ({ name: r.name, stars: r.stargazers_count ?? 0, url: `https://github.com/${r.full_name}` }))
            .slice(0, 5),
        )

        const langs: RepoLanguages = await aggregateLanguages(repos)
        if (!mounted) return
        const total = Object.values(langs).reduce((a, b) => a + b, 0) || 1
        const top = Object.entries(langs)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, bytes]) => ({ name, percent: Math.round((bytes / total) * 100) }))
        setTopLanguages(top)

        // LeetCode quick stats
        try {
          const { fetchLeetCodeStats } = await import('../../utils/leetcodeAPI')
          const lc = await fetchLeetCodeStats('vaibhav1826')
          if (mounted && lc) {
            setLeetcode({
              total: lc.totalSolved,
              easy: lc.easySolved,
              med: lc.mediumSolved,
              hard: lc.hardSolved,
            })
          }
        } catch {
          // ignore
        }
      } catch {
        // Ignore errors; assistant will answer with available resume data
      }
    }
    void load()
    return () => {
      mounted = false
    }
  }, [])

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

    // Contact
    if (/(contact|email|linkedin|github|phone|mobile)/i.test(s)) {
      return [
        'Contact details:',
        '- Email: vaibhavbhatt145@gmail.com',
        '- LinkedIn: linkedin.com/in/vaibhav-bhatt-382971283/',
        '- GitHub: github.com/vaibhav1826',
        '- Mobile: +91 9058065003',
      ].join('\n')
    }

    // Summary / About
    if (/(who|about|summary|bio|profile)/i.test(s)) {
      const name = profile?.name ?? 'Vaibhav Bhatt'
      const followers = profile?.followers != null ? ` · ${profile.followers} followers` : ''
      const reposCount = profile?.public_repos != null ? ` · ${profile.public_repos} public repos` : ''
      return `${name} is a developer focused on modern web development and clean UI/UX. GitHub: github.com/vaibhav1826${followers}${reposCount}. Ask about skills, projects, education, or certificates.`
    }

    // Skills / Languages
    if (/(skills?|tech|stack|languages?)/i.test(s)) {
      const resumeSkills = resumeSections.find((x) => x.title.toLowerCase().includes('skills'))
      const lines = []
      if (topLanguages.length) {
        lines.push(
          'Top languages on GitHub: ' +
            topLanguages.map((l) => `${l.name} ${l.percent}%`).join(', '),
        )
      }
      if (resumeSkills) {
        resumeSkills.items.forEach((i) => {
          if (i.subtitle) lines.push(`${i.title}: ${i.subtitle}`)
        })
      }
      return lines.length ? lines.join('\n') : 'Skills information is currently unavailable.'
    }

    // Projects
    if (/(projects?|work|portfolio|repos?)/i.test(s)) {
      const featured = projectShowcase.map((p) => `- ${p.name}: ${p.description}`).join('\n')
      const repoList = topRepos.length
        ? '\nTop repositories:\n' + topRepos.map((r) => `- ${r.name} (★${r.stars}) — ${r.url}`).join('\n')
        : ''
      return `Highlighted projects:\n${featured}${repoList}`
    }

    // LeetCode
    if (/(leetcode|problems|dsa|practice)/i.test(s)) {
      if (!leetcode) return 'LeetCode stats are currently unavailable.'
      return `LeetCode: Solved ${leetcode.total ?? '—'} (E:${leetcode.easy ?? '—'} · M:${leetcode.med ?? '—'} · H:${leetcode.hard ?? '—'}) — Profile: https://leetcode.com/u/vaibhav1826/`
    }

    // Education
    if (/(education|college|university|school)/i.test(s)) {
      const ed = resumeSections.find((x) => x.title.toLowerCase().includes('education'))
      if (!ed) return 'Education details are not available.'
      return ed.items.map((i) => `- ${i.title}: ${i.subtitle}${i.period ? ` (${i.period})` : ''}`).join('\n')
    }

    // Certificates
    if (/(certificates?|courses?|nptel|internshala)/i.test(s)) {
      const cert = resumeSections.find((x) => x.title.toLowerCase().includes('certificates'))
      if (!cert) return 'Certificates are not available.'
      return cert.items.map((i) => `- ${i.title}${i.period ? ` (${i.period})` : ''}`).join('\n')
    }

    // Achievements
    if (/(achievements?|awards?|hackathon)/i.test(s)) {
      const ach = resumeSections.find((x) => x.title.toLowerCase().includes('achievements'))
      if (!ach) return 'Achievements are not available.'
      return ach.items.map((i) => `- ${i.title}${i.period ? ` (${i.period})` : ''}`).join('\n')
    }

    // Default help
    return "Ask about: skills, projects, contact, education, certificates, achievements, or GitHub languages/commits."
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
              className="absolute inset-0 bg-black/20"
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
                <h3 className="font-display text-xl">Assistant</h3>
                <button
                  className="rounded-full bg-white/60 px-3 py-1 text-sm text-charcoal/80 hover:bg-white"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className="rounded-full bg-white/60 px-3 py-1 text-xs text-charcoal/80 hover:bg-white"
                    onClick={() => handleAsk(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="max-h-72 overflow-y-auto rounded-2xl border border-white/30 bg-white/50 p-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`mb-2 whitespace-pre-wrap text-sm ${
                      m.role === 'assistant' ? 'text-charcoal/90' : 'text-charcoal'
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
                  placeholder="Ask about setup, analytics, or deployment…"
                  className="flex-1 rounded-2xl border border-white/40 bg-white/70 px-3 py-2 text-sm outline-none focus:border-sage focus:ring-2 focus:ring-sage/30"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-sage px-4 py-2 text-sm font-medium text-charcoal hover:bg-softgreen"
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

