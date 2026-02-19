import { getScoreLevel } from "../../utils/scores";

interface RelevanceBarProps {
  score: number;
}

const RelevanceBar = ({ score }: RelevanceBarProps) => {
  const level = getScoreLevel(score);
  const colors = {
    red: "bg-red",
    amber: "bg-amber",
    green: "bg-green",
  };

  return (
    <div className="h-1 w-full rounded-full bg-muted">
      <div
        className={`h-1 rounded-full ${colors[level]} transition-all duration-500`}
        style={{ width: `${Math.round(score * 100)}%` }}
      />
    </div>
  );
};

export default RelevanceBar;
