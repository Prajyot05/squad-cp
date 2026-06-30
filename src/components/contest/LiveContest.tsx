'use client'

import { useState, useEffect } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

  const me = contest.participants?.find((p: any) => p.user_id === currentUserId)
  const myHandle = me?.user?.cf_handle

  // Background auto-sync every 45 seconds to reduce server load spikes and improve UX
  useEffect(() => {
    if (!contest.id || !myHandle) return
    const intv = setInterval(async () => {
      try {
        const cfRes = await fetch(`https://codeforces.com/api/user.status?handle=${myHandle}`)
        const cfData = await cfRes.json()
        if (cfData.status !== "OK") return
        
        const res = await fetch(`/api/contests/${contest.id}/sync`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ submissions: cfData.result })
        })
        const data = await res.json()
        if (data.success && onSyncSuccess) {
          onSyncSuccess()
        }
      } catch (err) {
        console.error(err)
      }
    }, 45000)
    return () => clearInterval(intv)
  }, [contest.id, myHandle, onSyncSuccess])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const progress = 100 - (timeLeft / durationSecs) * 100
  const isUrgent = timeLeft > 0 && timeLeft < 300 // Last 5 minutes

  const handleSync = async () => {
    if (!myHandle) return toast.error('CF Handle missing')
    setSyncing(true)
    
    toast.promise(
      (async () => {
        const cfRes = await fetch(`https://codeforces.com/api/user.status?handle=${myHandle}`)
        const cfData = await cfRes.json()
        if (cfData.status !== "OK") throw new Error('Failed to fetch from Codeforces')
        
        const res = await fetch(`/api/contests/${contest.id}/sync`, { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ submissions: cfData.result })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to sync')
        return data
      })(),
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

  return (
    <div className="space-y-5">
      {/* Timer Header */}
      <Card className="bg-card border border-border rounded-md">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-foreground">{contest.title}</CardTitle>
            <div className={cn(
              "font-mono text-2xl font-bold tracking-tighter px-3 py-1 rounded-sm transition-colors",
              isUrgent ? "text-red-500 bg-red-500/10" : "text-foreground bg-neutral-100 dark:bg-neutral-800"
            )}>
              {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
            </div>
          </div>
        </CardHeader>
        <div className="h-0.5 w-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-1000 ease-linear", isUrgent ? "bg-red-500" : "bg-foreground")} 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-neutral-50 dark:bg-neutral-900 p-3 rounded-sm border border-border">
            <p className="text-xs text-neutral-500 flex items-start gap-2">
              <TriangleAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              Solve problems on Codeforces, then sync your status. Submissions before the contest started are ignored.
            </p>
            <Button onClick={handleSync} disabled={syncing} className="shrink-0 gap-2 bg-foreground text-background hover:bg-foreground/90 h-8 text-xs px-3">
              <RefreshCw className={cn("w-3.5 h-3.5", syncing && "animate-spin")} />
              {syncing ? 'Syncing...' : 'Sync Status'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Problem List — Dense Rows */}
      <div className="bg-card border border-border rounded-md overflow-hidden">
        {contest.problems.map((cp: any, idx: number) => {
          const letter = String.fromCharCode(65 + idx)
          const cfUrl = `https://codeforces.com/problemset/problem/${cp.problem.cf_contest_id}/${cp.problem.cf_index}`
          
          let mySub
          if (contest.is_team_mode) {
            const teamSubs = contest.submissions?.filter((s: any) => s.problem_slot === cp.slot)
            mySub = teamSubs?.find((s: any) => s.verdict === 'AC') || teamSubs?.[teamSubs.length - 1]
          } else {
            mySub = contest.submissions?.find((s: any) => s.user_id === currentUserId && s.problem_slot === cp.slot)
          }
          
          const isSolved = mySub?.verdict === 'AC'
          const isAttempted = mySub && mySub.verdict !== 'AC'

          return (
            <div key={cp.id} className={cn(
              "flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0 transition-colors",
              isSolved && "bg-emerald-500/5",
              isAttempted && "bg-red-500/5"
            )}>
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={cn(
                  "w-7 h-7 rounded-sm flex items-center justify-center font-mono font-bold text-xs shrink-0",
                  isSolved ? "bg-emerald-500/10 text-emerald-500" :
                  isAttempted ? "bg-red-500/10 text-red-500" :
                  "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                )}>
                  {letter}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm text-foreground truncate">{cp.problem.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-neutral-500">{cp.problem.rating}</span>
                    <span className="text-[10px] text-neutral-400">·</span>
                    <span className="text-[10px] font-mono text-neutral-500">{cp.max_points} pts</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                {isSolved ? (
                  <span className="text-emerald-500 flex items-center gap-1 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> AC
                  </span>
                ) : isAttempted ? (
                  <span className="text-red-500 flex items-center gap-1 text-xs font-medium">
                    <XCircle className="w-3.5 h-3.5" /> {mySub.score || 0}
                  </span>
                ) : null}
                <a href={cfUrl} target="_blank" rel="noopener noreferrer" className={cn(
                  "text-xs font-medium flex items-center gap-1 px-2.5 py-1 rounded-sm border transition-colors",
                  isSolved
                    ? "text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10"
                    : "text-neutral-500 border-border hover:text-foreground hover:border-neutral-400 dark:hover:border-neutral-600"
                )}>
                  {isSolved ? 'Solved' : isAttempted ? 'Retry' : 'Solve'} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {contest.creator_id === currentUserId && (
        <div className="pt-4 flex justify-end">
          <ConfirmDialog
            title="End Contest Early?"
            description="Are you sure you want to end the contest for everyone? Ratings will be calculated immediately based on current standings. This action cannot be undone."
            confirmText="End Contest"
            variant="destructive"
            onConfirm={handleEnd}
            trigger={
              <Button variant="outline" className="text-red-500 border-red-500/30 hover:bg-red-500 hover:text-white transition-colors text-xs h-8">
                Force End Contest
              </Button>
            }
          />
        </div>
      )}
    </div>
  )
}
