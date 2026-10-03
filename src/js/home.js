const desktopMotion = '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export function setupHomeVideo() {
  const hero = document.querySelector('[data-home-hero]');
  if (!hero) return;
  const video = hero.querySelector('[data-home-video-element]');
  const toggle = hero.querySelector('[data-home-video-toggle]');
  const label = hero.querySelector('[data-home-video-label]');
  const status = hero.querySelector('[data-home-video-status]');
  const header = document.querySelector('[data-site-header]');
  const eligibility = window.matchMedia(desktopMotion);
  let visible = true;
  let userPaused = false;
  let enabled = false;
  let failed = false;
  let revision = 0;

  const updateControl = () => {
    const paused = video.paused;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', `${paused ? 'Reproducir' : 'Pausar'} video de la operación forestal`);
    label.textContent = paused ? 'Reproducir video' : 'Pausar video';
  };
  const fallback = (reason = 'media-error') => {
    failed = true;
    video.dataset.fallbackReason = reason;
    video.dataset.mediaError = video.error ? `${video.error.code}: ${video.error.message}` : '';
    video.pause();
    video.hidden = true;
    if (document.activeElement === toggle) hero.querySelector('.home-scroll-link').focus();
    toggle.hidden = true;
    status.textContent = 'La imagen de la operación sigue visible. El video no está disponible.';
    video.querySelectorAll('source').forEach((source) => source.removeAttribute('src'));
    video.load();
  };
  const reconcilePlayback = async () => {
    if (!enabled || failed || userPaused || !visible || document.hidden) {
      video.pause();
      updateControl();
      return;
    }
    const currentRevision = revision;
    try {
      await video.play();
      if (currentRevision !== revision || !enabled || userPaused || !visible || document.hidden) video.pause();
    } catch (error) {
      // Pause during a visibility/size change can abort an outstanding play.
      if (currentRevision === revision && enabled && visible && !document.hidden && !userPaused && error.name !== 'AbortError') fallback(`play-${error.name}`);
    }
    updateControl();
  };
  const configure = () => {
    const nextEnabled = eligibility.matches && !navigator.connection?.saveData;
    if (enabled === nextEnabled) return;
    enabled = nextEnabled;
    revision += 1;
    if (enabled) {
      failed = false;
      video.muted = true;
      video.hidden = false;
      delete video.dataset.ready;
      video.querySelectorAll('source').forEach((source) => { source.src = source.dataset.src; });
      video.load();
      reconcilePlayback();
    } else {
      video.pause();
      delete video.dataset.ready;
      video.hidden = true;
      if (document.activeElement === toggle) hero.querySelector('.home-scroll-link').focus();
      toggle.hidden = true;
      video.querySelectorAll('source').forEach((source) => source.removeAttribute('src'));
      video.load();
    }
  };
  video.addEventListener('playing', () => {
    if (!enabled || failed) return;
    video.hidden = false;
    video.dataset.ready = 'true';
    toggle.hidden = false;
    updateControl();
  });
  video.addEventListener('pause', updateControl);
  video.addEventListener('error', () => {
    if (!enabled || failed) return;
    fallback();
  });
  toggle.addEventListener('click', () => {
    userPaused = !video.paused;
    reconcilePlayback();
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    reconcilePlayback();
  }, { threshold: 0 }).observe(hero);
  // Header behavior stays independent of the animation engine.
  const updateHeader = () => { header.dataset.overHero = String(hero.getBoundingClientRect().bottom > header.offsetHeight); };
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader, { passive: true });
  document.addEventListener('visibilitychange', reconcilePlayback);
  eligibility.addEventListener('change', configure);
  navigator.connection?.addEventListener('change', configure);
  updateHeader();
  configure();
}

export function setupHomeMotion(gsap, ScrollTrigger, Lenis) {
  const operation = document.querySelector('[data-home-operation]');
  if (!operation) return;
  const stage = operation.querySelector('[data-operation-stage]');
  const track = operation.querySelector('[data-operation-track]');
  const frames = [...operation.querySelectorAll('[data-operation-frame]')];
  const chapters = [...operation.querySelectorAll('[data-operation-chapter]')];
  const caption = operation.querySelector('[data-operation-caption]');
  if (frames.length !== 6 || chapters.length !== frames.length) return;
  gsap.matchMedia().add(desktopMotion, () => {
    let lenis;
    const tick = (time) => lenis.raf(time * 1000);
    try {
      lenis = new Lenis({ smoothWheel: true, syncTouch: false, anchors: { immediate: true }, respectReducedMotion: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.body.classList.add('has-home-motion');
      const sequence = gsap.timeline({ scrollTrigger: {
        trigger: track,
        start: 'top 55%',
        end: 'bottom 55%',
        scrub: .9,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.min(5, Math.floor(self.progress * 6));
          caption.textContent = `${String(index + 1).padStart(2, '0')} — ${chapters[index].dataset.operationTitle}`;
        },
      }});
      gsap.set(frames, { autoAlpha: 0 });
      gsap.set(frames[0], { autoAlpha: 1 });
      frames.forEach((frame, index) => {
        const image = frame.querySelector('img');
        if (index > 0) {
          // Keep the outgoing photograph opaque under the incoming frame: no dark flash.
          sequence.to(frame, { autoAlpha: 1, duration: .65, ease: 'sine.inOut' }, index - .25);
          sequence.set(frames[index - 1], { autoAlpha: 0 }, index + .4);
        }
        sequence.fromTo(image, { scale: 1.02 }, { scale: 1.05, duration: 1.25, ease: 'none' }, Math.max(0, index - .25));
        if (index === 0) sequence.fromTo(frame, { clipPath: 'inset(8% 6% 8% 6%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: .65, ease: 'none' }, 0);
        if (index === 1) sequence.fromTo(frame, { clipPath: 'inset(0% 0% 0% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: .3, ease: 'none' }, index);
        if (index === 3) sequence.fromTo(image, { yPercent: -1.5 }, { yPercent: 1.5, duration: 1.25, ease: 'none' }, index - .25);
      });
      const hero = document.querySelector('[data-home-hero]');
      // The montage already provides motion. Keep its canvas fixed to avoid competing zooms.
      gsap.to(hero.querySelector('[data-home-hero-copy]'), { y: -24, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .9 } });
      document.querySelectorAll('[data-home-parallax]').forEach((frame) => {
        gsap.fromTo(frame.querySelector('img'), { yPercent: -3, scale: 1.08 }, { yPercent: 3, scale: 1.08, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: .3 } });
      });
      document.querySelectorAll('[data-sgc-moment]').forEach((moment) => {
        gsap.fromTo(moment.children, { y: 20, opacity: .6 }, { y: 0, opacity: 1, duration: .4, stagger: .06, scrollTrigger: { trigger: moment, start: 'top 80%', toggleActions: 'play none none reverse' } });
      });
      const map = document.querySelector('[data-home-map]');
      gsap.fromTo(map, { y: 20, opacity: .8 }, { y: 0, opacity: 1, duration: .45, scrollTrigger: { trigger: map, start: 'top 85%', toggleActions: 'play none none reverse' } });
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    } catch (error) {
      document.body.classList.remove('has-home-motion');
      gsap.ticker.remove(tick);
      lenis?.destroy();
      console.warn('La operación se presenta en su versión estática.', error);
    }
    return () => {
      document.body.classList.remove('has-home-motion');
      delete stage.dataset.kind;
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.destroy();
    };
  });
}
