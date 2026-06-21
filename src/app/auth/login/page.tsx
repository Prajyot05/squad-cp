'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { toast } from 'sonner'

function LoginForm() {
  const supabase = createClient()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      toast.error(decodeURIComponent(error))
    }
  }, [searchParams])

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  return (
    <Card className="w-full max-w-md glass border-border/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      <CardHeader className="text-center pb-8 pt-10">
        <div className="mx-auto mb-6 bg-background p-2 rounded-2xl shadow-sm border border-border/50">
          <Image src="/logo.png" alt="SquadCP Logo" width={80} height={80} className="rounded-xl" />
        </div>
        <CardTitle className="text-3xl font-extrabold tracking-tight">SquadCP</CardTitle>
        <CardDescription className="text-base mt-2">Level up your competitive programming with your squad.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pb-10 px-8">
        <Button className="w-full h-12 text-md font-semibold gap-2 transition-all hover:scale-[1.02]" onClick={handleGithubLogin}>
          <FaGithub className="w-5 h-5" />
          Sign in with GitHub
        </Button>
      </CardContent>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Animated gradient background orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse delay-1000 pointer-events-none" />
      
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>

      <p className="absolute bottom-6 text-sm text-muted-foreground font-medium">
        Built for ICPC teams. Powered by Codeforces.
      </p>
    </div>
  )
}
