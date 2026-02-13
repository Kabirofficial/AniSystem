import { useState, useCallback, useEffect } from 'react';
import { Search as SearchIcon, Filter, X, WifiOff } from 'lucide-react';
import { searchAnime } from '../api/anilistClient';
import { searchTV } from '../api/tvmazeClient';
import { MediaCard } from '../components/MediaCard';
import { Skeleton } from '../components/Skeleton';
import { Button } from '../components/Button';
import { clsx } from 'clsx';

// Simple debounce hook for search
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
        return () => { clearTimeout(handler); };
    }, [value, delay]);
    return debouncedValue;
};

export const Search = () => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('ANIME'); // ANIME | TV
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState(false);

    // Effect to parse query params on mount
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const q = searchParams.get('q');
        if (q) {
            setQuery(q);
        }
    }, []);

    // Effect to trigger search on debounced query change
    useEffect(() => {
        const performSearch = async () => {
            if (!debouncedQuery.trim()) {
                setResults([]);
                return;
            }

            setLoading(true);
            setHasSearched(true);
            try {
                const data = mode === 'ANIME'
                    ? await searchAnime(debouncedQuery)
                    : await searchTV(debouncedQuery);
                setResults(data);
            } catch (err) {
                console.error("Search failed", err);
                setResults([]);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [debouncedQuery, mode]);

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setHasSearched(false);
        setError(false);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in min-h-[80vh]">
            <div className="max-w-2xl mx-auto text-center space-y-2">
                <h1 className="text-3xl font-bold text-text-main">Discover New Titles</h1>
                <p className="text-text-muted">Search through thousands of Anime, TV Shows, and Movies.</p>
            </div>

            {/* Search Input Area */}
            <div className="max-w-3xl mx-auto sticky top-4 z-30">
                <div className="relative group">
                    <div className="absolute inset-0 bg-brand-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-bg-panel border border-white/10 rounded-xl shadow-2xl flex items-center p-2 focus-within:ring-2 focus-within:ring-brand-primary/50 transition-all">
                        <SearchIcon className="ml-4 text-text-muted" size={20} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={mode === 'ANIME' ? "Search for anime (e.g., Attack on Titan)..." : "Search for TV shows (e.g., Breaking Bad)..."}
                            className="w-full bg-transparent border-none text-text-main placeholder-text-muted px-4 py-3 focus:outline-none text-lg"
                            autoFocus
                        />
                        {query && (
                            <button onClick={handleClear} className="p-2 text-text-muted hover:text-text-main">
                                <X size={18} />
                            </button>
                        )}
                        <div className="h-8 w-px bg-white/10 mx-2"></div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setMode('ANIME')}
                                className={clsx("px-3 py-1.5 rounded-lg text-sm font-medium transition-colors", mode === 'ANIME' ? "bg-white/10 text-white" : "text-text-muted hover:text-white")}
                            >
                                Anime
                            </button>
                            <button
                                onClick={() => setMode('TV')}
                                className={clsx("px-3 py-1.5 rounded-lg text-sm font-medium transition-colors", mode === 'TV' ? "bg-white/10 text-white" : "text-text-muted hover:text-white")}
                            >
                                TV
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {loading && Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="aspect-[2/3] w-full rounded-xl" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                ))}

                {!loading && results.map((item) => (
                    <div key={item.id} className="animate-slide-up">
                        <MediaCard item={item} />
                    </div>
                ))}
            </div>

            {/* Empty States */}
            {!loading && hasSearched && results.length === 0 && !error && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Filter size={32} className="text-text-muted" />
                    </div>
                    <h3 className="text-xl font-medium text-text-main">No results found</h3>
                    <p className="text-text-muted mt-2 max-w-md mx-auto">We couldn't find any titles matching "{query}". Try adjusting your search terms or switching categories.</p>
                </div>
            )}

            {!loading && error && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <WifiOff size={32} className="text-red-400" />
                    </div>
                    <h3 className="text-xl font-medium text-text-main">Connection Error</h3>
                    <p className="text-text-muted mt-2 max-w-md mx-auto">Failed to connect to the search API. Please check your internet connection.</p>
                    <Button variant="secondary" onClick={() => window.location.reload()} className="mt-4">Retry</Button>
                </div>
            )}

            {!loading && !hasSearched && (
                <div className="text-center py-20 opacity-50">
                    <p className="text-text-muted uppercase tracking-widest text-xs font-semibold">Start typing to search</p>
                </div>
            )}
        </div>
    );
};
