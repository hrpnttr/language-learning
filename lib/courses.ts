import {http} from "./http";

export interface Courses {
    id: string;
    title: string;
    description: string;
    level: string;
    language: string;
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export const CoursesAPI = {
    list: (page=0, size=10, q=""): Promise<Page<Courses>> => http.get(`/api/courses`),
    create: (payload: Partial<Courses>) => http.post("/api/courses", payload),
    update: (id: string, payload: Partial<Courses>) => http.patch(`/api/courses/${id}`, payload),
    remove: (id: string) => http.del(`/api/courses/${id}`),
}