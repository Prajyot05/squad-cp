'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Menu, LogOut, User, Loader2, Shield } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState, useEffect } from 'react'
import { NotificationBell } from '@/components/NotificationBell'

export default function Navbar({ isAdminUser = false }: { isAdminUser?: boolean }) {
  const pathname = usePathname()
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id)
    })
  }, [])

  const handleLogout = async () => {
    setLoggingOut(true)
    await supabase.auth.signOut()
    window.location.href = '/auth/login'
  }

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link
        href="/dashboard"
        onClick={() => setOpen(false)}
        className={cn(
          "text-sm transition-colors relative",
          pathname === '/dashboard' ? "text-foreground font-medium" : "text-neutral-500 hover:text-foreground",
          mobile && "block py-2 text-base"
        )}
      >
        Dashboard
        {pathname === '/dashboard' && !mobile && <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-foreground" />}
      </Link>
      <Link
        href="/leaderboard"
        onClick={() => setOpen(false)}
        className={cn(
          "text-sm transition-colors relative",
          pathname === '/leaderboard' ? "text-foreground font-medium" : "text-neutral-500 hover:text-foreground",
          mobile && "block py-2 text-base"
        )}
      >
        Leaderboard
        {pathname === '/leaderboard' && !mobile && <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-foreground" />}
      </Link>
      <Link
        href="/teams"
        onClick={() => setOpen(false)}
        className={cn(
          "text-sm transition-colors relative",
          pathname === '/teams' ? "text-foreground font-medium" : "text-neutral-500 hover:text-foreground",
          mobile && "block py-2 text-base"
        )}
      >
        Teams
        {pathname === '/teams' && !mobile && <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-foreground" />}
      </Link>
    </>
  )

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SquadCP Logo" width={400} height={400} className="h-7 w-auto rounded-sm" priority />
            <span className="font-bold text-lg tracking-tight text-foreground">SquadCP</span>
          </Link>
          <div className="hidden md:flex gap-6 relative h-full items-center">
            <NavLinks />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {userId && <NotificationBell userId={userId} />}
          <ThemeToggle />

          {isAdminUser && (
            <Link href="/admin" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "hidden sm:flex text-neutral-500 hover:text-foreground")} title="Admin Dashboard">
              <Shield className="h-5 w-5" />
              <span className="sr-only">Admin</span>
            </Link>
          )}

          <Link href="/profile" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "hidden sm:flex text-neutral-500 hover:text-foreground")}>
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Link>

          <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden sm:flex text-neutral-500 hover:text-foreground" title="Log out" disabled={loggingOut}>
            {loggingOut ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogOut className="h-5 w-5" />}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            {/* @ts-ignore */}
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden text-neutral-500"><Menu className="h-5 w-5" /></Button>} />
            <SheetContent side="right" className="w-[280px] sm:w-[360px] bg-background border-l border-border">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <Image src="/logo.png" alt="SquadCP Logo" width={236} height={192} className="h-5 w-auto rounded-sm" />
                  <span className="font-bold text-foreground">SquadCP</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks mobile />
                <div className="h-px bg-border my-2" />
                {isAdminUser && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-base text-neutral-500 hover:text-foreground transition-colors"
                  >
                    <Shield className="h-5 w-5" /> Admin
                  </Link>
                )}
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-base text-neutral-500 hover:text-foreground transition-colors"
                >
                  <User className="h-5 w-5" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-2 text-base text-neutral-500 hover:text-foreground transition-colors text-left disabled:opacity-50"
                >
                  {loggingOut ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogOut className="h-5 w-5" />} Log out
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
