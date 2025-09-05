// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav    = document.querySelector('.nav');
if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

// --- Hero slider ---
(function(){
  const a = document.querySelector('.slide-a');
  const b = document.querySelector('.slide-b');
  if(!a || !b) return;

  const imgs = [
    'assets/hero-1.jpg',
    'assets/hero-2.jpg',
    'assets/hero-3.jpg',
    'assets/hero-4.jpg'
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

// --- Formulario: mailto + WhatsApp ---
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

// ✅ Cambia estos 2 por tus datos reales
const businessEmail = "quisqueyapetlogistics@gmail.com";
const businessWhats = "+18292673330";

form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(form);
  const body = encodeURIComponent(formToText(fd));
  window.location.href = `mailto:${businessEmail}?subject=Cotización%20Quisqueya%20Pet%20Logistics&body=${body}`;
});

document.getElementById('btnWhatsapp')?.addEventListener('click', ()=>{
  const fd = new FormData(form);
  const txt = encodeURIComponent(formToText(fd));
  window.open(`https://wa.me/${businessWhats.replace(/\\D/g,'')}?text=${txt}`,'_blank');
});
