'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense, useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

function LoginForm() {
  const supabase = createClient()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      toast.error(decodeURIComponent(error))
    }
  }, [searchParams])

  const handleGithubLogin = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  return (
    <Card className="w-full max-w-md border-border/50 shadow-xl overflow-hidden">
      <CardHeader className="text-center pb-8 pt-10">
        <div className="mx-auto mb-6 bg-background p-2 rounded-2xl shadow-sm border border-border/50 w-fit">
          <Image src="/logo.png" alt="SquadCP Logo" width={236} height={192} className="h-16 w-auto rounded-xl" priority />
        </div>
        <CardTitle className="text-3xl font-extrabold tracking-tight">SquadCP</CardTitle>
        <CardDescription className="text-base mt-2">Level up your competitive programming with your squad.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pb-10 px-8">
        <Button className="w-full h-12 text-md font-semibold gap-2 transition-all hover:scale-[1.02]" onClick={handleGithubLogin} disabled={loading}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FaGithub className="w-5 h-5" />}
          {loading ? 'Redirecting to GitHub...' : 'Sign in with GitHub'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-background relative">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>

      <p className="absolute bottom-6 text-sm text-muted-foreground font-medium">
        Built for ICPC teams. Powered by Codeforces.
      </p>
    </div>
  )
}
