# NexoSpaces — Etapa 0: Contexto de Negócio & Levantamento de Requisitos

> Documento base do projeto autoral. Serve de fonte da verdade para a Etapa 1 (arquitetura e mapeamento ITIL) e para todas as etapas de construção seguintes.

## 1. Sumário Executivo

A NexoSpaces é uma rede de coworking que escalou rápido — o crescimento veio da abertura de novas unidades, sem investimento equivalente em operação centralizada — e deixou os processos internos pra trás: hoje, tudo — de um cabo HDMI emprestado a uma queda de internet — chega pelo mesmo canal informal (WhatsApp/e-mail), sem triagem, prazo ou rastreabilidade. A diretoria decidiu profissionalizar a operação adotando o ServiceNow como plataforma central de ITSM/ESM. Este projeto cobre o desenho e a construção dessa solução, do levantamento de requisitos ao dashboard gerencial final.

## 2. Sobre a NexoSpaces

|                         |                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| Fundação                | 2021                                                                                              |
| Modelo de negócio       | Rede premium de espaços de trabalho compartilhado (coworking)                                     |
| Unidades                | 5, em grandes centros comerciais                                                                  |
| Base de membros         | 2.000+ atendidos diariamente — freelancers, startups, filiais regionais de grandes corporações    |
| Quadro de colaboradores | ~80 diretos, divididos em Operações (Community Managers), TI, Facilities (Manutenção) e Comercial |

## 3. Ecossistema de Espaços e Serviços

- **Espaços físicos:** mesas rotativas (hot desks), escritórios privativos (5 a 50 pessoas), salas de reunião à prova de som, auditórios para eventos e workshops.
- **Infraestrutura de TI:** redes Wi-Fi corporativas com links redundantes, controle de acesso integrado (biometria e crachás RFID), estações de impressão em nuvem.
- **Equipamentos sob demanda:** monitores extras, adaptadores, cabos HDMI, projetores interativos para salas de reunião.
- **Facilities:** climatização central, serviço de copa, limpeza contínua, manutenção de mobiliário ergonômico.

## 4. Cenário As-Is — Onde Dói

**Canais de entrada hoje:** mensagens no WhatsApp dos Community Managers ou e-mails genéricos — sem padrão, sem triagem, sem dono.

| Área       | Dor concreta                                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| TI         | Não distingue um pedido de cabo HDMI de uma queda geral de internet — tudo chega com a mesma urgência aparente |
| Facilities | Organiza manutenção em planilhas soltas, perdendo horas e rastreabilidade                                      |
| Diretoria  | Sem métricas de custo, volume de chamados ou cumprimento de prazo — decide às cegas                            |
| Membros    | Não sabem o status do próprio pedido; prazos (SLA) simplesmente não existem                                    |

**Consequência consolidada:** itens se perdem, prazos não são cumpridos porque não são nem definidos, e a satisfação do cliente vem caindo.

## 5. Personas Envolvidas

| Persona              | Papel                                                   | Principal necessidade no novo sistema                                     |
| -------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| Membro               | Cliente final (freelancer, startup, filial corporativa) | Reservar espaço, solicitar equipamento, abrir chamado e acompanhar status |
| Community Manager    | Operações                                               | Parar de ser o funil manual de tudo; ter um canal estruturado de triagem  |
| Técnico de TI        | TI                                                      | Diferenciar por prioridade real (ex: queda de rede vs. pedido de cabo)    |
| Equipe de Facilities | Manutenção                                              | Fila organizada de chamados físicos, sem depender de planilha             |
| Diretoria            | Gestão                                                  | Visibilidade de custo, volume de chamados e SLA cumprido                  |

## 6. Cenário To-Be — O Objetivo do Projeto

A diretoria escolheu o ServiceNow como plataforma central para substituir o caos do WhatsApp por um fluxo de ITSM (Gestão de Serviços de TI e Facilities). Neste projeto, você assume o papel de arquiteto e desenvolvedor responsável por construir essa aplicação do zero: um portal para os membros, fluxos de aprovação automáticos, um catálogo de serviços padronizado (reserva de salas ou pedido de itens) e um sistema de gestão de incidentes de equipamento — fechando com um dashboard de ocupação e chamados para a diretoria.

## 7. Levantamento de Requisitos

### 7.1 Requisitos Funcionais

| ID   | Requisito                                                                                                                                 | Onde é construído    |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| RF01 | Portal para membros reservarem espaços (hot desk, sala de reunião, auditório)                                                             | Etapa 5 — Portal     |
| RF02 | Catálogo de serviços padronizado para pedidos de equipamento (monitor, HDMI, projetor)                                                    | Etapa 4 — Catálogo   |
| RF03 | Abertura de incidentes de infraestrutura de TI (Wi-Fi, controle de acesso, impressão) com triagem por prioridade                          | Etapa 4 — Automação  |
| RF04 | Abertura de chamados de Facilities (climatização, limpeza, mobiliário)                                                                    | Etapa 4 — Automação  |
| RF05 | Fluxo de aprovação automático para solicitações que exigem validação (ex: reserva de auditório, empréstimo de equipamento de maior valor) | Etapa 4 — Automação  |
| RF06 | Acompanhamento de status da solicitação pelo próprio membro                                                                               | Etapa 5 — Portal     |
| RF07 | Dashboard gerencial com ocupação, volume de chamados e custos                                                                             | Etapa 6 — Dashboards |

### 7.2 Requisitos Não Funcionais

| ID    | Requisito                                                                                                                  |
| ----- | -------------------------------------------------------------------------------------------------------------------------- |
| RNF01 | SLA definido por tipo de solicitação (ex: incidente crítico de rede vs. pedido simples de cabo HDMI têm prazos diferentes) |
| RNF02 | Interface em português (pt-BR)                                                                                             |
| RNF03 | Perfis de acesso distintos (membro, Community Manager, técnico de TI, Facilities, diretoria)                               |
| RNF04 | Rastreabilidade completa da solicitação, da abertura ao fechamento                                                         |

## 8. Métricas de Sucesso (o que a diretoria vai olhar no dashboard)

- Total de solicitações por mês, por categoria
- % de SLA cumprido
- Chamados pendentes de atribuição
- Ocupação de espaços (salas/auditório) por período
- Fila de chamados em aberto (meta: zero itens "perdidos" como hoje)

## 9. Escopo do Projeto

- App escopada dedicada (Etapa 2)
- Modelo de dados: Espaços, Reservas, Solicitações de Equipamento, Incidentes de TI, Chamados de Facilities (Etapa 3)
- Catálogo de serviços + fluxo de aprovação (Etapa 4)
- Portal de membros com identidade visual própria (Etapa 5)
- Dashboard gerencial (Etapa 6)

## 10. Fora de Escopo (por ora)

- Integração com sistema de billing/faturamento
- Gestão financeira/orçamentária da rede
- Aplicativo mobile nativo — o portal via navegador cobre a necessidade inicial

## 11. Conexão com Estudo, Aplicação e Cronograma

- **Bloco CSA:** não aplicável diretamente — este documento é trabalho de análise de negócio, não configuração de plataforma (toca conceitos gerais do Bloco 1, mas sem módulo específico).
- **Fonte teórica:** este próprio documento — não vem do curso técnico, é levantamento autoral (briefing de cliente fictício + requisitos).
- **Aplicar na PDI:** nada ainda nesta etapa — é só descoberta e levantamento, antes de abrir o Studio.
- **Documentar:** este arquivo já é o registro da etapa, versionado no GitHub.
- **Post:** publicados em 21/09 (contexto de negócio) e 23/09 (personas/requisitos, formato dialógico) — ver Calendário de Posts.

---

**Próximo passo (Etapa 1):** cada requisito funcional acima será mapeado formalmente ao processo ITIL correspondente (Incident Management, Request Fulfillment, Service Catalog...) e ganhará o diagrama de arquitetura da solução.
