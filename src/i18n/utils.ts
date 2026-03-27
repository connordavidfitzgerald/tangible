import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof (typeof ui)[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    };
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
        // Strip trailing and leading slashes for comparison and rebuilding
        path = path.replace(/^\//, '').replace(/\/$/, '');

        // Remove existing lang prefix if any
        if (path.startsWith('en/')) path = path.slice(3);
        if (path === 'en') path = '';

        const newPath = l === defaultLang ? `/${path}` : `/${l}/${path}`;

        // Return exactly '/' if the path is root
        if (newPath === '/' || newPath === '//') return '/';

        return newPath.replace(/\/$/, '');
    };
}
