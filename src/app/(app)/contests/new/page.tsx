import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import CreateContestForm from '@/components/contest/CreateContestForm'

export default async function CreateContestPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const profile = await db.profile.findUnique({ where: { id: user.id } })

  return <CreateContestForm suggestedLevel={profile?.current_level || 1} />
}
