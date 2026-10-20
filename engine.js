(() => {
  const D = window.APRESENTACAO;
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const pad = n => String(n).padStart(2, "0");
  const head = (s, d = 0) => `<header class="shead"><div class="kicker a" style="--d:${d}ms"><i></i>${esc(s.kicker)}</div>
    <h2 class="a" style="--d:${d + 100}ms">${esc(s.titulo)}</h2></header>`;
  const big2 = t => `<span class="line"><span style="--d:80ms">${esc(t[0])}</span></span><span class="line"><span style="--d:200ms" class="outline">${esc(t[1])}</span></span>`;

  const T = {
    capa: s => {
      const m = s.marquee.map(t => `<span><b>/</b>${esc(t)}</span>`).join("");
      return `<div class="inner capa">
        <div class="kicker a" style="--d:0ms"><i></i>${esc(D.evento)} · ${esc(s.kicker)}</div>
        <h1>${big2(s.titulo)}</h1>
        <p class="lead a" style="--d:420ms">${esc(s.lead)}</p>
        <div class="stats a" style="--d:560ms">${s.stats.map(([b, t]) => `<div><b>${esc(b)}</b><span>${esc(t)}</span></div>`).join("")}</div>
      </div>
      <div class="marquee a" style="--d:700ms"><div class="track">${m}${m}</div></div>
      <div class="hint a" style="--d:900ms">→ avançar</div>`;
    },
    agenda: s => `<div class="inner">${head(s)}
      <div class="agenda">${s.etapas.map(([t, h, p], k) => `<div class="ag a" style="--d:${300 + k * 160}ms"><b>${esc(t)}</b><h3>${esc(h)}</h3><p>${esc(p)}</p></div>` +
        (k < s.etapas.length - 1 ? `<span class="ag-arrow a" style="--d:${380 + k * 160}ms"></span>` : "")).join("")}</div></div>`,
    cards: s => `<div class="inner">${head(s)}
      <div class="cards${(s.cols || 3) === 4 ? " c4" : ""}" style="--n:${s.cols || Math.min(s.itens.length, 3)}">${s.itens.map((c, k) => `
        <div class="cardx a" style="--d:${300 + k * 110}ms;--c:${c.cor}"><div class="m">${esc(c.sig)}</div><h3>${esc(c.nome)}</h3><p>${esc(c.desc)}</p></div>`).join("")}</div>
      ${s.nota ? `<p class="notex a" style="--d:${400 + s.itens.length * 110}ms">${esc(s.nota)}</p>` : ""}</div>`,
    produto: s => `<div class="bigsig">${esc(s.sig)}</div>
      <div class="inner sistema">
        <div>
          <div class="kicker a" style="--d:0ms"><i></i>${esc(s.kicker)}</div>
          <div class="tile">${esc(s.sig)}</div>
          <h2><span class="line"><span style="--d:120ms">${esc(s.nome)}</span></span></h2>
          <p class="lead a" style="--d:300ms">${esc(s.desc)}</p>
          ${s.obs ? `<div class="obs a" style="--d:500ms"><i>!</i><span>${esc(s.obs)}</span></div>` : ""}
        </div>
        <aside><div class="eco-h a" style="--d:400ms">Passo a passo<b>${s.passos.length} passos</b></div>
          <ol class="passos">${s.passos.map(([b, t], k) => `<li class="a" style="--d:${500 + k * 120}ms"><div><b>${esc(b)}</b><span>${esc(t)}</span></div></li>`).join("")}</ol>
        </aside>
      </div>`,
    terminal: s => {
      let d = 500;
      const ls = s.linhas.map(([t, x]) => {
        d += t === "cmd" ? 420 : 220;
        const c = t === "cmd" ? `<div class="tl-cmd a" style="--d:${d}ms"><em>${esc(s.os)}</em>${esc(x)}</div>`
          : t === "out" ? `<div class="tl-out a" style="--d:${d}ms">${esc(x)}</div>` : `<div class="tl-cmt a" style="--d:${d}ms"># ${esc(x)}</div>`;
        return c;
      }).join("");
      return `<div class="inner">${head(s)}
        <div class="grid2">
          <div class="term a" style="--d:250ms"><div class="term-bar"><i></i><i></i><i></i><span>${esc(s.kicker)}</span></div>
            <div class="term-body">${ls}<div class="a" style="--d:${d + 300}ms"><em style="font-style:normal;color:var(--accent)">${esc(s.os)}</em> <span class="cursor"></span></div></div></div>
          <aside><div class="eco-h a" style="--d:400ms">Atenção</div>
            <ul class="pontos">${s.lado.map((t, k) => `<li class="a" style="--d:${500 + k * 120}ms">${esc(t)}</li>`).join("")}</ul></aside>
        </div></div>`;
    },
    tabela: s => `<div class="inner">${head(s)}
      <div class="tbl">${s.linhas.map(([a, b], k) => `<div class="tr a" style="--d:${300 + k * 110}ms"><b>${esc(a)}</b><code>${esc(b)}</code></div>`).join("")}</div></div>`,
    niveis: s => `<div class="inner">${head(s)}
      <div class="niv">${s.niveis.map(([c, b, t], k) => `<div class="nv a" style="--d:${300 + k * 180}ms"><code>${esc(c)}</code><b>${esc(b)}</b><span>${esc(t)}</span></div>`).join("")}</div>
      <p class="notex a" style="--d:1000ms">${esc(s.nota)}</p></div>`,
    codigo: s => {
      const cls = l => l.startsWith("#") ? "h" : l.startsWith("-") ? "li" : "d";
      return `<div class="inner">${head(s)}
      <div class="grid2" style="grid-template-columns:5fr 7fr">
        <aside><div class="eco-h a" style="--d:300ms">Passo a passo</div>
          <ol class="passos">${s.passos.map((t, k) => `<li class="a" style="--d:${400 + k * 120}ms"><div><b>${esc(t)}</b></div></li>`).join("")}</ol></aside>
        <div class="doc term a" style="--d:300ms"><div class="term-bar"><i></i><i></i><i></i><span>${esc(s.arquivo)}</span></div>
          <pre>${s.texto.map((l, k) => `<span class="a ${cls(l)}" style="--d:${900 + k * 90}ms">${esc(l) || "&nbsp;"}</span>`).join("")}</pre></div>
      </div></div>`;
    },
    hub: s => {
      const W = 760, H = 540, cx = 380, cy = 262, rx = 290, ry = 196, n = s.nodes.length;
      let links = "", nodes = "";
      s.nodes.forEach(([nome, cor], i) => {
        const ang = (-90 + i * 360 / n) * Math.PI / 180;
        const x = cx + rx * Math.cos(ang), y = cy + ry * Math.sin(ang);
        const dx = x - cx, dy = y - cy, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
        const sx = (cx + ux * 76).toFixed(1), sy = (cy + uy * 76).toFixed(1), ex = (x - ux * 36).toFixed(1), ey = (y - uy * 36).toFixed(1);
        const d = i * 110, below = y > cy - 10;
        links += `<path class="link" pathLength="1" d="M${ex},${ey} L${sx},${sy}" stroke="${cor}" style="--d:${d}ms"/>
          <circle class="pulse" r="3.5" fill="${cor}"><animateMotion dur="2.6s" begin="${(i * .35).toFixed(2)}s" repeatCount="indefinite" path="M${ex},${ey} L${sx},${sy}"/></circle>`;
        nodes += `<g class="pop" style="--d:${d}ms"><circle class="disc" cx="${x}" cy="${y}" r="32" fill="${cor}" fill-opacity=".14" stroke="${cor}" stroke-width="1.5"/>
          <text class="num" x="${x}" y="${y}" style="fill:${cor}">${esc(nome.slice(0, 2).toUpperCase())}</text>
          <text class="lbl" x="${x}" y="${below ? y + 60 : y - 46}">${esc(nome)}</text></g>`;
      });
      return `<div class="inner">${head(s)}
        <div class="mapa-grid">
          <svg class="map" viewBox="0 0 ${W} ${H}" role="img">${links}
            <g class="pop" style="--d:0ms"><circle class="hub-ring" cx="${cx}" cy="${cy}" r="80"/><circle class="hub-ring r2" cx="${cx}" cy="${cy}" r="96"/>
            <circle cx="${cx}" cy="${cy}" r="62" fill="#11141c" stroke="var(--accent)" stroke-width="1.5"/><text class="hub-t" x="${cx}" y="${cy}">${esc(s.centro)}</text></g>${nodes}</svg>
          <aside><div class="eco-h a" style="--d:400ms">${esc(s.lado.titulo)}</div>
            <ul class="pontos">${s.lado.pontos.map((t, k) => `<li class="a" style="--d:${500 + k * 140}ms">${esc(t)}</li>`).join("")}</ul></aside>
        </div></div>`;
    },
    fluxo: s => {
      const n = s.etapas.length;
      return `<div class="inner">${head(s)}
        <div class="fluxo fx-big"><div class="fx-row">${s.etapas.map((t, k) => `<div class="fx-col a" style="--d:${300 + k * 200}ms">${esc(t)}</div>` +
          (k < n - 1 ? `<span class="fx-arrow a" style="--d:${400 + k * 200}ms"></span>` : "")).join("")}</div></div>
        <div class="ex a" style="--d:${400 + n * 200}ms">${esc(s.exemplo)}</div>
        <ul class="pontos" style="margin-top:26px">${s.pontos.map((t, k) => `<li class="a" style="--d:${700 + n * 200 + k * 140}ms">${esc(t)}</li>`).join("")}</ul></div>`;
    },
    merge: s => {
      const H = 440, tx = 790, ty = H / 2, gap = H / (s.fontes.length + 1);
      let links = "", boxes = "";
      s.fontes.forEach(([sg, nome, sub], i) => {
        const y = Math.round(gap * (i + 1)), d = i * 160, path = `M330,${y} C520,${y} 540,${ty} ${tx - 96},${ty}`;
        links += `<path class="link" pathLength="1" d="${path}" stroke="var(--accent)" style="--d:${d + 300}ms"/>
          <circle class="pulse" r="4" fill="var(--accent)"><animateMotion dur="2.2s" begin="${(i * .4).toFixed(1)}s" repeatCount="indefinite" path="${path}"/></circle>`;
        boxes += `<g class="pop" style="--d:${d}ms"><rect class="box" x="10" y="${y - 36}" width="320" height="72" rx="16"/>
          <rect x="26" y="${y - 20}" width="40" height="40" rx="10" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.14)"/>
          <text class="sg" x="46" y="${y}">${esc(sg)}</text><text class="sn" x="82" y="${y - 4}">${esc(nome)}</text>
          <text class="hoje" x="312" y="${y}">${esc(sub.toUpperCase())}</text></g>`;
      });
      return `<div class="inner futuro"><aside>
          <div class="kicker a" style="--d:0ms"><i></i>${esc(s.kicker)}</div>
          <h2>${big2(s.titulo)}</h2><p class="txt a" style="--d:400ms">${esc(s.texto)}</p></aside>
        <svg class="map merge" viewBox="0 0 1000 ${H}" role="img">${links}${boxes}
          <circle class="glow" cx="${tx}" cy="${ty}" r="150" fill="var(--accent)"/>
          <g class="pop" style="--d:900ms"><circle class="hub-ring" cx="${tx}" cy="${ty}" r="112"/><circle class="hub-ring r2" cx="${tx}" cy="${ty}" r="132"/>
            <circle cx="${tx}" cy="${ty}" r="94" fill="#11141c" stroke="var(--accent)" stroke-width="2"/>
            <text class="zt" x="${tx}" y="${ty - 6}">${esc(s.alvo)}</text><text class="zs" x="${tx}" y="${ty + 30}">${esc(s.selo)}</text></g></svg></div>`;
    },
    compara: s => `<div class="inner">${head(s)}
      <div class="comp" style="--n:${s.colunas.length}">${s.colunas.map((c, k) => `<div class="cp a" style="--d:${300 + k * 160}ms;--c:${c.cor}"><h3>${esc(c.nome)}</h3><small>${esc(c.sub)}</small>
        <ul>${c.linhas.map((t, j) => `<li class="a" style="--d:${500 + k * 160 + j * 100}ms">${esc(t)}</li>`).join("")}</ul></div>`).join("")}</div></div>`,
    checklist: s => `<div class="inner">${head(s)}
      <div class="chk">${s.itens.map(([b, t], k) => `<div class="ck a" style="--d:${300 + k * 130}ms"><span class="box"></span><b>${esc(b)}</b><span>${esc(t)}</span></div>`).join("")}</div></div>`,
    fim: s => `<div class="orbit"></div><div class="orbit o2"></div>
      <div class="inner fim"><div class="kicker a" style="--d:0ms"><i></i>${esc(s.kicker)} · ${esc(D.evento)}<i></i></div>
        <h2>${big2(s.titulo)}</h2><p class="a" style="--d:520ms">${esc(s.texto)}</p>
        <div class="cta a" style="--d:760ms"><span class="cta-ico">${esc(s.prox || "")}</span><span class="cta-txt"><b>${esc(s.cta)}</b><small>${esc(s.sub)}</small></span></div></div>`
  };

  const slides = D.slides.map(s => ({ label: s.label, cor: s.cor, html: T[s.tipo](s) }));

  const deck = document.getElementById("deck"), prog = document.getElementById("progress");
  const root = document.documentElement, scan = document.querySelector(".bg .scan");
  document.getElementById("brandTxt").textContent = `${D.marca} · Encontro ${D.encontro || "01"}`;
  deck.innerHTML = slides.map((s, i) => `<section class="slide" data-i="${i}" aria-label="${esc(s.label)}">${s.html}</section>`).join("");
  prog.innerHTML = slides.map((s, i) => `<button style="--c:${s.cor}" title="${esc(s.label)}" data-goto="${i}"></button>`).join("");
  const els = [...deck.children], bars = [...prog.children];

  let cur = -1;
  function go(n) {
    n = Math.max(0, Math.min(slides.length - 1, n));
    if (n === cur) return;
    cur = n;
    els.forEach((el, i) => { el.classList.toggle("on", i === n); el.classList.toggle("past", i < n); });
    bars.forEach((b, i) => { b.classList.toggle("done", i < n); b.classList.toggle("cur", i === n); });
    root.style.setProperty("--accent", slides[n].cor);
    document.getElementById("whereTxt").textContent = slides[n].label;
    document.getElementById("countTxt").textContent = `${pad(n + 1)} / ${pad(slides.length)}`;
    scan.classList.remove("go"); void scan.offsetWidth; scan.classList.add("go");
    history.replaceState(null, "", "#" + (n + 1));
  }
  const next = () => go(cur + 1), prev = () => go(cur - 1);
  const full = () => !document.fullscreenElement ? document.documentElement.requestFullscreen?.() : document.exitFullscreen?.();
  document.getElementById("next").onclick = next;
  document.getElementById("prev").onclick = prev;
  document.getElementById("full").onclick = full;
  document.addEventListener("click", e => { const t = e.target.closest("[data-goto]"); if (t) go(+t.dataset.goto); });
  document.addEventListener("keydown", e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(k)) { e.preventDefault(); next(); }
    else if (["ArrowLeft", "PageUp", "Backspace"].includes(k)) { e.preventDefault(); prev(); }
    else if (k === "Home") go(0);
    else if (k === "End") go(slides.length - 1);
    else if (k.toLowerCase() === "f") full();
  });
  let tx = null;
  deck.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
  deck.addEventListener("touchend", e => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) dx < 0 ? next() : prev(); tx = null; });
  const fromHash = () => { const n = parseInt(location.hash.slice(1), 10); return Number.isFinite(n) ? n - 1 : 0; };
  window.addEventListener("hashchange", () => go(fromHash()));
  requestAnimationFrame(() => go(fromHash()));
})();
