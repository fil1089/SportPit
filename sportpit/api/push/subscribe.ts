import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUserFromRequest, applyCors } from '../_auth.js';
import { getDb } from '../_db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    applyCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    const user = getUserFromRequest(req);
    if (!user) {
        return res.status(401).json({ error: 'Неавторизован' });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не поддерживается' });
    }

    const { subscription } = req.body;
    if (!subscription || !subscription.endpoint) {
        return res.status(400).json({ error: 'Неверные данные подписки' });
    }

    try {
        const sql = getDb();
        await sql`
            INSERT INTO sportpit_push_subscriptions (user_id, subscription)
            VALUES (${user.sub}, ${subscription}::jsonb)
            ON CONFLICT (user_id, (subscription->>'endpoint')) DO NOTHING;
        `;
        return res.status(200).json({ success: true });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
}
