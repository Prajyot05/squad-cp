'use client'

import { useState, useEffect } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export default function LiveContest({ contest, currentUserId }: { contest: any, currentUserId: string }) {
  const [timeLeft, setTimeLeft] = useState(0)
  const [syncing, setSyncing] = useState(false)

  const durationSecs = contest.duration_min * 60
  
  useEffect(() => {
    if (!contest.started_at) return
    const end = new Date(contest.started_at).getTime() + durationSecs * 1000
    
    const intv = setInterval(() => {
      const now = new Date().getTime()
      const rem = Math.max(0, Math.floor((end - now) / 1000))
      setTimeLeft(rem)
      
      if (rem === 0) {
        clearInterval(intv)
      }
    }, 1000)
    
    return () => clearInterval(intv)
  }, [contest.started_at, durationSecs])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const progress = 100 - (timeLeft / durationSecs) * 100

  const handleSync = async () => {
    setSyncing(true)
    await fetch(`/api/contests/${contest.id}/sync`, { method: 'POST' })
    setSyncing(false)
  }

  const handleEnd = async () => {
    if (confirm('Are you sure you want to end the contest for everyone?')) {
      await fetch(`/api/contests/${contest.id}/end`, { method: 'POST' })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle>{contest.title}</CardTitle>
            <div className="text-2xl font-mono tracking-tighter">
              {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Solve problems on Codeforces, then sync your status to update the standings.
            </p>
            <Button onClick={handleSync} disabled={syncing}>
              {syncing ? 'Syncing...' : '🔄 Sync Status'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contest.problems.map((cp: any, idx: number) => {
          const letter = String.fromCharCode(65 + idx)
          const cfUrl = `https://codeforces.com/problemset/problem/${cp.problem.cf_contest_id}/${cp.problem.cf_index}`
          return (
            <Card key={cp.id}>
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{letter} - {cp.problem.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary">Rating: {cp.problem.rating}</Badge>
                      <Badge variant="outline">{cp.max_points} pts</Badge>
                    </div>
                  </div>
                </div>
                <a href={cfUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: 'outline' }), "w-full flex")}>
                  Open on Codeforces ↗
                </a>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {contest.creator_id === currentUserId && (
        <div className="pt-8">
          <Button variant="destructive" onClick={handleEnd}>
            Force End Contest
          </Button>
        </div>
      )}
    </div>
  )
}
