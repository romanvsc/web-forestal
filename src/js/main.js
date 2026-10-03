import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { setupHomeMotion, setupHomeVideo } from './home';

gsap.registerPlugin(ScrollTrigger);
document.body.classList.add('has-js');

function setupNavigation() {
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-site-menu]');
  if (!header || !toggle || !menu) return;

  const close = ({ returnFocus = false } = {}) => {
    header.dataset.menuOpen = 'false';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    header.dataset.menuOpen = String(!isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Abrir menú de navegación' : 'Cerrar menú de navegación');
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });

  document.addEventListener('pointerdown', (event) => {
    if (toggle.getAttribute('aria-expanded') === 'true' && !header.contains(event.target)) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      close({ returnFocus: true });
    }
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) close();
  });
}

function setupContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submitButton = form.querySelector('[data-submit-button]');
  const submitLabel = form.querySelector('[data-submit-label]');
  const defaultLabel = submitLabel.textContent;
  const fields = [...form.querySelectorAll('[data-contact-field]')];
  const fieldNames = ['nombre', 'email', 'mensaje'];
  const initialParams = new URLSearchParams(window.location.search);
  let sending = false;
  const serviceLabels = {
    'cosecha-forestal': 'Cosecha forestal',
    'transporte-forestal': 'Transporte forestal',
    'aprovechamiento-biomasa-forestal': 'Aprovechamiento de biomasa forestal',
    'playas-de-acopio': 'Playas de acopio en industria',
    'caminos-forestales': 'Caminos forestales',
    'consultoria-forestal': 'Consultoría forestal',
  };

  const contextualService = serviceLabels[initialParams.get('servicio')];
  const messageField = form.elements.namedItem('mensaje');
  if (contextualService && messageField && !messageField.value) {
    messageField.value = `Hola, quisiera recibir información sobre ${contextualService}.`;
  }

  const showStatus = (message, state = 'success') => {
    status.textContent = message;
    status.dataset.state = state;
    status.hidden = false;
  };

  const setFieldError = (name, message) => {
    const field = form.elements.namedItem(name);
    const error = form.querySelector(`[data-field-error="${name}"]`);
    if (!field || !error) return;
    field.setAttribute('aria-invalid', 'true');
    error.textContent = message;
    error.hidden = false;
  };

  const clearFieldError = (field) => {
    field.removeAttribute('aria-invalid');
    const error = form.querySelector(`[data-field-error="${field.name}"]`);
    if (error) {
      error.textContent = '';
      error.hidden = true;
    }
  };

  fields.forEach((field) => field.addEventListener('input', () => clearFieldError(field)));
  form.addEventListener('invalid', (event) => {
    const field = event.target;
    if (!fields.includes(field)) return;
    setFieldError(field.name, field.validity.valueMissing ? 'Complete este campo.' : 'Escriba una dirección de correo válida.');
    showStatus('Revise los campos señalados.', 'error');
  }, true);

  if (initialParams.get('contacto') === 'enviado') {
    showStatus('El envío fue aceptado. Gracias por comunicarse con Forestal Garuhapé SA.');
  } else if (initialParams.get('contacto') === 'error') {
    showStatus('No se pudo enviar la consulta. Inténtelo nuevamente o utilice los datos de contacto.', 'error');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    fields.forEach(clearFieldError);
    if (!form.reportValidity()) return;
    sending = true;

    status.hidden = true;
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitLabel.textContent = 'Enviando…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
        credentials: 'same-origin',
      });
      const result = await response.json();

      if (response.status === 200 && result.ok === true) {
        form.reset();
        fields.forEach(clearFieldError);
        showStatus('El envío fue aceptado. Gracias por comunicarse con Forestal Garuhapé SA.');
        status.focus();
        return;
      }

      if (response.status === 422 && result.fieldErrors && typeof result.fieldErrors === 'object') {
        for (const name of fieldNames) {
          if (result.fieldErrors[name]) setFieldError(name, result.fieldErrors[name]);
        }
        const firstInvalid = fields.find((field) => field.getAttribute('aria-invalid') === 'true');
        showStatus('Revise los campos señalados y vuelva a intentar.', 'error');
        (firstInvalid ?? status).focus();
        return;
      }

      showStatus('No pudimos enviar la consulta. Puede escribir a secretaria@forestalgaruhape.com.ar.', 'error');
      status.focus();
    } catch {
      showStatus('No pudimos confirmar el envío. Sus datos siguen en el formulario; compruebe su conexión antes de volver a intentar.', 'error');
      status.focus();
    } finally {
      sending = false;
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitLabel.textContent = defaultLabel;
    }
  });
}

function setupHeroVideo() {
  const media = document.querySelector('[data-hero-media]');
  if (!media) return;

  const poster = media.querySelector('[data-hero-poster]');
  const video = media.querySelector('[data-hero-video]');
  const button = media.querySelector('[data-hero-play]');
  const status = media.querySelector('[data-video-status]');
  if (!poster || !video || !button) return;

  button.addEventListener('click', () => {
    if (button.disabled) return;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    status.textContent = 'Cargando video de la operación forestal.';
    video.querySelectorAll('[data-video-source]').forEach((source) => {
      source.src = source.dataset.src;
    });
    video.hidden = false;
    video.load();

    video.addEventListener('loadeddata', async () => {
      poster.hidden = true;
      button.hidden = true;
      button.disabled = false;
      button.removeAttribute('aria-busy');
      video.focus();
      try {
        await video.play();
        status.textContent = 'Video en reproducción. Use los controles para pausar o ajustar el audio.';
      } catch {
        status.textContent = 'El video está listo. Use los controles para reproducirlo.';
      }
    }, { once: true });

    video.addEventListener('error', () => {
      video.hidden = true;
      button.disabled = false;
      button.removeAttribute('aria-busy');
      status.textContent = 'El video no está disponible. La imagen de la operación sigue visible.';
    }, { once: true });
  });
}

function setupStory() {
  const scene = document.querySelector('[data-story-scene]');
  const track = document.querySelector('[data-story-track]');
  if (!scene || !track) return;

  const frames = [...scene.querySelectorAll('[data-story-frame]')];
  const chapters = [...track.querySelectorAll('[data-story-step]')];
  const caption = scene.querySelector('[data-story-caption]');
  if (frames.length < 2 || chapters.length !== frames.length) return;

  const media = gsap.matchMedia();
  media.add('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const lenis = new Lenis({ smoothWheel: true, syncTouch: false, anchors: true, respectReducedMotion: true });
    const updateScroll = (time) => lenis.raf(time * 1000);
    const setCaption = (index) => {
      if (caption) caption.textContent = `${String(index + 1).padStart(2, '0')} — ${chapters[index].dataset.storyTitle}`;
    };

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);

    const sequence = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.3,
        invalidateOnRefresh: true,
      },
    });

    sequence.to(frames[0], { scale: 1.04, duration: 1, ease: 'none' }, 0);
    for (let index = 1; index < frames.length; index += 1) {
      const transitionAt = (index / frames.length) - 0.08;
      sequence.to(frames[index - 1], { autoAlpha: 0, duration: 0.16, ease: 'none' }, transitionAt);
      sequence.fromTo(frames[index], { autoAlpha: 0, scale: 1 }, { autoAlpha: 1, scale: 1.04, duration: 0.2, ease: 'none' }, transitionAt);
    }

    chapters.forEach((chapter, index) => {
      ScrollTrigger.create({
        trigger: chapter,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setCaption(index),
        onEnterBack: () => setCaption(index),
      });
    });
    setCaption(0);
    document.body.classList.add('has-story-motion');
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.body.classList.remove('has-story-motion');
      gsap.ticker.remove(updateScroll);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  });
}

function setupImageParallax() {
  const frames = [...document.querySelectorAll('[data-parallax-frame]')];
  if (frames.length === 0) return;

  const media = gsap.matchMedia();
  media.add('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    frames.forEach((frame) => {
      const image = frame.querySelector('img');
      if (!image) return;

      // The 12% overscan covers the 5% travel at both ends of the fixed frame.
      // matchMedia reverts transforms and ScrollTriggers when this context ends.
      gsap.fromTo(image, { yPercent: -5, scale: 1.12 }, {
        yPercent: 5,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: frame,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
  });
}

function setupPageIntroduction() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const intro = document.querySelector('.hero-copy, .page-intro .site-container, .career-copy');
  if (!intro) return;
  const parts = [...intro.children];
  if (parts.length === 0) return;
  gsap.from(parts, {
    autoAlpha: 0,
    y: 8,
    duration: 0.42,
    stagger: 0.055,
    ease: 'power2.out',
    clearProps: 'all',
  });
}

function setCurrentYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = year; });
}

setupNavigation();
setupContactForm();
setupHeroVideo();
setupHomeVideo();
setupHomeMotion(gsap, ScrollTrigger, Lenis);
setupStory();
setupImageParallax();
setupPageIntroduction();
setCurrentYear();
