import { useEffect, useMemo, useRef, useState } from 'react';
import { type DietData, type ProductRef, type PlanSchema } from '../lib/api.js';
import {
    DEFAULT_PLAN,
    resolvePlan,
    generateWeekPlan,
    parsePlanJson,
    type DayPlan,
    type WeeklyBasket,
    buildWeeklyBaskets,
    calcProtein,
    calcCarbs,
} from '../lib/diet.js';
import { useAutoSave } from '../hooks/useAutoSave.js';

interface PlanEditorProps {
    initial: DietData | null;
}

function animalProteinPercent(macros: { animalProtein: number; plantProtein: number }) {
    const total = macros.animalProtein + macros.plantProtein;
    if (!total) return 0;
    return Math.round((macros.animalProtein / total) * 100);
}

function formatDate(iso: string) {
    const [year, month, day] = iso.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });
}

function filterSources(selected: string[] | undefined, available: ProductRef[], fallback: string[]): string[] {
    if (!selected?.length) return fallback;
    const valid = selected.filter((v) => available.some((p) => p.value === v));
    return valid.length ? valid : fallback;
}

function downloadJson(data: DietData, filename = 'sportpit-plan.json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function usePlan(initial: DietData | null) {
    const [plan, setPlan] = useState<PlanSchema>(() => resolvePlan(initial?.plan));
    const [weight, setWeight] = useState<number>(initial?.weight ?? plan.initial.weight);
    const [weightInput, setWeightInput] = useState<string>(String(initial?.weight ?? plan.initial.weight));
    const [startDate, setStartDate] = useState<string>(initial?.startDate ?? plan.initial.startDate);
    const [carbSources, setCarbSources] = useState<string[]>(initial?.carbSources ?? plan.initial.carbSources);
    const [proteinSources, setProteinSources] = useState<string[]>(initial?.proteinSources ?? plan.initial.proteinSources);
    const [trainingDates, setTrainingDates] = useState<string[]>(initial?.trainingDates ?? plan.initial.trainingDates);
    const [gender, setGender] = useState<'male' | 'female'>(initial?.gender ?? plan.initial.gender ?? 'male');
    const [seedModifiers, setSeedModifiers] = useState<Record<string, number>>(initial?.seedModifiers ?? {});
    const [mealOverrides, setMealOverrides] = useState<Record<string, Record<number, Array<{ productValue: string, amount: number }>>>>(initial?.mealOverrides ?? {});
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (initial) {
            const resolved = resolvePlan(initial.plan);
            setPlan(resolved);
            const newWeight = initial.weight ?? resolved.initial.weight;
            setWeight(newWeight);
            setWeightInput(String(newWeight));
            setStartDate(initial.startDate ?? resolved.initial.startDate);
            setCarbSources(filterSources(initial.carbSources, resolved.products.carbs, resolved.initial.carbSources));
            setProteinSources(filterSources(initial.proteinSources, resolved.products.protein, resolved.initial.proteinSources));
            setTrainingDates(initial.trainingDates ?? resolved.initial.trainingDates);
            setGender(initial.gender ?? resolved.initial.gender ?? 'male');
            setSeedModifiers(initial.seedModifiers ?? {});
            setMealOverrides(initial.mealOverrides ?? {});
        }
    }, [initial]);

    const carbProducts = useMemo(
        () => carbSources.map((v) => plan.products.carbs.find((p) => p.value === v)).filter(Boolean) as ProductRef[],
        [carbSources, plan.products.carbs]
    );

    const proteinProducts = useMemo(
        () => proteinSources.map((v) => plan.products.protein.find((p) => p.value === v)).filter(Boolean) as ProductRef[],
        [proteinSources, plan.products.protein]
    );

    const weekPlan = useMemo(() => {
        return generateWeekPlan(startDate, weight, carbProducts, proteinProducts, trainingDates, 6, seedModifiers, mealOverrides);
    }, [startDate, weight, carbProducts, proteinProducts, trainingDates, seedModifiers, mealOverrides]);

    const currentMacros = useMemo(() => {
        const protein = calcProtein(weight);
        const carbsTraining = calcCarbs(weight);
        const carbsRest = { min: Math.round(weight * 0.8), max: Math.round(weight * 1.2) };
        return { protein, carbsTraining, carbsRest };
    }, [weight]);

    const data: DietData | null = useMemo(
        () => ({
            weight,
            trainingDates,
            carbSources,
            proteinSources,
            startDate,
            plan,
            gender,
            seedModifiers,
            mealOverrides,
        }),
        [weight, trainingDates, carbSources, proteinSources, startDate, plan, gender, seedModifiers, mealOverrides]
    );

    const refreshDay = (date: string) => {
        setSeedModifiers(prev => ({ ...prev, [date]: (prev[date] || 0) + 1 }));
    };

    const toggleProduct = (value: string, list: string[], setList: (v: string[]) => void) => {
        setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    };

    const handleAddCustomProduct = (type: 'carbs' | 'protein', product: ProductRef) => {
        setPlan(prev => {
            const next = { ...prev };
            next.products = { ...next.products, [type]: [...next.products[type], product] };
            return next;
        });
        if (type === 'carbs') {
            setCarbSources(prev => [...prev, product.value]);
        } else {
            setProteinSources(prev => [...prev, product.value]);
        }
    };

    const handleRemoveCustomProduct = (type: 'carbs' | 'protein', value: string) => {
        setPlan(prev => {
            const next = { ...prev };
            next.products = { ...next.products, [type]: next.products[type].filter(p => p.value !== value) };
            return next;
        });
        if (type === 'carbs') {
            setCarbSources(prev => prev.filter(v => v !== value));
        } else {
            setProteinSources(prev => prev.filter(v => v !== value));
        }
    };

    const toggleTrainingDate = (date: string) => {
        setTrainingDates((prev) =>
            prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date].sort()
        );
    };

    const autoSelectCarbs = () => {
        const defaultSelection = ['buckwheat', 'rice', 'bulgur', 'pasta', 'potato', 'oats'];
        setCarbSources(defaultSelection.filter(v => plan.products.carbs.some(p => p.value === v)));
    };

    const autoSelectProtein = () => {
        const defaultSelection = ['chicken_breast', 'turkey', 'chicken_thigh', 'eggs', 'cottage_cheese_5', 'greek_yogurt_2', 'tofu', 'tempeh'];
        setProteinSources(defaultSelection.filter(v => plan.products.protein.some(p => p.value === v)));
    };

    const handleWeightChange = (val: string) => {
        setWeightInput(val);
        const num = Number(val);
        if (val !== '' && !isNaN(num) && num >= 30 && num <= 300) {
            setWeight(num);
        }
    };

    const handleFileUpload = async (file: File) => {
        setUploadError(null);
        try {
            const text = await file.text();
            const parsed = parsePlanJson(text);
            setPlan(parsed);
            setWeight(parsed.initial.weight);
            setWeightInput(String(parsed.initial.weight));
            setStartDate(parsed.initial.startDate);
            setCarbSources(parsed.initial.carbSources);
            setProteinSources(parsed.initial.proteinSources);
            setTrainingDates(parsed.initial.trainingDates);
            setGender(parsed.initial.gender ?? 'male');
        } catch (err: any) {
            setUploadError(err.message || 'Не удалось загрузить план');
        }
    };

    const handleGenderChange = (g: 'male' | 'female') => {
        setGender(g);
        import('../lib/diet.js').then(({ getSupplements }) => {
            setPlan(prev => ({ ...prev, supplements: getSupplements(g), initial: { ...prev.initial, gender: g } }));
        });
    };

    const handleAddOverrideItem = (date: string, mealIndex: number, productValue: string, amount: number) => {
        setMealOverrides(prev => {
            const dateOverrides = prev[date] || {};
            const mealItems = dateOverrides[mealIndex] || [];
            return {
                ...prev,
                [date]: {
                    ...dateOverrides,
                    [mealIndex]: [...mealItems, { productValue, amount }]
                }
            };
        });
    };

    const handleRemoveOverrideItem = (date: string, mealIndex: number, overrideIndex: number) => {
        setMealOverrides(prev => {
            const dateOverrides = prev[date] || {};
            const mealItems = dateOverrides[mealIndex] || [];
            const newMealItems = mealItems.filter((_, i) => i !== overrideIndex);
            return {
                ...prev,
                [date]: {
                    ...dateOverrides,
                    [mealIndex]: newMealItems
                }
            };
        });
    };

    return {
        plan,
        weight,
        weightInput,
        handleWeightChange,
        startDate,
        setStartDate,
        carbSources,
        setCarbSources,
        proteinSources,
        setProteinSources,
        trainingDates,
        toggleTrainingDate,
        gender,
        handleGenderChange,
        weekPlan,
        carbProducts,
        proteinProducts,
        data,
        uploadError,
        handleFileUpload,
        fileInputRef,
        toggleProduct,
        currentMacros,
        autoSelectCarbs,
        autoSelectProtein,
        refreshDay,
        handleAddCustomProduct,
        handleRemoveCustomProduct,
        mealOverrides,
        handleAddOverrideItem,
        handleRemoveOverrideItem,
    };
}

function MacroCard({ label, min, max, suffix }: { label: string; min: number; max: number; suffix?: string }) {
    return (
        <div className="bg-cream rounded-2xl p-4 border border-silver">
            <span className="text-sm text-steel">{label}</span>
            <div className="text-3xl font-extrabold text-cobalt">
                {min}–{max}<span className="text-lg">г</span>
                {suffix ? <span className="text-sm font-normal text-steel ml-1">{suffix}</span> : null}
            </div>
        </div>
    );
}

function MultiSelect({
    label,
    options,
    selected,
    onToggle,
    onAutoSelect,
    onRemoveCustom,
}: {
    label: string;
    options: ProductRef[];
    selected: string[];
    onToggle: (value: string) => void;
    onAutoSelect?: () => void;
    onRemoveCustom?: (value: string) => void;
}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-ink">{label}</label>
                {onAutoSelect && (
                    <button
                        type="button"
                        onClick={onAutoSelect}
                        className="text-xs px-3 py-1 rounded-full bg-lime text-ink font-medium hover:bg-lime/80 transition"
                    >
                        Выбрать автоматически
                    </button>
                )}
            </div>
            <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-3 border border-silver rounded-2xl bg-cream">
                {options.map((opt) => {
                    const active = selected.includes(opt.value);
                    return (
                        <div key={opt.value} className={`flex items-center rounded-full border transition font-medium ${active ? 'bg-cobalt text-white border-cobalt shadow-md shadow-cobalt/20' : 'bg-white text-ink border-silver hover:border-cobalt hover:text-cobalt'}`}>
                            <button
                                type="button"
                                onClick={() => onToggle(opt.value)}
                                className="px-3.5 py-1.5 text-sm outline-none"
                            >
                                {opt.label}
                            </button>
                            {opt.custom && onRemoveCustom && (
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); onRemoveCustom(opt.value); }}
                                    className="px-2 py-1.5 text-coral hover:text-coral-dark outline-none"
                                    title="Удалить свой продукт"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Calendar({
    startDate,
    trainingDates,
    onToggle,
    weeks = 6,
}: {
    startDate: string;
    trainingDates: string[];
    onToggle: (date: string) => void;
    weeks?: number;
}) {
    const weeksData = useMemo(() => {
        const [year, month, day] = startDate.split('-').map(Number);
        const start = new Date(year, month - 1, day);
        const result: { date: string; day: number; month: string; weekday: string }[][] = [];
        for (let w = 0; w < weeks; w++) {
            const week: { date: string; day: number; month: string; weekday: string }[] = [];
            for (let d = 0; d < 7; d++) {
                const idx = w * 7 + d;
                const current = new Date(start);
                current.setDate(start.getDate() + idx);
                const iso = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
                week.push({
                    date: iso,
                    day: current.getDate(),
                    month: current.toLocaleDateString('ru-RU', { month: 'short' }),
                    weekday: current.toLocaleDateString('ru-RU', { weekday: 'short' }),
                });
            }
            result.push(week);
        }
        return result;
    }, [startDate, weeks]);

    return (
        <div className="space-y-4">
            {weeksData.map((week, wIdx) => (
                <div key={wIdx}>
                    <div className="text-xs font-bold text-steel mb-2">Неделя {wIdx + 1}</div>
                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                        {week.map(({ date, day, month, weekday }) => {
                            const active = trainingDates.includes(date);
                            return (
                                <button
                                    key={date}
                                    type="button"
                                    onClick={() => onToggle(date)}
                                    className={`flex flex-col items-center justify-center p-1 sm:p-2 rounded-xl border text-xs transition min-h-[52px] ${
                                        active
                                            ? 'bg-cobalt text-white border-cobalt shadow-lg shadow-cobalt/25'
                                            : 'bg-white text-ink border-silver hover:border-cobalt'
                                    }`}
                                >
                                    <span className="font-bold">{day}</span>
                                    <span className={`text-[10px] ${active ? 'text-blue-100' : 'text-steel'}`}>{month}</span>
                                    <span className={`text-[9px] uppercase ${active ? 'text-blue-100' : 'text-steel'}`}>{weekday}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

function MacroBadge({ macros, compact }: { macros: { protein: number; fat: number; carbs: number; calories: number }; compact?: boolean }) {
    return (
        <div className={`flex flex-wrap gap-2 ${compact ? '' : 'mt-3'}`}>
            <span className="text-xs px-2 py-1 rounded-lg bg-white border border-silver text-ink font-medium">
                {macros.calories} ккал
            </span>
            <span className="text-xs px-2 py-1 rounded-lg bg-cobalt/10 border border-cobalt/20 text-cobalt font-medium">
                Б {macros.protein}
            </span>
            <span className="text-xs px-2 py-1 rounded-lg bg-lime/20 border border-lime/30 text-lime-700 font-medium">
                Ж {macros.fat}
            </span>
            <span className="text-xs px-2 py-1 rounded-lg bg-coral/10 border border-coral/20 text-coral font-medium">
                У {macros.carbs}
            </span>
        </div>
    );
}

function WeekBasketCard({ basket, onPrev, onNext, hasPrev, hasNext }: {
    basket: WeeklyBasket;
    onPrev: () => void;
    onNext: () => void;
    hasPrev: boolean;
    hasNext: boolean;
}) {
    const entries = Object.entries(basket.basket);
    return (
        <div className="bg-cream rounded-2xl border border-silver p-5">
            <div className="flex items-center justify-between mb-4">
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className={`p-2 rounded-xl border transition ${hasPrev ? 'bg-white border-silver hover:border-cobalt text-ink' : 'bg-silver/30 border-silver text-steel cursor-not-allowed'}`}
                    aria-label="Предыдущая неделя"
                >
                    ←
                </button>
                <div className="text-center">
                    <div className="text-sm font-bold text-ink">Неделя {basket.weekIndex}</div>
                    <div className="text-xs text-steel">{formatDate(basket.startDate)} — {formatDate(basket.endDate)}</div>
                </div>
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!hasNext}
                    className={`p-2 rounded-xl border transition ${hasNext ? 'bg-white border-silver hover:border-cobalt text-ink' : 'bg-silver/30 border-silver text-steel cursor-not-allowed'}`}
                    aria-label="Следующая неделя"
                >
                    →
                </button>
            </div>
            {entries.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-ink">
                    {entries.map(([name, amount]) => (
                        <li key={name} className="flex justify-between items-center bg-white rounded-xl px-3 py-2 border border-silver">
                            <span className="font-medium">{name}</span>
                            <span className="text-steel">{amount}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-steel text-center py-4">Нет данных для корзины</p>
            )}
        </div>
    );
}

function WeekBasketCarousel({ baskets }: { baskets: WeeklyBasket[] }) {
    const [index, setIndex] = useState(0);

    if (!baskets.length) {
        return <p className="text-sm text-steel">Нет данных для корзины</p>;
    }

    const current = baskets[Math.min(index, baskets.length - 1)];

    return (
        <WeekBasketCard
            basket={current}
            onPrev={() => setIndex((i) => Math.max(0, i - 1))}
            onNext={() => setIndex((i) => Math.min(baskets.length - 1, i + 1))}
            hasPrev={index > 0}
            hasNext={index < baskets.length - 1}
        />
    );
}

function AddOverrideForm({
    allProducts,
    onAdd,
    onCancel
}: {
    allProducts: ProductRef[];
    onAdd: (productValue: string, amount: number) => void;
    onCancel: () => void;
}) {
    const [selected, setSelected] = useState(allProducts[0]?.value || '');
    const [amount, setAmount] = useState('50');

    return (
        <div className="mt-3 bg-white p-3 rounded-xl border border-silver shadow-sm">
            <div className="text-xs font-bold text-steel mb-2">Добавить ингредиент</div>
            <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full bg-cream border border-silver rounded-lg px-2 py-1.5 text-sm text-ink outline-none focus:border-cobalt mb-2"
            >
                {allProducts.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                ))}
            </select>
            <div className="flex items-center gap-2 mb-3">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-20 bg-cream border border-silver rounded-lg px-2 py-1.5 text-sm text-ink outline-none focus:border-cobalt"
                    min="1"
                    step="1"
                />
                <span className="text-sm text-steel">грамм (шт. / порций)</span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => {
                        const num = Number(amount);
                        if (selected && num > 0) {
                            onAdd(selected, num);
                        }
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-cobalt text-white hover:bg-cobalt-dark font-semibold transition"
                >
                    Добавить
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-xs px-3 py-1.5 rounded-lg bg-silver/30 text-steel hover:bg-silver/50 transition font-medium"
                >
                    Отмена
                </button>
            </div>
        </div>
    );
}

function DayCard({
    date,
    plan,
    allProducts,
    active,
    onToggle,
    onRefresh,
    onAddOverride,
    onRemoveOverride,
}: {
    date: string;
    plan: DayPlan;
    allProducts: ProductRef[];
    active: boolean;
    onToggle: () => void;
    onRefresh: () => void;
    onAddOverride: (mealIndex: number, productValue: string, amount: number) => void;
    onRemoveOverride: (mealIndex: number, overrideIndex: number) => void;
}) {
    const [addingToMeal, setAddingToMeal] = useState<number | null>(null);

    return (
        <div className="bg-white rounded-3xl shadow-lg shadow-cobalt/5 border border-silver p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                    <div className="font-bold text-lg text-ink">{formatDate(date)}</div>
                    <div className="text-sm text-steel">
                        Итого: {plan.macros.calories} ккал · Б {plan.macros.protein} · Ж {plan.macros.fat} · У {plan.macros.carbs}
                    </div>
                    <div className="text-xs text-steel mt-1">
                        Белок: {plan.macros.animalProtein}г живот. ({animalProteinPercent(plan.macros)}%) · {plan.macros.plantProtein}г раст.
                    </div>
                </div>
                <div className="flex items-center gap-2 self-start">
                    <button
                        type="button"
                        onClick={onRefresh}
                        className="text-sm px-3 py-1.5 rounded-full border border-silver bg-white text-ink hover:border-cobalt hover:text-cobalt font-semibold transition flex items-center gap-1.5"
                        title="Сгенерировать другие блюда на этот день"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Обновить
                    </button>
                    <button
                        type="button"
                        onClick={onToggle}
                        className={`text-sm px-4 py-1.5 rounded-full border font-semibold transition ${
                            active
                                ? 'bg-lime text-lime-900 border-lime hover:bg-lime/90'
                                : 'bg-cobalt text-white border-cobalt hover:bg-cobalt-dark'
                        }`}
                    >
                        {active ? 'Тренировка' : 'Отдых'}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.meals.map((meal, mealIndex) => {
                    // Рассчитываем, какие из элементов списка являются ручными добавками (они всегда в начале массива items)
                    const overridesCount = meal.overrides?.length || 0;
                    
                    return (
                        <div key={meal.name} className="bg-cream rounded-2xl border border-silver p-4 flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold uppercase tracking-wide text-steel">{meal.name}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-white text-ink border border-silver">{meal.time}</span>
                            </div>
                            <div className="text-sm font-bold text-cobalt mb-2">{meal.template}</div>
                            <ul className="text-sm text-ink space-y-1 list-disc list-inside flex-1">
                                {meal.items.map((item, i) => {
                                    const isOverride = i < overridesCount;
                                    return (
                                        <li key={i} className={isOverride ? 'text-coral font-medium flex justify-between group' : ''}>
                                            <span className={isOverride ? 'flex-1' : ''}>{item}</span>
                                            {isOverride && (
                                                <button
                                                    onClick={() => onRemoveOverride(mealIndex, i)}
                                                    className="opacity-0 group-hover:opacity-100 text-steel hover:text-coral px-1 transition"
                                                    title="Удалить"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                            
                            <div className="mt-3">
                                {addingToMeal === mealIndex ? (
                                    <AddOverrideForm 
                                        allProducts={allProducts} 
                                        onAdd={(val, amount) => {
                                            onAddOverride(mealIndex, val, amount);
                                            setAddingToMeal(null);
                                        }}
                                        onCancel={() => setAddingToMeal(null)}
                                    />
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setAddingToMeal(mealIndex)}
                                        className="text-xs font-medium text-cobalt hover:text-cobalt-dark hover:underline transition"
                                    >
                                        + Добавить ингредиент
                                    </button>
                                )}
                            </div>

                            {meal.macros && <div className="mt-3"><MacroBadge macros={meal.macros} /></div>}
                            {meal.notes && <p className="mt-3 text-xs text-steel bg-white/60 p-2 rounded-lg">{meal.notes}</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function PlanEditor({ initial }: PlanEditorProps) {
    const {
        plan,
        weightInput,
        handleWeightChange,
        startDate,
        setStartDate,
        carbSources,
        setCarbSources,
        proteinSources,
        setProteinSources,
        trainingDates,
        toggleTrainingDate,
        gender,
        handleGenderChange,
        weekPlan,
        carbProducts,
        proteinProducts,
        data,
        uploadError,
        handleFileUpload,
        fileInputRef,
        toggleProduct,
        currentMacros,
        autoSelectCarbs,
        autoSelectProtein,
        refreshDay,
        handleAddCustomProduct,
        handleRemoveCustomProduct,
        handleAddOverrideItem,
        handleRemoveOverrideItem,
    } = usePlan(initial);

    const weeklyBaskets = useMemo(
        () => buildWeeklyBaskets(carbProducts, proteinProducts, weekPlan),
        [carbProducts, proteinProducts, weekPlan]
    );

    const { saving, error, lastSaved } = useAutoSave(data);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl shadow-xl shadow-cobalt/5 border border-silver p-6 sm:p-8 mb-8">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-bold tracking-wide uppercase mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                            Активный план
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">{plan.title}</h2>
                        {plan.subtitle && <p className="text-steel text-sm mt-1">{plan.subtitle}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            accept="application/json,.json"
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => downloadJson(data)}
                            className="text-sm px-4 py-2.5 rounded-xl border border-silver text-ink hover:border-cobalt hover:text-cobalt transition font-semibold"
                        >
                            Скачать JSON
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFileUpload(new File([JSON.stringify(DEFAULT_PLAN, null, 2)], 'plan.json', { type: 'application/json' }))}
                            className="text-sm px-4 py-2.5 rounded-xl border border-silver text-ink hover:border-cobalt hover:text-cobalt transition font-semibold"
                        >
                            Сбросить
                        </button>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-sm px-4 py-2.5 rounded-xl bg-cobalt text-white hover:bg-cobalt-dark transition font-semibold shadow-lg shadow-cobalt/25"
                        >
                            Загрузить JSON
                        </button>
                    </div>
                </div>

                {uploadError && (
                    <div className="mb-6 p-4 bg-coral/10 text-coral rounded-2xl text-sm font-medium">{uploadError}</div>
                )}

                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-base font-bold text-ink">Параметры плана</h3>
                    <div className="text-sm text-steel">
                        {saving && 'Сохранение...'}
                        {error && <span className="text-coral">{error}</span>}
                        {lastSaved && !saving && !error && `Сохранено ${lastSaved.toLocaleTimeString('ru-RU')}`}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Вес, кг</label>
                        <input
                            type="number"
                            min={30}
                            max={300}
                            value={weightInput}
                            onChange={(e) => handleWeightChange(e.target.value)}
                            className="w-full px-4 py-3 bg-cream border border-silver rounded-xl focus:outline-none focus:ring-2 focus:ring-cobalt text-ink"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Начало плана</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-3 bg-cream border border-silver rounded-xl focus:outline-none focus:ring-2 focus:ring-cobalt text-ink"
                        />
                        <p className="text-xs text-steel mt-1.5">Расписание начинается с этой даты</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Пол</label>
                        <div className="flex bg-cream p-1 rounded-xl border border-silver">
                            <button
                                type="button"
                                onClick={() => handleGenderChange('male')}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${gender === 'male' ? 'bg-white shadow-sm border border-silver/50 text-ink' : 'text-steel hover:text-ink'}`}
                            >
                                Мужской
                            </button>
                            <button
                                type="button"
                                onClick={() => handleGenderChange('female')}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${gender === 'female' ? 'bg-white shadow-sm border border-silver/50 text-ink' : 'text-steel hover:text-ink'}`}
                            >
                                Женский
                            </button>
                        </div>
                        <p className="text-xs text-steel mt-1.5">Влияет на БАДы и расчеты</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <MultiSelect
                        label="Источники углеводов"
                        options={plan.products.carbs}
                        selected={carbSources}
                        onToggle={(value) => toggleProduct(value, carbSources, setCarbSources)}
                        onAutoSelect={autoSelectCarbs}
                        onRemoveCustom={(v) => handleRemoveCustomProduct('carbs', v)}
                    />
                    <MultiSelect
                        label="Источники белка"
                        options={plan.products.protein}
                        selected={proteinSources}
                        onToggle={(value) => toggleProduct(value, proteinSources, setProteinSources)}
                        onAutoSelect={autoSelectProtein}
                        onRemoveCustom={(v) => handleRemoveCustomProduct('protein', v)}
                    />
                </div>
                
                <AddCustomProductForm onAdd={handleAddCustomProduct} />
                <div className="mb-6"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <MacroCard label="Углеводы в трен. день" min={currentMacros.carbsTraining.min} max={currentMacros.carbsTraining.max} />
                    <MacroCard label="Белок в сутки" min={currentMacros.protein.min} max={currentMacros.protein.max} />
                    <MacroCard label="Углеводы в выходной" min={currentMacros.carbsRest.min} max={currentMacros.carbsRest.max} suffix="овощи" />
                    <div className="bg-cream rounded-2xl p-4 border border-silver">
                        <span className="text-sm text-steel">Жиры</span>
                        <div className="text-sm text-ink font-semibold mt-2 leading-snug">
                            {plan.macros.fatsTraining} в трен. день;<br />{plan.macros.fatsRest} в выходной
                        </div>
                    </div>
                </div>

                <div className="mb-2">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-bold text-ink">Дни тренировок</h3>
                        <span className="text-xs text-steel">Нажми на день, чтобы отметить тренировочным</span>
                    </div>
                    <Calendar startDate={startDate} trainingDates={trainingDates} onToggle={toggleTrainingDate} weeks={6} />
                    <p className="mt-3 text-sm text-steel">
                        Выбрано тренировок: <span className="font-bold text-cobalt">{trainingDates.length}</span>
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg shadow-cobalt/5 border border-silver p-6 sm:p-8 mb-8">
                <h3 className="text-xl font-bold text-ink mb-4">Правила протокола</h3>
                <ol className="list-decimal list-inside space-y-3 text-ink">
                    {plan.rules.map((rule, i) => (
                        <li key={i}>{rule}</li>
                    ))}
                </ol>
            </div>

            {plan.supplements.length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg shadow-cobalt/5 border border-silver p-6 sm:p-8 mb-8">
                    <h3 className="text-xl font-bold text-ink mb-4">Добавки</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="text-left text-steel border-b border-silver">
                                <tr>
                                    <th className="pb-3 font-bold">Добавка</th>
                                    <th className="pb-3 font-bold">Дозировка</th>
                                    <th className="pb-3 font-bold">Когда</th>
                                    <th className="pb-3 font-bold">Зачем</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-silver">
                                {plan.supplements.map((sup) => (
                                    <tr key={sup.name}>
                                        <td className="py-3 font-semibold text-ink">{sup.name}</td>
                                        <td className="py-3 text-steel">{sup.dose}</td>
                                        <td className="py-3 text-steel">{sup.when}</td>
                                        <td className="py-3 text-steel">{sup.why}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-lg shadow-cobalt/5 border border-silver p-6 sm:p-8 mb-8">
                <h3 className="text-xl font-bold text-ink mb-4">Продуктовая корзина по неделям</h3>
                <WeekBasketCarousel baskets={weeklyBaskets} />
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-cobalt rounded-full" />
                    <h2 className="text-2xl font-extrabold text-ink">Расписание</h2>
                    {weekPlan[0] && (
                        <span className="ml-auto text-sm text-steel">
                            {formatDate(weekPlan[0].date)} — {formatDate(weekPlan[weekPlan.length - 1].date)}
                        </span>
                    )}
                </div>
                {weekPlan.map(({ date, plan: dayPlan }) => (
                    <DayCard
                        key={date}
                        date={date}
                        plan={dayPlan}
                        allProducts={[...plan.products.carbs, ...plan.products.protein]}
                        active={trainingDates.includes(date)}
                        onToggle={() => toggleTrainingDate(date)}
                        onRefresh={() => refreshDay(date)}
                        onAddOverride={(mealIndex, productValue, amount) => handleAddOverrideItem(date, mealIndex, productValue, amount)}
                        onRemoveOverride={(mealIndex, overrideIndex) => handleRemoveOverrideItem(date, mealIndex, overrideIndex)}
                    />
                ))}
            </div>
        </div>
    );
}

function AddCustomProductForm({ onAdd }: { onAdd: (type: 'carbs' | 'protein', product: ProductRef) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState<'carbs' | 'protein'>('protein');
    const [label, setLabel] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [proteinType, setProteinType] = useState<'animal' | 'plant'>('animal');

    if (!isOpen) {
        return (
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full py-3 mt-2 border-2 border-dashed border-silver text-steel rounded-xl font-medium hover:border-cobalt hover:text-cobalt transition"
            >
                + Добавить свой продукт
            </button>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!label.trim()) return;
        
        const product: ProductRef = {
            value: `custom_${Date.now()}`,
            label: label.trim(),
            defaultPortion: type === 'carbs' ? 50 : 100,
            custom: true,
        };

        if (protein) product.proteinPer100g = Number(protein.replace(',', '.'));
        if (fat) product.fatPer100g = Number(fat.replace(',', '.'));
        if (carbs) product.carbsPer100g = Number(carbs.replace(',', '.'));
        if (type === 'protein') product.proteinType = proteinType;

        onAdd(type, product);
        
        setIsOpen(false);
        setLabel('');
        setProtein('');
        setFat('');
        setCarbs('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border border-silver bg-cream rounded-2xl">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-ink">Новый продукт</h4>
                <button type="button" onClick={() => setIsOpen(false)} className="text-steel hover:text-coral text-sm">Отмена</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-steel mb-1">Тип продукта</label>
                    <select value={type} onChange={e => setType(e.target.value as 'carbs' | 'protein')} className="w-full px-3 py-2 bg-white border border-silver rounded-lg text-sm outline-none focus:border-cobalt">
                        <option value="protein">Источник белка</option>
                        <option value="carbs">Источник углеводов</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-steel mb-1">Название</label>
                    <input required value={label} onChange={e => setLabel(e.target.value)} placeholder="Например: Чечевица" className="w-full px-3 py-2 bg-white border border-silver rounded-lg text-sm outline-none focus:border-cobalt" />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-steel mb-1">Белки (на 100г)</label>
                    <input type="number" step="0.1" min="0" value={protein} onChange={e => setProtein(e.target.value)} placeholder="0" className="w-full px-3 py-2 bg-white border border-silver rounded-lg text-sm outline-none focus:border-cobalt" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-steel mb-1">Жиры (на 100г)</label>
                    <input type="number" step="0.1" min="0" value={fat} onChange={e => setFat(e.target.value)} placeholder="0" className="w-full px-3 py-2 bg-white border border-silver rounded-lg text-sm outline-none focus:border-cobalt" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-steel mb-1">Углеводы (на 100г)</label>
                    <input type="number" step="0.1" min="0" value={carbs} onChange={e => setCarbs(e.target.value)} placeholder="0" className="w-full px-3 py-2 bg-white border border-silver rounded-lg text-sm outline-none focus:border-cobalt" />
                </div>
            </div>

            {type === 'protein' && (
                <div className="mb-4">
                    <label className="block text-xs font-semibold text-steel mb-1">Тип белка</label>
                    <div className="flex gap-2">
                        <label className="flex items-center gap-2 text-sm text-ink"><input type="radio" name="ptype" value="animal" checked={proteinType === 'animal'} onChange={() => setProteinType('animal')} /> Животный</label>
                        <label className="flex items-center gap-2 text-sm text-ink"><input type="radio" name="ptype" value="plant" checked={proteinType === 'plant'} onChange={() => setProteinType('plant')} /> Растительный</label>
                    </div>
                </div>
            )}

            <button type="submit" className="w-full py-2.5 bg-cobalt text-white rounded-lg font-semibold shadow-md shadow-cobalt/20 hover:bg-cobalt-dark transition">
                Добавить в список
            </button>
        </form>
    );
}
