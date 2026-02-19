import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, _password: string) => {
        // Mock login
        await new Promise((r) => setTimeout(r, 500));
        set({
          user: {
            id: "1",
            name: email
              .split("@")[0]
              .replace(/\./g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            email,
            plan: "Pro",
          },
          token: "mock-jwt-token-" + Date.now(),
          isAuthenticated: true,
        });
      },
      register: async (name: string, email: string, _password: string) => {
        await new Promise((r) => setTimeout(r, 500));
        set({
          user: { id: "1", name, email, plan: "Free" },
          token: "mock-jwt-token-" + Date.now(),
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: "regulix-auth" },
  ),
);
