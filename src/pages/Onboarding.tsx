import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RButton from "../components/ui/RButton";
import { useProfileStore } from "../store/profileStore";
import {
  INDUSTRIES,
  JURISDICTIONS,
  PRODUCT_TYPES,
  TECH_STACKS,
  REVENUE_BANDS,
} from "../utils/constants";
import { Shield } from "lucide-react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const { company, completionPercent, updateProfile } = useProfileStore();
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/dashboard");
  };

  const toggleArrayItem = (
    field: "jurisdictions" | "productTypes" | "techStack",
    item: string,
  ) => {
    const current = company[field];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    updateProfile({ [field]: updated });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-lg rounded-xl border border-rule bg-card p-8 shadow-card">
        {/* Header */}
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield size={18} className="text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">Regulix</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Step {step} of 3
            </span>
            <span className="rounded-full bg-score-green-bg px-2.5 py-0.5 font-mono text-xs font-medium text-score-green-text">
              {completionPercent}% complete
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div
              className="h-1.5 rounded-full bg-primary transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              Company Details
            </h2>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Company name
              </label>
              <input
                type="text"
                value={company.companyName}
                onChange={(e) => updateProfile({ companyName: e.target.value })}
                className="w-full rounded-lg border border-rule bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Acme Fintech Ltd"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Industry
              </label>
              <select
                value={company.industry}
                onChange={(e) => updateProfile({ industry: e.target.value })}
                className="w-full rounded-lg border border-rule bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <RButton onClick={() => setStep(2)} className="mt-4 w-full">
              Continue →
            </RButton>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Operations</h2>
            <div>
              <label className="mb-2 block text-xs font-medium text-foreground">
                Jurisdictions
              </label>
              <div className="flex flex-wrap gap-2">
                {JURISDICTIONS.map((j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => toggleArrayItem("jurisdictions", j)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      company.jurisdictions.includes(j)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-rule bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-foreground">
                Product types
              </label>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_TYPES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => toggleArrayItem("productTypes", p)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      company.productTypes.includes(p)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-rule bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <RButton
                variant="ghost"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                ← Back
              </RButton>
              <RButton onClick={() => setStep(3)} className="flex-1">
                Continue →
              </RButton>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              Tech Stack & Revenue
            </h2>
            <div>
              <label className="mb-2 block text-xs font-medium text-foreground">
                Tech stack
              </label>
              <div className="flex flex-wrap gap-2">
                {TECH_STACKS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleArrayItem("techStack", t)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      company.techStack.includes(t)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-rule bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Revenue band
              </label>
              <select
                value={company.revenueBand}
                onChange={(e) => updateProfile({ revenueBand: e.target.value })}
                className="w-full rounded-lg border border-rule bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select revenue band</option>
                {REVENUE_BANDS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <RButton
                variant="ghost"
                onClick={() => setStep(2)}
                className="flex-1"
              >
                ← Back
              </RButton>
              <RButton onClick={handleFinish} className="flex-1">
                Finish Setup →
              </RButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
