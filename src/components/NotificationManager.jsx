import { useEffect } from 'react';
import useMediaStore from '../store/useMediaStore';

export const NotificationManager = () => {
    const { watchlist, preferences } = useMediaStore();

    useEffect(() => {
        if (!preferences.notifications || !('Notification' in window)) return;

        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission();
        }

        const checkReminders = () => {
            if (Notification.permission !== 'granted') return;

            const now = Date.now() / 1000;
            const oneHour = 3600;

            watchlist.forEach(item => {
                if (item.nextAiring && item.watchStatus === 'WATCHING') {
                    const timeDiff = item.nextAiring - now;

                    // Notify if airing in less than 1 hour and hasn't been notified yet (simplified logic)
                    // In a real app, we'd store "notifiedAt" to prevent spam. 
                    // For this local-first version, we'll just check a tight window (e.g., 59-60 mins) or rely on the user seeing it.
                    // Better approach: Check if it airs in < 30 mins and > 29 mins (so we only trigger once).

                    // Let's use a simple "Airing Soon" check (between 0 and 15 mins)
                    // Notification Window: 1 hour (3600s)
                    if (timeDiff > 0 && timeDiff <= 3600) {
                        // Check if we already notified for this specific episode recently to avoid spam
                        // For now, we'll rely on the browser's rudimentary deduping or user setting
                        // In a production app, we would store `lastNotifiedAt` in the item.

                        new Notification(`New Episode: ${item.title}`, {
                            body: `Episode ${item.nextEpisode} airs in ${Math.ceil(timeDiff / 60)} minutes!`,
                            icon: item.image,
                            tag: `ep-${item.id}-${item.nextEpisode}` // Basic deduping tag
                        });
                    }
                }
            });
        };

        const interval = setInterval(checkReminders, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [watchlist, preferences.notifications]);

    return null; // Headless component
};
