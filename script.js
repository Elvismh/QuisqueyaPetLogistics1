
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
  let i = 0, usingA = true;
  const setBg = (el, url) => el.style.backgroundImage = `url('${url}')`;
  setBg(a, imgs[0]); a.classList.add('show');
  setBg(b, imgs[1]);
  setInterval(()=>{
    const next = imgs[(i+1) % imgs.length];
    if(usingA){
      setBg(b, next);
      b.classList.add('show'); a.classList.remove('show');
    }else{
      setBg(a, next);
      a.classList.add('show'); b.classList.remove('show');
    }
    usingA = !usingA;
    i = (i+1) % imgs.length;
  }, 6000);
})();

// --- Deep link for requisitos page (open specific destination) ---
(function(){
  const params = new URLSearchParams(location.search);
  const dest = params.get('dest'); // e.g., 'espana', 'usa', 'panama', 'chile'
  if(dest){
    const tabBtn = document.querySelector(`.tab[data-tab="${dest}"]`);
    const panel   = document.getElementById(dest);
    if(tabBtn && panel){
      document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      tabBtn.classList.add('active'); panel.classList.add('active');
      panel.scrollIntoView({behavior:'smooth', block:'start'});
    }
  }
})();
