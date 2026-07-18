import { useEffect, useMemo, useRef, useState } from 'react';
import { type DietData, type ProductRef, type PlanSchema } from '../lib/api.js';
import {
    DEFAULT_PLAN,
    resolvePlan,
    generateWeekPlan,
    parsePlanJson,
    type DayPlan,
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
    const d = new Date(iso + 'T00:00:00');
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
    const [startDate, setStartDate] = useState<string>(initial?.startDate ?? plan.initial.startDate);
    const [carbSources, setCarbSources] = useState<string[]>(initial?.carbSources ?? plan.initial.carbSources);
    const [proteinSources, setProteinSources] = useState<string[]>(initial?.proteinSources ?? plan.initial.proteinSources);
    const [trainingDates, setTrainingDates] = useState<string[]>(initial?.trainingDates ?? plan.initial.trainingDates);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (initial) {
            const resolved = resolvePlan(initial.plan);
            setPlan(resolved);
            setWeight(initial.weight ?? resolved.initial.weight);
            setStartDate(initial.startDate ?? resolved.initial.startDate);
            setCarbSources(filterSources(initial.carbSources, resolved.products.carbs, resolved.initial.carbSources));
            setProteinSources(filterSources(initial.proteinSources, resolved.products.protein, resolved.initial.proteinSources));
            setTrainingDates(initial.trainingDates ?? resolved.initial.trainingDates);
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
        return generateWeekPlan(startDate, weight, carbProducts, proteinProducts, trainingDates, plan.macros);
    }, [startDate, weight, carbProducts, proteinProducts, trainingDates, plan.macros]);

    const data: DietData | null = useMemo(
        () => ({
            weight,
            trainingDates,
            carbSources,
            proteinSources,
            startDate,
            plan,
        }),
        [weight, trainingDates, carbSources, proteinSources, startDate, plan]
    );

    const toggleProduct = (value: string, list: string[], setList: (v: string[]) => void) => {
        setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    };

    const toggleTrainingDate = (date: string) => {
        setTrainingDates((prev) =>
            prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date].sort()
        );
    };

    const handleFileUpload = async (file: File) => {
        setUploadError(null);
        try {
            const text = await file.text();
            const parsed = parsePlanJson(text);
            setPlan(parsed);
            setWeight(parsed.initial.weight);
            setStartDate(parsed.initial.startDate);
            setCarbSources(parsed.initial.carbSources);
            setProteinSources(parsed.initial.proteinSources);
            setTrainingDates(parsed.initial.trainingDates);
        } catch (err: any) {
            setUploadError(err.message || 'Не удалось загрузить план');
        }
    };

    return {
        plan,
        weight,
        setWeight,
        startDate,
        setStartDate,
        carbSources,
        setCarbSources,
        proteinSources,
        setProteinSources,
        trainingDates,
        toggleTrainingDate,
        weekPlan,
        data,
        uploadError,
        handleFileUpload,
        fileInputRef,
        toggleProduct,
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
}: {
    label: string;
    options: ProductRef[];
    selected: string[];
    onToggle: (value: string) => void;
}) {
    return (
        <div>
            <label className="block text-sm font-semibold text-ink mb-2">{label}</label>
            <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-3 border border-silver rounded-2xl bg-cream">
                {options.map((opt) => {
                    const active = selected.includes(opt.value);
                    return (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => onToggle(opt.value)}
                            className={`px-3.5 py-1.5 rounded-full text-sm border transition font-medium ${
                                active
                                    ? 'bg-cobalt text-white border-cobalt shadow-md shadow-cobalt/20'
                                    : 'bg-white text-ink border-silver hover:border-cobalt hover:text-cobalt'
                            }`}
                        >
                            {opt.label}
                        </button>
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
        const start = new Date(startDate + 'T00:00:00');
        const result: { date: string; day: number; month: string; weekday: string }[][] = [];
        for (let w = 0; w < weeks; w++) {
            const week: { date: string; day: number; month: string; weekday: string }[] = [];
            for (let d = 0; d < 7; d++) {
                const idx = w * 7 + d;
                const current = new Date(start);
                current.setDate(start.getDate() + idx);
                const iso = current.toISOString().split('T')[0];
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

function DayCard({
    date,
    plan,
    active,
    onToggle,
}: {
    date: string;
    plan: DayPlan;
    active: boolean;
    onToggle: () => void;
}) {
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
                <button
                    type="button"
                    onClick={onToggle}
                    className={`text-sm px-4 py-1.5 rounded-full border font-semibold transition self-start ${
                        active
                            ? 'bg-lime text-lime-900 border-lime hover:bg-lime/90'
                            : 'bg-cobalt text-white border-cobalt hover:bg-cobalt-dark'
                    }`}
                >
                    {active ? 'Тренировка' : 'Отдых'}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.meals.map((meal) => (
                    <div key={meal.name} className="bg-cream rounded-2xl border border-silver p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wide text-steel">{meal.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white text-ink border border-silver">{meal.time}</span>
                        </div>
                        <div className="text-sm font-bold text-cobalt mb-2">{meal.template}</div>
                        <ul className="text-sm text-ink space-y-1 list-disc list-inside">
                            {meal.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        {meal.macros && <MacroBadge macros={meal.macros} />}
                        {meal.notes && <p className="mt-3 text-xs text-steel bg-white/60 p-2 rounded-lg">{meal.notes}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PlanEditor({ initial }: PlanEditorProps) {
    const {
        plan,
        weight,
        setWeight,
        startDate,
        setStartDate,
        carbSources,
        setCarbSources,
        proteinSources,
        setProteinSources,
        trainingDates,
        toggleTrainingDate,
        weekPlan,
        data,
        uploadError,
        handleFileUpload,
        fileInputRef,
        toggleProduct,
    } = usePlan(initial);

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
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
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
                        <p className="text-xs text-steel mt-1.5">Расписание и календарь начинаются строго с этой даты</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <MultiSelect
                        label="Источники углеводов"
                        options={plan.products.carbs}
                        selected={carbSources}
                        onToggle={(value) => toggleProduct(value, carbSources, setCarbSources)}
                    />
                    <MultiSelect
                        label="Источники белка"
                        options={plan.products.protein}
                        selected={proteinSources}
                        onToggle={(value) => toggleProduct(value, proteinSources, setProteinSources)}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <MacroCard label="Углеводы в трен. день" min={plan.macros.carbsTraining.min} max={plan.macros.carbsTraining.max} />
                    <MacroCard label="Белок в сутки" min={plan.macros.protein.min} max={plan.macros.protein.max} />
                    <MacroCard label="Углеводы в выходной" min={plan.macros.carbsRest.min} max={plan.macros.carbsRest.max} suffix="овощи" />
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

            {Object.keys(plan.weekBasket).length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg shadow-cobalt/5 border border-silver p-6 sm:p-8 mb-8">
                    <h3 className="text-xl font-bold text-ink mb-4">Продуктовая корзина на неделю</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-ink">
                        {Object.entries(plan.weekBasket).map(([name, amount]) => (
                            <li key={name} className="flex justify-between items-center bg-cream rounded-xl px-4 py-3">
                                <span className="font-medium">{name}</span>
                                <span className="text-steel text-sm">{amount}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

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
                        active={trainingDates.includes(date)}
                        onToggle={() => toggleTrainingDate(date)}
                    />
                ))}
            </div>
        </div>
    );
}
