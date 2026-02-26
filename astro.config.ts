import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';
import postcssUtopia from 'postcss-utopia';
import postcssHelpersFunctions from '@locomotivemtl/postcss-helpers-functions';
import postcssTailwindShortcuts from '@locomotivemtl/postcss-tailwind-shortcuts';
import tailwindcss from '@tailwindcss/postcss';

const isProd = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
    site: 'https://connordavidfitzgerald.github.io/tangible/',
    vite: {
        css: {
            postcss: {
                plugins: [
                    tailwindcss(),
                    postcssUtopia(),
                    postcssHelpersFunctions(),
                    postcssTailwindShortcuts()
                ]
            }
        }
    },
    integrations: [
        icon({
            iconDir: './src/assets/svgs'
        })
    ],
    devToolbar: {
        enabled: false
    },
    image: {
        domains: ['locomotive.ca'],
        remotePatterns: [{ protocol: 'https' }]
    },
    experimental: {
        fonts: [
            {
                provider: 'local',
                name: 'PP Radio Grotesk',
                cssVariable: '--radio',
                fallbacks: ['sans-serif'],
                variants: [
                    {
                        weight: 300,
                        style: 'normal',
                        display: 'swap',
                        src: ['./src/assets/fonts/PPRadioGrotesk-Ultralight.woff']
                    },
                    {
                        weight: 400,
                        style: 'normal',
                        display: 'swap',
                        src: ['./src/assets/fonts/PPRadioGrotesk-Regular.woff']
                    },
                    {
                        weight: 700,
                        style: 'normal',
                        display: 'swap',
                        src: ['./src/assets/fonts/PPRadioGrotesk-Black.woff']
                    }
                ]
            },
            {
                provider: 'local',
                name: 'PP Formula',
                cssVariable: '--formula',
                fallbacks: ['sans-serif'],
                variants: [
                    {
                        weight: 700,
                        style: 'normal',
                        display: 'swap',
                        src: ['./src/assets/fonts/PPFormula-CondensedBold.woff']
                    }
                ]
            },
            {
                provider: 'local',
                name: 'PP Editorial New',
                cssVariable: '--editorial',
                fallbacks: ['serif'],
                variants: [
                    {
                        weight: 400,
                        style: 'normal',
                        display: 'swap',
                        src: ['./src/assets/fonts/PPEditorialNew-Ultralight.woff']
                    }
                ]
            }
        ]
    }
});
