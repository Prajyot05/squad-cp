import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const teams = await db.team.findMany({
      where: {
        members: {
          some: { user_id: user.id }
        }
      },
      include: {
        owner: { select: { username: true } },
        _count: { select: { members: true } }
      },
      orderBy: { created_at: 'desc' }
    })

    return NextResponse.json({ teams })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { name, description } = await req.json()
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

    const team = await db.team.create({
      data: {
        name,
        description,
        owner_id: user.id,
        members: {
          create: {
            user_id: user.id,
            role: 'owner'
          }
        }
      }
    })

    return NextResponse.json({ team })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
