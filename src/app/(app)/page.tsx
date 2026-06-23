import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus, Target, Award, Plus, ExternalLink } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const profile = await db.profile.findUnique({
    where: { id: user.id }
  })

  const participations = await db.contestParticipant.findMany({
    where: { user_id: user.id },
    include: { contest: true },
    orderBy: { joined_at: 'desc' },
    take: 6
  })

  const history = await db.ratingHistory.findMany({
    where: { user_id: user.id },
    orderBy: { created_at: 'desc' },
    take: 1
  })

  const lastDelta = history.length > 0 ? history[0].skill_after - history[0].skill_before : 0
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-10 w-full animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{greeting}, {profile?.username}</h1>
          <p className="text-base text-neutral-500 mt-1">Ready for your next training session?</p>
        </div>
        <Link href="/contests/new" className={cn(buttonVariants({ size: 'lg' }), "gap-2 bg-foreground text-background hover:bg-foreground/90 font-medium")}>
          <Plus className="h-5 w-5" />
          Create Contest
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-neutral-500">
              Skill Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex items-baseline gap-3">
              <div className="text-4xl font-mono font-bold tracking-tighter text-foreground">{profile?.skill_rating}</div>
              {lastDelta !== 0 && (
                <div className={cn("flex items-center text-sm font-mono font-bold px-2 py-0.5 rounded-sm", lastDelta > 0 ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10")}>
                  {lastDelta > 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {lastDelta > 0 ? '+' : ''}{lastDelta}
                </div>
              )}
            </div>
            <p className="text-sm text-neutral-500 mt-3 font-mono">{profile?.skill_contests} contests played</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-neutral-500">
              Current Level
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-mono font-bold tracking-tighter text-foreground">{profile?.current_level}</div>
              <span className="text-sm text-neutral-500 font-mono">/ 109</span>
            </div>
            <div className="mt-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm h-1.5 overflow-hidden">
              <div
                className="bg-foreground h-full rounded-sm transition-all duration-1000"
                style={{ width: `${Math.min(100, ((profile?.current_level || 0) / 109) * 100)}%` }}
              />
            </div>
            <p className="text-sm text-neutral-500 mt-3 font-mono">Peak: {profile?.highest_level}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-md flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-neutral-500">
              Codeforces
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6 flex flex-col justify-between flex-1">
            <div className="mb-4">
              <p className="text-2xl font-mono font-bold text-foreground truncate">{profile?.cf_handle}</p>
              <p className="text-sm text-neutral-500 mt-1">Linked Handle</p>
            </div>
            <a
              href={`https://codeforces.com/profile/${profile?.cf_handle}`}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline' }), "w-full gap-2 text-neutral-500 hover:text-foreground h-10")}
            >
              View Profile
              <ExternalLink className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      </div>

      <div className="pt-2">
        <h2 className="text-xl font-bold tracking-tight text-foreground mb-6">Recent Contests</h2>
        {participations.length === 0 ? (
          <EmptyState
            icon={Target}
            title="No Contests Yet"
            description="You haven't participated in any contests. Create one to start training!"
            action={
              <Link href="/contests/new" className={cn(buttonVariants(), "bg-foreground text-background hover:bg-foreground/90")}>
                Create Your First Contest
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {participations.map((p: any) => (
              <Card key={p.id} className="group bg-card border border-border rounded-md hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex flex-col justify-between">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-5">
                    <h3 className="font-semibold text-base truncate pr-2 text-foreground">{p.contest.title}</h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs font-mono uppercase shrink-0 px-2 py-0.5",
                        p.contest.status === 'active' && "border-emerald-500/30 text-emerald-500",
                        p.contest.status === 'finished' && "border-border text-neutral-500",
                        p.contest.status === 'lobby' && "border-amber-500/30 text-amber-500"
                      )}
                    >
                      {p.contest.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />}
                      {p.contest.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-neutral-500 space-y-2.5 mb-6">
                    <p className="flex justify-between border-b border-border pb-1.5"><span>Level</span> <span className="font-mono font-medium text-foreground">{p.contest.level}</span></p>
                    <p className="flex justify-between border-b border-border pb-1.5"><span>Duration</span> <span className="font-mono font-medium text-foreground">{p.contest.duration_min} min</span></p>
                    <p className="flex justify-between border-b border-border pb-1.5"><span>Score</span> <span className="font-mono font-medium text-foreground">{p.total_score} pts</span></p>
                    {p.final_rank && <p className="flex justify-between"><span>Rank</span> <span className="font-mono font-medium text-foreground">#{p.final_rank}</span></p>}
                  </div>
                  <Link href={`/contests/${p.contest.id}`} className={cn(buttonVariants({ variant: 'outline' }), "w-full text-neutral-500 hover:text-foreground hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors font-medium")}>
                    View Details
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
