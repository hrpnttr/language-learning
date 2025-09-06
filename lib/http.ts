import { API_BASE } from "../config/api";

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

export const http = {
  get: (p: string) => request(p),
  post: (p: string, body: unknown) => request(p, { method: "POST", body: JSON.stringify(body) }),
  patch: (p: string, body: unknown) => request(p, { method: "PATCH", body: JSON.stringify(body) }),
  del: (p: string) => request(p, { method: "DELETE" }),
};


// src/api/http.ts
// import { API_BASE } from "../config/api";

// // Safe in SSR: localStorage only in browser
// const getToken = () =>
//   typeof window !== "undefined" ? localStorage.getItem("token") : null;

// type JsonBody = Record<string, unknown> | unknown[] | string | number | boolean | null;

// async function request<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
//   const token = getToken();
//   const hasFormData = options.body instanceof FormData;

//   const res = await fetch(`${API_BASE}${path}`, {
//     // If you use COOKIE auth, keep credentials: "include".
//     // If you use pure JWT Bearer auth (no cookies), you can remove this line.
//     // credentials: "include",
//     ...options,
//     headers: {
//       ...(hasFormData ? {} : { "Content-Type": "application/json" }),
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...(options.headers || {}),
//     },
//   });

//   if (!res.ok) {
//     // Try to surface server message if present
//     const text = await res.text().catch(() => "");
//     throw new Error(text || `HTTP ${res.status}`);
//   }

//   if (res.status === 204) return null as T;

//   // Attempt JSON; if not JSON, fall back to text as T
//   const ct = res.headers.get("content-type") || "";
//   if (ct.includes("application/json")) {
//     return (await res.json()) as T;
//   }
//   return (await res.text()) as unknown as T;
// }

// export const http = {
//   get: <T = unknown>(p: string, init?: RequestInit) =>
//     request<T>(p, { method: "GET", ...(init || {}) }),

//   post: <T = unknown>(p: string, body?: JsonBody | FormData, init?: RequestInit) =>
//     request<T>(p, {
//       method: "POST",
//       body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
//       ...(init || {}),
//     }),

//   patch: <T = unknown>(p: string, body?: JsonBody | FormData, init?: RequestInit) =>
//     request<T>(p, {
//       method: "PATCH",
//       body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
//       ...(init || {}),
//     }),

//   del:    <T = unknown>(p: string, init?: RequestInit) =>
//     request<T>(p, { method: "DELETE", ...(init || {}) }),
// };