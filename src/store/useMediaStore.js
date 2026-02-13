import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useMediaStore = create(
    persist(
        (set, get) => ({
            watchlist: [],
            preferences: {
                theme: 'dark',
                defaultView: 'grid',
                notifications: false, // Default to false until requested
            },

            // Actions
            addToWatchlist: (item, initialStatus = 'PLANNED') => {
                const { watchlist } = get();
                if (watchlist.some((i) => i.id === item.id)) return;

                set({
                    watchlist: [
                        ...watchlist,
                        {
                            ...item,
                            watchStatus: initialStatus,
                            addedAt: Date.now(),
                            updatedAt: Date.now()
                        }
                    ]
                });
            },

            // Bulk import for Seasonal Trending or Shareable Links
            importList: (items) => {
                const { watchlist } = get();
                const newItems = items.filter(newItem => !watchlist.some(existing => existing.id === newItem.id));

                if (newItems.length === 0) return { added: 0 };

                set({
                    watchlist: [...watchlist, ...newItems.map(i => ({
                        ...i,
                        watchStatus: i.watchStatus || 'PLANNED',
                        addedAt: Date.now(),
                        updatedAt: Date.now()
                    }))]
                });
                return { added: newItems.length };
            },

            removeFromWatchlist: (id) => {
                set((state) => ({
                    watchlist: state.watchlist.filter((item) => item.id !== id),
                }));
            },

            updateWatchStatus: (id, status) => {
                set((state) => ({
                    watchlist: state.watchlist.map((item) =>
                        item.id === id
                            ? { ...item, watchStatus: status, updatedAt: Date.now() }
                            : item
                    ),
                }));
            },

            updatePreferences: (newPrefs) => {
                set((state) => ({
                    preferences: { ...state.preferences, ...newPrefs }
                }));
            },

            clearWatchlist: () => set({ watchlist: [] }),

            // Computed helpers
            getStats: () => {
                const { watchlist } = get();
                return {
                    total: watchlist.length,
                    watching: watchlist.filter(i => i.watchStatus === 'WATCHING').length,
                    completed: watchlist.filter(i => i.watchStatus === 'COMPLETED').length,
                    planned: watchlist.filter(i => i.watchStatus === 'PLANNED').length,
                };
            }
        }),
        {
            name: 'ani-system-storage',
            storage: createJSONStorage(() => localStorage),
            version: 1,
            migrate: (persistedState, version) => {
                if (version === 0) {
                    // Example migration: if we had a v0 schema
                    // persistedState.watchlist.forEach(i => i.newField = 'default')
                }
                return persistedState;
            },
            onRehydrateStorage: (state) => {
                return (state, error) => {
                    if (error) {
                        console.error('An error happened during hydration', error);
                    }
                };
            }
        }
    )
);

export default useMediaStore;
