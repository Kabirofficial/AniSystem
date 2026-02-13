import { Helmet } from 'react-helmet-async';

export const SEO = ({ title, description, image = '/logo.png', type = 'website' }) => {
    const siteTitle = 'AniSystem - Media Tracker';
    const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const finalDescription = description || 'Track your Anime and TV shows locally. No account needed. Privacy-first media tracking.';
    const currentUrl = window.location.href;

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={image} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};
