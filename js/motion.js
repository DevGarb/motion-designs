// Motion estilo HyperFrames: timelines GSAP para transições, contadores e traçados.
(function () {
  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE = 'expo.out';

  function transicao(antiga, nova, direcao) {
    const dx = direcao === 'voltar' ? -1 : 1;
    if (reduz || !antiga) {
      antiga && antiga.remove();
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const tl = gsap.timeline({ onComplete: () => { antiga.remove(); resolve(); }, onInterrupt: resolve });
      if (direcao === 'aba') {
        tl.to(antiga, { opacity: 0, scale: 0.98, duration: 0.22, ease: 'power2.in' })
          .fromTo(nova, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: EASE }, 0.08);
      } else {
        tl.to(antiga, { xPercent: -28 * dx, opacity: 0.2, duration: 0.5, ease: EASE })
          .fromTo(nova, { xPercent: 100 * dx, boxShadow: '-30px 0 60px rgba(0,0,0,.5)' },
            { xPercent: 0, duration: 0.55, ease: EASE, clearProps: 'boxShadow,transform' }, 0);
      }
    });
  }

  // Anima elementos marcados na tela recém-montada.
  function entrar(tela) {
    const itens = tela.querySelectorAll('[data-anim]');
    const contadores = tela.querySelectorAll('[data-count]');
    const barras = tela.querySelectorAll('[data-bar]');

    if (reduz) {
      contadores.forEach((el) => (el.textContent = formatar(el, +el.dataset.count)));
      barras.forEach((el) => (el.style.width = Math.min(100, +el.dataset.bar * 100) + '%'));
      return;
    }

    if (itens.length) gsap.fromTo(itens, { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.7, ease: EASE, stagger: 0.05, delay: 0.12, clearProps: 'transform' });

    contadores.forEach((el) => {
      const obj = { v: 0 };
      el.textContent = formatar(el, 0);
      gsap.to(obj, {
        v: +el.dataset.count, duration: 1.4, ease: 'power3.out', delay: 0.2,
        onUpdate: () => (el.textContent = formatar(el, obj.v)),
      });
    });

    barras.forEach((el, i) => {
      gsap.fromTo(el, { width: '0%' },
        { width: Math.min(100, +el.dataset.bar * 100) + '%', duration: 1.1, ease: 'power3.out', delay: 0.3 + i * 0.04 });
    });
  }

  function formatar(el, v) {
    const dec = +(el.dataset.dec || 0);
    if (el.dataset.fmt === 'brl') return Calc.fmtBRL(v);
    if (el.dataset.fmt === 'horas') return Calc.fmtHoras(v);
    return Calc.fmtNum(v, dec);
  }

  // Desenha uma polilinha Leaflet progressivamente (stroke-dashoffset).
  function tracar(polyline, duracao = 1.6) {
    const path = polyline.getElement && polyline.getElement();
    if (!path || reduz) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    gsap.to(path, {
      strokeDashoffset: 0, duration: duracao, ease: 'power2.inOut',
      onComplete: () => { path.style.strokeDasharray = ''; path.style.strokeDashoffset = ''; },
    });
  }

  // Marcadores aparecem com "pop".
  function popMarcadores(container) {
    if (reduz) return;
    const els = container.querySelectorAll('.vmark, .stop-pin');
    if (!els.length) return;
    gsap.fromTo(els, { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.06, delay: 0.3 });
  }

  let toastTl;
  function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    toastTl && toastTl.kill();
    toastTl = gsap.timeline()
      .to(el, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.6)' })
      .to(el, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' }, '+=2.2');
  }

  function pulso(el) {
    if (reduz || !el) return;
    gsap.fromTo(el, { scale: 1 }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.inOut' });
  }

  window.Motion = { transicao, entrar, tracar, popMarcadores, toast, pulso, reduz };
})();
