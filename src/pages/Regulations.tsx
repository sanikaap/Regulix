import { useEffect, useState, useMemo } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";
import RegulationCard from "../components/regulations/RegulationCard";
import { fetchRegulations, type Regulation } from "../api/regulations";

const FILTERS = ["All", "Final Rule", "Proposed", "Guidance"] as const;
const JURISDICTIONS = ["All", "US", "UK", "EU", "AU"] as const;
const SORTS = ["Newest", "Deadline", "Relevance High→Low"] as const;

const Regulations = () => {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>("All");
  const [sort, setSort] = useState<string>("Newest");

  useEffect(() => {
    fetchRegulations().then(setRegulations);
  }, []);

  const filtered = useMemo(() => {
    let result = regulations;
    if (search)
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.summary.toLowerCase().includes(search.toLowerCase()),
      );
    if (statusFilter !== "All")
      result = result.filter((r) => r.status === statusFilter);
    if (jurisdictionFilter !== "All")
      result = result.filter((r) => r.jurisdiction === jurisdictionFilter);

    if (sort === "Newest")
      result = [...result].sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime(),
      );
    else if (sort === "Deadline")
      result = [...result].sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
      );
    else
      result = [...result].sort((a, b) => b.relevanceScore - a.relevanceScore);

    return result;
  }, [regulations, search, statusFilter, jurisdictionFilter, sort]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px] flex-1">
        <TopBar
          title="Regulations"
          subtitle={`${filtered.length} regulations tracked`}
        />

        <main className="p-8">
          {/* Filters */}
          <div className="mb-6 flex items-center gap-4">
            <input
              type="text"
              placeholder="Search regulations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="flex gap-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    statusFilter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-rule text-foreground hover:bg-muted"
                  }`}
                >
                  {f === "All" ? "ALL" : f.toUpperCase()}
                </button>
              ))}
            </div>
            <select
              value={jurisdictionFilter}
              onChange={(e) => setJurisdictionFilter(e.target.value)}
              className="rounded-lg border border-rule bg-card px-3 py-2 text-xs font-medium text-foreground focus:border-primary focus:outline-none"
            >
              {JURISDICTIONS.map((j) => (
                <option key={j} value={j}>
                  {j === "All" ? "All jurisdictions" : j}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-rule bg-card px-3 py-2 text-xs font-medium text-foreground focus:border-primary focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-5">
            {filtered.map((reg) => (
              <RegulationCard key={reg.id} regulation={reg} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Regulations;
