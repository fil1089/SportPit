import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../_db.js';
import { applyCors, isValidEmail, signToken, verifyPassword } from '../_auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    applyCors(res);
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Метод не поддерживается' });

    const { email, password } = req.body || {};

    if (!isValidEmail(email) || typeof password !== 'string') {
        return res.status(400).json({ error: 'Укажите email и пароль' });
    }

    try {
        const rows = await sql`SELECT id, email, password_hash FROM sportpit_users WHERE email = ${email}`;
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Неверный email или пароль' });
        }

        const user = rows[0];
        const valid = await verifyPassword(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ error: 'Неверный email или пароль' });
        }

        const token = signToken({ sub: user.id, email: user.email });
        return res.status(200).json({ token, user: { id: user.id, email: user.email } });
    } catch (err: any) {
        console.error('login error:', err);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
}
