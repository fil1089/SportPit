import type { VercelRequest, VercelResponse } from '@vercel/node';
import webpush from 'web-push';
import { getDb } from '../_db.js';

const VAPID_PUBLIC_KEY = process.env.VITE_VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';
const SUBJECT = process.env.VAPID_SUBJECT || 'mailto:support@sportpit.local';

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Метод не поддерживается' });
    }

    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
        return res.status(500).json({ error: 'VAPID ключи не настроены' });
    }

    // Verify authorization if triggered manually (Vercel Cron sends a Bearer token or you can restrict to CRON_SECRET)
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = req.headers.authorization;
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return res.status(401).json({ error: 'Неавторизован' });
    }

    try {
        const sql = getDb();
        // Get all subscriptions
        const subscriptions = await sql`SELECT id, user_id, subscription FROM sportpit_push_subscriptions`;
        
        const payload = JSON.stringify({
            title: 'SportPit',
            body: 'Пора выпить вечерние добавки! (Магний)',
        });

        const promises = subscriptions.map(async (row) => {
            try {
                await webpush.sendNotification(row.subscription, payload);
            } catch (err: any) {
                if (err.statusCode === 404 || err.statusCode === 410) {
                    // Subscription expired or unsubscribed
                    await sql`DELETE FROM sportpit_push_subscriptions WHERE id = ${row.id}`;
                } else {
                    console.error('Ошибка отправки пуша:', err);
                }
            }
        });

        await Promise.allSettled(promises);

        return res.status(200).json({ success: true, count: subscriptions.length });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
}
