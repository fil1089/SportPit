import { type ProductRef, type PlanSchema, type MacroTargets } from './api.js';

export const DEFAULT_CARB_SOURCES: ProductRef[] = [
    { value: 'buckwheat', label: 'Гречка', carbsPer100g: 68, defaultPortion: 160 },
    { value: 'rice', label: 'Рис', carbsPer100g: 73.7, defaultPortion: 150 },
    { value: 'bulgur', label: 'Булгур', carbsPer100g: 63, defaultPortion: 150 },
    { value: 'pasta', label: 'Макароны из твёрдых сортов', carbsPer100g: 74.9, defaultPortion: 145 },
    { value: 'potato', label: 'Картофель', carbsPer100g: 18.1, defaultPortion: 400 },
    { value: 'quinoa', label: 'Киноа', carbsPer100g: 64.2, defaultPortion: 160 },
    { value: 'oats', label: 'Овсянка', carbsPer100g: 66, defaultPortion: 160 },
    { value: 'couscous', label: 'Кускус', carbsPer100g: 77.4, defaultPortion: 140 },
    { value: 'spelt', label: 'Полба', carbsPer100g: 70.6, defaultPortion: 150 },
    { value: 'lentils', label: 'Чечевица', carbsPer100g: 60, defaultPortion: 170 },
];

export const DEFAULT_PROTEIN_SOURCES: ProductRef[] = [
    { value: 'chicken_breast', label: 'Куриная грудка', proteinPer100g: 23, fatPer100g: 1.5, defaultPortion: 150 },
    { value: 'turkey', label: 'Филе индейки', proteinPer100g: 24, fatPer100g: 1.2, defaultPortion: 150 },
    { value: 'chicken_thigh', label: 'Куриные бёдра', proteinPer100g: 20, fatPer100g: 8, defaultPortion: 250 },
    { value: 'beef_minced', label: 'Говяжий фарш', proteinPer100g: 19, fatPer100g: 20, defaultPortion: 300 },
    { value: 'beef', label: 'Говядина', proteinPer100g: 26, fatPer100g: 16, defaultPortion: 200 },
    { value: 'pork_tenderloin', label: 'Свиная вырезка', proteinPer100g: 22, fatPer100g: 7, defaultPortion: 200 },
    { value: 'tuna', label: 'Тунец в собственном соку', proteinPer100g: 23, fatPer100g: 1, defaultPortion: 320 },
    { value: 'mackerel_herring', label: 'Скумбрия/сельдь', proteinPer100g: 18, fatPer100g: 9, defaultPortion: 250 },
    { value: 'salmon_trout', label: 'Сёмга/форель', proteinPer100g: 20, fatPer100g: 14, defaultPortion: 220 },
    { value: 'cod', label: 'Треска/хек', proteinPer100g: 17, fatPer100g: 0.7, defaultPortion: 300 },
    { value: 'eggs', label: 'Яйца', proteinPer100g: 13, fatPer100g: 11, defaultPortion: 200 },
    { value: 'cottage_cheese_0_5', label: 'Творог 0–5%', proteinPer100g: 18, fatPer100g: 4, defaultPortion: 200 },
    { value: 'cottage_cheese_9', label: 'Творог 9%', proteinPer100g: 14, fatPer100g: 9, defaultPortion: 200 },
    { value: 'cheese', label: 'Твёрдый сыр', proteinPer100g: 25, fatPer100g: 27, defaultPortion: 50 },
    { value: 'adygei_cheese', label: 'Сыр Адыгейский', proteinPer100g: 18, fatPer100g: 14, defaultPortion: 50 },
    { value: 'brynza', label: 'Брынза', proteinPer100g: 17, fatPer100g: 20, defaultPortion: 80 },
    { value: 'whey_protein', label: 'Сывороточный протеин', proteinPerPortion: 18, defaultPortion: 1 },
    { value: 'kefir_25', label: 'Кефир 2.5%', proteinPer100g: 3, fatPer100g: 2.5, defaultPortion: 250 },
];

export const DEFAULT_MACROS: MacroTargets = {
    protein: { min: 100, max: 130 },
    carbsTraining: { min: 130, max: 190 },
    carbsRest: { min: 50, max: 80 },
    fatsTraining: 'только в Приёме 2',
    fatsRest: 'в обоих приёмах',
};

export const DEFAULT_RULES: string[] = [
    'Окно питания: 09:00–17:00. Можно есть в любое время внутри, но не раньше и не позже.',
    'Не смешивать жиры и углеводы в одном приёме. На тренировочных днях углеводы — только в Приёме 1, и там минимум жиров.',
    'Сладкое и фрукты — только в тренировочные дни, только в Приёме 1 сразу после тренировки. Без сахара в остальное время.',
    'Без хлеба, макарон и круп на выходных.',
    'Без алкоголя — ломает протокол.',
    'Пить много воды во время голодного окна.',
    'Если дата не из списка тренировочных — это выходной день, даже если вчера была тренировка.',
    'Протеин — только на воде, только в Приёме 1 тренировочных дней.',
];

export const DEFAULT_SUPPLEMENTS: PlanSchema['supplements'] = [
    { name: 'Креатин моногидрат', dose: '5 г/день', when: 'В любое время, каждый день', why: 'Рост силы и объёма мышц' },
    { name: 'Бета-аланин', dose: 'По инструкции на упаковке', when: 'Перед тренировкой или равномерно', why: 'Больше повторений, выносливость' },
    { name: 'Витамин D3 + K2', dose: 'По инструкции', when: 'С жирной пищей', why: 'Гормоны, иммунитет, восстановление' },
    { name: 'Магний', dose: 'По инструкции', when: 'Вечером', why: 'Нервная система, сон, восстановление' },
    { name: 'Цинк', dose: 'По инструкции', when: 'С едой', why: 'Тестостерон, иммунитет' },
];

export const DEFAULT_WEEK_BASKET: Record<string, string> = {
    'Яйца': '~30 шт.',
    'Куриная грудка': '~600 г',
    'Куриные бёдра': '~1.5 кг',
    'Индейка': '~600 г',
    'Говяжий фарш': '~1.2 кг',
    'Тунец в банке': '~6–8 банок',
    'Скумбрия/сельдь': '~500 г',
    'Гречка сухая': '~320 г',
    'Рис сухой': '~280 г',
    'Сыры (твёрдый, адыгейский, брынза)': '~700 г',
    'Масло сливочное': '~200 г',
    'Оливковое масло': '~200 мл',
    'Овощи (огурцы, помидоры, перец, капуста, зелень)': '~6–8 кг',
    'Семечки подсолнечные': '~700 г',
    'Творог 0–5% и 9%': '~1 кг',
    'Протеин': 'порций по тренировочным дням',
};

export const DEFAULT_PLAN: PlanSchema = {
    version: 1,
    title: 'План питания по протоколу Егорова',
    subtitle: 'Интервальное голодание + циклирование углеводов',
    initial: {
        weight: 65,
        startDate: '2026-07-19',
        carbSources: ['buckwheat', 'bulgur', 'pasta'],
        proteinSources: ['chicken_breast', 'turkey', 'beef_minced', 'tuna', 'mackerel_herring', 'chicken_thigh', 'cottage_cheese_0_5', 'eggs', 'cheese'],
        trainingDates: [
            '2026-07-20',
            '2026-07-24',
            '2026-07-28',
            '2026-08-01',
            '2026-08-05',
            '2026-08-09',
            '2026-08-13',
            '2026-08-17',
            '2026-08-21',
            '2026-08-25',
            '2026-08-29',
        ],
    },
    rules: DEFAULT_RULES,
    macros: DEFAULT_MACROS,
    supplements: DEFAULT_SUPPLEMENTS,
    products: {
        carbs: DEFAULT_CARB_SOURCES,
        protein: DEFAULT_PROTEIN_SOURCES,
    },
    weekBasket: DEFAULT_WEEK_BASKET,
};

export function resolvePlan(plan?: PlanSchema): PlanSchema {
    if (!plan) return DEFAULT_PLAN;
    return {
        ...DEFAULT_PLAN,
        ...plan,
        products: {
            carbs: plan.products?.carbs?.length ? plan.products.carbs : DEFAULT_CARB_SOURCES,
            protein: plan.products?.protein?.length ? plan.products.protein : DEFAULT_PROTEIN_SOURCES,
        },
        macros: plan.macros || DEFAULT_MACROS,
        rules: plan.rules?.length ? plan.rules : DEFAULT_RULES,
        supplements: plan.supplements?.length ? plan.supplements : DEFAULT_SUPPLEMENTS,
        weekBasket: plan.weekBasket || DEFAULT_WEEK_BASKET,
    };
}

export function calcCarbs(_weight: number, macros = DEFAULT_MACROS): { min: number; max: number } {
    return macros.carbsTraining;
}

export function calcProtein(_weight: number, macros = DEFAULT_MACROS): { min: number; max: number } {
    return macros.protein;
}

export function carbPortion(carbs: number, source: ProductRef): number {
    if (!source.carbsPer100g) return source.defaultPortion;
    return Math.round((carbs / source.carbsPer100g) * 100);
}

export function proteinPortion(protein: number, source: ProductRef): number {
    if (source.proteinPerPortion) {
        return Math.round(protein / source.proteinPerPortion);
    }
    if (!source.proteinPer100g) return source.defaultPortion;
    return Math.round((protein / source.proteinPer100g) * 100);
}

export function calcMacrosFromItems(items: string[]): Macros {
    let protein = 0;
    let fat = 0;
    let carbs = 0;

    for (const item of items) {
        // Протеин порошок: 18г белка, 7.2г углеводов на порцию
        if (item.includes('протеин')) {
            protein += 18;
            carbs += 7.2;
            continue;
        }
        // Яйца 3-4 шт. ~ 200г
        if (item.includes('Яйца')) {
            const portion = 200;
            protein += (13 * portion) / 100;
            fat += (11 * portion) / 100;
            continue;
        }
        // Сыр 50г
        if (item.includes('Сыр 50')) {
            const portion = 50;
            protein += (25 * portion) / 100;
            fat += (27 * portion) / 100;
            continue;
        }
        // Орехи/семечки 50г
        if (item.includes('Орехи') || item.includes('семечки')) {
            const portion = 50;
            protein += (18 * portion) / 100;
            fat += (50 * portion) / 100;
            carbs += (10 * portion) / 100;
            continue;
        }
        // Оливковое/сливочное масло ~ 10г
        if (item.includes('масла')) {
            const portion = 10;
            fat += portion;
            continue;
        }
        // Овощной салат ~ 200г, ~5г углеводов
        if (item.includes('Овощной салат')) {
            carbs += 5;
            continue;
        }
        // Парсим строки вида "Продукт 150 г"
        const match = item.match(/(\d+)\s*г/);
        if (match) {
            const portion = parseInt(match[1], 10);
            const allProducts = [...DEFAULT_CARB_SOURCES, ...DEFAULT_PROTEIN_SOURCES];
            const product = allProducts.find((p) => item.includes(p.label));
            if (product) {
                if (product.proteinPer100g) protein += (product.proteinPer100g * portion) / 100;
                if (product.carbsPer100g) carbs += (product.carbsPer100g * portion) / 100;
                if (product.fatPer100g) fat += (product.fatPer100g * portion) / 100;
            }
        }
    }

    return {
        protein: Math.round(protein),
        fat: Math.round(fat),
        carbs: Math.round(carbs),
        calories: Math.round(protein * 4 + fat * 9 + carbs * 4),
    };
}

export function sumMacros(macros: Macros[]): DayMacros {
    return macros.reduce(
        (acc, m) => ({
            protein: acc.protein + m.protein,
            fat: acc.fat + m.fat,
            carbs: acc.carbs + m.carbs,
            calories: acc.calories + m.calories,
        }),
        { protein: 0, fat: 0, carbs: 0, calories: 0 }
    );
}

export function isTrainingDay(date: string, trainingDates: string[]): boolean {
    return trainingDates.includes(date);
}

export interface DayPlan {
    type: 'training' | 'rest';
    meals: Meal[];
    macros: DayMacros;
}

export interface Macros {
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
}

export interface Meal {
    name: string;
    time: string;
    template: string;
    items: string[];
    notes?: string;
    macros?: Macros;
}

export interface DayMacros {
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
}

function pickRotation<T>(items: T[], date: string): T {
    const hash = date.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return items[hash % items.length];
}

export function buildDayPlan(
    date: string,
    _weight: number,
    carbSources: ProductRef[],
    proteinSources: ProductRef[],
    trainingDates: string[],
    macros = DEFAULT_MACROS
): DayPlan {
    const training = isTrainingDay(date, trainingDates);
    const carbTarget = Math.round((macros.carbsTraining.min + macros.carbsTraining.max) / 2);
    const proteinTarget = Math.round((macros.protein.min + macros.protein.max) / 2);
    const carbSource = pickRotation(carbSources, date);
    const proteinSource1 = pickRotation(proteinSources, date);
    const proteinSource2 = pickRotation(proteinSources, date + '2');
    const proteinSource3 = pickRotation(proteinSources, date + '3');

    const carbPortionG = carbPortion(carbTarget, carbSource);
    const proteinPortion1 = proteinPortion(proteinTarget * 0.35, proteinSource1);
    const proteinPortion2 = proteinPortion(proteinTarget * 0.4, proteinSource2);

    const meals: Meal[] = training
        ? [
            {
                name: 'Приём 1',
                time: 'После тренировки (~11:30)',
                template: 'Белок + Углеводы',
                items: [
                    `1 порция сывороточного протеина на воде`,
                    `${proteinSource1.label} ${proteinPortion1} г`,
                    `${carbSource.label} ${carbPortionG} г (сухой вес)`,
                    'Овощной салат без масла',
                    'Опционально: 1–2 фрукта, горсть ягод, зефир, мармелад или мёд после основной порции',
                ],
                notes: 'Никаких жиров: ни масла, ни сыра, ни жирных соусов.',
            },
            {
                name: 'Перекус',
                time: '~13:30',
                template: 'Белок',
                items: [
                    `${proteinSource3.label} ${proteinPortion(proteinTarget * 0.2, proteinSource3)} г`,
                    'или 1 порция протеина на воде',
                ],
            },
            {
                name: 'Приём 2',
                time: '~17:00',
                template: 'Белок + Жиры',
                items: [
                    `${proteinSource2.label} ${proteinPortion2} г`,
                    'Сыр 50 г',
                    'Овощной салат с 1 ст.л. оливкового масла',
                    'Опционально: 50 г орехов или семечек',
                ],
                notes: 'Никаких углеводов: ни круп, ни хлеба, ни фруктов.',
            },
        ]
        : [
            {
                name: 'Приём 1',
                time: '09:00–11:00',
                template: 'Белок + Жиры',
                items: [
                    'Яйца 3–4 шт. на сливочном или топлёном масле',
                    `${proteinSource1.label} ${proteinPortion(proteinTarget * 0.35, proteinSource1)} г`,
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
                    `${proteinSource2.label} ${proteinPortion2} г`,
                    'Сыр 50 г',
                    'Большой овощной салат с оливковым маслом',
                    'Орехи или семечки 50 г',
                ],
            },
        ];

    const mealsWithMacros = meals.map((meal) => ({ ...meal, macros: calcMacrosFromItems(meal.items) }));

    return {
        type: training ? 'training' : 'rest',
        meals: mealsWithMacros,
        macros: sumMacros(mealsWithMacros.map((m) => m.macros!)),
    };
}

export function generateWeekPlan(
    startDate: string,
    weight: number,
    carbSources: ProductRef[],
    proteinSources: ProductRef[],
    trainingDates: string[],
    macros = DEFAULT_MACROS
): { date: string; plan: DayPlan }[] {
    const start = new Date(startDate + 'T00:00:00');
    const days: { date: string; plan: DayPlan }[] = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const iso = date.toISOString().split('T')[0];
        const plan = buildDayPlan(iso, weight, carbSources, proteinSources, trainingDates, macros);
        days.push({ date: iso, plan });
    }

    return days;
}

export function addDays(date: string, days: number): string {
    const d = new Date(date + 'T00:00:00');
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
}

export function generateDatesFromRanges(ranges: { month: number; year: number; days: number[] }[]): string[] {
    return ranges.flatMap(({ year, month, days }) =>
        days.map((day) => {
            const d = new Date(year, month - 1, day);
            return d.toISOString().split('T')[0];
        })
    );
}

export function parsePlanJson(text: string): PlanSchema {
    const parsed = JSON.parse(text) as PlanSchema;
    if (!parsed.initial || !Array.isArray(parsed.initial.trainingDates)) {
        throw new Error('В плане отсутствуют обязательные поля');
    }
    return resolvePlan(parsed);
}
