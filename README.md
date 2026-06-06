# ServiceNow Portfolio — Mendelson Aleixo

Portfólio prático focado no desenvolvimento de soluções e automações na plataforma ServiceNow, com projetos voltados a cenários reais de ITSM, catálogo de serviços, workflows corporativos, Flow Designer, IntegrationHub e experiência do usuário.

---

## Objetivo

Construir soluções ponta a ponta utilizando a plataforma ServiceNow, aplicando:

- automação de processos;
- catálogo de serviços;
- workflows de aprovação;
- Flow Designer;
- IntegrationHub;
- integrações REST;
- scripting client-side e server-side;
- boas práticas de organização técnica;
- foco em experiência do usuário e regras de negócio.

---

## Estrutura do Repositório

```text
servicenow-portfolio/
│
├── projetos/
│   ├── portal-reparo-computador/
│   │   ├── README.md
│   │   ├── update-sets/
│   │   ├── screenshots/
│   │   ├── scripts/
│   │   └── docs/
│   ├── onboarding-funcionario/
│   └── solicitacao-equipamentos/
│
├── fundamentos/
│   ├── flow-designer/
│   ├── integrationhub/
│   ├── desenvolvimento-client-side/
│   ├── desenvolvimento-server-side/
│   └── fundamentos-platform/
│
└── assets/
```

---

## Organização e Metodologia

Os projetos são organizados utilizando:

- GitHub Projects;
- milestones por sprint;
- issues por funcionalidade;
- labels por tecnologia;
- Definition of Done (DoD);
- documentação incremental;
- versionamento via Update Sets.

---

## Fundamentos Técnicos

A base técnica utilizada nos projetos está organizada na pasta `/fundamentos`, incluindo estudos e práticas de:

- ITSM e ITIL;
- Client Scripts;
- Business Rules;
- GlideRecord;
- Script Includes;
- UI Policies;
- Flow Designer;
- Workflow Studio;
- IntegrationHub;
- Notifications;
- Update Sets;
- automações e workflows.

---

## Tecnologias e Conceitos

### ServiceNow

- Flow Designer
- Workflow Studio
- IntegrationHub
- Catalog Items
- Record Producers
- Client Scripts
- Business Rules
- UI Policies
- UI Builder
- Script Includes
- GlideRecord
- GlideAjax
- Update Sets
- Service Portal
- REST Integration
- Connection & Credential Alias
- Webhooks
- Notifications
- ITSM
- CMDB / Asset Management
- Import Sets / Transform Maps

### Desenvolvimento

- JavaScript
- APIs REST
- JSON
- Git/GitHub

---

## Certificações

### Concluídas

- Flow Designer Fundamentals Micro-Certification
- IntegrationHub Fundamentals Micro-Certification

### Em andamento

- Certified System Administrator (CSA)

---

## Projetos Principais

### [Portal de Reparo de Computadores](/projetos/portal-reparo-computador/README.md) _(em desenvolvimento)_

Fluxo completo para solicitação de reparo de equipamentos corporativos via Service Portal.

#### Funcionalidades

- abertura de solicitação via catálogo;
- aprovação automática do gestor;
- integração de CEP para preenchimento automático;
- criação automatizada de tarefas;
- controle de lifecycle do ativo;
- notificações;
- confirmação de recebimento pelo usuário;
- encerramento automatizado do fluxo;
- integração com Slack via IntegrationHub.

#### Tecnologias

- Flow Designer
- Workflow Studio
- IntegrationHub
- Catalog Items
- Record Producers
- GlideAjax
- Script Includes
- UI Policies
- Service Portal
- REST Integration
- Connection & Credential Alias
- Slack Webhooks
- Notifications
- CMDB / Asset Management
- Import Sets / Transform Maps

---

#### Status do Projeto

| Sprint  | Funcionalidade                                                           | Status       |
| ------- | ------------------------------------------------------------------------ | ------------ |
| PRC-01  | Catalog Item + Variables                                                 | ✅ Concluído |
| PRC-02  | UI Policies + Validações                                                 | ✅ Concluído |
| PRC-03A | ViaCEP com GlideAjax + Script Include                                    | ⬜ Pendente  |
| PRC-03B | ViaCEP com IntegrationHub                                                | ⬜ Pendente  |
| PRC-04  | Flow Designer + Aprovação + Lifecycle                                    | ⬜ Pendente  |
| PRC-05  | Notificações + Encerramento Automatizado                                 | ⬜ Pendente  |
| PRC-06  | Integração com Slack via IntegrationHub                                  | ⬜ Pendente  |
| PRC-07  | Import Set + Transform Map (Importação de dados de equipamentos via CSV) | ⬜ Pendente  |
| PRC-08  | UI Builder Workspace (Painel moderno para acompanhamento dos reparos)    | ⬜ Pendente  |

---

### Solicitação de Equipamentos _(planejado)_

Catálogo corporativo para solicitação de notebooks, monitores e periféricos com fluxo de aprovação e controle de estoque.

---

### Onboarding de Funcionário _(planejado)_

Automação de onboarding com aprovações, provisionamento de acessos e criação automática de tarefas entre equipes.

---

## Metas de Aprendizado

Este portfólio acompanha minha evolução na plataforma ServiceNow, com foco em:

- Certified System Administrator (CSA)
- Application Development
- Flow Designer
- IntegrationHub
- Service Portal
- UI Builder
- CMDB e Asset Management
- Integrações REST e automações corporativas

---

## Contato

- LinkedIn: [linkedin.com/in/mendelson-aleixo](https://www.linkedin.com/in/mendelson-aleixo/)
- E-mail: mendelson.aleixo@gmail.com
