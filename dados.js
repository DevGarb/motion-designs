/*
  DADOS DA APRESENTAÇÃO · KONF I.A · Encontro 1
  ---------------------------------------------------------------
  Edite só este arquivo. O index.html monta os slides sozinho.
  Cada slide tem um "tipo": capa, agenda, cards, produto, terminal,
  tabela, niveis, codigo, hub, fluxo, merge, compara, checklist, fim.
  cor: cor de destaque do slide (o fundo inteiro acompanha).
*/
window.APRESENTACAO = {
  marca: "KONF I.A",
  evento: "Imersão Executiva IA na Prática",

  slides: [

  { tipo: "capa", label: "Abertura", cor: "#00e676",
    kicker: "Encontro 01 / 10",
    titulo: ["Claude", "instalado"],
    lead: "Desktop, Chrome e terminal funcionando. Depois, o que faz o Claude trabalhar para você: CLAUDE.md, conectores e plugins.",
    stats: [["3", "instalações"], ["8", "conectores"], ["2h", "de encontro"]],
    marquee: ["Claude Desktop", "Claude in Chrome", "Claude Code", "CLAUDE.md", "Conectores", "MCP", "Plugins", "Skills"] },

  { tipo: "agenda", label: "Hoje", cor: "#00e676",
    kicker: "Hoje", titulo: "O caminho de hoje",
    etapas: [
      ["0:00", "Instalar", "Desktop, Chrome e terminal"],
      ["0:40", "CLAUDE.md", "O manual do Claude"],
      ["1:05", "Conectores", "Claude dentro dos seus apps"],
      ["1:30", "Plugins", "Pacotes prontos de trabalho"],
      ["1:50", "Teste", "Tudo verde, missão cumprida"] ] },

  /* ---------------- BLOCO 1 · INSTALAÇÃO ---------------- */

  { tipo: "cards", label: "Três portas", cor: "#00e676",
    kicker: "Bloco 1 · Instalação", titulo: "Uma conta, três portas",
    itens: [
      { sig: "DT", nome: "Claude Desktop", cor: "#00e676", desc: "O app do dia a dia. Conversa, analisa, lê arquivos e usa seus conectores." },
      { sig: "CH", nome: "Claude in Chrome", cor: "#60a5fa", desc: "Extensão do navegador. O Claude vê a página e opera sites por você." },
      { sig: ">_", nome: "Claude Code", cor: "#f59e0b", desc: "O Claude no terminal. Cria arquivos, roda scripts e constrói sistemas." } ],
    nota: "Tudo que você configurar numa porta vale nas outras. É a mesma conta." },

  { tipo: "produto", label: "Claude Desktop", cor: "#00e676",
    sig: "DT", kicker: "Instalação 01 / 03", nome: "Claude Desktop",
    desc: "Onde você vai passar a maior parte do tempo.",
    passos: [
      ["Acesse", "claude.ai/download"],
      ["Baixe", "Windows (.exe) ou Mac (.dmg)"],
      ["Instale", "Windows: avançar até concluir · Mac: arrastar para Aplicativos"],
      ["Abra e entre", "Mesma conta Pro ou Max"],
      ["Confira", "Conversa nova responde? Pronto."] ],
    obs: "Windows mostrou aviso do SmartScreen? Mais informações → Executar assim mesmo." },

  { tipo: "produto", label: "Claude in Chrome", cor: "#60a5fa",
    sig: "CH", kicker: "Instalação 02 / 03", nome: "Claude in Chrome",
    desc: "O Claude dentro do navegador, enxergando e operando a página aberta.",
    passos: [
      ["Abra a Chrome Web Store", "Busque por \"Claude\" (publicado pela Anthropic)"],
      ["Adicionar ao Chrome", "Confirme a permissão"],
      ["Fixe na barra", "Ícone de quebra-cabeça → alfinete no Claude"],
      ["Entre", "Mesma conta"],
      ["Teste", "Abra um site e peça: \"resuma esta página\""] ],
    obs: "Ele pede permissão por site antes de agir. Você decide onde ele pode clicar e digitar." },

  { tipo: "produto", label: "Claude Code", cor: "#f59e0b",
    sig: ">_", kicker: "Instalação 03 / 03", nome: "Claude Code",
    desc: "Você escreve em português. Ele executa no seu computador.",
    passos: [
      ["Windows", "Instale o Git for Windows (git-scm.com)"],
      ["Windows", "Abra o CMD ou o PowerShell e rode o instalador"],
      ["Mac", "Abra o Terminal e rode o instalador"],
      ["Feche e reabra", "O terminal precisa recarregar"],
      ["Digite claude", "Faça o login no navegador"] ],
    obs: "Exige plano pago (Pro ou Max). Não precisa de WSL nem de saber programar." },

  { tipo: "terminal", label: "Windows · CMD", cor: "#f59e0b",
    kicker: "Claude Code · Windows", titulo: "No CMD ou PowerShell", os: "C:\\Users\\presidente>",
    linhas: [
      ["cmt", "Pré-requisito: Git for Windows instalado"],
      ["cmd", "git --version"],
      ["out", "git version 2.x.x.windows.1"],
      ["cmt", "No CMD:"],
      ["cmd", "curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd"],
      ["cmt", "Ou no PowerShell:"],
      ["cmd", "irm https://claude.ai/install.ps1 | iex"],
      ["out", "✔ Claude Code instalado"] ],
    lado: ["Use um dos dois, não precisa rodar ambos.", "Não precisa abrir como administrador.", "Depois de instalar: fechar e reabrir a janela."] },

  { tipo: "terminal", label: "Mac · Terminal", cor: "#f59e0b",
    kicker: "Claude Code · macOS", titulo: "No Terminal", os: "presidente@mac ~ %",
    linhas: [
      ["cmt", "Cmd + Espaço → digite Terminal"],
      ["cmd", "curl -fsSL https://claude.ai/install.sh | bash"],
      ["out", "✔ Claude Code instalado"],
      ["cmt", "Já usa Homebrew? Alternativa:"],
      ["cmd", "brew install --cask claude-code"] ],
    lado: ["Se pedir as ferramentas de linha de comando da Apple, aceite.", "Depois de instalar: fechar e reabrir o Terminal."] },

  { tipo: "terminal", label: "Primeiro comando", cor: "#f59e0b",
    kicker: "Funcionou?", titulo: "Três comandos de verificação", os: "~ $",
    linhas: [
      ["cmd", "claude --version"],
      ["out", "2.x.x (Claude Code)"],
      ["cmd", "claude doctor"],
      ["out", "✔ Instalação saudável"],
      ["cmd", "claude"],
      ["out", "Abrindo o navegador para login..."],
      ["out", "✔ Bem-vindo ao Claude Code"] ],
    lado: ["--version: está instalado", "doctor: está saudável", "claude: abre e pede login na primeira vez"] },

  { tipo: "tabela", label: "Se der erro", cor: "#ffc94d",
    kicker: "Plano B", titulo: "Deu erro? Quase sempre é um destes",
    linhas: [
      ["\"claude\" não é reconhecido", "Feche e reabra o terminal"],
      ["Windows: scripts desabilitados", "Set-ExecutionPolicy -Scope CurrentUser RemoteSigned"],
      ["Pede Git Bash", "Instale o Git for Windows e reabra o terminal"],
      ["Mac: command not found", "Adicione o caminho indicado ao ~/.zshrc e rode source ~/.zshrc"],
      ["Instalador trava", "Rede corporativa com proxy. Use o hotspot do celular"],
      ["Login não conclui", "Confira se o plano é Pro ou Max. Dentro do claude: /login"] ] },

  /* ---------------- BLOCO 2 · CLAUDE.md ---------------- */

  { tipo: "cards", label: "CLAUDE.md", cor: "#a78bfa",
    kicker: "Bloco 2 · CLAUDE.md", titulo: "O manual que o Claude lê antes de trabalhar",
    itens: [
      { sig: "1", nome: "O que é", cor: "#a78bfa", desc: "Um arquivo de texto chamado CLAUDE.md, escrito em português comum." },
      { sig: "2", nome: "Quando é lido", cor: "#a78bfa", desc: "Toda vez que o Claude Code abre naquela pasta. Automático." },
      { sig: "3", nome: "Para que serve", cor: "#a78bfa", desc: "Quem você é, como a empresa funciona, regras que ele nunca pode quebrar." } ],
    nota: "É o onboarding do funcionário novo. Escrito uma vez, lido todo dia." },

  { tipo: "niveis", label: "Onde fica", cor: "#a78bfa",
    kicker: "CLAUDE.md · níveis", titulo: "Três lugares, três alcances",
    niveis: [
      ["~/.claude/CLAUDE.md", "Você", "Vale para tudo que você fizer, em qualquer pasta. Seu jeito de trabalhar."],
      ["pasta-do-projeto/CLAUDE.md", "O projeto", "Vale só ali. Regras daquele trabalho. Pode ser compartilhado com o time."],
      ["subpasta/CLAUDE.md", "Uma parte", "Detalhe de uma área específica dentro do projeto."] ],
    nota: "Do geral para o específico. O mais específico complementa o geral." },

  { tipo: "codigo", label: "Criando o CLAUDE.md", cor: "#a78bfa",
    kicker: "CLAUDE.md · na prática", titulo: "Criar em 2 minutos",
    passos: ["Entre na pasta gabinete", "Digite claude", "Digite /init", "Ele lê a pasta e escreve um rascunho", "Você ajusta com as suas regras"],
    arquivo: "gabinete/CLAUDE.md",
    texto: [
      "# Gabinete do Presidente",
      "",
      "## Quem sou",
      "Presidente de grupo no Ceará: rastreamento,",
      "proteção veicular, ouro e finanças.",
      "",
      "## Como responder",
      "- Português, direto, conclusão primeiro",
      "- Número com fonte ou marcado como estimativa",
      "- Encerrar com decisão, prazo e responsável",
      "",
      "## Nunca",
      "- Apagar arquivo sem perguntar",
      "- Usar dado real de cliente sem anonimizar" ] },

  /* ---------------- BLOCO 3 · CONECTORES ---------------- */

  { tipo: "hub", label: "Conectores", cor: "#22d3ee",
    kicker: "Bloco 3 · Conectores", titulo: "O Claude dentro dos seus apps", centro: "Claude",
    nodes: [["Gmail", "#ef4444"], ["Agenda", "#60a5fa"], ["Drive", "#facc15"], ["WhatsApp", "#22c55e"], ["Notion", "#e5e7eb"], ["Canva", "#a78bfa"], ["n8n", "#f97316"], ["Seus sistemas", "#22d3ee"]],
    lado: { titulo: "O que é um conector",
      pontos: ["Uma ponte entre o Claude e um app que você já usa.", "Ele lê e, com sua permissão, age lá dentro.", "Por baixo, usa o MCP: um padrão aberto, como uma tomada universal para IA.", "Liga e desliga quando quiser."] } },

  { tipo: "fluxo", label: "Como funciona", cor: "#22d3ee",
    kicker: "Conectores · por dentro", titulo: "O que acontece quando você pede",
    etapas: ["Você pede", "Claude entende", "Conector (MCP)", "App responde", "Claude decide", "Você aprova"],
    exemplo: "\"Quais e-mails de hoje precisam de mim?\" → Claude chama o Gmail → lê os não lidos → separa o que exige decisão → te mostra.",
    pontos: ["Ler é automático: buscar e-mail, ver agenda, abrir arquivo.", "Agir pede confirmação: enviar, criar, apagar.", "Ele só enxerga o que a sua conta já enxerga."] },

  { tipo: "cards", label: "Melhores conectores", cor: "#22d3ee",
    kicker: "Conectores · escolha", titulo: "Os que fazem sentido para o grupo", cols: 4,
    itens: [
      { sig: "GM", nome: "Gmail", cor: "#ef4444", desc: "Triar caixa, achar conversa, rascunhar resposta." },
      { sig: "AG", nome: "Google Agenda", cor: "#60a5fa", desc: "Ver a semana, achar horário, preparar reunião." },
      { sig: "DR", nome: "Google Drive", cor: "#facc15", desc: "Encontrar e ler relatórios, contratos e planilhas." },
      { sig: "WA", nome: "WhatsApp Business", cor: "#22c55e", desc: "Atendimento e mensagens do negócio." },
      { sig: "NO", nome: "Notion", cor: "#e5e7eb", desc: "Base de conhecimento e processos da empresa." },
      { sig: "CV", nome: "Canva · Gamma", cor: "#a78bfa", desc: "Apresentações e peças a partir de uma conversa." },
      { sig: "N8", nome: "n8n", cor: "#f97316", desc: "A ponte para os sistemas internos do grupo." },
      { sig: "WS", nome: "Windsor.ai", cor: "#22d3ee", desc: "Dados de marketing e anúncios num lugar só." } ],
    nota: "Hoje ligamos três: Gmail, Agenda e Drive. Os outros entram quando o caso aparecer." },

  { tipo: "checklist", label: "Ligar conectores", cor: "#22d3ee",
    kicker: "Conectores · mão na massa", titulo: "Ligando os três primeiros",
    itens: [
      ["Abra o menu de conectores", "Nas configurações do Claude Desktop"],
      ["Escolha Gmail, Agenda e Drive", "Clique em conectar em cada um"],
      ["Leia as permissões", "Faça o login Google e confira o que está sendo liberado"],
      ["Teste a Agenda", "\"O que tenho esta semana? O que poderia virar e-mail?\""],
      ["Teste o Gmail", "\"Quais não lidos dos últimos 3 dias exigem decisão minha?\""],
      ["Teste o Drive", "\"Ache o relatório mais recente sobre [tema] e me dê 3 pontos.\""] ] },

  /* ---------------- BLOCO 4 · PLUGINS ---------------- */

  { tipo: "merge", label: "Plugins", cor: "#f472b6",
    kicker: "Bloco 4 · Plugins", titulo: ["Uma caixa", "pronta"],
    texto: "Plugin é um pacote que já vem montado: o conhecimento de como fazer, os atalhos e as conexões necessárias. Instalou, está pronto para o trabalho.",
    fontes: [["SK", "Skills", "o como fazer"], ["/", "Comandos", "os atalhos"], ["MC", "Conectores", "os acessos"]],
    alvo: "Plugin", selo: "INSTALOU, FUNCIONA" },

  { tipo: "compara", label: "Skill · Conector · Plugin", cor: "#f472b6",
    kicker: "Plugins · diferença", titulo: "Três peças, três papéis",
    colunas: [
      { nome: "Skill", cor: "#a78bfa", sub: "Sabe fazer", linhas: ["Instrução de como fazer uma tarefa bem feita", "Ex.: o padrão de relatório da diretoria", "Encontro 3 aprofunda"] },
      { nome: "Conector", cor: "#22d3ee", sub: "Tem acesso", linhas: ["Dá acesso a um app", "Ex.: ler o Gmail, ver a agenda", "Ligamos hoje"] },
      { nome: "Plugin", cor: "#f472b6", sub: "Vem tudo junto", linhas: ["Junta skills, comandos e conectores", "Ex.: pacote de finanças da empresa", "Instala em um clique"] } ] },

  { tipo: "cards", label: "Plugins úteis", cor: "#f472b6",
    kicker: "Plugins · onde começar", titulo: "Pacotes que já servem para o grupo", cols: 4,
    itens: [
      { sig: "PE", nome: "Pequena e média empresa", cor: "#f472b6", desc: "Resumo do negócio, briefing de segunda, cobrança de inadimplentes, fluxo de caixa." },
      { sig: "FI", nome: "Finanças", cor: "#4ade80", desc: "Fechamento do mês, conciliação, análise de variação." },
      { sig: "DA", nome: "Dados", cor: "#60a5fa", desc: "Análise de planilhas, painéis e gráficos." },
      { sig: "OP", nome: "Operações", cor: "#f59e0b", desc: "Processos, riscos, relatórios de status." } ],
    nota: "No Claude Code, o comando /plugin abre o catálogo para instalar e gerenciar." },

  /* ---------------- FECHAMENTO ---------------- */

  { tipo: "checklist", label: "Teste final", cor: "#00e676",
    kicker: "Teste final", titulo: "Só termina com tudo verde",
    itens: [
      ["Desktop", "\"Olhe minha agenda de amanhã e meus e-mails. Quais 3 coisas mais precisam de mim?\""],
      ["Chrome", "Abrir um site e pedir: \"resuma esta página em 5 linhas\""],
      ["Claude Code", "Na pasta gabinete: \"crie prioridades.md com as 5 prioridades que vou ditar\""],
      ["CLAUDE.md", "Fechar, abrir o claude de novo e perguntar: \"quem sou eu?\""] ] },

  { tipo: "checklist", label: "Até o Encontro 2", cor: "#00e676",
    kicker: "Até o Encontro 2", titulo: "Para a semana",
    itens: [
      ["Usar 3 vezes", "Desktop ou Chrome, em tarefas reais. Trazer a melhor e a pior resposta"],
      ["Anotar 3 delegações", "O texto exato que você manda por mensagem toda semana"],
      ["Separar 1 documento", "Contrato ou relatório real, anonimizado"] ] },

  { tipo: "fim", label: "Encerramento", cor: "#00e676",
    kicker: "KONF I.A", titulo: ["Máquina", "pronta."],
    texto: "Semana que vem ela começa a trabalhar para você.",
    cta: "Encontro 02 · Prompt para decisão", sub: "Do pedido vago à resposta que decide" }

  ]
};
