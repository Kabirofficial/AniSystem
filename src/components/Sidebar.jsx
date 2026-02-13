import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Calendar, HelpCircle, X, Settings } from 'lucide-react';
import { clsx } from 'clsx';

export const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const links = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Search', path: '/search', icon: Search },
        { name: 'Schedule', path: '/calendar', icon: Calendar },
        { name: 'Support', path: '/support', icon: HelpCircle },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
                    onClick={onClose}
                />
            )}

            <aside className={clsx(
                "fixed left-0 top-0 h-screen w-[260px] bg-bg-panel border-r border-white/5 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Brand Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="AniSystem Logo" className="w-8 h-8 rounded-lg shadow-sm" />
                        <div>
                            <h1 className="text-lg font-bold text-white tracking-tight leading-none">AniSystem</h1>
                            <p className="text-xs text-text-muted">Media Tracker</p>
                        </div>
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="md:hidden text-text-muted hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 mt-2">
                    <p className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Menu</p>
                    {links.map((link) => {
                        const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => onClose && onClose()}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group",
                                    isActive
                                        ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                                        : "text-text-muted hover:text-text-main hover:bg-white/5"
                                )}
                            >
                                <Icon size={18} className={clsx("transition-transform duration-200", isActive ? "" : "group-hover:text-text-main")} />
                                <span className="font-medium text-sm">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer (Simplified settings instead of User Mock)
                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors text-text-muted hover:text-text-main">
                        <Settings size={18} />
                        <span className="text-sm font-medium">Settings</span>
                    </div>
                </div> */}
            </aside>
        </>
    );
};
