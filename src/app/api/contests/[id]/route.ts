import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params
    const contest = await db.contest.findUnique({
      where: { id: params.id },
      include: {
        creator: { select: { username: true } },
        problems: { include: { problem: true }, orderBy: { slot: 'asc' } },
        participants: {
          include: { user: { select: { username: true, cf_handle: true, skill_rating: true, current_level: true } } },
        },
        submissions: true
      }
    })
    
    if (!contest) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    
    return NextResponse.json({ contest })
  } catch (err: any) {
    console.error('Fetch contest error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred while fetching the contest.' }, { status: 500 })
  }
}
