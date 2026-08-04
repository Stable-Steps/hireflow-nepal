export interface MatchCandidateJobDto {
  candidate_id: string;
  job_id: string;
}

export interface MatchCandidateJobResult {
  score: number; // 0 - 100
  verdict: "STRONG_MATCH" | "GOOD_MATCH" | "MAYBE" | "POOR_MATCH";
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendation: string;
}
