# CearáGPS · Roteirizador de Frotas (protótipo clicável)

Protótipo navegável do app onde o cliente de frota acompanha veículos e monta rotas.
Dados simulados de 8 veículos em Fortaleza-CE; rotas reais por ruas via OSRM.

Publicado em: https://devgarb.github.io/motion-designs/roteirizador-frotas/

## Telas
| Hash | Tela |
| --- | --- |
| `#/login` | Login (e-mail/CNPJ, biometria) |
| `#/painel` | Mapa ao vivo, filtros por status, KPIs do dia, alertas |
| `#/veiculos` | Lista com busca e filtro |
| `#/veiculo/PMX4A21` | Km, vel. máxima, tempo parado/ocioso, combustível, linha do tempo |
| `#/rotas` | Rotas do dia |
| `#/rota/nova` | Roteirizador: paradas arrastáveis, otimizar ordem, distância, tempo, litros, custo |
| `#/rota/exec` | Execução ao vivo com veículo animado, ETA e alerta de desvio |
| `#/manutencao` | Manutenção preventiva por km (marcar feito, agendar) |
| `#/relatorios` | Km/dia, consumo, uso do tempo, custo da ociosidade, ranking de velocidade |

## Estrutura
- `js/calc.js` — cálculos puros (haversine, litros, custo, tempos parado/ocioso, manutenção, otimização vizinho mais próximo)
- `js/data.js` — frota simulada e trilhas GPS determinísticas
- `js/motion.js` — transições e animações GSAP (estilo HyperFrames)
- `js/app.js` — router por hash e telas
- `css/app.css` — tokens do design system Stitch "CearáGPS Frotas Dark"
- `design/stitch/` — telas de referência geradas no Google Stitch

## Rodar local
```
python3 -m http.server 8765
```
Abrir http://localhost:8765/

Libs via CDN: Leaflet 1.9.4, GSAP 3.12.5, Chart.js 4.4.1, SortableJS 1.15.2. Mapa © OpenStreetMap, rotas OSRM, busca Nominatim.
