import { useEffect, useState } from 'react';
import './App.css';
import { api, type DietData } from './lib/api.js';
import { useAuth } from './hooks/useAuth.js';
import { AuthForm } from './components/AuthForm.js';
import { Header } from './components/Header.js';
import { PlanEditor } from './components/PlanEditor.js';

async function wrapVoid(fn: (email: string, password: string) => Promise<unknown>, email: string, password: string): Promise<void> {
    await fn(email, password);
}

function App() {
    const { user, loading, signIn, signUp, signOut } = useAuth();
    const [initialDiet, setInitialDiet] = useState<DietData | null>(null);
    const [dietLoading, setDietLoading] = useState(true);
    const [dietError, setDietError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setDietLoading(false);
            setInitialDiet(null);
            return;
        }
        setDietLoading(true);
        api.getDiet()
            .then((record) => {
                setInitialDiet(record?.data || null);
            })
            .catch((err) => setDietError(err.message))
            .finally(() => setDietLoading(false));
    }, [user]);

    if (loading || dietLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Загрузка...
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Header email={user?.email ?? null} onSignOut={signOut} />
            <main>
                {!user ? (
                    <div className="min-h-[80vh] flex items-center justify-center px-4">
                        <AuthForm
                            onSignIn={(email, password) => wrapVoid(signIn, email, password)}
                            onSignUp={(email, password) => wrapVoid(signUp, email, password)}
                            loading={loading}
                        />
                    </div>
                ) : (
                    <>
                        {dietError && (
                            <div className="max-w-5xl mx-auto px-4 mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                {dietError}
                            </div>
                        )}
                        <PlanEditor initial={initialDiet} />
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
