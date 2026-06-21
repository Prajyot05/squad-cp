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
    take: 5
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
    <div className="space-y-8 mt-2 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{greeting}, {profile?.username}</h1>
          <p className="text-sm text-neutral-500 mt-1">Ready for your next training session?</p>
        </div>
        <Link href="/contests/new" className={cn(buttonVariants(), "gap-2 bg-foreground text-background hover:bg-foreground/90")}>
          <Plus className="h-4 w-4" />
          Create Contest
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Skill Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <div className="text-4xl font-mono font-bold tracking-tighter text-foreground">{profile?.skill_rating}</div>
              {lastDelta !== 0 && (
                <div className={cn("flex items-center text-xs font-mono font-semibold", lastDelta > 0 ? "text-emerald-500" : "text-red-500")}>
                  {lastDelta > 0 ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                  {lastDelta > 0 ? '+' : ''}{lastDelta}
                </div>
              )}
            </div>
            <p className="text-xs text-neutral-500 mt-2 font-mono">{profile?.skill_contests} contests played</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Current Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-mono font-bold tracking-tighter text-foreground">{profile?.current_level}</div>
              <span className="text-xs text-neutral-500 font-mono">/ 109</span>
            </div>
            <div className="mt-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm h-1 overflow-hidden">
              <div 
                className="bg-foreground h-full rounded-sm transition-all duration-1000" 
                style={{ width: `${Math.min(100, ((profile?.current_level || 0) / 109) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-neutral-500 mt-2 font-mono">Peak: {profile?.highest_level}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border rounded-md flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Codeforces
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div>
              <p className="text-xl font-mono font-bold text-foreground">{profile?.cf_handle}</p>
              <p className="text-xs text-neutral-500">Linked Handle</p>
            </div>
            <a 
              href={`https://codeforces.com/profile/${profile?.cf_handle}`} 
              target="_blank" 
              rel="noreferrer" 
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "w-full gap-2 text-neutral-500 hover:text-foreground")}
            >
              View on Codeforces
              <ExternalLink className="h-3 w-3" />
            </a>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground mb-4">Recent Contests</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {participations.map((p: any) => (
              <Card key={p.id} className="group bg-card border border-border rounded-md hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex flex-col justify-between">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-sm truncate pr-2 text-foreground">{p.contest.title}</h3>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[10px] font-mono uppercase shrink-0",
                        p.contest.status === 'active' && "border-emerald-500/30 text-emerald-500",
                        p.contest.status === 'finished' && "border-border text-neutral-500",
                        p.contest.status === 'lobby' && "border-amber-500/30 text-amber-500"
                      )}
                    >
                      {p.contest.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />}
                      {p.contest.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-neutral-500 space-y-1.5 mb-5">
                    <p className="flex justify-between border-b border-border pb-1"><span>Level</span> <span className="font-mono text-foreground">{p.contest.level}</span></p>
                    <p className="flex justify-between border-b border-border pb-1"><span>Duration</span> <span className="font-mono text-foreground">{p.contest.duration_min} min</span></p>
                    <p className="flex justify-between border-b border-border pb-1"><span>Score</span> <span className="font-mono text-foreground">{p.total_score} pts</span></p>
                    {p.final_rank && <p className="flex justify-between"><span>Rank</span> <span className="font-mono text-foreground">#{p.final_rank}</span></p>}
                  </div>
                  <Link href={`/contests/${p.contest.id}`} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "w-full text-neutral-500 hover:text-foreground hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors")}>
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
