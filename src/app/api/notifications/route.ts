import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Auto-cleanup: Delete notifications older than 2 hours
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)
    await db.notification.deleteMany({
      where: {
        user_id: user.id,
        created_at: { lt: twoHoursAgo }
      }
    })

    const notifications = await db.notification.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: 'desc' },
      take: 20
    })

    return NextResponse.json({ notifications })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { ids } = await req.json()
    
    if (ids && Array.isArray(ids) && ids.length > 0) {
      await db.notification.updateMany({
        where: { id: { in: ids }, user_id: user.id },
        data: { is_read: true }
      })
    } else {
      // Mark all as read
      await db.notification.updateMany({
        where: { user_id: user.id, is_read: false },
        data: { is_read: true }
      })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
