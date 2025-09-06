import { http } from "./http";

export const StudentsAPI = {
  list: () => http.get("api/students"),
  create: (payload: unknown) => http.post("api/students", payload),
};
