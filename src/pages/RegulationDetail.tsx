import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";
import ScorePill from "../components/ui/ScorePill";
import RBadge from "../components/ui/RBadge";
import RButton from "../components/ui/RButton";
import RelevanceBar from "../components/regulations/RelevanceBar";
import DeadlineCountdown from "../components/regulations/DeadlineCountdown";
import {
  fetchRegulationById,
  fetchRegulations,
  type Regulation,
} from "../api/regulations";
import { formatDate } from "../utils/dates";
import { getScoreLabel } from "../utils/scores";
import { CheckCircle } from "lucide-react";

const RegulationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [regulation, setRegulation] = useState<Regulation | null>(null);
  const [related, setRelated] = useState<Regulation[]>([]);

  useEffect(() => {
    if (id) {
      fetchRegulationById(id).then((r) => setRegulation(r || null));
      fetchRegulations().then((all) =>
        setRelated(all.filter((r) => r.id !== id).slice(0, 3)),
      );
    }
  }, [id]);

  if (!regulation)
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="ml-[240px] flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px] flex-1">
        <TopBar title={regulation.title} />

        <main className="p-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/regulations" className="hover:text-primary">
              Regulations
            </Link>
            <span>›</span>
            <span className="text-foreground">{regulation.title}</span>
          </div>

          <div className="grid grid-cols-[1fr_380px] gap-8">
            {/* Left */}
            <div>
              {/* Metadata */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <RBadge variant="body">{regulation.body}</RBadge>
                <RBadge variant="jurisdiction">
                  {regulation.jurisdiction}
                </RBadge>
                <span className="text-xs text-muted-foreground">
                  Published {formatDate(regulation.publishedDate)}
                </span>
                <DeadlineCountdown deadline={regulation.deadline} />
                <RBadge variant="status">{regulation.status}</RBadge>
              </div>

              {/* Relevance Score */}
              <div className="mb-8 rounded-xl border border-rule bg-card p-6 shadow-card">
                <div className="mb-3 flex items-center gap-4">
                  <span className="font-mono text-4xl font-bold text-foreground">
                    {regulation.relevanceScore.toFixed(2)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {getScoreLabel(regulation.relevanceScore)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      to your company profile
                    </p>
                  </div>
                  <div className="ml-auto">
                    <ScorePill score={regulation.relevanceScore} />
                  </div>
                </div>
                <RelevanceBar score={regulation.relevanceScore} />
              </div>

              {/* Why This Applies */}
              <div className="mb-8">
                <h2 className="mb-4 text-lg font-bold text-foreground">
                  Why This Applies To You
                </h2>
                <ul className="space-y-2">
                  {regulation.matchReasons.map((reason, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-green"
                      />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Required */}
              <div className="mb-8">
                <h2 className="mb-4 text-lg font-bold text-foreground">
                  Action Required
                </h2>
                <div className="rounded-xl border border-rule bg-card p-5 shadow-card">
                  <p className="mb-3 text-sm text-foreground">
                    {regulation.actionRequired}
                  </p>
                  <div className="flex items-center gap-3">
                    <RBadge variant="effort">
                      {regulation.effortEstimate}
                    </RBadge>
                    <span className="text-xs text-muted-foreground">
                      Deadline: {formatDate(regulation.deadline)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <RButton variant="success" size="sm">
                  Mark as Done
                </RButton>
                <RButton variant="secondary" size="sm">
                  Dismiss
                </RButton>
                <RButton variant="primary" size="sm">
                  Escalate to Team
                </RButton>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              {/* Scan Summary */}
              <div className="rounded-xl border border-rule bg-card p-5 shadow-card">
                <h3 className="mb-3 text-base font-bold text-foreground">
                  Scan Summary
                </h3>
                <p className="text-sm text-muted-foreground">
                  {regulation.summary}
                </p>
              </div>

              {/* Related */}
              <div className="rounded-xl border border-rule bg-card p-5 shadow-card">
                <h3 className="mb-3 text-base font-bold text-foreground">
                  Related Regulations
                </h3>
                <div className="space-y-3">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/regulations/${r.id}`}
                      className="block rounded-lg border border-rule bg-background p-3 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">
                          {r.title}
                        </p>
                        <ScorePill score={r.relevanceScore} />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {r.body} · {r.jurisdiction}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegulationDetail;
