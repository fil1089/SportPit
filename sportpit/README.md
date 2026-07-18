# SportPit — Протокол Егорова

Веб-приложение для планирования питания по протоколу Егорова (16:8 + циклирование углеводов/жиров).

## Стек

- React + Vite + TypeScript
- Tailwind CSS v4
- Vercel serverless functions (`@vercel/node`)
- Neon Postgres (`@neondatabase/serverless`)
- JWT-аутентификация (`jsonwebtoken`, `bcryptjs`)

## Переменные окружения (Vercel)

```
DATABASE_URL=postgresql://...  # строка подключения к Neon
JWT_SECRET=...                 # случайная строка для подписи токенов
```

## Схема базы данных

Запустить `schema.sql` в консоли Neon перед первым деплоем.

## Разработка

```bash
npm install
npm run dev
```

## Деплой

```bash
vercel --prod
```
