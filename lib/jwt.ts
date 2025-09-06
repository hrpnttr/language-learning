// lib/jwt.ts
export type JwtPayload = { exp?: number; [k: string]: unknown };

export function decodeJwt<T extends JwtPayload = JwtPayload>(token: string): T | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    return JSON.parse(atob(payload)) as T;
  } catch {
    return null;
  }
}

export function msUntilExpiry(expSeconds?: number, skewMs = 5_000) {
  if (!expSeconds) return 0;
  return Math.max(expSeconds * 1000 - Date.now() - skewMs, 0);
}
