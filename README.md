# SquadCP

SquadCP is a social, multiplayer competitive programming platform heavily inspired by the "ThemeCP" training methodology. It is designed specifically as a collaborative ICPC training tool for small teams (3-10 users), focused on a zero-cost, high-velocity development model.

## Core Philosophy
- **Team-Focused:** Built for a specific ICPC team. No public leaderboards, no strangers.
- **Zero Cost:** Leveraging Vercel (Next.js serverless) and Supabase (PostgreSQL, Auth, Realtime) free tiers.
- **Minimalist Complexity:** Features that don't directly benefit a 3-person training environment are omitted.

## Key Features
- **Level-Based Contests:** Contests scale from Level 1 (four 800-rated problems) up to Level 109 (four 3500-rated problems).
- **Codeforces Problem Cache:** Dynamically syncs and caches problems directly from Codeforces (filtering out extremely old rounds, retaining >= 1600).
- **Real-time Leaderboard:** Standings update automatically via Supabase Realtime when any participant clicks the "Sync Status" button.
- **Two Progression Systems:**
  - *Skill Rating:* A Codeforces-equivalent estimate using exponential moving average with deflation.
  - *Level Progression:* A purely milestone-driven ThemeCP ladder.

## Architecture

### Tech Stack
| Layer | Choice | Why |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | React Server Components, unified backend/frontend |
| **Hosting** | Vercel | Serverless architecture, generous free tier |
| **Database** | Supabase (PostgreSQL) | Managed database, seamless Auth, and free Realtime subscriptions |
| **ORM** | Prisma | Type-safe queries, excellent schema management |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid, beautiful UI generation |

### The "Sync Status" Flow
Unlike typical competitive programming platforms that require continuous polling or custom WebSocket servers:
1. Users join a contest and see the problem list.
2. Users solve problems natively on Codeforces and receive verdicts.
3. Users click the **[🔄 Sync Status]** button in SquadCP.
4. SquadCP backend updates their score in the `contest_participants` table.
5. Supabase Realtime detects the row change and pushes updates to all connected clients instantly.

### Problem Cache & Admin Page
The platform maintains a local cache of Codeforces problems to ensure instant, synchronous contest creation.
- A hardcoded admin (`pmtbmt@gmail.com`) can access the `/admin` page.
- The admin manually clicks **"Refresh Problem Cache"** to fetch new problems from the Codeforces API and batch-upsert them using Prisma.
- This design bypasses the complexity and potential failure points of automated cron jobs or lazy-loaded caches.

### Database Schema (9 Tables)
- `profiles`: Extends Supabase auth, holds ratings and levels.
- `problem_cache`: Codeforces problem repository.
- `groups` & `group_members`: Team management.
- `contests` & `contest_problems`: Defines a contest and its 4 selected problems.
- `contest_participants` & `submissions`: Tracks live contest standing and verdicts.
- `rating_history`: Audit log for every rating and level change per contest.

## Development Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=your_prisma_connection_string
   ```

3. Push the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Next Steps for Future Iterations
- Squad Rating (multiplayer Elo)
- Friends System
- Achievement Badges
- Activity Feeds
- Scheduled Contests
