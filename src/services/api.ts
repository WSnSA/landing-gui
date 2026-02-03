import { API_CONFIG } from "./apiConfig";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
}

// @ts-ignore
export async function api<T>(
    endpoint: string,
    options: ApiOptions = {}
) {
    const { method = "GET", body, headers = {} } = options;

    const res = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        let message = "API_ERROR";
        try {
            const text = await res.text();
            message = text || message;
        } catch {}
        throw new Error(message);
    }

    return res.json();
}
