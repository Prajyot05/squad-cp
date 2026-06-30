'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Users, Code, Trophy, Copy, LogOut, Swords, Trash2, ArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Link from 'next/link'

export default function TeamDetailsPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/teams/${params.id}`)
      .then(r => r.json())
      .then(data => {
        if (data.team) setTeam(data.team)
        setLoading(false)
      })
  }, [params.id])

  if (loading) return <div className="p-12 text-center text-neutral-500">Loading team details...</div>
  if (!team) return <div className="p-12 text-center text-red-500">Team not found</div>

  const copyInviteCode = () => {
    navigator.clipboard.writeText(team.invite_code)
    toast.success('Invite code copied to clipboard!')
  }

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in duration-500">
      <Link href="/teams" className="inline-flex items-center text-neutral-500 hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Teams
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold font-outfit text-foreground mb-3">{team.name}</h1>
            {team.description && <p className="text-neutral-500 text-lg">{team.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href={`/contests/new?team=${team.id}`}>
              <Card className="p-6 bg-primary/5 border-primary/20 hover:border-primary/50 transition-colors group cursor-pointer h-full flex flex-col justify-center items-center text-center">
                <Swords className="w-10 h-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-foreground mb-1">Team Contest</h3>
                <p className="text-sm text-neutral-500">Start a new practice contest with your team</p>
              </Card>
            </Link>

            <Card className="p-6 border-border bg-card shadow-sm">
              <h3 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wider">Invite Code</h3>
              <div className="flex items-center gap-3 bg-background p-3 rounded-lg border border-border">
                <code className="text-2xl font-mono text-primary font-bold flex-1 text-center tracking-widest">{team.invite_code}</code>
                <Button size="icon" variant="ghost" onClick={copyInviteCode} className="hover:text-foreground hover:bg-accent">
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-neutral-500 mt-3 text-center">Share this code with friends to invite them</p>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Recent Contests
            </h2>
            <Card className="border-border bg-card overflow-hidden shadow-sm">
              {team.contests?.length === 0 ? (
                <div className="p-8 text-center text-neutral-500">No contests played yet.</div>
              ) : (
                <div className="divide-y divide-border">
                  {team.contests?.map((c: any) => (
                    <div key={c.id} className="p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                      <div>
                        <div className="font-medium text-foreground">{c.title}</div>
                        <div className="text-xs text-neutral-500">{new Date(c.created_at).toLocaleDateString()}</div>
                      </div>
                      <Link href={`/contests/${c.id}`}>
                        <Button variant="outline" size="sm" className="border-border hover:bg-accent">View</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Members ({team.members?.length})
          </h2>
          <Card className="border-border bg-card overflow-hidden divide-y divide-border shadow-sm">
            {team.members?.map((m: any) => (
              <div key={m.user_id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground flex items-center gap-2">
                    {m.user.username}
                    {m.role === 'owner' && <Trophy className="w-3.5 h-3.5 text-amber-500" />}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">Level {m.user.current_level} • {m.user.skill_rating} SR</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
