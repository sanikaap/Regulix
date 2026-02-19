import { daysUntil } from "../../utils/dates";

interface DeadlineCountdownProps {
  deadline: string;
}

const DeadlineCountdown = ({ deadline }: DeadlineCountdownProps) => {
  const days = daysUntil(deadline);
  let colorClass = "bg-muted text-muted-foreground";
  if (days < 30) colorClass = "bg-score-red-bg text-score-red-text";
  else if (days <= 90) colorClass = "bg-score-amber-bg text-score-amber-text";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-medium ${colorClass}`}
    >
      {days > 0 ? `${days} days` : "Overdue"}
    </span>
  );
};

export default DeadlineCountdown;
