'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Lobby from './Lobby'
import LiveContest from './LiveContest'
import Results from './Results'
import Standings from './Standings'

export default function ContestWrapper({ initialContest, currentUserId }: { initialContest: any, currentUserId: string }) {
  const [contest, setContest] = useState(initialContest)
  const [standings, setStandings] = useState(initialContest.participants)
  const supabase = createClient()

  const refreshData = async () => {
    const resStandings = await fetch(`/api/contests/${contest.id}/standings`, { cache: 'no-store' })
    if (resStandings.ok) {
      const data = await resStandings.json()
      setStandings(data.participants)
    }
    const resContest = await fetch(`/api/contests/${contest.id}`, { cache: 'no-store' })
    if (resContest.ok) {
      const data = await resContest.json()
      setContest((prev: any) => ({ ...prev, ...data.contest }))
    }
  }

  useEffect(() => {
    const channel = supabase
      .channel(`contest-${contest.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contest_participants', filter: `contest_id=eq.${contest.id}` },
        refreshData
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contests', filter: `id=eq.${contest.id}` },
        refreshData
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [contest.id, supabase])

  return (
    <div className="w-full mt-2 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
      <div className="lg:col-span-2 space-y-8">
        {contest.status === 'lobby' && <Lobby contest={contest} currentUserId={currentUserId} onStartSuccess={refreshData} />}
        {contest.status === 'active' && <LiveContest contest={contest} currentUserId={currentUserId} onSyncSuccess={refreshData} />}
        {contest.status === 'finished' && <Results contest={contest} standings={standings} currentUserId={currentUserId} />}
      </div>
      <div className="lg:col-span-1 lg:border-l lg:border-border lg:pl-6">
        <Standings participants={standings} />
      </div>
    </div>
  )
}
