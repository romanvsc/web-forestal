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
  const track = operation.querySelector('[data-operation-track]');
  const frames = [...operation.querySelectorAll('[data-operation-frame]')];
  const chapters = [...operation.querySelectorAll('[data-operation-chapter]')];
  const caption = operation.querySelector('[data-operation-caption]');
  if (frames.length < 2 || chapters.length !== frames.length) return;
  gsap.matchMedia().add(desktopMotion, () => {
    let lenis;
    const context = gsap.context(() => {});
    const tick = (time) => lenis.raf(time * 1000);
    try {
      lenis = new Lenis({ smoothWheel: true, syncTouch: false, anchors: { immediate: true }, respectReducedMotion: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.body.classList.add('has-home-motion');
      context.add(() => {
        gsap.set(frames, { autoAlpha: 0 });
        gsap.set(frames[0], { autoAlpha: 1 });
        const sequence = gsap.timeline({
          onUpdate() {
            const index = Math.min(chapters.length - 1, Math.floor(this.time()));
            caption.textContent = `${String(index + 1).padStart(2, '0')} — ${chapters[index].dataset.operationTitle}`;
          },
          scrollTrigger: { trigger: track, start: 'top center', end: 'bottom center', scrub: .6, invalidateOnRefresh: true },
        });
        // A full unit per scene keeps transitions aligned with semantic text blocks.
        sequence.to({}, { duration: chapters.length }, 0);
        frames.forEach((frame, index) => {
          if (index === 0) return;
          const start = index - 1 / 6;
          sequence.fromTo(frame, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 / 3, ease: 'sine.inOut' }, start);
          sequence.fromTo(frame.querySelector('img'), { yPercent: 12 }, { yPercent: 0, duration: 1 / 3, ease: 'sine.inOut' }, start);
          sequence.to(frames[index - 1], { autoAlpha: 0, duration: 1 / 3, ease: 'sine.inOut' }, start);
          sequence.to(frames[index - 1].querySelector('img'), { yPercent: -8, duration: 1 / 3, ease: 'sine.inOut' }, start);
        });
        document.querySelectorAll('[data-home-reveal]').forEach((section) => {
          gsap.from(section.children, { y: 20, opacity: .7, duration: .35, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' } });
        });
        document.fonts?.ready.then(() => { if (document.body.classList.contains('has-home-motion')) ScrollTrigger.refresh(); });
      });
    } catch (error) {
      context.revert();
      document.body.classList.remove('has-home-motion');
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.destroy();
      console.warn('La operación se presenta en su versión estática.', error);
    }
    return () => {
      context.revert();
      document.body.classList.remove('has-home-motion');
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.destroy();
    };
  });
}
