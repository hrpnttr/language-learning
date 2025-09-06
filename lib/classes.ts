import {http} from "./http";

export interface Materials {
    type: string;
    fileName: string;
    title: string;
}

export interface Classes {
    id: string;
    course_id: string;
    class_name: string;
    description: string;
    materials: Materials[];
}

export interface Myclass<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export const ClassesAPI = {
    list: (page=0, size=10, q=""): Promise<Myclass<Classes>> => http.get(`/api/classes`),
}