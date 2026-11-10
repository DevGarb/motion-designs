/* Resultados T.I — Ago a Out/2026 · dados da apresentação em motion.
   Cada bloco novo entra aqui e ganha um construtor de slide no index.html.
   Fonte GRTI: banco do GRTI em produção, puxado em 09/11/2026. Abr–Jun conforme AMR. */
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
      // minutos por mês · abr–jun = regra do AMR · jul em diante = regra atual do sistema
      minutos: [405, 430, 368, 376, 409, 375, 469],
      rotulos: ["6h45", "7h10", "6h08", "6h16", "6h49", "6h15", "7h49"],
      corteApos: 2,
      mediaAtual: { minutos: 416, rotulo: "6h56" },
      medianaAgoSet: 47, medianaOut: 34
    },
    categorias: {
      periodo: "ago a out",
      lista: [
        { nome: "Equipamentos & Logística", n: 254, destaque: true },
        { nome: "Avulsos / outros", n: 216 },
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
    // AMR: estimativa mensal. Infra = só a VPS · ferramentas = Lovable + OpenAI + Claude API + ChatGPT
    amr: { total: 1807, anual: 21686, infra: 115, ferramentas: 1692 },
    servicos: [
      { nome: "Lovable", curto: "Lovable", grupo: "ferr", valores: [1602.21, 984.00, 1495.50], amr: 1028, creditos: [1200, 700, 1050] },
      { nome: "Claude · 9 licenças", curto: "Claude", grupo: "ferr", valores: [1242, 1242, 1242], amrTxt: "AMR: API R$ 110 (saiu)" },
      { nome: "OpenAI API", curto: "OpenAI", grupo: "ferr", usd: [90, 70, 43], amr: 514, amrUsd: 100 },
      { nome: "VPS Hostinger + domínio", curto: "VPS", grupo: "infra", valores: Array(3).fill((3563.76 + 208.08) / 12), amr: 115 },
      { nome: "ManyChat", curto: "ManyChat", grupo: "ferr", valores: [149.00, 325.33, 249.00], novo: true },
      { nome: "UazAPI", curto: "UazAPI", grupo: "ferr", valores: [139, 139, 139], novo: true },
      { nome: "ChatGPT Go", curto: "ChatGPT", grupo: "ferr", valores: [39.90, 39.90, 39.90], amr: 40 }
    ]
  },

  /* I.A SDR (CRX) · atendimentos por mês, nov/25 a out/26. Total desde 23/10/2025: 3.199 (91 em out/25, fora da série). */
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
  }
};
