export type ScoreLevel = "red" | "amber" | "green";

export const getScoreLevel = (score: number): ScoreLevel => {
  if (score < 0.5) return "red";
  if (score <= 0.75) return "amber";
  return "green";
};

export const getScoreLabel = (score: number): string => {
  if (score >= 0.75) return "High Relevance";
  if (score >= 0.5) return "Medium Relevance";
  return "Low Relevance";
};
