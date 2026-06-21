'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Lobby({ contest, currentUserId }: { contest: any, currentUserId: string }) {
  const [loading, setLoading] = useState(false)
  
  const isCreator = contest.creator_id === currentUserId
  const inviteLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/contests/join/${contest.invite_code}`

  const handleStart = async () => {
    setLoading(true)
    await fetch(`/api/contests/${contest.id}/start`, { method: 'POST' })
    setLoading(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{contest.title}</CardTitle>
        <CardDescription>
          Level {contest.level} • {contest.duration_min} minutes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Invite Link</h3>
          <div className="flex gap-2">
            <input type="text" readOnly value={inviteLink} className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm" />
            <Button variant="secondary" onClick={copyLink}>Copy</Button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Configuration</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Level {contest.level}</Badge>
            <Badge variant="outline">{contest.duration_min} min</Badge>
            {contest.tag_filter.map((t: string) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>

        {isCreator && (
          <div className="pt-4 border-t">
            <Button onClick={handleStart} disabled={loading} className="w-full">
              {loading ? 'Starting...' : 'Start Contest'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
