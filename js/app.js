// CearaGPS Frotas — protótipo clicável (SPA com rotas por hash).
(function () {
  const D = window.Dados;
  const C = window.Calc;
  const app = document.getElementById('app');
  const tabbar = document.getElementById('tabbar');

  // ---------- Estado (persistência opcional em localStorage) ----------
  const CHAVE = 'cearagps-frotas-v1';
  const estado = Object.assign({
    preco: D.PRECO_GASOLINA,
    plano: null,          // rota em edição
    rotaAtiva: null,      // { plano, geo, inicio }
    manut: {},            // { 'PLACA:id': ultimoKm }
    filtro: 'todos',
    periodo: 'hoje',
    periodoRel: 'semana',
  }, ler());

  function ler() {
    try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch { return {}; }
  }
  function salvar() {
    try {
      const { preco, plano, manut } = estado;
      localStorage.setItem(CHAVE, JSON.stringify({ preco, plano, manut }));
    } catch { /* armazenamento indisponível: segue sem persistir */ }
  }

  // Aplica manutenções marcadas como feitas.
  D.VEICULOS.forEach((v) => v.manutencao.forEach((m) => {
    const k = `${v.placa}:${m.id}`;
    if (estado.manut[k]) m.ultimoKm = estado.manut[k];
  }));

  if (!estado.plano) estado.plano = clonar(D.ROTA_PADRAO);

  // ---------- Utilidades ----------
  function clonar(o) { return JSON.parse(JSON.stringify(o)); }
  const placaFmt = (p) => `${p.slice(0, 3)}-${p.slice(3)}`;
  const iniciais = (n) => n.split(' ').map((p) => p[0]).slice(0, 2).join('');
  const hhmm = (min) => `${String(Math.floor(min / 60) % 24).padStart(2, '0')}:${String(Math.floor(min % 60)).padStart(2, '0')}`;
  const STATUS_TXT = { movendo: 'Em movimento', parado: 'Parado', ocioso: 'Ocioso', offline: 'Offline' };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function localMaisProximo(pos) {
    let melhor = null;
    let dist = Infinity;
    Object.values(D.LOCAIS).forEach((l) => {
      const d = C.haversineKm(pos, l.pos);
      if (d < dist) { dist = d; melhor = l; }
    });
    return dist < 1.2 ? melhor.nome : `Em via · próx. ${melhor.nome.split(' – ')[0]}`;
  }

  function vencidas(v) {
    return v.manutencao.filter((m) => C.kmAteManutencao(m, v.odometroAtual) < 0);
  }
  function alertas() {
    const lista = [];
    D.VEICULOS.forEach((v) => {
      if (v.excessos.length) {
        const p = v.excessos.reduce((a, b) => (b.v > a.v ? b : a));
        lista.push({ tipo: 'vel', icone: 'speed', cor: 'red', placa: v.placa,
          txt: `${placaFmt(v.placa)} a ${p.v} km/h (limite ${v.limite})`, hora: hhmm(p.t) });
      }
      vencidas(v).forEach((m) => lista.push({ tipo: 'manut', icone: 'build', cor: 'orange', placa: v.placa,
        txt: `${placaFmt(v.placa)}: ${m.tipo} vencida`, hora: 'Manutenção' }));
      if (v.status === 'offline') lista.push({ tipo: 'off', icone: 'signal_disconnected', cor: 'red', placa: v.placa,
        txt: `${placaFmt(v.placa)} sem sinal desde ${hhmm(v.ultimaAtualizacao)}`, hora: 'Offline' });
    });
    return lista;
  }

  // ---------- Mapas ----------
  let limpeza = [];
  const aoSair = (fn) => limpeza.push(fn);

  function criarMapa(el, opcoes = {}) {
    const m = L.map(el, Object.assign({ zoomControl: false, attributionControl: true, zoomSnap: 0.25 }, opcoes));
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, className: 'tiles-dark',
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(m);
    m.attributionControl.setPrefix(false);
    aoSair(() => m.remove());
    adicionarUnidades(m);
    return m;
  }

  // Pin da marca (símbolo "C") nas unidades CearaGPS, com balão de contato.
  const iconeUnidade = L.divIcon({
    className: '', iconSize: [46, 58], iconAnchor: [23, 56], popupAnchor: [0, -54],
    html: `<div class="pin-marca"><span class="pin-pulso"></span><div class="pin-gota"><div class="pin-simbolo">${Marca.simbolo}</div></div></div>`,
  });

  function balaoUnidade(u) {
    const mapa = `https://www.google.com/maps/search/?api=1&query=${u.pos[0]},${u.pos[1]}`;
    return `
      <div class="balao-head">
        <div class="pin-simbolo">${Marca.simbolo}</div>
        <div><b>CearaGPS</b><small>${u.nome}</small></div>
        <button class="balao-x" aria-label="Fechar"><i class="ms">close</i></button>
      </div>
      <div class="balao-sec"><i class="ms">location_on</i><div>${u.enderecos.map((e) => `<b>${e}</b>`).join('')}
        <a href="${mapa}" target="_blank" rel="noopener">Abrir no mapa ↗</a></div></div>
      <div class="balao-sec"><i class="ms">schedule</i><div>${u.horarios.map(([d, h]) => `<span><em>${d}</em>${h}</span>`).join('')}</div></div>
      <div class="balao-sec"><i class="ms">support_agent</i><div><small>Central 24h</small>
        <span class="tels">${D.CONTATO.telefones.map((t) => `<a href="tel:${t.tel}">${t.rotulo}</a>`).join('')}</span></div></div>
      <a class="btn whats" href="${D.CONTATO.whatsapp}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3a8.2 8.2 0 1 1 6.9 3.9Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>
        Falar no WhatsApp</a>`;
  }

  // Balão flutua sobre a tela (fora do recorte do mapa), apontando para o pin.
  function abrirBalao(mapa, u) {
    const tela = mapa.getContainer().closest('.screen');
    tela.querySelectorAll('.balao').forEach((b) => b.remove());
    const card = document.createElement('div');
    card.className = 'balao';
    card.innerHTML = balaoUnidade(u);
    tela.appendChild(card);

    const mapaEl = mapa.getContainer();
    const caixaTela = tela.getBoundingClientRect();
    const caixaMapa = mapaEl.getBoundingClientRect();
    const pt = mapa.latLngToContainerPoint(u.pos);
    const pinX = caixaMapa.left - caixaTela.left + pt.x;
    const pinY = caixaMapa.top - caixaTela.top + tela.scrollTop + pt.y;
    const w = card.offsetWidth;
    const h = card.offsetHeight;
    const left = Math.max(10, Math.min(tela.clientWidth - w - 10, pinX - w / 2));
    const acima = pinY - 60 - h - 12 > tela.scrollTop + 60;
    const top = acima ? pinY - 60 - h - 12 : pinY + 12;
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
    card.classList.add(acima ? 'acima' : 'abaixo');
    card.style.setProperty('--seta', `${pinX - left}px`);

    const fechar = () => {
      gsap.to(card, { opacity: 0, scale: 0.92, duration: 0.18, onComplete: () => card.remove() });
      mapa.off('movestart click', fechar);
    };
    card.querySelector('.balao-x').onclick = fechar;
    mapa.on('movestart click', fechar);
    if (!Motion.reduz) {
      gsap.fromTo(card, { opacity: 0, scale: 0.85, transformOrigin: `${pinX - left}px ${acima ? '100%' : '0%'}` },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.7)' });
      gsap.from(card.children, { opacity: 0, y: 8, duration: 0.4, ease: 'expo.out', stagger: 0.05, delay: 0.1 });
    }
  }

  function adicionarUnidades(mapa) {
    D.UNIDADES.forEach((u) => {
      L.marker(u.pos, { icon: iconeUnidade, zIndexOffset: 900, title: `CearaGPS · ${u.nome}` })
        .on('click', () => abrirBalao(mapa, u))
        .addTo(mapa);
    });
  }

  function iconeVeiculo(v) {
    const vel = v.status === 'offline' ? 'Offline' : v.status === 'movendo' ? `${v.velAtual} km/h` : STATUS_TXT[v.status];
    return L.divIcon({
      className: '', iconSize: [0, 0],
      html: `<div class="vmark ${v.status}"><span class="dot ${v.status}"></span>${placaFmt(v.placa)}<em>${vel}</em></div>`,
    });
  }
  const iconePin = (txt, cls = '') => L.divIcon({ className: '', iconSize: [0, 0], html: `<div class="stop-pin ${cls}">${txt}</div>` });
  const iconeVan = () => L.divIcon({ className: '', iconSize: [0, 0], html: '<div class="van-pin"><i class="ms fill">local_shipping</i></div>' });

  // Rota por ruas via OSRM; se falhar, linha reta com fator de tortuosidade urbana.
  const cacheRotas = new Map();
  async function rotear(pontos) {
    const chave = pontos.map((p) => p.map((n) => n.toFixed(5)).join(',')).join(';');
    if (cacheRotas.has(chave)) return cacheRotas.get(chave);
    let geo;
    try {
      const coords = pontos.map((p) => `${p[1]},${p[0]}`).join(';');
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 7000);
      const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`, { signal: ctrl.signal });
      clearTimeout(timer);
      const j = await r.json();
      if (j.code !== 'Ok') throw new Error(j.code);
      const rt = j.routes[0];
      geo = {
        coords: rt.geometry.coordinates.map((c) => [c[1], c[0]]),
        km: rt.distance / 1000,
        min: (rt.duration / 60) * 1.3, // trânsito urbano
        pernas: rt.legs.map((l) => ({ km: l.distance / 1000, min: (l.duration / 60) * 1.3 })),
        fonte: 'osrm',
      };
    } catch {
      const pernas = [];
      for (let i = 1; i < pontos.length; i++) {
        const km = C.haversineKm(pontos[i - 1], pontos[i]) * 1.35;
        pernas.push({ km, min: (km / 30) * 60 });
      }
      geo = {
        coords: pontos, pernas, fonte: 'estimada',
        km: pernas.reduce((s, p) => s + p.km, 0),
        min: pernas.reduce((s, p) => s + p.min, 0),
      };
    }
    cacheRotas.set(chave, geo);
    return geo;
  }

  const pontosDoPlano = (pl) => [pl.origem.pos, ...pl.paradas.map((p) => p.pos), pl.destino.pos];

  // ---------- Router ----------
  const pilha = [];
  const ABAS = ['painel', 'veiculos', 'rotas', 'manutencao', 'relatorios'];
  let atual = null;

  function rotaDoHash() {
    const h = location.hash.replace(/^#\/?/, '') || 'login';
    const partes = h.split('/');
    if (partes[0] === 'veiculo') return { nome: 'veiculo', param: partes[1] };
    if (partes[0] === 'rota') return { nome: `rota/${partes[1] || 'nova'}` };
    return { nome: TELAS[partes[0]] ? partes[0] : 'painel' };
  }

  function navegar() {
    const rota = rotaDoHash();
    const hash = location.hash || '#/login';
    let direcao = 'ir';
    if (pilha.length > 1 && pilha[pilha.length - 2] === hash) { pilha.pop(); direcao = 'voltar'; }
    else pilha.push(hash);
    if (atual && ABAS.includes(atual.nome) && ABAS.includes(rota.nome)) direcao = 'aba';

    limpeza.forEach((fn) => { try { fn(); } catch { /* já removido */ } });
    limpeza = [];

    const tela = TELAS[rota.nome];
    const el = document.createElement('section');
    el.className = 'screen' + (tela.semAbas ? ' no-tab' : '');
    el.innerHTML = tela.html(rota.param);
    // Navegação no meio de uma transição: descarta telas que ainda estavam saindo.
    const telas = app.querySelectorAll('.screen');
    telas.forEach((t, i) => { if (i < telas.length - 1) { gsap.killTweensOf(t); t.remove(); } });
    const antiga = telas[telas.length - 1] || null;
    if (antiga) gsap.killTweensOf(antiga);
    app.appendChild(el);

    tabbar.classList.toggle('hide', !!tela.semAbas);
    tabbar.querySelectorAll('a').forEach((a) => a.classList.toggle('on', a.dataset.tab === (tela.aba || rota.nome)));
    document.querySelectorAll('.side-nav a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === hash));

    tela.montar && tela.montar(el, rota.param);
    Motion.transicao(antiga, el, direcao).then(() => el.dispatchEvent(new Event('visivel')));
    Motion.entrar(el);
    atual = rota;
  }

  // ---------- Telas ----------
  const TELAS = {};

  // LOGIN
  TELAS.login = {
    semAbas: true,
    html: () => `
      <div class="login">
        <svg class="login-bg" viewBox="0 0 390 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M-20 120 C 80 60, 160 220, 260 150 S 380 60, 420 140"/>
          <path d="M-10 640 C 90 560, 170 720, 280 630 S 360 560, 410 600"/>
          <path d="M40 820 C 60 700, 10 600, 120 520 S 300 520, 330 420"/>
          <circle cx="370" cy="105" r="4"/><circle cx="120" cy="520" r="4"/><circle cx="280" cy="630" r="4"/>
        </svg>
        <div class="logo" data-anim>
          <div class="logo-svg" id="lg-logo">${Marca.logo}</div>
          <p>Acompanhe sua frota e planeje rotas em tempo real</p>
        </div>
        <div class="field" data-anim>
          <label for="lg-user">E-mail ou CNPJ</label>
          <div class="in"><i class="ms">badge</i><input id="lg-user" value="frota@transporteslitoral.com.br" autocomplete="username"></div>
        </div>
        <div class="field" data-anim>
          <label for="lg-pass">Senha</label>
          <div class="in"><i class="ms">lock</i><input id="lg-pass" type="password" value="prototipo123" autocomplete="current-password">
            <button type="button" id="lg-eye" aria-label="Mostrar senha"><i class="ms">visibility</i></button></div>
        </div>
        <a class="forgot" href="javascript:void 0" data-anim id="lg-forgot">Esqueci a senha</a>
        <button class="btn primary block" id="lg-go" data-anim>Entrar</button>
        <button class="btn block" id="lg-bio" data-anim style="margin-top:10px"><i class="ms">fingerprint</i>Entrar com biometria</button>
        <p class="foot" data-anim>Suporte 24h · (85) 0000-0000</p>
      </div>`,
    montar(el) {
      const svg = el.querySelector('.login-bg');
      if (!Motion.reduz) {
        const tw = gsap.to(svg.querySelectorAll('path'), { strokeDashoffset: -140, duration: 6, ease: 'none', repeat: -1 });
        const tw2 = gsap.to(svg.querySelectorAll('circle'), { scale: 2.2, opacity: 0.2, transformOrigin: 'center', duration: 1.4, repeat: -1, yoyo: true, stagger: 0.4 });
        aoSair(() => { tw.kill(); tw2.kill(); });
      }
      // Logo monta letra a letra; a seta laranja "dispara" por último.
      if (!Motion.reduz) {
        const partes = el.querySelectorAll('#lg-logo path');
        gsap.timeline({ delay: 0.15 })
          .from(partes, { opacity: 0, x: -24, skewX: -12, duration: 0.55, ease: 'expo.out', stagger: 0.04 })
          .fromTo(el.querySelectorAll('#lg-logo path.o'), { filter: 'brightness(1)' },
            { filter: 'brightness(1.6)', duration: 0.25, yoyo: true, repeat: 1 }, '-=0.1');
      }
      el.querySelector('#lg-eye').onclick = () => {
        const i = el.querySelector('#lg-pass');
        i.type = i.type === 'password' ? 'text' : 'password';
      };
      el.querySelector('#lg-forgot').onclick = () => Motion.toast('Link de recuperação enviado ao e-mail');
      const entrar = (btn, msg) => {
        btn.disabled = true;
        btn.innerHTML = '<i class="ms">progress_activity</i>Entrando…';
        gsap.to(btn.querySelector('.ms'), { rotation: 360, repeat: -1, duration: 0.8, ease: 'none' });
        setTimeout(() => { msg && Motion.toast(msg); location.hash = '#/painel'; }, 750);
      };
      el.querySelector('#lg-go').onclick = (e) => entrar(e.currentTarget);
      el.querySelector('#lg-bio').onclick = (e) => entrar(e.currentTarget, 'Biometria reconhecida');
    },
  };

  // PAINEL
  TELAS.painel = {
    html() {
      const vs = D.VEICULOS;
      const km = vs.reduce((s, v) => s + v.km, 0);
      const litros = vs.reduce((s, v) => s + v.litros, 0);
      const ocioso = vs.reduce((s, v) => s + v.minOcioso, 0);
      const al = alertas();
      const cont = (st) => vs.filter((v) => v.status === st).length;
      const ativa = D.ROTAS[0];
      const va = D.veiculo(ativa.placa);
      return `
        <header class="topbar">
          <div class="grow"><div class="logo-svg" style="width:150px">${Marca.logo}</div><div class="sub" style="margin-top:4px"><span class="live-dot"></span>Fortaleza, CE · ao vivo</div></div>
          <button class="icon-btn" id="bell" aria-label="Alertas"><i class="ms">notifications</i><span class="badge-dot">${al.length}</span></button>
        </header>
        <div class="alerts-pop" id="alerts" hidden>
          ${al.map((a) => `<a href="#/veiculo/${a.placa}" class="al-row"><span class="kpi-ico ${a.cor}"><i class="ms">${a.icone}</i></span><span>${a.txt}<small>${a.hora}</small></span></a>`).join('')}
        </div>
        <div class="pad" data-anim>
          <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px">
            <div><h3 style="font:600 17px var(--font-head)">Olá, ${D.EMPRESA}</h3>
            <p class="muted" style="font-size:13px">${vs.length} veículos monitorados em tempo real</p></div>
            <span class="pill movendo"><span class="dot movendo"></span>GPS ok</span>
          </div>
        </div>
        <div class="map hero" id="map-painel" data-anim>
          <div class="map-float" style="left:12px;bottom:12px"><i class="ms" style="font-size:16px">sync</i>Atualiza a cada 5s</div>
        </div>
        <div class="chips" id="chips" data-anim>
          ${[['todos', 'Todos', vs.length], ['movendo', 'Movendo', cont('movendo')], ['parado', 'Parados', cont('parado')], ['ocioso', 'Ociosos', cont('ocioso')], ['offline', 'Offline', cont('offline')]]
            .map(([k, t, n]) => `<button class="chip ${estado.filtro === k ? 'on' : ''}" data-f="${k}">${k !== 'todos' ? `<span class="dot ${k}"></span>` : ''}${t} <b>${n}</b></button>`).join('')}
        </div>
        <div class="section-title"><span>Métricas do dia</span> <b>Hoje, ${hhmm(D.AGORA_MIN)}</b></div>
        <div class="grid2">
          <a class="card kpi" href="#/relatorios" data-anim>
            <div class="kpi-head">Km rodados<span class="kpi-ico"><i class="ms">speed</i></span></div>
            <div class="num"><span data-count="${km.toFixed(1)}" data-dec="1">0</span><small>km</small></div>
            <div class="kpi-foot c-green">▲ 12,4% vs ontem</div>
          </a>
          <a class="card kpi" href="#/relatorios" data-anim>
            <div class="kpi-head">Combustível<span class="kpi-ico"><i class="ms">local_gas_station</i></span></div>
            <div class="num"><span data-count="${litros.toFixed(1)}" data-dec="1">0</span><small>L</small></div>
            <div class="kpi-foot">Custo: <b style="color:var(--text)" data-count="${(litros * estado.preco).toFixed(2)}" data-fmt="brl">R$ 0</b></div>
          </a>
          <a class="card kpi" href="#/relatorios" data-anim>
            <div class="kpi-head">Tempo ocioso<span class="kpi-ico orange"><i class="ms">hourglass_top</i></span></div>
            <div class="num c-orange" data-count="${ocioso}" data-fmt="horas">0m</div>
            <div class="kpi-foot c-orange">Motor ligado parado</div>
          </a>
          <button class="card kpi" id="kpi-alertas" style="text-align:left" data-anim>
            <div class="kpi-head">Alertas ativos<span class="kpi-ico red"><i class="ms">notification_important</i></span></div>
            <div class="num c-red" data-count="${al.length}">0</div>
            <div class="kpi-foot">${al.filter((a) => a.tipo === 'vel').length} velocidade · ${al.filter((a) => a.tipo === 'manut').length} manutenção</div>
          </button>
        </div>
        <div class="section-title"><span>Rota ativa</span></div>
        <div class="pad" style="padding-top:0" data-anim>
          <div class="card" style="border-left:3px solid var(--green)">
            <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
              <div><h4 style="font:600 16px var(--font-head)">${ativa.nome}</h4>
              <span class="pill movendo" style="margin-top:6px"><span class="dot movendo"></span>Em trânsito</span></div>
              <span class="plate"><span>${placaFmt(va.placa)}</span></span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin:14px 0 10px">
              <div class="vrow"><span class="avatar">${iniciais(va.motorista)}</span><div><b>${va.motorista}</b><p class="muted" style="font-size:12px">${va.modelo}</p></div></div>
              <div style="text-align:right"><small class="muted" style="font-size:11px">PREVISÃO</small><div class="num c-green" style="font-size:20px">14:40</div></div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px"><span>Paradas</span><b>3/5 concluídas</b></div>
            <div class="progress"><i data-bar="${ativa.progresso}"></i></div>
            <div class="btn-row" style="margin-top:14px">
              <a class="btn primary" href="#/rota/exec"><i class="ms">route</i>Ver ao vivo</a>
              <button class="btn" data-ligar="${va.motorista}"><i class="ms">call</i>Ligar</button>
            </div>
          </div>
        </div>`;
    },
    montar(el) {
      const mapa = criarMapa(el.querySelector('#map-painel'));
      const marcadores = {};
      D.VEICULOS.forEach((v) => {
        marcadores[v.placa] = L.marker(v.pos, { icon: iconeVeiculo(v) }).addTo(mapa)
          .on('click', () => (location.hash = `#/veiculo/${v.placa}`));
      });
      mapa.fitBounds(L.latLngBounds([...D.VEICULOS.map((v) => v.pos), ...D.UNIDADES.map((u) => u.pos)]), { padding: [30, 50] });
      el.addEventListener('visivel', () => { mapa.invalidateSize(); Motion.popMarcadores(el.querySelector('#map-painel')); }, { once: true });

      function aplicarFiltro() {
        D.VEICULOS.forEach((v) => {
          const vis = estado.filtro === 'todos' || v.status === estado.filtro;
          const m = marcadores[v.placa];
          vis ? m.addTo(mapa) : m.remove();
        });
        el.querySelectorAll('#chips .chip').forEach((c) => c.classList.toggle('on', c.dataset.f === estado.filtro));
      }
      aplicarFiltro();
      el.querySelector('#chips').onclick = (e) => {
        const c = e.target.closest('.chip');
        if (!c) return;
        estado.filtro = c.dataset.f;
        aplicarFiltro();
      };

      // "Ao vivo": veículos em movimento avançam rumo ao próximo ponto do roteiro.
      const vivo = setInterval(() => {
        D.VEICULOS.filter((v) => v.status === 'movendo').forEach((v) => {
          const alvo = D.LOCAIS[v.roteiro[(v.alvoIdx = v.alvoIdx ?? 1) % v.roteiro.length]].pos;
          const d = C.haversineKm(v.pos, alvo);
          v.velAtual = Math.max(18, Math.min(v.limite + 6, Math.round(v.velAtual + (Math.random() - 0.5) * 12)));
          const passo = (v.velAtual / 3600) * 5 * 6; // 5s simulados ×6
          if (d <= passo) v.alvoIdx++;
          const f = Math.min(1, passo / Math.max(d, 0.001));
          v.pos = [v.pos[0] + (alvo[0] - v.pos[0]) * f, v.pos[1] + (alvo[1] - v.pos[1]) * f];
          const m = marcadores[v.placa];
          m.setLatLng(v.pos);
          m.setIcon(iconeVeiculo(v));
        });
      }, 2000);
      aoSair(() => clearInterval(vivo));

      const pop = el.querySelector('#alerts');
      const abrir = () => {
        pop.hidden = !pop.hidden;
        if (!pop.hidden) gsap.fromTo(pop, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'expo.out' });
      };
      el.querySelector('#bell').onclick = abrir;
      el.querySelector('#kpi-alertas').onclick = () => { el.scrollTo({ top: 0, behavior: 'smooth' }); if (pop.hidden) abrir(); };
      ligarMotorista(el);
    },
  };

  function ligarMotorista(el) {
    el.querySelectorAll('[data-ligar]').forEach((b) => (b.onclick = () => Motion.toast(`Chamando ${b.dataset.ligar}…`)));
  }

  // VEÍCULOS
  TELAS.veiculos = {
    html: () => `
      <header class="topbar"><div class="grow"><h2>Veículos</h2><div class="sub">${D.VEICULOS.length} na frota · atualizado ${hhmm(D.AGORA_MIN)}</div></div>
        <button class="icon-btn" aria-label="Adicionar veículo" onclick="Motion.toast('Cadastro de veículo em breve')"><i class="ms">add</i></button></header>
      <label class="search" data-anim><i class="ms muted">search</i><input id="busca" placeholder="Buscar placa ou motorista"></label>
      <div class="chips" id="vchips" data-anim>
        ${['todos', 'movendo', 'parado', 'ocioso', 'offline'].map((k) => `<button class="chip ${k === 'todos' ? 'on' : ''}" data-f="${k}">${k === 'todos' ? 'Todos' : STATUS_TXT[k]}</button>`).join('')}
      </div>
      <div class="list" id="vlist" style="margin-top:14px"></div>`,
    montar(el) {
      let filtro = 'todos';
      const lista = el.querySelector('#vlist');
      function render(animar) {
        const q = el.querySelector('#busca').value.trim().toLowerCase().replace('-', '');
        const vs = D.VEICULOS.filter((v) => (filtro === 'todos' || v.status === filtro)
          && (v.placa.toLowerCase().includes(q) || v.motorista.toLowerCase().includes(q)));
        lista.innerHTML = vs.map((v) => `
          <a class="card vrow" href="#/veiculo/${v.placa}" data-anim>
            <span class="v-ico ${v.status}"><i class="ms">${v.modelo.match(/Delivery|Sprinter|HR/) ? 'local_shipping' : 'airport_shuttle'}</i></span>
            <div class="grow">
              <h4>${placaFmt(v.placa)} <span class="pill ${v.status}">${STATUS_TXT[v.status]}</span></h4>
              <p>${v.motorista} · ${v.modelo}</p>
              <p><i class="ms" style="font-size:13px;vertical-align:-2px">location_on</i> ${esc(localMaisProximo(v.pos))}</p>
            </div>
            <div class="speed"><div class="num ${v.status === 'movendo' ? 'c-green' : ''}">${v.status === 'movendo' ? v.velAtual : 0}</div><small>km/h</small></div>
          </a>`).join('') || '<p class="muted" style="text-align:center;padding:30px">Nenhum veículo encontrado</p>';
        if (animar) gsap.fromTo(lista.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.4, ease: 'expo.out' });
      }
      render(false);
      el.querySelector('#busca').oninput = () => render(true);
      el.querySelector('#vchips').onclick = (e) => {
        const c = e.target.closest('.chip');
        if (!c) return;
        filtro = c.dataset.f;
        el.querySelectorAll('#vchips .chip').forEach((x) => x.classList.toggle('on', x === c));
        render(true);
      };
    },
  };

  // DETALHE DO VEÍCULO
  function eventosDoDia(v) {
    const ev = [];
    const t = v.trilha;
    ev.push({ t: t[0].t, cls: 'ok', b: 'Ignição ligada', s: localMaisProximo([t[0].lat, t[0].lng]) });
    let i = 0;
    while (i < t.length) {
      const p = t[i];
      if (p.v === 0) {
        let j = i;
        while (j < t.length && t[j].v === 0 && t[j].ign === p.ign) j++;
        const dur = (t[Math.min(j, t.length - 1)].t) - p.t;
        if (dur >= 5) ev.push({ t: p.t, cls: p.ign ? 'warn' : '', b: p.ign ? `Ocioso ${C.fmtHoras(dur)}` : `Parada ${C.fmtHoras(dur)}`, s: localMaisProximo([p.lat, p.lng]) });
        i = Math.max(j, i + 1);
        continue;
      }
      if (p.v > v.limite) ev.push({ t: p.t, cls: 'bad', b: `Excesso de velocidade · ${p.v} km/h`, s: `Limite ${v.limite} km/h · ${localMaisProximo([p.lat, p.lng])}` });
      i++;
    }
    const u = t[t.length - 1];
    ev.push({ t: u.t, cls: v.status === 'movendo' ? 'ok' : v.status === 'offline' ? 'bad' : '', b: v.status === 'offline' ? 'Sinal perdido' : STATUS_TXT[v.status], s: localMaisProximo(v.pos) });
    return ev.slice(-9).reverse();
  }

  const FATOR_PERIODO = { hoje: 1, '7d': 6.2, '30d': 24.5 };

  function metricasVeiculo(v) {
    const f = FATOR_PERIODO[estado.periodo];
    const litros = v.litros * f;
    return `
      <div class="card kpi" data-anim><div class="kpi-head">Km percorrido<span class="kpi-ico"><i class="ms">route</i></span></div>
        <div class="num"><span data-count="${(v.km * f).toFixed(1)}" data-dec="1">0</span><small>km</small></div></div>
      <div class="card kpi" data-anim><div class="kpi-head">Velocidade máx.<span class="kpi-ico ${v.velMax > v.limite ? 'red' : 'green'}"><i class="ms">speed</i></span></div>
        <div class="num ${v.velMax > v.limite ? 'c-red' : ''}"><span data-count="${v.velMax}">0</span><small>km/h</small></div>
        <div class="kpi-foot">Limite ${v.limite} km/h</div></div>
      <div class="card kpi" data-anim><div class="kpi-head">Tempo parado<span class="kpi-ico"><i class="ms">local_parking</i></span></div>
        <div class="num" data-count="${v.minParado * f}" data-fmt="horas">0m</div><div class="kpi-foot">Ignição desligada</div></div>
      <div class="card kpi" data-anim><div class="kpi-head">Tempo ocioso<span class="kpi-ico orange"><i class="ms">hourglass_top</i></span></div>
        <div class="num c-orange" data-count="${v.minOcioso * f}" data-fmt="horas">0m</div>
        <div class="kpi-foot">≈ ${C.fmtNum(C.litrosOciosos(v.minOcioso * f), 1)} L desperdiçados</div></div>
      <div class="card kpi" data-anim><div class="kpi-head">Combustível<span class="kpi-ico"><i class="ms">local_gas_station</i></span></div>
        <div class="num"><span data-count="${litros.toFixed(1)}" data-dec="1">0</span><small>L</small></div>
        <div class="kpi-foot">${C.fmtBRL(litros * estado.preco)} · ${C.fmtNum(v.kmPorLitro, 1)} km/l</div></div>
      <div class="card kpi" data-anim><div class="kpi-head">Odômetro<span class="kpi-ico"><i class="ms">avg_pace</i></span></div>
        <div class="num"><span data-count="${v.odometroAtual}">0</span><small>km</small></div></div>`;
  }

  TELAS.veiculo = {
    aba: 'veiculos',
    html(placa) {
      const v = D.veiculo(placa) || D.VEICULOS[0];
      const prox = v.manutencao.map((m) => ({ m, km: C.kmAteManutencao(m, v.odometroAtual) })).sort((a, b) => a.km - b.km)[0];
      return `
        <header class="topbar">
          <button class="icon-btn" onclick="history.back()" aria-label="Voltar"><i class="ms">arrow_back</i></button>
          <div class="grow"><h2>${placaFmt(v.placa)}</h2><div class="sub">${v.modelo} · ${v.motorista}</div></div>
          <span class="pill ${v.status}"><span class="dot ${v.status}"></span>${v.status === 'movendo' ? `${v.velAtual} km/h` : STATUS_TXT[v.status]}</span>
        </header>
        <div class="pad" data-anim><div class="map mini" id="map-v"></div></div>
        <div class="seg" id="periodo" data-anim>
          ${[['hoje', 'Hoje'], ['7d', '7 dias'], ['30d', '30 dias']].map(([k, t]) => `<button data-p="${k}" class="${estado.periodo === k ? 'on' : ''}">${t}</button>`).join('')}
        </div>
        <div class="grid2" id="metricas" style="margin-top:12px">${metricasVeiculo(v)}</div>
        ${prox ? `
        <div class="section-title"><span>Próxima manutenção</span></div>
        <div class="pad" style="padding-top:0" data-anim>
          <a class="card" href="#/manutencao" style="display:block">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <b><i class="ms" style="font-size:18px;vertical-align:-4px">${prox.m.icone}</i> ${prox.m.tipo}</b>
              <span class="${prox.km < 0 ? 'c-red' : prox.km < 1500 ? 'c-orange' : 'muted'}">${prox.km < 0 ? `vencida há ${C.fmtNum(-prox.km)} km` : `em ${C.fmtNum(prox.km)} km`}</span>
            </div>
            <div class="progress ${prox.km < 0 ? 'red' : prox.km < 1500 ? 'orange' : 'blue'}"><i data-bar="${C.progressoManutencao(prox.m, v.odometroAtual)}"></i></div>
          </a>
        </div>` : ''}
        <div class="section-title"><span>Linha do tempo · hoje</span></div>
        <div class="pad" style="padding-top:0" data-anim>
          <div class="card"><div class="timeline">
            ${eventosDoDia(v).map((e) => `<div class="tl-item ${e.cls}"><time>${hhmm(e.t)}</time><b>${e.b}</b><span>${esc(e.s)}</span></div>`).join('')}
          </div></div>
        </div>
        <div class="pad btn-row" data-anim>
          <button class="btn" data-ligar="${v.motorista}"><i class="ms">call</i>Ligar</button>
          <button class="btn primary" id="nova-rota-v"><i class="ms">add_road</i>Nova rota</button>
        </div>`;
    },
    montar(el, placa) {
      const v = D.veiculo(placa) || D.VEICULOS[0];
      const mapa = criarMapa(el.querySelector('#map-v'), { dragging: true, scrollWheelZoom: false });
      const pts = v.trilha.map((p) => [p.lat, p.lng]);
      mapa.fitBounds(L.latLngBounds(pts), { padding: [24, 24] });
      // Traçado pelas ruas do roteiro do dia; pontos da trilha são "colados" na geometria.
      const roteiro = [...v.roteiro, v.roteiro[0]].map((k) => D.LOCAIS[k].pos);
      const colar = (geo, p) => geo.reduce((a, b) => (C.haversineKm(b, p) < C.haversineKm(a, p) ? b : a));
      el.addEventListener('visivel', async () => {
        mapa.invalidateSize();
        const geo = await rotear(roteiro);
        if (!el.isConnected) return;
        const linha = L.polyline(geo.coords, { color: '#ff4302', weight: 4, opacity: 0.95, className: 'route-line' }).addTo(mapa);
        v.excessos.forEach((p) => L.circleMarker(colar(geo.coords, [p.lat, p.lng]), { radius: 6, color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.9 }).addTo(mapa));
        L.marker(colar(geo.coords, v.pos), { icon: iconeVeiculo(v) }).addTo(mapa);
        mapa.fitBounds(linha.getBounds(), { padding: [24, 24] });
        Motion.tracar(linha, 2.2);
        Motion.popMarcadores(el.querySelector('#map-v'));
      }, { once: true });

      el.querySelector('#periodo').onclick = (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        estado.periodo = b.dataset.p;
        el.querySelectorAll('#periodo button').forEach((x) => x.classList.toggle('on', x === b));
        const box = el.querySelector('#metricas');
        box.innerHTML = metricasVeiculo(v);
        Motion.entrar(box);
      };
      el.querySelector('#nova-rota-v').onclick = () => {
        estado.plano.placa = v.placa;
        salvar();
        location.hash = '#/rota/nova';
      };
      ligarMotorista(el);
    },
  };

  // ROTAS
  TELAS.rotas = {
    html: () => `
      <header class="topbar"><div class="grow"><h2>Rotas</h2><div class="sub">${D.ROTAS.filter((r) => r.status === 'ativa').length} em andamento</div></div></header>
      <div class="pad" data-anim>
        <a class="card" href="#/rota/nova" style="display:flex;gap:14px;align-items:center;background:var(--pontos),linear-gradient(135deg,#ff4302,#c43200);border:0">
          <span class="kpi-ico" style="background:rgba(255,255,255,.18);color:#fff;width:44px;height:44px"><i class="ms">add_road</i></span>
          <div class="grow"><b style="font:600 17px var(--font-head)">Montar nova rota</b><p style="font-size:13px;opacity:.85">Paradas, otimização, distância e custo de combustível</p></div>
          <i class="ms">chevron_right</i>
        </a>
      </div>
      <div class="section-title"><span>Hoje</span></div>
      <div class="list">
        ${D.ROTAS.map((r) => {
          const v = D.veiculo(r.placa);
          const st = { ativa: ['movendo', 'Em andamento'], planejada: ['blue', 'Planejada'], concluida: ['parado', 'Concluída'] }[r.status];
          return `
          <a class="card route-card" href="${r.status === 'ativa' ? '#/rota/exec' : '#/rota/nova'}" data-anim>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <h4>${r.nome}</h4><span class="pill ${st[0]}">${st[1]}</span>
            </div>
            <p class="muted" style="font-size:13px;margin-bottom:10px">${placaFmt(r.placa)} · ${v.motorista} · ${r.paradas} paradas · ${C.fmtNum(r.km, 1)} km</p>
            <div class="progress ${r.status === 'concluida' ? '' : 'blue'}"><i data-bar="${r.progresso}"></i></div>
          </a>`;
        }).join('')}
      </div>`,
  };

  // NOVA ROTA (roteirizador)
  TELAS['rota/nova'] = {
    semAbas: true,
    aba: 'rotas',
    html() {
      return `
        <header class="topbar">
          <button class="icon-btn" onclick="history.back()" aria-label="Voltar"><i class="ms">arrow_back</i></button>
          <div class="grow"><h2>Nova rota</h2><div class="sub" id="fonte"><span class="live-dot"></span>Calculando…</div></div>
          <button class="icon-btn" id="reset" aria-label="Restaurar exemplo"><i class="ms">restart_alt</i></button>
        </header>
        <div class="map hero short" id="map-r" data-anim>
          <div class="map-float" style="left:12px;bottom:12px"><i class="ms" style="font-size:16px">touch_app</i>Toque no mapa para adicionar parada</div>
        </div>
        <div class="pad" data-anim>
          <label class="muted" style="font-size:12px;display:block;margin-bottom:6px" for="vsel">Veículo</label>
          <select class="vsel" id="vsel">
            ${D.VEICULOS.filter((v) => v.status !== 'offline').map((v) => `<option value="${v.placa}" ${v.placa === estado.plano.placa ? 'selected' : ''}>${placaFmt(v.placa)} · ${v.modelo} · ${C.fmtNum(v.kmPorLitro, 1)} km/l</option>`).join('')}
          </select>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 20px 10px" data-anim>
          <div><b style="font:600 17px var(--font-head)">Sequência de paradas</b><p class="muted" style="font-size:12px" id="nparadas"></p></div>
          <button class="btn sm" id="otimizar"><i class="ms">auto_fix_high</i>Otimizar ordem</button>
        </div>
        <div class="list" id="paradas" data-anim></div>
        <div class="pad" data-anim>
          <button class="add-stop" id="add"><i class="ms">add_location_alt</i>Adicionar parada</button>
          <div id="add-box" hidden style="margin-top:10px">
            <label class="search" style="margin:0"><i class="ms muted">search</i><input id="q" placeholder="Buscar endereço em Fortaleza"></label>
            <div class="suggest" id="sug"></div>
          </div>
        </div>
        <div class="summary">
          <div class="grid4">
            <div class="metric-box"><label>Distância</label><div class="num" id="m-km">–</div></div>
            <div class="metric-box"><label>Tempo</label><div class="num c-green" id="m-min">–</div></div>
            <div class="metric-box"><label>Consumo</label><div class="num" id="m-l">–</div></div>
            <div class="metric-box"><label>Custo</label><div class="num c-orange" id="m-r" style="font-size:16px">–</div></div>
          </div>
          <div class="price-row">
            <span id="kml"></span>
            <label>Gasolina R$ <input id="preco" type="number" step="0.01" min="0" value="${estado.preco.toFixed(2)}">/L</label>
          </div>
          <button class="btn primary block" id="iniciar"><i class="ms">navigation</i>Iniciar rota</button>
        </div>`;
    },
    montar(el) {
      const pl = estado.plano;
      const mapa = criarMapa(el.querySelector('#map-r'));
      const camada = L.layerGroup().addTo(mapa);
      let geoAtual = null;
      let pedido = 0;
      const valores = { km: 0, min: 0, l: 0, r: 0 };

      function renderLista() {
        const mid = pl.paradas.map((p, i) => `
          <div class="stop mid" data-i="${i}">
            <i class="ms handle">drag_indicator</i><span class="badge">${i + 1}</span>
            <div class="grow"><b>${esc(p.nome)}</b><small class="leg" data-leg="${i}">…</small></div>
            <button class="rm" data-rm="${i}" aria-label="Remover parada"><i class="ms">close</i></button>
          </div>`).join('');
        el.querySelector('#paradas').innerHTML = `
          <div class="stop"><i class="ms handle" style="opacity:.2">drag_indicator</i><span class="badge origem">A</span>
            <div class="grow"><b>${esc(pl.origem.nome)}</b><small>Partida · ${hhmm(D.AGORA_MIN)}</small></div></div>
          <div id="mids" class="list" style="padding:0">${mid}</div>
          <div class="stop"><i class="ms handle" style="opacity:.2">drag_indicator</i><span class="badge destino">B</span>
            <div class="grow"><b>${esc(pl.destino.nome)}</b><small class="leg" data-leg="${pl.paradas.length}">Retorno</small></div></div>`;
        el.querySelector('#nparadas').textContent = `${pl.paradas.length + 2} pontos · ${pl.paradas.length} entregas`;
        Sortable.create(el.querySelector('#mids'), {
          handle: '.handle', animation: 180,
          onEnd(ev) {
            if (ev.oldIndex === ev.newIndex) return;
            const [it] = pl.paradas.splice(ev.oldIndex, 1);
            pl.paradas.splice(ev.newIndex, 0, it);
            atualizar();
          },
        });
      }

      function animarValor(chave, alvo, idEl, fmt) {
        const obj = { v: valores[chave] };
        gsap.to(obj, { v: alvo, duration: 0.8, ease: 'power3.out', onUpdate: () => (el.querySelector(idEl).innerHTML = fmt(obj.v)) });
        valores[chave] = alvo;
      }

      function resumo() {
        if (!geoAtual) return;
        const v = D.veiculo(pl.placa);
        const l = C.litros(geoAtual.km, v.kmPorLitro);
        el.querySelector('#kml').textContent = `${placaFmt(v.placa)} · ${C.fmtNum(v.kmPorLitro, 1)} km/l`;
        animarValor('km', geoAtual.km, '#m-km', (x) => `${C.fmtNum(x, 1)}<small>km</small>`);
        animarValor('min', geoAtual.min, '#m-min', (x) => C.fmtHoras(x));
        animarValor('l', l, '#m-l', (x) => `${C.fmtNum(x, 1)}<small>L</small>`);
        animarValor('r', C.custo(l, estado.preco), '#m-r', (x) => C.fmtBRL(x));
      }

      async function atualizar(tracar = true) {
        salvar();
        renderLista();
        const id = ++pedido;
        el.querySelector('#fonte').innerHTML = '<span class="live-dot"></span>Calculando rota…';
        const geo = await rotear(pontosDoPlano(pl));
        if (id !== pedido || !el.isConnected) return;
        geoAtual = geo;
        el.querySelector('#fonte').innerHTML = `<span class="live-dot"></span>${geo.fonte === 'osrm' ? 'Rota por ruas · OSRM' : 'Rota estimada (offline)'}`;
        camada.clearLayers();
        const linha = L.polyline(geo.coords, { color: '#ff4302', weight: 5, opacity: 0.95, className: 'route-line' }).addTo(camada);
        L.marker(pl.origem.pos, { icon: iconePin('A', 'origem') }).addTo(camada);
        pl.paradas.forEach((p, i) => L.marker(p.pos, { icon: iconePin(i + 1) }).addTo(camada));
        if (C.haversineKm(pl.origem.pos, pl.destino.pos) > 0.05) L.marker(pl.destino.pos, { icon: iconePin('B', 'destino') }).addTo(camada);
        mapa.fitBounds(linha.getBounds(), { padding: [36, 36] });
        if (tracar) Motion.tracar(linha, 1.4);
        el.querySelectorAll('.leg').forEach((s) => {
          const lg = geo.pernas[+s.dataset.leg];
          if (lg) s.textContent = `+${C.fmtNum(lg.km, 1)} km · ${C.fmtHoras(lg.min)}${+s.dataset.leg === pl.paradas.length ? ' · retorno' : ''}`;
        });
        resumo();
      }

      el.querySelector('#paradas').onclick = (e) => {
        const b = e.target.closest('[data-rm]');
        if (!b) return;
        pl.paradas.splice(+b.dataset.rm, 1);
        atualizar();
      };

      el.querySelector('#vsel').onchange = (e) => { pl.placa = e.target.value; salvar(); resumo(); };
      el.querySelector('#preco').oninput = (e) => {
        const n = parseFloat(e.target.value);
        if (n > 0) { estado.preco = n; salvar(); resumo(); }
      };

      el.querySelector('#otimizar').onclick = async (e) => {
        if (pl.paradas.length < 2) return Motion.toast('Adicione ao menos 2 paradas');
        const antes = geoAtual ? geoAtual.km : 0;
        const ordem = C.otimizarOrdem(pl.origem, pl.paradas, pl.destino);
        const tentativa = { ...pl, paradas: ordem };
        const geo = await rotear(pontosDoPlano(tentativa));
        Motion.pulso(e.currentTarget);
        if (geo.km >= antes - 0.05) return Motion.toast('A ordem atual já é a mais curta');
        pl.paradas = ordem;
        await atualizar();
        Motion.toast(`Ordem otimizada: −${C.fmtNum(antes - geo.km, 1)} km`);
      };

      el.querySelector('#reset').onclick = () => {
        estado.plano = clonar(D.ROTA_PADRAO);
        location.reload();
      };

      // Adicionar parada: sugestões locais + busca Nominatim + toque no mapa.
      const box = el.querySelector('#add-box');
      const sug = el.querySelector('#sug');
      function sugestoesLocais() {
        const usados = new Set([pl.origem.nome, ...pl.paradas.map((p) => p.nome)]);
        return Object.values(D.LOCAIS).filter((l) => !usados.has(l.nome)).slice(0, 5);
      }
      function mostrarSug(itens) {
        sug.innerHTML = itens.map((l, i) => `<button data-s="${i}"><i class="ms" style="font-size:16px;vertical-align:-3px">location_on</i> ${esc(l.nome)}</button>`).join('')
          || '<p class="muted" style="font-size:12px;padding:6px">Nada encontrado</p>';
        sug.onclick = (e) => {
          const b = e.target.closest('[data-s]');
          if (!b) return;
          adicionar(itens[+b.dataset.s]);
        };
      }
      function adicionar(local) {
        pl.paradas.push({ nome: local.nome, pos: local.pos.slice() });
        box.hidden = true;
        el.querySelector('#q').value = '';
        atualizar();
        Motion.toast('Parada adicionada');
      }
      el.querySelector('#add').onclick = () => {
        box.hidden = !box.hidden;
        if (!box.hidden) {
          mostrarSug(sugestoesLocais());
          gsap.fromTo(box, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'expo.out' });
          el.querySelector('#q').focus();
        }
      };
      let debounce;
      el.querySelector('#q').oninput = (e) => {
        clearTimeout(debounce);
        const q = e.target.value.trim();
        if (q.length < 3) return mostrarSug(sugestoesLocais());
        debounce = setTimeout(async () => {
          try {
            const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=br&viewbox=-38.65,-3.69,-38.40,-3.89&bounded=1&q=${encodeURIComponent(q)}`;
            const r = await (await fetch(url, { headers: { 'Accept-Language': 'pt-BR' } })).json();
            mostrarSug(r.map((x) => ({ nome: x.display_name.split(',').slice(0, 2).join(' –'), pos: [+x.lat, +x.lon] })));
          } catch {
            mostrarSug(sugestoesLocais().filter((l) => l.nome.toLowerCase().includes(q.toLowerCase())));
          }
        }, 450);
      };
      mapa.on('click', (e) => adicionar({ nome: localMaisProximo([e.latlng.lat, e.latlng.lng]).replace('Em via · próx.', 'Ponto próx.'), pos: [e.latlng.lat, e.latlng.lng] }));

      el.querySelector('#iniciar').onclick = () => {
        if (!geoAtual) return;
        estado.rotaAtiva = { plano: clonar(pl), geo: geoAtual, progresso: 0 };
        location.hash = '#/rota/exec';
      };

      el.addEventListener('visivel', () => { mapa.invalidateSize(); atualizar(); }, { once: true });
      renderLista();
      mapa.setView([-3.76, -38.52], 12);
    },
  };

  // ROTA EM EXECUÇÃO
  TELAS['rota/exec'] = {
    semAbas: true,
    aba: 'rotas',
    html() {
      const ra = estado.rotaAtiva;
      const v = D.veiculo(ra ? ra.plano.placa : D.ROTAS[0].placa);
      return `
        <div class="map full" id="map-e"></div>
        <div class="exec-top">
          <button class="icon-btn" onclick="history.back()" aria-label="Voltar"><i class="ms">arrow_back</i></button>
          <div class="map-float"><span class="dot movendo"></span><b>${placaFmt(v.placa)}</b>· ${v.motorista}</div>
          <button class="icon-btn" id="vel" aria-label="Acelerar simulação" style="margin-left:auto;width:auto;padding:0 10px;font:600 13px var(--font-head)">1×</button>
        </div>
        <div class="alert-banner" id="desvio" hidden><i class="ms">wrong_location</i><span>Desvio de rota detectado · <b id="desvio-m">320</b> m</span></div>
        <div class="sheet" id="sheet">
          <div class="grab"></div>
          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:12px">
            <div><small class="muted">Velocidade atual</small><div class="num" style="font-size:40px"><span id="e-vel">0</span><small>km/h</small></div></div>
            <div style="text-align:right"><small class="muted">Chegada prevista</small><div class="num c-green" style="font-size:26px" id="e-eta">--:--</div></div>
          </div>
          <div class="grid3" style="margin-bottom:12px">
            <div class="metric-box"><label>Restante</label><div class="num" id="e-km">–</div></div>
            <div class="metric-box"><label>Percorrido</label><div class="num" id="e-feito">–</div></div>
            <div class="metric-box"><label>Combust.</label><div class="num" id="e-l">–</div></div>
          </div>
          <div class="progress" style="margin-bottom:6px"><i id="e-bar" style="width:0"></i></div>
          <div style="display:flex;justify-content:space-between;font-size:12px" class="muted"><span id="e-pct">0%</span><span id="e-par"></span></div>
          <div class="timeline" id="e-stops" style="margin:18px 0"></div>
          <div class="btn-row">
            <button class="btn" data-ligar="${v.motorista}"><i class="ms">call</i>Ligar</button>
            <button class="btn danger" id="encerrar"><i class="ms">stop_circle</i>Encerrar</button>
          </div>
        </div>`;
    },
    montar(el) {
      ligarMotorista(el);
      const mapa = criarMapa(el.querySelector('#map-e'));
      mapa.setView([-3.76, -38.52], 12);
      let tl = null;
      let vel = 1;
      aoSair(() => tl && tl.kill());

      async function iniciar() {
        let ra = estado.rotaAtiva;
        if (!ra) {
          const plano = clonar(D.ROTA_PADRAO);
          plano.paradas = C.otimizarOrdem(plano.origem, plano.paradas, plano.destino);
          ra = estado.rotaAtiva = { plano, geo: await rotear(pontosDoPlano(plano)), progresso: 0.55 };
        }
        if (!el.isConnected) return;
        const { plano, geo } = ra;
        const v = D.veiculo(plano.placa);
        const pontos = [plano.origem, ...plano.paradas, plano.destino];

        // Fração da rota em que cada parada é alcançada
        const fr = [0];
        let acc = 0;
        geo.pernas.forEach((p) => { acc += p.km; fr.push(acc / geo.km); });

        L.polyline(geo.coords, { color: '#ff4302', weight: 5, opacity: 0.35, dashArray: '2 10', lineCap: 'round' }).addTo(mapa);
        const feita = L.polyline([], { color: '#ff4302', weight: 6, className: 'route-line' }).addTo(mapa);
        const pins = pontos.map((p, i) => L.marker(p.pos, {
          icon: iconePin(i === 0 ? 'A' : i === pontos.length - 1 ? 'B' : i, i === 0 ? 'origem' : i === pontos.length - 1 ? 'destino' : ''),
        }).addTo(mapa));
        const van = L.marker(geo.coords[0], { icon: iconeVan(), zIndexOffset: 1000 }).addTo(mapa);
        mapa.invalidateSize();
        const alturaSheet = el.querySelector('#sheet').offsetHeight;
        // Enquadra a rota na área visível acima do bottom sheet.
        const b = L.latLngBounds(geo.coords);
        const z = mapa.getBoundsZoom(b, false, L.point(48, 70 + alturaSheet + 16)) - 0.5;
        const centro = mapa.project(b.getCenter(), z).add([0, (alturaSheet + 16 - 70) / 2]);
        mapa.setView(mapa.unproject(centro, z), z, { animate: false });
        Motion.popMarcadores(el.querySelector('#map-e'));

        const stopsEl = el.querySelector('#e-stops');
        stopsEl.innerHTML = pontos.map((p, i) => `<div class="tl-item" data-st="${i}"><time></time><b>${esc(p.nome)}</b><span></span></div>`).join('');

        const banner = el.querySelector('#desvio');
        let desvioMostrado = false;
        const estadoAnim = { f: ra.progresso };

        function quadro() {
          const f = estadoAnim.f;
          ra.progresso = f;
          const total = geo.coords.length;
          // Trecho percorrido: pontos da geometria até a fração atual
          let corte = 1;
          const alvoKm = geo.km * f;
          let soma = 0;
          for (; corte < total; corte++) {
            soma += C.haversineKm(geo.coords[corte - 1], geo.coords[corte]) * (geo.fonte === 'osrm' ? 1 : 1.35);
            if (soma >= alvoKm) break;
          }
          let pos = C.pontoNaFracao(geo.coords, f);
          // Desvio simulado entre 68% e 76% da rota
          const emDesvio = f > 0.68 && f < 0.76;
          if (emDesvio) pos = [pos[0] + 0.0028 * Math.sin((f - 0.68) * 39), pos[1] + 0.0028 * Math.sin((f - 0.68) * 39)];
          if (emDesvio && !desvioMostrado) {
            desvioMostrado = true;
            banner.hidden = false;
            gsap.fromTo(banner, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' });
          }
          if (!emDesvio && desvioMostrado && !banner.hidden && f >= 0.76) {
            gsap.to(banner, { y: -30, opacity: 0, duration: 0.35, onComplete: () => (banner.hidden = true) });
          }
          if (emDesvio) el.querySelector('#desvio-m').textContent = Math.round(320 * Math.sin(((f - 0.68) / 0.08) * Math.PI));
          van.setLatLng(pos);
          feita.setLatLngs([...geo.coords.slice(0, corte), pos]);

          const restante = geo.km * (1 - f);
          const minRest = geo.min * (1 - f);
          const velAtual = f >= 1 ? 0 : Math.round(38 + 18 * Math.sin(f * 60) + 6 * Math.sin(f * 230));
          el.querySelector('#e-vel').textContent = velAtual;
          el.querySelector('#e-eta').textContent = hhmm(D.AGORA_MIN + minRest);
          el.querySelector('#e-km').innerHTML = `${C.fmtNum(restante, 1)}<small>km</small>`;
          el.querySelector('#e-feito').innerHTML = `${C.fmtNum(geo.km * f, 1)}<small>km</small>`;
          el.querySelector('#e-l').innerHTML = `${C.fmtNum(C.litros(geo.km * f, v.kmPorLitro), 1)}<small>L</small>`;
          el.querySelector('#e-bar').style.width = `${f * 100}%`;
          el.querySelector('#e-pct').textContent = `${Math.round(f * 100)}% concluído`;
          const feitas = fr.filter((x) => x <= f + 0.0001).length;
          el.querySelector('#e-par').textContent = `${Math.min(feitas, pontos.length)}/${pontos.length} pontos`;

          stopsEl.querySelectorAll('.tl-item').forEach((it, i) => {
            const ok = fr[i] <= f + 0.0001;
            const prox = !ok && (i === 0 || fr[i - 1] <= f + 0.0001);
            it.className = `tl-item ${ok ? 'ok' : prox ? 'warn' : ''}`;
            it.querySelector('time').textContent = ok
              ? `✓ ${hhmm(D.AGORA_MIN - geo.min * (f - fr[i]))}`
              : `${prox ? 'Próxima · ' : ''}${hhmm(D.AGORA_MIN + geo.min * (fr[i] - f))}`;
            it.querySelector('span').textContent = i === 0 ? 'Saída' : `${C.fmtNum(geo.pernas[i - 1].km, 1)} km do ponto anterior`;
            const icon = pins[i].getElement && pins[i].getElement();
            if (icon) icon.querySelector('.stop-pin').classList.toggle('feito', ok && i > 0 && i < pontos.length - 1);
          });
        }

        quadro();
        const duracao = 70 * (1 - ra.progresso);
        tl = gsap.to(estadoAnim, {
          f: 1, duration: Math.max(duracao, 5), ease: 'none', onUpdate: quadro,
          onComplete: () => Motion.toast('Rota concluída · veículo no destino'),
        });
      }

      el.querySelector('#vel').onclick = (e) => {
        vel = vel === 1 ? 4 : vel === 4 ? 10 : 1;
        e.currentTarget.textContent = `${vel}×`;
        tl && tl.timeScale(vel);
      };
      el.querySelector('#encerrar').onclick = () => {
        tl && tl.kill();
        estado.rotaAtiva = null;
        Motion.toast('Rota encerrada e salva no histórico');
        location.hash = '#/rotas';
      };
      el.addEventListener('visivel', iniciar, { once: true });
    },
  };

  // MANUTENÇÃO
  function itemManut(v, m) {
    const km = C.kmAteManutencao(m, v.odometroAtual);
    const prog = C.progressoManutencao(m, v.odometroAtual);
    const cls = km < 0 ? 'red' : km < 1500 ? 'orange' : 'blue';
    return `
      <div class="mitem ${km < 0 ? 'vencida' : ''}" data-item="${v.placa}:${m.id}">
        <span class="mi"><i class="ms">${m.icone}</i></span>
        <div>
          <b>${m.tipo}</b>
          <div class="km">${C.fmtNum(v.odometroAtual - m.ultimoKm)} / ${C.fmtNum(m.intervaloKm)} km ·
            <span class="${km < 0 ? 'c-red' : km < 1500 ? 'c-orange' : ''}">${km < 0 ? `VENCIDA há ${C.fmtNum(-km)} km` : `faltam ${C.fmtNum(km)} km`}</span></div>
          <div class="progress ${cls}"><i data-bar="${Math.min(prog, 1)}"></i></div>
        </div>
        ${km < 0
          ? `<button class="btn sm" data-agendar="${v.placa}:${m.id}" style="color:var(--orange-soft)">Agendar</button>`
          : `<button class="check" data-feito="${v.placa}:${m.id}" aria-label="Marcar ${m.tipo} como feito"><i class="ms">check</i></button>`}
      </div>`;
  }

  TELAS.manutencao = {
    html() {
      const todos = D.VEICULOS.flatMap((v) => v.manutencao.map((m) => C.kmAteManutencao(m, v.odometroAtual)));
      const venc = todos.filter((k) => k < 0).length;
      const prox = todos.filter((k) => k >= 0 && k < 1500).length;
      const urg = (v) => Math.min(...v.manutencao.map((m) => C.kmAteManutencao(m, v.odometroAtual)));
      const vs = D.VEICULOS.slice().sort((a, b) => urg(a) - urg(b));
      return `
        <header class="topbar"><div class="grow"><h2>Manutenção preventiva</h2><div class="sub">Baseada no odômetro do rastreador</div></div>
          <button class="icon-btn" aria-label="Novo plano" onclick="Motion.toast('Novo plano de manutenção em breve')"><i class="ms">add</i></button></header>
        <div class="chips" data-anim>
          <span class="chip" style="border-color:var(--orange);color:var(--orange-soft)"><i class="ms" style="font-size:16px">warning</i>Vencidas <b>${venc}</b></span>
          <span class="chip">Próximas <b>${prox}</b></span>
          <span class="chip">Em dia <b>${todos.length - venc - prox}</b></span>
        </div>
        <div class="list" style="margin-top:14px">
          ${vs.map((v) => `
            <div class="card" data-anim>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <a href="#/veiculo/${v.placa}"><b style="font:600 16px var(--font-head)">${placaFmt(v.placa)}</b> <span class="muted" style="font-size:12px">${v.modelo}</span></a>
                <span class="muted" style="font-size:12px">${C.fmtNum(v.odometroAtual)} km</span>
              </div>
              ${v.manutencao.map((m) => itemManut(v, m)).join('')}
            </div>`).join('')}
        </div>`;
    },
    montar(el) {
      el.addEventListener('click', (e) => {
        const feito = e.target.closest('[data-feito]');
        const ag = e.target.closest('[data-agendar]');
        if (ag) {
          ag.textContent = 'Agendado ✓';
          ag.disabled = true;
          Motion.toast('Agendamento enviado à oficina parceira');
          return;
        }
        if (!feito) return;
        const [placa, id] = feito.dataset.feito.split(':');
        const v = D.veiculo(placa);
        const m = v.manutencao.find((x) => x.id === id);
        m.ultimoKm = v.odometroAtual;
        estado.manut[`${placa}:${id}`] = m.ultimoKm;
        salvar();
        const linha = el.querySelector(`[data-item="${placa}:${id}"]`);
        const tmp = document.createElement('div');
        tmp.innerHTML = itemManut(v, m);
        const nova = tmp.firstElementChild;
        linha.replaceWith(nova);
        gsap.fromTo(nova, { backgroundColor: 'rgba(34,197,94,.25)' }, { backgroundColor: 'rgba(34,197,94,0)', duration: 1.2 });
        Motion.toast(`${m.tipo} registrada · próximo em ${C.fmtNum(m.intervaloKm)} km`);
      });
    },
  };

  // RELATÓRIOS
  TELAS.relatorios = {
    html() {
      const mes = estado.periodoRel === 'mes';
      const dados = mes
        ? ['S1', 'S2', 'S3', 'S4'].map((dia, i) => {
            const f = [0.92, 1.05, 0.98, 1][i];
            const s = D.SEMANA.reduce((a, d) => ({ km: a.km + d.km, litros: a.litros + d.litros, ocioso: a.ocioso + d.ocioso }), { km: 0, litros: 0, ocioso: 0 });
            return { dia, km: s.km * f, litros: s.litros * f, ocioso: s.ocioso * f };
          })
        : D.SEMANA;
      const km = dados.reduce((s, d) => s + d.km, 0);
      const litros = dados.reduce((s, d) => s + d.litros, 0);
      const ocioso = dados.reduce((s, d) => s + d.ocioso, 0);
      const custoOcioso = C.litrosOciosos(ocioso) * estado.preco;
      const ranking = D.VEICULOS.filter((v) => v.excessos.length).sort((a, b) => b.velMax - a.velMax);
      this.dados = dados;
      this.resumo = { mes, km, litros, gasto: litros * estado.preco, custoOcioso, ranking };
      return `
        <header class="topbar"><div class="grow"><h2>Relatórios</h2><div class="sub">${D.EMPRESA} · ${D.VEICULOS.length} veículos</div></div>
          <button class="icon-btn" id="pdf" aria-label="Enviar relatório em PDF por e-mail"><i class="ms">picture_as_pdf</i></button></header>
        <div class="seg" id="per" data-anim>
          <button data-p="semana" class="${!mes ? 'on' : ''}">Semana</button><button data-p="mes" class="${mes ? 'on' : ''}">Mês</button>
        </div>
        <div class="grid3" style="padding:14px 20px 0">
          <div class="metric-box" data-anim><label>Km</label><div class="num" data-count="${Math.round(km)}">0</div></div>
          <div class="metric-box" data-anim><label>Litros</label><div class="num" data-count="${Math.round(litros)}">0</div></div>
          <div class="metric-box" data-anim><label>Gasto</label><div class="num" style="font-size:15px" data-count="${(litros * estado.preco).toFixed(0)}" data-fmt="brl">0</div></div>
        </div>
        <div class="section-title"><span>Km rodados por ${mes ? 'semana' : 'dia'}</span></div>
        <div class="pad" style="padding-top:0" data-anim><div class="card"><div class="chart-box"><canvas id="ch-km"></canvas></div></div></div>
        <div class="section-title"><span>Consumo de combustível (L)</span></div>
        <div class="pad" style="padding-top:0" data-anim><div class="card"><div class="chart-box"><canvas id="ch-l"></canvas></div></div></div>
        <div class="section-title"><span>Uso do tempo da frota · hoje</span></div>
        <div class="pad" style="padding-top:0" data-anim><div class="card" style="display:flex;align-items:center;gap:16px">
          <div style="width:140px;height:140px;position:relative"><canvas id="ch-t"></canvas></div>
          <div id="leg-t" style="display:grid;gap:8px;font-size:13px"></div>
        </div></div>
        <div class="pad" data-anim>
          <div class="card" style="border-color:rgba(255,176,32,.45);background:linear-gradient(135deg,rgba(255,176,32,.14),var(--surface-2))">
            <div style="display:flex;gap:12px;align-items:center">
              <span class="kpi-ico orange" style="width:42px;height:42px"><i class="ms">savings</i></span>
              <div><small class="muted">Ociosidade custou ${mes ? 'neste mês' : 'nesta semana'}</small>
              <div class="num c-orange" data-count="${custoOcioso.toFixed(2)}" data-fmt="brl">R$ 0</div>
              <small class="muted">${C.fmtHoras(ocioso)} com motor ligado parado</small></div>
            </div>
          </div>
        </div>
        <div class="section-title"><span>Excesso de velocidade</span></div>
        <div class="pad" style="padding-top:0" data-anim><div class="card">
          ${ranking.map((v) => `
            <a class="rank" href="#/veiculo/${v.placa}">
              <span class="avatar">${iniciais(v.motorista)}</span>
              <div style="flex:1"><b>${v.motorista}</b><p class="muted" style="font-size:12px">${placaFmt(v.placa)} · ${v.excessos.length * (mes ? 9 : 3)} ocorrências</p></div>
              <span class="num c-red" style="font-size:20px">${v.velMax}<small>km/h</small></span>
            </a>`).join('') || '<p class="muted">Nenhuma ocorrência</p>'}
        </div></div>
        <div class="pad" data-anim>
          <button class="btn primary block" id="pdf2"><i class="ms">forward_to_inbox</i>Enviar relatório em PDF</button>
        </div>`;
    },
    montar(el) {
      const dados = this.dados;
      Chart.defaults.color = '#7f9ea9';
      Chart.defaults.font.family = 'Mulish';
      Chart.defaults.borderColor = 'rgba(31,90,114,.45)';
      const base = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0e3a4e', borderColor: '#1f5a72', borderWidth: 1 } },
        scales: { x: { grid: { display: false } }, y: { beginAtZero: true, ticks: { maxTicksLimit: 4 } } },
        animation: { duration: Motion.reduz ? 0 : 1100, easing: 'easeOutQuart' },
      };
      const graficos = [
        new Chart(el.querySelector('#ch-km'), {
          type: 'bar',
          data: { labels: dados.map((d) => d.dia), datasets: [{ data: dados.map((d) => +d.km.toFixed(1)), backgroundColor: dados.map((_, i) => (i === dados.length - 1 ? '#ff4302' : 'rgba(255,67,2,.35)')), borderRadius: 6 }] },
          options: base,
        }),
        new Chart(el.querySelector('#ch-l'), {
          type: 'line',
          data: { labels: dados.map((d) => d.dia), datasets: [{ data: dados.map((d) => +d.litros.toFixed(1)), borderColor: '#eeeeee', backgroundColor: 'rgba(95,179,204,.18)', fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#ff4302' }] },
          options: base,
        }),
      ];
      const mov = D.VEICULOS.reduce((s, v) => s + v.minMovimento, 0);
      const par = D.VEICULOS.reduce((s, v) => s + v.minParado, 0);
      const oci = D.VEICULOS.reduce((s, v) => s + v.minOcioso, 0);
      const tot = mov + par + oci;
      const fatias = [['Em movimento', mov, '#22c55e'], ['Parado', par, '#1f5a72'], ['Ocioso', oci, '#ffb020']];
      graficos.push(new Chart(el.querySelector('#ch-t'), {
        type: 'doughnut',
        data: { labels: fatias.map((f) => f[0]), datasets: [{ data: fatias.map((f) => f[1]), backgroundColor: fatias.map((f) => f[2]), borderWidth: 0 }] },
        options: { cutout: '68%', plugins: { legend: { display: false } }, animation: { duration: Motion.reduz ? 0 : 1200 } },
      }));
      el.querySelector('#leg-t').innerHTML = fatias.map((f) => `
        <div style="display:flex;gap:8px;align-items:center"><span class="dot" style="background:${f[2]}"></span>
        <span style="flex:1">${f[0]}</span><b style="font-family:var(--font-head)">${Math.round((f[1] / tot) * 100)}%</b></div>`).join('');
      aoSair(() => graficos.forEach((g) => g.destroy()));

      el.querySelector('#per').onclick = (e) => {
        const b = e.target.closest('button');
        if (!b || b.dataset.p === estado.periodoRel) return;
        estado.periodoRel = b.dataset.p;
        const atualTela = el;
        limpeza.forEach((fn) => fn());
        limpeza = [];
        const nova = document.createElement('section');
        nova.className = 'screen';
        nova.innerHTML = TELAS.relatorios.html();
        atualTela.replaceWith(nova);
        TELAS.relatorios.montar(nova);
        Motion.entrar(nova);
      };
      const abrir = () => abrirEnvio(el, this.resumo, fatias.map((f) => [f[0], Math.round((f[1] / tot) * 100), corRGB(f[2])]));
      el.querySelector('#pdf').onclick = abrir;
      el.querySelector('#pdf2').onclick = abrir;
    },
  };

  // ---------- Envio do relatório em PDF ----------
  const EMAIL_RELATORIO = 'ti.coordenador@ramosgrupo.com.br';
  // Fluxo n8n "rotas-frotas-smtp": monta e-mail HTML no padrão CearaGPS e envia via SMTP com o PDF anexo.
  const WEBHOOK_RELATORIO = 'https://webhook.gpsceara.shop/webhook/rotas-frotas-smtp';
  const corRGB = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

  function abrirEnvio(tela, resumo, tempo) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-card" role="dialog" aria-labelledby="env-tit">
        <div class="grab"></div>
        <h3 id="env-tit">Enviar relatório</h3>
        <p class="muted" style="font-size:13px;margin-bottom:14px">PDF ${resumo.mes ? 'do mês' : 'da semana'} com gráficos, desempenho por veículo e ranking de velocidade.</p>
        <div class="field"><label for="env-email">Enviar para</label>
          <div class="in"><i class="ms">mail</i><input id="env-email" type="email" value="${EMAIL_RELATORIO}"></div></div>
        <div class="env-prev"><i class="ms">picture_as_pdf</i><div><b id="env-nome"></b><small>A4 · 1 página</small></div></div>
        <div class="btn-row" style="margin-top:16px">
          <button class="btn" id="env-baixar"><i class="ms">download</i>Baixar</button>
          <button class="btn primary" id="env-go"><i class="ms">send</i>Enviar</button>
        </div>
      </div>`;
    app.appendChild(modal);
    const fechar = () => gsap.to(modal, { opacity: 0, duration: 0.2, onComplete: () => modal.remove() });
    aoSair(() => modal.remove());
    const agora = new Date();
    const dataArq = agora.toISOString().slice(0, 10);
    const nome = `relatorio-frota-${resumo.mes ? 'mes' : 'semana'}-${dataArq}.pdf`;
    modal.querySelector('#env-nome').textContent = nome;
    if (!Motion.reduz) {
      gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(modal.querySelector('.modal-card'), { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: 'expo.out' });
    }
    modal.onclick = (e) => { if (e.target === modal) fechar(); };

    const periodo = resumo.mes ? 'Últimas 4 semanas' : 'Últimos 7 dias';
    const gerarPDF = () => RelatorioPDF.gerar({
      logoSvg: Marca.logo, empresa: D.EMPRESA, mes: resumo.mes, periodo,
      geradoEm: agora.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
      km: resumo.km, litros: resumo.litros, gasto: resumo.gasto, custoOcioso: resumo.custoOcioso, preco: estado.preco,
      graficos: { km: tela.querySelector('#ch-km'), litros: tela.querySelector('#ch-l'), tempo: tela.querySelector('#ch-t') },
      tempo,
      ranking: resumo.ranking.map((v) => ({ motorista: v.motorista, placa: placaFmt(v.placa), velMax: v.velMax })),
      veiculos: D.VEICULOS.map((v) => ({ ...v, placa: placaFmt(v.placa) })),
    });

    // Plano B sem servidor: baixa o PDF e abre o e-mail endereçado com o resumo.
    function enviarPorMailto(doc, email) {
      doc.save(nome);
      const corpo = [
        `Relatório da frota ${D.EMPRESA} (${periodo.toLowerCase()}):`, '',
        `• Km rodados: ${C.fmtNum(resumo.km)} km`,
        `• Combustível: ${C.fmtNum(resumo.litros)} L (${C.fmtBRL(resumo.gasto)})`,
        `• Custo da ociosidade: ${C.fmtBRL(resumo.custoOcioso)}`, '',
        `PDF completo em anexo: ${nome}`,
      ].join('\n');
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Relatório da frota · ${D.EMPRESA} · ${periodo}`)}&body=${encodeURIComponent(corpo)}`;
    }

    modal.querySelector('#env-baixar').onclick = async () => { (await gerarPDF()).save(nome); fechar(); Motion.toast('PDF baixado'); };

    modal.querySelector('#env-go').onclick = async (e) => {
      const email = modal.querySelector('#env-email').value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Motion.toast('Informe um e-mail válido');
      const btn = e.currentTarget;
      btn.disabled = true;
      btn.innerHTML = '<i class="ms">progress_activity</i>Enviando…';
      const giro = gsap.to(btn.querySelector('.ms'), { rotation: 360, repeat: -1, duration: 0.8, ease: 'none' });
      const doc = await gerarPDF();
      try {
        const r = await fetch(WEBHOOK_RELATORIO, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email, empresa: D.EMPRESA, periodo,
            resumo: {
              km: resumo.km, litros: resumo.litros, gasto: resumo.gasto, custoOcioso: resumo.custoOcioso,
              ranking: resumo.ranking.map((v) => ({ motorista: v.motorista, placa: placaFmt(v.placa), velMax: v.velMax })),
              veiculos: D.VEICULOS.map((v) => ({ placa: placaFmt(v.placa), motorista: v.motorista, km: v.km, velMax: v.velMax, limite: v.limite, minOcioso: v.minOcioso })),
            },
            pdf: { nome, base64: doc.output('datauristring').split(',')[1] },
          }),
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok || !j.ok) throw new Error(j.erro || `HTTP ${r.status}`);
        giro.kill();
        fechar();
        Motion.toast(`Relatório enviado para ${email}`);
      } catch (err) {
        giro.kill();
        fechar();
        enviarPorMailto(doc, email);
        Motion.toast(`Envio automático falhou (${err.message}) · PDF baixado`);
      }
    };
  }

  // Relógio da barra de status avança a partir das 11:30 simuladas.
  const t0 = Date.now();
  setInterval(() => {
    document.getElementById('clock').textContent = hhmm(D.AGORA_MIN + (Date.now() - t0) / 60000);
  }, 10000);

  document.querySelectorAll('[data-marca]').forEach((el) => (el.innerHTML = Marca[el.dataset.marca]));

  window.addEventListener('hashchange', navegar);
  if (!location.hash) history.replaceState(null, '', '#/login');
  navegar();
})();
