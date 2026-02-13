import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from './Button';

export const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
            setIsVisible(false);
        } else {
            console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-[100] md:left-auto md:right-8 md:bottom-8 md:w-80">
            <div className="bg-bg-panel border border-brand-primary/20 p-4 rounded-xl shadow-2xl flex flex-col gap-3 animate-slide-up-fade relative">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-text-muted hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                        <Download size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-main">Install App</h3>
                        <p className="text-xs text-text-muted">Add to Home Screen for better experience</p>
                    </div>
                </div>

                <div className="flex gap-2 mt-1">
                    <Button onClick={() => setIsVisible(false)} variant="ghost" size="sm" className="flex-1">
                        Later
                    </Button>
                    <Button onClick={handleInstall} variant="primary" size="sm" className="flex-1">
                        Install
                    </Button>
                </div>
            </div>
        </div>
    );
};
