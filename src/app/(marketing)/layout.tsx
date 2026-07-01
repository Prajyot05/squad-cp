import MarketingNavbar from '@/components/MarketingNavbar'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      
      <footer className="border-t border-border py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} SquadCP. Built for competitive programming.</p>
          <div className="flex gap-4">
            <a href="https://codeforces.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Powered by Codeforces API</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
