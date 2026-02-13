import { useMemo, useState } from 'react';
import useMediaStore from '../store/useMediaStore';
import { MediaCard } from '../components/MediaCard';
import { Button } from '../components/Button';
import { Ghost, TrendingUp, Calendar, CheckCircle, Clock, Search, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { SEO } from '../components/SEO';
import { SeasonalImport } from '../components/SeasonalImport';
import { Countdown } from '../components/Countdown';
import { FilterBar } from '../components/FilterBar';

import { StatCard } from '../components/StatCard';

export const Dashboard = () => {
    const { watchlist } = useMediaStore();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    // Filtered Watchlist
    const filteredWatchlist = useMemo(() => {
        return watchlist.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'ALL' || item.watchStatus === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [watchlist, searchQuery, statusFilter]);

    const watching = useMemo(() => filteredWatchlist.filter(i => i.watchStatus === 'WATCHING'), [filteredWatchlist]);
    const planned = useMemo(() => filteredWatchlist.filter(i => i.watchStatus === 'PLANNED'), [filteredWatchlist]);
    const completed = useMemo(() => filteredWatchlist.filter(i => i.watchStatus === 'COMPLETED'), [filteredWatchlist]);

    const upcomingEpisodes = useMemo(() => {
        const now = Date.now() / 1000;
        return watchlist
            .filter(item => item.nextAiring && item.nextAiring > now)
            .sort((a, b) => a.nextAiring - b.nextAiring)
            .slice(0, 5);
    }, [watchlist]);

    const totalEpisodes = useMemo(() => {
        return watchlist.reduce((acc, item) => acc + (item.episodes || 0), 0);
    }, [watchlist]);

    // Rough estimate: 24 mins per ep for Anime, 45 for TV, defaulting to 24 for mixed
    const totalTimeHours = useMemo(() => {
        return Math.round((totalEpisodes * 24) / 60);
    }, [totalEpisodes]);

    const handleQuickSearch = (e) => {
        e.preventDefault();
        if (quickSearch.trim()) {
            navigate(`/search?q=${encodeURIComponent(quickSearch)}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in">
            <SEO title="Dashboard" />
            {/* Header & Quick Search */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-main tracking-tight">Dashboard</h1>
                    <div className="flex items-center gap-4 mt-1">
                        <p className="text-text-muted">Your personal media command center.</p>
                        <div className="hidden md:block w-px h-4 bg-white/10"></div>
                        <div className="scale-90 origin-left">
                            <SeasonalImport />
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-auto">
                    <FilterBar
                        onSearch={setSearchQuery}
                        onFilterStatus={setStatusFilter}
                        currentStatus={statusFilter}
                    />
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Watching" value={watching.length} icon={TrendingUp} colorClass="text-brand-primary" />
                <StatCard label="To Watch" value={planned.length} icon={Calendar} colorClass="text-status-warning" />
                <StatCard label="Completed" value={completed.length} icon={CheckCircle} colorClass="text-status-success" />
                <StatCard label="Total Time" value={`${totalTimeHours}h`} icon={Clock} colorClass="text-purple-400" subtext={`${totalEpisodes} Episodes`} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content - 2/3 width */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <h2 className="text-xl font-semibold text-text-main">Continue Watching</h2>
                            {watching.length > 0 && <Link to="/search" className="text-sm text-brand-primary hover:underline">View All</Link>}
                        </div>

                        {watching.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {watching.map(item => (
                                    <MediaCard key={item.id} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-bg-panel/50 border border-dashed border-white/10 rounded-xl p-12 text-center">
                                <Ghost className="mx-auto mb-3 text-text-muted opacity-50" size={48} />
                                <h3 className="text-lg font-medium text-text-main mb-1">No active titles</h3>
                                <p className="text-text-muted mb-6">Start tracking a series to see it here.</p>
                                <Link to="/search">
                                    <Button variant="secondary">Browse Library</Button>
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Planned */}
                    {planned.length > 0 && (
                        <section className="space-y-6">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <h2 className="text-xl font-semibold text-text-main">Up Next</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {planned.map(item => (
                                    <MediaCard key={item.id} item={item} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Widgets - 1/3 width */}
                <div className="space-y-8">
                    {/* Top 5 Upcoming Widget */}
                    <div className="bg-bg-panel border border-white/5 rounded-xl p-6 sticky top-24">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="text-brand-primary" size={20} />
                            <h3 className="font-bold text-lg text-white">Upcoming This Week</h3>
                        </div>

                        {upcomingEpisodes.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingEpisodes.map(item => (
                                    <div
                                        key={item.id}
                                        className="flex gap-3 items-start group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                                        onClick={() => navigate(`/media/${item.type}/${item.originalId}`)}
                                    >
                                        <div className="w-12 h-12 rounded bg-bg-main overflow-hidden flex-shrink-0 relative">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            {/* Play overlay on hover */}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Play size={16} className="text-white fill-white" />
                                            </div>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-medium text-text-main line-clamp-1 group-hover:text-brand-primary transition-colors">{item.title}</p>
                                            <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                                                <span className="bg-brand-primary/10 text-brand-primary px-1.5 py-0.5 rounded font-bold">EP {item.nextEpisode}</span>
                                                <Countdown targetTimestamp={item.nextAiring} className="text-brand-secondary" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Link to="/calendar" className="block text-center text-xs text-text-muted hover:text-brand-primary mt-4 pt-4 border-t border-white/5 uppercase tracking-wider font-semibold">
                                    View Full Schedule
                                </Link>
                            </div>
                        ) : (
                            <p className="text-helpers-muted text-sm text-center py-8">No upcoming episodes this week.</p>
                        )}
                    </div>


                </div>
            </div>

            {/* Completed Section (Full Width) */}
            {completed.length > 0 && (
                <section className="space-y-6 opacity-80 hover:opacity-100 transition-opacity pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <h2 className="text-xl font-semibold text-text-main">Completed History</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
                        {completed.map(item => (
                            <MediaCard key={item.id} item={item} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};
