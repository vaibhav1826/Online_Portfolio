export type LeetCodeCalendar = Record<string, number> // unix timestamp (seconds) -> submissions
export type LeetCodeStats = {
  username: string
  totalSolved?: number
  easySolved?: number
  mediumSolved?: number
  hardSolved?: number
  submissionCalendar?: LeetCodeCalendar
}

const withTimeout = async <T>(promise: Promise<T>, ms = 4000): Promise<T> => {
  return await Promise.race<T>([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)) as unknown as Promise<T>,
  ])
}

// Try a few public community endpoints; gracefully degrade to stats-only if calendar unavailable
export const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStats | null> => {
  const candidates = [
    // Provides rich stats, sometimes calendar missing
    async () => {
      const res = await withTimeout(fetch(`https://leetcode-stats-api.herokuapp.com/${username}`))
      if (!res.ok) throw new Error('stats api failed')
      const data = (await res.json()) as any
      return {
        username,
        totalSolved: data.totalSolved,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved,
      } as LeetCodeStats
    },
    // Community API that can return recentSubmissionCalendar as object
    async () => {
      const res = await withTimeout(fetch(`https://alfa-leetcode-api.onrender.com/${username}`))
      if (!res.ok) throw new Error('render api failed')
      const data = (await res.json()) as any
      const calendar: LeetCodeCalendar | undefined = data?.submissionsCalendar ?? data?.submissionCalendar
      return {
        username,
        totalSolved: data?.totalSolved ?? data?.total_problems_solved,
        easySolved: data?.easySolved ?? data?.easy_questions_solved,
        mediumSolved: data?.mediumSolved ?? data?.medium_questions_solved,
        hardSolved: data?.hardSolved ?? data?.hard_questions_solved,
        submissionCalendar: calendar,
      } as LeetCodeStats
    },
  ]

  for (const run of candidates) {
    try {
      const result = await run()
      if (result) return result
    } catch {
      // try next
    }
  }
  return null
}

export const normalizeCalendar = (calendar?: LeetCodeCalendar) => {
  if (!calendar) return [] as Array<{ date: string; count: number }>
  const entries = Object.entries(calendar)
  return entries
    .map(([ts, count]) => {
      const date = new Date(Number(ts) * 1000)
      // format YYYY-MM-DD for heatmap lib
      const d = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate(),
      ).padStart(2, '0')}`
      return { date: d, count: Number(count) || 0 }
    })
    .sort((a, b) => (a.date < b.date ? -1 : 1))
}

