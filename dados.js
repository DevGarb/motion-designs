/* Resultados T.I — Ago a Out/2026 · dados da apresentação em motion.
   Cada bloco novo entra aqui e ganha um construtor de slide no index.html.
   Fonte GRTI: banco do GRTI em produção, puxado em 09/11/2026. Abr–Jun: trimestre anterior. */
window.RESULTADOS = {
  equipe: "Setor de T.I",
  empresa: "Grupo Ramos",
  titulo: ["Resultados", "T.I"],
  periodo: "Ago a Out · 2026",
  subtitulo: "O que a T.I entregou no trimestre, comparado ao anterior.",
  emConstrucao: true,
  meses: ["Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
  // índices: 0-2 = trimestre anterior (abr–jun) · 3 = jul (ponte) · 4-6 = último trimestre (ago–out)

  grti: {
    cor: "#60a5fa",
    chamados: {
      valores: [462, 331, 347, 495, 397, 473, 423],
      mediaAnterior: 380, mediaAtual: 431, crescimento: 13.4,
      totalTrimestre: 1293,
      melhorMes: { mes: "Set", n: 473 },   // maior do último trimestre
      picoSerie: { mes: "Jul", n: 495 }
    },
    nps: {
      media: 4.99, avaliacoes: 1207, taxaAvaliacao: 95,
      itens: [
        { rot: "Abr–Jun", nota: 4.99, sub: "média do trimestre", antigo: true },
        { rot: "Jul", nota: 5.00, sub: "462 aval." },
        { rot: "Ago", nota: 5.00, sub: "374 aval." },
        { rot: "Set", nota: 5.00, sub: "452 aval." },
        { rot: "Out", nota: 4.98, sub: "381 aval." }
      ]
    },
    tma: {
      // minutos por mês · abr–jun = regra anterior · jul em diante = regra atual do sistema
      minutos: [405, 430, 368, 376, 409, 375, 469],
      rotulos: ["6h45", "7h10", "6h08", "6h16", "6h49", "6h15", "7h49"],
      corteApos: 2,
      mediaAtual: { minutos: 416, rotulo: "6h56" },
      medianaAgoSet: 47, medianaOut: 34
    },
    patrimonio: {
      unidades: [{ nome: "Matriz CearaGPS", n: 285 }, { nome: "GRX", n: 30 }, { nome: "Filial Messejana", n: 9 }],
      itens: [
        { nome: "Monitores", n: 119, junho: 136 }, { nome: "Notebooks", n: 98, junho: 134 }, { nome: "Celulares", n: 74 },
        { nome: "Desktops", n: 12, junho: 11 }, { nome: "TVs", n: 11, junho: 11 }, { nome: "Impressoras", n: 5, junho: 3 }, { nome: "Tablets", n: 6 }
      ],
      preventivas: { meses: ["Jul", "Ago", "Set", "Out"], valores: [14, 36, 28, 10], total: 88, anterior: 63, mesesAnterior: 3 }
    },
    categorias: {
      periodo: "ago a out",
      lista: [
        { nome: "Equipamentos & Logística", n: 254, destaque: true },
        { nome: "Sistemas: desenvolvimento, manutenção e suporte", n: 216 },
        { nome: "Acessos & Identidade", n: 201 },
        { nome: "Usuário", n: 117 },
        { nome: "Service ERP", n: 96 },
        { nome: "Kommo", n: 79 }
      ],
      // composição da categoria líder (participação aproximada, %)
      composicaoLider: [
        { nome: "Suporte endpoint", sub: "impressora, áudio, periféricos, pilha", p: 38 },
        { nome: "Movimentação de item", sub: "entrega, recebimento, substituição", p: 28 },
        { nome: "Entrega de equipamento", sub: "equipamento e periférico", p: 26 },
        { nome: "Erro Windows / SO", sub: "", p: 5 },
        { nome: "Troca de componentes", sub: "", p: 4 }
      ]
    }
  },

  /* Bloco 2 · custo de infra e I.A. Fonte: valores informados pela T.I (10/11/2026).
     Câmbio = média do dólar no ano. VPS e domínio são anuais, rateados em 12 meses.
     Claude: 9 licenças, R$ 1.242/mês (a Claude API não é mais usada). */
  custos: {
    cor: "#34d399",
    cambio: 5.12,
    meses: ["Ago", "Set", "Out"],
    // Trimestre anterior: estimativa mensal. Infra = só a VPS · ferramentas = Lovable + OpenAI + Claude API + ChatGPT
    ant: { total: 1807, anual: 21686, infra: 115, ferramentas: 1692 },
    servicos: [
      { nome: "Lovable", curto: "Lovable", grupo: "ferr", valores: [1602.21, 984.00, 1495.50], ant: 1028, creditos: [1200, 700, 1050] },
      { nome: "Claude · 9 licenças", curto: "Claude", grupo: "ferr", valores: [1242, 1242, 1242], ant: 110, antTxt: "antes: API R$ 110 (saiu)" },
      { nome: "OpenAI API", curto: "OpenAI", grupo: "ferr", usd: [90, 70, 43], ant: 514, antUsd: 100 },
      { nome: "VPS Hostinger + domínio", curto: "VPS", grupo: "infra", valores: Array(3).fill((3563.76 + 208.08) / 12), ant: 115 },
      { nome: "ManyChat", curto: "ManyChat", grupo: "ferr", valores: [149.00, 325.33, 249.00], novo: true },
      { nome: "UazAPI", curto: "UazAPI", grupo: "ferr", valores: [139, 139, 139], novo: true },
      { nome: "ChatGPT Go", curto: "ChatGPT", grupo: "ferr", valores: [39.90, 39.90, 39.90], ant: 40 }
    ]
  },

  /* Custos da Meta (WhatsApp) por chip · 28/08 a 05/11/2026. Volume diário da Graph API; custo informado pela Meta por chip e categoria.
     Fonte: relatório de custos da Meta (06/11/2026). Tarifas por mensagem: marketing lite R$ 0,32 · utilitária e serviço R$ 0,035. */
  meta: {
    cor: "#34d399", periodo: "28/08 a 05/11",
    // ordenado por custo; mkt = parte do custo que vem de template de marketing (custo por chip e categoria)
    chips: [
      { n: "Financeiro CearaGPS", sub: "Ativos", msgs: 122131, custo: 2710.33, mkt: 0.0007 },
      { n: "Comercial CearaGPS", sub: "", msgs: 7956, custo: 2434.55, mkt: 0.9999 },
      { n: "Financeiro CearaGPS", sub: "Negativados", msgs: 9559, custo: 1110.06, mkt: 0.9237 },
      { n: "Suporte CearaGPS", sub: "", msgs: 30374, custo: 989.17, mkt: 0 },
      { n: "Resolve Financeiro", sub: "", msgs: 36674, custo: 687.04, mkt: 0 },
      { n: "Resolve Proteção Veicular", sub: "", msgs: 7124, custo: 220.45, mkt: 0.5764 }
    ],
    tarifa: { marketing: 0.32, utilitaria: 0.035 }
  },

  /* I.A SDR (GRX) · atendimentos por mês, nov/25 a out/26. Total desde 23/10/2025: 3.199 (91 em out/25, fora da série). */
  iaSdr: {
    cor: "#a78bfa",
    serie: [
      { m: "Nov", n: 574 }, { m: "Dez", n: 328 }, { m: "Jan", n: 171 }, { m: "Fev", n: 325 }, { m: "Mar", n: 170 },
      { m: "Abr", n: 187 }, { m: "Mai", n: 209 }, { m: "Jun", n: 143 }, { m: "Jul", n: 402 },
      { m: "Ago", n: 267 }, { m: "Set", n: 234 }, { m: "Out", n: 98 }
    ],
    idxAnterior: [5, 6, 7], idxAtual: [9, 10, 11], idxPonte: 8,
    totalAcumulado: 3199, desde: "23/10/2025", mediaAno: 259,
    humano: { min: 1800, max: 2100 }
  },

  /* Bloco 3 · resultados dos sistemas (ago–out/2026). Fonte: relatório "Resultados dos Sistemas" (dados de 10/11/2026). */
  sistemas: {
    agend: { cor: "#f472b6", meses: ["Jun", "Jul", "Ago", "Set", "Out"], conv: [55.8, 55.7, 57.6, 70.5, 81.3],
      clientes: 1598, agendados: [129, 141, 288, 382, 452], convTri: 70.2, sequencia: { dias: 20, clientes: 354, de: "17/10", ate: "09/11", recorde: 4 } },
    crm: { cor: "#fb923c", total: 68520, auto: 42609, pessoa: 25911, mensal: [17101, 26171, 25248], mediaDia: 745, funis: 23 },
    lara: { cor: "#22d3ee", total: 8051, mensal: [1749, 3219, 3083], boleto: 5395, negoc: 1404, fimSemana: 678, porDia: 134, porDiaAgo: 83 },
    cobr: { cor: "#a3e635", mensal: [6294, 6895, 7423] },
    rast: { cor: "#2dd4bf", inst: { pedidosMes: [466, 522, 614], concluidas: 1044, noPrazo: 1037, taxa: 99.3, pedidos: 1602, horas: [130, 108, 115], mediaTri: 114, junho: 350 },
      ativ: { total: 1846, noPrazo: 1811, taxa: 98.1, frota: 9323 } },
    nps: { cor: "#e879f9", total: 11776, mensal: [5496, 3498, 2782], pesquisasAuto: 2268,
      setores: [{ n: "Suporte", tipo: "CSAT", v: 2537 }, { n: "Central", tipo: "CSAT", v: 2520 }, { n: "Recebíveis", tipo: "CSAT", v: 2185 }, { n: "Comercial", tipo: "CSAT", v: 1998 },
        { n: "Técnico", tipo: "NPS", v: 793 }, { n: "Agendamento", tipo: "CSAT", v: 648 }, { n: "GRX — Suporte Técnico", tipo: "CSAT", v: 221 }, { n: "Financeiro GRX", tipo: "CSAT", v: 106 }] },
    msg: { cor: "#38bdf8", total: 66278, porDia: 720, mensal: [18454, 25011, 22813], erros: 7, disparos: 15293, segundasVias: 6967,
      enviadas: 60438, ant: { enviadas: 51336, mes: 15000 }, // ant: trimestre anterior (90 dias enviados; "15 mil+" por mês)
      // disparos de serviço sem atendente, por tipo e mês (ago, set, out). Relatório não separa por origem (RESOLVE x CearaGPS).
      tipos: [
        { n: "2ª via de boleto", sub: "autoatendimento, ligações evitadas", mensal: [4150, 1934, 883] },
        { n: "Avisos de evento", sub: "sinistro e assistência", mensal: [4333, 795, 1019] },
        { n: "Aniversariantes RESOLVE", sub: "relacionamento com o cliente", mensal: [702, 714, 763] }
      ] },
    recepcao: { cor: "#a5b4fc", concluidos: [945, 992, 1038], crescAgo: "−0,8%", cancelados: [98, 74, 63],
      tma: { min: [90, 95, 87], rot: ["1h30", "1h35", "1h27"], media: "1h30", varTri: "−24,9%", anterior: "2h00" },
      tme: { min: [12, 15, 19], media: 16, anterior: 13, varTri: "+23,2%" },
      sla: { pct: [63.3, 60.5, 58.4], media: 60.6, anterior: 68.1, varPP: "−7,5 p.p." } },
    bloq: { cor: "#f87171", blocos: [166, 87, 889], liberacoes: [224, 142, 102] }
  }
};
