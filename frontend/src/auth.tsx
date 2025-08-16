// src/auth.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import type { User } from "./types";

interface AuthState {
  token: string | null;
  user: User | null;
}
interface AuthContextShape extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthCtx = createContext<AuthContextShape | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider/>");
  return ctx;
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const value = useMemo<AuthContextShape>(() => ({
    token,
    user,
    login: (t, u) => {
      setToken(t);
      setUser(u);
      localStorage.setItem("token", t);
      localStorage.setItem("user", JSON.stringify(u));
    },
    logout: () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }), [token, user]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
