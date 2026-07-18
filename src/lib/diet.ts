import { type CarbSource } from './api.js';

export const CARB_SOURCES: { value: CarbSource; label: string }[] = [
    { value: 'buckwheat', label: 'Гречка' },
    { value: 'rice', label: 'Рис' },
    { value: 'bulgur', label: 'Булгур' },
    { value: 'pasta', label: 'Макароны' },
    { value: 'potato', label: 'Картофель' },
];

const carbsPer100g: Record<CarbSource, number> = {
    buckwheat: 68,
    rice: 73.7,
    bulgur: 63,
    pasta: 74.9,
    potato: 18.1,
};

export function calcCarbs(weight: number): { min: number; max: number } {
    return { min: Math.round(weight * 2), max: Math.round(weight * 3) };
}

export function calcProtein(weight: number): { min: number; max: number } {
    return { min: Math.round(weight * 1.6), max: Math.round(weight * 2.0) };
}

export function carbPortion(weight: number, source: CarbSource): { min: number; max: number } {
    const { min, max } = calcCarbs(weight);
    const density = carbsPer100g[source];
    if (source === 'potato') {
        return { min: Math.round((min / density) * 100), max: Math.round((max / density) * 100) };
    }
    return { min: Math.round((min / density) * 100), max: Math.round((max / density) * 100) };
}

export function isTrainingDay(date: string, trainingDates: string[]): boolean {
    return trainingDates.includes(date);
}

export interface DayPlan {
    type: 'training' | 'rest';
    meals: Meal[];
}

export interface Meal {
    name: string;
    time: string;
    template: string;
    items: string[];
    notes?: string;
}

export function buildDayPlan(date: string, weight: number, source: CarbSource, trainingDates: string[] = []): DayPlan {
    const training = isTrainingDay(date, trainingDates);
    const portion = carbPortion(weight, source);
    const sourceLabel = CARB_SOURCES.find((s) => s.value === source)?.label || source;

    if (training) {
        return {
            type: 'training',
            meals: [
                {
                    name: 'Приём 1',
                    time: 'После тренировки (~11:30)',
                    template: 'Белок + Углеводы',
                    items: [
                        'Нежирное мясо / рыба: куриная грудка, индейка, тунец — 250–300 г',
                        `${sourceLabel} ${portion.min}–${portion.max} г (сухой вес)`,
                        'Овощной салат без масла',
                        'Опционально: сывороточный протеин на воде',
                        'Опционально на десерт: 1–2 фрукта, горсть ягод, зефир, мармелад или мёд',
                    ],
                    notes: 'Никаких жиров: ни масла, ни сыра, ни жирных соусов.',
                },
                {
                    name: 'Перекус',
                    time: '~13:30',
                    template: 'Белок',
                    items: ['Нежирный творог 200 г или протеин на воде'],
                },
                {
                    name: 'Приём 2',
                    time: '~16:00–17:00',
                    template: 'Белок + Жиры',
                    items: [
                        'Жирное мясо / рыба: куриные бёдра, говядина, скумбрия, сельдь — 250–300 г',
                        'Сыр 50 г',
                        'Овощной салат с 1 ст.л. оливкового масла',
                        'Опционально: 50 г орехов или семечек',
                    ],
                    notes: 'Никаких углеводов: ни круп, ни хлеба, ни фруктов.',
                },
            ],
        };
    }

    return {
        type: 'rest',
        meals: [
            {
                name: 'Приём 1',
                time: '09:00–11:00',
                template: 'Белок + Жиры',
                items: [
                    'Яйца 3–4 шт. на сливочном или топлёном масле',
                    'Сыр или творог',
                    'Овощной салат с оливковым маслом',
                    'Орехи или семечки 50 г',
                ],
                notes: 'Углеводы только из овощей/зелени/орехов, до 50–80 г в день.',
            },
            {
                name: 'Приём 2',
                time: '14:00–17:00',
                template: 'Белок + Жиры',
                items: [
                    'Жирное мясо / рыба: куриные бёдра, говядина, скумбрия, сельдь — 250–300 г',
                    'Сыр 50 г',
                    'Большой овощной салат с оливковым маслом',
                    'Орехи или семечки 50 г',
                ],
            },
        ],
    };
}

export function generateWeekPlan(startDate: string, weight: number, source: CarbSource, trainingDates: string[]): { date: string; plan: DayPlan }[] {
    const start = new Date(startDate);
    const days: { date: string; plan: DayPlan }[] = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const iso = date.toISOString().split('T')[0];
        const plan = buildDayPlan(iso, weight, source, trainingDates);
        days.push({ date: iso, plan });
    }

    return days;
}
