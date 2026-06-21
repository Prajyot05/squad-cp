import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { updateSkillRating, evaluateLevelProgression } from '@/lib/ratings'

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const contest = await db.contest.findUnique({
      where: { id: params.id },
      include: {
        problems: { include: { problem: true } },
        participants: { include: { user: true } },
        submissions: true
      }
    })

    if (!contest || contest.status !== 'active') {
      return NextResponse.json({ error: 'Contest not active' }, { status: 400 })
    }

    if (contest.creator_id !== user.id) {
      return NextResponse.json({ error: 'Only creator can end' }, { status: 403 })
    }

    const participantCount = contest.participants.length
    const hasTagFilter = contest.tag_filter.length > 0

    const sortedParticipants = [...contest.participants].sort((a, b) => {
      if (a.total_score !== b.total_score) return b.total_score - a.total_score
      return (a.last_solve_sec || 0) - (b.last_solve_sec || 0)
    })

    await db.$transaction(async (tx: any) => {
      for (let i = 0; i < sortedParticipants.length; i++) {
        const p = sortedParticipants[i]
        const rank = i + 1

        const userSubs = contest.submissions.filter((s: any) => s.user_id === p.user_id)
        
        const problemResults = contest.problems.map((cp: any) => {
          const sub = userSubs.find((s: any) => s.problem_slot === cp.slot)
          const solved = sub?.verdict === 'AC'
          return {
            rating: cp.problem.rating,
            solved,
            solveTimeMin: solved ? Math.floor(sub!.elapsed_sec / 60) : null
          }
        })

        const currentSkill = { rating: p.user.skill_rating, contestsPlayed: p.user.skill_contests }
        const newSkill = updateSkillRating(currentSkill, problemResults, contest.duration_min, participantCount, hasTagFilter)
        
        let solveTimeFraction: number | null = null
        if (p.last_solve_sec) {
          solveTimeFraction = p.last_solve_sec / (contest.duration_min * 60)
        }
        
        const newLevelData = evaluateLevelProgression(p.user.current_level, p.problems_solved, solveTimeFraction)

        // Update Participant
        await tx.contestParticipant.update({
          where: { id: p.id },
          data: {
            final_rank: rank,
            skill_before: currentSkill.rating,
            skill_after: newSkill.rating,
            level_before: p.user.current_level,
            level_after: newLevelData.newLevel
          }
        })

        // Insert RatingHistory
        await tx.ratingHistory.create({
          data: {
            user_id: p.user_id,
            contest_id: contest.id,
            skill_before: currentSkill.rating,
            skill_after: newSkill.rating,
            level_before: p.user.current_level,
            level_after: newLevelData.newLevel,
            rank,
            problems_solved: p.problems_solved,
            total_score: p.total_score
          }
        })

        // Update Profile
        await tx.profile.update({
          where: { id: p.user_id },
          data: {
            skill_rating: newSkill.rating,
            skill_contests: newSkill.contestsPlayed,
            current_level: newLevelData.newLevel,
            highest_level: Math.max(p.user.highest_level, newLevelData.newLevel)
          }
        })
      }

      await tx.contest.update({
        where: { id: contest.id },
        data: {
          status: 'finished',
          ended_at: new Date()
        }
      })
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
