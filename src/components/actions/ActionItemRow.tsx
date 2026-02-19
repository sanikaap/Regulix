import type { ActionItem } from "../../api/actions";
import RBadge from "../ui/RBadge";
import DeadlineCountdown from "../regulations/DeadlineCountdown";
import { Check, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ActionItemRowProps {
  item: ActionItem;
  onStatusChange?: (id: string, status: "Done" | "Dismissed") => void;
}

const ActionItemRow = ({ item, onStatusChange }: ActionItemRowProps) => {
  return (
    <tr className="border-b border-rule last:border-0 transition-colors hover:bg-muted/30">
      <td className="px-6 py-3.5 text-sm text-foreground">{item.action}</td>
      <td className="px-6 py-3.5">
        <RBadge variant="body">{item.regulationTitle}</RBadge>
      </td>
      <td className="px-6 py-3.5">
        <DeadlineCountdown deadline={item.deadline} />
      </td>
      <td className="px-6 py-3.5">
        <RBadge variant="effort">{item.effort}</RBadge>
      </td>
      <td className="px-6 py-3.5">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${
            item.status === "Done"
              ? "bg-score-green-bg text-score-green-text"
              : item.status === "Dismissed"
                ? "bg-muted text-muted-foreground"
                : "bg-score-amber-bg text-score-amber-text"
          }`}
        >
          {item.status}
        </span>
      </td>
      <td className="px-6 py-3.5">
        <div className="flex items-center gap-1">
          {item.status === "Pending" && (
            <>
              <button
                onClick={() => onStatusChange?.(item.id, "Done")}
                className="rounded-lg p-1.5 text-green hover:bg-score-green-bg"
                title="Mark as Done"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => onStatusChange?.(item.id, "Dismissed")}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                title="Dismiss"
              >
                <X size={16} />
              </button>
            </>
          )}
          <Link
            to={`/regulations/${item.regulationId}`}
            className="rounded-lg p-1.5 text-primary hover:bg-muted"
            title="View Regulation"
          >
            <ArrowRight size={16} />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ActionItemRow;
