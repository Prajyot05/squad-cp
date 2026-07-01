import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TrendingUp, Crosshair, Zap, Award, Target, ChevronRight, ShieldAlert, Timer } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-background/90 z-[-1]" />
        
        {/* Abstract Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] z-[-2]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neutral-500/10 rounded-full blur-[100px] z-[-2]" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            The Ultimate Competitive Programming Arena
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Stop getting TLE on <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
              Test Case 2.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-500 max-w-2xl mx-auto font-medium leading-relaxed">
            SquadCP is a hardcore training platform built for competitive programmers. Dynamic skill ratings, brutal time penalties, and 109 levels of pure suffering. 
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/auth/login" className={cn(buttonVariants({ size: 'lg' }), "w-full sm:w-auto text-base h-14 px-8 bg-foreground text-background hover:bg-foreground/90 font-bold gap-2 group")}>
              Start Training Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#how-it-works" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), "w-full sm:w-auto text-base h-14 px-8 font-medium")}>
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Intro / Philosophy */}
      <section id="how-it-works" className="py-24 bg-neutral-50 dark:bg-neutral-900/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200 fill-mode-both">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                We don't just care if you solved it. <br/>
                <span className="text-neutral-400">We care how fast you solved it.</span>
              </h2>
              <p className="text-lg text-neutral-500 leading-relaxed">
                Most platforms just check if your code compiles and passes tests. That's cute. 
                In the real world (and in ICPC), speed is everything. We built an Elo-style rating engine that tracks your performance based on problem difficulty, solve time, and wrong attempts.
              </p>
              <p className="text-lg text-neutral-500 leading-relaxed">
                If you take 2 hours to solve an 800-rated problem, you're not getting full points. Because nobody likes a slowpoke.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 fill-mode-both">
              <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
                <Target className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">109 Boss Levels</h3>
                <p className="text-neutral-500 text-sm">Progressive difficulty scaling. Solve them all to level up.</p>
              </div>
              <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
                <TrendingUp className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Dynamic Rating</h3>
                <p className="text-neutral-500 text-sm">Your skill rating updates instantly based on your performance.</p>
              </div>
              <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
                <Zap className="w-8 h-8 text-amber-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Time Decay</h3>
                <p className="text-neutral-500 text-sm">Points melt away as the clock ticks. Act fast.</p>
              </div>
              <div className="bg-background border border-border p-6 rounded-xl shadow-sm">
                <ShieldAlert className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Brutal Penalties</h3>
                <p className="text-neutral-500 text-sm">-50 points or +20 minutes per wrong submission. Ouch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Algorithms (Deep Dive) */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          
          {/* Rating System */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-neutral-950 rounded-2xl border border-neutral-800 p-8 shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="font-mono text-sm text-neutral-400 space-y-4">
                <p className="text-emerald-400">// The Speed Bonus Formula</p>
                <p><span className="text-pink-500">const</span> speedBonus = <span className="text-purple-400">150</span> * Math.<span className="text-blue-400">sqrt</span>(</p>
                <p className="pl-4"><span className="text-purple-400">1</span> - (solveTime / contestDuration)</p>
                <p>);</p>
                <br/>
                <p className="text-emerald-400">// Deflation for cheese</p>
                <p><span className="text-pink-500">let</span> deflation = <span className="text-purple-400">150</span>;</p>
                <p><span className="text-pink-500">if</span> (hasTagFilter) deflation += <span className="text-purple-400">100</span>;</p>
                <p><span className="text-pink-500">if</span> (participantCount {"<="} <span className="text-purple-400">5</span>) deflation += <span className="text-purple-400">50</span>;</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 text-emerald-500 font-semibold tracking-wider uppercase text-sm">
                <TrendingUp className="w-5 h-5" />
                Algorithm 01: Skill Rating
              </div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">The Anti-Cheese Rating Engine</h3>
              <p className="text-neutral-500 leading-relaxed text-lg">
                Your rating isn't just a number; it's a reflection of your speed and accuracy. We calculate a weighted performance based on the Codeforces ratings of the problems you attempt. 
              </p>
              <ul className="space-y-4 text-neutral-500">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-neutral-200 dark:bg-neutral-800 p-1 rounded-sm"><Zap className="w-4 h-4 text-foreground" /></div>
                  <span><strong>Speed Multiplier:</strong> A massive speed bonus (up to 150 points) is injected into your performance rating if you solve a problem quickly relative to the contest duration.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-neutral-200 dark:bg-neutral-800 p-1 rounded-sm"><ShieldAlert className="w-4 h-4 text-foreground" /></div>
                  <span><strong>Deflation Penalties:</strong> Did you use a tag filter to only get "math" problems? That's a 100-point deflation penalty on your performance. Small contest? That's another 50 points off. We keep it strictly competitive.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Level Progression */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-blue-500 font-semibold tracking-wider uppercase text-sm">
                <Award className="w-5 h-5" />
                Algorithm 02: 109 Levels
              </div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">The Grind to Level 109</h3>
              <p className="text-neutral-500 leading-relaxed text-lg">
                SquadCP introduces an RPG-style leveling system. You start at Level 1, facing basic 800-rated problems. Your objective? Solve them all.
              </p>
              <ul className="space-y-4 text-neutral-500">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-neutral-200 dark:bg-neutral-800 p-1 rounded-sm"><TrendingUp className="w-4 h-4 text-foreground" /></div>
                  <span><strong>Level Up:</strong> Solve 100% of the problems in a contest, and you advance to the next level. The problem ratings scale up progressively—Levels 1-13 introduce the basics, and from Level 14 onwards, problem ratings scale infinitely by +100 per cycle.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-neutral-200 dark:bg-neutral-800 p-1 rounded-sm"><Crosshair className="w-4 h-4 text-foreground" /></div>
                  <span><strong>Level Down:</strong> Fail to solve every problem? You might get demoted. It's unforgiving, but it forces you to master a difficulty before moving on.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-900 border border-border rounded-2xl p-8 relative overflow-hidden">
               <div className="space-y-6">
                 {/* Visual representation of leveling */}
                 {[1, 2, 3].map((lvl, i) => (
                   <div key={lvl} className="flex items-center gap-4">
                     <div className={cn("w-12 h-12 flex items-center justify-center font-bold font-mono rounded-lg border", i === 2 ? "bg-foreground text-background border-foreground" : "bg-background text-neutral-400 border-border")}>
                       L{lvl}
                     </div>
                     <div className="flex-1 space-y-2">
                       <div className="flex gap-2">
                         <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">800</span>
                         <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">800</span>
                         <span className={cn("text-xs font-mono px-2 py-0.5 rounded", i > 0 ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400" : "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-medium")}>{i > 0 ? '900' : '800'}</span>
                       </div>
                       <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                         <div className={cn("h-full rounded-full", i === 2 ? "w-1/2 bg-blue-500" : "w-full bg-emerald-500")} />
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-50 dark:from-neutral-900 to-transparent" />
            </div>
          </div>
          
          {/* Scoring Mechanics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
               <div className="col-span-2 bg-background border border-border p-6 rounded-xl flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                   <ShieldAlert className="w-6 h-6 text-red-500" />
                 </div>
                 <div>
                   <div className="font-bold text-foreground">Wrong Attempt</div>
                   <div className="text-sm text-neutral-500 font-mono">-50 pts or +20 min</div>
                 </div>
               </div>
               <div className="bg-background border border-border p-6 rounded-xl flex flex-col items-center text-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                   <Timer className="w-6 h-6 text-amber-500" />
                 </div>
                 <div>
                   <div className="font-bold text-foreground">Time Decay</div>
                   <div className="text-xs text-neutral-500 mt-1">Loses 0.4% value per minute</div>
                 </div>
               </div>
               <div className="bg-background border border-border p-6 rounded-xl flex flex-col items-center text-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                   <Award className="w-6 h-6 text-blue-500" />
                 </div>
                 <div>
                   <div className="font-bold text-foreground">ICPC Mode</div>
                   <div className="text-xs text-neutral-500 mt-1">Standard 20-min penalty rules</div>
                 </div>
               </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 text-amber-500 font-semibold tracking-wider uppercase text-sm">
                <Timer className="w-5 h-5" />
                Algorithm 03: The Scoring Matrix
              </div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">Every Minute Counts</h3>
              <p className="text-neutral-500 leading-relaxed text-lg">
                Standard contests utilize a dynamic time-decay scoring model. The formula is <code className="text-sm bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-foreground">Score = MaxPoints * max(0.3, 1.0 - 0.004 * minutes)</code>. This means the longer you take, the fewer points you get (down to a minimum of 30%).
              </p>
              <p className="text-neutral-500 leading-relaxed text-lg">
                On top of that, every wrong submission deducts a flat <strong>50 points</strong>. If you're practicing in ICPC mode, we strictly follow the official rules: solve time in seconds + <strong>20 minutes</strong> (1200 seconds) for every rejected attempt.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 border-t border-border bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to get humbled?</h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Join the arena, link your Codeforces account, and see if you have what it takes to hit Level 109.
          </p>
          <Link href="/auth/login" className={cn(buttonVariants({ size: 'lg' }), "bg-background text-foreground hover:bg-neutral-200 h-14 px-10 text-lg font-bold")}>
            Join SquadCP
          </Link>
        </div>
      </section>

    </div>
  )
}
