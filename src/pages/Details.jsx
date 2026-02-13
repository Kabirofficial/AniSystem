import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimeDetails } from '../api/anilistClient';
import { getTVDetails } from '../api/tvmazeClient';
import useMediaStore from '../store/useMediaStore';
import { Button } from '../components/Button';
import { Skeleton } from '../components/Skeleton';
import { StatusSelect } from '../components/StatusSelect';
import { ArrowLeft, Star, Calendar, Clock, PlayCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { clsx } from 'clsx';
import { format } from 'date-fns';

export const Details = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToWatchlist, removeFromWatchlist, updateWatchStatus, watchlist } = useMediaStore();

    // ID in URL is like "anilist-123" or "tvmaze-456"
    // We need to parse it if the route parameter isn't split cleanly, but here passing separate type param is cleaner.
    // However, the router is likely /media/:type/:id where id is the numeric/string ID from the source.
    // But my internal IDs are prefixed. Let's assume the router passes the raw ID and type.

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                let data = null;
                // The route should probably be /media/:type/:id
                // Where type is 'ANIME' or 'TV'
                // and id is the raw ID.

                // Let's rely on the type param
                if (type === 'ANIME') {
                    data = await getAnimeDetails(parseInt(id));
                } else {
                    data = await getTVDetails(id);
                }
                setItem(data);
            } catch (error) {
                console.error("Failed to fetch details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [type, id]);

    const inWatchlist = item ? watchlist.find(w => w.id === item.id) : false;

    const handleAction = () => {
        if (!item) return;
        if (inWatchlist) {
            removeFromWatchlist(item.id);
        } else {
            addToWatchlist(item);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-6 space-y-8 animate-pulse">
                <Skeleton className="h-[300px] w-full rounded-2xl" />
                <div className="flex gap-8">
                    <Skeleton className="w-64 h-96 rounded-xl -mt-32 border-4 border-bg-main" />
                    <div className="space-y-4 flex-1 pt-4">
                        <Skeleton className="h-10 w-1/2" />
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h2 className="text-2xl font-bold text-text-main">Media not found</h2>
                <p className="text-text-muted">The requested media could not be loaded. It may not exist or the API is unavailable.</p>
                <div className="flex gap-4">
                    <Button onClick={() => navigate(-1)} variant="secondary">Go Back</Button>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in pb-20">
            <SEO
                title={item.title}
                description={`Track ${item.title} on AniSystem. ${item.description?.slice(0, 150)}...`}
                image={item.image}
            />
            {/* Banner */}
            <div className="relative h-[300px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent z-10" />
                {item.banner ? (
                    <img src={item.banner} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-brand-primary/10 flex items-center justify-center">
                        <p className="text-brand-primary font-bold opacity-20 text-4xl uppercase tracking-widest">AniSystem</p>
                    </div>
                )}
                <Button
                    variant="ghost"
                    className="absolute top-6 left-6 z-20 backdrop-blur-md bg-black/20 text-white hover:bg-black/40"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={18} className="mr-2" /> Back
                </Button>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-32 flex flex-col md:flex-row gap-8">
                {/* Cover & Actions */}
                <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full rounded-xl shadow-2xl border-4 border-bg-main aspect-[2/3] object-cover"
                    />

                    {inWatchlist ? (
                        <div className="space-y-3">
                            <div className="bg-bg-panel border border-white/10 rounded-lg p-3 space-y-2">
                                <label className="text-xs text-text-muted uppercase font-bold tracking-wider">Status</label>
                                <StatusSelect
                                    currentStatus={inWatchlist.watchStatus}
                                    onChange={(status) => updateWatchStatus(item.id, status)}
                                    className="w-full"
                                />
                            </div>
                            <Button
                                onClick={() => removeFromWatchlist(item.id)}
                                variant="danger"
                                className="w-full"
                            >
                                Remove from List
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={() => addToWatchlist(item)}
                            variant="primary"
                            className="w-full shadow-lg"
                            size="lg"
                        >
                            Add to List
                        </Button>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 pt-4 md:pt-32 space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold text-white leading-tight mb-2">{item.title}</h1>
                        {item.nativeTitle && <p className="text-lg text-text-muted font-medium">{item.nativeTitle}</p>}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                        <span className={clsx(
                            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                            item.status === 'RELEASING' || item.status === 'Running' ? "bg-status-success text-white" : "bg-white/10 text-text-muted"
                        )}>
                            {item.status}
                        </span>
                        {item.score && (
                            <span className="flex items-center gap-1 text-status-warning">
                                <Star fill="currentColor" size={16} /> {item.score}%
                            </span>
                        )}
                        {item.startDate && (
                            <span className="flex items-center gap-1 text-text-muted">
                                <Calendar size={16} /> {format(new Date(item.startDate), 'MMM d, yyyy')}
                            </span>
                        )}
                        {item.type && (
                            <span className="px-2 py-0.5 rounded text-xs bg-brand-primary/20 text-brand-primary border border-brand-primary/20">
                                {item.type}
                            </span>
                        )}
                    </div>

                    {/* Next Episode Highlight */}
                    {item.nextAiring && (
                        <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-4 flex items-center gap-4">
                            <div className="p-3 bg-brand-primary/20 rounded-full text-brand-primary animate-pulse">
                                <PlayCircle size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">Next Episode</p>
                                <p className="text-white font-medium">
                                    Episode {item.nextEpisode} airing on {format(new Date(item.nextAiring * 1000), 'EEEE, MMMM do @ h:mm a')}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Synopsis</h3>
                        <div
                            className="text-text-muted leading-relaxed prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/5">
                        {item.studios && item.studios.length > 0 && (
                            <div>
                                <p className="text-xs text-text-muted uppercase mb-1">Studio</p>
                                <p className="font-medium text-white">{item.studios.join(', ')}</p>
                            </div>
                        )}
                        {item.genres && (
                            <div className="col-span-2">
                                <p className="text-xs text-text-muted uppercase mb-1">Genres</p>
                                <div className="flex flex-wrap gap-2">
                                    {item.genres.map(g => (
                                        <span key={g} className="text-xs px-2 py-1 rounded bg-white/5 text-text-muted border border-white/5">{g}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
