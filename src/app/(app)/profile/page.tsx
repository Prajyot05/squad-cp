import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Trophy, Target, TrendingUp, TrendingDown, Award, ExternalLink } from 'lucide-react'
import { FaGithub, FaFire, FaTrophy } from 'react-icons/fa'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import ActivityHeatmap from '@/components/profile/ActivityHeatmap'
import RatingGraph from '@/components/profile/RatingGraph'

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
    <div className="w-full mt-2 space-y-10 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-card p-8 rounded-md border border-border">
        {avatarUrl ? (
          <Image src={avatarUrl} alt={profile?.username || 'Avatar'} width={112} height={112} className="rounded-md border border-border" />
        ) : (
          <div className="w-28 h-28 rounded-md bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-4xl border border-border">
            🧑‍💻
          </div>
        )}
        <div className="text-center md:text-left flex-1 mt-2 md:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{profile?.username}</h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
            {profile?.cf_handle && (
              <a href={`https://codeforces.com/profile/${profile.cf_handle}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-sm font-mono border border-border hover:text-foreground transition-colors">
                <ExternalLink className="w-4 h-4" />
                {profile.cf_handle}
              </a>
            )}
            <a href={`https://github.com/${user.user_metadata?.user_name}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-sm font-mono border border-border hover:text-foreground transition-colors">
              <FaGithub className="w-4 h-4" />
              {user.user_metadata?.user_name}
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-3"><CardTitle className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Skill Rating</CardTitle></CardHeader>
          <CardContent className="pb-6"><p className="text-3xl font-mono font-bold text-foreground">{profile?.skill_rating}</p></CardContent>
        </Card>
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-3"><CardTitle className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Contests</CardTitle></CardHeader>
          <CardContent className="pb-6"><p className="text-3xl font-mono font-bold text-foreground">{profile?.skill_contests}</p></CardContent>
        </Card>
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-3"><CardTitle className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Level</CardTitle></CardHeader>
          <CardContent className="pb-6"><p className="text-3xl font-mono font-bold text-foreground">{profile?.current_level}</p></CardContent>
        </Card>
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-3"><CardTitle className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Peak Level</CardTitle></CardHeader>
          <CardContent className="pb-6"><p className="text-3xl font-mono font-bold text-foreground">{profile?.highest_level}</p></CardContent>
        </Card>
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-3"><CardTitle className="text-xs text-neutral-500 font-medium uppercase tracking-wider flex items-center gap-1.5"><FaFire className="text-orange-500" /> Current Streak</CardTitle></CardHeader>
          <CardContent className="pb-6"><p className="text-3xl font-mono font-bold text-foreground">{profile?.current_streak} <span className="text-lg text-neutral-500 font-sans">days</span></p></CardContent>
        </Card>
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-3"><CardTitle className="text-xs text-neutral-500 font-medium uppercase tracking-wider flex items-center gap-1.5"><FaTrophy className="text-yellow-500" /> Max Streak</CardTitle></CardHeader>
          <CardContent className="pb-6"><p className="text-3xl font-mono font-bold text-foreground">{profile?.max_streak} <span className="text-lg text-neutral-500 font-sans">days</span></p></CardContent>
        </Card>
      </div>

      <ActivityHeatmap history={history} />
      <RatingGraph history={history} currentRating={profile?.skill_rating || 800} />

      <Card className="bg-card border border-border rounded-md overflow-hidden">
        <CardHeader className="border-b border-border bg-neutral-50 dark:bg-neutral-900 py-4 px-6">
          <CardTitle className="text-base font-semibold text-foreground">Rating History</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                <TableHead className="py-4 px-6 text-xs uppercase tracking-wider text-neutral-500 font-medium">Contest</TableHead>
                <TableHead className="py-4 text-center text-xs uppercase tracking-wider text-neutral-500 font-medium">Rank</TableHead>
                <TableHead className="py-4 text-center text-xs uppercase tracking-wider text-neutral-500 font-medium">Score</TableHead>
                <TableHead className="py-4 text-right text-xs uppercase tracking-wider text-neutral-500 font-medium">Level</TableHead>
                <TableHead className="py-4 px-6 text-right text-xs uppercase tracking-wider text-neutral-500 font-medium">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((h: any) => {
                const skillDelta = h.skill_after - h.skill_before
                const levelDelta = h.level_after - h.level_before
                return (
                  <TableRow key={h.id.toString()} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors">
                    <TableCell className="py-4 px-6 font-medium text-base text-foreground">{h.contest.title}</TableCell>
                    <TableCell className="py-4 text-center">
                      <span className="font-mono text-sm text-neutral-500">#{h.rank}</span>
                    </TableCell>
                    <TableCell className="py-4 text-center font-mono text-base">{h.total_score}</TableCell>
                    <TableCell className="py-4 text-right">
                      <span className="font-mono text-base">{h.level_after}</span>
                      {levelDelta !== 0 && (
                        <span className={cn("ml-2 text-xs font-mono font-semibold", levelDelta > 0 ? 'text-emerald-500' : 'text-red-500')}>
                          {levelDelta > 0 ? '↑' : '↓'}{Math.abs(levelDelta)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <span className="font-mono text-base font-bold">{h.skill_after}</span>
                      <span className={cn("ml-3 text-xs font-mono font-semibold inline-flex items-center justify-end w-12",
                        skillDelta > 0 ? 'text-emerald-500' : skillDelta < 0 ? 'text-red-500' : 'text-neutral-400')}>
                        {skillDelta > 0 ? '+' : ''}{skillDelta}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
              {history.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-16 text-neutral-500 text-base">No rating history yet. Join a contest to get started!</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
