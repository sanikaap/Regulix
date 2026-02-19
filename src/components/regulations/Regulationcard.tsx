import { Link } from "react-router-dom";
import type { Regulation } from "../../api/regulations";
import ScorePill from "../ui/ScorePill";
import RBadge from "../ui/RBadge";
import RelevanceBar from "./RelevanceBar";
import DeadlineCountdown from "./DeadlineCountdown";

interface RegulationCardProps {
  regulation: Regulation;
}

const RegulationCard = ({ regulation }: RegulationCardProps) => {
  return (
    <div className="flex flex-col rounded-xl border border-rule bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-foreground">
          {regulation.title}
        </h3>
        <ScorePill score={regulation.relevanceScore} />
      </div>
      <RelevanceBar score={regulation.relevanceScore} />
      <div className="mt-3 flex flex-wrap gap-2">
        <RBadge variant="body">{regulation.body}</RBadge>
        <RBadge variant="jurisdiction">{regulation.jurisdiction}</RBadge>
        <RBadge variant="status">{regulation.status}</RBadge>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
        {regulation.summary}
      </p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <DeadlineCountdown deadline={regulation.deadline} />
        <Link
          to={`/regulations/${regulation.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default RegulationCard;
