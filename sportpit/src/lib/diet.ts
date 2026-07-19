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
    { value: 'lentils', label: 'Чечевица', proteinPer100g: 24, carbsPer100g: 60, fatPer100g: 1.5, defaultPortion: 100 },
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

export const getSupplements = (gender: 'male' | 'female' = 'male'): PlanSchema['supplements'] => {
    const base = [
        { name: 'Креатин моногидрат', dose: '5 г/день', when: 'В любое время, каждый день', why: 'Рост силы и объёма мышц' },
        { name: 'Бета-аланин', dose: 'По инструкции на упаковке', when: 'Перед тренировкой или равномерно', why: 'Больше повторений, выносливость' },
        { name: 'Витамин D3 + K2', dose: 'По инструкции', when: 'С жирной пищей', why: 'Гормоны, иммунитет, восстановление' },
        { name: 'Магний', dose: gender === 'female' ? '~300 мг' : '~400 мг', when: 'Вечером', why: 'Нервная система, сон, восстановление' },
        { name: 'Цинк', dose: 'По инструкции', when: 'С едой', why: 'Иммунитет, гормональный баланс' },
    ];
    
    if (gender === 'female') {
        base.push({ name: 'Мио-инозитол (B8)', dose: '2000-4000 мг', when: 'С едой', why: 'Гормональный баланс, чувствительность к инсулину' });
    }
    
    return base;
};

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
        gender: 'male',
    },
    rules: DEFAULT_RULES,
    macros: DEFAULT_MACROS,
    supplements: getSupplements('male'),
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
    const merged = defaults.map((p) => ({ ...p, ...(savedMap.get(p.value) || {}) }));
    
    // Add custom products that are not in defaults
    const customProducts = (saved || []).filter(p => p.custom && !defaults.some(d => d.value === p.value));
    return [...merged, ...customProducts];
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
        supplements: plan.supplements?.length ? plan.supplements : getSupplements(plan.initial?.gender || 'male'),
        weekBasket: buildWeekBasket(carbs, protein),
    };
}

export function calcCarbs(weight: number): { min: number; max: number } {
    // Scale based on weight: 2-3g per kg
    return { min: Math.round(weight * 2), max: Math.round(weight * 3) };
}

export function calcProtein(weight: number): { min: number; max: number } {
    // Scale based on weight: 1.5-2g per kg
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
        // Орехи/семечки (парсим количество, по умолчанию 30г)
        if (item.includes('Орехи') || item.includes('семечки')) {
            const match = item.match(/(\d+)\s*г/);
            const portion = match ? Number(match[1]) : 30;
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
    dishIdea?: string;
    notes?: string;
    macros?: Macros;
    overrides?: MealOverrideItem[];
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

// Безопасная версия: никогда не получает пустой массив
function safePickRotation<T>(items: T[], fallback: T[], date: string): T {
    const pool = items.length ? items : fallback;
    if (!pool.length) throw new Error('safePickRotation: both items and fallback are empty');
    const hash = date.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return pool[hash % pool.length];
}

// ─── База блюд ────────────────────────────────────────────────────────────────

interface DishEntry {
    idea: string;
    type: 'carb' | 'fat';
    carbBases?: string[];    // value из DEFAULT_CARB_SOURCES
    proteinBases?: string[]; // value из DEFAULT_PROTEIN_SOURCES
    fatBases?: string[];     // жировые продукты: сыры, орехи, семечки
}

const CARB_DISHES: DishEntry[] = [
    // Гречка
    { idea: 'Варёная гречка + варёная куриная грудка', type: 'carb', carbBases: ['buckwheat'], proteinBases: ['chicken_breast'] },
    { idea: 'Варёная гречка + варёное филе индейки', type: 'carb', carbBases: ['buckwheat'], proteinBases: ['turkey'] },
    { idea: 'Варёная гречка + тунец в собственном соку', type: 'carb', carbBases: ['buckwheat'], proteinBases: ['tuna'] },
    { idea: 'Варёная гречка + отварная треска/хек', type: 'carb', carbBases: ['buckwheat'], proteinBases: ['cod'] },
    { idea: 'Варёная гречка + тушёные грибы', type: 'carb', carbBases: ['buckwheat'], proteinBases: ['mushrooms'] },
    { idea: 'Варёная гречка + творог 0–5%', type: 'carb', carbBases: ['buckwheat'], proteinBases: ['cottage_cheese_0_5'] },
    { idea: 'Варёная гречка + свиная вырезка', type: 'carb', carbBases: ['buckwheat'], proteinBases: ['pork_tenderloin'] },
    // Рис
    { idea: 'Отварной рис + варёная куриная грудка', type: 'carb', carbBases: ['rice'], proteinBases: ['chicken_breast'] },
    { idea: 'Отварной рис + варёное филе индейки', type: 'carb', carbBases: ['rice'], proteinBases: ['turkey'] },
    { idea: 'Отварной рис + тунец в собственном соку', type: 'carb', carbBases: ['rice'], proteinBases: ['tuna'] },
    { idea: 'Отварной рис + тушёные грибы', type: 'carb', carbBases: ['rice'], proteinBases: ['mushrooms'] },
    { idea: 'Отварной рис + жареный тофу', type: 'carb', carbBases: ['rice'], proteinBases: ['tofu'] },
    { idea: 'Отварной рис + отварная треска/хек', type: 'carb', carbBases: ['rice'], proteinBases: ['cod'] },
    // Макароны
    { idea: 'Макароны с тунцом в собственном соку', type: 'carb', carbBases: ['pasta'], proteinBases: ['tuna'] },
    { idea: 'Макароны с куриной грудкой и грибами', type: 'carb', carbBases: ['pasta'], proteinBases: ['chicken_breast', 'mushrooms'] },
    { idea: 'Макароны с филе индейки', type: 'carb', carbBases: ['pasta'], proteinBases: ['turkey'] },
    { idea: 'Макароны с творогом 0–5% и зеленью', type: 'carb', carbBases: ['pasta'], proteinBases: ['cottage_cheese_0_5'] },
    { idea: 'Макароны с отварной треской/хеком', type: 'carb', carbBases: ['pasta'], proteinBases: ['cod'] },
    // Картофель
    { idea: 'Запечённый картофель + куриная грудка', type: 'carb', carbBases: ['potato'], proteinBases: ['chicken_breast'] },
    { idea: 'Отварной картофель + тунец в собственном соку', type: 'carb', carbBases: ['potato'], proteinBases: ['tuna'] },
    { idea: 'Отварной картофель + тушёные грибы', type: 'carb', carbBases: ['potato'], proteinBases: ['mushrooms'] },
    { idea: 'Картофельное пюре (без масла) + тушёная свиная вырезка', type: 'carb', carbBases: ['potato'], proteinBases: ['pork_tenderloin'] },
    { idea: 'Запечённый картофель + отварная треска/хек', type: 'carb', carbBases: ['potato'], proteinBases: ['cod'] },
    // Булгур
    { idea: 'Отварной булгур + куриная грудка', type: 'carb', carbBases: ['bulgur'], proteinBases: ['chicken_breast'] },
    { idea: 'Отварной булгур + тунец в собственном соку', type: 'carb', carbBases: ['bulgur'], proteinBases: ['tuna'] },
    { idea: 'Отварной булгур с треской/хеком и грибами', type: 'carb', carbBases: ['bulgur'], proteinBases: ['cod', 'mushrooms'] },
    { idea: 'Отварной булгур + филе индейки', type: 'carb', carbBases: ['bulgur'], proteinBases: ['turkey'] },
    // Киноа
    { idea: 'Отварное киноа + куриная грудка', type: 'carb', carbBases: ['quinoa'], proteinBases: ['chicken_breast'] },
    { idea: 'Отварное киноа + тунец в собственном соку', type: 'carb', carbBases: ['quinoa'], proteinBases: ['tuna'] },
    { idea: 'Отварное киноа с тофу и зеленью', type: 'carb', carbBases: ['quinoa'], proteinBases: ['tofu'] },
    // Овсянка
    { idea: 'Овсянка на воде + творог 0–5%', type: 'carb', carbBases: ['oats'], proteinBases: ['cottage_cheese_0_5'] },
    { idea: 'Овсянка на воде + порция сывороточного протеина', type: 'carb', carbBases: ['oats'], proteinBases: ['whey_protein'] },
    // Кускус / Полба
    { idea: 'Кускус с куриной грудкой и грибами', type: 'carb', carbBases: ['couscous'], proteinBases: ['chicken_breast', 'mushrooms'] },
    { idea: 'Отварная полба + тунец в собственном соку', type: 'carb', carbBases: ['spelt'], proteinBases: ['tuna'] },
    { idea: 'Отварная полба + куриная грудка', type: 'carb', carbBases: ['spelt'], proteinBases: ['chicken_breast'] },
    // Бобовые
    { idea: 'Отварная чечевица + куриная грудка', type: 'carb', carbBases: ['lentils'], proteinBases: ['chicken_breast'] },
    { idea: 'Отварная чечевица + филе индейки', type: 'carb', carbBases: ['lentils'], proteinBases: ['turkey'] },
    { idea: 'Варёный нут + куриная грудка', type: 'carb', carbBases: ['chickpeas'], proteinBases: ['chicken_breast'] },
    { idea: 'Варёный нут + тушёные грибы', type: 'carb', carbBases: ['chickpeas'], proteinBases: ['mushrooms'] },
    { idea: 'Варёная фасоль + филе индейки', type: 'carb', carbBases: ['beans'], proteinBases: ['turkey'] },
    { idea: 'Варёная фасоль + свиная вырезка', type: 'carb', carbBases: ['beans'], proteinBases: ['pork_tenderloin'] },
    // Запасные (без конкретной крупы)
    { idea: 'Крупа с куриной грудкой и грибами', type: 'carb', proteinBases: ['chicken_breast', 'mushrooms'] },
    { idea: 'Крупа с тунцом и овощами без масла', type: 'carb', proteinBases: ['tuna'] },
    { idea: 'Крупа с филе индейки и зеленью', type: 'carb', proteinBases: ['turkey'] },
];

const FAT_DISHES: DishEntry[] = [
    // Куриные бёдра
    { idea: 'Жареные куриные бёдра + твёрдый сыр', type: 'fat', proteinBases: ['chicken_thigh'], fatBases: ['cheese'] },
    { idea: 'Куриные бёдра + жареные грибы', type: 'fat', proteinBases: ['chicken_thigh', 'mushrooms'] },
    { idea: 'Запечённые куриные бёдра + адыгейский сыр', type: 'fat', proteinBases: ['chicken_thigh'], fatBases: ['adygei_cheese'] },
    { idea: 'Куриные бёдра + брынза + зелень', type: 'fat', proteinBases: ['chicken_thigh'], fatBases: ['brynza'] },
    { idea: 'Куриные бёдра + горсть миндаля', type: 'fat', proteinBases: ['chicken_thigh'], fatBases: ['almonds'] },
    { idea: 'Куриные бёдра + семечки подсолнечные', type: 'fat', proteinBases: ['chicken_thigh'], fatBases: ['sunflower_seeds'] },
    { idea: 'Запечённые куриные бёдра + грецкие орехи', type: 'fat', proteinBases: ['chicken_thigh'], fatBases: ['walnuts'] },
    { idea: 'Куриные бёдра + жареный тофу', type: 'fat', proteinBases: ['chicken_thigh', 'tofu'] },
    // Говядина / Фарш
    { idea: 'Жареный говяжий фарш + грибы', type: 'fat', proteinBases: ['beef_minced', 'mushrooms'] },
    { idea: 'Говяжий фарш + брынза', type: 'fat', proteinBases: ['beef_minced'], fatBases: ['brynza'] },
    { idea: 'Говядина тушёная + твёрдый сыр вприкуску', type: 'fat', proteinBases: ['beef'], fatBases: ['cheese'] },
    { idea: 'Говядина + адыгейский сыр', type: 'fat', proteinBases: ['beef'], fatBases: ['adygei_cheese'] },
    { idea: 'Говядина тушёная с тофу и грибами', type: 'fat', proteinBases: ['beef', 'tofu', 'mushrooms'] },
    { idea: 'Варёная говядина + семена тыквы', type: 'fat', proteinBases: ['beef'], fatBases: ['pumpkin_seeds'] },
    // Скумбрия / Сельдь
    { idea: 'Запечённая скумбрия + жареные грибы', type: 'fat', proteinBases: ['mackerel_herring', 'mushrooms'] },
    { idea: 'Жареная скумбрия + твёрдый сыр', type: 'fat', proteinBases: ['mackerel_herring'], fatBases: ['cheese'] },
    { idea: 'Сельдь слабосолёная + варёные яйца', type: 'fat', proteinBases: ['mackerel_herring', 'eggs'] },
    { idea: 'Скумбрия + горсть миндаля', type: 'fat', proteinBases: ['mackerel_herring'], fatBases: ['almonds'] },
    // Сёмга / Форель
    { idea: 'Запечённая сёмга + адыгейский сыр', type: 'fat', proteinBases: ['salmon_trout'], fatBases: ['adygei_cheese'] },
    { idea: 'Запечённая сёмга + брынза и зелень', type: 'fat', proteinBases: ['salmon_trout'], fatBases: ['brynza'] },
    { idea: 'Стейк из форели + жареные грибы', type: 'fat', proteinBases: ['salmon_trout', 'mushrooms'] },
    { idea: 'Жареная форель + грецкие орехи', type: 'fat', proteinBases: ['salmon_trout'], fatBases: ['walnuts'] },
    // Яйца
    { idea: 'Яичница (3–4 шт.) + жареные грибы', type: 'fat', proteinBases: ['eggs', 'mushrooms'] },
    { idea: 'Яичница (3–4 шт.) + твёрдый сыр', type: 'fat', proteinBases: ['eggs'], fatBases: ['cheese'] },
    { idea: 'Яичница (3–4 шт.) + адыгейский сыр', type: 'fat', proteinBases: ['eggs'], fatBases: ['adygei_cheese'] },
    { idea: 'Омлет с твёрдым сыром и грибами', type: 'fat', proteinBases: ['eggs', 'mushrooms'], fatBases: ['cheese'] },
    { idea: 'Варёные яйца (3–4 шт.) + брынза', type: 'fat', proteinBases: ['eggs'], fatBases: ['brynza'] },
    { idea: 'Варёные яйца + горсть арахиса', type: 'fat', proteinBases: ['eggs'], fatBases: ['peanuts'] },
    { idea: 'Варёные яйца + семена тыквы', type: 'fat', proteinBases: ['eggs'], fatBases: ['pumpkin_seeds'] },
    { idea: 'Омлет + жареный говяжий фарш', type: 'fat', proteinBases: ['eggs', 'beef_minced'] },
    { idea: 'Омлет + жареный тофу', type: 'fat', proteinBases: ['eggs', 'tofu'] },
    // Творог 9% / Кефир
    { idea: 'Творог 9% + горсть грецких орехов', type: 'fat', proteinBases: ['cottage_cheese_9'], fatBases: ['walnuts'] },
    { idea: 'Творог 9% + горсть арахиса', type: 'fat', proteinBases: ['cottage_cheese_9'], fatBases: ['peanuts'] },
    { idea: 'Творог 9% + семена тыквы', type: 'fat', proteinBases: ['cottage_cheese_9'], fatBases: ['pumpkin_seeds'] },
    { idea: 'Творог 9% + семечки подсолнечные', type: 'fat', proteinBases: ['cottage_cheese_9'], fatBases: ['sunflower_seeds'] },
    { idea: 'Творог 9% + кефир 2.5% (смешать в миске)', type: 'fat', proteinBases: ['cottage_cheese_9', 'kefir_25'] },
    { idea: 'Кефир 2.5% + горсть миндаля', type: 'fat', proteinBases: ['kefir_25'], fatBases: ['almonds'] },
    { idea: 'Кефир 2.5% + горсть грецких орехов', type: 'fat', proteinBases: ['kefir_25'], fatBases: ['walnuts'] },
    // Сырная нарезка
    { idea: 'Сырная нарезка (твёрдый + адыгейский) + варёные яйца', type: 'fat', proteinBases: ['eggs'], fatBases: ['cheese', 'adygei_cheese'] },
    // Треска/хек в жировом контексте (с сыром/орехами)
    { idea: 'Треска/хек + твёрдый сыр + овощи', type: 'fat', proteinBases: ['cod'], fatBases: ['cheese'] },
    { idea: 'Треска/хек + грибы + сыр', type: 'fat', proteinBases: ['cod', 'mushrooms'], fatBases: ['cheese'] },
    { idea: 'Треска/хек + семечки + зелень', type: 'fat', proteinBases: ['cod'], fatBases: ['sunflower_seeds'] },
    // Куриная грудка в жировом контексте
    { idea: 'Куриная грудка + твёрдый сыр + зелень', type: 'fat', proteinBases: ['chicken_breast'], fatBases: ['cheese'] },
    { idea: 'Куриная грудка + грибы + адыгейский сыр', type: 'fat', proteinBases: ['chicken_breast', 'mushrooms'], fatBases: ['adygei_cheese'] },
    { idea: 'Куриная грудка + грецкие орехи', type: 'fat', proteinBases: ['chicken_breast'], fatBases: ['walnuts'] },
    // Свиная вырезка в жировом контексте
    { idea: 'Свиная вырезка + горсть арахиса', type: 'fat', proteinBases: ['pork_tenderloin'], fatBases: ['peanuts'] },
    { idea: 'Свиная вырезка + твёрдый сыр', type: 'fat', proteinBases: ['pork_tenderloin'], fatBases: ['cheese'] },
    // Темпе
    { idea: 'Жареный темпе + грибы + сыр', type: 'fat', proteinBases: ['tempeh', 'mushrooms'], fatBases: ['cheese'] },
    { idea: 'Темпе + брынза + зелень', type: 'fat', proteinBases: ['tempeh'], fatBases: ['brynza'] },
    // Салаты
    { idea: 'Салат с маслом + жареные куриные бёдра', type: 'fat', proteinBases: ['chicken_thigh'] },
    { idea: 'Салат с маслом + варёная говядина', type: 'fat', proteinBases: ['beef'] },
    { idea: 'Салат с маслом + жареная сёмга/форель', type: 'fat', proteinBases: ['salmon_trout'] },
    { idea: 'Салат с маслом + варёные яйца и сыр', type: 'fat', proteinBases: ['eggs'], fatBases: ['cheese'] },
    { idea: 'Салат с маслом + жареные грибы и семечки', type: 'fat', proteinBases: ['mushrooms'], fatBases: ['sunflower_seeds'] },
];

const SNACK_IDEAS: string[] = [
    'Тофу или темпе отдельно',
    'Грибы тушёные',
    'Растительный протеин на воде',
    'Тофу + зелень',
    'Темпе + горчица',
];

function generateDishIdea(
    carbSource: ProductRef | null,
    mealProteinSources: ProductRef[],
    mealType: 'carb' | 'fat' | 'snack',
    date: string
): string {
    const proteinValues = new Set(mealProteinSources.map((p) => p.value));

    if (mealType === 'snack') {
        const snack = mealProteinSources[0];
        if (snack) {
            const snackIdeas = SNACK_IDEAS.filter((s) => s.toLowerCase().includes(snack.label.toLowerCase()));
            if (snackIdeas.length) return pickRotation(snackIdeas, date);
        }
        return mealProteinSources[0]?.label || pickRotation(SNACK_IDEAS, date);
    }

    const carbValue = carbSource?.value;
    const dishes = mealType === 'carb' ? CARB_DISHES : FAT_DISHES;

    // Считаем рейтинг совпадения: +3 за крупу, +2 за белковый продукт, +1 за жировой
    const scored = dishes.map((dish) => {
        let score = 0;
        if (carbValue && dish.carbBases?.includes(carbValue)) score += 3;
        for (const pv of dish.proteinBases || []) {
            if (proteinValues.has(pv)) score += 2;
        }
        for (const fv of dish.fatBases || []) {
            if (proteinValues.has(fv)) score += 1;
        }
        return { dish, score };
    });

    const best = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);

    if (best.length === 0) {
        // Нет совпадений — берём случайное из всей базы
        return pickRotation(dishes, date + mealType).idea;
    }

    // Берём только блюда с максимальным score — реально содержат нужные продукты
    const maxScore = best[0].score;
    const topTied = best.filter((s) => s.score === maxScore).map((s) => s.dish);
    // Если топ одно блюдо — расширяем до score-1 для небольшого разнообразия
    const pool = topTied.length >= 2
        ? topTied
        : best.filter((s) => s.score >= maxScore - 1).map((s) => s.dish);

    return pickRotation(pool, date + mealType).idea;
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

export type MealOverrideItem = { productValue: string; amount: number };

export function buildDayPlan(
    date: string,
    weight: number,
    carbSources: ProductRef[],
    proteinSources: ProductRef[],
    trainingDates: string[],
    seedModifier = 0,
    overrides?: Record<number, MealOverrideItem[]>
): DayPlan {
    const training = isTrainingDay(date, trainingDates);

    // Calculate macros based on weight
    const proteinMacro = calcProtein(weight);
    const carbMacro = training
        ? calcCarbs(weight)
        : { min: Math.round(weight * 0.8), max: Math.round(weight * 1.2) };

    let carbTarget = Math.round((carbMacro.min + carbMacro.max) / 2);
    let proteinTarget = Math.round((proteinMacro.min + proteinMacro.max) / 2);

    const allProducts = [...carbSources, ...proteinSources];
    
    // Считаем макросы из ручных добавок и вычитаем их из целей
    let overrideProtein = 0;
    let overrideCarbs = 0;
    if (overrides) {
        Object.values(overrides).forEach(items => {
            items.forEach(item => {
                const p = allProducts.find(prod => prod.value === item.productValue);
                if (p) {
                    if (p.proteinPer100g) overrideProtein += (p.proteinPer100g * item.amount) / 100;
                    if (p.carbsPer100g) overrideCarbs += (p.carbsPer100g * item.amount) / 100;
                }
            });
        });
    }

    carbTarget = Math.max(0, carbTarget - overrideCarbs);
    proteinTarget = Math.max(0, proteinTarget - overrideProtein);
    
    const baseSeed = seedModifier ? `${date}-${seedModifier}` : date;
    const carbSource = safePickRotation(carbSources, DEFAULT_CARB_SOURCES, baseSeed);
    const carbPortionG = carbPortion(carbTarget, carbSource);


    const { animal, plant } = splitByProteinType(proteinSources, training);

    // Абсолютный fallback — хоть что-то из всех источников
    const anyProtein = proteinSources.length ? proteinSources : DEFAULT_PROTEIN_SOURCES;

    // Минимальная плотность белка для основного источника
    // Кефир (3г/100г), грибы (3.5г/100г) дают огромные порции — не используем как основной
    function isViablePrimary(s: ProductRef): boolean {
        if (s.portionUnit === 'pcs') return true;
        if (s.proteinPerPortion !== undefined) return true;
        if (['peanuts', 'almonds', 'sunflower_seeds', 'pumpkin_seeds'].includes(s.value)) return false;
        return (s.proteinPer100g ?? 0) >= 8;
    }

    // Из пула берём viable, иначе viable из fallback, иначе global fallback
    function bestPool(primary: ProductRef[], fallback: ProductRef[], globalFallback: ProductRef[]): ProductRef[] {
        const viable = primary.filter(isViablePrimary);
        if (viable.length) return viable;
        const vf = fallback.filter(isViablePrimary);
        if (vf.length) return vf;
        return globalFallback;
    }

    // Функция для выбора с исключением уже выбранных продуктов (чтобы не было трески 2 раза в день)
    function pickRotationExcluding(pool: ProductRef[], exclude: ProductRef[], seed: string): ProductRef {
        const available = pool.filter((p) => !exclude.includes(p));
        const finalPool = available.length > 0 ? available : pool;
        return safePickRotation(finalPool, anyProtein, seed);
    }

    function isCheese(source: ProductRef): boolean {
        return ['cheese', 'brynza', 'adygei_cheese'].includes(source.value);
    }

    const globalViableAnimal = DEFAULT_PROTEIN_SOURCES.filter(s => s.proteinType === 'animal' && isViablePrimary(s));

    // Тренировочный Приём 1 (Белок + Углеводы) — ТОЛЬКО постные (fat < 5г/100г)
    // Если пользователь веган, у него нет animal. Разрешаем использовать растительные.
    const hasAnimal = animal.length > 0;
    const basePool1 = hasAnimal ? animal : plant;
    const leanPool = basePool1.filter((s) => (s.fatPer100g ?? 0) < 5);
    const pool1 = bestPool(leanPool, basePool1, globalViableAnimal.filter(s => (s.fatPer100g ?? 0) < 5));
    const animalSource1 = pickRotationExcluding(pool1, [], baseSeed);

    // Жировые приёмы — предпочитаем жирные белки (бёдра, говядина, яйца, творог 9%)
    const basePool2 = hasAnimal ? animal : plant;
    const fattyPool = basePool2.filter((s) => (s.fatPer100g ?? 0) >= 5);
    const pool2 = bestPool(fattyPool, basePool2, globalViableAnimal.filter(s => (s.fatPer100g ?? 0) >= 5));
    
    const excludeForAnimal2 = [animalSource1];
    if (isCheese(animalSource1)) excludeForAnimal2.push(...proteinSources.filter(isCheese));
    const animalSource2 = pickRotationExcluding(pool2, excludeForAnimal2, baseSeed + '2');

    // Если тренировочный день, перекус - это 1 порция сывороточного протеина (~25г белка).
    // Остаток белка делим на Приём 1 и Приём 2.
    // Если выходной день, весь белок делим на Приём 1 и Приём 2.
    const remainingProteinTarget = training ? Math.max(0, proteinTarget - 25) : proteinTarget;
    const animalPortion1 = proteinPortion(remainingProteinTarget * 0.55, animalSource1);
    const animalPortion2 = proteinPortion(remainingProteinTarget * 0.45, animalSource2);

    function formatProtein(source: ProductRef, portion: number): string {
        const rounded = Math.round(portion);
        if (source.portionUnit === 'pcs') return `${source.label} ${rounded} шт.`;
        if (source.proteinPerPortion !== undefined) {
            // Для протеина: 1 порция, 2 порции
            const suffix = rounded === 1 ? 'порция' : (rounded >= 2 && rounded <= 4 ? 'порции' : 'порций');
            return `${source.label} ${rounded} ${suffix}`;
        }
        return `${source.label} ${rounded} г`;
    }

    const meals: Meal[] = training
        ? [
            {
                name: 'Приём 1',
                time: 'После тренировки (~11:30)',
                template: 'Белок + Углеводы',
                items: [
                    formatProtein(animalSource1, animalPortion1),
                    `${carbSource.label} ${carbPortionG} г ` + (carbSource.value === 'potato' ? '(сырой вес/очищенный)' : '(сухой вес)'),
                    'Овощной салат без масла',
                    'Опционально: 1–2 фрукта, горсть ягод, зефир, мармелад или мёд после основной порции',
                ],
                dishIdea: generateDishIdea(carbSource, [animalSource1], 'carb', baseSeed),
                notes: 'Никаких жиров: ни масла, ни сыра, ни жирных соусов.',
            },
            {
                name: 'Перекус',
                time: '~13:30',
                template: 'Белок',
                items: [
                    'Сывороточный протеин 1 порция',
                    '(на воде, или изолят)',
                ],
                dishIdea: 'Протеиновый шейк на воде',
            },
            {
                name: 'Приём 2',
                time: '~17:00',
                template: 'Белок + Жиры',
                items: [
                    formatProtein(animalSource2, animalPortion2),
                    ...(!isCheese(animalSource2) ? ['Сыр 50 г'] : []),
                    'Овощной салат с 1 ст.л. оливкового масла',
                    'Орехи или семечки 30 г',
                ],
                dishIdea: generateDishIdea(null, [animalSource2], 'fat', baseSeed),
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
                    'Овощной салат с оливковым маслом',
                ],
                dishIdea: generateDishIdea(null, [animalSource1], 'fat', baseSeed),
                notes: 'Углеводы только из овощей/зелени/орехов, до 50–80 г в день.',
            },
            {
                name: 'Приём 2',
                time: '14:00–17:00',
                template: 'Белок + Жиры',
                items: [
                    formatProtein(animalSource2, animalPortion2),
                    ...(!isCheese(animalSource2) ? ['Сыр 50 г'] : []),
                    'Большой овощной салат с оливковым маслом',
                    'Орехи или семечки 30 г',
                ],
                dishIdea: generateDishIdea(null, [animalSource2], 'fat', baseSeed),
            },
        ];

    if (overrides) {
        meals.forEach((meal, i) => {
            const added = overrides[i];
            if (added && added.length) {
                meal.overrides = added;
                const addedText = added.map(item => {
                    const p = allProducts.find(prod => prod.value === item.productValue);
                    if (!p) return '';
                    return formatProtein(p, item.amount);
                }).filter(Boolean);
                // Вставляем добавленные продукты в начало списка
                meal.items.unshift(...addedText);
            }
        });
    }

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
    weeks = 6,
    seedModifiers: Record<string, number> = {},
    mealOverrides: Record<string, Record<number, MealOverrideItem[]>> = {}
): { date: string; plan: DayPlan }[] {
    const start = parseLocalDate(startDate);
    const days: { date: string; plan: DayPlan }[] = [];

    for (let i = 0; i < weeks * 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const iso = formatISOLocal(date);
        const plan = buildDayPlan(iso, weight, carbSources, proteinSources, trainingDates, seedModifiers[iso] || 0, mealOverrides[iso]);
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
