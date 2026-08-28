# Bloco 2 — The Database & Table Architecture

[← Voltar à visão geral](../README.md) · [Questões de treino →](questoes-praticas.md)

Checklist de estudo para o bloco de modelagem de dados e arquitetura de tabelas, com links para artigos e entregáveis já produzidos neste portfólio.

---

## Checklist

- [ ] sys_db_object (registro de tabelas), tabelas base vs customizadas
  - [LAB 02 — Desenvolvimento & Dados](../../projetos/aumiau-virada-servicenow/docs/LAB02.md) — criação de tabelas customizadas `x_aumiau_categoria` e `x_aumiau_produto`
- [ ] Herança/extensão de tabela — ex: Incident, Problem e Change estendem Task
  - [LAB 02 — Desenvolvimento & Dados](../../projetos/aumiau-virada-servicenow/docs/LAB02.md) — tabelas `x_aumiau_ouvidoria` e `x_aumiau_pedido` estendidas a partir da tabela nativa `Task`, com herança automática de `number`, `state`, `assigned_to` e SLA
- [ ] sys_dictionary, tipos de campo (reference, choice, journal, etc.)
  - [Ciclo de vida do incidente](../../fundamentos/fundamentos-platform/artigos/04-ciclo-vida-incidente.md)
  - [Entregável — UI Policy](../../fundamentos/fundamentos-platform/entregaveis/entregavel-ui-policy.md) — campos Choice customizados (`u_setor_afetado`, `u_impacto_negocio`)
- [ ] Relacionamentos: reference field (muitos-para-um), related list (um-para-muitos), tabela m2m (muitos-para-muitos)
  - [LAB 02 — Desenvolvimento & Dados](../../projetos/aumiau-virada-servicenow/docs/LAB02.md) — campo de referência ligando `Produto` → `Categoria`
- [ ] Dot-walking (ex: caller_id.department)
  - [GlideRecord: consultas simples (get, query, addQuery)](../../fundamentos/desenvolvimento-server-side/artigos/02-gliderecord-consultas.md)
  - [Regras de Negócio — Portal de Reparo de Computador](../../projetos/portal-reparo-computador/docs/regras-negocio.md) — RN009 usa dot-walking (`current.caller_id.manager`)

---

## Nota de atenção

Questões sobre "qual tabela X estende" ou "o que acontece com campos ao estender uma tabela" costumam ser diretas, sem pegadinha — só exigem saber o modelo. Entender bem esse ponto explica boa parte das questões de ACL herdada no [Bloco 3](../bloco-3-data-access-configuration/README.md).
