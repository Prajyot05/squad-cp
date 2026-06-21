export interface SkillRating {
  rating: number;
  contestsPlayed: number;
}

export function updateSkillRating(
  current: SkillRating,
  problems: { rating: number; solved: boolean; solveTimeMin: number | null }[],
  contestDurationMin: number,
  participantCount: number,
  hasTagFilter: boolean
): SkillRating {
  let perfSum = 0;
  let weightSum = 0;

  for (const p of problems) {
    const weight = p.rating / 800;
    if (p.solved) {
      const speedBonus = 150 * Math.sqrt(1 - p.solveTimeMin! / contestDurationMin);
      perfSum += (p.rating + speedBonus) * weight;
    } else {
      perfSum += (p.rating - 200) * weight;
    }
    weightSum += weight;
  }

  const rawPerformance = weightSum > 0 ? perfSum / weightSum : 800;

  let deflation = 150;
  if (hasTagFilter) deflation += 100;
  if (participantCount <= 5) deflation += 50;

  const deflatedPerformance = rawPerformance - deflation;

  const K = Math.max(0.1, 0.5 - current.contestsPlayed * 0.03);

  const newRating = Math.round(current.rating * (1 - K) + deflatedPerformance * K);

  return {
    rating: Math.max(0, newRating),
    contestsPlayed: current.contestsPlayed + 1,
  };
}

export function evaluateLevelProgression(
  currentLevel: number,
  problemsSolved: number,
  solveTimeFraction: number | null
): { newLevel: number; change: "advance" | "stay" | "demote" } {
  if (problemsSolved === 4) {
    return { newLevel: Math.min(109, currentLevel + 1), change: "advance" };
  }
  if (problemsSolved === 3 && solveTimeFraction !== null && solveTimeFraction <= 0.5) {
    return { newLevel: Math.min(109, currentLevel + 1), change: "advance" };
  }
  if (problemsSolved >= 2) {
    return { newLevel: currentLevel, change: "stay" };
  }
  return { newLevel: Math.max(1, currentLevel - 1), change: "demote" };
}
