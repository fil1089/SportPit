import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../_db.js';
import { applyCors, getUserFromRequest } from '../_auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    applyCors(res);
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Метод не поддерживается' });

    const payload = getUserFromRequest(req);
    if (!payload) {
        return res.status(401).json({ error: 'Не авторизован' });
    }

    try {
        const rows = await sql`SELECT id, email FROM sportpit_users WHERE id = ${payload.sub}`;
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Пользователь не найден' });
        }
        return res.status(200).json({ user: rows[0] });
    } catch (err: any) {
        console.error('me error:', err);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
}

