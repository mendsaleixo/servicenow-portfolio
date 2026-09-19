# Mendelson Aleixo — ServiceNow Portfolio

Portfólio prático de desenvolvimento, modelagem e automação na plataforma **ServiceNow**, com foco em aplicações escopadas, Service Portal, Flow Designer e Platform Analytics.

[LinkedIn](https://www.linkedin.com/in/mendelson-aleixo/) · mendelson.aleixo@gmail.com

---

## Projeto Mais Recente: NexoSpaces

Projeto autoral, construído e documentado em público — simula o desenho e a construção de uma solução de ITSM/ESM para uma rede fictícia de coworking premium. Diferente de um projeto guiado direto pelo build, começa pela camada que normalmente fica invisível: descoberta de negócio e mapeamento formal de processo em ITIL, antes de qualquer tabela ser criada no Studio.

- **Descoberta & Arquitetura:** briefing de negócio, levantamento de requisitos (as-is/to-be) e mapeamento das 7 práticas ITIL do dia a dia da operação (Incident, Problem, Change, Request Fulfillment, Knowledge, SLA/OLA/UC, CMDB) — com diagrama de dependência entre ativos.
- **Escopo e Governança:** aplicação isolada (`x_nexospaces`) com controle de acesso por papéis (`nexospaces_admin` / `nexospaces_user`).
- **Modelagem de Dados:** tabelas de Espaços e Reservas, e tabelas de Incidentes de TI e Chamados de Facilities estendidas da tabela nativa `Task`.
- **Catálogo & Automação:** Item de Catálogo com fluxo de aprovação via Flow Designer, matriz de Prioridade x SLA para classificação automática de incidentes, e Problem Management vinculado a incidentes recorrentes.
- **Service Portal:** vitrine para membros (`/nexospaces`) com identidade visual própria, acompanhamento de status da solicitação e Base de Conhecimento com sugestão automática na busca.
- **Platform Analytics:** dashboard gerencial com visualizações rastreáveis, uma a uma, às métricas de sucesso definidas na etapa de descoberta.

🔄 **Em construção, em público** — cada etapa é documentada e publicada conforme avança.

📄 [Ver documentação completa do projeto →](/projetos/nexo-spaces/)

---

## Outros Projetos em Portfólio

### AuMiau Pet Shop

Case prático completo de implementação de uma aplicação escopada na Now Platform, simulando a modernização da operação de uma rede varejista de 8 lojas e e-commerce — projeto de conclusão de bootcamp, construído do zero.

- **Tecnologias:** Aplicação escopada (`x_aumiau`), Service Catalog, Record Producer, Flow Designer, Service Portal com Branding Editor, Platform Analytics.
- **Status:** Concluído.

📄 [Ver documentação e evidências completas do projeto →](/projetos/aumiau-virada-servicenow/docs/)

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
│   ├── nexo-spaces/               ← Projeto autoral em construção (Descoberta, Arquitetura, App, Dados, Portal, Analytics)
│   ├── aumiau-virada-servicenow/  ← Case completo end-to-end (App, Dados, Portal, Analytics)
│   └── portal-reparo-computador/  ← Fluxo de ITSM e Reparos
├── fundamentos/
│   ├── fundamentos-platform/
│   ├── desenvolvimento-client-side/
│   └── desenvolvimento-server-side/
├── estudos-csa/                   ← Material de estudo para a certificação CSA, por bloco de prova
└── assets/
```
