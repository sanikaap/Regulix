import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useProfileStore } from "../store/profileStore";

const AuthGuard = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const completionPercent = useProfileStore((s) => s.completionPercent);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // Profile incomplete check is optional — user can skip onboarding
  return <Outlet />;
};

export default AuthGuard;
