import { db } from '@/lib/db'
import { getProblemRatings } from '@/lib/ratings'

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
