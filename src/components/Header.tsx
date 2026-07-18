interface HeaderProps {
    email: string | null;
    onSignOut: () => void;
}

export function Header({ email, onSignOut }: HeaderProps) {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">SP</div>
                    <h1 className="text-xl font-bold">SportPit — Протокол Егорова</h1>
                </div>
                {email && (
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">{email}</span>
                        <button
                            onClick={onSignOut}
                            className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Выйти
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
