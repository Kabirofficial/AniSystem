import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Footer } from '../components/Footer';
import { NotificationManager } from '../components/NotificationManager';
import { InstallPrompt } from '../components/InstallPrompt';

export const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-bg-main text-text-main">
            <NotificationManager />
            <InstallPrompt />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 md:ml-[260px] transition-all duration-300">
                {/* Mobile Header */}
                <div className="md:hidden sticky top-0 z-30 bg-bg-main/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
                        <span className="font-bold text-lg">AniSystem</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-text-muted hover:text-white active:bg-white/10 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <div className="p-4 md:p-12 relative min-h-[calc(100vh-80px)]">
                    <Outlet />
                </div>
                <Footer />
            </main>
        </div>
    );
};
