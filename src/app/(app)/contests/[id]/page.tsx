import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import ContestWrapper from '@/components/contest/ContestWrapper'

export default async function ContestPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const contestId = params.id

  const contest = await db.contest.findUnique({
    where: { id: contestId },
    include: {
      creator: { select: { username: true } },
      problems: {
        include: { problem: true },
        orderBy: { slot: 'asc' }
      },
      participants: {
        include: { user: { select: { username: true, cf_handle: true, skill_rating: true, current_level: true } } },
      }
    }
  })

  if (!contest) notFound()

  const isParticipant = contest.participants.some((p: any) => p.user_id === user.id)
  if (!isParticipant) {
    return (
      <div className="p-10 text-center mt-10 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">You are not in this contest.</h2>
        <a href={`/contests/join/${contest.invite_code}`} className="text-primary hover:underline">Join via Invite Code</a>
      </div>
    )
  }

  return (
    <ContestWrapper 
      initialContest={contest} 
      currentUserId={user.id} 
    />
  )
}
