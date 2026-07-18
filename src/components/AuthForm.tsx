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
        <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow border border-gray-200 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">
                {mode === 'login' ? 'Вход' : 'Регистрация'}
            </h2>
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
            />
            <label className="block mb-2 text-sm font-medium">Пароль</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium disabled:opacity-50"
            >
                {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="w-full mt-3 text-sm text-primary hover:underline"
            >
                {mode === 'login' ? 'Создать аккаунт' : 'Уже есть аккаунт? Войти'}
            </button>
        </form>
    );
}
