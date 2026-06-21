import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { selectProblems } from '@/lib/problems'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { title, level, duration_min, tag_filter } = await req.json()

    if (!title || !level || !duration_min) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const tags = tag_filter && tag_filter.length > 0 ? tag_filter : null

    // 1. Select problems synchronously
    const problems = await selectProblems(level, tags)

    // 2. Create Contest
    const contest = await db.contest.create({
      data: {
        title,
        level,
        duration_min,
        tag_filter: tags || [],
        creator_id: user.id,
        status: 'lobby',
        problems: {
          create: problems.map((p, idx) => ({
            problem_id: p.id,
            slot: idx,
            max_points: [250, 500, 750, 1000][idx]
          }))
        },
        participants: {
          create: {
            user_id: user.id,
            // Creator auto-joins
          }
        }
      }
    })

    return NextResponse.json({ contestId: contest.id, inviteCode: contest.invite_code })
  } catch (err: any) {
    console.error('Contest creation error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
