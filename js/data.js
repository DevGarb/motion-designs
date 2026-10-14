// Dados simulados da frota (Fortaleza-CE). Determinísticos via RNG com semente.
(function () {
  const AGORA_MIN = 11 * 60 + 30; // 11:30, "agora" do protótipo

  const LOCAIS = {
    galpao:    { nome: 'Galpão – Av. Bezerra de Menezes', pos: [-3.7365, -38.5585] },
    aldeota:   { nome: 'Cliente Aldeota – R. Silva Paulet', pos: [-3.7392, -38.4989] },
    iguatemi:  { nome: 'Shopping Iguatemi', pos: [-3.7550, -38.4885] },
    messejana: { nome: 'Messejana – Av. Frei Cirilo', pos: [-3.8305, -38.4925] },
    centro:    { nome: 'Centro – Praça do Ferreira', pos: [-3.7275, -38.5275] },
    iracema:   { nome: 'Praia de Iracema', pos: [-3.7210, -38.5140] },
    papicu:    { nome: 'Terminal Papicu', pos: [-3.7385, -38.4720] },
    parangaba: { nome: 'Parangaba – Lagoa', pos: [-3.7765, -38.5625] },
    maraponga: { nome: 'North Shopping Maraponga', pos: [-3.7925, -38.5645] },
    benfica:   { nome: 'Benfica – Av. 13 de Maio', pos: [-3.7405, -38.5390] },
    montese:   { nome: 'Montese – Av. Gomes de Matos', pos: [-3.7645, -38.5425] },
    coco:      { nome: 'Parque do Cocó', pos: [-3.7520, -38.4795] },
    cambeba:   { nome: 'Cambeba – Centro Administrativo', pos: [-3.8090, -38.4805] },
    conjunto:  { nome: 'Conjunto Ceará', pos: [-3.7720, -38.6060] },
    porto:     { nome: 'Porto do Mucuripe', pos: [-3.7155, -38.4795] },
    aeroporto: { nome: 'Aeroporto Pinto Martins', pos: [-3.7765, -38.5325] },
  };

  const VEICULOS = [
    { placa: 'PMX4A21', modelo: 'Fiat Fiorino 2022', motorista: 'João Silva', kmPorLitro: 11.5, odometro: 48212, limite: 80,
      roteiro: ['galpao', 'aldeota', 'iguatemi', 'messejana'], fim: 'movendo', pico: { perna: 2, v: 97 }, seed: 11 },
    { placa: 'QXB7C10', modelo: 'Fiat Strada 2021', motorista: 'Maria Souza', kmPorLitro: 12.8, odometro: 61240, limite: 80,
      roteiro: ['galpao', 'centro', 'iracema', 'papicu'], fim: 'movendo', seed: 22 },
    { placa: 'RNE2F88', modelo: 'Hyundai HR 2020', motorista: 'Carlos Lima', kmPorLitro: 8.2, odometro: 92400, limite: 70,
      roteiro: ['galpao', 'parangaba', 'maraponga', 'aeroporto'], fim: 'ocioso', seed: 33 },
    { placa: 'SAF3B55', modelo: 'VW Delivery 9.170 2019', motorista: 'Ana Ribeiro', kmPorLitro: 5.6, odometro: 154800, limite: 70,
      roteiro: ['galpao', 'benfica', 'montese'], fim: 'parado', seed: 44 },
    { placa: 'POJ9D14', modelo: 'Renault Kangoo 2023', motorista: 'Pedro Alves', kmPorLitro: 12.0, odometro: 18350, limite: 80,
      roteiro: ['galpao', 'papicu', 'coco', 'porto'], fim: 'movendo', seed: 55 },
    { placa: 'THR1E02', modelo: 'Fiat Toro 2022', motorista: 'Lucas Rocha', kmPorLitro: 9.8, odometro: 40110, limite: 80,
      roteiro: ['galpao', 'messejana', 'cambeba'], fim: 'movendo', pico: { perna: 1, v: 104 }, seed: 66 },
    { placa: 'OCE6G77', modelo: 'Mercedes Sprinter 2021', motorista: 'Fernanda Costa', kmPorLitro: 7.4, odometro: 120900, limite: 70,
      roteiro: ['galpao', 'centro', 'iracema'], fim: 'parado', seed: 77 },
    { placa: 'NQZ5H31', modelo: 'Fiat Fiorino 2020', motorista: 'Rafael Gomes', kmPorLitro: 11.2, odometro: 85030, limite: 80,
      roteiro: ['galpao', 'conjunto', 'parangaba'], fim: 'offline', seed: 88 },
  ];

  // Plano de manutenção: último serviço (km) + intervalo.
  const MANUTENCAO = {
    PMX4A21: [
      { id: 'oleo', tipo: 'Troca de óleo', icone: 'water_drop', ultimoKm: 38212 + 1000, intervaloKm: 10000 },
      { id: 'pneus', tipo: 'Pneus', icone: 'tire_repair', ultimoKm: 16212, intervaloKm: 40000 },
      { id: 'revisao', tipo: 'Revisão geral', icone: 'build', ultimoKm: 40000, intervaloKm: 10000 },
    ],
    QXB7C10: [
      { id: 'oleo', tipo: 'Troca de óleo', icone: 'water_drop', ultimoKm: 50000, intervaloKm: 10000 },
      { id: 'correia', tipo: 'Correia dentada', icone: 'settings', ultimoKm: 3240, intervaloKm: 60000 },
      { id: 'freios', tipo: 'Pastilhas de freio', icone: 'do_not_step', ultimoKm: 48000, intervaloKm: 20000 },
    ],
    RNE2F88: [
      { id: 'freios', tipo: 'Pastilhas de freio', icone: 'do_not_step', ultimoKm: 80000, intervaloKm: 20000 },
      { id: 'oleo', tipo: 'Troca de óleo', icone: 'water_drop', ultimoKm: 85000, intervaloKm: 10000 },
    ],
    SAF3B55: [
      { id: 'oleo', tipo: 'Troca de óleo', icone: 'water_drop', ultimoKm: 145500, intervaloKm: 10000 },
      { id: 'pneus', tipo: 'Pneus', icone: 'tire_repair', ultimoKm: 120000, intervaloKm: 40000 },
      { id: 'filtro', tipo: 'Filtro de ar', icone: 'air', ultimoKm: 139000, intervaloKm: 15000 },
    ],
    POJ9D14: [
      { id: 'oleo', tipo: 'Troca de óleo', icone: 'water_drop', ultimoKm: 10000, intervaloKm: 10000 },
      { id: 'revisao', tipo: 'Revisão geral', icone: 'build', ultimoKm: 10000, intervaloKm: 10000 },
    ],
    THR1E02: [
      { id: 'oleo', tipo: 'Troca de óleo', icone: 'water_drop', ultimoKm: 31000, intervaloKm: 10000 },
      { id: 'pneus', tipo: 'Pneus', icone: 'tire_repair', ultimoKm: 2000, intervaloKm: 40000 },
    ],
    OCE6G77: [
      { id: 'oleo', tipo: 'Troca de óleo', icone: 'water_drop', ultimoKm: 112000, intervaloKm: 10000 },
      { id: 'freios', tipo: 'Pastilhas de freio', icone: 'do_not_step', ultimoKm: 104000, intervaloKm: 20000 },
    ],
    NQZ5H31: [
      { id: 'oleo', tipo: 'Troca de óleo', icone: 'water_drop', ultimoKm: 76000, intervaloKm: 10000 },
      { id: 'correia', tipo: 'Correia dentada', icone: 'settings', ultimoKm: 26000, intervaloKm: 60000 },
    ],
  };

  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Gera trilha GPS minuto a minuto: deslocamento entre pontos do roteiro,
  // paradas com ignição desligada e períodos ociosos (motor ligado, parado).
  function gerarTrilha(v) {
    const r = rng(v.seed);
    const pts = [];
    const fimOffline = 9 * 60 + 20;
    const fimParado = AGORA_MIN - 50 - Math.floor(r() * 20);
    let t = 7 * 60 + Math.floor(r() * 25);
    let pos = LOCAIS[v.roteiro[0]].pos.slice();
    const push = (vel, ign) => pts.push({ t, lat: pos[0], lng: pos[1], v: vel, ign });

    // Aquecimento inicial no galpão
    for (let i = 0; i < 4 + Math.floor(r() * 6); i++) { push(0, true); t++; }

    const pernas = [];
    for (let ciclo = 0; ciclo < 3; ciclo++) {
      for (let i = 1; i < v.roteiro.length; i++) pernas.push([v.roteiro[i - 1], v.roteiro[i]]);
      pernas.push([v.roteiro[v.roteiro.length - 1], v.roteiro[0]]);
    }

    const limiteT = v.fim === 'offline' ? fimOffline : v.fim === 'movendo' ? AGORA_MIN : fimParado;

    for (let pi = 0; pi < pernas.length && t < limiteT; pi++) {
      const destino = LOCAIS[pernas[pi][1]].pos;
      while (t < limiteT) {
        const restante = Calc.haversineKm(pos, destino);
        let vel = 28 + r() * 34;
        if (v.pico && v.pico.perna === pi && restante < 3 && restante > 1.5) vel = v.pico.v;
        const passo = vel / 60;
        if (restante <= passo) { pos = destino.slice(); push(Math.round(vel * 0.4), true); t++; break; }
        const f = passo / restante;
        const jitter = () => (r() - 0.5) * 0.0012;
        pos = [pos[0] + (destino[0] - pos[0]) * f + jitter(), pos[1] + (destino[1] - pos[1]) * f + jitter()];
        push(Math.round(vel), true);
        t++;
        // Semáforo / trânsito
        if (r() < 0.12) { push(0, true); t++; }
      }
      // Entrega: desliga motor e depois fica ocioso antes de sair
      const parado = 8 + Math.floor(r() * 18);
      for (let i = 0; i < parado && t < limiteT; i++) { push(0, false); t++; }
      const ocioso = 2 + Math.floor(r() * (v.fim === 'ocioso' ? 14 : 7));
      for (let i = 0; i < ocioso && t < limiteT; i++) { push(0, true); t++; }
    }

    // Estado final até "agora"
    if (v.fim === 'parado') while (t <= AGORA_MIN) { push(0, false); t++; }
    if (v.fim === 'ocioso') while (t <= AGORA_MIN) { push(0, true); t++; }
    if (v.fim === 'movendo') { const u = pts[pts.length - 1]; if (u.v === 0) u.v = 42; }
    return pts;
  }

  // Monta métricas do dia de cada veículo a partir da trilha.
  VEICULOS.forEach((v) => {
    v.trilha = gerarTrilha(v);
    const u = v.trilha[v.trilha.length - 1];
    v.pos = [u.lat, u.lng];
    v.velAtual = u.v;
    v.status = v.fim === 'offline' ? 'offline' : u.v > 0 ? 'movendo' : u.ign ? 'ocioso' : 'parado';
    v.ultimaAtualizacao = u.t;
    v.km = Calc.kmTrilha(v.trilha);
    v.velMax = Calc.velMax(v.trilha);
    v.minParado = Calc.tempoParado(v.trilha);
    v.minOcioso = Calc.tempoOcioso(v.trilha);
    v.minMovimento = Calc.tempoMovimento(v.trilha);
    v.litros = Calc.litros(v.km, v.kmPorLitro) + Calc.litrosOciosos(v.minOcioso);
    v.excessos = v.trilha.filter((p) => p.v > v.limite);
    v.odometroAtual = v.odometro + Math.round(v.km);
    v.manutencao = MANUTENCAO[v.placa] || [];
  });

  // Histórico semanal (relatórios): derivado do dia + variação.
  const DIAS = ['Qua', 'Qui', 'Sex', 'Sáb', 'Dom', 'Seg', 'Ter'];
  const rs = rng(2026);
  const kmHoje = VEICULOS.reduce((s, v) => s + v.km, 0);
  const litrosHoje = VEICULOS.reduce((s, v) => s + v.litros, 0);
  const ociosoHoje = VEICULOS.reduce((s, v) => s + v.minOcioso, 0);
  const SEMANA = DIAS.map((dia, i) => {
    const fator = dia === 'Dom' ? 0.18 : dia === 'Sáb' ? 0.55 : 0.85 + rs() * 0.3;
    const ultimo = i === DIAS.length - 1;
    return {
      dia,
      km: ultimo ? kmHoje : kmHoje * fator * 1.6,
      litros: ultimo ? litrosHoje : litrosHoje * fator * 1.6,
      ocioso: ultimo ? ociosoHoje : ociosoHoje * fator * (1.2 + rs() * 0.6),
    };
  });

  const ROTAS = [
    { id: 'r1', nome: 'Entregas Leste', placa: 'PMX4A21', paradas: 5, km: 42.6, status: 'ativa', progresso: 0.6 },
    { id: 'r2', nome: 'Coleta Centro', placa: 'QXB7C10', paradas: 4, km: 18.9, status: 'ativa', progresso: 0.35 },
    { id: 'r3', nome: 'Abastecimento Sul', placa: 'RNE2F88', paradas: 6, km: 37.2, status: 'planejada', progresso: 0 },
    { id: 'r4', nome: 'Visitas Maraponga', placa: 'SAF3B55', paradas: 3, km: 21.4, status: 'concluida', progresso: 1 },
  ];

  const ROTA_PADRAO = {
    placa: 'PMX4A21',
    origem: { ...LOCAIS.galpao },
    paradas: [LOCAIS.aldeota, LOCAIS.messejana, LOCAIS.iguatemi].map((l) => ({ ...l })),
    destino: { ...LOCAIS.galpao },
  };

  window.Dados = {
    AGORA_MIN, LOCAIS, VEICULOS, SEMANA, ROTAS, ROTA_PADRAO,
    EMPRESA: 'Transportes Litoral',
    PRECO_GASOLINA: 6.09,
    veiculo: (placa) => VEICULOS.find((v) => v.placa === placa),
  };
})();
