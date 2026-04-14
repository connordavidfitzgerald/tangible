import { toDash } from '@scripts/utils/string';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import Swup from 'swup';
import { Scroll } from '@scripts/classes/Scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class Transitions {
    static readonly READY_CLASS = 'is-ready';
    static readonly TRANSITION_CLASS = 'is-transitioning';

    private onVisitStartBind: any;
    private beforeContentReplaceBind: any;
    private onContentReplaceBind: any;
    private onAnimationInEndBind: any;
    private onAnimationOutStartBind: any;

    private swup: Swup | undefined;

    private oldCloneWrapper: HTMLElement | null = null;

    constructor() {
        this.onVisitStartBind = this.onVisitStart.bind(this);
        this.beforeContentReplaceBind = this.beforeContentReplace.bind(this);
        this.onContentReplaceBind = this.onContentReplace.bind(this);
        this.onAnimationInEndBind = this.onAnimationInEnd.bind(this);
        this.onAnimationOutStartBind = this.onAnimationOutStart.bind(this);
    }

    // =============================================================================
    // Lifecycle
    // =============================================================================
    init() {
        this.initSwup();

        requestAnimationFrame(() => {
            document.documentElement.classList.add(Transitions.READY_CLASS);
        });

        // Simulate Astro's native view transitions event on initial load
        // so integrations like astro-integration-lottie flip their 'isFirstTime' flag.
        window.addEventListener('load', () => {
            document.dispatchEvent(new Event('astro:page-load'));
        });
    }

    destroy() {
        this.swup?.destroy();
    }

    // =============================================================================
    // Methods
    // =============================================================================
    initSwup() {
        this.swup = new Swup({
            containers: ['#swup', 'nav-bar', '#footer'],
            animateHistoryBrowsing: true,
            plugins: [
                new SwupHeadPlugin({
                    persistAssets: true,
                    awaitAssets: true
                }),
                new SwupPreloadPlugin({
                    preloadHoveredLinks: true,
                    preloadInitialPage: !import.meta.env.DEV
                }),
                new SwupScriptsPlugin()
            ]
        });

        this.swup.hooks.on('visit:start', this.onVisitStartBind);
        this.swup.hooks.before('content:replace', this.beforeContentReplaceBind);
        this.swup.hooks.on('content:replace', this.onContentReplaceBind);
        this.swup.hooks.on('animation:in:end', this.onAnimationInEndBind);
        this.swup.hooks.on('animation:out:start', this.onAnimationOutStartBind);

        this.swup.hooks.replace('animation:out:await', async (visit, args, defaultHandler) => {
            // We resolve immediately because the 'out' animation is already handled
            // on the clone in `onVisitStart`, and runs concurrently while Swup fetches.
            return Promise.resolve();
        });

        this.swup.hooks.replace('animation:in:await', async (visit, args, defaultHandler) => {
            return new Promise<void>((resolve) => {
                const tl = gsap.timeline({
                    onComplete: () => {
                        if (this.oldCloneWrapper) {
                            this.oldCloneWrapper.remove();
                            this.oldCloneWrapper = null;
                        }
                        resolve();
                    }
                });

                // Prepare new content sliding up
                gsap.set('#swup', {
                    y: '100vh',
                    scale: 1,
                    opacity: 1,
                    zIndex: 10,
                    position: 'relative'
                });

                // Sync the clone's scale down with the new page sliding up
                if (this.oldCloneWrapper) {
                    tl.to(
                        this.oldCloneWrapper,
                        {
                            scale: 0.95,
                            delay: 0.1,
                            opacity: 1,
                            duration: 1.2,
                            ease: 'power2.out'
                        },
                        0
                    );
                }

                tl.to(
                    '#swup',
                    {
                        y: 0,
                        scale: 1,
                        delay: 0.1,
                        duration: 1.2,
                        ease: 'power2.inOut',
                        clearProps: 'all'
                    },
                    0
                );
            });
        });

        this.swup.hooks.on('fetch:error', (e) => {
            console.log('fetch:error:', e);
            debugger;
        });
        this.swup.hooks.on('fetch:timeout', (e) => {
            console.log('fetch:timeout:', e);
            debugger;
        });
    }

    /**
     * Retrieve HTML dataset on next container and update our real html element dataset accordingly
     *
     * @param visit: VisitType
     */
    updateDocumentAttributes(visit: VisitType) {
        if (visit.fragmentVisit) return;

        const parser = new DOMParser();
        const nextDOM = parser.parseFromString(visit.to.html, 'text/html');
        const newDataset = {
            ...nextDOM.querySelector('html')?.dataset
        };

        Object.entries(newDataset).forEach(([key, val]) => {
            document.documentElement.setAttribute(`data-${toDash(key)}`, val ?? '');
        });
    }

    // =============================================================================
    // Hooks
    // =============================================================================

    /**
     * On visit:start
     * Transition to a new page begins
     *
     * @see https://swup.js.org/hooks/#visit-start
     * @param visit: VisitType
     */
    onVisitStart() {
        document.documentElement.classList.add(Transitions.TRANSITION_CLASS);
        document.documentElement.classList.remove(Transitions.READY_CLASS);

        // Setup an overlapping clone
        const swupEl = document.querySelector('#swup') as HTMLElement;
        if (swupEl) {
            const rect = swupEl.getBoundingClientRect();

            const cloneWrapper = document.createElement('div');
            cloneWrapper.id = 'swup-clone-wrapper';
            cloneWrapper.style.position = 'fixed';
            cloneWrapper.style.top = '0';
            cloneWrapper.style.left = '0';
            cloneWrapper.style.width = '100vw';
            cloneWrapper.style.height = '100vh';
            cloneWrapper.style.zIndex = '1';
            cloneWrapper.style.overflow = 'hidden';
            cloneWrapper.style.pointerEvents = 'none';

            const oldClone = swupEl.cloneNode(true) as HTMLElement;
            oldClone.id = 'swup-clone';

            // Remove data-lottie attributes so the clone doesn't get double-initialized by astro-integration-lottie
            oldClone.querySelectorAll('[data-lottie]').forEach((el) => {
                el.removeAttribute('data-lottie');
            });

            oldClone.style.position = 'absolute';
            oldClone.style.top = rect.top + 'px';
            oldClone.style.left = rect.left + 'px';
            oldClone.style.width = rect.width + 'px';
            oldClone.style.height = rect.height + 'px';
            oldClone.style.margin = '0';

            cloneWrapper.appendChild(oldClone);
            document.body.appendChild(cloneWrapper);

            this.oldCloneWrapper = cloneWrapper;

            // Hide the real element - it's replaced by the clone visually right now
            swupEl.style.opacity = '0';

            // Start a slow scale down immediately
            gsap.to(this.oldCloneWrapper, {
                scale: 0.95,
                duration: 2,
                ease: 'power2.out'
            });
        }
    }

    /**
     * On before:content:replace
     * The old content of the page is replaced by the new content.
     *
     * @see https://swup.js.org/hooks/#content-replace
     * @param visit: VisitType
     */
    beforeContentReplace() {
        Scroll?.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
    }

    /**
     * On content:replace
     * The old content of the page is replaced by the new content.
     *
     * @see https://swup.js.org/hooks/#content-replace
     * @param visit: VisitType
     */
    onContentReplace(visit: VisitType) {
        Scroll?.init();
        this.updateDocumentAttributes(visit);
        ScrollTrigger.refresh();
        document.dispatchEvent(new CustomEvent('page:init'));

        // Trigger Astro integrations setup for new content (e.g. Lottie)
        document.dispatchEvent(new Event('astro:page-load'));
    }

    /**
     * On animation:out:start
     * Current content starts animating out. Class `.is-animating` is added.
     *
     * @see https://swup.js.org/hooks/#animation-out-start
     * @param visit: VisitType
     */
    onAnimationOutStart() {}

    /**
     * On animation:in:end
     * New content finishes animating out.
     *
     * @see https://swup.js.org/hooks/#animation-in-end
     * @param visit: VisitType
     */
    onAnimationInEnd() {
        document.documentElement.classList.remove(Transitions.TRANSITION_CLASS);
        document.documentElement.classList.add(Transitions.READY_CLASS);
        ScrollTrigger.refresh();
    }
}
