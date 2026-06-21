'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Copy, Play, Users, Clock, Hash, ShieldAlert } from 'lucide-react'

export default function Lobby({ contest, currentUserId }: { contest: any, currentUserId: string }) {
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
        success: 'Contest started! Good luck!',
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
    <Card className="glass border-border/50 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold tracking-tight">{contest.title}</CardTitle>
        <CardDescription className="text-base flex items-center gap-4 mt-2">
          <span className="flex items-center gap-1"><ShieldAlert className="w-4 h-4 text-accent" /> Level {contest.level}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary" /> {contest.duration_min} mins</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Copy className="w-4 h-4 text-muted-foreground" /> Invite Link</h3>
          <div className="flex gap-2">
            <input type="text" readOnly value={inviteLink} className="flex-1 px-3 py-2 border border-border/50 rounded-md bg-background/50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <Button variant="secondary" onClick={copyLink} className="gap-2">Copy</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Send this link to your friends to let them join this contest.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Hash className="w-4 h-4 text-muted-foreground" /> Configuration</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-background">Level {contest.level}</Badge>
            <Badge variant="outline" className="bg-background">{contest.duration_min} min</Badge>
            {contest.tag_filter.map((t: string) => (
              <Badge key={t} variant="secondary" className="bg-accent/10 text-accent border-accent/20">{t}</Badge>
            ))}
            {contest.tag_filter.length === 0 && <span className="text-sm text-muted-foreground">Random topics</span>}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Users className="w-4 h-4 text-muted-foreground" /> Joined Participants ({contest.participants?.length || 1})</h3>
          <div className="flex flex-wrap gap-3">
            {contest.participants?.map((p: any) => (
              <div key={p.id} className="flex items-center gap-2 bg-background border border-border/50 px-3 py-1.5 rounded-full text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {p.user.username}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          {isCreator ? (
            <Button onClick={handleStart} disabled={loading} className="w-full h-12 text-md font-semibold gap-2 shadow-md hover:scale-[1.01] transition-transform">
              <Play className="w-5 h-5 fill-current" />
              {loading ? 'Starting...' : 'Start Contest Now'}
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-lg border border-border/50 text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="font-medium">Waiting for the host to start the contest...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
