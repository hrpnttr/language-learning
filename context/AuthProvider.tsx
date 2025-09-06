// context/AuthProvider.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Router from "next/router";
import { decodeJwt, msUntilExpiry } from "../lib/jwt";

type AuthState = { token: string | null; exp?: number };
type Ctx = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthCtx = createContext<Ctx | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // ⬇️ EDIT #1: clear LS immediately if token is already expired at startup
  const [auth, setAuth] = useState<AuthState>(() => {
    if (typeof window === "undefined") return { token: null };
    const token = localStorage.getItem("access_token");
    const payload = token ? decodeJwt(token) : null;
    const exp = payload?.exp;

    if (!token || !exp || Date.now() >= exp * 1000) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      return { token: null, exp: undefined };
    }
    return { token, exp };
  });

  const logoutRef = useRef<() => void>(() => {});
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const logout = useCallback(() => {
    clearTimer();
    setAuth({ token: null, exp: undefined });
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.setItem(
      "auth_event",
      JSON.stringify({ t: Date.now(), type: "logout" })
    );
    Router.push("/login");
  }, []);

  logoutRef.current = logout;

  const login = useCallback((token: string) => {
    const payload = decodeJwt(token);
    setAuth({ token, exp: payload?.exp });
    localStorage.setItem("access_token", token);
    localStorage.setItem(
      "auth_event",
      JSON.stringify({ t: Date.now(), type: "login" })
    );
  }, []);

  // Proactive auto-logout by exp (already in your code)
  useEffect(() => {
    clearTimer();
    if (auth.exp) {
      const ms = msUntilExpiry(auth.exp);
      timerRef.current = window.setTimeout(() => logoutRef.current(), ms);
    }
  }, [auth.exp]);

  // ⬇️ EDIT #2: re-check on mount and when tab becomes active; purge LS if expired
  useEffect(() => {
    const recheck = () => {
      const token = localStorage.getItem("access_token");
      const payload = token ? decodeJwt(token) : null;
      const exp = payload?.exp;
      if (!token || !exp || Date.now() >= exp * 1000) {
        logoutRef.current(); // this also clears LS and redirects
      }
    };

    recheck(); // on mount

    const onFocusOrVisible = () => {
      if (!document.hidden) recheck();
    };
    window.addEventListener("focus", onFocusOrVisible);
    document.addEventListener("visibilitychange", onFocusOrVisible);

    return () => {
      window.removeEventListener("focus", onFocusOrVisible);
      document.removeEventListener("visibilitychange", onFocusOrVisible);
    };
  }, []);

  // Cross-tab sync (you already had this)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "auth_event" && e.newValue) {
        const evt = JSON.parse(e.newValue);
        if (evt.type === "logout") logoutRef.current();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthCtx.Provider value={{ token: auth.token, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
