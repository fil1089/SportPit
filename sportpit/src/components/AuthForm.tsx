import { useState } from 'react';

interface AuthFormProps {
    onSignIn: (email: string, password: string) => Promise<void>;
    onSignUp: (email: string, password: string) => Promise<void>;
    loading?: boolean;
}

export function AuthForm({ onSignIn, onSignUp, loading }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [error, setError] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (mode === 'login') {
                await onSignIn(email, password);
            } else {
                if (password.length < 6) {
                    setError('Пароль должен быть не короче 6 символов');
                    return;
                }
                await onSignUp(email, password);
            }
        } catch (err: any) {
            setError(err.message || 'Ошибка');
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt/10 text-cobalt text-xs font-bold tracking-wide uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                    Протокол Егорова
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-ink leading-[0.95] mb-3">
                    Твой план<br />
                    <span className="text-cobalt">питания</span>
                </h2>
                <p className="text-steel text-base">
                    Интервальное голодание + циклирование углеводов. Загружай план, выбирай продукты, отмечай тренировки.
                </p>
            </div>

            <form onSubmit={submit} className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-cobalt/10 border border-silver">
                <div className="flex gap-2 mb-6 p-1 bg-silver/50 rounded-2xl">
                    <button
                        type="button"
                        onClick={() => setMode('login')}
                        className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                            mode === 'login' ? 'bg-white text-cobalt shadow-sm' : 'text-steel hover:text-ink'
                        }`}
                    >
                        Вход
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('register')}
                        className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                            mode === 'register' ? 'bg-white text-cobalt shadow-sm' : 'text-steel hover:text-ink'
                        }`}
                    >
                        Регистрация
                    </button>
                </div>

                {error && <div className="mb-4 p-3 bg-coral/10 text-coral rounded-xl text-sm font-medium">{error}</div>}

                <label className="block mb-2 text-sm font-semibold text-ink">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-3 bg-cream border border-silver rounded-xl focus:outline-none focus:ring-2 focus:ring-cobalt text-ink placeholder:text-steel/60"
                    placeholder="you@example.com"
                    required
                />

                <label className="block mb-2 text-sm font-semibold text-ink">Пароль</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 px-4 py-3 bg-cream border border-silver rounded-xl focus:outline-none focus:ring-2 focus:ring-cobalt text-ink placeholder:text-steel/60"
                    placeholder="••••••••"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 bg-ink hover:bg-ink/90 text-white rounded-xl font-bold disabled:opacity-50 transition shadow-lg shadow-ink/20"
                >
                    {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
                </button>
            </form>

            <div className="mt-6 flex gap-4 text-xs text-steel">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-lime" />Без сахара</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-coral" />16:8</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cobalt" />Циклирование углеводов</span>
            </div>
        </div>
    );
}
