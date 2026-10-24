(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Menu mobile
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const setMenu = open => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

  // Cabeçalho ganha fundo ao rolar
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!fine || reduce) return;

  // Luz suave que segue o cursor e prévia flutuante dos projetos
  const glow = document.querySelector('.glow');
  const preview = document.querySelector('.preview');
  let tx = innerWidth / 2, ty = innerHeight / 3, gx = tx, gy = ty, px = tx, py = ty;

  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; });

  document.querySelectorAll('.project').forEach(p => {
    p.addEventListener('pointerenter', () => {
      preview.src = p.dataset.img;
      preview.classList.add('show');
    });
    p.addEventListener('pointerleave', () => preview.classList.remove('show'));
  });

  (function frame() {
    gx += (tx - gx) * 0.08; gy += (ty - gy) * 0.08;
    px += (tx - px) * 0.14; py += (ty - py) * 0.14;
    glow.style.transform = `translate(${gx}px, ${gy}px)`;
    preview.style.transform = `translate(${px + 24}px, ${py - 110}px)`;
    requestAnimationFrame(frame);
  })();
})();
