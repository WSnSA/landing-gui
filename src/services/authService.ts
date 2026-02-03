import { api } from "./api";

export interface RegisterRequest {
    fullname: string;
    email: string;
    registerNumber: string;
    phone: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}

export interface RegisterResponse {
    id: number;
    email: string;
    fullName: string;
    role: "USER" | "ADMIN";
}

export function registerUser(data: RegisterRequest) {
    return api<RegisterResponse>("/api/auth/register", {
        method: "POST",
        body: data,
    });
}

export function login(data: { username: string; password: string }) {
    return api("/api/auth/login", {
        method: "POST",
        body: data,
    });
}

export function forgotPassword(email: string) {
    return api("/api/auth/forgot-password", {
        method: "POST",
        body: { email },
    });
}

export function resetPassword(data: {
    token: string;
    newPassword: string;
    confirmPassword: string;
}) {
    return api("/api/auth/reset-password", {
        method: "POST",
        body: data,
    });
}
