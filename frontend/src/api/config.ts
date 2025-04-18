import axios from "axios";

const ciaBaseURL = import.meta.env.VITE_API_BASE_URL;
const irBaseURL = import.meta.env.VITE_IR_API_BASE_URL;

export const ciaAI = axios.create({
    baseURL: ciaBaseURL
});

export const irAI = axios.create({
    baseURL: irBaseURL
});