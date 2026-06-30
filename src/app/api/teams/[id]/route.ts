import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const team = await db.team.findUnique({
      where: { id: params.id },
      include: {
        owner: { select: { username: true } },
        members: {
          include: {
            user: { select: { username: true, cf_handle: true, skill_rating: true, current_level: true } }
          },
          orderBy: { joined_at: 'asc' }
        },
        contests: {
          orderBy: { created_at: 'desc' },
          take: 5
        }
      }
    })

    if (!team) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const isMember = team.members.some(m => m.user_id === user.id)
    if (!isMember) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    return NextResponse.json({ team })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { name, description } = await req.json()
    
    const team = await db.team.findUnique({ where: { id: params.id } })
    if (!team) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (team.owner_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const updated = await db.team.update({
      where: { id: params.id },
      data: { name, description }
    })

    return NextResponse.json({ team: updated })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const team = await db.team.findUnique({ where: { id: params.id } })
    if (!team) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (team.owner_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    await db.team.delete({ where: { id: params.id } })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
