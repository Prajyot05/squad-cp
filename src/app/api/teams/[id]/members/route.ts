import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { user_id } = await req.json()
    
    const team = await db.team.findUnique({ where: { id: params.id } })
    if (!team) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Allow owner to remove anyone, or anyone to remove themselves (leave)
    if (team.owner_id !== user.id && user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (user_id === team.owner_id) {
      return NextResponse.json({ error: 'Owner cannot leave team. Delete team instead.' }, { status: 400 })
    }

    await db.teamMember.delete({
      where: {
        team_id_user_id: { team_id: params.id, user_id }
      }
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
