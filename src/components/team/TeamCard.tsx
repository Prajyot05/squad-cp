'use client'

import { Card } from '@/components/ui/card'
import { Users, Code, Trophy } from 'lucide-react'
import Link from 'next/link'

export function TeamCard({ team }: { team: any }) {
  return (
    <Link href={`/teams/${team.id}`}>
      <Card className="p-6 hover:border-blue-500/50 transition-colors group relative overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <h3 className="text-xl font-bold mb-2 text-foreground">{team.name}</h3>
        {team.description && (
          <p className="text-neutral-500 text-sm mb-4 line-clamp-2">{team.description}</p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-neutral-500 mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" />
            <span>{team._count?.members || team.members?.length || 0} Members</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>{team.owner.username}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
