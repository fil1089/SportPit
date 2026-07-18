import { useEffect, useState } from 'react';
import { api, type ApiUser } from '../lib/api.js';

export function useAuth() {
    const [user, setUser] = useState<ApiUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        api.me()
            .then((u) => { if (!cancelled) setUser(u); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, []);

    const signIn = async (email: string, password: string) => {
        const data = await api.signIn(email, password);
        setUser(data.user);
        return data;
    };

    const signUp = async (email: string, password: string) => {
        const data = await api.signUp(email, password);
        setUser(data.user);
        return data;
    };

    const signOut = () => {
        api.signOut();
        setUser(null);
    };

    return { user, loading, signIn, signUp, signOut };
}
