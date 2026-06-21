import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Trophy, Target, TrendingUp, Award, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const profile = await db.profile.findUnique({
    where: { id: user.id }
  })

  const history = await db.ratingHistory.findMany({
    where: { user_id: user.id },
    include: { contest: true },
    orderBy: { created_at: 'desc' }
  })

  const avatarUrl = user.user_metadata?.avatar_url

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-card/50 p-6 rounded-2xl border border-border/50 glass">
        {avatarUrl ? (
          <Image src={avatarUrl} alt={profile?.username || 'Avatar'} width={96} height={96} className="rounded-2xl shadow-sm border border-border/50" />
        ) : (
          <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center text-4xl shadow-sm border border-border/50">
            🧑‍💻
          </div>
        )}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl font-extrabold tracking-tight">{profile?.username}</h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
            {profile?.cf_handle && (
              <a href={`https://codeforces.com/profile/${profile.cf_handle}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium hover:bg-blue-500/20 transition-colors">
                <ExternalLink className="w-4 h-4" />
                {profile.cf_handle}
              </a>
            )}
            <a href={`https://github.com/${user.user_metadata?.user_name}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-slate-500/20 transition-colors">
              <FaGithub className="w-4 h-4" />
              {user.user_metadata?.user_name}
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5 text-primary" /> Skill Rating</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold tracking-tighter text-primary">{profile?.skill_rating}</p></CardContent>
        </Card>
        <Card className="glass bg-gradient-to-br from-muted/50 to-transparent">
          <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2"><Trophy className="w-3.5 h-3.5" /> Contests</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold tracking-tighter">{profile?.skill_contests}</p></CardContent>
        </Card>
        <Card className="glass bg-gradient-to-br from-accent/5 to-transparent">
          <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2"><Target className="w-3.5 h-3.5 text-accent" /> Level</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold tracking-tighter text-accent">{profile?.current_level}</p></CardContent>
        </Card>
        <Card className="glass bg-gradient-to-br from-amber-500/5 to-transparent">
          <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground font-semibold uppercase tracking-wider flex items-center gap-2"><Award className="w-3.5 h-3.5 text-amber-500" /> Peak Level</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold tracking-tighter text-amber-500">{profile?.highest_level}</p></CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Rating History</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Contest</TableHead>
                <TableHead className="text-center">Rank</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-right">Level Change</TableHead>
                <TableHead className="text-right pr-6">Rating Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((h: any) => {
                const skillDelta = h.skill_after - h.skill_before
                const levelDelta = h.level_after - h.level_before
                return (
                  <TableRow key={h.id.toString()} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium text-foreground">{h.contest.title}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="font-mono">#{h.rank}</Badge>
                    </TableCell>
                    <TableCell className="text-center font-mono">{h.total_score}</TableCell>
                    <TableCell className="text-right">
                      {h.level_after}
                      {levelDelta !== 0 && (
                        <span className={`ml-2 text-xs font-semibold ${levelDelta > 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                          {levelDelta > 0 ? '↑' : '↓'} {Math.abs(levelDelta)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Badge variant="secondary" className="mr-3 font-mono">{h.skill_after}</Badge>
                      <span className={`text-xs font-bold inline-flex items-center justify-end w-10 ${skillDelta > 0 ? 'text-emerald-500' : skillDelta < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {skillDelta > 0 ? '+' : ''}{skillDelta}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
              {history.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">No rating history yet. Join a contest to get started!</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
