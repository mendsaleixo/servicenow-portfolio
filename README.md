# Mendelson Aleixo — ServiceNow Portfolio

Portfólio prático de desenvolvimento, modelagem e automação na plataforma **ServiceNow**, com foco em aplicações escopadas, Service Portal, Flow Designer e Platform Analytics.

[LinkedIn](https://www.linkedin.com/in/mendelson-aleixo/) · mendelson.aleixo@gmail.com

---

## Projeto em Destaque: AuMiau Pet Shop (Transformação Digital)

Case prático completo de implementação de uma aplicação escopada corporativa na Now Platform, modernizando a operação de uma rede varejista de 8 lojas e e-commerce.

- **Escopo e Governança:** Aplicação isolada (`x_aumiau`) com controle de acesso por papéis (`aumiau_admin` / `aumiau_user`).
- **Modelagem de Dados:** Tabelas customizadas de Categorias, produtos importados via Excel, e tabelas de Ouvidoria e Pedidos estendidas da tabela nativa `Task`.
- **Catálogo & Automação:** Implementação de _Item de Catálogo_ com governança de aprovação e _Record Producer_ com mapeamento de campos (_Map to field_), integrados a um fluxo automatizado no _Flow Designer_ para alteração de status e alertas críticos por e-mail.
- **Service Portal:** Vitrine digital customizada (`/aumiau`) com identidade visual própria (_Branding Editor_), menu enxuto e homepage com widget de busca inteligente (_"Como posso AUjudar?"_).
- **Platform Analytics:** Painel gerencial consolidado (_AuMiau — Gestão_) com indicadores em _Single Score_, gráficos de distribuição e filas de atendimento.

📄 [Ver documentação e evidências completas do projeto →](projetos/aumiau-virada-servicenow/docs/)

---

## Outros Projetos em Portfólio

### Portal de Reparo de Computadores

Fluxo completo de solicitação de reparo de equipamentos corporativos via Service Portal — do pedido à aprovação, execução e encerramento automatizado.

- **Tecnologias:** Flow Designer, IntegrationHub, Service Portal, GlideAjax, Script Includes, CMDB/Asset Management.
- **Status:** Concluído / Em evolução contínua.

---

## Fundamentos Técnicos

- **Plataforma:** Navegação, listas/filtros, incidentes, UI Policies, Update Sets, Service Catalog, Flow Designer, Platform Analytics.
- **Client-side:** Client Scripts (onChange, onLoad, onSubmit), UI Policies vs Client Scripts.
- **Server-side:** Business Rules, GlideRecord, Script Includes, GlideAjax, integrações REST.

---

## Certificações

- ✅ Flow Designer Fundamentals — Micro-Certification
- ✅ IntegrationHub Fundamentals — Micro-Certification
- 🔄 Certified System Administrator (CSA) — em andamento ([material de estudo →](estudos-csa/))

---

## Estrutura do Repositório

```text
servicenow-portfolio/
├── projetos/
│   ├── aumiau-virada-servicenow/  ← Case completo end-to-end (App, Dados, Portal, Analytics)
│   └── portal-reparo-computador/  ← Fluxo de ITSM e Reparos
├── fundamentos/
│   ├── fundamentos-platform/
│   ├── desenvolvimento-client-side/
│   └── desenvolvimento-server-side/
├── estudos-csa/                   ← Material de estudo para a certificação CSA, por bloco de prova
└── assets/
```
