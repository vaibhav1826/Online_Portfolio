import { useEffect, useMemo, useState } from 'react'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'
import {
  bucketCommitsMonthly,
  fetchUserRepos,
  aggregateLanguages,
  type RepoLanguages,
} from '../../utils/githubAPI'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type AnalyticsDashboardProps = {
  id: string
}

const PIE_COLORS = ['#86A789', '#A5C9A1', '#1C2520', '#DCEFE1', '#5F7F64', '#98B89B']

const AnalyticsDashboard = ({ id }: AnalyticsDashboardProps) => {
  const [languages, setLanguages] = useState<RepoLanguages | null>(null)
  const [commitMonthly, setCommitMonthly] = useState<Array<{ month: string; commits: number }> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true)
        const repos = await fetchUserRepos()
        const langs = await aggregateLanguages(repos)
        if (!mounted) return
        setLanguages(langs)

        // commit activity per repo -> monthly aggregate
        const { aggregateWeeklyCommits } = await import('../../utils/githubAPI')
        const weekly = await aggregateWeeklyCommits(repos)
        if (!mounted) return
        setCommitMonthly(bucketCommitsMonthly(weekly))
      } catch (e) {
        setError('Unable to load live analytics from GitHub right now.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    void load()
    return () => {
      mounted = false
    }
  }, [])

  const languagePie = useMemo(() => {
    if (!languages) return []
    const total = Object.values(languages).reduce((a, b) => a + b, 0) || 1
    return Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, bytes]) => ({ name, value: Math.round((bytes / total) * 100) }))
  }, [languages])

  const barApprox = useMemo(() => {
    if (!languages) return []
    return Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, bytes]) => ({ skill: name, projects: Math.max(1, Math.round(Math.log10(bytes + 1) * 3)), impact: Math.max(50, Math.min(95, Math.round(Math.log2(bytes + 2) * 10))) }))
  }, [languages])

  return (
    <section id={id} className="flex flex-col gap-10">
      <SectionTitle
        eyebrow="analytics hub"
        title="Insights that nurture growth"
        subtitle="Live insights from your GitHub activity: languages palette, recent commit rhythm, and area focus."
      />

      <div className="grid gap-8 md:grid-cols-2">
        {error ? (
          <div className="md:col-span-2 text-sm text-red-700">{error}</div>
        ) : null}

        <AnimatedCard className="col-span-1 h-[320px]">
          <h3 className="font-display text-xl">Language Palette</h3>
          <p className="text-sm text-charcoal/60">
            Aggregated across your repositories (top 6 by usage).
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={languagePie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="55%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {languagePie.map((entry, index) => (
                  <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}%`, name]}
                contentStyle={{
                  borderRadius: 16,
                  border: '1px solid rgba(134, 167, 137, 0.35)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </AnimatedCard>

        <AnimatedCard className="col-span-1 h-[320px]">
          <h3 className="font-display text-xl">Commit Rhythm</h3>
          <p className="text-sm text-charcoal/60">
            Sum of weekly activity across your repos, shown by month (last 12).
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={commitMonthly ?? []} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" stroke="#1C2520" />
              <YAxis stroke="#1C2520" />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: '1px solid rgba(28, 37, 32, 0.25)',
                }}
              />
              <Line
                type="monotone"
                dataKey="commits"
                stroke="#86A789"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </AnimatedCard>

        <AnimatedCard className="md:col-span-2">
          <h3 className="font-display text-xl">Skill Bloom Index</h3>
          <p className="text-sm text-charcoal/60">
            Approximated from language usage distribution to indicate focus areas.
          </p>
          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barApprox} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip
                  formatter={(value: number, name: string) =>
                    name === 'projects' ? [`${value} repos (approx)`, 'Repos'] : [`Focus ${value}`, 'Focus']
                  }
                  contentStyle={{
                    borderRadius: 16,
                    border: '1px solid rgba(28, 37, 32, 0.25)',
                  }}
                />
                <Legend />
                <Bar dataKey="projects" fill="#86A789" radius={[6, 6, 0, 0]} />
                <Bar dataKey="impact" fill="#1C2520" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>

        {loading ? (
          <div className="md:col-span-2 text-sm text-charcoal/60">Loading live analytics…</div>
        ) : null}
      </div>
    </section>
  )
}

export default AnalyticsDashboard

