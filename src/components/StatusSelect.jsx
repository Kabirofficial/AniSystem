import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

export const StatusSelect = ({ currentStatus, onChange, className }) => {
    const statuses = [
        { value: 'PLANNED', label: 'Plan to Watch', color: 'bg-status-warning' },
        { value: 'WATCHING', label: 'Watching', color: 'bg-brand-primary' },
        { value: 'COMPLETED', label: 'Completed', color: 'bg-status-success' },
        { value: 'DROPPED', label: 'Dropped', color: 'bg-status-error' },
    ];

    const current = statuses.find(s => s.value === currentStatus) || statuses[0];

    return (
        <div className={clsx("relative inline-block", className)}>
            <select
                value={currentStatus || 'PLANNED'}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none w-full bg-bg-panel border border-white/10 text-text-main text-sm font-medium rounded-lg px-4 py-2 pr-10 hover:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-colors cursor-pointer"
            >
                {statuses.map((status) => (
                    <option key={status.value} value={status.value} className="bg-bg-panel text-text-main">
                        {status.label}
                    </option>
                ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />

            {/* Status Indicator Dot */}
            <div className={clsx("absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full pointer-events-none hidden sm:block", current?.color)}></div>
        </div>
    );
};
