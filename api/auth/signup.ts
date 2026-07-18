import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../_db.js';
import { applyCors, getUserFromRequest, hashPassword, isValidEmail, signToken } from '../_auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    applyCors(res);
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Метод не поддерживается' });

    const { email, password } = req.body || {};

    if (!isValidEmail(email) || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'Некорректный email или пароль (минимум 6 символов)' });
    }

    try {
        const existing = await sql`SELECT id FROM sportpit_users WHERE email = ${email}`;
        if (existing.length > 0) {
            return res.status(409).json({ error: 'Пользователь уже существует' });
        }

        const passwordHash = await hashPassword(password);
        const rows = await sql`
            INSERT INTO sportpit_users (email, password_hash)
            VALUES (${email}, ${passwordHash})
            RETURNING id, email
        `;
        const user = rows[0];
        const token = signToken({ sub: user.id, email: user.email });

        return res.status(200).json({ token, user: { id: user.id, email: user.email } });
    } catch (err: any) {
        console.error('signup error:', err);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
}
