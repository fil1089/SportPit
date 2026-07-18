const TOKEN_KEY = 'sportpit-auth-token';

export interface ApiUser {
    id: string;
    email: string;
}

export interface DietRecord {
    id: string;
    data: DietData;
    created_at?: string;
    updated_at?: string;
}

export interface DietData {
    weight: number;
    trainingDates: string[];
    carbSource: CarbSource;
    customPlan?: Record<string, unknown>;
}

export type CarbSource = 'buckwheat' | 'rice' | 'bulgur' | 'pasta' | 'potato';

export const getToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = (): void => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(TOKEN_KEY);
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> | undefined),
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`/api${path}`, { ...options, headers });

    let body: any = null;
    const text = await res.text();
    if (text) {
        try { body = JSON.parse(text); } catch { body = { error: text }; }
    }

    if (!res.ok) {
        const message = body?.error || `Ошибка запроса (${res.status})`;
        const err = new Error(message) as Error & { status?: number };
        err.status = res.status;
        throw err;
    }
    return body as T;
}

export const api = {
    async signUp(email: string, password: string): Promise<{ token: string; user: ApiUser }> {
        const data = await request<{ token: string; user: ApiUser }>('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        setToken(data.token);
        return data;
    },

    async signIn(email: string, password: string): Promise<{ token: string; user: ApiUser }> {
        const data = await request<{ token: string; user: ApiUser }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        setToken(data.token);
        return data;
    },

    async me(): Promise<ApiUser | null> {
        if (!getToken()) return null;
        try {
            const data = await request<{ user: ApiUser }>('/auth/me', { method: 'GET' });
            return data.user;
        } catch (err: any) {
            if (err.status === 401) {
                clearToken();
                return null;
            }
            throw err;
        }
    },

    signOut(): void {
        clearToken();
    },

    async getDiet(): Promise<DietRecord | null> {
        const data = await request<{ diet: DietRecord | null }>('/diet', { method: 'GET' });
        return data.diet;
    },

    async saveDiet(payload: DietData): Promise<DietRecord> {
        const data = await request<{ diet: DietRecord }>('/diet', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        return data.diet;
    },
};
