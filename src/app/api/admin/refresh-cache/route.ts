import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin'
import { db } from '@/lib/db'

const escapeSql = (str: string) => "'" + str.replace(/'/g, "''") + "'"

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!isAdmin(user?.user_metadata?.user_name)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const res = await fetch("https://codeforces.com/api/problemset.problems")
    const data = await res.json()

    if (data.status !== "OK") {
      return NextResponse.json({ error: 'CF API down' }, { status: 502 })
    }

    const problems = data.result.problems
    const stats = data.result.problemStatistics
    const solveMap = new Map(
      stats.map((s: any) => [`${s.contestId}-${s.index}`, s.solvedCount])
    )

    // Filter to contestId >= 1600 and rated
    const filtered = problems.filter(
      (p: any) => p.rating && p.contestId >= 1600
    )

    const BATCH_SIZE = 500
    let upserted = 0

    for (let i = 0; i < filtered.length; i += BATCH_SIZE) {
      const batch = filtered.slice(i, i + BATCH_SIZE)

      const values = batch.map((p: any) => {
        const tags = p.tags ? p.tags.map((t: string) => escapeSql(t)).join(",") : ""
        return `(${p.contestId}, '${p.index}', ${escapeSql(p.name)}, ${p.rating}, ARRAY[${tags}]::text[], ${solveMap.get(`${p.contestId}-${p.index}`) || 0}, NOW())`
      })

      await db.$executeRawUnsafe(`
        INSERT INTO problem_cache (cf_contest_id, cf_index, name, rating, tags, solved_count, fetched_at)
        VALUES ${values.join(", ")}
        ON CONFLICT (cf_contest_id, cf_index)
        DO UPDATE SET
          solved_count = EXCLUDED.solved_count,
          rating = EXCLUDED.rating,
          tags = EXCLUDED.tags,
          fetched_at = NOW()
      `)

      upserted += batch.length
    }

    return NextResponse.json({ upserted, filtered: filtered.length })
  } catch (err: any) {
    console.error("Cache refresh error:", err)
    return NextResponse.json({ error: 'An unexpected error occurred while refreshing the cache.' }, { status: 500 })
  }
}
