import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

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

  return (
    <div className="space-y-8 mt-10 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome back, {profile?.username}</h1>
          <p className="text-muted-foreground mt-2 text-lg">Ready for your next training session?</p>
        </div>
        <Link href="/contests/new" className={cn(buttonVariants({ size: 'lg' }))}>
          Create Contest
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-indigo-600 dark:text-indigo-400">Skill Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">{profile?.skill_rating}</div>
            <p className="text-sm text-muted-foreground mt-2 font-medium">{profile?.skill_contests} contests played</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-emerald-600 dark:text-emerald-400">Current Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">{profile?.current_level}</div>
            <p className="text-sm text-muted-foreground mt-2 font-medium">Peak Level: {profile?.highest_level}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-2">
            <Link href="/leaderboard" className={cn(buttonVariants({ variant: 'outline' }), "justify-start")}>
              🏆 View Leaderboard
            </Link>
            <Link href="/profile" className={cn(buttonVariants({ variant: 'outline' }), "justify-start")}>
              👤 My Profile
            </Link>
            {profile?.cf_handle && (
              <a href={`https://codeforces.com/profile/${profile.cf_handle}`} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'outline' }), "justify-start")}>
                ↗ Codeforces Profile
              </a>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="pt-6">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Recent Contests</h2>
        {participations.length === 0 ? (
          <p className="text-muted-foreground italic bg-muted/50 p-6 rounded-lg text-center">You haven't participated in any contests yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {participations.map((p: any) => (
              <Card key={p.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold truncate pr-2">{p.contest.title}</h3>
                    <Badge variant={p.contest.status === 'active' ? 'default' : p.contest.status === 'finished' ? 'secondary' : 'outline'}>
                      {p.contest.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1 mb-4">
                    <p>Level {p.contest.level} • {p.contest.duration_min} min</p>
                    <p>Score: <span className="font-medium text-foreground">{p.total_score} pts</span></p>
                    {p.final_rank && <p>Rank: <span className="font-medium text-foreground">#{p.final_rank}</span></p>}
                  </div>
                  <Link href={`/contests/${p.contest.id}`} className={cn(buttonVariants({ variant: 'secondary' }), "w-full flex")}>
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
