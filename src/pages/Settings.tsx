import { useState } from "react";
import { toast } from "sonner";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";
import RButton from "../components/ui/RButton";
import { useProfileStore } from "../store/profileStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import {
  INDUSTRIES,
  JURISDICTIONS,
  PRODUCT_TYPES,
  TECH_STACKS,
  REVENUE_BANDS,
} from "../utils/constants";

const Settings = () => {
  const { company, updateProfile } = useProfileStore();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    weeklyDigest: true,
    urgentAlerts: true,
    browserNotifications: false,
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

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

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    toast.success("Profile changes saved");
  };

  const handleNotificationToggle = async (
    key: "weeklyDigest" | "urgentAlerts" | "browserNotifications",
  ) => {
    if (
      key === "browserNotifications" &&
      !notifications.browserNotifications &&
      "Notification" in window
    ) {
      try {
        const perm = await Notification.requestPermission();
        if (perm !== "granted") {
          toast.error("Browser notifications blocked");
          return;
        }
      } catch {
        /* ignore */
      }
    }
    setNotifications((n) => ({ ...n, [key]: !n[key] }));
    toast.success(`${notifications[key] ? "Disabled" : "Enabled"} preference`);
  };

  const handleUpdatePassword = async () => {
    if (password.length < 8)
      return toast.error("Password must be at least 8 characters");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    await new Promise((r) => setTimeout(r, 400));
    setPassword("");
    setConfirmPassword("");
    toast.success("Password updated");
  };

  const handleDelete = () => {
    if (!confirm("Delete account? This cannot be undone.")) return;
    logout();
    toast.success("Account deleted");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-[240px] flex-1">
        <TopBar title="Settings" />

        <main className="p-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left — Company Profile */}
            <div>
              <h2 className="mb-6 text-lg font-bold text-foreground">
                Company Profile
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    Company name
                  </label>
                  <input
                    type="text"
                    value={company.companyName}
                    onChange={(e) =>
                      updateProfile({ companyName: e.target.value })
                    }
                    className="w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    Industry
                  </label>
                  <select
                    value={company.industry}
                    onChange={(e) =>
                      updateProfile({ industry: e.target.value })
                    }
                    className="w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="">Select industry</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
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
                            : "border-rule text-foreground hover:bg-muted"
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
                            : "border-rule text-foreground hover:bg-muted"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
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
                            : "border-rule text-foreground hover:bg-muted"
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
                    onChange={(e) =>
                      updateProfile({ revenueBand: e.target.value })
                    }
                    className="w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="">Select revenue band</option>
                    {REVENUE_BANDS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <RButton
                  className="mt-2"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save Changes"}
                </RButton>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-8">
              {/* Notifications */}
              <div>
                <h2 className="mb-6 text-lg font-bold text-foreground">
                  Notification Preferences
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      key: "weeklyDigest" as const,
                      label: "Weekly Digest Email",
                    },
                    {
                      key: "urgentAlerts" as const,
                      label: "Urgent Alert Emails",
                    },
                    {
                      key: "browserNotifications" as const,
                      label: "Browser Notifications",
                    },
                  ].map(({ key, label }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-xl border border-rule bg-card px-4 py-3.5 shadow-card"
                    >
                      <span className="text-sm text-foreground">{label}</span>
                      <button
                        onClick={() => handleNotificationToggle(key)}
                        className={`relative h-6 w-11 rounded-full transition-colors ${notifications[key] ? "bg-green" : "bg-muted"}`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform ${notifications[key] ? "left-[22px]" : "left-0.5"}`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account */}
              <div>
                <h2 className="mb-6 text-lg font-bold text-foreground">
                  Account
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">
                      New password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <RButton
                    variant="secondary"
                    size="sm"
                    onClick={handleUpdatePassword}
                  >
                    Update Password
                  </RButton>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="rounded-xl border-2 border-red p-5">
                <h3 className="mb-2 text-base font-bold text-foreground">
                  Danger Zone
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Once you delete your account, there is no going back.
                </p>
                <RButton variant="danger" size="sm" onClick={handleDelete}>
                  Delete Account
                </RButton>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
