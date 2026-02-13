import axios from 'axios';

const TVMAZE_API_URL = 'https://api.tvmaze.com';

const client = axios.create({
    baseURL: TVMAZE_API_URL,
});

export const searchTV = async (query) => {
    try {
        const response = await client.get(`/search/shows?q=${query}`);
        return response.data.map(({ show }) => ({
            id: `tvmaze-${show.id}`,
            originalId: show.id,
            source: 'tvmaze',
            title: show.name,
            image: show.image?.original || show.image?.medium,
            banner: null,
            description: show.summary,
            status: show.status,
            score: show.rating?.average ? show.rating.average * 10 : null,
            episodes: null,
            nextAiring: null,
            type: 'TV'
        }));
    } catch (error) {
        console.error("TVmaze API Error:", error);
        return [];
    }
};

export const getTVDetails = async (id) => {
    try {
        const response = await client.get(`/shows/${id}?embed[]=cast&embed[]=nextepisode`);
        const show = response.data;

        return {
            id: `tvmaze-${show.id}`,
            originalId: show.id,
            source: 'tvmaze',
            title: show.name,
            nativeTitle: null,
            image: show.image?.original || show.image?.medium,
            banner: null,
            description: show.summary,
            status: show.status,
            score: show.rating?.average ? show.rating.average * 10 : null,
            episodes: null, // TVmaze total episodes require a different endpoint or calc, leaving null for now
            genres: show.genres,
            studios: show.network ? [show.network.name] : (show.webChannel ? [show.webChannel.name] : []),
            startDate: show.premiered,
            nextAiring: show._embedded?.nextepisode ? new Date(show._embedded.nextepisode.airstamp).getTime() / 1000 : null,
            nextEpisode: show._embedded?.nextepisode?.season ? `S${show._embedded.nextepisode.season}E${show._embedded.nextepisode.number}` : null,
            type: 'TV'
        };
    } catch (error) {
        console.error("TVmaze API Details Error:", error);
        return null;
    }
};
