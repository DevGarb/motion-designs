/*
  DADOS DA APRESENTAÇÃO · KONF I.A · Encontro 2 · Skills e agentes
  ---------------------------------------------------------------
  Edite só este arquivo. O index.html monta os slides sozinho.
  Tipos: capa, agenda, cards, produto, terminal, tabela, niveis,
  codigo, hub, fluxo, merge, compara, checklist, fim.
*/
window.APRESENTACAO = {
  marca: "KONF I.A",
  evento: "Imersão Executiva IA na Prática",
  encontro: "02",

  slides: [

  { tipo: "capa", label: "Abertura", cor: "#a78bfa",
    kicker: "Encontro 02 / 10",
    titulo: ["Skills e", "agentes"],
    lead: "Pare de repetir o mesmo pedido. Ensine o Claude uma vez com uma skill e depois dê a ele um objetivo inteiro com um agente.",
    stats: [["1", "skill criada"], ["1", "agente montado"], ["2h", "de encontro"]],
    marquee: ["Skill", "SKILL.md", "Descrição", "Exemplos", "Agente", "Subagente", "Projeto", "Ferramentas", "Aprovação humana"] },

  { tipo: "agenda", label: "Hoje", cor: "#a78bfa",
    kicker: "Hoje", titulo: "O caminho de hoje",
    etapas: [
      ["0:00", "Ponte", "As 3 delegações que você trouxe"],
      ["0:10", "Skill", "O que é, por que e como funciona"],
      ["0:35", "Criar skill", "Sua primeira, com o Claude"],
      ["1:05", "Agente", "O que é e quando usar"],
      ["1:30", "Criar agente", "Seu primeiro funcionário digital"],
      ["1:50", "Teste", "Skill e agente funcionando"] ] },

  { tipo: "cards", label: "Ponte", cor: "#a78bfa",
    kicker: "Retomando", titulo: "As 3 delegações que você trouxe",
    itens: [
      { sig: "1", nome: "Você repete", cor: "#a78bfa", desc: "Toda semana escreve quase o mesmo texto para alguém do time." },
      { sig: "2", nome: "Varia o resultado", cor: "#a78bfa", desc: "Cada vez volta num formato diferente, e você corrige." },
      { sig: "3", nome: "Fica na sua cabeça", cor: "#a78bfa", desc: "O padrão que você quer não está escrito em lugar nenhum." } ],
    nota: "Cada delegação dessas é uma skill esperando para ser escrita." },

  /* ---------------- BLOCO 1 · SKILL ---------------- */

  { tipo: "merge", label: "O que é skill", cor: "#a78bfa",
    kicker: "Bloco 1 · Skill", titulo: ["Um POP", "para a IA"],
    texto: "Skill é um procedimento escrito que ensina o Claude a fazer uma tarefa do seu jeito. Você escreve uma vez. Ele segue sempre que a tarefa aparecer, sem você explicar de novo.",
    fontes: [["1", "Instruções", "o passo a passo"], ["2", "Exemplos", "o padrão de qualidade"], ["3", "Arquivos", "modelos e planilhas"]],
    alvo: "Skill", selo: "ENSINOU UMA VEZ" },

  { tipo: "cards", label: "Por que criar", cor: "#a78bfa",
    kicker: "Skill · por quê", titulo: "O que muda quando existe uma skill",
    itens: [
      { sig: "⏱", nome: "Tempo", cor: "#a78bfa", desc: "Você não reescreve contexto. Pede em uma linha: \"faça o relatório da semana\"." },
      { sig: "=", nome: "Padrão", cor: "#a78bfa", desc: "A resposta sai igual toda vez: mesmo formato, mesmo tom, mesmos critérios." },
      { sig: "↗", nome: "Escala", cor: "#a78bfa", desc: "A skill pode ser usada pelo time. O seu critério passa a valer sem você presente." } ],
    nota: "Regra prática: se você pediu a mesma coisa 3 vezes, vira skill." },

  { tipo: "compara", label: "Prompt · CLAUDE.md · Skill", cor: "#a78bfa",
    kicker: "Skill · diferença", titulo: "Não confunda as três",
    colunas: [
      { nome: "Prompt", cor: "#60a5fa", sub: "Um pedido", linhas: ["Vale só naquela conversa", "Você explica tudo de novo na próxima", "Bom para o que é único"] },
      { nome: "CLAUDE.md", cor: "#00e676", sub: "Quem você é", linhas: ["Contexto geral, lido sempre", "Seu jeito de trabalhar e suas regras", "Feito no Encontro 1"] },
      { nome: "Skill", cor: "#a78bfa", sub: "Como fazer uma tarefa", linhas: ["Procedimento de uma tarefa específica", "Carregado só quando a tarefa aparece", "Pode ter exemplos e arquivos junto"] } ] },

  { tipo: "fluxo", label: "Como funciona", cor: "#a78bfa",
    kicker: "Skill · por dentro", titulo: "O que acontece quando você pede",
    etapas: ["Você pede", "Lê as descrições", "Acha a skill", "Carrega o passo a passo", "Executa no padrão", "Entrega"],
    exemplo: "\"Faça o relatório da semana da empresa\" → o Claude vê que existe a skill relatorio-semanal → abre as instruções dela → monta o relatório no formato que você definiu.",
    pontos: ["A descrição é o gatilho. É por ela que o Claude sabe quando usar.", "Ele só abre a skill quando precisa. Dá para ter várias instaladas sem pesar.", "Você também pode chamar pelo nome: \"use a skill relatorio-semanal\"."] },

  { tipo: "codigo", label: "Anatomia", cor: "#a78bfa",
    kicker: "Skill · anatomia", titulo: "Uma pasta e um arquivo",
    passos: ["Uma pasta com o nome da skill", "Dentro, o arquivo SKILL.md", "No topo: nome e descrição", "Abaixo: o passo a passo", "Opcional: exemplos e modelos"],
    arquivo: "relatorio-semanal/SKILL.md",
    texto: [
      "---",
      "name: relatorio-semanal",
      "description: Monta o relatório semanal da",
      "  diretoria. Use sempre que eu pedir resumo,",
      "  fechamento ou números da semana.",
      "---",
      "",
      "# Relatório semanal da diretoria",
      "",
      "## Passo a passo",
      "- Abrir com a conclusão em 3 linhas",
      "- Tabela: indicador, semana, anterior, variação",
      "- Destacar o que piorou mais de 10%",
      "- Fechar com 3 decisões, prazo e responsável",
      "",
      "## Nunca",
      "- Inventar número sem fonte",
      "- Passar de uma página" ] },

  { tipo: "niveis", label: "Onde mora", cor: "#a78bfa",
    kicker: "Skill · onde fica", titulo: "Três lugares para guardar uma skill",
    niveis: [
      ["Desktop · Configurações → Capacidades", "No app", "Envie a skill em .zip. Vale em todas as suas conversas, inclusive nos Projetos."],
      ["~/.claude/skills/nome/", "Claude Code · você", "Vale para tudo que você fizer no terminal, em qualquer pasta."],
      [".claude/skills/nome/", "Claude Code · projeto", "Fica dentro da pasta do projeto. Quem trabalhar ali usa a mesma skill."] ],
    nota: "Plugin é o atalho: traz várias skills prontas num pacote só." },

  { tipo: "tabela", label: "Boas práticas", cor: "#ffc94d",
    kicker: "Skill · como fazer bem", titulo: "Seis regras de uma boa skill",
    linhas: [
      ["Descrição diz QUANDO usar", "\"Use sempre que eu pedir resumo, fechamento ou números da semana\""],
      ["Uma skill, uma tarefa", "Relatório é uma skill. Análise de contrato é outra"],
      ["Explique o porquê", "\"Conclusão primeiro, porque eu leio no celular entre reuniões\""],
      ["Mostre um exemplo bom", "Cole o melhor relatório que você já recebeu"],
      ["Defina o formato de saída", "Seções, tabela, tamanho máximo, tom"],
      ["Teste com 3 pedidos reais", "Se errar, corrija a skill, não a resposta"] ] },

  { tipo: "compara", label: "Descrição", cor: "#ffc94d",
    kicker: "Skill · o detalhe que decide", titulo: "A descrição faz a skill ser usada",
    colunas: [
      { nome: "Fraca", cor: "#ef4444", sub: "O Claude não sabe quando usar", linhas: ["\"Relatórios.\"", "Genérica, sem gatilho", "A skill fica esquecida"] },
      { nome: "Forte", cor: "#00e676", sub: "O Claude usa na hora certa", linhas: ["\"Monta o relatório semanal da diretoria no padrão da empresa. Use sempre que eu pedir resumo, fechamento ou números da semana, mesmo sem dizer 'relatório'.\"", "Diz o que faz e quando usar", "Cita as palavras que você costuma usar"] } ] },

  { tipo: "codigo", label: "O que pedir", cor: "#a78bfa",
    kicker: "Skill · o pedido certo", titulo: "O que pedir ao Claude para criar uma skill",
    passos: ["Diga a tarefa", "Diga quando ela aparece", "Cole um exemplo bom", "Diga o que nunca fazer", "Peça para ele te entrevistar"],
    arquivo: "pedido para o Claude",
    texto: [
      "Quero criar uma skill.",
      "",
      "# Tarefa",
      "Montar o relatório semanal da diretoria.",
      "",
      "# Quando usar",
      "Quando eu pedir resumo, fechamento ou números.",
      "",
      "# Exemplo do que é bom",
      "[cole aqui o melhor relatório que você tem]",
      "",
      "# Nunca",
      "- Inventar número",
      "- Passar de uma página",
      "",
      "Antes de escrever, me faça as perguntas",
      "que faltarem. Depois gere o SKILL.md." ] },

  { tipo: "checklist", label: "Criar skill", cor: "#a78bfa",
    kicker: "Skill · mão na massa", titulo: "Sua primeira skill",
    itens: [
      ["Escolha uma delegação", "Das 3 que você trouxe, a que mais se repete"],
      ["Faça o pedido", "Use o modelo do slide anterior no Claude Desktop"],
      ["Responda a entrevista", "Ele pergunta o que faltar. Responda como faria a um gerente novo"],
      ["Revise o SKILL.md", "Leia a descrição em voz alta: está claro quando usar?"],
      ["Instale", "Desktop: configurações · Claude Code: pasta skills"],
      ["Teste 3 vezes", "Conversa nova, pedido curto, sem citar a skill"] ] },

  { tipo: "cards", label: "Skills para a empresa", cor: "#a78bfa",
    kicker: "Skill · ideias", titulo: "Skills que fazem sentido na empresa", cols: 4,
    itens: [
      { sig: "RS", nome: "Relatório semanal", cor: "#a78bfa", desc: "Números da semana no formato da diretoria." },
      { sig: "SI", nome: "Análise de risco", cor: "#f59e0b", desc: "Critérios da empresa para aprovar, revisar ou negar." },
      { sig: "CT", nome: "Triagem de contrato", cor: "#60a5fa", desc: "Cláusulas de risco, prazos e multas em uma página." },
      { sig: "AU", nome: "Briefing de mercado", cor: "#facc15", desc: "O que mexeu no mercado e o impacto para a empresa." },
      { sig: "AT", nome: "Resposta a cliente", cor: "#22c55e", desc: "Tom, regras e o que nunca prometer." },
      { sig: "AR", nome: "Ata de reunião", cor: "#22d3ee", desc: "Decisões, responsáveis e prazos, sempre igual." },
      { sig: "PR", nome: "Proposta comercial", cor: "#f472b6", desc: "Estrutura, preço e argumentos padrão de cada empresa." },
      { sig: "IN", nome: "Inadimplência", cor: "#ef4444", desc: "Quem cobrar primeiro e com que mensagem." } ],
    nota: "Comece pela que você mais repete, não pela mais impressionante." },

  /* ---------------- BLOCO 2 · AGENTE ---------------- */

  { tipo: "fluxo", label: "O que é agente", cor: "#f97316",
    kicker: "Bloco 2 · Agente", titulo: "Agente recebe um objetivo, não um pedido",
    etapas: ["Objetivo", "Planeja", "Age", "Confere", "Ajusta", "Entrega"],
    exemplo: "\"Prepare minha semana\" → ele olha a agenda → lê os e-mails ligados a cada reunião → busca os arquivos no Drive → usa a skill de briefing → te entrega uma página por reunião.",
    pontos: ["Ele decide os passos sozinho. Você define o objetivo e os limites.", "Usa ferramentas: conectores, arquivos, terminal.", "Confere o próprio resultado antes de entregar."] },

  { tipo: "merge", label: "Junção de skills?", cor: "#f97316",
    kicker: "Agente · a pergunta", titulo: ["Mais que", "skills"],
    texto: "Agente não é só um monte de skills. É quem decide qual skill usar, quando usar e com qual ferramenta. A skill ensina a fazer. O agente escolhe o caminho até o objetivo.",
    fontes: [["SK", "Skills", "sabe fazer"], ["MC", "Conectores", "tem acesso"], ["◎", "Objetivo e limites", "sabe aonde ir"]],
    alvo: "Agente", selo: "RECEBE META, ENTREGA" },

  { tipo: "cards", label: "Na empresa", cor: "#f97316",
    kicker: "Agente · a analogia", titulo: "Pense na sua empresa", cols: 4,
    itens: [
      { sig: "SK", nome: "Skill", cor: "#a78bfa", desc: "O POP. O procedimento escrito de uma tarefa." },
      { sig: "MC", nome: "Conector", cor: "#22d3ee", desc: "O crachá. O acesso aos sistemas e arquivos." },
      { sig: "AG", nome: "Agente", cor: "#f97316", desc: "O funcionário. Recebe uma meta e usa POPs e crachás para cumprir." },
      { sig: "PL", nome: "Plugin", cor: "#f472b6", desc: "A franquia. Funcionário, POPs e acessos já montados." } ] },

  { tipo: "compara", label: "Skill · Agente · Automação", cor: "#f97316",
    kicker: "Agente · escolha", titulo: "Qual usar em cada caso",
    colunas: [
      { nome: "Skill", cor: "#a78bfa", sub: "Você pede, ele faz no padrão", linhas: ["Tarefa definida, resultado padronizado", "Ex.: relatório semanal", "Você aciona"] },
      { nome: "Agente", cor: "#f97316", sub: "Você dá a meta, ele acha o caminho", linhas: ["Caminho muda caso a caso", "Ex.: preparar a semana inteira", "Decide os passos"] },
      { nome: "Automação", cor: "#22d3ee", sub: "Caminho fixo, roda sozinho", linhas: ["Sempre os mesmos passos", "Ex.: novo cliente → alerta no WhatsApp", "n8n, no Encontro 8"] } ] },

  { tipo: "tabela", label: "Quando usar", cor: "#ffc94d",
    kicker: "Agente · quando faz sentido", titulo: "Use agente quando...",
    linhas: [
      ["O caminho muda a cada vez", "Cada caso pede uma investigação diferente"],
      ["Precisa juntar várias fontes", "Agenda + e-mail + Drive + planilha"],
      ["A tarefa tem várias etapas", "Pesquisar, analisar, escrever e revisar"],
      ["NÃO use: passos sempre iguais", "Aí é automação. Mais barato e previsível"],
      ["NÃO use: decisão de risco sem revisão", "Pagamento, demissão, contrato: humano aprova"] ] },

  { tipo: "niveis", label: "Onde criar", cor: "#f97316",
    kicker: "Agente · onde montar", titulo: "Três jeitos de criar um agente",
    niveis: [
      ["Projeto no Claude Desktop", "Agente leve", "Instruções fixas, arquivos de referência e conectores. Bom para começar hoje."],
      ["Subagente no Claude Code · /agents", "Especialista", "Um agente com papel, ferramentas e limites próprios. O Claude principal delega para ele."],
      ["Agente no n8n", "Roda sozinho", "Fica ligado no servidor e reage a eventos 24h. Encontro 8."] ],
    nota: "Hoje montamos os dois primeiros. O terceiro vem quando ligarmos os sistemas da empresa." },

  { tipo: "codigo", label: "Instruções do agente", cor: "#f97316",
    kicker: "Agente · como escrever", titulo: "As instruções de um agente",
    passos: ["Papel: quem ele é", "Objetivo: o que entrega", "Ferramentas: o que pode usar", "Limites: o que nunca faz sozinho", "Formato: como entrega"],
    arquivo: ".claude/agents/assistente-executivo.md",
    texto: [
      "---",
      "name: assistente-executivo",
      "description: Prepara a semana do executivo.",
      "  Use quando eu pedir para organizar a semana,",
      "  preparar reuniões ou ver o que precisa de mim.",
      "---",
      "",
      "# Papel",
      "Assistente executivo do [seu cargo] da empresa.",
      "",
      "# Como trabalhar",
      "- Ler a agenda dos próximos 5 dias",
      "- Para cada reunião, buscar e-mails e arquivos",
      "- Usar a skill relatorio-semanal quando couber",
      "",
      "# Nunca sem minha aprovação",
      "- Enviar e-mail, aceitar ou recusar convite" ] },

  { tipo: "checklist", label: "Criar agente", cor: "#f97316",
    kicker: "Agente · mão na massa", titulo: "Seu primeiro agente: assistente executivo",
    itens: [
      ["Crie um Projeto no Desktop", "Nome: Assistente. Cole as instruções do slide anterior"],
      ["Ligue os conectores", "Agenda, Gmail e Drive, os mesmos do Encontro 1"],
      ["Confira a skill", "A que você criou hoje já vale dentro do Projeto"],
      ["Dê o objetivo", "\"Prepare minha semana. Uma página por reunião.\""],
      ["Revise o caminho", "Veja quais ferramentas ele usou e em que ordem"],
      ["Repita no Claude Code", "Na pasta assistente: /agents e crie o mesmo agente"] ] },

  { tipo: "tabela", label: "Limites", cor: "#ef4444",
    kicker: "Agente · segurança", titulo: "Autonomia com rédea",
    linhas: [
      ["Comece só lendo", "Primeiras semanas: ele analisa e sugere, não executa"],
      ["Aprovação para agir", "Enviar, pagar, apagar e assinar passam por você"],
      ["Dado sensível anonimizado", "Até a política de dados do Encontro 10"],
      ["Escopo pequeno", "Um agente, um objetivo. Nada de \"cuide da empresa\""],
      ["Revise o caminho", "Olhe o que ele fez, não só o que entregou"] ] },

  /* ---------------- FECHAMENTO ---------------- */

  { tipo: "checklist", label: "Teste final", cor: "#00e676",
    kicker: "Teste final", titulo: "Só termina com tudo verde",
    itens: [
      ["Skill dispara sozinha", "Conversa nova, pedido curto, sem citar o nome. Ela foi usada?"],
      ["Skill sai no padrão", "Formato, tom e regras iguais ao que você definiu"],
      ["Agente no Desktop", "\"Prepare minha semana\" entrega uma página por reunião"],
      ["Agente no Claude Code", "/agents mostra o assistente-executivo criado"] ] },

  { tipo: "checklist", label: "Até o Encontro 3", cor: "#00e676",
    kicker: "Até o Encontro 3", titulo: "Para a semana",
    itens: [
      ["Usar a skill 3 vezes", "Anotar onde ela errou. Corrigir a skill, não a resposta"],
      ["Rodar o agente na segunda", "\"Prepare minha semana\" e avaliar de 0 a 10"],
      ["Listar a 2ª skill", "A próxima delegação que mais se repete"] ] },

  { tipo: "fim", label: "Encerramento", cor: "#a78bfa",
    kicker: "KONF I.A", titulo: ["Uma vez.", "Sempre."],
    texto: "Ensinou uma vez, o Claude faz sempre. E agora tem um funcionário digital usando o que você ensinou.",
    prox: "03", cta: "Encontro 03 · Assistente digital", sub: "Skills e agentes na sua rotina de decisão" }

  ]
};
