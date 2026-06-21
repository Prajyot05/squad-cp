'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Menu, LogOut, User, Loader2 } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await supabase.auth.signOut()
    window.location.href = '/auth/login'
  }

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link 
        href="/" 
        onClick={() => setOpen(false)}
        className={cn(
          "text-sm transition-colors relative", 
          pathname === '/' ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
          mobile && "block py-2 text-lg"
        )}
      >
        Dashboard
        {pathname === '/' && !mobile && <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary rounded-t-full" />}
      </Link>
      <Link 
        href="/leaderboard" 
        onClick={() => setOpen(false)}
        className={cn(
          "text-sm transition-colors relative", 
          pathname === '/leaderboard' ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
          mobile && "block py-2 text-lg"
        )}
      >
        Leaderboard
        {pathname === '/leaderboard' && !mobile && <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary rounded-t-full" />}
      </Link>
    </>
  )

  return (
    <nav className="border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/logo.png" alt="SquadCP Logo" width={32} height={32} className="rounded-md transition-transform group-hover:scale-105" style={{ width: 'auto', height: 'auto' }} priority />
            <span className="font-bold text-2xl tracking-tight text-primary">SquadCP</span>
          </Link>
          <div className="hidden md:flex gap-6 relative h-full items-center">
            <NavLinks />
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          
          <Link href="/profile" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "hidden sm:flex")}>
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Link>
          
          <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden sm:flex" title="Log out" disabled={loggingOut}>
            {loggingOut ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogOut className="h-5 w-5" />}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            {/* @ts-ignore */}
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden"><Menu className="h-5 w-5" /></Button>} />
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <Image src="/logo.png" alt="SquadCP Logo" width={24} height={24} className="rounded-md" style={{ width: 'auto', height: 'auto' }} />
                  SquadCP
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks mobile />
                <div className="h-px bg-border my-4" />
                <Link 
                  href="/profile" 
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <User className="h-5 w-5" /> Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground transition-colors text-left disabled:opacity-50"
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
