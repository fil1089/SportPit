import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../_db.js';
import { applyCors, getUserFromRequest } from '../_auth.js';

export interface DietData {
    weight: number;
    trainingDates: string[];
    carbSource: 'buckwheat' | 'rice' | 'bulgur' | 'pasta' | 'potato';
    customPlan?: Record<string, unknown>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    applyCors(res);
    if (req.method === 'OPTIONS') return res.status(204).end();

    const payload = getUserFromRequest(req);
    if (!payload) {
        return res.status(401).json({ error: 'Не авторизован' });
    }

    const userId = payload.sub;

    try {
        if (req.method === 'GET') {
            const rows = await sql`
                SELECT id, data, created_at, updated_at
                FROM sportpit_diet
                WHERE user_id = ${userId}
                ORDER BY updated_at DESC
                LIMIT 1
            `;
            return res.status(200).json({ diet: rows[0] || null });
        }

        if (req.method === 'POST') {
            const { weight, trainingDates, carbSource, customPlan } = req.body || {};

            if (typeof weight !== 'number' || weight < 30 || weight > 300) {
                return res.status(400).json({ error: 'Некорректный вес' });
            }
            if (!Array.isArray(trainingDates)) {
                return res.status(400).json({ error: 'Некорректные даты тренировок' });
            }
            if (!['buckwheat', 'rice', 'bulgur', 'pasta', 'potato'].includes(carbSource)) {
                return res.status(400).json({ error: 'Некорректный источник углеводов' });
            }

            const data: DietData = { weight, trainingDates, carbSource, customPlan };
            const rows = await sql`
                INSERT INTO sportpit_diet (user_id, data)
                VALUES (${userId}, ${JSON.stringify(data)}::jsonb)
                ON CONFLICT (user_id) DO UPDATE SET
                    data = EXCLUDED.data,
                    updated_at = now()
                RETURNING id, data, created_at, updated_at
            `;
            return res.status(200).json({ diet: rows[0] });
        }

        return res.status(405).json({ error: 'Метод не поддерживается' });
    } catch (err: any) {
        console.error('diet error:', err);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
}
