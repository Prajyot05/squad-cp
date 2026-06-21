import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { isAdmin } from '@/lib/admin'
import Navbar from '@/components/Navbar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const profile = await db.profile.findUnique({ where: { id: user.id } })

  if (!profile) {
    redirect('/profile/setup')
  }

  const isAdminUser = isAdmin(user.user_metadata?.user_name)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isAdminUser={isAdminUser} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">{children}</main>
    </div>
  )
}
