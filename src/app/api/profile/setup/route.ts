import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const { username, cfHandle } = await req.json()
    
    if (!username) return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    if (!cfHandle) return NextResponse.json({ error: 'Codeforces handle is required' }, { status: 400 })

    const existingUser = await db.profile.findUnique({ where: { username } })
    if (existingUser) return NextResponse.json({ error: 'Username is already taken' }, { status: 400 })

    await db.profile.create({
      data: {
        id: user.id,
        username,
        cf_handle: cfHandle,
        avatar_url: user.user_metadata.avatar_url || null
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Profile setup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
