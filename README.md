# motion-designs

Motions e apresentações em HTML do Setor de T.I do Grupo Ramos.

| Branch | Conteúdo | Publicado em |
| --- | --- | --- |
| `main` | Índice + workflow de deploy | `/` |
| `grti-motion` | Motion de lançamento do Chat com a T.I (GRTI) | `/grti-motion/` |
| `treinamento-sistemas` | Apresentação "Sistemas por setor" | `/treinamento-sistemas/` |
| `roteirizador-frotas` | Protótipo clicável CearáGPS Roteirizador de Frotas | `/roteirizador-frotas/` |
| `konfia-encontro-01` | KONF I.A · Encontro 01: Claude instalado (motion) | `/konfia-encontro-01/` |
| `konfia-encontro-02` | KONF I.A · Encontro 02: Skills e agentes (motion) | `/konfia-encontro-02/` |
| `konfia-encontro-05` | KONF I.A · Encontro 05: Fundamentos e glossário (motion) | `/konfia-encontro-05/` |
| `oyp-apresentacao` | OYP · Optimize your process: apresentação em slides | `/oyp-apresentacao/` |
| `aula-planilha-sistema` | Da planilha ao sistema: motion da aula com o Claude (sem e com skill) | `/aula-planilha-sistema/` |
| `alinhamento-ti` | Alinhamento da equipe de TI: responsabilidade, compromisso e autonomia | `/alinhamento-ti/` |
| `resultados-ti` | Resultados da T.I · Ago a Out 2026 (motion em slides) | `/resultados-ti/` |

Site: https://devgarb.github.io/motion-designs/

O deploy roda pelo workflow `pages.yml` da `main`, que junta as branches num site só.
O deploy só roda a partir da `main`. Cada branch de motion tem um `trigger-pages.yml` que pede à `main` para publicar de novo, mas uma branch nova só entra no site depois de um commit na `main` (`pages.yml`, `index.html` e esta tabela).
