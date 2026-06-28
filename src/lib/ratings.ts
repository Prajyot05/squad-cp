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
    newLevel = Math.min(109, contestLevel + 1);
  } else {
    newLevel = Math.max(1, contestLevel - 1);
  }
  
  let change: "advance" | "stay" | "demote" = "stay";
  if (newLevel > currentLevel) change = "advance";
  else if (newLevel < currentLevel) change = "demote";
  
  return { newLevel, change };
}

export function getProblemRatings(level: number): number[] {
  if (level <= 13) {
    const earlyLevels: Record<number, number[]> = {
      1: [800, 800, 800, 800],
      2: [800, 800, 800, 900],
      3: [800, 800, 900, 900],
      4: [800, 900, 900, 900],
      5: [800, 900, 900, 1000],
      6: [800, 900, 1000, 1000],
      7: [800, 1000, 1000, 1000],
      8: [800, 1000, 1000, 1100],
      9: [800, 1000, 1100, 1100],
      10: [800, 1000, 1100, 1200],
      11: [800, 1000, 1200, 1200],
      12: [800, 1000, 1200, 1300],
      13: [800, 1000, 1200, 1400],
    };
    return earlyLevels[level] || [800, 800, 800, 800];
  }

  const base = [800, 1000, 1200, 1400];
  const cycles = level - 13;
  const fullCycles = Math.floor(cycles / 4);
  const remainder = cycles % 4;

  const ratings = base.map(r => r + fullCycles * 100);
  for (let i = 0; i < remainder; i++) {
    ratings[i] += 100;
  }

  return ratings;
}
