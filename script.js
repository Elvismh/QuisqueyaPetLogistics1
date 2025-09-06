// ---------- Utilidades ----------
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

// ---------- Navegación móvil ----------
(() => {
  const toggle = $('.nav-toggle');
  const nav = $('#mainNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
})();

// ---------- Botón volver arriba (flotante y del footer) ----------
(() => {
  const back = $('#backtop');
  const footerBack = $('#footerBackTop');

  // si no existe en esta página, no hacemos nada
  if (!back && !footerBack) return;

  const goTop = e => { e && e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  if (back) {
    const toggleBack = () => back.classList.toggle('show', window.scrollY > 400);
    window.addEventListener('scroll', toggleBack, { passive: true });
    toggleBack();
    back.addEventListener('click', goTop);
  }
  if (footerBack) footerBack.addEventListener('click', goTop);
})();

// ---------- Slider portada (home) ----------
(() => {
  const hero = $('.hero');
  const bg = $('.hero-bg');
  if (!hero || !bg) return; // esta página no tiene slider

  // RUTAS (ajústalas a tu carpeta de imágenes)
  const images = [
    'assets/hero/hero-1.webp',
    'assets/hero/hero-2.webp',
    'assets/hero/hero-3.webp'
  ];

  // crea las slides una sola vez
  bg.innerHTML = '';
  images.forEach(src => {
    const d = document.createElement('div');
    d.className = 'slide';
    d.style.backgroundImage = `url("${src}")`;
    bg.appendChild(d);
  });

  const slides = $$('.slide', bg);
  let i = 0;
  const show = idx => slides.forEach((s, k) => s.classList.toggle('show', k === idx));

  if (slides.length) show(0);
  if (slides.length > 1) {
    setInterval(() => {
      i = (i + 1) % slides.length;
      show(i);
    }, 6000);
  }
})();

// ---------- Tabs (página de Requisitos) ----------
(() => {
  const tabs = $$('.tabs .tab');
  const panels = $$('.tab-panel');
  if (!tabs.length || !panels.length) return;

  const activate = id => {
    tabs.forEach(t => {
      const active = t.dataset.tab === id;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach(p => {
      const show = p.id === id;
      p.classList.toggle('active', show);
      p.toggleAttribute('hidden', !show);
      p.setAttribute('aria-hidden', show ? 'false' : 'true');
    });
  };

  tabs.forEach(b => b.addEventListener('click', () => activate(b.dataset.tab)));
})();
