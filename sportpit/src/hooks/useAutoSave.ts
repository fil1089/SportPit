import { useEffect, useRef, useState } from 'react';
import { api, type DietData } from '../lib/api.js';

export function useAutoSave(data: DietData | null) {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!data) return;

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(async () => {
            setSaving(true);
            setError(null);
            try {
                await api.saveDiet(data);
                setLastSaved(new Date());
            } catch (err: any) {
                setError(err.message || 'Ошибка сохранения');
                setTimeout(async () => {
                    try {
                        await api.saveDiet(data);
                        setError(null);
                        setLastSaved(new Date());
                    } catch (retryErr: any) {
                        setError(retryErr.message || 'Повторная ошибка сохранения');
                    }
                }, 3000);
            } finally {
                setSaving(false);
            }
        }, 800);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [data]);

    return { saving, error, lastSaved };
}
