# Bloco 4 — Service Catalog, Workflows & Reports

[← Voltar à visão geral](../README.md)

Checklist de estudo para catálogo de serviços, automação de fluxos e relatórios, com links para artigos e entregáveis já produzidos neste portfólio.

---

## Checklist

- [ ] Catalog Items, Record Producers, Variables, Variable Sets, Order Guides
  - [Service Catalog, Catalog Items e Variables no ServiceNow](../../fundamentos/fundamentos-platform/artigos/06-service-catalog-catalog-items-e-variables.md)
  - [LAB 03 — Catálogo & Automação](../../projetos/aumiau-virada-servicenow/docs/LAB03.md) — Catalog Item com fluxo REQ/RITM e Record Producer com Map to field
  - [Portal de Reparo de Computadores — README](../../projetos/portal-reparo-computador/README.md) — sprint PRC-01 (Service Catalog)
  - [Regras de Negócio — Portal de Reparo de Computador](../../projetos/portal-reparo-computador/docs/regras-negocio.md) — RN001, Reference Qualifier em variável de Catalog Item
- [ ] Catalog UI Policy (variáveis de catálogo) vs UI Policy comum (campos de formulário) — mecanismos diferentes
  - [UI Policy vs Client Script: qual usar e quando](../../fundamentos/desenvolvimento-client-side/artigos/05-ui-policy-vs-client-script.md) — base conceitual de UI Policy comum
  - [Regras de Negócio — Portal de Reparo de Computador](../../projetos/portal-reparo-computador/docs/regras-negocio.md) — RN007, UI Policy condicional
  - ⚠️ Gap de conteúdo: ainda não há artigo dedicado a Catalog UI Policy (variáveis) — produzir para reforçar a distinção
- [ ] Flow Designer: Flows, Actions, Subflows, Triggers (Workflow Editor clássico é legado, peso menor)
  - [Fluxos de Trabalho e Flow Designer no ServiceNow](../../fundamentos/fundamentos-platform/artigos/07-fluxos-de-trabalho-flow-designer.md)
  - [LAB 03 — Catálogo & Automação](../../projetos/aumiau-virada-servicenow/docs/LAB03.md) — Flow com trigger de criação, mudança de status e alerta condicional
  - [Portal de Reparo de Computadores — README](../../projetos/portal-reparo-computador/README.md) — sprint PRC-04 (Flow Designer + Approvals)
  - [Regras de Negócio — Portal de Reparo de Computador](../../projetos/portal-reparo-computador/docs/regras-negocio.md) — RN003-RN006 e RN010, lógica de aprovação e estados no Flow Designer
- [ ] Notifications: email notifications, eventos
  - [Notification Framework no ServiceNow](../../fundamentos/fundamentos-platform/artigos/08-email-notifications.md)
  - [Portal de Reparo de Computadores — README](../../projetos/portal-reparo-computador/README.md) — sprint PRC-05 (Notification Framework)
  - [Regras de Negócio — Portal de Reparo de Computador](../../projetos/portal-reparo-computador/docs/regras-negocio.md) — RN008, notificações por etapa do fluxo
- [ ] Reports: tipos de relatório, dashboards, Performance Analytics x módulo de Reporting comum
  - [LAB 05 — Dashboards & Relatórios](../../projetos/aumiau-virada-servicenow/docs/LAB05.md) — dashboard "AuMiau — Gestão" no Platform Analytics (Single Score, Horizontal Bar, List)

---

## Nota de atenção

Catalog UI Policy x UI Policy é distinção de nome parecido, testada no mesmo estilo de Role x ACL (ver [Bloco 3](../bloco-3-data-access-configuration/README.md)).
