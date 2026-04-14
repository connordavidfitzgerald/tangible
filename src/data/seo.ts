import metaImage from '@images/thumbnail-preview.jpg';

export const defaultSeo: Seo = {
    title: 'Tangible',
    description: 'Concrétisez votre leadership authentique',
    social: {
        facebook: {
            title: 'Tangible',
            image: {
                url: metaImage.src
            },
            description: 'Concrétisez votre leadership authentique'
        }
    },
    advanced: {
        robots: ['noindex', 'nofollow'],
        canonical: 'https://locomotive.ca'
    }
};
