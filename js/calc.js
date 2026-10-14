// Cálculos de frota: funções puras, sem dependência de DOM.
(function () {
  const RAIO_TERRA_KM = 6371;
  const rad = (g) => (g * Math.PI) / 180;

  function haversineKm(a, b) {
    const dLat = rad(b[0] - a[0]);
    const dLng = rad(b[1] - a[1]);
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
    return 2 * RAIO_TERRA_KM * Math.asin(Math.sqrt(h));
  }

  // pontos: [[lat, lng], ...]
  function distanciaRota(pontos) {
    let total = 0;
    for (let i = 1; i < pontos.length; i++) total += haversineKm(pontos[i - 1], pontos[i]);
    return total;
  }

  const litros = (km, kmPorLitro) => (kmPorLitro > 0 ? km / kmPorLitro : 0);
  const custo = (litrosGastos, precoLitro) => litrosGastos * precoLitro;

  // trilha: [{t (min), lat, lng, v (km/h), ign (bool)}, ...]
  function kmTrilha(trilha) {
    return distanciaRota(trilha.map((p) => [p.lat, p.lng]));
  }

  function velMax(trilha) {
    return trilha.reduce((max, p) => Math.max(max, p.v), 0);
  }

  // Soma minutos entre pontos consecutivos onde o veículo está parado.
  function somaParado(trilha, ignicaoLigada) {
    let min = 0;
    for (let i = 1; i < trilha.length; i++) {
      const p = trilha[i - 1];
      if (p.v === 0 && p.ign === ignicaoLigada) min += trilha[i].t - p.t;
    }
    return min;
  }
  const tempoParado = (trilha) => somaParado(trilha, false);
  const tempoOcioso = (trilha) => somaParado(trilha, true);

  function tempoMovimento(trilha) {
    let min = 0;
    for (let i = 1; i < trilha.length; i++) if (trilha[i - 1].v > 0) min += trilha[i].t - trilha[i - 1].t;
    return min;
  }

  // Combustível queimado parado com motor ligado (~0,8 L/h para utilitário leve).
  const litrosOciosos = (minOcioso, litrosHora = 0.8) => (minOcioso / 60) * litrosHora;

  function kmAteManutencao(item, odometro) {
    return item.ultimoKm + item.intervaloKm - odometro;
  }
  function progressoManutencao(item, odometro) {
    return Math.max(0, (odometro - item.ultimoKm) / item.intervaloKm);
  }

  // Ordena paradas intermediárias por vizinho mais próximo, mantendo origem e destino fixos.
  function otimizarOrdem(origem, paradas, destino) {
    const restantes = paradas.slice();
    const ordem = [];
    let atual = origem;
    while (restantes.length) {
      let melhor = 0;
      let melhorDist = Infinity;
      restantes.forEach((p, i) => {
        const d = haversineKm(atual.pos, p.pos);
        if (d < melhorDist) { melhorDist = d; melhor = i; }
      });
      atual = restantes.splice(melhor, 1)[0];
      ordem.push(atual);
    }
    return ordem;
  }

  // Ponto a uma fração (0..1) do comprimento de uma polilinha.
  function pontoNaFracao(pontos, fracao) {
    const total = distanciaRota(pontos);
    let alvo = total * Math.min(1, Math.max(0, fracao));
    for (let i = 1; i < pontos.length; i++) {
      const seg = haversineKm(pontos[i - 1], pontos[i]);
      if (alvo <= seg) {
        const f = seg ? alvo / seg : 0;
        return [
          pontos[i - 1][0] + (pontos[i][0] - pontos[i - 1][0]) * f,
          pontos[i - 1][1] + (pontos[i][1] - pontos[i - 1][1]) * f,
        ];
      }
      alvo -= seg;
    }
    return pontos[pontos.length - 1];
  }

  function fmtHoras(min) {
    const h = Math.floor(min / 60);
    const m = Math.round(min % 60);
    return h ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`;
  }
  const fmtNum = (n, dec = 0) =>
    n.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const fmtBRL = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  window.Calc = {
    haversineKm, distanciaRota, litros, custo, kmTrilha, velMax,
    tempoParado, tempoOcioso, tempoMovimento, litrosOciosos,
    kmAteManutencao, progressoManutencao, otimizarOrdem, pontoNaFracao,
    fmtHoras, fmtNum, fmtBRL,
  };
})();
