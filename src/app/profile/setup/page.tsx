import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import SetupForm from './SetupForm'

export default async function ProfileSetupPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const profile = await db.profile.findUnique({
    where: { id: user.id }
  })

  if (profile) {
    redirect('/')
  }

  return <SetupForm userId={user.id} />
}
