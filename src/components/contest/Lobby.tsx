'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Copy, Play, Users, Clock, Hash, ShieldAlert } from 'lucide-react'

export default function Lobby({ contest, currentUserId, onStartSuccess }: { contest: any, currentUserId: string, onStartSuccess?: () => void }) {
  const [loading, setLoading] = useState(false)
  
  const isCreator = contest.creator_id === currentUserId
  const inviteLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/contests/join/${contest.invite_code}`

  const handleStart = async () => {
    setLoading(true)
    
    toast.promise(
      fetch(`/api/contests/${contest.id}/start`, { method: 'POST' }).then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to start contest')
        return data
      }),
      {
        loading: 'Starting contest...',
        success: () => {
          if (onStartSuccess) onStartSuccess()
          return 'Contest started! Good luck!'
        },
        error: (err) => {
          setLoading(false)
          return err.message
        }
      }
    )
  }

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    toast.success('Invite link copied to clipboard')
  }

  return (
    <Card className="bg-card border border-border rounded-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">{contest.title}</CardTitle>
        <CardDescription className="text-sm flex items-center gap-4 mt-2 text-neutral-500">
          <span className="flex items-center gap-1 font-mono text-xs"><ShieldAlert className="w-3.5 h-3.5" /> Lv.{contest.level}</span>
          <span className="flex items-center gap-1 font-mono text-xs"><Clock className="w-3.5 h-3.5" /> {contest.duration_min}m</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-sm border border-border">
          <h3 className="font-medium text-xs uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2"><Copy className="w-3.5 h-3.5" /> Invite Link</h3>
          <div className="flex gap-2">
            <input type="text" readOnly value={inviteLink} className="flex-1 px-3 py-2 border border-border rounded-sm bg-background text-xs font-mono focus:outline-none focus:ring-1 focus:ring-foreground/20" />
            <Button variant="outline" size="sm" onClick={copyLink} className="gap-1.5 text-xs h-9">Copy</Button>
          </div>
          <p className="text-[10px] text-neutral-400 mt-2">Share this link to invite your squad.</p>
        </div>

        <div>
          <h3 className="font-medium text-xs uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2"><Hash className="w-3.5 h-3.5" /> Configuration</h3>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className="bg-neutral-100 dark:bg-neutral-800 text-foreground border-border font-mono text-[10px]">Level {contest.level}</Badge>
            <Badge variant="outline" className="bg-neutral-100 dark:bg-neutral-800 text-foreground border-border font-mono text-[10px]">{contest.duration_min} min</Badge>
            {contest.tag_filter.map((t: string) => (
              <Badge key={t} variant="outline" className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-border text-[10px]">{t}</Badge>
            ))}
            {contest.tag_filter.length === 0 && <span className="text-xs text-neutral-400">Random topics</span>}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-xs uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2"><Users className="w-3.5 h-3.5" /> Participants ({contest.participants?.length || 1})</h3>
          <div className="flex flex-wrap gap-2">
            {contest.participants?.map((p: any) => (
              <div key={p.id} className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 border border-border px-2.5 py-1 rounded-sm text-xs font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {p.user.username}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          {isCreator ? (
            <Button onClick={handleStart} disabled={loading} className="w-full h-11 font-medium gap-2 bg-foreground text-background hover:bg-foreground/90">
              <Play className="w-4 h-4 fill-current" />
              {loading ? 'Starting...' : 'Start Contest'}
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-sm border border-border text-neutral-500">
              <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
              <span className="text-xs font-medium">Waiting for the host to start...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
