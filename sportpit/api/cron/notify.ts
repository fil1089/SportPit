import type { VercelRequest, VercelResponse } from '@vercel/node';
import webpush from 'web-push';
import { getDb } from '../_db.js';
import { Receiver } from '@upstash/qstash';

const VAPID_PUBLIC_KEY = process.env.VITE_VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';
const SUBJECT = process.env.VAPID_SUBJECT || 'mailto:support@sportpit.local';

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

const receiver = new Receiver({
    currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY || '',
    nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY || '',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не поддерживается' });
    }

    // Verify QStash signature
    const signature = req.headers["upstash-signature"] as string;
    if (signature) {
        try {
            // In Vercel, req.body is parsed. For QStash without body, it might be undefined or empty.
            // We use empty string if it's not present.
            const bodyStr = req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '';
            const isValid = await receiver.verify({
                signature,
                body: bodyStr,
            });
            if (!isValid) throw new Error("Invalid signature");
        } catch (err: any) {
            console.error('QStash verification failed:', err);
            return res.status(401).json({ error: 'Неверная подпись QStash' });
        }
    } else {
        // Fallback for manual trigger or old Vercel Cron
        const cronSecret = process.env.CRON_SECRET;
        const authHeader = req.headers.authorization;
        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
            return res.status(401).json({ error: 'Неавторизован' });
        }
    }

    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
        return res.status(500).json({ error: 'VAPID ключи не настроены' });
    }

    try {
        const sql = getDb();
        
        // Find current time in Moscow (UTC+3)
        const d = new Date();
        const moscowHour = (d.getUTCHours() + 3) % 24;
        const moscowMinute = d.getUTCMinutes();
        
        // Round minute to nearest 15 to match the interval
        const roundedMinute = Math.round(moscowMinute / 15) * 15;
        const finalMinute = roundedMinute === 60 ? 0 : roundedMinute;
        const finalHour = roundedMinute === 60 ? (moscowHour + 1) % 24 : moscowHour;
        
        const currentTimeStr = `${String(finalHour).padStart(2, '0')}:${String(finalMinute).padStart(2, '0')}`;

        // Get all subscriptions and their diet data (to get trackerState.notifyTimes)
        const rows = await sql`
            SELECT s.id, s.subscription, d.data->'trackerState'->'notifyTimes' as notify_times
            FROM sportpit_push_subscriptions s
            JOIN sportpit_diet d ON s.user_id = d.user_id
        `;

        let sentCount = 0;
        const promises = rows.map(async (row) => {
            const notifyTimes = row.notify_times || {};
            let payload = null;

            if (notifyTimes.morning === currentTimeStr) {
                payload = { title: 'Утренние добавки', body: 'Пора выпить утренние витамины и добавки!' };
            } else if (notifyTimes.evening === currentTimeStr) {
                payload = { title: 'Вечерние добавки', body: 'Пора выпить магний и вечерние добавки!' };
            }

            if (payload) {
                try {
                    await webpush.sendNotification(row.subscription, JSON.stringify(payload));
                    sentCount++;
                } catch (err: any) {
                    if (err.statusCode === 404 || err.statusCode === 410) {
                        await sql`DELETE FROM sportpit_push_subscriptions WHERE id = ${row.id}`;
                    } else {
                        console.error('Ошибка отправки пуша:', err);
                    }
                }
            }
        });

        await Promise.allSettled(promises);

        return res.status(200).json({ success: true, processed: rows.length, sent: sentCount, time: currentTimeStr });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: 'Ошибка сервера' });
    }
}
