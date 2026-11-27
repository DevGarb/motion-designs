// Feedbacks individuais · Setor de T.I · Grupo Ramos · Trilha de carreira 2027
// Conteúdo dos feedbacks + exemplos e plano de 6 meses propostos pela gestão.
// Antes de apresentar: confirmar com cada pessoa o que foi alinhado no feedback.
window.FEEDBACKS = {
  equipe: "Setor de T.I",
  empresa: "Grupo Ramos",
  gestor: "Gabriel",
  ciclo: "Jan a Jun 2027",
  lema: "Cresce quem escolhe crescer.",
  meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  compromisso: {
    voce: "Escolher crescer, fazer o check-in todo dia, cumprir o plano e trazer as dificuldades cedo, antes que virem problema.",
    gestor: "Direcionar, cobrar com clareza, apoiar quando travar e dar uma estrela a cada conquista. Conversa individual todo mês."
  },
  // Estrela de carreira: vale para todos.
  // Para dar uma estrela, adicionar no "estrelas" da pessoa: { m: "Jan", tipo: "checkin", nota: "opcional" }
  // Tipos válidos: os ids de "fontes" abaixo.
  estrelas: {
    titulo: "Estrela de carreira",
    chamada: "Mais que um símbolo: reconhecimento.",
    texto: "Cada estrela registra uma conquista real. Somadas, mostram seu crescimento profissional e contam a favor do seu prestígio e da sua carreira.",
    checkin: "Todo dia, de segunda a sexta: 5 minutos com o gestor sobre o que foi feito, o que vem agora e o que travou.",
    semana: "Semana completa de check-in vale 1 estrela.",
    vazio: "A primeira estrela começa no check-in de janeiro.",
    fontes: [
      { id: "checkin", t: "Semana de check-in", d: "Check-in feito de segunda a sexta." },
      { id: "processo", t: "Processo certo", d: "Seguiu o processo do início ao fim, sem retrabalho." },
      { id: "reconhecimento", t: "Reconhecimento", d: "Elogiado por outra área, usuário ou pela gestão." },
      { id: "meta", t: "Meta batida", d: "Cumpriu a meta do mês no seu plano." },
      { id: "ideia", t: "Ideia nova", d: "Trouxe uma ideia que melhorou o setor." }
    ]
  },
  pessoas: [
    {
      id: "danilo", nome: "Danilo", cor: "#60a5fa",
      estrelas: [],
      resumo: "Seu desenvolvimento nas atividades e o crescimento nas entregas vêm sendo reconhecidos. Conversamos sobre sua postura no setor, a relação com as demais áreas, a qualidade das demandas e o compromisso com a empresa. O próximo passo vai além da comunicação: liderar projetos do setor.",
      frase: "Quem lidera não faz tudo sozinho: garante que tudo chegue.",
      meta: "Liderar projetos de ponta a ponta, com prazo e status sob controle",
      manter: [
        {
          t: "Desenvolvimento e entregas",
          d: "Evolução nas atividades e crescimento reconhecido no setor.",
          ex: "Como o goleiro que fecha o gol jogo após jogo: ninguém comenta a defesa fácil, mas o time inteiro joga tranquilo. Suas entregas viraram o “pode deixar com o Danilo”.",
          mult: "Transformar o “como fiz” das suas entregas no padrão que você vai conduzir com a equipe."
        },
        {
          t: "Compromisso e relacionamento",
          d: "Atuação no setor e relação com as demais áreas.",
          ex: "Outra área chama com urgência, você responde, explica o prazo e cumpre. Nesse momento a T.I vira ponte, não muro.",
          mult: "Dar o retorno antes de ser cobrado: é a semente do status report que as áreas vão esperar de você."
        }
      ],
      evoluir: [
        {
          t: "Liderar do início à entrega",
          d: "Encabeçar a demanda como dono: escopo, etapas, responsáveis, acompanhamento e entrega.",
          ludico: "Como o motorista da excursão: não troca o pneu sozinho, mas sabe onde cada um está, quanto falta para chegar e quem resolve cada parada.",
          dia: "Chegou demanda nova: quebrar em etapas com responsável e data, e ser o ponto único de contato até a entrega.",
          treino: "Toda demanda abre com objetivo, etapas, responsáveis e data."
        },
        {
          t: "Status report claro",
          d: "Informar o andamento ao gestor e às áreas com clareza, sem precisar ser cobrado.",
          ludico: "Igual ao app de delivery: ninguém liga para o restaurante porque a tela mostra “saiu para entrega”. Status bem dado acaba com o “e aí, como está?”.",
          dia: "Toda sexta, mensagem curta: o que foi entregue, o que está andando, o que travou e o próximo passo.",
          treino: "Formato fixo: Feito · Fazendo · Travado · Próximo."
        },
        {
          t: "Prazo e travamentos",
          d: "Controlar o prazo toda semana e alinhar com o gestor assim que a equipe travar.",
          ludico: "Como o GPS que recalcula no primeiro desvio, não quando você já está perdido. Travamento avisado na segunda vira ajuste; na sexta, vira atraso.",
          dia: "Demanda parada há 2 dias? Levar ao gestor o problema, o impacto no prazo e uma proposta de saída.",
          treino: "Regra das 48h: travou 2 dias, alinha com o gestor."
        }
      ],
      plano: [
        { m: "Jan", t: "Método", a: "Definir com o gestor o quadro de demandas: etapas, responsáveis, datas e o modelo de status report.", s: "Quadro ativo com as demandas do setor" },
        { m: "Fev", t: "Primeira demanda", a: "Assumir 1 demanda de ponta a ponta, do levantamento à entrega, com status report toda sexta.", s: "4 status reports enviados no prazo" },
        { m: "Mar", t: "Ritual de prazo", a: "Toda segunda, 15 minutos com a equipe: o que vence na semana e o que está travado.", s: "Nenhum atraso sem aviso prévio" },
        { m: "Abr", t: "Escalar cedo", a: "Aplicar a regra das 48h: travamento vai ao gestor com impacto no prazo e proposta de saída.", s: "Travamentos resolvidos em até 1 semana" },
        { m: "Mai", t: "Mais frentes", a: "Conduzir 2 demandas em paralelo e apresentar o andamento às áreas envolvidas.", s: "Áreas informadas sem precisar cobrar" },
        { m: "Jun", t: "Líder de projetos", a: "Apresentar ao gestor o balanço do semestre: entregas, prazos cumpridos e aprendizados.", s: "% de entregas no prazo" }
      ]
    },
    {
      id: "felipe", nome: "Felipe", cor: "#2dd4bf",
      estrelas: [],
      resumo: "Reconheci seus pontos fortes e reforcei a importância de mantê-los. Destaquei oportunidades em organização, agilidade na resolução de problemas e acompanhamento das demandas. A evolução nesses pontos é o que abre as portas para o seu crescimento.",
      meta: "Organização que abre as portas para crescer",
      manter: [
        {
          t: "Seus pontos fortes",
          d: "Qualidades já demonstradas, que seguem valendo enquanto você trabalha o resto.",
          ex: "Como um bom tempero: não é preciso mudar a receita inteira, só não deixar faltar. O que você já faz bem continua no prato.",
          mult: "Usar o que você já faz bem como base para os novos hábitos."
        },
        {
          t: "Compromisso com a empresa",
          d: "A empresa oferece oportunidades, e o compromisso é o que te coloca na fila delas.",
          ex: "Quem veste a camisa no jogo difícil é quem o técnico chama quando surge a vaga de titular.",
          mult: "Transformar compromisso em resultado visível: prazo cumprido e aviso antecipado."
        }
      ],
      evoluir: [
        {
          t: "Organização e planejamento",
          d: "Acompanhar demandas e prazos para evitar atrasos e esquecimentos.",
          ludico: "O malabarista confia na memória com 2 bolinhas. Com 7, só com método. Demanda solta na cabeça é bolinha caindo.",
          dia: "Chamado aberto na segunda, prometido para quarta, lembrado na sexta quando o usuário cobra.",
          treino: "Uma lista única de demandas, revisada no início e no fim do dia."
        },
        {
          t: "Agilidade na resolução",
          d: "Buscar a solução antes que o problema cresça.",
          ludico: "Goteira: um balde resolve hoje. Ignorada, vira reforma no telhado.",
          dia: "Impressora sem rede no setor: 10 minutos resolvem. Esperar vira “a T.I não resolve nada”.",
          treino: "Regra dos 15 minutos: travou por 15 minutos, pede apoio."
        },
        {
          t: "Cumprimento de processos",
          d: "Seguir os processos estabelecidos na execução das atividades.",
          ludico: "Receita de bolo: improvisar o fermento até dá certo uma vez. O processo garante que dá certo sempre.",
          dia: "Atender pedido de corredor sem registrar: some o histórico e ninguém sabe o que foi feito.",
          treino: "Nada sem registro: até o atendimento rápido entra no fluxo."
        }
      ],
      plano: [
        { m: "Jan", t: "Lista única", a: "Todas as demandas num só lugar, com prioridade e prazo.", s: "Nenhuma demanda fora da lista" },
        { m: "Fev", t: "Ritual diário", a: "10 minutos no início e no fim do dia revisando a lista.", s: "Atrasos avisados antes do prazo" },
        { m: "Mar", t: "Regra dos 15 min", a: "Travou, escala ou pede apoio. Ocorrência não espera.", s: "Problemas resolvidos antes da cobrança" },
        { m: "Abr", t: "Processo em dia", a: "Todo atendimento registrado no fluxo. Revisão dos processos do setor com o gestor.", s: "Histórico completo dos atendimentos" },
        { m: "Mai", t: "Semana planejada", a: "Toda segunda, um plano da semana com as prioridades.", s: "Planejado x feito, semana a semana" },
        { m: "Jun", t: "Colheita", a: "Balanço com o gestor: organização como hábito e próxima oportunidade mapeada.", s: "Avaliação do ciclo" }
      ]
    },
    {
      id: "victor", nome: "Victor", cor: "#a78bfa",
      estrelas: [],
      resumo: "Falamos do seu desempenho no início do ano e da queda que veio depois. Relembrei o período em que você foi destaque e referência no setor. Você contou que busca se encontrar e sente falta de novos desafios, e se propôs a melhorar.",
      meta: "Voltar a ser referência no setor",
      manter: [
        {
          t: "Histórico de referência",
          d: "Houve um período em que você foi destaque e exemplo no setor.",
          ex: "O atleta que já bateu a marca sabe que ela é possível. O caminho está no corpo, só falta voltar a treinar.",
          mult: "Relembrar o que funcionava na fase de destaque e trazer de volta um hábito por vez."
        },
        {
          t: "Abertura ao feedback",
          d: "Você falou com franqueza sobre o que sente e se comprometeu a melhorar.",
          ex: "Dizer “preciso de novos desafios” em vez de se afastar calado é o primeiro passo de quem quer voltar.",
          mult: "Manter a conversa aberta: trazer ao gestor o que motiva e o que trava."
        }
      ],
      evoluir: [
        {
          t: "Foco: celular no mínimo",
          d: "A regra da empresa é não usar celular. O pouco que eu flexibilizo é confiança, e eu respondo por ela: não pode atrapalhar as demandas.",
          ludico: "Como a chave do carro emprestada: quem empresta confia, mas é quem empresta que responde se bater. Cuidar bem é o que garante o próximo empréstimo.",
          dia: "Celular guardado durante o trabalho. Olhar rápido só em pausas, nunca no meio de um atendimento ou com alguém esperando.",
          treino: "Demanda em andamento, celular guardado."
        },
        {
          t: "Consistência nas entregas",
          d: "Recuperar a regularidade do desempenho.",
          ludico: "Academia: um treino de 3 horas não vale 3 meses de 30 minutos. Quem aparece todo dia é quem muda.",
          dia: "Mesmo padrão de qualidade na segunda e na sexta, no chamado simples e no complexo.",
          treino: "Acompanhamento semanal das entregas com o gestor."
        },
        {
          t: "Novos desafios",
          d: "Encontrar oportunidades que devolvam o engajamento.",
          ludico: "Video game: quando a fase fica fácil, a vontade de jogar some. O próximo nível devolve o interesse.",
          dia: "Assumir uma melhoria do setor como dono, do problema até a solução no ar.",
          treino: "Propor ao gestor uma melhoria por mês."
        }
      ],
      plano: [
        { m: "Jan", t: "Reconexão", a: "Conversa individual para mapear o que motiva e o que trava. Combinar a meta da semana e o uso mínimo do celular.", s: "Metas e combinado do celular firmados" },
        { m: "Fev", t: "Ritmo", a: "Entregas semanais acompanhadas por Victor e Gabriel.", s: "4 semanas seguidas de metas cumpridas" },
        { m: "Mar", t: "Primeiro desafio", a: "Assumir um desafio novo definido com o gestor: projeto ou melhoria.", s: "Escopo e prazo do desafio definidos" },
        { m: "Abr", t: "Dono do desafio", a: "Conduzir o desafio, com status a cada 15 dias.", s: "Entregas parciais no prazo" },
        { m: "Mai", t: "Referência de novo", a: "Compartilhar com o time o que aprendeu no desafio.", s: "Apresentação para o time" },
        { m: "Jun", t: "Balanço", a: "Avaliar a regularidade do semestre e definir o próximo desafio.", s: "Avaliação do ciclo" }
      ]
    },
    {
      id: "izabele", nome: "Izabele", cor: "#fbbf24",
      estrelas: [],
      resumo: "Você ganhou confiança no trabalho e domínio dos processos. Tem perfil executor, disposição para resolver problemas e está alinhada ao setor e à cultura da empresa. O próximo passo é fortalecer organização, planejamento e capacidade analítica.",
      frase: "O desenvolvimento é construído pela constância.",
      meta: "Análise, planejamento e segurança técnica",
      manter: [
        {
          t: "Domínio dos processos",
          d: "Mais segurança na atuação e conhecimento dos processos do setor.",
          ex: "Como quem aprendeu a dirigir: no começo pensa em cada pedal, hoje dirige e conversa ao mesmo tempo. Os processos do setor já estão nesse ponto.",
          mult: "Ensinar um processo que você domina para quem está chegando."
        },
        {
          t: "Execução e comprometimento",
          d: "Perfil executor, disposição para resolver e esforço para atender.",
          ex: "É a formiga que não larga a folha no meio do caminho: o problema do usuário não é empurrado para o próximo.",
          mult: "Somar planejamento a essa energia: fazer o certo, na ordem certa."
        },
        {
          t: "Alinhamento com a cultura",
          d: "Postura e dedicação alinhadas ao setor e à empresa.",
          ex: "Como quem veste a camisa do time: a postura fala antes das palavras.",
          mult: "Ser exemplo de cultura para quem está chegando."
        }
      ],
      evoluir: [
        {
          t: "Organização das demandas",
          d: "Memorizar não basta: registrar e acompanhar o dia e a semana.",
          ludico: "Memória é post-it ao vento: segura até a primeira ventania, que no setor tem nome de urgência.",
          dia: "Pedido feito no corredor às 9h, esquecido depois de três urgências até as 11h.",
          treino: "Anotar na hora, revisar no fim do dia."
        },
        {
          t: "Conhecimento técnico",
          d: "Rotina de estudos e mais familiaridade com os termos e conceitos de TI.",
          ludico: "Aprender TI é como aprender um idioma: 10 minutos por dia valem mais que um curso de um fim de semana.",
          dia: "Entender a diferença entre rede, servidor e sistema antes de explicar ao usuário o que aconteceu.",
          treino: "Um termo novo por dia, usado numa conversa de verdade."
        },
        {
          t: "Análise e planejamento",
          d: "Analisar a demanda, definir prioridade e planejar antes de executar.",
          ludico: "Antes de ligar o fogo, o chef separa os ingredientes. A execução fica rápida porque o planejamento veio antes.",
          dia: "Antes de atender, perguntar: o que é urgente, o que depende de outra pessoa e onde pode travar?",
          treino: "3 perguntas antes de executar."
        }
      ],
      plano: [
        { m: "Jan", t: "Caderno de bordo", a: "Registro diário e semanal das demandas, com prioridade e prazo.", s: "Registro revisado todo dia" },
        { m: "Fev", t: "Registro em dia", a: "Usar o check-in diário para conferir com o gestor o que está registrado e acompanhado.", s: "Nenhuma demanda esquecida no mês" },
        { m: "Mar", t: "Glossário vivo", a: "Rotina de estudo: um termo ou conceito de TI por dia, aplicado no trabalho.", s: "Glossário com 20 termos ou mais" },
        { m: "Abr", t: "3 perguntas", a: "Antes de executar: urgência, etapas e riscos. Apoio da liderança quando precisar.", s: "Plano das demandas maiores apresentado" },
        { m: "Mai", t: "Explicar para aprender", a: "Explicar um conceito técnico ao time ou a um usuário.", s: "Explicação feita com segurança" },
        { m: "Jun", t: "Autonomia", a: "Planejar a semana sozinha e só validar com a liderança. Balanço do semestre.", s: "Avaliação do ciclo" }
      ]
    }
  ]
};
