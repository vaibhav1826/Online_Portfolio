import { useEffect, useMemo, useState } from 'react'
import GitHubCalendar from 'react-github-calendar'
import { motion } from 'framer-motion'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'
import {
  DEFAULT_GITHUB_USERNAME,
  fetchGitHubProfile,
  githubGardenTheme,
  type GitHubProfile,
} from '../../utils/githubAPI'

type GrowthGardenProps = {
  id: string
}

const GrowthGarden = ({ id }: GrowthGardenProps) => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [username] = useState(DEFAULT_GITHUB_USERNAME)

  useEffect(() => {
    let mounted = true
    const loadProfile = async () => {
      const data = await fetchGitHubProfile(username)
      if (mounted) setProfile(data)
    }
    void loadProfile()
    return () => {
      mounted = false
    }
  }, [username])

  const summary = useMemo(() => {
    if (!profile) return null
    return [
      { label: 'Followers', value: profile.followers },
      { label: 'Public Repos', value: profile.public_repos },
      { label: 'Public Gists', value: profile.public_gists },
    ]
  }, [profile])

  const summaryFallback = [
    { label: 'Followers', value: '—' },
    { label: 'Public Repos', value: '—' },
    { label: 'Public Gists', value: '—' },
  ]

  const metricCards = summary ?? summaryFallback

  return (
    <section id={id} className="relative flex flex-col gap-10">
      <SectionTitle
        eyebrow="growth garden"
        title="Code commits nurtured daily"
        subtitle="A gentle snapshot of how consistent practice keeps this portfolio alive. Each leaf represents a day of progress."
      />

      <AnimatedCard className="space-y-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.name ?? username}
                className="h-16 w-16 rounded-2xl border border-white/40 shadow-bloom"
              />
            ) : null}
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-charcoal/60">
                github pulse
              </p>
              <h3 className="font-display text-2xl">{profile?.name ?? username}</h3>
              <a
                href={profile?.html_url ?? `https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-sage underline decoration-dotted underline-offset-4"
              >
                Visit GitHub profile
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            {metricCards.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/30 px-5 py-4 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-charcoal/60">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-2xl">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-white/30 bg-white/20 p-6">
          <GitHubCalendar
            username={username}
            blockMargin={6}
            blockRadius={6}
            blockSize={18}
            showWeekdayLabels
            theme={githubGardenTheme}
            labels={{
              totalCount: `Total commits in ${new Date().getFullYear()}:`,
              legend: { less: 'Calm', more: 'Blooming' },
            }}
            hideColorLegend={false}
            colorScheme="light"
          />
        </div>

        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-softgreen/50 to-sage/50 px-5 py-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-charcoal/60">
              daily bloom
            </p>
            <p className="text-sm text-charcoal/70">
              Hover over a leaf to see the story of that day&apos;s commits.
            </p>
          </div>
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌿
          </motion.span>
        </motion.div>
      </AnimatedCard>
    </section>
  )
}

export default GrowthGarden

