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
  }
};
