import { getScoreLevel } from "../../utils/score";

interface ScorePillProps {
  score: number;
}

const levelClasses = {
  red: "bg-score-red-bg text-score-red-text",
  amber: "bg-score-amber-bg text-score-amber-text",
  green: "bg-score-green-bg text-score-green-text",
} as const;

const ScorePill = ({ score }: ScorePillProps) => {
  const level = getScoreLevel(score);

  return (
    <span
      className={`inline-flex min-w-14 items-center justify-center rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold ${levelClasses[level]}`}
    >
      {score.toFixed(2)}
    </span>
  );
};

export default ScorePill;
