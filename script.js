// ================== Ajustes negocio ==================
const BUSINESS_EMAIL = "quisqueyapetlogistics@gmail.com"; // cambia si deseas
const BUSINESS_WHATS = "+18292673330";                     // cambia si deseas
// Opcional: endpoint Formspree (si lo usas). Si lo dejas "", no se usa.
const FORM_ENDPOINT  = ""; // p.ej. "https://formspree.io/f/abcd1234"

// ================== Mobile nav ==================
const toggle = document.querySelector('.nav-toggle');
const nav    = document.querySelector('.nav');
if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

// ================== Hero slider (.webp) ==================
(function(){
  const a = document.querySelector('.slide-a');
  const b = document.querySelector('.slide-b');
  if(!a || !b) return;

  const imgs = [
    'assets/hero-1.webp',
    'assets/hero-2.webp',
    'assets/hero-3.webp',
    'assets/hero-4.webp'
  ];

  // Preload
  imgs.forEach(src => { const i=new Image(); i.src=src; });

  let i = 0, usingA = true;
  const setBg = (el, url) => el.style.backgroundImage = `url('${url}')`;
  setBg(a, imgs[0]); a.classList.add('show');
  setBg(b, imgs[1]);

  setInterval(()=>{
    const next = imgs[(i+1) % imgs.length];
    if(usingA){ setBg(b,next); b.classList.add('show'); a.classList.remove('show'); }
    else       { setBg(a,next); a.classList.add('show'); b.classList.remove('show'); }
    usingA = !usingA;
    i = (i+1) % imgs.length;
  }, 6000);
})();

// ================== Form: mailto + WhatsApp + (opcional) Formspree ==================
const form = document.getElementById('quoteForm');

function formToText(fd){
  const get = k => (fd.get(k) || '').toString().trim();
  return `Nueva solicitud de cotización
Nombre: ${get('name')}
Correo: ${get('email')}
Teléfono: ${get('phone')}
Origen: ${get('origin')}
Destino: ${get('destination')}
Mascota: ${get('petType')}
Peso+jaula: ${get('weight')}
Jaula: ${get('crate')}
Fecha: ${get('date')}
Mensaje: ${get('message')}`;
}

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(form);
  const bodyText = formToText(fd);

  // Si configuraste Formspree, intenta enviar con fetch
  if (FORM_ENDPOINT) {
    try{
      const res = await fetch(FORM_ENDPOINT, {
        method:'POST',
        headers:{'Accept':'application/json'},
        body: fd
      });
      if (res.ok) {
        alert('¡Gracias! Recibimos tu solicitud. Te contactaremos pronto.');
        form.reset();
        return;
      }
    }catch{/* cae a mailto si falla */}
  }

  // Fallback: mailto
  const body = encodeURIComponent(bodyText);
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=Cotización%20Quisqueya%20Pet%20Logistics&body=${body}`;
});

document.getElementById('btnWhatsapp')?.addEventListener('click', ()=>{
  const fd = new FormData(form || undefined);
  const txt = encodeURIComponent(formToText(fd));
  window.open(`https://wa.me/${BUSINESS_WHATS.replace(/\D/g,'')}?text=${txt}`,'_blank','noopener');
});

// ================== Pestañas + Deep link (página requisitos) ==================
document.querySelectorAll('.tabs').forEach(tabs=>{
  tabs.addEventListener('click', (e)=>{
    const btn = e.target.closest('.tab');
    if(!btn) return;
    const id = btn.dataset.tab;
    const root = tabs.parentElement;
    root.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    root.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    const panel = root.querySelector('#'+id);
    if(panel) panel.classList.add('active');
  });
});

(function(){
  const params = new URLSearchParams(location.search);
  const dest = params.get('dest'); // europa | caribe | usa | latam
  if(!dest) return;
  const btn = document.querySelector(`.tab[data-tab="${dest}"]`);
  const panel = document.getElementById(dest);
  if(btn && panel){
    btn.click();
    panel.scrollIntoView({behavior:'smooth', block:'start'});
  }
})();

// Botón "Volver arriba"
const back = document.getElementById('backtop');
if (back){
  const toggleBack = () => back.classList.toggle('show', window.scrollY > 400);
  window.addEventListener('scroll', toggleBack, { passive:true });
  toggleBack();
  back.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}
<script>
(function(){
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const panel = document.querySelector('.tab-panels');
  if (!panel) return;

  if (isDark) {
    panel.style.setProperty('background', '#0f1626', 'important');
    panel.style.setProperty('color', '#e5e7eb', 'important');
    panel.style.setProperty('border-color', '#1f2937', 'important');

    document.querySelectorAll('.tab-panels .tab-panel, .tab-panels .checklist, .tab-panels .checklist li, .tab-panels .checklist li strong').forEach(el=>{
      el.style.setProperty('color', '#e5e7eb', 'important');
      el.style.setProperty('opacity', '1', 'important');
    });

    // pills inactivas
    document.querySelectorAll('.tabs .tab:not(.active)').forEach(el=>{
      el.style.setProperty('background', '#111827', 'important');
      el.style.setProperty('color', '#e5e7eb', 'important');
      el.style.setProperty('border-color', '#1f2937', 'important');
    });
  }
})();
</script>

