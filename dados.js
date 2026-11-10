/*
  DADOS DA APRESENTAÇÃO · KONF I.A · Encontro 05 · Fundamentos e glossário
  ---------------------------------------------------------------
  Edite só este arquivo. O index.html monta os slides sozinho.
  Tipos: capa, cards, produto, terminal, tabela, niveis, codigo,
  hub, fluxo, merge, compara, cena, checklist, fim.
  Em cards, o campo ico (emoji) vira o ícone do card.
*/
window.APRESENTACAO = {
  marca: "KONF I.A",
  evento: "Imersão Executiva IA na Prática",
  encontro: "05",

  slides: [

  { tipo: "capa", label: "Abertura", cor: "#22d3ee",
    kicker: "Encontro 05 / 10",
    titulo: ["A língua", "da tecnologia"],
    lead: "Você já construiu um app. Agora vai entender o que aconteceu por baixo e falar a mesma língua do seu time de tecnologia.",
    stats: [["50+", "termos"], ["5", "blocos"], ["1", "mapa de sistemas"]],
    marquee: ["API", "JSON", "Webhook", "Commit", "Deploy", "Banco de dados", "Token", "Agente", "Workflow", ".env", "LGPD"] },

  { tipo: "merge", label: "Por que aprender", cor: "#22d3ee",
    kicker: "Ponte", titulo: ["Entender", "para cobrar"],
    texto: "Você não precisa programar. Precisa entender o suficiente para decidir, contratar e cobrar. Quem não conhece os termos aceita qualquer prazo e qualquer orçamento.",
    fontes: [["1", "Decidir", "o que construir"], ["2", "Contratar", "quem constrói"], ["3", "Cobrar", "o que foi prometido"]],
    alvo: "Fluência", selo: "SEM PROGRAMAR" },

  /* ---------------- BLOCO 1 · ESTRUTURA ---------------- */

  { tipo: "cards", label: "Restaurante", cor: "#60a5fa",
    kicker: "Bloco 1 · Estrutura", titulo: "Todo sistema é um restaurante", cols: 4,
    itens: [
      { sig: "FE", nome: "Front-end", ico: "🛋️", cor: "#60a5fa", desc: "O salão. Tudo que o cliente vê e toca: telas, botões, cards." },
      { sig: "BE", nome: "Back-end", ico: "👨‍🍳", cor: "#a78bfa", desc: "A cozinha. Processa os pedidos longe do cliente: cálculos e regras." },
      { sig: "DB", nome: "Banco de dados", ico: "📦", cor: "#f59e0b", desc: "O estoque. Onde os dados ficam guardados, organizados em tabelas." },
      { sig: "AP", nome: "API", ico: "🤵", cor: "#22d3ee", desc: "O garçom. Leva o pedido do salão até a cozinha e traz a resposta." } ],
    nota: "O app que você construiu no Lovable tem os quatro. Você só viu o salão." },

  { tipo: "fluxo", label: "Viagem do pedido", cor: "#60a5fa",
    kicker: "Bloco 1 · Estrutura", titulo: "A viagem de um pedido",
    etapas: ["🙋 Cliente pede", "🛋️ Salão", "🤵 Garçom", "👨‍🍳 Cozinha", "📦 Estoque", "🍝 Prato na mesa"],
    exemplo: "Você toca em \"ver meus pedidos\" no app → a tela (salão) chama a API (garçom) → o back-end (cozinha) confere as regras → busca no banco (estoque) → devolve a lista em JSON (o prato) → a tela mostra.",
    pontos: ["O cliente nunca entra na cozinha: só vê o salão.", "Se o prato demora, o problema pode estar em qualquer etapa. Saber a ordem ajuda a cobrar a certa.", "Cada etapa tem um dono técnico. Pergunte quem."] },

  { tipo: "tabela", label: "Onde vive", cor: "#60a5fa",
    kicker: "Bloco 1 · Estrutura", titulo: "Onde os sistemas moram",
    linhas: [
      ["Servidor", "Computador ligado 24h rodando o sistema"],
      ["Nuvem (cloud)", "Servidor alugado em vez de comprado"],
      ["VPS", "Um servidor virtual só seu, dentro da nuvem"],
      ["Domínio", "O endereço: app.suaempresa.com.br"],
      ["DNS", "A agenda que traduz o endereço para o servidor certo"],
      ["SaaS", "Software alugado por assinatura: CRM, ERP, Lovable"] ] },

  /* ---------------- BLOCO 2 · CONVERSA ---------------- */

  { tipo: "fluxo", label: "API", cor: "#22d3ee",
    kicker: "Bloco 2 · Conversa entre sistemas", titulo: "API: o garçom entre dois sistemas",
    etapas: ["📱 Seu app", "🙋 Faz o pedido", "🤵 API recebe", "🔎 Sistema busca", "📄 Devolve JSON", "🖥️ Tela mostra"],
    exemplo: "O card de Bitcoin do seu app pergunta à API da CoinGecko: \"qual o preço agora?\" → ela responde com um JSON → o card mostra o número.",
    pontos: ["Endpoint é o endereço exato do pedido. Cada endpoint entrega uma coisa.", "Requisição é o pedido. Resposta é o que volta.", "Quando alguém diz \"esse sistema tem API\", significa: dá para conversar com ele sem abrir a tela."] },

  { tipo: "terminal", label: "API ao vivo", cor: "#22d3ee",
    kicker: "Uma API de verdade", titulo: "Pedindo o preço do Bitcoin",
    os: "$",
    linhas: [
      ["cmt", "o pedido: endereço + o que eu quero"],
      ["cmd", "curl api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl"],
      ["cmt", "a resposta, em JSON"],
      ["out", "{ \"bitcoin\": { \"brl\": 587420 } }"],
      ["cmt", "foi isso que o seu app recebeu"] ],
    lado: ["Não precisa decorar o comando. Precisa entender o caminho: pedido e resposta.", "Abra o mesmo endereço no navegador e veja o JSON cru.", "APIs pagas pedem uma chave. Essa é gratuita."] },

  { tipo: "codigo", label: "JSON", cor: "#22d3ee",
    kicker: "Bloco 2 · O formato dos dados", titulo: "JSON: a nota fiscal dos sistemas",
    passos: ["Chaves { } abrem e fecham", "Cada dado é nome: valor", "Texto vai entre aspas", "Número vai sem aspas", "Colchetes [ ] são listas"],
    arquivo: "novo-cliente.json",
    texto: [
      "{",
      "  \"cliente\": \"João Silva\",",
      "  \"plano\": \"Premium\",",
      "  \"valor_mensal\": 89.90,",
      "  \"ativo\": true,",
      "  \"servicos\": [\"rastreamento\", \"app\"]",
      "}" ] },

  { tipo: "compara", label: "API x Webhook", cor: "#22d3ee",
    kicker: "Bloco 2 · Quem avisa quem", titulo: "Perguntar ou ser avisado",
    colunas: [
      { nome: "API (polling)", cor: "#60a5fa", sub: "Ligar na pizzaria: \"já saiu?\"", linhas: ["Seu sistema pergunta de tempos em tempos", "\"Chegou cliente novo?\" a cada 5 min", "Gasta pedido mesmo quando nada mudou"] },
      { nome: "Webhook", cor: "#22d3ee", sub: "O entregador toca a campainha", linhas: ["O outro sistema avisa na hora que acontece", "\"Chegou cliente novo\" e já manda os dados", "É o gatilho das automações do n8n"] } ] },

  { tipo: "cena", label: "Pizzaria", cor: "#22d3ee",
    kicker: "Bloco 2 · Na prática", titulo: "A pizza que não chega",
    cenas: [
      { nome: "API (polling)", sub: "Você pergunta", cor: "#60a5fa",
        passos: [["📞", "Você liga: \"já saiu?\""], ["🤷", "\"Ainda não\""], ["📞", "Liga de novo"], ["🤷", "\"Ainda não\""], ["🍕", "Enfim, a pizza"]],
        moral: "Muitos pedidos para descobrir que nada mudou." },
      { nome: "Webhook", sub: "Você é avisado", cor: "#22d3ee",
        passos: [["😌", "Você espera em paz"], ["🛵", "O entregador sai"], ["🔔", "Toca a campainha"], ["🍕", "Pizza na mão"]],
        moral: "O aviso chega no instante em que acontece." } ],
    nota: "Quando o time disser \"vamos usar webhook\", é isso: parar de ligar e esperar a campainha." },

  { tipo: "tabela", label: "Mais termos", cor: "#22d3ee",
    kicker: "Bloco 2 · Glossário", titulo: "O que você vai ouvir nas reuniões",
    linhas: [
      ["Token de API (o crachá)", "Prova quem está pedindo. Não é o token da IA"],
      ["Rate limit", "A catraca do buffet: um prato por vez. Passou do limite, trava"],
      ["Integração", "Dois sistemas trocando dados sozinhos"],
      ["REST", "O jeito mais comum de montar uma API"],
      ["Payload", "O conteúdo que vai dentro do pedido"],
      ["Status 200 / 404 / 500", "Deu certo / não achou / erro no servidor"] ] },

  /* ---------------- BLOCO 3 · CÓDIGO ---------------- */

  { tipo: "fluxo", label: "Do código ao ar", cor: "#a78bfa",
    kicker: "Bloco 3 · Código e versão", titulo: "Do pedido ao app no ar",
    etapas: ["✏️ Mudança", "💾 Commit", "⬆️ Push", "🐙 GitHub", "🚀 Deploy", "📱 No ar"],
    exemplo: "Você pediu \"adiciona gráfico de 30 dias\" → o Claude Code alterou o código → fez commit → enviou com push para o GitHub → o Lovable publicou (deploy) → o gráfico apareceu no seu celular.",
    pontos: ["Commit é salvar o jogo, com uma mensagem dizendo o que mudou.", "O GitHub guarda todos os saves. Dá para voltar a qualquer um.", "Deploy é colocar a versão nova no ar para os usuários."] },

  { tipo: "cards", label: "Termos do GitHub", cor: "#a78bfa",
    kicker: "Bloco 3 · Glossário", titulo: "O vocabulário do GitHub", cols: 4,
    itens: [
      { sig: "RP", nome: "Repositório", ico: "📁", cor: "#a78bfa", desc: "A pasta do projeto com todo o histórico. O seu app tem um, e é seu." },
      { sig: "CM", nome: "Commit", ico: "💾", cor: "#a78bfa", desc: "Salvar o jogo. Cada save tem uma mensagem. Ex.: \"adiciona gráfico de ouro\"." },
      { sig: "BR", nome: "Branch", ico: "🌿", cor: "#a78bfa", desc: "Jogar numa cópia do save para testar sem perder o jogo principal." },
      { sig: "PR", nome: "Pull Request", ico: "🔀", cor: "#a78bfa", desc: "Mostrar o jogo ao chefe antes de valer. Alguém revisa e aprova." },
      { sig: "CL", nome: "Clone", ico: "📥", cor: "#60a5fa", desc: "Baixar uma cópia do repositório para o seu computador." },
      { sig: "PS", nome: "Push / Pull", ico: "⬆️", cor: "#60a5fa", desc: "Enviar mudanças para o GitHub / trazer de lá." },
      { sig: "DP", nome: "Deploy", ico: "🚀", cor: "#00e676", desc: "Publicar a versão nova. O botão Publish do Lovable." },
      { sig: "RB", nome: "Rollback", ico: "⏪", cor: "#ef4444", desc: "Carregar o save anterior quando algo quebra." } ] },

  { tipo: "cena", label: "Save do jogo", cor: "#a78bfa",
    kicker: "Bloco 3 · Na prática", titulo: "Versões como um videogame",
    cenas: [
      { nome: "Dia bom", sub: "Commit, branch e PR", cor: "#a78bfa",
        passos: [["🎮", "Você joga"], ["💾", "Commit: salva o jogo"], ["🌿", "Branch: joga na cópia"], ["👀", "PR: o chefe revisa"], ["✅", "Aprovado: vale"]],
        moral: "Ninguém mexe no jogo principal sem passar por revisão." },
      { nome: "Dia ruim", sub: "Rollback", cor: "#ef4444",
        passos: [["💥", "Atualização quebrou tudo"], ["⏪", "Rollback"], ["💾", "Carrega o último save"], ["😮‍💨", "Sistema de pé de novo"]],
        moral: "É por isso que se salva com frequência." } ] },

  { tipo: "compara", label: "Ambientes", cor: "#a78bfa",
    kicker: "Bloco 3 · Onde testar", titulo: "Nunca teste no que está no ar",
    colunas: [
      { nome: "Desenvolvimento", cor: "#60a5fa", sub: "A oficina", linhas: ["Onde o programador mexe", "Pode quebrar à vontade", "Só ele vê"] },
      { nome: "Homologação", cor: "#ffc94d", sub: "O test-drive", linhas: ["Cópia fiel do sistema real", "Você valida antes de liberar", "Dados de teste"] },
      { nome: "Produção", cor: "#00e676", sub: "A loja aberta", linhas: ["O sistema que os clientes usam", "Erro aqui custa dinheiro", "Só entra o que foi aprovado"] } ] },

  /* ---------------- BLOCO 4 · IA ---------------- */

  { tipo: "cards", label: "Termos de IA", cor: "#f97316",
    kicker: "Bloco 4 · Inteligência artificial", titulo: "O vocabulário da IA", cols: 4,
    itens: [
      { sig: "LL", nome: "LLM", ico: "🧠", cor: "#f97316", desc: "Um autocompletar com superpoderes. Claude, ChatGPT, Gemini." },
      { sig: "PR", nome: "Prompt", ico: "💬", cor: "#f97316", desc: "A instrução que você dá. O briefing bem feito." },
      { sig: "TK", nome: "Token", ico: "🎟️", cor: "#f97316", desc: "A ficha de fliperama: cada pedaço de texto gasta uma. 1 página ≈ 600 tokens." },
      { sig: "CX", nome: "Contexto", ico: "🗒️", cor: "#f97316", desc: "A mesa de trabalho: o que cabe nela a IA enxerga. Cabe um contrato." },
      { sig: "AL", nome: "Alucinação", ico: "🤥", cor: "#ef4444", desc: "O estagiário que nunca diz \"não sei\": inventa com confiança. Confira a fonte." },
      { sig: "RG", nome: "RAG", ico: "📚", cor: "#a78bfa", desc: "Prova com consulta: a IA lê os seus documentos antes de responder." },
      { sig: "MC", nome: "MCP / Conector", ico: "🔌", cor: "#22d3ee", desc: "A tomada que liga a IA ao Gmail, Drive, CRM." },
      { sig: "VC", nome: "Vibecoding", ico: "🎨", cor: "#00e676", desc: "Criar software descrevendo o que quer. O que você fez no Lovable." } ],
    nota: "Skill e agente você já conhece do Encontro 2." },

  { tipo: "cena", label: "Estagiário", cor: "#f97316",
    kicker: "Bloco 4 · Na prática", titulo: "A IA é um estagiário muito rápido",
    cenas: [
      { nome: "Sem RAG", sub: "Responde de cabeça", cor: "#ef4444",
        passos: [["🙋", "Você pergunta"], ["🤥", "Responde confiante e inventa"], ["😬", "Você leva para a reunião"]],
        moral: "Alucinação: ele nunca diz \"não sei\"." },
      { nome: "Com RAG", sub: "Consulta a pasta", cor: "#00e676",
        passos: [["🙋", "Você pergunta"], ["📚", "Abre os seus documentos"], ["✅", "Responde com base neles"]],
        moral: "Prova com consulta: a resposta vem do que é seu." } ] },

  { tipo: "cards", label: "Automação", cor: "#f472b6",
    kicker: "Bloco 4 · Automação", titulo: "O vocabulário da automação", cols: 4,
    itens: [
      { sig: "WF", nome: "Workflow", ico: "⚙️", cor: "#f472b6", desc: "Sequência automática de passos. Novo cliente → IA analisa → alerta." },
      { sig: "TR", nome: "Gatilho", ico: "🔔", cor: "#f472b6", desc: "O evento que dispara o fluxo: webhook, horário, e-mail." },
      { sig: "NC", nome: "No-code", ico: "🧩", cor: "#f472b6", desc: "Montar sistemas ligando blocos, sem escrever código. n8n." },
      { sig: "ET", nome: "ETL", ico: "🚰", cor: "#f472b6", desc: "Extrair, transformar e carregar. Puxar do ERP, limpar e jogar no painel." } ],
    nota: "Esse é o vocabulário do próximo encontro." },

  /* ---------------- BLOCO 5 · SEGURANÇA ---------------- */

  { tipo: "tabela", label: "Segurança", cor: "#ef4444",
    kicker: "Bloco 5 · O erro mais caro", titulo: "Segurança em seis termos",
    linhas: [
      [".env", "Arquivo secreto com as chaves. Nunca vai para o GitHub"],
      ["Chave exposta", "Chave embaixo do capacho: robôs varrem repositórios atrás delas"],
      ["2FA", "Segundo código no celular para entrar"],
      ["HTTPS / SSL", "O cadeado do navegador: conexão protegida"],
      ["LGPD", "Dado pessoal de cliente não vai para IA pública"],
      ["Backup", "Cópia de segurança. Sem backup testado, não existe backup"] ] },

  { tipo: "cena", label: "Chave", cor: "#ef4444",
    kicker: "Bloco 5 · Na prática", titulo: "Chave vazada x chave guardada",
    cenas: [
      { nome: "Errado", sub: "Chave no GitHub", cor: "#ef4444",
        passos: [["🔑", "Chave colada no código"], ["🐙", "Vai para o GitHub"], ["🤖", "Robô acha em minutos"], ["💸", "A conta chega para você"]],
        moral: "Foi o mesmo que deixar a chave de casa sob o capacho com um cartaz." },
      { nome: "Certo", sub: "Chave no .env", cor: "#00e676",
        passos: [["🔑", "Chave no arquivo .env"], ["🙈", "Fica fora do GitHub"], ["🧾", "O código só diz o nome"], ["😴", "Você dorme em paz"]],
        moral: "O .env é o cofre: só o sistema tem a combinação." } ] },

  { tipo: "codigo", label: "Chave no lugar certo", cor: "#ef4444",
    kicker: "Bloco 5 · Na prática", titulo: "Onde a chave mora",
    passos: ["A chave fica no .env", "O código só lê o nome", "O .env fica fora do GitHub", "Vazou? Gere outra na hora", "Nunca cole chave no chat"],
    arquivo: ".env",
    texto: [
      "# Nunca vai para o GitHub",
      "",
      "ANTHROPIC_API_KEY=sk-ant-xxxxxxxx",
      "SUPABASE_URL=https://xxxx.supabase.co",
      "",
      "# No código aparece só o nome:",
      "- process.env.ANTHROPIC_API_KEY" ] },

  /* ---------------- FECHAMENTO ---------------- */

  { tipo: "tabela", label: "Tradutor", cor: "#00e676",
    kicker: "Fechamento · Na prática", titulo: "Tradutor de reunião",
    linhas: [
      ["\"Subiu para produção\"", "Já está no ar para os clientes"],
      ["\"Tá em homologação\"", "Está no test-drive esperando sua aprovação"],
      ["\"Deu timeout\"", "O sistema demorou demais para responder"],
      ["\"Erro 500\"", "Quebrou no servidor, não foi você"],
      ["\"Vou fazer um rollback\"", "Vou voltar para a versão que funcionava"],
      ["\"Chegou via webhook\"", "O outro sistema avisou sozinho, na hora"] ] },

  { tipo: "checklist", label: "Mapa de sistemas", cor: "#00e676",
    kicker: "Mão na massa", titulo: "O mapa de sistemas da sua empresa",
    itens: [
      ["Liste os sistemas", "CRM, ERP, financeiro, atendimento, operação"],
      ["Tem API?", "Sim, não ou não sei. \"Não sei\" vira pergunta para o time"],
      ["Onde estão os dados?", "Banco próprio, nuvem do fornecedor, planilha"],
      ["Quem é o dono técnico?", "Nome de quem responde por cada sistema"],
      ["Qual conversa falta?", "Dois sistemas que deveriam trocar dados e não trocam"] ] },

  { tipo: "checklist", label: "Até o Encontro 6", cor: "#00e676",
    kicker: "Até o Encontro 6", titulo: "Para a semana",
    itens: [
      ["Leve o mapa ao time", "Preencha os \"não sei\" com quem responde por cada sistema"],
      ["Escolha uma conversa", "A integração que mais economizaria tempo"],
      ["Use 5 termos numa reunião", "API, webhook, deploy, homologação, token"] ] },

  { tipo: "fim", label: "Encerramento", cor: "#22d3ee",
    kicker: "KONF I.A", titulo: ["Agora", "você fala"],
    texto: "Você não programa. Mas entende o caminho do dado, sabe o que perguntar e percebe quando a resposta não faz sentido.",
    prox: "06", cta: "Encontro 06 · Automação com n8n", sub: "Ligando os sistemas sem escrever código" }

  ]
};
