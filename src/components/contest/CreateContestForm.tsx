'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, Plus, X, Timer, Activity, Hash, Info, Settings2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from '@/lib/utils'
import { getProblemRatings } from '@/lib/ratings'

export default function CreateContestForm({ suggestedLevel }: { suggestedLevel: number }) {
  const router = useRouter()
  const [title, setTitle] = useState('Practice Contest')
  const [level, setLevel] = useState(suggestedLevel)
  const [duration, setDuration] = useState(120)
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const VALID_TAGS = [
    '2-sat',
    'binary search',
    'bitmasks',
    'brute force',
    'chinese remainder theorem',
    'combinatorics',
    'communication',
    'constructive algorithms',
    'data structures',
    'dfs and similar',
    'divide and conquer',
    'dp',
    'dsu',
    'expression parsing',
    'fft',
    'flows',
    'games',
    'geometry',
    'graph matchings',
    'graphs',
    'greedy',
    'hashing',
    'implementation',
    'interactive',
    'math',
    'matrices',
    'meet-in-the-middle',
    'number theory',
    'probabilities',
    'schedules',
    'shortest paths',
    'sortings',
    'string suffix structures',
    'strings',
    'ternary search',
    'trees',
    'two pointers'
  ];

  const handleAddTag = (newTag: string | null) => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          level: Number(level),
          duration_min: Number(duration),
          tag_filter: tags
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create contest')

      toast.success('Contest created successfully!')
      router.push(`/contests/${data.contestId}`)
    } catch (err: any) {
      toast.error(err.message)
      setLoading(false)
    }
  }

  const estimatedRatings = getProblemRatings(level);

  return (
    <div className="w-full mt-2 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column - Context */}
        <div className="md:col-span-4 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Plus className="w-6 h-6 text-neutral-400" />
            Create Contest
          </h1>
          <p className="text-base text-neutral-500 leading-relaxed">
            Configure your practice session. Choose a difficulty level based on the Codeforces rating scale, set a duration, and optionally narrow down the problem set using specific tags.
          </p>
          <div className="hidden md:block pt-6 border-t border-border mt-8">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Settings2 className="w-4 h-4 text-neutral-500" /> Pro Tips</h3>
            <ul className="space-y-3 text-sm text-neutral-500 list-disc pl-4">
              <li>A level of 12 roughly correlates to 1200-1600 rated problems.</li>
              <li>Selecting too many specific tags might result in no problems being found.</li>
              <li>Invite your friends by sharing the lobby link once created.</li>
            </ul>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="md:col-span-8 md:max-w-2xl">
          <Card className="bg-card border border-border rounded-md shadow-sm">
            <CardHeader className="pb-4 border-b border-border bg-neutral-50/50 dark:bg-neutral-900/50">
              <CardTitle className="text-base font-semibold">Contest Configuration</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title */}
                <div className="space-y-2.5">
                  <Label htmlFor="title" className="text-sm font-medium text-neutral-500">Contest Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    className="h-11 bg-transparent border-border rounded-sm focus:border-foreground focus:ring-0 text-base"
                  />
                </div>

                {/* Difficulty Section */}
                <div className="space-y-4 bg-neutral-50 dark:bg-neutral-900 p-5 rounded-md border border-border">
                  <div className="space-y-2.5">
                    <Label htmlFor="level" className="flex items-center gap-2 text-sm font-medium text-foreground"><Activity className="w-4 h-4 text-neutral-500" /> Difficulty Level (1 to 109)</Label>
                    <p className="text-xs text-neutral-500">Determines the rating range of the selected problems. Your suggested level is <span className="font-bold text-foreground">{suggestedLevel}</span>.</p>
                    <Input
                      id="level"
                      type="number"
                      min={1}
                      max={109}
                      value={level}
                      onChange={e => setLevel(Number(e.target.value))}
                      required
                      className="h-11 bg-background border-border rounded-sm focus:border-foreground focus:ring-0 text-base font-mono max-w-[200px]"
                    />
                  </div>
                  <div className="bg-card p-4 rounded-sm border border-border">
                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-3">Estimated Problem Ratings</p>
                    <div className="flex flex-wrap gap-2">
                      {estimatedRatings.map((r, i) => (
                        <Badge key={i} variant="outline" className="px-2.5 py-1 font-mono text-sm text-foreground bg-neutral-100 dark:bg-neutral-800 border-border">
                          {r}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium text-foreground"><Timer className="w-4 h-4 text-neutral-500" /> Duration</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {[30, 60, 90, 120].map(mins => (
                      <Button
                        key={mins}
                        type="button"
                        variant={duration === mins ? "default" : "outline"}
                        className={cn(
                          "h-11 text-base font-mono",
                          duration === mins ? "bg-foreground text-background hover:bg-foreground/90" : "text-foreground border-border hover:border-neutral-400 dark:hover:border-neutral-600"
                        )}
                        onClick={() => setDuration(mins)}
                      >
                        {mins}m
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <Input
                      type="number"
                      min={15}
                      max={300}
                      step={15}
                      value={duration}
                      onChange={e => setDuration(Number(e.target.value))}
                      required
                      className="w-28 h-11 bg-transparent border-border rounded-sm focus:border-foreground focus:ring-0 text-base font-mono"
                    />
                    <span className="text-sm text-neutral-500">Custom minutes</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-foreground"><Hash className="w-4 h-4 text-neutral-500" /> Tags (Optional)</Label>
                    <TooltipProvider delay={100}>
                      <Tooltip>
                        <TooltipTrigger type="button" className="cursor-help flex items-center">
                          <Info className="w-4 h-4 text-neutral-400 hover:text-foreground transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs p-4 bg-card text-foreground shadow-lg border border-border rounded-sm">
                          <div className="space-y-2 text-sm leading-relaxed">
                            <p><strong>How tags work:</strong></p>
                            <ul className="list-disc pl-4 space-y-1.5 text-neutral-500">
                              <li>Every problem will contain <em>at least one</em> of your selected tags.</li>
                              <li>If no match for a specific rating, the system searches within <strong className="text-foreground">±100 rating points</strong>.</li>
                              <li>If no match is found, contest creation will fail. Use broad tags for difficult contests!</li>
                            </ul>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
                    {tags.length === 0 && <span className="text-sm text-neutral-400 italic flex items-center h-8">No tags selected</span>}
                    {tags.map(tag => (
                      <Badge key={tag} variant="outline" className="px-3 py-1.5 flex items-center gap-2 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-border">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors bg-neutral-200 dark:bg-neutral-700 rounded-full p-0.5"><X className="w-3 h-3" /></button>
                      </Badge>
                    ))}
                  </div>
                  <Select key={tags.length} onValueChange={handleAddTag}>
                    <SelectTrigger className="w-full h-11 bg-transparent border-border rounded-sm text-base focus:ring-0 focus:border-foreground">
                      <SelectValue placeholder="Select a tag to add..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-64 bg-card border-border shadow-lg rounded-sm p-1">
                      {VALID_TAGS.filter(t => !tags.includes(t)).map(tag => (
                        <SelectItem key={tag} value={tag} className="text-base py-2">{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold bg-foreground text-background hover:bg-foreground/90 mt-4">
                  {loading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Contest...</>
                  ) : (
                    'Create Contest'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
