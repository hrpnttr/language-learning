import test from "node:test";
import {http} from "./http";

export interface Choices {
    text: string;
    is_correct: boolean;
}

export interface Contents {
    question: string;
    choices: Choices[];
}

export interface Quizzes {
    id: string;
    class_id: string;
    title: string;
    description: string;
    type: string;
    contens: Contents[];
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export const QuizzesAPI = {
    list: (page=0, size=10, q=""): Promise<Page<Quizzes>> => http.get(`/api/quizzes`),
    test: (id: string): Promise<Quizzes> => http.get(`/api/quizzes/by-id?id=${encodeURIComponent(id)}`),
}