'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function JoinTeamPage() {
  const params = useParams<{ code: string }>()
  const router = useRouter()

  useEffect(() => {
    const joinTeam = async () => {
      try {
        const res = await fetch(`/api/teams/join/${params.code}`, { method: 'POST' })
        const data = await res.json()

        if (!res.ok) {
          toast.error(data.error || 'Failed to join team')
          router.push('/teams')
          return
        }

        toast.success('Successfully joined team!')
        router.push(`/teams/${data.teamId}`)
      } catch (err: any) {
        toast.error('Failed to join team')
        router.push('/teams')
      }
    }

    joinTeam()
  }, [params.code, router])

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
      <p className="text-neutral-500">Joining team...</p>
    </div>
  )
}
