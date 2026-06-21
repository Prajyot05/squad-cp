import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import AdminClientPage from './AdminClientPage'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!isAdmin(user?.email)) {
    redirect('/')
  }

  const count = await db.problemCache.count()
  const lastFetched = await db.problemCache.findFirst({
    orderBy: { fetched_at: 'desc' },
    select: { fetched_at: true }
  })

  return <AdminClientPage initialCount={count} lastFetched={lastFetched?.fetched_at} />
}
