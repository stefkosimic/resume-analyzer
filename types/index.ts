export interface FeedbackResults {
  clarity: number;
  relevance: number;
  grammar: number;
  structure: number;
  impact: number;
  ATS_optimization: number;
  overall_score: number;
  strengths: string[];
  improvements: string[];
  summary: string;
}
