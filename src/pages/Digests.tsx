import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";
import { fetchDigests, type Digest } from "../api/digests";
import { formatWeekRange } from "../utils/dates";

const Digests = () => {
  const [digests, setDigests] = useState<Digest[]>([]);

  useEffect(() => {
    fetchDigests().then(setDigests);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px] flex-1">
        <TopBar
          title="Weekly Digests"
          subtitle="Every Monday morning, your personalised regulatory briefing."
        />

        <main className="p-8">
          <div className="max-w-2xl space-y-5">
            {digests.map((digest) => (
              <div
                key={digest.id}
                className="rounded-xl border border-rule bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-bold text-foreground">
                    {formatWeekRange(digest.weekStart, digest.weekEnd)}
                  </h3>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-xs font-medium text-foreground">
                    {digest.itemsCount} items
                  </span>
                </div>
                <ul className="mb-4 space-y-2">
                  {digest.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <button className="text-sm font-medium text-primary hover:underline">
                    View full digest →
                  </button>
                  <span className="text-xs text-muted-foreground">
                    Sent{" "}
                    {new Date(digest.sentAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Digests;
