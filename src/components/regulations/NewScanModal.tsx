import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  Loader2,
  X,
  Search,
  ScanLine,
  Sparkles,
} from "lucide-react";
import RButton from "../ui/RButton";
import { addRegulation, type Regulation } from "../../api/regulations";
const SCAN_JURISDICTIONS = ["US", "UK", "EU", "AU", "SG"] as const;

interface Props {
  open: boolean;
  onClose: () => void;
  onComplete?: (added: Regulation[]) => void;
}

const SCAN_STEPS = [
  { key: "sources", label: "Connecting to regulatory sources", icon: Search },
  { key: "fetch", label: "Fetching latest publications", icon: ScanLine },
  {
    key: "score",
    label: "Scoring relevance against your profile",
    icon: Sparkles,
  },
];

const CANDIDATE_POOL: Omit<Regulation, "id">[] = [
  {
    title: "SEC Cybersecurity Disclosure Rule",
    body: "SEC",
    jurisdiction: "US",
    relevanceScore: 0.72,
    deadline: "2026-08-15",
    status: "Final Rule",
    summary:
      "Public issuers must disclose material cybersecurity incidents within four business days and provide annual risk management disclosures.",
    publishedDate: "2026-02-01",
    severity: "High",
    matchReasons: [
      "You store customer PII ✓",
      "US reporting obligations apply ✓",
      "Incident response process in scope ✓",
    ],
    actionRequired:
      "Review incident classification playbook and 8-K disclosure workflow.",
    effortEstimate: "~2 days",
  },
  {
    title: "EBA Guidelines on ICT Risk Reporting",
    body: "EBA",
    jurisdiction: "EU",
    relevanceScore: 0.68,
    deadline: "2026-10-01",
    status: "Guidance",
    summary:
      "Harmonised ICT and security risk reporting templates for EU credit institutions and payment providers.",
    publishedDate: "2026-01-28",
    severity: "Medium",
    matchReasons: ["EU operations in scope ✓", "Payments product affected ✓"],
    actionRequired: "Map current ICT reporting fields to EBA templates.",
    effortEstimate: "~1.5 days",
  },
  {
    title: "FinCEN Beneficial Ownership Update",
    body: "FinCEN",
    jurisdiction: "US",
    relevanceScore: 0.55,
    deadline: "2026-05-20",
    status: "Final Rule",
    summary:
      "Updated beneficial ownership information reporting thresholds and clarified exemptions for regulated financial entities.",
    publishedDate: "2026-01-22",
    severity: "Medium",
    matchReasons: [
      "Entity registration in US ✓",
      "Corporate structure reporting applies ✓",
    ],
    actionRequired: "Confirm BOI filings match new thresholds.",
    effortEstimate: "~0.5 day",
  },
  {
    title: "MAS Technology Risk Management Notice",
    body: "MAS",
    jurisdiction: "SG",
    relevanceScore: 0.41,
    deadline: "2026-11-30",
    status: "Proposed",
    summary:
      "Singapore Monetary Authority proposal to strengthen cloud outsourcing controls and third-party risk oversight for FIs.",
    publishedDate: "2026-02-05",
    severity: "Low",
    matchReasons: ["Limited APAC exposure", "Cloud vendor use in scope"],
    actionRequired: "Assess if SG entity meets applicability thresholds.",
    effortEstimate: "~1 day",
  },
];

const NewScanModal = ({ open, onClose, onComplete }: Props) => {
  const [jurisdictions, setJurisdictions] = useState<string[]>([
    "US",
    "UK",
    "EU",
  ]);
  const [depth, setDepth] = useState<"quick" | "deep">("quick");
  const [running, setRunning] = useState(false);
  const [stepIdx, setStepIdx] = useState(-1);
  const [added, setAdded] = useState<Regulation[]>([]);

  useEffect(() => {
    if (!open) {
      setRunning(false);
      setStepIdx(-1);
      setAdded([]);
    }
  }, [open]);

  const toggleJur = (j: string) =>
    setJurisdictions((prev) =>
      prev.includes(j) ? prev.filter((x) => x !== j) : [...prev, j],
    );

  const startScan = async () => {
    if (jurisdictions.length === 0) {
      toast.error("Select at least one jurisdiction");
      return;
    }
    setRunning(true);
    setAdded([]);
    for (let i = 0; i < SCAN_STEPS.length; i++) {
      setStepIdx(i);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, depth === "deep" ? 1100 : 650));
    }

    const pool = CANDIDATE_POOL.filter((c) =>
      jurisdictions.includes(c.jurisdiction),
    );
    const picked = (pool.length ? pool : CANDIDATE_POOL).slice(
      0,
      depth === "deep" ? 3 : 2,
    );
    const now = Date.now();
    const newOnes = picked.map((c, i) =>
      addRegulation({ ...c, id: `scan-${now}-${i}` }),
    );
    setAdded(newOnes);
    setStepIdx(SCAN_STEPS.length);
    toast.success(
      `Scan complete — ${newOnes.length} new regulation${newOnes.length === 1 ? "" : "s"} added`,
    );
    onComplete?.(newOnes);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={running ? undefined : onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-rule bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-rule px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              New Regulatory Scan
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Pull the latest publications relevant to your profile.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={running}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5">
          {stepIdx < 0 && (
            <>
              <div className="mb-5">
                <label className="mb-2 block text-xs font-medium text-foreground">
                  Jurisdictions
                </label>
                <div className="flex flex-wrap gap-2">
                  {SCAN_JURISDICTIONS.map((j) => (
                    <button
                      key={j}
                      type="button"
                      onClick={() => toggleJur(j)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                        jurisdictions.includes(j)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-rule text-foreground hover:bg-muted"
                      }`}
                    >
                      {j}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-2">
                <label className="mb-2 block text-xs font-medium text-foreground">
                  Scan depth
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["quick", "deep"] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDepth(d)}
                      className={`rounded-lg border px-3 py-3 text-left text-xs transition-colors ${
                        depth === d
                          ? "border-primary bg-primary/5"
                          : "border-rule hover:bg-muted"
                      }`}
                    >
                      <div className="font-semibold text-foreground">
                        {d === "quick" ? "Quick scan" : "Deep scan"}
                      </div>
                      <div className="mt-0.5 text-muted-foreground">
                        {d === "quick"
                          ? "~2s · headline items"
                          : "~4s · broader match set"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {stepIdx >= 0 && (
            <ul className="space-y-3">
              {SCAN_STEPS.map((s, i) => {
                const done = stepIdx > i || stepIdx === SCAN_STEPS.length;
                const active = stepIdx === i;
                const Icon = s.icon;
                return (
                  <li
                    key={s.key}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "border-primary/40 bg-primary/5 text-foreground"
                        : done
                          ? "border-rule bg-card text-foreground"
                          : "border-rule bg-card text-muted-foreground"
                    }`}
                  >
                    <span className="flex h-6 w-6 items-center justify-center">
                      {done ? (
                        <CheckCircle2 size={18} className="text-green" />
                      ) : active ? (
                        <Loader2
                          size={16}
                          className="animate-spin text-primary"
                        />
                      ) : (
                        <Icon size={16} />
                      )}
                    </span>
                    {s.label}
                  </li>
                );
              })}
              {stepIdx === SCAN_STEPS.length && added.length > 0 && (
                <li className="mt-3 rounded-lg border border-rule bg-muted/40 px-3 py-3">
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                    Newly added
                  </p>
                  <ul className="space-y-1">
                    {added.map((r) => (
                      <li
                        key={r.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-foreground">{r.title}</span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {r.jurisdiction}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule bg-muted/30 px-6 py-3">
          {stepIdx === SCAN_STEPS.length ? (
            <RButton size="sm" onClick={onClose}>
              Done
            </RButton>
          ) : (
            <>
              <RButton
                variant="ghost"
                size="sm"
                onClick={onClose}
                disabled={running}
              >
                Cancel
              </RButton>
              <RButton size="sm" onClick={startScan} disabled={running}>
                {running ? "Scanning…" : "Start scan"}
              </RButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewScanModal;
