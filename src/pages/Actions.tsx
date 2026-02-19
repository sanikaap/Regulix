import { useEffect, useState, useMemo } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";
import ActionItemRow from "../components/actions/ActionItemRow";
import EmptyState from "../components/ui/EmptyState";
import { fetchActions, type ActionItem } from "../api/actions";
import { CheckCircle } from "lucide-react";

const TABS = ["All", "Pending", "Done", "Dismissed"] as const;

const Actions = () => {
  const [actions, setActions] = useState<ActionItem[]>([]);
  const [tab, setTab] = useState<string>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchActions().then(setActions);
  }, []);

  const handleStatusChange = (id: string, status: "Done" | "Dismissed") => {
    setActions((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const filtered = useMemo(() => {
    let result = actions;
    if (tab !== "All") result = result.filter((a) => a.status === tab);
    if (search)
      result = result.filter(
        (a) =>
          a.action.toLowerCase().includes(search.toLowerCase()) ||
          a.regulationTitle.toLowerCase().includes(search.toLowerCase()),
      );
    return result;
  }, [actions, tab, search]);

  const showEmpty = tab === "Done" && filtered.length === 0;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px] flex-1">
        <TopBar
          title="Actions"
          subtitle={`${actions.filter((a) => a.status === "Pending").length} pending items`}
        />

        <main className="p-8">
          {/* Filters */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    tab === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-rule text-foreground hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search actions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {showEmpty ? (
            <EmptyState
              icon={<CheckCircle size={40} />}
              title="All caught up"
              description="We'll notify you when new actions arrive."
            />
          ) : (
            <div className="overflow-hidden rounded-xl border border-rule bg-card shadow-card">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-rule text-left text-xs font-medium text-muted-foreground">
                    <th className="px-6 py-3">Action</th>
                    <th className="px-6 py-3">Regulation</th>
                    <th className="px-6 py-3">Deadline</th>
                    <th className="px-6 py-3">Effort</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Controls</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((action) => (
                    <ActionItemRow
                      key={action.id}
                      item={action}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Actions;
