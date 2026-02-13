import { Search } from 'lucide-react';

export const FilterBar = ({ onSearch, onFilterStatus, currentStatus }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder="Filter by title..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full bg-bg-panel border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            </div>

            <select
                value={currentStatus}
                onChange={(e) => onFilterStatus(e.target.value)}
                className="bg-bg-panel border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-primary text-text-main"
            >
                <option value="ALL">All Status</option>
                <option value="WATCHING">Watching</option>
                <option value="PLANNED">Planned</option>
                <option value="COMPLETED">Completed</option>
            </select>
        </div>
    );
};
