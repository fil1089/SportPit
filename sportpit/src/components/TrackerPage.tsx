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

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

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
                applicationServerKey: urlBase64ToUint8Array("BB7FLAcKEx3H9XDHRW1hg-TmQ459eNl9tJwPFWiVf4d1-LIVz6KYVguxzEUuFRyXZoVEuWdPK-18kre4yoWp_-4")
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
                        <div key={item.id} className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-start gap-4">
                            <button
                                onClick={() => toggleCheck(item.id)}
                                className={`w-7 h-7 shrink-0 rounded-xl flex items-center justify-center border-2 transition-all mt-0.5 ${checked ? 'bg-green-500 border-green-500 text-white shadow-md shadow-green-500/20' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                            >
                                {checked && (
                                    <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 7.5 6 10.5 11 3.5"></polyline>
                                    </svg>
                                )}
                            </button>
                            <div className="flex-1">
                                <div className="font-bold text-slate-800">{item.name}</div>
                                <div className="text-sm text-slate-500 font-medium mt-1">Дозировка: {item.dose}</div>
                                <div className="text-sm text-slate-400 mt-0.5">Время: {item.when}</div>
                                {item.duration && <div className="text-sm text-blue-600 font-semibold mt-1">Курс: {item.duration}</div>}
                            </div>
                            {isCustom && (
                                <button onClick={() => removeCustomMed(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-1" title="Удалить">
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
        <div className="max-w-5xl mx-auto px-4 py-10 relative">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cobalt/5 to-transparent -z-10 rounded-3xl blur-3xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-cobalt/10 text-cobalt rounded-full text-sm font-bold mb-4">
                        <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse"></span>
                        Трекер Здоровья
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight mb-3">Витамины и БАДы</h1>
                    <p className="text-slate-500 text-lg max-w-xl">Отмечайте ежедневный прием по протоколу доктора Егорова. Ваш прогресс сохраняется в облаке.</p>
                </div>
                <button 
                    onClick={subscribeToPush}
                    className="group flex items-center gap-3 bg-gradient-to-br from-cobalt to-blue-600 text-white px-6 py-4 rounded-2xl font-bold shadow-[0_8px_25px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(37,99,235,0.5)] hover:-translate-y-1 transition-all duration-300"
                >
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 group-hover:rotate-12 transition-transform" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    Включить уведомления
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 shadow-sm text-sm">1</span>
                            Базовый фундамент
                        </h2>
                        {renderList(BASE_SUPPLEMENTS)}
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800">
                                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 shadow-sm text-sm">2</span>
                                Метаболический коктейль
                            </h2>
                            {!metabolicStartDate ? (
                                <button onClick={startMetabolic} className="text-sm font-bold text-cobalt bg-cobalt/10 px-4 py-2 rounded-xl hover:bg-cobalt/20 transition-colors">
                                    Начать курс
                                </button>
                            ) : (
                                <span className="text-sm font-medium bg-mint/10 text-mint px-4 py-2 rounded-xl border border-mint/20 shadow-sm">
                                    День {calcDaysPassed(metabolicStartDate)} из 90
                                </span>
                            )}
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 p-5 rounded-2xl mb-6 text-sm text-amber-900 shadow-sm">
                            <strong className="block mb-1 text-amber-950 text-base">Курс обновления клеток и митохондрий.</strong> 
                            Строго не менее 3 месяцев непрерывного приема, затем перерыв 1-2 месяца.
                        </div>
                        {renderList(METABOLIC_COURSE)}
                    </section>
                </div>

                <div className="space-y-8">
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800">
                                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 text-rose-600 shadow-sm text-sm">3</span>
                                Железодефицит (для жен)
                            </h2>
                            {!ironStartDate ? (
                                <button onClick={startIron} className="text-sm font-bold text-rose-500 bg-rose-50 px-4 py-2 rounded-xl border border-rose-100 hover:bg-rose-100 transition-colors">
                                    Начать курс
                                </button>
                            ) : (
                                <span className="text-sm font-medium bg-rose-100 text-rose-600 px-4 py-2 rounded-xl shadow-sm border border-rose-200">
                                    День {calcDaysPassed(ironStartDate)}
                                </span>
                            )}
                        </div>
                        <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl mb-6 text-sm text-rose-900 shadow-sm">
                            Принимать строго отдельно от чая, кофе, молочки и магния. Оптимально — утром натощак с витамином С или через час после еды. <strong>Курс 2–4 месяца.</strong>
                        </div>
                        {renderList(WOMEN_COURSE)}
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 shadow-sm text-sm">4</span>
                            Ситуативные (в дни тренировок)
                        </h2>
                        {renderList(TRAINING_SITUATION)}
                    </section>

                    <section className="bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-800">
                            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-blue-600" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.5 20.5 4 14l5-5 6.5 6.5-5 5Z"></path>
                                <path d="M10.5 20.5 14 17l5-5-6.5-6.5-5 5Z"></path>
                                <path d="m14 7-3 3"></path>
                            </svg>
                            Персональные препараты
                        </h2>
                        <p className="text-sm text-slate-500 mb-6">Добавьте сюда личные лекарства. Они моментально синхронизируются на все устройства.</p>
                        
                        {customMeds.length > 0 && <div className="mb-6">{renderList(customMeds)}</div>}
                        
                        <div className="flex flex-col gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                            <input
                                type="text"
                                placeholder="Название (например, Кардиомагнил)"
                                value={newMed.name}
                                onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                                className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow shadow-sm"
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Дозировка"
                                    value={newMed.dose}
                                    onChange={(e) => setNewMed({...newMed, dose: e.target.value})}
                                    className="bg-white px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow shadow-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Время приема"
                                    value={newMed.when}
                                    onChange={(e) => setNewMed({...newMed, when: e.target.value})}
                                    className="bg-white px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow shadow-sm"
                                />
                            </div>
                            <button
                                onClick={addCustomMed}
                                disabled={!newMed.name}
                                className="mt-1 w-full bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all disabled:opacity-50 disabled:hover:translate-y-0 hover:-translate-y-0.5"
                            >
                                Добавить препарат
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            {/* Settings */}
            <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] shadow-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-cobalt" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    Настройки расписания уведомлений
                </h2>
                <div className="flex flex-col sm:flex-row gap-8 relative z-10">
                    <div className="flex-1 bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Утренние добавки</label>
                        <input 
                            type="time" 
                            className="w-full p-3 border border-white/20 rounded-xl bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-cobalt focus:border-transparent transition-shadow"
                            value={notifyTimes.morning}
                            onChange={(e) => {
                                const newTimes = {...notifyTimes, morning: e.target.value};
                                setNotifyTimes(newTimes);
                                updateServer({ notifyTimes: newTimes });
                            }}
                        />
                    </div>
                    <div className="flex-1 bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Вечерние добавки</label>
                        <input 
                            type="time" 
                            className="w-full p-3 border border-white/20 rounded-xl bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-cobalt focus:border-transparent transition-shadow"
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
