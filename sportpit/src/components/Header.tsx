interface HeaderProps {
    email: string | null;
    onSignOut: () => void;
    page: 'plan' | 'guide' | 'system';
    onPageChange: (page: 'plan' | 'guide' | 'system') => void;
}

export function Header({ email, onSignOut, page, onPageChange }: HeaderProps) {
    return (
        <header className="bg-cream/80 backdrop-blur border-b border-silver sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cobalt to-lime rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cobalt/25">
                        SP
                    </div>
                    <div>
                        <h1 className="text-lg sm:text-xl font-bold leading-tight text-ink">SportPit</h1>
                        <p className="text-xs text-steel hidden sm:block">Протокол Егорова</p>
                    </div>
                </div>

                {email && (
                    <div className="flex items-center gap-2 sm:gap-4">
                        <nav className="flex bg-silver/50 rounded-2xl p-1">
                            <button
                                type="button"
                                onClick={() => onPageChange('plan')}
                                className={`px-3 sm:px-4 py-1.5 rounded-xl text-sm font-semibold transition ${
                                    page === 'plan' ? 'bg-white text-cobalt shadow-sm' : 'text-steel hover:text-ink'
                                }`}
                            >
                                План
                            </button>
                            <button
                                type="button"
                                onClick={() => onPageChange('guide')}
                                className={`px-3 sm:px-4 py-1.5 rounded-xl text-sm font-semibold transition ${
                                    page === 'guide' ? 'bg-white text-cobalt shadow-sm' : 'text-steel hover:text-ink'
                                }`}
                            >
                                Гайд
                            </button>
                            <button
                                type="button"
                                onClick={() => onPageChange('system')}
                                className={`px-3 sm:px-4 py-1.5 rounded-xl text-sm font-semibold transition ${
                                    page === 'system' ? 'bg-white text-cobalt shadow-sm' : 'text-steel hover:text-ink'
                                }`}
                            >
                                О системе
                            </button>
                        </nav>
                        <span className="text-sm text-steel hidden sm:inline">{email}</span>
                        <button
                            onClick={onSignOut}
                            className="px-3 py-1.5 text-sm border border-silver rounded-xl hover:bg-silver/50 transition text-ink"
                        >
                            Выйти
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
