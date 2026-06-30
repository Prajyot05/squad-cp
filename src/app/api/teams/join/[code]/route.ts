import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function POST(req: Request, props: { params: Promise<{ code: string }> }) {
  try {
    const params = await props.params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const team = await db.team.findUnique({
      where: { invite_code: params.code }
    })

    if (!team) {
      return NextResponse.json({ error: 'Invalid invite code' }, { status: 404 })
    }

    await db.teamMember.upsert({
      where: {
        team_id_user_id: { team_id: team.id, user_id: user.id }
      },
      update: {},
      create: {
        team_id: team.id,
        user_id: user.id,
        role: 'member'
      }
    })

    return NextResponse.json({ success: true, teamId: team.id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
