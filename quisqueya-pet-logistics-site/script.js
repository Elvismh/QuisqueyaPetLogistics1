// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// Tabs for requisitos
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Quote form -> mailto + WhatsApp
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

const businessEmail = "quisqueyapetlogistics@gmail.com";
const businessWhats = "+18292673330"; // ajustar si cambias el número oficial

form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(form);
  const body = encodeURIComponent(formToText(fd));
  window.location.href = `mailto:${businessEmail}?subject=Cotización%20Quisqueya%20Pet%20Logistics&body=${body}`;
});

document.getElementById('btnWhatsapp')?.addEventListener('click', ()=>{
  const fd = new FormData(form);
  const txt = encodeURIComponent(formToText(fd));
  window.open(`https://wa.me/${businessWhats.replace(/\D/g,'')}?text=${txt}`,'_blank');
});

document.getElementById('whatsapp-requisitos')?.addEventListener('click', (e)=>{
  e.preventDefault();
  const txt = encodeURIComponent("Hola, tengo dudas sobre los requisitos de viaje para mi mascota.");
  window.open(`https://wa.me/${businessWhats.replace(/\D/g,'')}?text=${txt}`,'_blank');
});


// Theme: respect system, allow manual toggle
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('qpl-theme');
  if (saved) root.setAttribute('data-theme', saved);

  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  const icon = () => (root.getAttribute('data-theme') === 'dark' ? '☀️ Claro' : '🌙 Oscuro');
  const toggle = () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (next === 'light') root.removeAttribute('data-theme'); else root.setAttribute('data-theme','dark');
    localStorage.setItem('qpl-theme', next === 'light' ? '' : 'dark');
    btn.textContent = icon();
  };
  btn.textContent = icon();
  btn.addEventListener('click', toggle);
  document.querySelector('.header-inner')?.appendChild(btn);
})();
