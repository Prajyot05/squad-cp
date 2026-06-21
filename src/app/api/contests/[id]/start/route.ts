import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const contest = await db.contest.findUnique({ where: { id: params.id } })
    if (!contest) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    
    if (contest.creator_id !== user.id) {
      return NextResponse.json({ error: 'Only creator can start' }, { status: 403 })
    }

    await db.contest.update({
      where: { id: params.id },
      data: {
        status: 'active',
        started_at: new Date()
      }
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
