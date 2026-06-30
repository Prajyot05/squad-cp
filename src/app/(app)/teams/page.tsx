'use client'

import { useState, useEffect } from 'react'
import { Plus, Users } from 'lucide-react'
import Link from 'next/link'
import { TeamCard } from '@/components/team/TeamCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [joinCode, setJoinCode] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetch('/api/teams')
      .then(r => r.json())
      .then(data => {
        if (data.teams) setTeams(data.teams)
        setLoading(false)
      })
  }, [])

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!joinCode) return
    router.push(`/teams/join/${joinCode}`)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-foreground mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Your Teams
          </h1>
          <p className="text-neutral-500">Manage your ICPC teams and practice together</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <form onSubmit={handleJoin} className="flex gap-2 w-full md:w-auto">
            <Input 
              placeholder="Invite Code..." 
              value={joinCode}
              onChange={e => setJoinCode(e.target.value)}
              className="bg-card border-border w-full md:w-32"
            />
            <Button type="submit" variant="outline" className="border-border hover:bg-accent hover:text-accent-foreground">
              Join
            </Button>
          </form>
          
          <Link href="/teams/new">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New Team
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-neutral-500 py-12">Loading teams...</div>
      ) : teams.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-border shadow-sm">
          <Users className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-foreground mb-2">No teams yet</h3>
          <p className="text-neutral-500 mb-6 max-w-md mx-auto">
            Create a team to practice with friends, track combined stats, and participate in team-mode contests.
          </p>
          <Link href="/teams/new">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Create your first team</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  )
}
