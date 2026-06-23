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
  contestLevel: number,
  problemsSolved: number,
  totalProblems: number
): { newLevel: number; change: "advance" | "stay" | "demote" } {
  let newLevel;
  if (problemsSolved === totalProblems && totalProblems > 0) {
    newLevel = Math.min(109, contestLevel);
  } else {
    newLevel = Math.max(1, contestLevel - 1);
  }
  
  let change: "advance" | "stay" | "demote" = "stay";
  if (newLevel > currentLevel) change = "advance";
  else if (newLevel < currentLevel) change = "demote";
  
  return { newLevel, change };
}
