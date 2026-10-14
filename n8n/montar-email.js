// Code node "Validar e montar e-mail" (n8n). Entrada: POST do protótipo CearaGPS Frotas.
const DOMINIOS = ['ramosgrupo.com.br', 'cearagps.com.br'];
const MAX_PDF_BYTES = 4 * 1024 * 1024;
const LOGO = 'https://devgarb.github.io/motion-designs/roteirizador-frotas/assets/logo-email.png';
const APP = 'https://devgarb.github.io/motion-designs/roteirizador-frotas/#/relatorios';

const b = $json.body || {};
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = (n, d = 0) => Number(n || 0).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
const brl = (n) => Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const horas = (m) => { m = Math.round(m || 0); const h = Math.floor(m / 60); return h ? `${h}h ${String(m % 60).padStart(2, '0')}m` : `${m}m`; };

const email = String(b.email || '').trim().toLowerCase();
const dominio = email.split('@')[1] || '';
const pdf = String(b.pdf?.base64 || '').replace(/^data:[^,]+,/, '');
const bytes = Math.floor(pdf.length * 3 / 4);
let erro = null;
if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) erro = 'E-mail inválido';
else if (!DOMINIOS.includes(dominio)) erro = `Destinatário não permitido (apenas ${DOMINIOS.join(', ')})`;
else if (!pdf || !/^[A-Za-z0-9+/=]+$/.test(pdf)) erro = 'PDF ausente ou inválido';
else if (bytes > MAX_PDF_BYTES) erro = 'PDF maior que 4 MB';
if (erro) return [{ json: { valido: false, erro } }];

const r = b.resumo || {};
const empresa = esc(b.empresa || 'Cliente');
const periodo = esc(b.periodo || '');
const nomeArq = String(b.pdf?.nome || 'relatorio-frota.pdf').replace(/[^\w.\-]/g, '_');
const veiculos = Array.isArray(r.veiculos) ? r.veiculos.slice(0, 50) : [];
const ranking = Array.isArray(r.ranking) ? r.ranking.slice(0, 10) : [];

const F = "font-family:'Mulish',Arial,Helvetica,sans-serif;";
const kpi = (rot, val, destaque) => `
  <td width="50%" style="padding:6px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEEEEE;border-radius:10px;border-left:4px solid ${destaque ? '#FF4302' : '#00465D'};">
      <tr><td style="padding:14px 16px;${F}">
        <div style="font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#6E8791;font-weight:700;">${rot}</div>
        <div style="font-size:22px;font-weight:800;color:${destaque ? '#FF4302' : '#14282F'};margin-top:4px;">${val}</div>
      </td></tr>
    </table>
  </td>`;
const etiqueta = (t) => `
  <tr><td style="padding:26px 0 10px;">
    <span style="display:inline-block;background:#FF4302;color:#ffffff;${F}font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:6px 18px 6px 28px;border-radius:0 999px 999px 0;">${t}</span>
  </td></tr>`;

const linhas = veiculos.map((v, i) => `
  <tr style="background:${i % 2 ? '#ffffff' : '#F4F6F7'};">
    <td style="padding:9px 10px;${F}font-size:13px;font-weight:800;color:#00465D;">${esc(v.placa)}</td>
    <td style="padding:9px 6px;${F}font-size:13px;color:#14282F;">${esc(v.motorista)}</td>
    <td align="right" style="padding:9px 6px;${F}font-size:13px;color:#14282F;">${num(v.km, 1)}</td>
    <td align="right" style="padding:9px 6px;${F}font-size:13px;font-weight:700;color:${v.velMax > v.limite ? '#E53935' : '#14282F'};">${num(v.velMax)}</td>
    <td align="right" style="padding:9px 10px;${F}font-size:13px;color:${v.minOcioso > 60 ? '#FF4302' : '#14282F'};">${horas(v.minOcioso)}</td>
  </tr>`).join('');

const rank = ranking.length ? ranking.map((v) => `
  <tr><td style="padding:8px 0;border-bottom:1px solid #E3E8EA;${F}font-size:14px;color:#14282F;">${esc(v.motorista)} <span style="color:#6E8791;font-size:12px;">${esc(v.placa)}</span></td>
  <td align="right" style="padding:8px 0;border-bottom:1px solid #E3E8EA;${F}font-size:15px;font-weight:800;color:#E53935;">${num(v.velMax)} km/h</td></tr>`).join('')
  : `<tr><td style="${F}font-size:14px;color:#6E8791;">Nenhuma ocorrência no período.</td></tr>`;

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Relatório da frota</title>
<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700;800&display=swap" rel="stylesheet"></head>
<body style="margin:0;padding:0;background:#EEEEEE;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEEEEE;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">

  <tr><td align="center" style="background:#19435B;padding:30px 24px 22px;">
    <img src="${LOGO}" width="260" alt="CearaGPS Frotas" style="display:block;width:260px;max-width:70%;height:auto;border:0;">
  </td></tr>
  <tr><td style="background:#FF4302;height:5px;line-height:5px;font-size:0;">&nbsp;</td></tr>

  <tr><td style="padding:28px 28px 0;">
    <div style="${F}font-size:13px;color:#FF4302;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">Relatório da frota</div>
    <div style="${F}font-size:24px;line-height:1.25;color:#00465D;font-weight:800;margin-top:6px;">${empresa}</div>
    <div style="${F}font-size:14px;color:#6E8791;margin-top:4px;">${periodo} · ${num(veiculos.length)} veículos monitorados</div>
  </td></tr>

  <tr><td style="padding:18px 22px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>${kpi('Km rodados', `${num(r.km)} km`)}${kpi('Combustível', `${num(r.litros)} L`)}</tr>
      <tr>${kpi('Gasto estimado', brl(r.gasto))}${kpi('Custo da ociosidade', brl(r.custoOcioso), true)}</tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 28px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${etiqueta('Desempenho por veículo · hoje')}
    <tr><td style="padding:0 0 0 28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;">
        <tr style="background:#00465D;">
          <th align="left" style="padding:10px;${F}font-size:11px;color:#ffffff;text-transform:uppercase;letter-spacing:.05em;">Placa</th>
          <th align="left" style="padding:10px 6px;${F}font-size:11px;color:#ffffff;text-transform:uppercase;letter-spacing:.05em;">Motorista</th>
          <th align="right" style="padding:10px 6px;${F}font-size:11px;color:#ffffff;text-transform:uppercase;letter-spacing:.05em;">Km</th>
          <th align="right" style="padding:10px 6px;${F}font-size:11px;color:#ffffff;text-transform:uppercase;letter-spacing:.05em;">Vel. máx</th>
          <th align="right" style="padding:10px;${F}font-size:11px;color:#ffffff;text-transform:uppercase;letter-spacing:.05em;">Ocioso</th>
        </tr>
        ${linhas}
      </table>
    </td></tr>
    ${etiqueta('Excesso de velocidade')}
    <tr><td style="padding:0 0 0 28px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rank}</table></td></tr>
  </table></td></tr>

  <tr><td style="padding:26px 28px 6px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6F7;border-radius:10px;border:1px dashed #C9D3D7;">
      <tr><td style="padding:14px 16px;${F}font-size:13px;color:#14282F;">📎 Relatório completo com gráficos em anexo: <b>${esc(nomeArq)}</b></td></tr>
    </table>
  </td></tr>

  <tr><td align="center" style="padding:20px 28px 30px;">
    <a href="${APP}" style="display:inline-block;background:#FF4302;color:#ffffff;text-decoration:none;${F}font-size:15px;font-weight:800;padding:14px 30px;border-radius:10px;">Abrir painel da frota</a>
  </td></tr>

  <tr><td style="background:#19435B;padding:22px 28px;">
    <div style="${F}font-size:13px;color:#EEEEEE;font-weight:800;">CearaGPS · Rastreamento e gestão de frotas</div>
    <div style="${F}font-size:12px;color:#A9C2CC;margin-top:6px;line-height:1.6;">
      Central 24h: <a href="tel:08006068153" style="color:#FF7A4D;text-decoration:none;">0800 606 8153</a> · <a href="tel:+558534846006" style="color:#FF7A4D;text-decoration:none;">(85) 3484-6006</a><br>
      Sede: Rua Itaperi, 981 – Parque Dois Irmãos · Filial: Av. Gurgel do Amaral, 1037 – Messejana<br>
      <a href="https://cearagps.com.br" style="color:#FF7A4D;text-decoration:none;">cearagps.com.br</a>
    </div>
  </td></tr>
</table>
<div style="${F}font-size:11px;color:#8A9AA0;margin-top:14px;">Mensagem automática do protótipo CearaGPS Frotas · dados simulados.</div>
</td></tr></table>
</body></html>`;

return [{
  json: {
    valido: true,
    para: email,
    assunto: `Relatório da frota · ${b.empresa || 'Cliente'} · ${b.periodo || ''}`.trim(),
    html,
    pdfBase64: pdf,
    nomeArquivo: nomeArq,
  },
}];
