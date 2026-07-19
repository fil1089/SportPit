import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../_db.js';
import { applyCors, getUserFromRequest } from '../_auth.js';

export interface ProductRef {
    value: string;
    label: string;
    proteinPer100g?: number;
    carbsPer100g?: number;
    proteinPerPortion?: number;
    defaultPortion: number;
}

export interface MacroTargets {
    protein: { min: number; max: number };
    carbsTraining: { min: number; max: number };
    carbsRest: { min: number; max: number };
    fatsTraining: string;
    fatsRest: string;
}

export interface Supplement {
    name: string;
    dose: string;
    when: string;
    why: string;
}

export interface PlanSchema {
    version: number;
    title: string;
    subtitle?: string;
    initial: {
        weight: number;
        startDate: string;
        carbSources: string[];
        proteinSources: string[];
        trainingDates: string[];
    };
    rules: string[];
    macros: MacroTargets;
    supplements: Supplement[];
    products: {
        carbs: ProductRef[];
        protein: ProductRef[];
    };
    weekBasket: Record<string, string>;
}

export interface DietData {
    weight: number;
    trainingDates: string[];
    carbSources: string[];
    proteinSources: string[];
    startDate: string;
    plan?: PlanSchema;
}

function isValidIsoDate(date: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date));
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
            const body = req.body || {};
            const { weight, trainingDates, carbSources, proteinSources, startDate, plan, gender, seedModifiers, mealOverrides } = body;

            if (typeof weight !== 'number' || weight < 30 || weight > 300) {
                return res.status(400).json({ error: 'Некорректный вес' });
            }
            if (!Array.isArray(trainingDates) || trainingDates.some((d) => !isValidIsoDate(d))) {
                return res.status(400).json({ error: 'Некорректные даты тренировок' });
            }
            if (!Array.isArray(carbSources) || carbSources.some((v) => typeof v !== 'string')) {
                return res.status(400).json({ error: 'Некорректный источник углеводов' });
            }
            if (!Array.isArray(proteinSources) || proteinSources.some((v) => typeof v !== 'string')) {
                return res.status(400).json({ error: 'Некорректный источник белка' });
            }
            if (typeof startDate !== 'string' || !isValidIsoDate(startDate)) {
                return res.status(400).json({ error: 'Некорректная дата начала' });
            }

            const data: DietData = {
                weight,
                trainingDates,
                carbSources,
                proteinSources,
                startDate,
                plan: plan && typeof plan === 'object' ? plan : undefined,
                gender: gender === 'female' ? 'female' : 'male',
                seedModifiers: seedModifiers && typeof seedModifiers === 'object' ? seedModifiers : undefined,
                mealOverrides: mealOverrides && typeof mealOverrides === 'object' ? mealOverrides : undefined,
            };

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
