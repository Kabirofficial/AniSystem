import axios from 'axios';

const ANILIST_API_URL = 'https://graphql.anilist.co';

const client = axios.create({
  baseURL: ANILIST_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const searchAnime = async (query, page = 1) => {
  const gqlQuery = `
    query ($search: String, $page: Int) {
      Page(page: $page, perPage: 20) {
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            extraLarge
          }
          bannerImage
          description
          status
          averageScore
          episodes
          nextAiringEpisode {
            airingAt
            episode
          }
          genres
        }
      }
    }
  `;

  try {
    const response = await client.post('', {
      query: gqlQuery,
      variables: { search: query, page },
    });

    return response.data.data.Page.media.map(item => ({
      id: `anilist-${item.id}`,
      originalId: item.id,
      source: 'anilist',
      title: item.title.english || item.title.romaji,
      image: item.coverImage.extraLarge || item.coverImage.large,
      banner: item.bannerImage,
      description: item.description,
      status: item.status, // RELEASING, FINISHED, etc.
      score: item.averageScore,
      episodes: item.episodes,
      nextAiring: item.nextAiringEpisode ? item.nextAiringEpisode.airingAt : null,
      nextEpisode: item.nextAiringEpisode ? item.nextAiringEpisode.episode : null,
      genres: item.genres,
      type: 'ANIME'
    }));
  } catch (error) {
    console.error("AniList API Error:", error);
    return [];
  }
};

export const getTrendingAnime = async (page = 1) => {
  const gqlQuery = `
    query ($page: Int) {
      Page(page: $page, perPage: 12) {
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
            extraLarge
          }
          bannerImage
          description
          status
          averageScore
          episodes
           nextAiringEpisode {
            airingAt
            episode
          }
        }
      }
    }
  `;
  try {
    const response = await client.post('', {
      query: gqlQuery,
      variables: { page },
    });

    return response.data.data.Page.media.map(item => ({
      id: `anilist-${item.id}`,
      originalId: item.id,
      source: 'anilist',
      title: item.title.english || item.title.romaji,
      image: item.coverImage.extraLarge || item.coverImage.large,
      banner: item.bannerImage,
      description: item.description,
      status: item.status,
      score: item.averageScore,
      episodes: item.episodes,
      nextAiring: item.nextAiringEpisode ? item.nextAiringEpisode.airingAt : null,
      nextEpisode: item.nextAiringEpisode ? item.nextAiringEpisode.episode : null,
      type: 'ANIME'
    }));
  } catch (error) {
    console.error("AniList API Error:", error);
    return [];
  }
}

export const getAnimeDetails = async (id) => {
  const gqlQuery = `
    query ($id: Int) {
      Media (id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
        bannerImage
        description
        status
        averageScore
        episodes
        genres
        studios(isMain: true) {
            nodes {
                name
            }
        }
        startDate {
            year
            month
            day
        }
        nextAiringEpisode {
          airingAt
          episode
        }
      }
    }
  `;

  try {
    const response = await client.post('', {
      query: gqlQuery,
      variables: { id },
    });

    const item = response.data.data.Media;
    return {
      id: `anilist-${item.id}`,
      originalId: item.id,
      source: 'anilist',
      title: item.title.english || item.title.romaji,
      nativeTitle: item.title.native,
      image: item.coverImage.extraLarge,
      banner: item.bannerImage,
      description: item.description,
      status: item.status,
      score: item.averageScore,
      episodes: item.episodes,
      genres: item.genres,
      studios: item.studios?.nodes?.map(n => n.name) || [],
      startDate: item.startDate.year ? `${item.startDate.year}-${item.startDate.month}-${item.startDate.day}` : null,
      nextAiring: item.nextAiringEpisode ? item.nextAiringEpisode.airingAt : null,
      nextEpisode: item.nextAiringEpisode ? item.nextAiringEpisode.episode : null,
      type: 'ANIME'
    };
  } catch (error) {
    console.error("AniList API Details Error:", error);
    return null;
  }
};
