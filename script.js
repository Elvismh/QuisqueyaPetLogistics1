// ---------- Utilidades ----------
const $  = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

// ---------- Navegación móvil ----------
(() => {
  const toggle = $('.nav-toggle');
  const nav = $('#mainNav') || $('.nav');        // funciona en home y requisitos
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
})();

// ---------- Botón volver arriba (flotante y del footer) ----------
(() => {
  const backBtn    = $('#backtop');
  const footerBtn  = $('#footerBackTop');
  const anyTopLink = $$('.top'); // cualquier enlace con clase .top

  const goTop = e => { e && e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  if (backBtn) {
    const toggleBack = () => backBtn.classList.toggle('show', window.scrollY > 400);
    window.addEventListener('scroll', toggleBack, { passive: true });
    toggleBack();
    backBtn.addEventListener('click', goTop);
  }
  if (footerBtn) footerBtn.addEventListener('click', goTop);
  anyTopLink.forEach(a => a.addEventListener('click', goTop));
})();

// ---------- Slider portada (home) ----------
(() => {
  const bg = $('.hero-bg');
  if (!bg) return; // esta página no tiene slider

  // RUTAS corregidas (sin subcarpeta "hero")
  const images = [
    'assets/hero-1.webp',
    'assets/hero-2.webp',
    'assets/hero-3.webp'
  ];

  // crea las slides
  bg.innerHTML = '';
  images.forEach(src => {
    const d = document.createElement('div');
    d.className = 'slide';
    d.style.backgroundImage = `url("${src}")`;
    bg.appendChild(d);
  });
  const overlay = document.createElement('div');
  overlay.className = 'hero-overlay';
  bg.appendChild(overlay);

  const slides = $$('.slide', bg);
  let i = 0;
  const show = idx => slides.forEach((s, k) => s.classList.toggle('show', k === idx));

  if (slides.length) show(0);
  if (slides.length > 1) {
    setInterval(() => { i = (i + 1) % slides.length; show(i); }, 6000);
  }
})();

// ---------- Tabs (página de Requisitos) ----------
(() => {
  const tabs   = $$('.tabs .tab');
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

  // Permite abrir ya seleccionada por query ?dest=...
  const params = new URLSearchParams(location.search);
  const dest = params.get('dest');
  if (dest) {
    const btn = $(`.tabs .tab[data-tab="${dest}"]`);
    if (btn) btn.click();
  }
})();
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Swiper para el hero
  const heroSwiper = new Swiper('.hero-swiper', {
    effect: 'fade',
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    fadeEffect: {
      crossFade: true,
    },
  });

  // Iconos para el menú móvil (proporcionados a través del módulo lucide-html)
  const menuBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  // Inserta el icono de hamburguesa inicialmente
  if (typeof MenuIcon !== 'undefined' && typeof CloseIcon !== 'undefined') {
    menuBtn.innerHTML = MenuIcon({ size: 24 });
  }

  menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('hidden', !menuOpen);
    // Cambiar icono según el estado
    if (typeof MenuIcon !== 'undefined' && typeof CloseIcon !== 'undefined') {
      menuBtn.innerHTML = menuOpen
        ? CloseIcon({ size: 24 })
        : MenuIcon({ size: 24 });
    }
  });

  // Acordeones de requisitos
  document.querySelectorAll('[data-accordion-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-accordion-target');
      const content = document.getElementById(targetId);
      const isOpen = content.classList.contains('open');
      // Cerrar todos
      document.querySelectorAll('.accordion-content').forEach((el) => {
        el.classList.remove('open');
        el.previousElementSibling.querySelector('span:last-child').textContent = '+';
      });
      // Si estaba cerrado, abrirlo
      if (!isOpen) {
        content.classList.add('open');
        button.querySelector('span:last-child').textContent = '-';
      }
    });
  });
});
