export function computeScore(
  maxPoints: number,
  solveTimeMinutes: number | null,
  wrongAttempts: number
): number {
  if (solveTimeMinutes === null) return 0;
  
  const timeDecay = Math.max(0.3, 1.0 - 0.004 * solveTimeMinutes);
  const penalty = 50 * wrongAttempts;
  
  return Math.max(0, Math.round(maxPoints * timeDecay - penalty));
}
