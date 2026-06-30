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

export function computeICPCPenalty(solveTimeSec: number, wrongAttempts: number): number {
  // Each wrong attempt adds 20 minutes (1200 seconds) penalty
  return solveTimeSec + wrongAttempts * 1200;
}

export interface MemberSubmission {
  user_id: string;
  problem_slot: number;
  verdict: string;
  elapsed_sec: number;
}

export function computeTeamResults(
  memberSubmissions: MemberSubmission[], 
  contestProblems: { slot: number, max_points: number }[]
) {
  let totalScore = 0;
  let problemsSolved = 0;
  let totalPenaltyTime = 0;
  
  const problemDetails = new Map<number, { solved: boolean, firstACSec: number | null, wrongAttempts: number }>();
  
  for (const cp of contestProblems) {
    const subs = memberSubmissions.filter(s => s.problem_slot === cp.slot);
    subs.sort((a, b) => a.elapsed_sec - b.elapsed_sec);
    
    let solved = false;
    let firstACSec: number | null = null;
    let wrongAttempts = 0;
    
    for (const s of subs) {
      if (s.verdict === 'AC') {
        solved = true;
        firstACSec = s.elapsed_sec;
        break;
      } else if (s.verdict !== 'CE') {
        wrongAttempts++;
      }
    }
    
    problemDetails.set(cp.slot, { solved, firstACSec, wrongAttempts });
    
    if (solved && firstACSec !== null) {
      problemsSolved++;
      totalPenaltyTime += computeICPCPenalty(firstACSec, wrongAttempts);
      totalScore += computeScore(cp.max_points, Math.floor(firstACSec / 60), wrongAttempts);
    }
  }
  
  return { problemsSolved, totalPenaltyTime, totalScore, problemDetails };
}
