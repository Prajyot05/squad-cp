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
    <Card className="w-full max-w-md border border-border rounded-md shadow-lg overflow-hidden">
      <CardHeader className="text-center pb-8 pt-10">
        <div className="mx-auto mb-6 bg-neutral-100 dark:bg-neutral-800 p-2 rounded-md border border-border w-fit">
          <Image src="/logo.png" alt="SquadCP Logo" width={236} height={192} className="h-14 w-auto rounded-sm" priority />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">SquadCP</CardTitle>
        <CardDescription className="text-sm mt-2 text-neutral-500">Level up your competitive programming with your squad.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pb-10 px-8">
        <Button className="w-full h-11 font-medium gap-2 bg-foreground text-background hover:bg-foreground/90" onClick={handleGithubLogin} disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FaGithub className="w-4 h-4" />}
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

      <p className="absolute bottom-6 text-[10px] text-neutral-400 font-mono">
        Built for ICPC teams. Powered by Codeforces.
      </p>
    </div>
  )
}
