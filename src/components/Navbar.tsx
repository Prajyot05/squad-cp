'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const pathname = usePathname()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/auth/login'
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-2xl tracking-tight text-primary">SquadCP</Link>
          <div className="hidden md:flex gap-6">
            <Link href="/" className={`text-sm transition-colors ${pathname === '/' ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}>Dashboard</Link>
            <Link href="/leaderboard" className={`text-sm transition-colors ${pathname === '/leaderboard' ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}>Leaderboard</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/profile" className={cn(buttonVariants({ variant: 'ghost' }), "hidden sm:flex")}>
            Profile
          </Link>
          <Button variant="outline" onClick={handleLogout}>Log out</Button>
        </div>
      </div>
    </nav>
  )
}
