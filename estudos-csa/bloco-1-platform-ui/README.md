# Bloco 1 — The ServiceNow Platform & UI

[← Voltar à visão geral](../README.md)

Checklist de estudo para o bloco de fundamentos da plataforma e interface do usuário, com links para artigos e entregáveis já produzidos neste portfólio.

---

## Checklist

- [ ] O que é aPaaS, arquitetura single-tenant, baseline vs instância personalizada
  - [O que é ServiceNow, instâncias e PDI?](../../fundamentos/fundamentos-platform/artigos/01-introducao-instancias-pdi.md)
- [ ] Prod x non-prod (dev/test/UAT/QA), PDI
  - [O que é ServiceNow, instâncias e PDI?](../../fundamentos/fundamentos-platform/artigos/01-introducao-instancias-pdi.md)
- [ ] Personas (admin, security_admin, specialized admin, process user, approver, requester/ESS, impersonator)
  - [LAB 02 — Desenvolvimento & Dados](../../projetos/aumiau-virada-servicenow/docs/LAB02.md) — criação dos papéis `aumiau_admin` e `aumiau_user`
- [ ] sys_user, sys_user_group, atribuição de role a grupo vs usuário
  - [LAB 02 — Desenvolvimento & Dados](../../projetos/aumiau-virada-servicenow/docs/LAB02.md) — ACLs por papel (Administrador x Usuário)
- [ ] Navegação: listas, filtros, favoritos, breadcrumbs
  - [Navegação: listas, filtros e formulários](../../fundamentos/fundamentos-platform/artigos/03-navegacao-listas-filtros-formularios.md)
  - [Entregável — Filtros Salvos](../../fundamentos/fundamentos-platform/entregaveis/entregavel-filtros.md)
  - [Entregável — Personalização do Formulário de Incidente](../../fundamentos/fundamentos-platform/entregaveis/entregavel-form-layout.md)
- [ ] Branding (System Properties > UI16) vs Preferences pessoais
  - [LAB 01 — Fundação da Aplicação](../../projetos/aumiau-virada-servicenow/docs/LAB01.md) — configuração de Preferences pessoais (idioma, formato de data/hora, help tips)
  - [AuMiau Pet Shop — README](../../projetos/aumiau-virada-servicenow/README.md) — identidade visual própria via Branding Editor no Service Portal
- [ ] Application Scope (nota: distinto de ACL — ver link cruzado no Bloco 3)
  - [LAB 02 — Desenvolvimento & Dados](../../projetos/aumiau-virada-servicenow/docs/LAB02.md) — criação da aplicação escopada `x_aumiau`
  - Ver também: [Bloco 3 — ACLs](../bloco-3-data-access-configuration/README.md)

---

## Nota de atenção

- É **admin** (não `sys_admin`).
- É **sys_user_group** (não `user_groups`).
- **Application Scope ≠ ACL** — escopo isola a aplicação; ACL controla acesso a dados dentro (ou fora) dela.
