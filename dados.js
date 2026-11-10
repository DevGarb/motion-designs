/*
  DADOS DA APRESENTAÇÃO · KONF I.A · Encontro 05 · Fundamentos e glossário
  ---------------------------------------------------------------
  Edite só este arquivo. O index.html monta os slides sozinho.
  Tipos: capa, agenda, cards, produto, terminal, tabela, niveis,
  codigo, hub, fluxo, merge, compara, checklist, fim.
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
    stats: [["50+", "termos"], ["6", "blocos"], ["1", "mapa de sistemas"]],
    marquee: ["API", "JSON", "Webhook", "Commit", "Deploy", "Banco de dados", "Token", "Agente", "Workflow", ".env", "LGPD"] },

  { tipo: "agenda", label: "Hoje", cor: "#22d3ee",
    kicker: "Hoje", titulo: "O caminho de hoje",
    etapas: [
      ["0:00", "Estrutura", "Onde as coisas vivem"],
      ["0:20", "Conversa", "API, JSON e webhook"],
      ["0:50", "Código", "Commit, deploy e versões"],
      ["1:15", "IA", "Os termos que você vai ouvir"],
      ["1:35", "Segurança", "O erro mais caro"],
      ["1:45", "Mapa", "Os sistemas da sua empresa"] ] },

  { tipo: "merge", label: "Por que aprender", cor: "#22d3ee",
    kicker: "Ponte", titulo: ["Entender", "para cobrar"],
    texto: "Você não precisa programar. Precisa entender o suficiente para decidir, contratar e cobrar. Quem não conhece os termos aceita qualquer prazo e qualquer orçamento.",
    fontes: [["1", "Decidir", "o que construir"], ["2", "Contratar", "quem constrói"], ["3", "Cobrar", "o que foi prometido"]],
    alvo: "Fluência", selo: "SEM PROGRAMAR" },

  /* ---------------- BLOCO 1 · ESTRUTURA ---------------- */

  { tipo: "cards", label: "Restaurante", cor: "#60a5fa",
    kicker: "Bloco 1 · Estrutura", titulo: "Todo sistema é um restaurante", cols: 4,
    itens: [
      { sig: "FE", nome: "Front-end", cor: "#60a5fa", desc: "O salão. Tudo que o cliente vê e toca: telas, botões, cards." },
      { sig: "BE", nome: "Back-end", cor: "#a78bfa", desc: "A cozinha. Processa os pedidos longe do cliente: cálculos e regras." },
      { sig: "DB", nome: "Banco de dados", cor: "#f59e0b", desc: "O estoque. Onde os dados ficam guardados, organizados em tabelas." },
      { sig: "AP", nome: "API", cor: "#22d3ee", desc: "O garçom. Leva o pedido do salão até a cozinha e traz a resposta." } ],
    nota: "O app que você construiu no Lovable tem os quatro. Você só viu o salão." },

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
    etapas: ["Seu app", "Faz o pedido", "API recebe", "Sistema busca", "Devolve JSON", "Tela mostra"],
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
      { nome: "API (polling)", cor: "#60a5fa", sub: "Você vai até a janela olhar", linhas: ["Seu sistema pergunta de tempos em tempos", "\"Chegou cliente novo?\" a cada 5 min", "Gasta pedido mesmo quando nada mudou"] },
      { nome: "Webhook", cor: "#22d3ee", sub: "A campainha toca", linhas: ["O outro sistema avisa na hora que acontece", "\"Chegou cliente novo\" e já manda os dados", "É o gatilho das automações do n8n"] } ] },

  { tipo: "tabela", label: "Mais termos", cor: "#22d3ee",
    kicker: "Bloco 2 · Glossário", titulo: "O que você vai ouvir nas reuniões",
    linhas: [
      ["Chave de API (token)", "A senha que identifica quem está pedindo"],
      ["Rate limit", "Limite de pedidos por minuto. Passou, bloqueia"],
      ["Integração", "Dois sistemas trocando dados sozinhos"],
      ["REST", "O jeito mais comum de montar uma API"],
      ["Payload", "O conteúdo que vai dentro do pedido"],
      ["Status 200 / 404 / 500", "Deu certo / não achou / erro no servidor"] ] },

  /* ---------------- BLOCO 3 · CÓDIGO ---------------- */

  { tipo: "fluxo", label: "Do código ao ar", cor: "#a78bfa",
    kicker: "Bloco 3 · Código e versão", titulo: "Do pedido ao app no ar",
    etapas: ["Mudança", "Commit", "Push", "GitHub", "Deploy", "No ar"],
    exemplo: "Você pediu \"adiciona gráfico de 30 dias\" → o Claude Code alterou o código → fez commit → enviou com push para o GitHub → o Lovable publicou (deploy) → o gráfico apareceu no seu celular.",
    pontos: ["Commit é uma foto salva da mudança, com uma mensagem dizendo o que mudou.", "O GitHub guarda todas as fotos. Dá para voltar a qualquer uma.", "Deploy é colocar a versão nova no ar para os usuários."] },

  { tipo: "cards", label: "Termos do GitHub", cor: "#a78bfa",
    kicker: "Bloco 3 · Glossário", titulo: "O vocabulário do GitHub", cols: 4,
    itens: [
      { sig: "RP", nome: "Repositório", cor: "#a78bfa", desc: "A pasta do projeto com todo o histórico. O seu app tem um, e é seu." },
      { sig: "CM", nome: "Commit", cor: "#a78bfa", desc: "Foto salva de uma mudança. Ex.: \"adiciona gráfico de ouro\"." },
      { sig: "BR", nome: "Branch", cor: "#a78bfa", desc: "Cópia paralela para testar sem quebrar o que está no ar." },
      { sig: "PR", nome: "Pull Request", cor: "#a78bfa", desc: "Pedido para juntar a cópia ao principal. Alguém revisa e aprova." },
      { sig: "CL", nome: "Clone", cor: "#60a5fa", desc: "Baixar uma cópia do repositório para o seu computador." },
      { sig: "PS", nome: "Push / Pull", cor: "#60a5fa", desc: "Enviar mudanças para o GitHub / trazer de lá." },
      { sig: "DP", nome: "Deploy", cor: "#00e676", desc: "Publicar a versão nova. O botão Publish do Lovable." },
      { sig: "RB", nome: "Rollback", cor: "#ef4444", desc: "Voltar para a versão anterior quando algo quebra." } ] },

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
      { sig: "LL", nome: "LLM", cor: "#f97316", desc: "Modelo de linguagem. Claude, ChatGPT, Gemini." },
      { sig: "PR", nome: "Prompt", cor: "#f97316", desc: "A instrução que você dá. O briefing bem feito." },
      { sig: "TK", nome: "Token", cor: "#f97316", desc: "Pedaço de texto. É assim que a IA lê e que você paga. 1 página ≈ 600 tokens." },
      { sig: "CX", nome: "Contexto", cor: "#f97316", desc: "Quanto a IA lembra numa conversa. Cabe um contrato inteiro." },
      { sig: "AL", nome: "Alucinação", cor: "#ef4444", desc: "A IA inventa algo com confiança. Por isso se confere fonte." },
      { sig: "RG", nome: "RAG", cor: "#a78bfa", desc: "A IA consulta os seus documentos antes de responder." },
      { sig: "MC", nome: "MCP / Conector", cor: "#22d3ee", desc: "A tomada que liga a IA ao Gmail, Drive, CRM." },
      { sig: "VC", nome: "Vibecoding", cor: "#00e676", desc: "Criar software descrevendo o que quer. O que você fez no Lovable." } ],
    nota: "Skill e agente você já conhece do Encontro 2." },

  { tipo: "cards", label: "Automação", cor: "#f472b6",
    kicker: "Bloco 4 · Automação", titulo: "O vocabulário da automação", cols: 4,
    itens: [
      { sig: "WF", nome: "Workflow", cor: "#f472b6", desc: "Sequência automática de passos. Novo cliente → IA analisa → alerta." },
      { sig: "TR", nome: "Gatilho", cor: "#f472b6", desc: "O evento que dispara o fluxo: webhook, horário, e-mail." },
      { sig: "NC", nome: "No-code", cor: "#f472b6", desc: "Montar sistemas ligando blocos, sem escrever código. n8n." },
      { sig: "ET", nome: "ETL", cor: "#f472b6", desc: "Extrair, transformar e carregar. Puxar do ERP, limpar e jogar no painel." } ],
    nota: "Esse é o vocabulário do próximo encontro." },

  /* ---------------- BLOCO 5 · SEGURANÇA ---------------- */

  { tipo: "tabela", label: "Segurança", cor: "#ef4444",
    kicker: "Bloco 5 · O erro mais caro", titulo: "Segurança em seis termos",
    linhas: [
      [".env", "Arquivo secreto com as chaves. Nunca vai para o GitHub"],
      ["Chave exposta", "Quem acha, usa. E a conta vem para você"],
      ["2FA", "Segundo código no celular para entrar"],
      ["HTTPS / SSL", "O cadeado do navegador: conexão protegida"],
      ["LGPD", "Dado pessoal de cliente não vai para IA pública"],
      ["Backup", "Cópia de segurança. Sem backup testado, não existe backup"] ] },

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
