'use client'

import { useState, useEffect } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { RefreshCw, ExternalLink, TriangleAlert, CheckCircle2, XCircle } from 'lucide-react'

export default function LiveContest({ contest, currentUserId, onSyncSuccess }: { contest: any, currentUserId: string, onSyncSuccess?: () => void }) {
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

  // Background auto-sync every 45 seconds to reduce server load spikes and improve UX
  useEffect(() => {
    if (!contest.id) return
    const intv = setInterval(() => {
      fetch(`/api/contests/${contest.id}/sync`, { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          if (data.success && onSyncSuccess) {
            onSyncSuccess()
          }
        })
        .catch(console.error)
    }, 45000)
    return () => clearInterval(intv)
  }, [contest.id, onSyncSuccess])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const progress = 100 - (timeLeft / durationSecs) * 100
  const isUrgent = timeLeft > 0 && timeLeft < 300 // Last 5 minutes

  const handleSync = async () => {
    setSyncing(true)
    
    toast.promise(
      fetch(`/api/contests/${contest.id}/sync`, { method: 'POST' }).then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to sync')
        return data
      }),
      {
        loading: 'Syncing with Codeforces...',
        success: (data) => {
          setSyncing(false)
          if (onSyncSuccess) onSyncSuccess()
          return `Synced! You have solved ${data.problemsSolved} problems (${data.totalScore} pts).`
        },
        error: (err) => {
          setSyncing(false)
          return err.message
        }
      }
    )
  }

  const handleEnd = async () => {
    toast.promise(
      fetch(`/api/contests/${contest.id}/end`, { method: 'POST' }).then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to end contest')
        return data
      }),
      {
        loading: 'Ending contest and calculating ratings...',
        success: () => {
          if (onSyncSuccess) onSyncSuccess()
          return 'Contest ended successfully!'
        },
        error: (err) => err.message
      }
    )
  }

  const getRatingColor = (rating: number) => {
    if (rating < 1000) return "text-gray-500 border-gray-500/30 bg-gray-500/10"
    if (rating < 1200) return "text-green-500 border-green-500/30 bg-green-500/10"
    if (rating < 1500) return "text-blue-500 border-blue-500/30 bg-blue-500/10"
    return "text-purple-500 border-purple-500/30 bg-purple-500/10"
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="glass border-border/50 shadow-md">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{contest.title}</CardTitle>
            <div className={cn(
              "text-3xl font-mono font-bold tracking-tighter px-4 py-1 rounded-lg transition-colors",
              isUrgent ? "text-destructive bg-destructive/10 animate-pulse" : "text-primary bg-primary/10"
            )}>
              {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
            </div>
          </div>
        </CardHeader>
        <div className="h-1.5 w-full bg-muted overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-1000 ease-linear", isUrgent ? "bg-destructive" : "bg-primary")} 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/30 p-4 rounded-xl border border-border/50">
            <p className="text-sm text-muted-foreground flex items-start gap-2">
              <TriangleAlert className="w-5 h-5 text-amber-500 shrink-0" />
              Solve problems on Codeforces, then sync your status to update the standings. Submissions made before the contest started will be ignored.
            </p>
            <Button onClick={handleSync} disabled={syncing} className="shrink-0 gap-2 shadow-sm">
              <RefreshCw className={cn("w-4 h-4", syncing && "animate-spin")} />
              {syncing ? 'Syncing...' : 'Sync Status'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contest.problems.map((cp: any, idx: number) => {
          const letter = String.fromCharCode(65 + idx)
          const cfUrl = `https://codeforces.com/problemset/problem/${cp.problem.cf_contest_id}/${cp.problem.cf_index}`
          
          const mySub = contest.submissions?.find((s: any) => s.user_id === currentUserId && s.problem_slot === cp.slot)
          const isSolved = mySub?.verdict === 'AC'
          const isAttempted = mySub && mySub.verdict !== 'AC'

          return (
            <Card key={cp.id} className={cn(
              "glass hover:border-primary/50 transition-colors flex flex-col justify-between overflow-hidden relative group",
              isSolved && "border-green-500/50 bg-green-500/5",
              isAttempted && "border-red-500/50 bg-red-500/5"
            )}>
              <div className={cn(
                "absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl -z-10",
                isSolved ? "from-green-500/20 to-transparent" : 
                isAttempted ? "from-red-500/20 to-transparent" : 
                "from-primary/10 to-transparent"
              )} />
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg leading-tight w-[80%] line-clamp-2">
                    <span className={cn("mr-2", isSolved ? "text-green-500" : isAttempted ? "text-red-500" : "text-primary")}>{letter}.</span> 
                    {cp.problem.name}
                  </h3>
                  <Badge variant="outline" className={cn("font-mono font-bold ml-2 shrink-0", getRatingColor(cp.problem.rating))}>
                    {cp.problem.rating}
                  </Badge>
                </div>
                <div className="flex justify-between items-end mt-6">
                  <div className="text-sm font-semibold flex items-center gap-1.5">
                    {isSolved ? (
                      <span className="text-green-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {cp.max_points} pts</span>
                    ) : isAttempted ? (
                      <span className="text-red-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> {mySub.score || 0} pts</span>
                    ) : (
                      <span className="text-muted-foreground flex items-center gap-1.5"><div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center font-mono text-[10px]">{letter}</div> {cp.max_points} pts</span>
                    )}
                  </div>
                  <a href={cfUrl} target="_blank" rel="noopener noreferrer" className={cn(
                    buttonVariants({ variant: isSolved ? 'outline' : 'secondary', size: 'sm' }), 
                    "gap-1.5 transition-colors",
                    isSolved ? "text-green-500 border-green-500/30 hover:bg-green-500/10 hover:text-green-500" : "group-hover:bg-primary group-hover:text-primary-foreground"
                  )}>
                    {isSolved ? 'Solved' : isAttempted ? 'Retry' : 'Solve'} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {contest.creator_id === currentUserId && (
        <div className="pt-8 flex justify-end">
          <ConfirmDialog
            title="End Contest Early?"
            description="Are you sure you want to end the contest for everyone? Ratings will be calculated immediately based on current standings. This action cannot be undone."
            confirmText="End Contest"
            variant="destructive"
            onConfirm={handleEnd}
            trigger={
              <Button variant="outline" className="text-red-500 border-red-500/50 hover:bg-red-500 hover:text-white transition-colors">
                Force End Contest
              </Button>
            }
          />
        </div>
      )}
    </div>
  )
}
