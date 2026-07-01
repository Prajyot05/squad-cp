'use client'

import Link from 'next/link'
import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function MarketingNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(!!data.user)
    })
  }, [])

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="SquadCP Logo" width={400} height={400} className="h-7 w-auto rounded-sm" priority />
          <span className="font-bold text-lg tracking-tight text-foreground">SquadCP</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2">
            {isAuthenticated === null ? (
              <div className="w-24 h-9 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md" />
            ) : isAuthenticated ? (
              <Link href="/dashboard" className={cn(buttonVariants(), "bg-foreground text-background hover:bg-foreground/90 font-medium")}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className={cn(buttonVariants({ variant: 'ghost' }), "text-neutral-500 hover:text-foreground font-medium")}>
                  Log in
                </Link>
                <Link href="/auth/login" className={cn(buttonVariants(), "bg-foreground text-background hover:bg-foreground/90 font-medium")}>
                  Start Training
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
