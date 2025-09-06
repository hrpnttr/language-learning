import { http } from "./http";

export interface Contents {
    courseId: string;
    title: string;
}

export interface Page<Contents> {
    id: string;
    studentId: string;
    contents: Contents[];
}

// export interface Page<T> {
//     content: T[];
//     totalElements: number;
//     totalPages: number;
//     number: number;
//     size: number;
// }

export const S_coursesAPI = {
  list: (ids: string): Promise<Page<Contents>> => http.get(`api/scourses/${ids}`),
  create: (payload: unknown) => http.post("api/scourses", payload),
};
