import { useEffect, useMemo, useState } from 'react';
import { type CarbSource, type DietData } from '../lib/api.js';
import { calcCarbs, calcProtein, CARB_SOURCES, generateWeekPlan } from '../lib/diet.js';
import { useAutoSave } from '../hooks/useAutoSave.js';

interface PlanEditorProps {
    initial: DietData | null;
}

function formatDate(iso: string) {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function PlanEditor({ initial }: PlanEditorProps) {
    const [weight, setWeight] = useState<number>(initial?.weight || 70);
    const [carbSource, setCarbSource] = useState<CarbSource>(initial?.carbSource || 'buckwheat');
    const [trainingDates, setTrainingDates] = useState<string[]>(initial?.trainingDates || []);
    const [startDate, setStartDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    const data: DietData | null = useMemo(() => ({
        weight,
        trainingDates,
        carbSource,
    }), [weight, trainingDates, carbSource]);

    const { saving, error, lastSaved } = useAutoSave(data);

    useEffect(() => {
        if (initial) {
            setWeight(initial.weight);
            setCarbSource(initial.carbSource);
            setTrainingDates(initial.trainingDates);
        }
    }, [initial]);

    const toggleTrainingDate = (date: string) => {
        setTrainingDates((prev) =>
            prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date].sort()
        );
    };

    const carbs = calcCarbs(weight);
    const protein = calcProtein(weight);
    const weekPlan = generateWeekPlan(startDate, weight, carbSource, trainingDates);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Параметры плана</h2>
                    <div className="text-sm text-gray-500">
                        {saving && 'Сохранение...'}
                        {error && <span className="text-red-600">{error}</span>}
                        {lastSaved && !saving && !error && `Сохранено ${lastSaved.toLocaleTimeString('ru-RU')}`}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Вес, кг</label>
                        <input
                            type="number"
                            min={30}
                            max={300}
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Источник углеводов</label>
                        <select
                            value={carbSource}
                            onChange={(e) => setCarbSource(e.target.value as CarbSource)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {CARB_SOURCES.map((s) => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Начало недели</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg mb-6">
                    <div>
                        <span className="text-sm text-gray-600">Углеводы в тренировочный день</span>
                        <div className="text-2xl font-bold text-primary">{carbs.min}–{carbs.max} г</div>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Белок в сутки</span>
                        <div className="text-2xl font-bold text-primary">{protein.min}–{protein.max} г</div>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium mb-3">Дни тренировок</h3>
                    <div className="flex flex-wrap gap-2">
                        {weekPlan.map(({ date }) => {
                            const active = trainingDates.includes(date);
                            return (
                                <button
                                    key={date}
                                    type="button"
                                    onClick={() => toggleTrainingDate(date)}
                                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${
                                        active
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                                    }`}
                                >
                                    {formatDate(date)}
                                </button>
                            );
                        })}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Нажми на день, чтобы отметить его тренировочным.</p>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-lg font-semibold">Расписание на неделю</h2>
                {weekPlan.map(({ date, plan }) => (
                    <div
                        key={date}
                        className={`bg-white rounded-xl shadow border p-5 ${
                            plan.type === 'training' ? 'border-l-4 border-l-primary' : 'border-l-4 border-l-green-500'
                        }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="font-semibold">{formatDate(date)}</div>
                                <div className="text-sm text-gray-500">
                                    {plan.type === 'training' ? 'Тренировочный день' : 'День отдыха'}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => toggleTrainingDate(date)}
                                className={`text-sm px-3 py-1 rounded-full border ${
                                    trainingDates.includes(date)
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-white text-gray-600 border-gray-300'
                                }`}
                            >
                                {trainingDates.includes(date) ? 'Тренировка' : 'Отдых'}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {plan.meals.map((meal) => (
                                <div key={meal.name} className="border border-gray-100 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{meal.name}</span>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{meal.time}</span>
                                    </div>
                                    <div className="text-sm font-medium text-primary mb-2">{meal.template}</div>
                                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                        {meal.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                    {meal.notes && <p className="mt-2 text-xs text-gray-500">{meal.notes}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
