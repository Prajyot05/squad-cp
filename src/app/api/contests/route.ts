import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { selectProblems } from '@/lib/problems'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { title, level, duration_min, tag_filter, is_team_mode, team_id } = await req.json()

    if (!title || !level || !duration_min) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const tags = tag_filter && tag_filter.length > 0 ? tag_filter : null

    // 1. Select problems synchronously
    const problems = await selectProblems(level, tags)

    let participantsToCreate: { user_id: string }[] = [{ user_id: user.id }]
    let notificationsToCreate: any[] = []

    if (is_team_mode && team_id) {
      const team = await db.team.findUnique({
        where: { id: team_id },
        include: { members: true, owner: true }
      })
      if (team) {
        participantsToCreate = team.members.map(m => ({ user_id: m.user_id }))
        
        notificationsToCreate = team.members
          .filter(m => m.user_id !== user.id)
          .map(m => ({
            user_id: m.user_id,
            team_id: team.id,
            type: 'contest_created',
            title: 'New Team Contest',
            message: `${team.name} has a new contest created. Join the lobby!`,
          }))
      }
    }

    // 2. Create Contest
    const contest = await db.contest.create({
      data: {
        title,
        level,
        duration_min,
        tag_filter: tags || [],
        creator_id: user.id,
        is_team_mode: is_team_mode || false,
        team_id: is_team_mode ? team_id : null,
        status: 'lobby',
        problems: {
          create: problems.map((p, idx) => ({
            problem_id: p.id,
            slot: idx,
            max_points: [250, 500, 750, 1000][idx]
          }))
        },
        participants: {
          create: participantsToCreate
        },
        ...(notificationsToCreate.length > 0 && {
          notifications: {
            create: notificationsToCreate
          }
        })
      }
    })

    return NextResponse.json({ contestId: contest.id, inviteCode: contest.invite_code })
  } catch (err: any) {
    console.error('Contest creation error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred while creating the contest.' }, { status: 500 })
  }
}
