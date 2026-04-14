import { gsap } from 'gsap';

class HandsAnimation extends HTMLElement {
    private ctx: gsap.Context | undefined;

    connectedCallback() {
        // Defer to the next frame to guarantee that Swup DOM injections
        // and layouts have fully resolved before GSAP sets up animations.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.initAnimation();
            });
        });
    }

    initAnimation() {
        this.ctx?.revert();

        const svg = this.querySelector('svg');
        if (!svg) return;

        const ripples = svg.querySelectorAll('.ripple-arc');
        if (!ripples.length) return;

        this.ctx = gsap.context(() => {
            const cycleDuration = 2;
            const stagger = 0.1;

            ripples.forEach((el, i) => {
                gsap.set(el, { svgOrigin: '335.5 211.5' });

                gsap.fromTo(
                    el,
                    { scale: 1, opacity: 1 },
                    {
                        scale: 1.1,
                        opacity: 1,
                        duration: cycleDuration,
                        ease: 'power3.Out',
                        repeat: -1,
                        yoyo: true,
                        delay: i * stagger
                    }
                );
            });
        });
    }

    disconnectedCallback() {
        this.ctx?.revert();
    }
}

if (!customElements.get('hands-animation')) {
    customElements.define('hands-animation', HandsAnimation);
}

export { HandsAnimation };
