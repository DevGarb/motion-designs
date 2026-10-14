// Gera o relatório da frota em PDF (jsPDF) no padrão visual CearaGPS.
(function () {
  const AZUL = [0, 70, 93];
  const LARANJA = [255, 67, 2];
  const CINZA = [238, 238, 238];
  const TEXTO = [20, 40, 50];
  const SUAVE = [110, 135, 145];

  // Rasteriza o logotipo SVG para PNG (jsPDF não desenha SVG).
  function logoPNG(svg, largura = 900) {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = largura;
        c.height = Math.round((largura * img.height) / img.width);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve({ data: c.toDataURL('image/png'), proporcao: c.height / c.width });
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  function etiqueta(doc, texto, y) {
    doc.setFillColor(...LARANJA);
    const w = doc.getTextWidth(texto.toUpperCase()) + 16;
    doc.roundedRect(-6, y - 5, w + 6, 8, 4, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(texto.toUpperCase(), 14, y + 0.6);
  }

  function caixaGrafico(doc, canvas, x, y, w, h) {
    doc.setFillColor(...AZUL);
    doc.roundedRect(x, y, w, h, 3, 3, 'F');
    if (!canvas) return;
    const proporcao = canvas.height / canvas.width;
    const iw = w - 8;
    const ih = Math.min(h - 8, iw * proporcao);
    doc.addImage(canvas.toDataURL('image/png'), 'PNG', x + 4, y + (h - ih) / 2, ih / proporcao, ih);
  }

  async function gerar(o) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210;
    const C = window.Calc;

    // Cabeçalho institucional
    doc.setFillColor(...AZUL);
    doc.rect(0, 0, W, 40, 'F');
    doc.setFillColor(...LARANJA);
    doc.rect(0, 40, W, 1.6, 'F');
    for (let x = 6; x < W; x += 9) for (let y = 5; y < 38; y += 7) {
      doc.setFillColor(...((x + y) % 2 ? LARANJA : [60, 110, 128]));
      doc.circle(x, y, 0.25, 'F');
    }
    const logo = await logoPNG(o.logoSvg);
    if (logo) doc.addImage(logo.data, 'PNG', 14, 20 - (70 * logo.proporcao) / 2, 70, 70 * logo.proporcao);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Relatório da frota', W - 14, 18, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...CINZA);
    doc.text(`${o.periodo} · gerado em ${o.geradoEm}`, W - 14, 25, { align: 'right' });
    doc.text(`${o.empresa} · ${o.veiculos.length} veículos`, W - 14, 30, { align: 'right' });

    // KPIs
    const kpis = [
      ['Km rodados', `${C.fmtNum(o.km)} km`],
      ['Combustível', `${C.fmtNum(o.litros)} L`],
      ['Gasto estimado', C.fmtBRL(o.gasto)],
      ['Custo da ociosidade', C.fmtBRL(o.custoOcioso)],
    ];
    const kw = (W - 28 - 9) / 4;
    kpis.forEach(([rot, val], i) => {
      const x = 14 + i * (kw + 3);
      doc.setFillColor(...CINZA);
      doc.roundedRect(x, 50, kw, 20, 2.5, 2.5, 'F');
      doc.setFillColor(...(i === 3 ? LARANJA : AZUL));
      doc.rect(x, 50, 1.4, 20, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...SUAVE);
      doc.text(rot.toUpperCase(), x + 5, 57);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12.5);
      doc.setTextColor(...(i === 3 ? LARANJA : TEXTO));
      doc.text(val, x + 5, 65);
    });

    // Gráficos
    // Duas etiquetas lado a lado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setFillColor(...LARANJA);
    doc.roundedRect(W / 2 + 2, 77, 70, 8, 4, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text('CONSUMO DE COMBUSTÍVEL (L)', W / 2 + 7, 82.6);
    doc.setFillColor(...LARANJA);
    doc.roundedRect(-6, 77, 70, 8, 4, 4, 'F');
    doc.text((o.mes ? 'KM RODADOS POR SEMANA' : 'KM RODADOS POR DIA'), 14, 82.6);
    caixaGrafico(doc, o.graficos.km, 14, 89, W / 2 - 17, 56);
    caixaGrafico(doc, o.graficos.litros, W / 2 + 3, 89, W / 2 - 17, 56);

    etiqueta(doc, 'Uso do tempo da frota · hoje', 156);
    caixaGrafico(doc, o.graficos.tempo, 14, 163, 50, 50);
    doc.setFontSize(10);
    o.tempo.forEach(([rot, pct, cor], i) => {
      const y = 175 + i * 11;
      doc.setFillColor(...cor);
      doc.circle(72, y - 1.2, 2, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...TEXTO);
      doc.text(rot, 77, y);
      doc.setFont('helvetica', 'bold');
      doc.text(`${pct}%`, 120, y, { align: 'right' });
    });
    // Ranking de velocidade ao lado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...AZUL);
    doc.text('Excesso de velocidade', 132, 170);
    doc.setFontSize(9);
    o.ranking.forEach((r, i) => {
      const y = 179 + i * 9;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...TEXTO);
      doc.text(`${r.motorista} (${r.placa})`, 132, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(239, 68, 68);
      doc.text(`${r.velMax} km/h`, W - 14, y, { align: 'right' });
    });
    if (!o.ranking.length) { doc.setTextColor(...SUAVE); doc.text('Nenhuma ocorrência', 132, 179); }

    // Tabela por veículo
    etiqueta(doc, 'Desempenho por veículo · hoje', 224);
    const cols = [['Placa', 14], ['Motorista', 34], ['Km', 80], ['Vel. máx', 96], ['Parado', 116], ['Ocioso', 136], ['Litros', 156], ['Custo', 193]];
    let y = 233;
    doc.setFillColor(...AZUL);
    doc.rect(14, y - 4.5, W - 28, 7, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    cols.forEach(([t, x], i) => doc.text(t, i === cols.length - 1 ? x : x + 1, y, i === cols.length - 1 ? { align: 'right' } : undefined));
    doc.setFont('helvetica', 'normal');
    o.veiculos.forEach((v, i) => {
      y += 6.6;
      if (i % 2 === 0) { doc.setFillColor(...CINZA); doc.rect(14, y - 4.5, W - 28, 6.6, 'F'); }
      doc.setTextColor(...TEXTO);
      const linha = [v.placa, v.motorista, C.fmtNum(v.km, 1), `${v.velMax}`, C.fmtHoras(v.minParado), C.fmtHoras(v.minOcioso), C.fmtNum(v.litros, 1), C.fmtBRL(v.litros * o.preco)];
      linha.forEach((t, j) => {
        const excesso = j === 3 && v.velMax > v.limite;
        if (excesso) doc.setTextColor(239, 68, 68);
        if (j === 5 && v.minOcioso > 60) doc.setTextColor(...LARANJA);
        doc.text(t, j === linha.length - 1 ? cols[j][1] : cols[j][1] + 1, y, j === linha.length - 1 ? { align: 'right' } : undefined);
        doc.setTextColor(...TEXTO);
      });
    });

    // Rodapé
    doc.setFillColor(...AZUL);
    doc.rect(0, 287, W, 10, 'F');
    doc.setFontSize(8);
    doc.setTextColor(...CINZA);
    doc.text('CearaGPS · cearagps.com.br · Central 24h 0800 606 8153 · (85) 3484-6006', 14, 293);
    doc.setTextColor(...LARANJA);
    doc.text('Protótipo · dados simulados', W - 14, 293, { align: 'right' });

    return doc;
  }

  window.RelatorioPDF = { gerar };
})();
