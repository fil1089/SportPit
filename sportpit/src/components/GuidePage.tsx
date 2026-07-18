export function GuidePage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/15 text-ink text-xs font-bold tracking-wide uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                    Гайд по использованию
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-ink leading-[0.95] mb-4">
                    Как работать<br />
                    <span className="text-cobalt">с планом</span>
                </h2>
                <p className="text-steel text-lg">
                    Загружай план из JSON, выбирай продукты, отмечай тренировки и следи за макро.
                </p>
            </div>

            <div className="space-y-6">
                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-cobalt/5 border border-silver">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-cobalt text-white flex items-center justify-center font-bold text-lg shrink-0">1</div>
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">Загрузи план JSON</h3>
                            <p className="text-steel mb-3">
                                В разделе «План» нажми «Загрузить план JSON» и выбери файл. Приложение само подставит вес, даты тренировок, источники углеводов и белка, правила и добавки.
                            </p>
                            <p className="text-sm text-steel">
                                Формат: обычный JSON с полями <code className="bg-silver/50 px-1.5 py-0.5 rounded text-ink">initial</code>,{' '}
                                <code className="bg-silver/50 px-1.5 py-0.5 rounded text-ink">rules</code>,{' '}
                                <code className="bg-silver/50 px-1.5 py-0.5 rounded text-ink">macros</code>,{' '}
                                <code className="bg-silver/50 px-1.5 py-0.5 rounded text-ink">products</code> и другими.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-cobalt/5 border border-silver">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-coral text-white flex items-center justify-center font-bold text-lg shrink-0">2</div>
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">Настрой параметры</h3>
                            <ul className="list-disc list-inside space-y-2 text-steel">
                                <li>Укажи свой вес — макроцели подстроятся под план.</li>
                                <li>Выбери начальную дату недели.</li>
                                <li>Отметь на календаре любые тренировочные дни — ограничений нет.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-cobalt/5 border border-silver">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-lime text-ink flex items-center justify-center font-bold text-lg shrink-0">3</div>
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">Выбери продукты</h3>
                            <p className="text-steel mb-3">
                                Источники углеводов и белка — мульти-выбор. Приложение будет ротировать их в меню на каждый день.
                            </p>
                            <p className="text-sm text-steel">
                                Можно добавить любые продукты в JSON-плане, указав белки/углеводы на 100 г или белки на порцию.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-cobalt/5 border border-silver">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-ink text-white flex items-center justify-center font-bold text-lg shrink-0">4</div>
                        <div>
                            <h3 className="text-xl font-bold text-ink mb-2">Сохрани или скачай</h3>
                            <p className="text-steel">
                                Все изменения сохраняются автоматически в облако. Также можно скачать текущий план как JSON, отредактировать на компьютере и загрузить обратно.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cobalt to-cobalt-dark text-white">
                <h3 className="text-xl font-bold mb-3">Основные правила протокола</h3>
                <ul className="list-disc list-inside space-y-2 text-blue-50">
                    <li>Окно питания: 09:00–17:00.</li>
                    <li>Не смешивать жиры и углеводы в одном приёме.</li>
                    <li>Без сахара, сладкого и алкоголя.</li>
                    <li>Углеводы — только в тренировочные дни, в Приёме 1.</li>
                    <li>Протеин только на воде, только в Приёме 1 тренировочных дней.</li>
                </ul>
            </div>
        </div>
    );
}
