import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { computeScore } from '@/lib/scoring'

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const profile = await db.profile.findUnique({ where: { id: user.id } })
    if (!profile || !profile.cf_handle) {
      return NextResponse.json({ error: 'CF handle missing' }, { status: 400 })
    }

    const contest = await db.contest.findUnique({
      where: { id: params.id },
      include: {
        problems: { include: { problem: true } }
      }
    })

    if (!contest || contest.status !== 'active' || !contest.started_at) {
      return NextResponse.json({ error: 'Contest not active' }, { status: 400 })
    }

    const res = await fetch(`https://codeforces.com/api/user.status?handle=${profile.cf_handle}`)
    const data = await res.json()
    if (data.status !== "OK") {
      return NextResponse.json({ error: 'CF API error' }, { status: 502 })
    }

    const submissions = data.result
    let totalScore = 0
    let problemsSolved = 0
    let lastSolveSec = 0
    
    const contestStartTime = Math.floor(new Date(contest.started_at).getTime() / 1000)
    const contestEndTime = contestStartTime + contest.duration_min * 60

    for (const cp of contest.problems) {
      const p = cp.problem
      const problemSubs = submissions.filter((s: any) => 
        s.problem.contestId === p.cf_contest_id && 
        s.problem.index === p.cf_index &&
        s.creationTimeSeconds >= contestStartTime &&
        s.creationTimeSeconds <= contestEndTime
      )
      
      problemSubs.sort((a: any, b: any) => a.creationTimeSeconds - b.creationTimeSeconds)

      let solved = false
      let solveTimeMin: number | null = null
      let solveTimeSec: number = 0
      let wrongAttempts = 0

      for (const sub of problemSubs) {
        if (sub.verdict === 'OK') {
          solved = true
          solveTimeSec = sub.creationTimeSeconds - contestStartTime
          solveTimeMin = Math.floor(solveTimeSec / 60)
          break
        } else {
          if (sub.verdict !== 'COMPILATION_ERROR') {
            wrongAttempts++
          }
        }
      }

      const score = computeScore(cp.max_points, solveTimeMin, wrongAttempts)
      totalScore += score

      if (solved) {
        problemsSolved++
        lastSolveSec = Math.max(lastSolveSec, solveTimeSec)
      }

      // Upsert into submissions table
      if (problemSubs.length > 0) {
        const firstAC = problemSubs.find((s: any) => s.verdict === 'OK')
        const bestSub = firstAC || problemSubs[problemSubs.length - 1]
        
        await db.submission.deleteMany({
          where: { contest_id: contest.id, user_id: user.id, problem_slot: cp.slot }
        })
        
        await db.submission.create({
          data: {
            contest_id: contest.id,
            user_id: user.id,
            problem_slot: cp.slot,
            verdict: bestSub.verdict === 'OK' ? 'AC' : bestSub.verdict === 'TIME_LIMIT_EXCEEDED' ? 'TLE' : bestSub.verdict === 'WRONG_ANSWER' ? 'WA' : 'RE',
            score: solved ? score : 0,
            elapsed_sec: bestSub.creationTimeSeconds - contestStartTime
          }
        })
      }
    }

    await db.contestParticipant.update({
      where: { contest_id_user_id: { contest_id: contest.id, user_id: user.id } },
      data: {
        total_score: totalScore,
        problems_solved: problemsSolved,
        last_solve_sec: lastSolveSec > 0 ? lastSolveSec : null
      }
    })

    return NextResponse.json({ success: true, totalScore, problemsSolved })
  } catch (err: any) {
    console.error('Contest sync error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred while syncing data.' }, { status: 500 })
  }
}
