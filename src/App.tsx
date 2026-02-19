import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Regulations from "./pages/Regulations";
import RegulationDetail from "./pages/RegulationDetail";
import Actions from "./pages/Actions";
import Digests from "./pages/Digests";
import Settings from "./pages/Settings";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route element={<AuthGuard />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/regulations" element={<Regulations />} />
        <Route path="/regulations/:id" element={<RegulationDetail />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/digests" element={<Digests />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
