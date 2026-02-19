import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";
import RButton from "../components/ui/RButton";
import ScorePill from "../components/ui/ScorePill";
import RBadge from "../components/ui/RBadge";
import DeadlineCountdown from "../components/regulations/DeadlineCountdown";
import { useAuthStore } from "../store/authStore";
import { fetchRegulations, type Regulation } from "../api/regulations";
import { fetchActions, type ActionItem } from "../api/actions";
import { formatDate, daysUntil } from "../utils/dates";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowUpRight, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const user = useAuthStore((s) => s.user);
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [actions, setActions] = useState<ActionItem[]>([]);

  useEffect(() => {
    fetchRegulations().then(setRegulations);
    fetchActions().then(setActions);
  }, []);

  const pendingCount = actions.filter((a) => a.status === "Pending").length;
  const doneCount = actions.filter((a) => a.status === "Done").length;
  const dismissedCount = actions.filter((a) => a.status === "Dismissed").length;

  const donutData = [
    { name: "Pending", value: pendingCount, color: "hsl(32, 95%, 44%)" },
    { name: "Done", value: doneCount, color: "hsl(158, 64%, 40%)" },
    { name: "Dismissed", value: dismissedCount, color: "hsl(30, 12%, 89%)" },
  ];

  const upcomingActions = actions
    .filter((a) => a.status === "Pending")
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    )
    .slice(0, 3);

  const avgRelevance = regulations.length
    ? (
        regulations.reduce((s, r) => s + r.relevanceScore, 0) /
        regulations.length
      ).toFixed(2)
    : "0.00";

  const statCards = [
    {
      label: "Active Regulations",
      value: regulations.length,
      trend: "Tracked across jurisdictions",
      highlighted: true,
    },
    {
      label: "Action Items Due",
      value: pendingCount,
      trend: "Increased from last month",
    },
    {
      label: "Completed This Month",
      value: doneCount,
      trend: "Increased from last month",
    },
    {
      label: "Avg Relevance Score",
      value: avgRelevance,
      trend: "Across all regulations",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px] flex-1">
        <TopBar
          title="Dashboard"
          subtitle={`Plan, prioritize, and accomplish your compliance tasks with ease.`}
          action={
            <div className="group relative">
              <RButton disabled size="sm">
                + New Scan
              </RButton>
              <div className="absolute right-0 top-full mt-1 hidden whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs text-background shadow-lg group-hover:block">
                Coming soon — auto-scan triggers
              </div>
            </div>
          }
        />

        <main className="p-8">
          {/* Stat cards */}
          <div className="mb-8 grid grid-cols-4 gap-5">
            {statCards.map((card, i) => (
              <div
                key={card.label}
                className={`relative overflow-hidden rounded-xl p-5 shadow-card transition-shadow hover:shadow-card-hover ${
                  card.highlighted
                    ? "bg-primary text-primary-foreground"
                    : "border border-rule bg-card"
                }`}
              >
                <div className="flex items-start justify-between">
                  <p
                    className={`text-xs font-medium ${card.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {card.label}
                  </p>
                  <div
                    className={`rounded-lg border p-1.5 ${card.highlighted ? "border-primary-foreground/20" : "border-rule"}`}
                  >
                    <ArrowUpRight
                      size={14}
                      className={
                        card.highlighted
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }
                    />
                  </div>
                </div>
                <p
                  className={`mt-2 font-mono text-3xl font-bold ${card.highlighted ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {card.value}
                </p>
                <div
                  className={`mt-2 flex items-center gap-1.5 ${card.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  <TrendingUp size={12} />
                  <span className="text-[11px]">{card.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Regulations */}
          <div className="mb-8 overflow-hidden rounded-xl border border-rule bg-card shadow-card">
            <div className="border-b border-rule px-6 py-4">
              <h2 className="text-lg font-bold text-foreground">
                Recent Regulations
              </h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-rule text-left text-xs font-medium text-muted-foreground">
                  <th className="px-6 py-3">Regulation</th>
                  <th className="px-6 py-3">Body</th>
                  <th className="px-6 py-3">Jurisdiction</th>
                  <th className="px-6 py-3">Relevance</th>
                  <th className="px-6 py-3">Deadline</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {regulations.slice(0, 3).map((reg) => (
                  <tr
                    key={reg.id}
                    className="border-b border-rule last:border-0 transition-colors hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/regulations/${reg.id}`}
                        className="text-sm font-medium text-foreground hover:text-primary"
                      >
                        {reg.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {reg.body}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {reg.jurisdiction}
                    </td>
                    <td className="px-6 py-4">
                      <ScorePill score={reg.relevanceScore} />
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-foreground">
                      {formatDate(reg.deadline)}
                    </td>
                    <td className="px-6 py-4">
                      <RBadge variant="status">{reg.status}</RBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-5">
            {/* Donut */}
            <div className="rounded-xl border border-rule bg-card p-6 shadow-card">
              <h3 className="mb-5 text-base font-bold text-foreground">
                Actions by Status
              </h3>
              <div className="flex items-center gap-8">
                <div className="h-44 w-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={44}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {donutData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {donutData.map((d) => (
                    <div key={d.name} className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: d.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {d.name}
                      </span>
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming deadlines */}
            <div className="rounded-xl border border-rule bg-card p-6 shadow-card">
              <h3 className="mb-5 text-base font-bold text-foreground">
                Upcoming Deadlines
              </h3>
              <div className="space-y-3">
                {upcomingActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-center justify-between rounded-lg border border-rule bg-background px-4 py-3.5 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {action.action}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {action.regulationTitle}
                      </p>
                    </div>
                    <DeadlineCountdown deadline={action.deadline} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
