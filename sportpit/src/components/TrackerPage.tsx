import { useState, useEffect } from 'react';

const BASE_SUPPLEMENTS = [
    { id: 'magnesium', name: 'Магний', dose: '400 мг (муж) / 300 мг (жен)', when: 'Вечером перед сном', duration: 'Постоянно, без перерывов' },
    { id: 'd3k2', name: 'Витамин D3 + K2', dose: '5000 МЕ + 100 мкг', when: 'С жирным приемом пищи', duration: 'Постоянно с осени до весны' },
    { id: 'omega3', name: 'Омега-3', dose: '1000 мг (EPA+DHA)', when: 'С жирным приемом пищи', duration: 'Постоянно, круглый год' },
    { id: 'taurine', name: 'Таурин', dose: '500–1000 мг', when: 'Утром натощак или перед тренировкой', duration: 'Постоянно' },
];

const METABOLIC_COURSE = [
    { id: 'creatine', name: 'Креатин моногидрат', dose: '3–5 г', when: 'В обед с углеводами' },
    { id: 'inositol', name: 'Мио-инозитол (B8)', dose: '2000 мг', when: 'В первой половине дня' },
    { id: 'ala', name: 'Альфа-липоевая кислота', dose: '600 мг', when: 'С углеводным приемом пищи' },
    { id: 'q10', name: 'Коэнзим Q10', dose: '200 мг', when: 'Строго с жирами' },
    { id: 'zinc_sel', name: 'Цинк (10-15 мг) + Селен (150-200 мкг)', dose: '1 порция', when: 'Строго после еды' },
    { id: 'vit_c_b', name: 'Витамин С (500-1000 мг) + Комплекс В', dose: '1 порция', when: 'В любой прием пищи' },
    { id: 'beta', name: 'Бета-аланин', dose: '3–5 г', when: 'Утром или перед тренировкой' },
];

const WOMEN_COURSE = [
    { id: 'iron', name: 'Железо (хелат)', dose: 'По назначению', when: 'Утром натощак с витамином С', duration: 'От 2 до 4 месяцев (до нормализации ферритина)' },
];

const TRAINING_SITUATION = [
    { id: 'arginine', name: 'L-аргинин', dose: '1200 мг', when: 'За 30-40 мин до тренировки' },
    { id: 'carnitine', name: 'L-карнитин', dose: '900-1000 мг', when: 'Строго натощак за 30-40 мин до тренировки' },
];

import { api, type DietData } from '../lib/api.js';

function getTodayString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function TrackerPage() {
    const [metabolicStartDate, setMetabolicStartDate] = useState<string | null>(null);
    const [ironStartDate, setIronStartDate] = useState<string | null>(null);
    const [dailyChecks, setDailyChecks] = useState<Record<string, boolean>>({});
    const [customMeds, setCustomMeds] = useState<any[]>([]);
    const [newMed, setNewMed] = useState({ name: '', dose: '', when: '' });
    const [notifyTimes, setNotifyTimes] = useState<{morning: string, evening: string}>({morning: '09:00', evening: '21:00'});
    const [loading, setLoading] = useState(true);

    const today = getTodayString();

    useEffect(() => {
        api.getDiet().then(record => {
            const data = record?.data || {} as DietData;
            const ts = data.trackerState || {};
            setMetabolicStartDate(ts.metabolicStartDate || null);
            setIronStartDate(ts.ironStartDate || null);
            setDailyChecks(ts[`checks_${today}`] || {});
            setCustomMeds(ts.customMeds || []);
            setNotifyTimes(ts.notifyTimes || {morning: '09:00', evening: '21:00'});
            setLoading(false);
        }).catch(err => {
            console.error('Failed to load tracker state', err);
            setLoading(false);
        });
    }, [today]);

    const updateServer = async (updates: Record<string, any>) => {
        try {
            const record = await api.getDiet();
            const data = record?.data || {} as DietData;
            data.trackerState = { ...(data.trackerState || {}), ...updates };
            await api.saveDiet(data);
        } catch (err) {
            console.error('Failed to save tracker state', err);
        }
    };

    const saveChecks = (newChecks: Record<string, boolean>) => {
        setDailyChecks(newChecks);
        updateServer({ [`checks_${today}`]: newChecks });
    };

    const toggleCheck = (id: string) => {
        saveChecks({ ...dailyChecks, [id]: !dailyChecks[id] });
    };

    const startMetabolic = () => {
        setMetabolicStartDate(today);
        updateServer({ metabolicStartDate: today });
    };

    const startIron = () => {
        setIronStartDate(today);
        updateServer({ ironStartDate: today });
    };

    const addCustomMed = () => {
        if (!newMed.name) return;
        const med = { id: `custom_${Date.now()}`, name: newMed.name, dose: newMed.dose, when: newMed.when };
        const updated = [...customMeds, med];
        setCustomMeds(updated);
        updateServer({ customMeds: updated });
        setNewMed({ name: '', dose: '', when: '' });
    };

    const removeCustomMed = (id: string) => {
        const updated = customMeds.filter((m) => m.id !== id);
        setCustomMeds(updated);
        updateServer({ customMeds: updated });
    };

    const calcDaysPassed = (startDate: string) => {
        const start = new Date(startDate);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - start.getTime());
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    const subscribeToPush = async () => {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            alert('Push-уведомления не поддерживаются в этом браузере.');
            return;
        }

        try {
            const reg = await navigator.serviceWorker.ready;
            const sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
            });
            
            const token = localStorage.getItem('sportpit-auth-token');
            await fetch('/api/push/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ subscription: sub })
            });
            alert('Подписка успешно оформлена!');
        } catch (e: any) {
            console.error(e);
            alert('Ошибка подписки: ' + e.message);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-steel">Загрузка данных...</div>;
    }

    const renderList = (items: any[]) => {
        return (
            <div className="space-y-3">
                {items.map((item) => {
                    const checked = !!dailyChecks[item.id];
                    const isCustom = item.id.startsWith('custom_');
                    return (
                        <div key={item.id} className={`p-4 rounded-xl border transition-colors flex items-start gap-4 ${checked ? 'bg-mint/10 border-mint/30' : 'bg-surface border-border/50'}`}>
                            <button
                                onClick={() => toggleCheck(item.id)}
                                className={`w-6 h-6 shrink-0 rounded flex items-center justify-center border transition-colors mt-1 ${checked ? 'bg-mint border-mint text-surface' : 'bg-surface border-steel'}`}
                            >
                                {checked && (
                                    <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 7.5 6 10.5 11 3.5"></polyline>
                                    </svg>
                                )}
                            </button>
                            <div className="flex-1">
                                <div className="font-bold text-text-primary">{item.name}</div>
                                <div className="text-sm text-coral font-medium mt-1">Дозировка: {item.dose}</div>
                                <div className="text-sm text-text-secondary mt-0.5">Время: {item.when}</div>
                                {item.duration && <div className="text-sm text-mint mt-1">Курс: {item.duration}</div>}
                            </div>
                            {isCustom && (
                                <button onClick={() => removeCustomMed(item.id)} className="text-steel hover:text-coral transition-colors p-1" title="Удалить">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary mb-2">Трекер добавок</h1>
                    <p className="text-text-secondary">Система доктора Егорова. Отмечайте прием добавок каждый день.</p>
                </div>
                <button 
                    onClick={subscribeToPush}
                    className="flex items-center gap-2 bg-cobalt text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-cobalt/30 hover:scale-105 transition-transform text-sm"
                >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    Включить уведомления
                </button>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded bg-coral/20 text-coral flex items-center justify-center">1</span>
                    Базовый фундамент
                </h2>
                {renderList(BASE_SUPPLEMENTS)}
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded bg-coral/20 text-coral flex items-center justify-center">2</span>
                    Метаболический коктейль
                </h2>
                {!metabolicStartDate ? (
                    <div className="bg-surface p-6 rounded-xl border border-border/50 text-center">
                        <p className="mb-4 text-text-secondary">Курс обновления клеток и митохондрий. Строго не менее 3 месяцев непрерывного приема, затем перерыв 1-2 месяца.</p>
                        <button onClick={startMetabolic} className="btn-primary px-8 py-3 rounded-full font-bold shadow-lg shadow-coral/30 hover:scale-105 transition-transform">
                            Начать курс
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="bg-mint/10 p-4 rounded-xl border border-mint/20 mb-4 flex justify-between items-center">
                            <div>
                                <div className="text-mint font-bold text-sm uppercase tracking-wider mb-1">Курс активен</div>
                                <div className="text-text-primary font-medium">Дней пройдено: <span className="font-bold text-lg">{calcDaysPassed(metabolicStartDate)}</span> из 90</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-text-secondary">Начат: {metabolicStartDate}</div>
                            </div>
                        </div>
                        {renderList(METABOLIC_COURSE)}
                    </>
                )}
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded bg-coral/20 text-coral flex items-center justify-center">3</span>
                    Для женщин (Железо)
                </h2>
                {!ironStartDate ? (
                    <div className="bg-surface p-6 rounded-xl border border-border/50 text-center">
                        <button onClick={startIron} className="btn-primary px-8 py-3 rounded-full font-bold shadow-lg shadow-coral/30 hover:scale-105 transition-transform">
                            Начать курс железа
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="bg-mint/10 p-4 rounded-xl border border-mint/20 mb-4 flex justify-between items-center">
                            <div>
                                <div className="text-mint font-bold text-sm uppercase tracking-wider mb-1">Курс активен</div>
                                <div className="text-text-primary font-medium">Дней пройдено: <span className="font-bold text-lg">{calcDaysPassed(ironStartDate)}</span> (минимум 60)</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-text-secondary">Начат: {ironStartDate}</div>
                            </div>
                        </div>
                        {renderList(WOMEN_COURSE)}
                    </>
                )}
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded bg-coral/20 text-coral flex items-center justify-center">4</span>
                    Ситуативно (Только в дни тренировок)
                </h2>
                {renderList(TRAINING_SITUATION)}
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded bg-coral/20 text-coral flex items-center justify-center">5</span>
                    Лекарства (Персональные назначения)
                </h2>
                <div className="bg-surface p-4 rounded-xl border border-border/50 mb-4">
                    <p className="text-sm text-text-secondary mb-4">Добавьте сюда личные препараты (например, для жены), они сохранятся только на этом устройстве.</p>
                    {customMeds.length > 0 && renderList(customMeds)}
                    
                    <div className="mt-4 flex flex-col gap-2 p-3 bg-silver/20 rounded-lg">
                        <input
                            type="text"
                            placeholder="Название лекарства..."
                            value={newMed.name}
                            onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                            className="bg-white px-3 py-2 rounded-md border border-silver text-sm outline-none"
                        />
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Дозировка..."
                                value={newMed.dose}
                                onChange={(e) => setNewMed({...newMed, dose: e.target.value})}
                                className="bg-white px-3 py-2 rounded-md border border-silver text-sm outline-none flex-1"
                            />
                            <input
                                type="text"
                                placeholder="Время..."
                                value={newMed.when}
                                onChange={(e) => setNewMed({...newMed, when: e.target.value})}
                                className="bg-white px-3 py-2 rounded-md border border-silver text-sm outline-none flex-1"
                            />
                            <button
                                onClick={addCustomMed}
                                disabled={!newMed.name}
                                className="bg-cobalt text-white px-4 py-2 rounded-md font-bold text-sm disabled:opacity-50"
                            >
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings */}
            <div className="mt-12 p-6 bg-surface border border-border/50 rounded-2xl">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-cobalt" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    Настройки уведомлений
                </h2>
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-text-secondary mb-1">Утренние добавки</label>
                        <input 
                            type="time" 
                            className="w-full p-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:border-cobalt"
                            value={notifyTimes.morning}
                            onChange={(e) => {
                                const newTimes = {...notifyTimes, morning: e.target.value};
                                setNotifyTimes(newTimes);
                                updateServer({ notifyTimes: newTimes });
                            }}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-text-secondary mb-1">Вечерние добавки</label>
                        <input 
                            type="time" 
                            className="w-full p-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:border-cobalt"
                            value={notifyTimes.evening}
                            onChange={(e) => {
                                const newTimes = {...notifyTimes, evening: e.target.value};
                                setNotifyTimes(newTimes);
                                updateServer({ notifyTimes: newTimes });
                            }}
                        />
                    </div>
                </div>
                <p className="text-xs text-text-secondary mt-3">Уведомления присылаются с точностью до 15 минут. Включите их кнопкой наверху!</p>
            </div>
        </div>
    );
}

export default TrackerPage;
