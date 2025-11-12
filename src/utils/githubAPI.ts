export const DEFAULT_GITHUB_USERNAME = 'vaibhav1826'

export type GitHubProfile = {
  name: string
  followers: number
  public_repos: number
  public_gists: number
  avatar_url: string
  html_url: string
}

export type GitHubRepo = {
  name: string
  full_name: string
  fork: boolean
  stargazers_count: number
  language: string | null
  languages_url: string
  owner: { login: string }
}

export type RepoLanguages = Record<string, number>

const GITHUB_API_BASE = 'https://api.github.com'
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN

const ghHeaders: HeadersInit = TOKEN
  ? { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json' }
  : { Accept: 'application/vnd.github+json' }

export const fetchGitHubProfile = async (
  username: string = DEFAULT_GITHUB_USERNAME,
): Promise<GitHubProfile | null> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, { headers: ghHeaders })
    if (!response.ok) throw new Error('Network error')
    const data = (await response.json()) as GitHubProfile
    return data
  } catch (error) {
    console.warn('Failed to load GitHub profile', error)
    return null
  }
}

export const fetchUserRepos = async (
  username: string = DEFAULT_GITHUB_USERNAME,
  { perPage = 50 }: { perPage?: number } = {},
): Promise<GitHubRepo[]> => {
  const url = new URL(`${GITHUB_API_BASE}/users/${username}/repos`)
  url.searchParams.set('per_page', String(perPage))
  url.searchParams.set('sort', 'updated')
  const res = await fetch(url, { headers: ghHeaders })
  if (!res.ok) throw new Error('Failed to fetch repos')
  const repos = (await res.json()) as GitHubRepo[]
  // Prefer non-forks and some activity signal
  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
}

export const fetchRepoLanguages = async (repo: GitHubRepo): Promise<RepoLanguages> => {
  const res = await fetch(repo.languages_url, { headers: ghHeaders })
  if (!res.ok) throw new Error('Failed to fetch repo languages')
  return (await res.json()) as RepoLanguages
}

export const aggregateLanguages = async (repos: GitHubRepo[]): Promise<RepoLanguages> => {
  const results: RepoLanguages = {}
  // Limit to reduce rate consumption
  const sample = repos.filter((r) => !r.fork).slice(0, 20)
  for (const repo of sample) {
    try {
      const langs = await fetchRepoLanguages(repo)
      for (const [lang, bytes] of Object.entries(langs)) {
        results[lang] = (results[lang] ?? 0) + (bytes ?? 0)
      }
    } catch {
      // skip repo on error
    }
  }
  return results
}

export type WeeklyActivity = { week: number; total: number }

export const fetchCommitActivity = async (
  owner: string,
  repo: string,
): Promise<WeeklyActivity[] | null> => {
  // This endpoint can return 202 if not cached; retry a few times
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/commit_activity`
  for (let i = 0; i < 3; i++) {
    const res = await fetch(url, { headers: ghHeaders })
    if (res.status === 202) {
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)))
      continue
    }
    if (!res.ok) return null
    return (await res.json()) as WeeklyActivity[]
  }
  return null
}

export const aggregateWeeklyCommits = async (repos: GitHubRepo[]) => {
  const map = new Map<number, number>() // week(unix) -> total
  const sample = repos.filter((r) => !r.fork).slice(0, 15)
  for (const repo of sample) {
    const weeks = await fetchCommitActivity(repo.owner.login, repo.name)
    if (!weeks) continue
    for (const w of weeks) {
      map.set(w.week, (map.get(w.week) ?? 0) + (w.total ?? 0))
    }
  }
  // Convert to chronological array
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([week, total]) => ({ week, total }))
}

export const bucketCommitsMonthly = (weekly: { week: number; total: number }[]) => {
  const monthMap = new Map<string, number>()
  for (const w of weekly) {
    const d = new Date(w.week * 1000)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    monthMap.set(key, (monthMap.get(key) ?? 0) + w.total)
  }
  // Return last 12 months
  const entries = Array.from(monthMap.entries()).sort((a, b) => a[0].localeCompare(b[0]))
  const last12 = entries.slice(-12)
  return last12.map(([k, total]) => {
    const [y, m] = k.split('-')
    const month = new Date(Number(y), Number(m) - 1, 1).toLocaleString('en', { month: 'short' })
    return { month, commits: total }
  })
}

export const githubGardenTheme = {
  light: ['#E8F6EA', '#CBE6CF', '#A5D1AB', '#7BBE8C', '#4DA86A'],
  dark: ['#15302A', '#1F4637', '#285C45', '#317352', '#3A895F'],
}

