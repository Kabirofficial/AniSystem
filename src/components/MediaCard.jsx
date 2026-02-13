import { Star, Clock, CheckCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useMediaStore from '../store/useMediaStore';
import { Button } from './Button';
import { clsx } from 'clsx';
import { useState, memo } from 'react';
import { AddToCalendarButton } from './AddToCalendarButton';

export const MediaCard = memo(({ item, onClick, showActions = true }) => {
    const { addToWatchlist, watchlist, removeFromWatchlist } = useMediaStore();
    const inWatchlist = watchlist.find(w => w.id === item.id);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (onClick) {
            onClick();
        } else {
            // item.id is like "anilist-123", we need to split it or pass it as is if we changed logic
            // My Details page expects /media/:type/:id
            // item.type is "ANIME" or "TV"
            // item.originalId is the raw ID
            navigate(`/media/${item.type}/${item.originalId}`);
        }
    };

    const handleAction = (e) => {
        e.stopPropagation();
        if (inWatchlist) {
            removeFromWatchlist(item.id);
        } else {
            addToWatchlist(item);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'RELEASING': return 'bg-status-success text-white';
            case 'FINISHED': return 'bg-brand-secondary text-white';
            case 'NOT_YET_RELEASED': return 'bg-status-warning text-black';
            default: return 'bg-bg-panel text-text-muted border border-white/10';
        }
    };

    const formatStatus = (status) => status?.replace(/_/g, ' ') || 'UNKNOWN';

    return (
        <div
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-bg-panel border border-white/5 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:shadow-brand-primary/10 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="aspect-[2/3] relative overflow-hidden bg-bg-main">
                <img
                    src={item.image}
                    alt={item.title}
                    className={clsx(
                        "w-full h-full object-cover transition-transform duration-500",
                        isHovered ? "scale-105" : "scale-100"
                    )}
                    loading="lazy"
                />

                {/* Status Tag */}
                {item.status && (
                    <div className={clsx(
                        "absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide shadow-sm",
                        getStatusColor(item.status)
                    )}>
                        {formatStatus(item.status)}
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className={clsx(
                    "absolute inset-0 bg-gradient-to-t from-bg-panel via-transparent to-transparent opacity-60 transition-opacity duration-300",
                    isHovered ? "opacity-90" : "opacity-60"
                )} />

                {/* Quick Action Button - Visible on Hover */}
                {showActions && (
                    <div className={clsx(
                        "absolute bottom-4 left-4 right-4 transition-all duration-300 transform flex flex-col gap-2",
                        isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}>
                        <Button
                            onClick={handleAction}
                            variant={inWatchlist ? "danger" : "primary"}
                            size="sm"
                            className="w-full shadow-lg"
                        >
                            {inWatchlist ? 'Remove' : 'Track Title'}
                        </Button>
                        {item.nextAiring && (
                            <AddToCalendarButton item={item} className="w-full" compact={false} />
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 pt-2 relative flex-1 flex flex-col gap-1">
                <h3 className="text-base font-semibold text-text-main line-clamp-1 group-hover:text-brand-primary transition-colors" title={item.title}>
                    {item.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 mt-auto text-xs text-text-muted">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-text-muted"></span>{item.type}</span>
                    {item.score && <span className="flex items-center gap-1"><Star size={12} className="text-status-warning fill-status-warning" /> {item.score}%</span>}
                    {item.episodes && <span className="flex items-center gap-1"><Clock size={12} /> {item.episodes} Ep</span>}
                </div>
            </div>
        </div>
    );
});

MediaCard.displayName = 'MediaCard';
