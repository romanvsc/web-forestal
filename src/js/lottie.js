// Lottie is loaded on demand: the runtime is a separate chunk fetched only when a page has
// [data-lottie] elements, and each animation starts when it enters the viewport.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let runtime;

const loadRuntime = () => {
  runtime ??= import('lottie-web/build/player/lottie_light').then((module) => module.default ?? module);
  return runtime;
};

async function mount(node) {
  let animation;
  try {
    const lottie = await loadRuntime();
    animation = lottie.loadAnimation({
      container: node,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: `/animations/${node.dataset.lottie}.json`,
      rendererSettings: { preserveAspectRatio: 'xMidYMid meet', progressiveLoad: false },
    });
  } catch (error) {
    console.warn('No se pudo cargar la animación; el contenido sigue disponible sin ella.', error);
    return null;
  }
  animation.addEventListener('data_failed', () => node.replaceChildren());
  // Reduced motion shows the finished drawing instead of playing it.
  animation.addEventListener('DOMLoaded', () => {
    if (reducedMotion.matches) animation.goToAndStop(animation.totalFrames - 1, true);
    node.dataset.lottieReady = 'true';
  });
  return animation;
}

export function setupLottie(root = document) {
  const nodes = [...root.querySelectorAll('[data-lottie]:not([data-lottie-bound])')];
  if (!nodes.length) return;
  const observer = new IntersectionObserver((entries) => entries.forEach(async (entry) => {
    if (!entry.isIntersecting) return;
    observer.unobserve(entry.target);
    const node = entry.target;
    const animation = await mount(node);
    if (!animation || reducedMotion.matches) return;
    const delay = Number(node.dataset.lottieDelay ?? 0);
    const play = () => window.setTimeout(() => animation.play(), delay);
    if (node.dataset.lottieReady === 'true') play();
    else animation.addEventListener('DOMLoaded', play, { once: true });
  }), { threshold: 0.5 });
  nodes.forEach((node) => { node.dataset.lottieBound = 'true'; observer.observe(node); });
}

// Plays a one-off animation inside a freshly inserted element (e.g. the form confirmation).
export function playLottie(node) {
  node.dataset.lottieBound = 'true';
  return mount(node).then((animation) => {
    if (!animation) return;
    if (reducedMotion.matches) return;
    const start = () => animation.play();
    if (node.dataset.lottieReady === 'true') start();
    else animation.addEventListener('DOMLoaded', start, { once: true });
  });
}
