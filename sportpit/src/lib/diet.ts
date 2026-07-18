import { type ProductRef, type PlanSchema, type MacroTargets, type ProteinType } from './api.js';

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
    { value: 'lentils_cooked', label: 'Чечевица отварная', proteinPer100g: 9, carbsPer100g: 20, fatPer100g: 0.4, defaultPortion: 200 },
    { value: 'chickpeas', label: 'Нут', proteinPer100g: 19, carbsPer100g: 61, fatPer100g: 6, defaultPortion: 150 },
    { value: 'beans', label: 'Фасоль', proteinPer100g: 21, carbsPer100g: 55, fatPer100g: 1, defaultPortion: 150 },
];

export const DEFAULT_PROTEIN_SOURCES: ProductRef[] = [
    { value: 'chicken_breast', label: 'Куриная грудка', proteinPer100g: 23, fatPer100g: 1.5, defaultPortion: 150, proteinType: 'animal' },
    { value: 'turkey', label: 'Филе индейки', proteinPer100g: 24, fatPer100g: 1.2, defaultPortion: 150, proteinType: 'animal' },
    { value: 'chicken_thigh', label: 'Куриные бёдра', proteinPer100g: 20, fatPer100g: 8, defaultPortion: 250, proteinType: 'animal' },
    { value: 'beef_minced', label: 'Говяжий фарш', proteinPer100g: 19, fatPer100g: 20, defaultPortion: 300, proteinType: 'animal' },
    { value: 'beef', label: 'Говядина', proteinPer100g: 26, fatPer100g: 16, defaultPortion: 200, proteinType: 'animal' },
    { value: 'pork_tenderloin', label: 'Свиная вырезка', proteinPer100g: 22, fatPer100g: 7, defaultPortion: 200, proteinType: 'animal' },
    { value: 'tuna', label: 'Тунец в собственном соку', proteinPer100g: 23, fatPer100g: 1, defaultPortion: 320, proteinType: 'animal' },
    { value: 'mackerel_herring', label: 'Скумбрия/сельдь', proteinPer100g: 18, fatPer100g: 9, defaultPortion: 250, proteinType: 'animal' },
    { value: 'salmon_trout', label: 'Сёмга/форель', proteinPer100g: 20, fatPer100g: 14, defaultPortion: 220, proteinType: 'animal' },
    { value: 'cod', label: 'Треска/хек', proteinPer100g: 17, fatPer100g: 0.7, defaultPortion: 300, proteinType: 'animal' },
    { value: 'eggs', label: 'Яйца', proteinPer100g: 13, fatPer100g: 11, proteinPerPortion: 6.5, defaultPortion: 4, proteinType: 'animal', portionUnit: 'pcs' },
    { value: 'cottage_cheese_0_5', label: 'Творог 0–5%', proteinPer100g: 18, fatPer100g: 4, defaultPortion: 200, proteinType: 'animal' },
    { value: 'cottage_cheese_9', label: 'Творог 9%', proteinPer100g: 14, fatPer100g: 9, defaultPortion: 200, proteinType: 'animal' },
    { value: 'cheese', label: 'Твёрдый сыр', proteinPer100g: 25, fatPer100g: 27, defaultPortion: 50, proteinType: 'animal' },
    { value: 'adygei_cheese', label: 'Сыр Адыгейский', proteinPer100g: 18, fatPer100g: 14, defaultPortion: 50, proteinType: 'animal' },
    { value: 'brynza', label: 'Брынза', proteinPer100g: 17, fatPer100g: 20, defaultPortion: 80, proteinType: 'animal' },
    { value: 'whey_protein', label: 'Сывороточный протеин', proteinPerPortion: 18, defaultPortion: 1, proteinType: 'animal' },
    { value: 'kefir_25', label: 'Кефир 2.5%', proteinPer100g: 3, fatPer100g: 2.5, defaultPortion: 250, proteinType: 'animal' },
    // Растительный белок
    { value: 'tofu', label: 'Тофу', proteinPer100g: 8, fatPer100g: 4, defaultPortion: 250, proteinType: 'plant' },
    { value: 'tempeh', label: 'Темпе', proteinPer100g: 19, fatPer100g: 11, defaultPortion: 120, proteinType: 'plant' },
    { value: 'soybeans', label: 'Соевые бобы', proteinPer100g: 36, carbsPer100g: 30, fatPer100g: 15, defaultPortion: 80, proteinType: 'plant' },
    { value: 'asparagus', label: 'Спаржа', proteinPer100g: 2.2, carbsPer100g: 4, fatPer100g: 0.2, defaultPortion: 300, proteinType: 'plant' },
    { value: 'mushrooms', label: 'Грибы', proteinPer100g: 3.5, fatPer100g: 0.5, defaultPortion: 300, proteinType: 'plant' },
    { value: 'peanuts', label: 'Арахис', proteinPer100g: 26, fatPer100g: 49, defaultPortion: 50, proteinType: 'plant' },
    { value: 'almonds', label: 'Миндаль', proteinPer100g: 18.5, fatPer100g: 54, defaultPortion: 50, proteinType: 'plant' },
    { value: 'sunflower_seeds', label: 'Семечки подсолнечные', proteinPer100g: 20, fatPer100g: 52, defaultPortion: 50, proteinType: 'plant' },
    { value: 'pumpkin_seeds', label: 'Семена тыквы', proteinPer100g: 25, fatPer100g: 45, defaultPortion: 50, proteinType: 'plant' },
    { value: 'walnuts', label: 'Грецкий орех', proteinPer100g: 15, fatPer100g: 65, defaultPortion: 50, proteinType: 'plant' },
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

function mergeProducts(saved: ProductRef[] | undefined, defaults: ProductRef[]): ProductRef[] {
    const savedMap = new Map((saved || []).map((p) => [p.value, p]));
    // Overwrite defaults with saved data for products that still exist in defaults.
    // Products removed from defaults (e.g. deprecated sources) are dropped.
    return defaults.map((p) => ({ ...p, ...(savedMap.get(p.value) || {}) }));
}

const BASKET_LABELS: Record<string, string> = {
    whey_protein: 'Сывороточный протеин',
};

function basketLabel(product: ProductRef): string {
    return BASKET_LABELS[product.value] || product.label;
}

function extractAmounts(items: string[], products: ProductRef[]): Map<string, number> {
    const amounts = new Map<string, number>();

    for (const item of items) {
        // Яйца 3-4 шт. -> считаем 4 шт. (максимум из диапазона)
        const eggsMatch = item.match(/Яйца\s*(\d+)(?:[–-](\d+))?\s*шт/i);
        if (eggsMatch) {
            const count = eggsMatch[2] ? Number(eggsMatch[2]) : Number(eggsMatch[1]);
            amounts.set('Яйца', (amounts.get('Яйца') || 0) + count);
            continue;
        }

        // Сыр 50 г
        const cheeseMatch = item.match(/Сыр\s+(\d+)\s*г/);
        if (cheeseMatch) {
            amounts.set('Сыр', (amounts.get('Сыр') || 0) + Number(cheeseMatch[1]));
            continue;
        }

        // Орехи или семечки 30 г
        const nutsMatch = item.match(/Орехи\s+или\s+семечки\s+(\d+)\s*г/);
        if (nutsMatch) {
            amounts.set('Орехи/семечки', (amounts.get('Орехи/семечки') || 0) + Number(nutsMatch[1]));
            continue;
        }

        // Овощной салат (считаем 200г на порцию)
        if (item.match(/Овощной салат/i)) {
            amounts.set('Овощи для салата', (amounts.get('Овощи для салата') || 0) + 200);
            continue;
        }

        // Порция протеина
        if (item.includes('протеин') && item.includes('порция')) {
            amounts.set('Сывороточный протеин', (amounts.get('Сывороточный протеин') || 0) + 1);
            continue;
        }

        // Продукт с граммовкой
        const match = item.match(/(\d+)\s*г/);
        if (!match) continue;
        const portion = parseInt(match[1], 10);
        const product = products.find((p) => item.includes(p.label));
        if (!product) continue;
        const label = basketLabel(product);
        amounts.set(label, (amounts.get(label) || 0) + portion);
    }

    return amounts;
}

function mergeAmounts(a: Map<string, number>, b: Map<string, number>): Map<string, number> {
    const merged = new Map(a);
    for (const [label, amount] of b) {
        merged.set(label, (merged.get(label) || 0) + amount);
    }
    return merged;
}

function formatAmount(label: string, amount: number): string {
    if (label === 'Яйца') return `~${Math.round(amount)} шт.`;
    if (label === 'Сывороточный протеин') return `~${Math.round(amount)} порций`;
    return `~${Math.round(amount)} г`;
}

export function buildWeekBasket(carbSources: ProductRef[], proteinSources: ProductRef[]): Record<string, string> {
    return buildWeeklyBaskets(carbSources, proteinSources, [])[0]?.basket ?? {};
}

export interface WeeklyBasket {
    weekIndex: number;
    startDate: string;
    endDate: string;
    basket: Record<string, string>;
}

export function buildWeeklyBaskets(
    carbSources: ProductRef[],
    proteinSources: ProductRef[],
    weekPlan: { date: string; plan: DayPlan }[]
): WeeklyBasket[] {
    const products = [...carbSources, ...proteinSources];
    const weeks: WeeklyBasket[] = [];

    for (let i = 0; i < weekPlan.length; i += 7) {
        const slice = weekPlan.slice(i, i + 7);
        if (!slice.length) continue;

        let amounts = new Map<string, number>();
        for (const day of slice) {
            for (const meal of day.plan.meals) {
                amounts = mergeAmounts(amounts, extractAmounts(meal.items, products));
            }
        }

        // Базовые продукты, если не попали в блюда
        if (!amounts.has('Яйца')) amounts.set('Яйца', 0);

        const basket: Record<string, string> = {};
        for (const [label, amount] of amounts) {
            if (amount > 0) basket[label] = formatAmount(label, amount);
        }

        weeks.push({
            weekIndex: weeks.length + 1,
            startDate: slice[0].date,
            endDate: slice[slice.length - 1].date,
            basket,
        });
    }

    return weeks;
}

function filterValidSources(selected: string[] | undefined, available: ProductRef[], fallback: string[]): string[] {
    if (!selected?.length) return fallback;
    const valid = selected.filter((v) => available.some((p) => p.value === v));
    return valid.length ? valid : fallback;
}

export function resolvePlan(plan?: PlanSchema): PlanSchema {
    if (!plan) return DEFAULT_PLAN;
    const carbs = mergeProducts(plan.products?.carbs, DEFAULT_CARB_SOURCES);
    const protein = mergeProducts(plan.products?.protein, DEFAULT_PROTEIN_SOURCES);
    const carbSources = filterValidSources(plan.initial?.carbSources, carbs, DEFAULT_PLAN.initial.carbSources);
    const proteinSources = filterValidSources(plan.initial?.proteinSources, protein, DEFAULT_PLAN.initial.proteinSources);
    return {
        ...DEFAULT_PLAN,
        ...plan,
        initial: {
            ...DEFAULT_PLAN.initial,
            ...plan.initial,
            carbSources,
            proteinSources,
        },
        products: { carbs, protein },
        macros: plan.macros || DEFAULT_MACROS,
        rules: plan.rules?.length ? plan.rules : DEFAULT_RULES,
        supplements: plan.supplements?.length ? plan.supplements : DEFAULT_SUPPLEMENTS,
        weekBasket: buildWeekBasket(carbs, protein),
    };
}

export function calcCarbs(weight: number, macros = DEFAULT_MACROS): { min: number; max: number } {
    // If macros are custom (different from default), use them as-is
    if (macros !== DEFAULT_MACROS) return macros.carbsTraining;
    // Otherwise scale based on weight: 2-3g per kg
    return { min: Math.round(weight * 2), max: Math.round(weight * 3) };
}

export function calcProtein(weight: number, macros = DEFAULT_MACROS): { min: number; max: number } {
    // If macros are custom, use them as-is
    if (macros !== DEFAULT_MACROS) return macros.protein;
    // Otherwise scale based on weight: 1.5-2g per kg
    return { min: Math.round(weight * 1.5), max: Math.round(weight * 2) };
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

export function calcMacrosFromItems(items: string[], products: ProductRef[] = [...DEFAULT_CARB_SOURCES, ...DEFAULT_PROTEIN_SOURCES]): Macros & { animalProtein: number; plantProtein: number } {
    let protein = 0;
    let fat = 0;
    let carbs = 0;
    let animalProtein = 0;
    let plantProtein = 0;

    function addProtein(amount: number, type?: ProteinType) {
        protein += amount;
        if (type === 'animal') animalProtein += amount;
        if (type === 'plant') plantProtein += amount;
    }

    for (const item of items) {
        // Протеин порошок: 18г белка, 7.2г углеводов на порцию
        if (item.includes('протеин')) {
            addProtein(18, 'animal');
            carbs += 7.2;
            continue;
        }
        // Яйца N шт. (считаем ~50 г за шт.)
        const eggsMatch = item.match(/Яйца\s*(\d+)\s*шт/);
        if (eggsMatch) {
            const count = Number(eggsMatch[1]);
            const portion = count * 50;
            addProtein((13 * portion) / 100, 'animal');
            fat += (11 * portion) / 100;
            continue;
        }
        // Сыр 50г
        if (item.includes('Сыр 50')) {
            const portion = 50;
            addProtein((25 * portion) / 100, 'animal');
            fat += (27 * portion) / 100;
            continue;
        }
        // Орехи/семечки 50г
        if (item.includes('Орехи') || item.includes('семечки')) {
            const portion = 50;
            addProtein((18 * portion) / 100, 'plant');
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
            const product = products.find((p) => item.includes(p.label));
            if (product) {
                if (product.proteinPer100g) addProtein((product.proteinPer100g * portion) / 100, product.proteinType);
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
        animalProtein: Math.round(animalProtein),
        plantProtein: Math.round(plantProtein),
    };
}

export function sumMacros(macros: (Macros & { animalProtein: number; plantProtein: number })[]): DayMacros {
    return macros.reduce(
        (acc, m) => ({
            protein: acc.protein + m.protein,
            fat: acc.fat + m.fat,
            carbs: acc.carbs + m.carbs,
            calories: acc.calories + m.calories,
            animalProtein: acc.animalProtein + m.animalProtein,
            plantProtein: acc.plantProtein + m.plantProtein,
        }),
        { protein: 0, fat: 0, carbs: 0, calories: 0, animalProtein: 0, plantProtein: 0 }
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
    animalProtein: number;
    plantProtein: number;
}

function pickRotation<T>(items: T[], date: string): T {
    const hash = date.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return items[hash % items.length];
}

function isHighCarbPlant(source: ProductRef): boolean {
    return (source.carbsPer100g || 0) > 10;
}

function splitByProteinType(sources: ProductRef[], allowHighCarbPlant: boolean): { animal: ProductRef[]; plant: ProductRef[] } {
    return {
        animal: sources.filter((s) => s.proteinType === 'animal'),
        plant: sources.filter((s) => s.proteinType === 'plant' && (allowHighCarbPlant || !isHighCarbPlant(s))),
    };
}

export function buildDayPlan(
    date: string,
    weight: number,
    carbSources: ProductRef[],
    proteinSources: ProductRef[],
    trainingDates: string[],
    macros = DEFAULT_MACROS
): DayPlan {
    const training = isTrainingDay(date, trainingDates);

    // Calculate macros based on weight
    const proteinMacro = calcProtein(weight, macros);
    const carbMacro = training
        ? calcCarbs(weight, macros)
        : (macros !== DEFAULT_MACROS
            ? macros.carbsRest
            : { min: Math.round(weight * 0.8), max: Math.round(weight * 1.2) });

    const carbTarget = Math.round((carbMacro.min + carbMacro.max) / 2);
    const proteinTarget = Math.round((proteinMacro.min + proteinMacro.max) / 2);
    const carbSource = pickRotation(carbSources, date);
    const carbPortionG = carbPortion(carbTarget, carbSource);

    const { animal, plant } = splitByProteinType(proteinSources, training);
    const animalSource1 = pickRotation(animal.length ? animal : proteinSources, date);
    const animalSource2 = pickRotation(animal.length ? animal : proteinSources, date + '2');
    const plantSource = pickRotation(plant.length ? plant : proteinSources, date + '3');

    // Target: ~60% animal, ~40% plant protein
    const animalTarget = proteinTarget * 0.6;
    const plantTarget = proteinTarget * 0.4;
    const animalPortion1 = proteinPortion(animalTarget * 0.55, animalSource1);
    const animalPortion2 = proteinPortion(animalTarget * 0.45, animalSource2);
    const plantPortion = proteinPortion(plantTarget, plantSource);

    function formatProtein(source: ProductRef, portion: number): string {
        if (source.portionUnit === 'pcs') {
            return `${source.label} ${Math.round(portion)} шт.`;
        }
        return `${source.label} ${Math.round(portion)} г`;
    }

    const meals: Meal[] = training
        ? [
            {
                name: 'Приём 1',
                time: 'После тренировки (~11:30)',
                template: 'Белок + Углеводы',
                items: [
                    `1 порция сывороточного протеина на воде`,
                    formatProtein(animalSource1, animalPortion1),
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
                    formatProtein(plantSource, plantPortion),
                    'или 1 порция растительного протеина на воде',
                ],
            },
            {
                name: 'Приём 2',
                time: '~17:00',
                template: 'Белок + Жиры',
                items: [
                    formatProtein(animalSource2, animalPortion2),
                    'Сыр 50 г',
                    'Овощной салат с 1 ст.л. оливкового масла',
                    'Опционально: 30 г орехов или семечек',
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
                    formatProtein(animalSource1, animalPortion1),
                    formatProtein(plantSource, Math.round(plantPortion * 0.6)),
                    'Овощной салат с оливковым маслом',
                ],
                notes: 'Углеводы только из овощей/зелени/орехов, до 50–80 г в день.',
            },
            {
                name: 'Приём 2',
                time: '14:00–17:00',
                template: 'Белок + Жиры',
                items: [
                    formatProtein(animalSource2, animalPortion2),
                    'Сыр 50 г',
                    formatProtein(plantSource, Math.round(plantPortion * 0.4)),
                    'Большой овощной салат с оливковым маслом',
                    'Орехи или семечки 30 г',
                ],
            },
        ];

    const allProducts = [...carbSources, ...proteinSources];
    const mealsWithMacros = meals.map((meal) => ({ ...meal, macros: calcMacrosFromItems(meal.items, allProducts) }));

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
    macros = DEFAULT_MACROS,
    weeks = 6
): { date: string; plan: DayPlan }[] {
    const start = parseLocalDate(startDate);
    const days: { date: string; plan: DayPlan }[] = [];

    for (let i = 0; i < weeks * 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const iso = formatISOLocal(date);
        const plan = buildDayPlan(iso, weight, carbSources, proteinSources, trainingDates, macros);
        days.push({ date: iso, plan });
    }

    return days;
}

export function parseLocalDate(iso: string): Date {
    const [year, month, day] = iso.split('-').map(Number);
    return new Date(year, month - 1, day);
}

export function formatISOLocal(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function addDays(date: string, days: number): string {
    const d = parseLocalDate(date);
    d.setDate(d.getDate() + days);
    return formatISOLocal(d);
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
