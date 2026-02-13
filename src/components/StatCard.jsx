export const StatCard = ({ label, value, icon: Icon, colorClass, subtext }) => (
    <div className="bg-bg-panel border border-white/5 p-5 rounded-xl flex items-center gap-4 relative overflow-hidden group hover:border-white/10 transition-colors">
        <div className={`p-3 rounded-lg bg-white/5 ${colorClass} group-hover:scale-110 transition-transform`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-sm text-text-muted font-medium">{label}</p>
            <p className="text-2xl font-bold text-text-main">{value}</p>
            {subtext && <p className="text-xs text-text-muted mt-0.5">{subtext}</p>}
        </div>
    </div>
);
