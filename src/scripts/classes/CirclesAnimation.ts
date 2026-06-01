import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class CirclesAnimation extends HTMLElement {
    private ctx: gsap.Context | undefined;
    private resizeTimer: ReturnType<typeof setTimeout> | undefined;

    private onResize = () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => this.initCircles(), 250);
    };

    initCircles() {
        document.fonts.ready.then(() => {
            requestAnimationFrame(() => {
                const wrapper = this.querySelector('.circles-wrapper');
                const c1 = this.querySelector('.c1') as HTMLElement | null;
                const c2 = this.querySelector('.c2') as HTMLElement | null;
                const c3 = this.querySelector('.c3') as HTMLElement | null;
                const y1 = this.querySelector('.y1');
                const y3 = this.querySelector('.y3');

                if (!c1 || !c2 || !c3 || !wrapper) return;

                this.ctx?.revert();
                this.ctx = gsap.context(() => {
                    const size = c1.offsetWidth;
                    const overlap = 0.25 * size;
                    const finalDist = size - overlap;

                    const c1Top = c1.offsetTop;
                    const c2Top = c2.offsetTop;
                    const c3Top = c3.offsetTop;

                    const c2Delta = c2Top - (c1Top + finalDist);
                    const c2FinalTop = c2Top - c2Delta;
                    const c3Delta = c3Top - (c2FinalTop + finalDist);
                    const mobileStart = () => (window.innerWidth < 768 ? 'top 70%' : 'top 40%');

                    gsap.set(y1, { top: finalDist, left: 0, y: overlap });
                    gsap.to(y1, {
                        y: 0,
                        duration: 1.4,
                        ease: 'power3.inOut',
                        scrollTrigger: {
                            trigger: c1,
                            start: mobileStart,
                            invalidateOnRefresh: true
                        }
                    });

                    gsap.to(c2, {
                        y: -c2Delta,
                        duration: 1.4,
                        ease: 'power3.inOut',
                        scrollTrigger: {
                            trigger: c1,
                            start: mobileStart,
                            invalidateOnRefresh: true
                        }
                    });

                    gsap.to(c3, {
                        y: -c3Delta,
                        duration: 1.4,
                        ease: 'power3.inOut',
                        scrollTrigger: {
                            trigger: c2,
                            start: mobileStart,
                            invalidateOnRefresh: true
                        }
                    });
                    gsap.set(y3, { top: -finalDist, left: 0, y: -overlap });
                    gsap.to(y3, {
                        y: 0,
                        duration: 1.4,
                        ease: 'power3.inOut',
                        scrollTrigger: {
                            trigger: c2,
                            start: mobileStart,
                            invalidateOnRefresh: true
                        }
                    });
                }, this);
            });
        });
    }

    connectedCallback() {
        this.initCircles();
        window.addEventListener('resize', this.onResize);
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.onResize);
        this.ctx?.revert();
        clearTimeout(this.resizeTimer);
    }
}

if (!customElements.get('circles-animation')) {
    customElements.define('circles-animation', CirclesAnimation);
}

export { CirclesAnimation };
