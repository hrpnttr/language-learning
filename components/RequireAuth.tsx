// components/RequireAuth.tsx
import { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "../context/AuthProvider";
import { decodeJwt } from "../lib/jwt";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!token) return void Router.replace("/login");
    const p = decodeJwt(token);
    if (!p?.exp || Date.now() >= p.exp * 1000)
      return void Router.replace("/login");
    setOk(true);
  }, [token]);

  if (!ok) return null;
  return <>{children}</>;
}
