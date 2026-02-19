import { Shield } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — dark */}
      <div className="flex w-[55%] flex-col justify-between bg-sidebar-bg p-12 text-sidebar-fg">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-active">
            <Shield size={18} className="text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">Regulix</span>
        </div>

        {/* Hero */}
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold leading-tight text-sidebar-fg">
            Compliance intelligence.{" "}
            <span className="font-normal italic text-sidebar-muted">
              Built for fintech teams who actually ship.
            </span>
          </h1>
          <div className="mt-10 flex gap-3">
            <div className="rounded-xl border border-sidebar-hover bg-sidebar-hover px-5 py-4">
              <p className="font-mono text-lg font-semibold text-primary">
                $4.2B
              </p>
              <p className="text-xs text-sidebar-muted">
                in fintech fines in 2024
              </p>
            </div>
            <div className="rounded-xl border border-sidebar-hover bg-sidebar-hover px-5 py-4">
              <p className="font-mono text-lg font-semibold text-primary">
                40+
              </p>
              <p className="text-xs text-sidebar-muted">
                active regulations in motion
              </p>
            </div>
            <div className="rounded-xl border border-sidebar-hover bg-sidebar-hover px-5 py-4">
              <p className="font-mono text-lg font-semibold text-primary">
                14 days
              </p>
              <p className="text-xs text-sidebar-muted">
                avg to spot a rule change
              </p>
            </div>
          </div>
        </div>

        {/* Trust */}
        <p className="text-xs text-sidebar-muted">
          Used by compliance teams at BNPL, crypto, and lending fintechs.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex w-[45%] items-center justify-center bg-background p-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
