import { http } from "./http";

export const UsersAPI = {
  list: () => http.get("api/users"),
  create: (payload: unknown) => http.post("api/users", payload),
  update: (id: string, payload: unknown) => http.patch(`api/users/${id}`, payload),
  remove: (id: string) => http.del(`api/users/${id}`),
};