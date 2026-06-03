# ServiceNow Portfolio — Mendelson Aleixo

Portfólio prático focado no desenvolvimento de soluções e automações na plataforma ServiceNow, com projetos voltados a cenários reais de ITSM, catálogo de serviços, workflows corporativos e experiência do usuário.

---

## Objetivo

Construir soluções ponta a ponta utilizando a plataforma ServiceNow, aplicando:

- automação de processos;
- catálogo de serviços;
- workflows de aprovação;
- integrações;
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
- Update Sets;
- automações e workflows.

---

## Tecnologias e Conceitos

### ServiceNow

- Flow Designer
- Catalog Items
- IntegrationHub
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
- ITSM
- CMDB / Asset Management
- Import Sets / Transform Maps

### Desenvolvimento

- JavaScript
- APIs REST
- Git/GitHub

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
- encerramento automatizado do fluxo.

#### Tecnologias

- Flow Designer
- Catalog Items
- IntegrationHUb
- Record Producers
- GlideAjax
- Script Includes
- UI Policies
- Service Portal
- REST Integration
- CMDB / Asset Management
- Import Sets / Transform Maps

---

#### Status do Projeto

| Sprint | Funcionalidade                                                           | Status       |
| ------ | ------------------------------------------------------------------------ | ------------ |
| PRC-01 | Catalog Item + Variables                                                 | ✅ Concluído |
| PRC-02 | UI Policies + Validações                                                 | ✅ Concluído |
| PRC-03 | ViaCEP com GlideAjax + Script Include                                    | ⬜ Pendente  |
| PRC-04 | Flow Designer + Aprovação + Tarefas                                      | ⬜ Pendente  |
| PRC-05 | Notificações + Encerramento                                              | ⬜ Pendente  |
| PRC-06 | Import Set + Transform Map (Importação de dados de equipamentos via CSV) | ⬜ Pendente  |
| PRC-07 | UI Builder Workspace (Painel moderno para acompanhamento dos reparos)    | ⬜ Pendente  |
| PRC-08 | ViaCEP com IntegrationHub (Versão low-code da integração de CEP)         | ⬜ Pendente  |

### Solicitação de Equipamentos _(planejado)_

Catálogo corporativo para solicitação de notebooks, monitores e periféricos com fluxo de aprovação e controle de estoque.

---

### Onboarding de Funcionário _(planejado)_

Automação de onboarding com aprovações, provisionamento de acessos e criação automática de tarefas entre equipes.

---

## Contato

- LinkedIn: [linkedin.com/in/mendelson-aleixo](https://www.linkedin.com/in/mendelson-aleixo/)
- E-mail: mendelson.aleixo@gmail.com
