import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import RButton from "../components/ui/RButton";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-foreground">Sign in</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Welcome back to Regulix
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-rule bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="••••••••"
          />
        </div>
        <RButton type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign In →"}
        </RButton>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-rule" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-rule" />
      </div>

      <div className="space-y-2">
        <RButton variant="ghost" className="w-full" type="button">
          Continue with Google
        </RButton>
        <RButton variant="ghost" className="w-full" type="button">
          Continue with GitHub
        </RButton>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link
          to="/register"
          className="font-medium text-primary hover:underline"
        >
          Start free →
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
