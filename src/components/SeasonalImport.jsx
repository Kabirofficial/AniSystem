import { useState } from 'react';
import { Button } from './Button';
import { Download, Check, Loader2 } from 'lucide-react';
import useMediaStore from '../store/useMediaStore';

export const SeasonalImport = () => {
    const { importList } = useMediaStore();
    const [loading, setLoading] = useState(false);
    const [importedCount, setImportedCount] = useState(null);

    const fetchSeasonal = async () => {
        setLoading(true);
        try {
            const query = `
            query {
                Page(page: 1, perPage: 10) {
                    media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
                        id
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            large
                        }
                        episodes
                        nextAiringEpisode {
                            episode
                            airingAt
                        }
                        status
                    }
                }
            }
            `;

            const response = await fetch('https://graphql.anilist.co', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ query })
            });

            const data = await response.json();
            const items = data.data.Page.media.map(m => ({
                id: m.id,
                originalId: m.id,
                type: 'ANIME',
                title: m.title.english || m.title.romaji,
                image: m.coverImage.large,
                episodes: m.episodes,
                status: m.status,
                nextAiring: m.nextAiringEpisode?.airingAt,
                nextEpisode: m.nextAiringEpisode?.episode,
            }));

            const result = importList(items);
            setImportedCount(result.added);

            setTimeout(() => setImportedCount(null), 3000); // Reset success msg
        } catch (error) {
            console.error("Failed to import seasonal anime", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={fetchSeasonal}
            className={`w-full sm:w-auto shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 transition-all ${loading ? 'opacity-80 cursor-wait' : ''}`}
            disabled={loading}
        >
            {loading ? (
                <><Loader2 className="animate-spin" size={18} /> Importing...</>
            ) : importedCount !== null ? (
                <><Check size={18} /> Added {importedCount} Titles</>
            ) : (
                <><Download size={18} /> Import Trending Season</>
            )}
        </Button>
    );
};
