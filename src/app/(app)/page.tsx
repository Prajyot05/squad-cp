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
    <div className="space-y-8 mt-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{greeting}, {profile?.username} 👋</h1>
          <p className="text-muted-foreground mt-1 text-lg">Ready for your next training session?</p>
        </div>
        <Link href="/contests/new" className={cn(buttonVariants({ size: 'lg' }), "gap-2 shadow-md")}>
          <Plus className="h-5 w-5" />
          Create Contest
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Skill Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <div className="text-5xl font-bold tracking-tighter text-primary">{profile?.skill_rating}</div>
              {lastDelta !== 0 && (
                <div className={cn("flex items-center text-sm font-bold", lastDelta > 0 ? "text-emerald-500" : "text-destructive")}>
                  {lastDelta > 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {Math.abs(lastDelta)}
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2 font-medium">{profile?.skill_contests} contests played</p>
          </CardContent>
        </Card>

        <Card className="glass relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              Current Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold tracking-tighter text-accent">{profile?.current_level}</div>
            <div className="mt-3 w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-accent h-full rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(100, ((profile?.current_level || 0) / 109) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Peak Level: {profile?.highest_level}</p>
          </CardContent>
        </Card>

        <Card className="glass flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Award className="h-4 w-4" />
              Codeforces Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <p className="text-2xl font-bold">{profile?.cf_handle}</p>
              <p className="text-sm text-muted-foreground">Linked Handle</p>
            </div>
            <a 
              href={`https://codeforces.com/profile/${profile?.cf_handle}`} 
              target="_blank" 
              rel="noreferrer" 
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "w-full gap-2")}
            >
              View on Codeforces
              <ExternalLink className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      </div>

      <div className="pt-6">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Recent Contests</h2>
        {participations.length === 0 ? (
          <EmptyState 
            icon={Target}
            title="No Contests Yet"
            description="You haven't participated in any contests. Create one to start training!"
            action={
              <Link href="/contests/new" className={cn(buttonVariants())}>
                Create Your First Contest
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {participations.map((p: any) => (
              <Card key={p.id} className="group hover:shadow-md transition-all hover:border-primary/50 flex flex-col justify-between glass">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold truncate pr-2 group-hover:text-primary transition-colors">{p.contest.title}</h3>
                    <Badge variant={p.contest.status === 'active' ? 'default' : p.contest.status === 'finished' ? 'secondary' : 'outline'}>
                      {p.contest.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1.5 mb-6">
                    <p className="flex justify-between border-b border-border/50 pb-1"><span>Level</span> <span className="font-medium text-foreground">{p.contest.level}</span></p>
                    <p className="flex justify-between border-b border-border/50 pb-1"><span>Duration</span> <span className="font-medium text-foreground">{p.contest.duration_min} min</span></p>
                    <p className="flex justify-between border-b border-border/50 pb-1"><span>Score</span> <span className="font-medium text-foreground">{p.total_score} pts</span></p>
                    {p.final_rank && <p className="flex justify-between"><span>Rank</span> <span className="font-medium text-foreground">#{p.final_rank}</span></p>}
                  </div>
                  <Link href={`/contests/${p.contest.id}`} className={cn(buttonVariants({ variant: 'secondary' }), "w-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground")}>
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
