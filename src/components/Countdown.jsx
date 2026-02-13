import { useState, useEffect, memo } from 'react';
import { Clock } from 'lucide-react';

const formatTimeLeft = (seconds) => {
    if (seconds <= 0) return 'Airing now';

    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
};

export const Countdown = memo(({ targetTimestamp, className }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (!targetTimestamp) return;

        const update = () => {
            const now = Date.now() / 1000;
            const diff = targetTimestamp - now;
            setTimeLeft(formatTimeLeft(diff));
        };

        update();
        const interval = setInterval(update, 60000); // Update every minute to save resources
        return () => clearInterval(interval);
    }, [targetTimestamp]);

    if (!timeLeft) return null;

    return (
        <span className={`flex items-center gap-1.5 font-mono text-sm ${className}`}>
            <Clock size={14} className="animate-pulse" />
            {timeLeft}
        </span>
    );
});

Countdown.displayName = 'Countdown';
