import { desktopMotion, EASE_IN, EASE_MOVE, registerEases, createReveal, setupLightReveal, introSequence } from './motion-kit';

const LIGHT_TARGETS = '.service-card, .section-heading, .service-scope li, .sgc-card, .consulting-card, .capability-lists > div, .gallery-grid figure, .service-related, .detail-image, .company-grid > *, .career-layout > *';

// Page opening shared by every interior page.
export function setupPageIntroduction(gsap) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const intro = document.querySelector('.service-opening-copy, .hero-copy, .page-intro .site-container, .career-copy');
  if (!intro || !intro.children.length) return;
  registerEases(gsap);
  introSequence(gsap, intro);
  const media = document.querySelector('.service-opening-media img');
  if (media) gsap.fromTo(media, { scale: 1.1 }, { scale: 1, duration: 1.6, ease: EASE_IN, clearProps: 'transform' });
}

// Scroll reveals for interior pages: same vocabulary as the Home, played once.
export function setupInteriorMotion(gsap, ScrollTrigger) {
  if (document.querySelector('[data-home-operation]')) return;
  registerEases(gsap);
  setupLightReveal(gsap, LIGHT_TARGETS);
  gsap.matchMedia().add(desktopMotion, () => {
    const { lines, mask, batch } = createReveal(gsap);
    const arrive = (item, delay) => gsap.to(item, { autoAlpha: 1, y: 0, duration: .6, delay, ease: EASE_IN, clearProps: 'all' });

    document.querySelectorAll('.section-heading h2, .gallery-section h2, .service-related h2, .detail-copy h2, .career-copy h2').forEach((heading) => lines(heading, heading, 'top 88%'));
    document.querySelectorAll('.detail-image, .company-image').forEach((figure) => mask(figure));

    batch(ScrollTrigger, '.service-card', (card, delay) => {
      arrive(card, delay);
      const image = card.querySelector('.service-card-media img');
      if (image) gsap.fromTo(image, { scale: 1.12 }, { scale: 1, duration: 1.2, delay, ease: EASE_IN, clearProps: 'transform' });
    });
    batch(ScrollTrigger, '.service-scope li, .sgc-card, .consulting-card, .capability-lists > div, .gallery-grid figure, .service-related a', arrive);
    gsap.utils.toArray('.gallery-grid figure img').forEach((image) => {
      gsap.fromTo(image, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: EASE_MOVE, clearProps: 'transform', scrollTrigger: { trigger: image, start: 'top 92%', once: true } });
    });
  });
}
