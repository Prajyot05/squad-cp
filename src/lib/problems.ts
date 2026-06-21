import { db } from '@/lib/db'

export function getProblemRatings(level: number): number[] {
  const B = 800 + (level - 1) * 25;
  const spread = Math.min(150, 50 + level);
  
  const offsets = [-spread, -Math.floor(spread / 3), Math.floor(spread / 3), spread];
  const raw = offsets.map(off => B + off);
  
  // Snap to nearest 100
  let snapped = raw.map(r => Math.max(800, Math.min(3500, Math.round(r / 100) * 100)));
  
  // Ensure non-decreasing
  for (let i = 1; i < 4; i++) {
    if (snapped[i] < snapped[i - 1]) snapped[i] = snapped[i - 1];
  }
  
  return snapped.sort((a, b) => a - b);
}

export async function selectProblems(level: number, tagFilter: string[] | null) {
  const targetRatings = getProblemRatings(level);
  const selected: { id: number, rating: number, cf_contest_id: number, cf_index: string, name: string }[] = [];

  for (const targetRating of targetRatings) {
    let candidates = await db.problemCache.findMany({
      where: {
        rating: targetRating,
        ...(tagFilter && tagFilter.length > 0 ? { tags: { hasSome: tagFilter } } : {}),
        id: { notIn: selected.map(p => p.id) },
      },
    });

    if (candidates.length === 0) {
      candidates = await db.problemCache.findMany({
        where: {
          rating: { gte: targetRating - 100, lte: targetRating + 100 },
          ...(tagFilter && tagFilter.length > 0 ? { tags: { hasSome: tagFilter } } : {}),
          id: { notIn: selected.map(p => p.id) },
        },
      });
    }
    
    // If STILL no candidates (maybe cache is empty), throw error
    if (candidates.length === 0) {
      throw new Error(`Could not find problems around rating ${targetRating}. Did you refresh the cache?`)
    }

    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    selected.push(chosen);
  }

  return selected;
}
