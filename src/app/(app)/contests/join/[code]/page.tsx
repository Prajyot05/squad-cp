import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export default async function JoinContestPage(props: { params: Promise<{ code: string }> }) {
  const params = await props.params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const contest = await db.contest.findUnique({
    where: { invite_code: params.code }
  })

  if (!contest) {
    return <div className="p-10 text-center text-xl text-destructive">Invalid or expired invite link.</div>
  }

  await db.contestParticipant.upsert({
    where: {
      contest_id_user_id: { contest_id: contest.id, user_id: user.id }
    },
    update: {},
    create: {
      contest_id: contest.id,
      user_id: user.id
    }
  })

  redirect(`/contests/${contest.id}`)
}
