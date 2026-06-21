'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const supabase = createClient()

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md border shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-primary">SquadCP</CardTitle>
          <CardDescription>Sign in with your Codeforces-linked GitHub</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <Button className="w-full h-12 text-md" onClick={handleGithubLogin}>
            Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
