# Fundamentos da Plataforma — ITSM e Incident Management

[← Voltar ao portfólio principal](../../README.md)

Implementações práticas na plataforma ServiceNow para gerenciamento de incidentes, customização de formulários, controle de versão com Update Sets e aplicação de conceitos ITIL.

---

**Status:** ✅ Concluído | **Tipo:** Fundamentos | **Módulo:** ITSM / Incident Management

---

## Contexto do projeto

Configuração e operação do módulo de Incident Management no ServiceNow,
aplicando conceitos ITIL para gestão de chamados, personalização de formulários
e versionamento de customizações via Update Sets.

---

## Tecnologias e recursos utilizados

- Incident Management (ITSM)
- ITIL 4 (Incidente, Problema, Requisição)
- Form Layout e personalização de formulários
- UI Policies
- Update Sets
- Listas, filtros e navegação
- PDI (Personal Developer Instance)

---

## Navegação

### Artigos Produzidos

- [O que é ServiceNow, instâncias e PDI](artigos/01-introducao-instancias-pdi.md)
- [ITIL: Incidente vs Requisição vs Problema](artigos/02-itil-incidente-requisicao-problema.md)
- [Navegação: listas, filtros, formulários](artigos/03-navegacao-listas-filtros-formularios.md)
- [Ciclo de vida do incidente](artigos/04-ciclo-vida-incidente.md)
- [Update Sets (fundamentos)](artigos/05-fundamentos-update-sets.md)

### Evidências

- [Screenshots das implementações](entregaveis/screenshots/)

### Update Set

- [Exportação XML](update-sets/Semana1-Fundamentos.xml)

---

## Implementações realizadas

### Incident Management

| Atividade                    | Descrição                                                        |
| ---------------------------- | ---------------------------------------------------------------- |
| Criação de incidentes        | 5 incidentes simulando ambiente corporativo real                 |
| Ciclo de vida completo       | Incidente VPN: New → In Progress → Resolved → Closed             |
| Personalização de formulário | Campos `u_setor_afetado` (Choice) e `u_impacto_negocio` (Choice) |
| Filtros salvos               | "Incidentes Prioritários - Nova Fila" e "Meus Incidentes Ativos" |

### UI Policies

| Regra                                             | Comportamento                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| Setor Afetado obrigatório para prioridade crítica | Campo obrigatório quando Priority = Critical, com Reverse if false |

### Update Sets

- Update Set criado e mantido ativo durante toda a semana
- Captura de campos customizados, form layout, choices e UI
