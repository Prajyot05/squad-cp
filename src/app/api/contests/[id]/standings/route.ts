import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params
    const participants = await db.contestParticipant.findMany({
      where: { contest_id: params.id },
      include: {
        user: { select: { username: true, cf_handle: true } }
      }
    })
    
    return NextResponse.json({ participants })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
