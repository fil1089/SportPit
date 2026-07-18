export function SystemPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            {/* Hero */}
            <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/15 text-ink text-xs font-bold tracking-wide uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                    Протокол Егорова
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-ink leading-[0.95] mb-4">
                    О системе:<br />
                    <span className="text-cobalt">почему это работает</span>
                </h2>
                <p className="text-steel text-lg">
                    Биохимия, гормоны и хронобиология — три кита, на которых стоит протокол.
                    Никаких подсчётов калорий — только управление инсулином и субстратами.
                </p>
            </div>

            <div className="space-y-6">
                {/* 1. Митохондрии */}
                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-cobalt/5 border border-silver">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cobalt to-cobalt-dark text-white flex items-center justify-center text-2xl shrink-0">⚡</div>
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">Фундамент: митохондрии выбирают топливо</h3>
                            <p className="text-steel mb-3">
                                Митохондрии вырабатывают энергию из двух источников: глюкозы (углеводов) или жирных кислот (жиров).
                                В состоянии покоя — ходьба, сон, офисная работа — они эволюционно настроены на жиры.
                                Углеводы нужны только для взрывной анаэробной работы: силовая тренировка, спринт.
                            </p>
                            <div className="flex gap-3 flex-wrap">
                                <span className="px-3 py-1 rounded-full bg-cobalt/10 text-cobalt text-sm font-semibold">Покой → жиры</span>
                                <span className="px-3 py-1 rounded-full bg-coral/10 text-coral text-sm font-semibold">Тренировка → углеводы</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Смешанное питание */}
                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-cobalt/5 border border-silver">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-coral text-white flex items-center justify-center text-2xl shrink-0">⚠️</div>
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">Проблема №1: смешанное питание</h3>
                            <p className="text-steel mb-3">
                                Макароны с котлетой, картошка со сливочным маслом, фастфуд — типичная «смесь» жиров и углеводов.
                                Вот что происходит внутри:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 text-steel">
                                <li><strong className="text-ink">Скачок инсулина.</strong> Углеводы → глюкоза → поджелудочная выбрасывает инсулин.</li>
                                <li><strong className="text-ink">Жиросжигание блокировано.</strong> Инсулин мгновенно отключает гормончувствительную липазу — жир из депо не выходит.</li>
                                <li><strong className="text-ink">Жир из еды откладывается.</strong> Митохондрии не жгут жир и глюкозу одновременно. Пока есть глюкоза — жир из котлеты идёт в запас.</li>
                            </ol>
                            <p className="mt-3 text-sm font-semibold text-coral">
                                Вывод: жиреют не от жиров и не от углеводов — а от их постоянного смешивания.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. Дробное питание */}
                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-cobalt/5 border border-silver">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-coral text-white flex items-center justify-center text-2xl shrink-0">🔁</div>
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">Проблема №2: дробное питание</h3>
                            <p className="text-steel">
                                5–6 приёмов пищи в день держат инсулин постоянно поднятым.
                                Организм всегда в режиме «усвоить и запасти» — у него нет окна,
                                чтобы переключиться на жировой метаболизм. Даже «правильная»
                                еда маленькими порциями каждые 2–3 часа мешает жиросжиганию.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. Разделение нутриентов */}
                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-cobalt/5 border border-silver">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-lime text-ink flex items-center justify-center text-2xl shrink-0">⚖️</div>
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">Решение: углеводные качели</h3>
                            <p className="text-steel mb-4">Нутриенты разделяются по дням и по приёмам пищи:</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-cobalt/5 border border-cobalt/15">
                                    <p className="text-cobalt font-bold mb-2">💪 День тренировки</p>
                                    <p className="text-steel text-sm">Приём 1 после тренировки: <strong className="text-ink">белок + углеводы</strong>, минимум жира. Мышцы как губка впитывают гликоген.</p>
                                    <p className="text-steel text-sm mt-1">Приём 2 вечером: <strong className="text-ink">белок + жиры</strong> без углеводов. Гормоны, тестостерон.</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-lime/10 border border-lime/30">
                                    <p className="text-lime-700 font-bold mb-2">🚶 День отдыха</p>
                                    <p className="text-steel text-sm">Оба приёма: <strong className="text-ink">белок + жиры</strong>. Инсулин низкий весь день.</p>
                                    <p className="text-steel text-sm mt-1">10 000 шагов в таких условиях сжигают накопленный жир.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Тренировки натощак */}
                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-cobalt/5 border border-silver">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cobalt to-lime text-white flex items-center justify-center text-2xl shrink-0">🏋️</div>
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">Тренировки строго натощак</h3>
                            <p className="text-steel mb-2">
                                Утром инсулин на нуле. Гормон роста, адреналин и кортизол высокие.
                                Тренировка в этом состоянии даёт двойной эффект: запускает мощное жиросжигание
                                и делает мышцы максимально чувствительными к нутриентам из последующего приёма пищи.
                            </p>
                            <p className="text-sm text-cobalt font-semibold">
                                Принцип Егорова: тело должно «заработать» еду.
                                Поел сытым — мышцы не впитают питание так же эффективно.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 6. Хронобиология */}
                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-cobalt/5 border border-silver">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cobalt to-cobalt-dark text-white flex items-center justify-center text-2xl shrink-0">🌅</div>
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">Хронобиология: окно 09:00–17:00</h3>
                            <p className="text-steel mb-3">
                                Организм эволюционно не приспособлен есть ночью или поздно вечером.
                                Утром чувствительность к инсулину максимальна — глюкоза мгновенно уходит в мышцы.
                                К вечеру чувствительность падает: та же порция еды вызывает больший скачок инсулина и дольше задерживается в крови.
                            </p>
                            <p className="text-steel">
                                Последний приём в 16:30–17:00 критически важен для сна.
                                Пустой желудок → нервная система отдыхает → глубокий сон →
                                организм восстанавливает нейромедиаторы, снижает кортизол и вырабатывает тестостерон.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 7. Белок */}
                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-cobalt/5 border border-silver">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-lime text-ink flex items-center justify-center text-2xl shrink-0">🥩</div>
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">Много белка — главный строительный материал</h3>
                            <p className="text-steel mb-2">
                                1,5–2 г белка на кг веса в день. При интервальном голодании (всего 8 часов на еду)
                                риск потерять мышцы высок, если недоедать белок.
                            </p>
                            <p className="text-steel text-sm">
                                Бонус: на усвоение белка организм тратит до <strong className="text-ink">30% калорий из него же</strong>.
                                Чистый белок физически не откладывается в жир — слишком сложный биохимический путь.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Summary */}
            <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cobalt to-cobalt-dark text-white">
                <h3 className="text-xl font-bold mb-4">Итог: три механизма одновременно</h3>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <span className="text-lime font-bold shrink-0">→</span>
                        <p className="text-blue-50">
                            <strong>Жиросжигание</strong> — низкий инсулин большую часть суток (голодание + низкоуглеводные дни)
                            позволяет сжигать жир на 10 000 шагах.
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-lime font-bold shrink-0">→</span>
                        <p className="text-blue-50">
                            <strong>Рост мышц</strong> — целевая загрузка углеводами и белком сразу после тренировки,
                            когда мышцы максимально чувствительны (партиционирование калорий).
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-lime font-bold shrink-0">→</span>
                        <p className="text-blue-50">
                            <strong>Здоровье и сон</strong> — отказ от еды после 17:30, без смешивания жиров с углеводами,
                            сохраняет гормоны, сосуды и обеспечивает глубокий восстановительный сон.
                        </p>
                    </div>
                </div>
                <p className="mt-5 text-sm text-blue-200">
                    Источник: лекции доктора Егорова по питанию, 2024–2026. Подход основан на биохимии,
                    гормональной регуляции и хронобиологии.
                </p>
            </div>
        </div>
    );
}
