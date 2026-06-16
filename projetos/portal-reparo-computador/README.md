# Portal de Reparo de Computadores — ServiceNow

Projeto de implementação completo utilizando recursos da plataforma **ServiceNow** para gerenciamento de solicitações de reparo de equipamentos corporativos.

O projeto foi estruturado em módulos incrementais, permitindo a aplicação prática de conceitos de:

- Service Catalog
- Client Scripts
- Integrações REST
- IntegrationHub
- Flow Designer
- Notifications
- Import Sets
- Workspaces

---

## Informações do Projeto

| Item       | Valor                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| Status     | 🟡 Em desenvolvimento                                                                                                  |
| Tipo       | Projeto de Portfólio                                                                                                   |
| Plataforma | ServiceNow                                                                                                             |
| Objetivo   | Demonstrar conhecimentos progressivos adquiridos por meio de estudos, laboratórios e micro-certificações da plataforma |

---

# 1. Problema de Negócio

Funcionários precisam reportar problemas em computadores corporativos e solicitar reparo à equipe de TI.

Em muitos cenários, esse processo ocorre por:

- E-mail
- Mensagens
- Planilhas

Gerando:

- Falta de rastreabilidade
- Ausência de padronização
- Retrabalho operacional
- Dificuldade de acompanhamento

## Solução

Criar um portal de autoatendimento onde o usuário:

1. Abre uma solicitação de reparo.
2. Informa o equipamento e os detalhes do problema.
3. Tem o endereço preenchido automaticamente através do CEP.
4. Aguarda aprovação do gestor.
5. Possui acompanhamento automatizado do processo.
6. Recebe comunicações durante todo o ciclo de atendimento.

---

# 2. Arquitetura Geral do Projeto

```text
PRC-01 → Service Catalog

PRC-02 → UI Policies

PRC-03A → GlideAjax + Script Include + REST

PRC-03B → IntegrationHub

PRC-04 → Flow Designer + Approvals

PRC-05 → Notification Framework

PRC-06 → Import Sets

PRC-07 → Workspace
```

Cada sprint adiciona uma camada de complexidade e utiliza recursos específicos da plataforma.

---

# 3. Fluxo Atual do Processo

```text
Usuário abre solicitação
            ↓
Flow Designer dispara
            ↓
Aprovação do Gestor
            ↓
Aprovado?
├── Sim
│      ↓
│ Criar Task TI
│      ↓
│ Equipe executa reparo
│      ↓
│ Wait For Condition
│      ↓
│ Atualizar Solicitação
│      ↓
│ Notificar Usuário
│
└── Não
       ↓
Encerrar Solicitação
       ↓
Notificar Usuário
```

---

# 4. Componentes Utilizados

| Componente      | Utilização                           |
| --------------- | ------------------------------------ |
| Service Catalog | Solicitação de reparo                |
| Variables       | Captura de dados                     |
| Variable Sets   | Reutilização de campos               |
| UI Policies     | Regras de exibição e obrigatoriedade |
| Client Scripts  | Automação client-side                |
| GlideAjax       | Comunicação assíncrona               |
| Script Includes | Lógica server-side                   |
| RESTMessageV2   | Consumo da API ViaCEP                |
| IntegrationHub  | Action reutilizável de CEP           |
| Flow Designer   | Automação do processo                |
| Approvals       | Aprovação do gestor                  |
| Catalog Tasks   | Atendimento da equipe de TI          |
| Notifications   | Comunicação automática               |
| Workflow Studio | Visualização da arquitetura          |
| Import Sets     | Carga futura de ativos               |
| Workspace       | Operação futura do processo          |

---

# 5. Arquitetura da Integração de CEP

Durante o projeto foram implementadas duas abordagens distintas para consulta de CEP.

---

## PRC-03A — Integração Tradicional

Implementação utilizada diretamente no catálogo.

### Fluxo

```text
Usuário informa CEP
        ↓
Client Script
        ↓
GlideAjax
        ↓
Script Include
        ↓
RESTMessageV2
        ↓
ViaCEP
        ↓
Retorno JSON
        ↓
Preenchimento automático
```

### Tecnologias Utilizadas

- Client Script
- GlideAjax
- Script Include
- RESTMessageV2
- JSON

---

## PRC-03B — Integração com IntegrationHub

Após concluir a micro-certificação **IntegrationHub Fundamentals**, foi criada uma Action reutilizável para consulta de CEP.

### Fluxo

```text
Flow
 ↓
Action
 ↓
REST Call
 ↓
ViaCEP
 ↓
Parse Response
 ↓
Outputs
```

### Objetivos

- Componentização
- Reutilização
- Baixo código
- Integrações futuras

---

# 6. Arquitetura do Fluxo de Aprovação

Implementada durante o **PRC-04**.

## Componentes

- Trigger baseado em Catalog Item
- Ask For Approval
- Flow Logic
- Create Catalog Task
- Wait For Condition
- Update Record
- Notifications

## Fluxo

```text
Catalog Item
      ↓
Flow Trigger
      ↓
Ask For Approval
      ↓
Aprovado?
├── Sim
│      ↓
│ Create Catalog Task
│      ↓
│ Wait For Condition
│      ↓
│ Update Record
│      ↓
│ Notification
│
└── Não
       ↓
Update Record
       ↓
Notification
```

---

# 7. Regras de Negócio

Documentadas em:

```text
docs/regras-negocio.md
```

| Regra | Descrição                                                |
| ----- | -------------------------------------------------------- |
| RN001 | Usuário só pode selecionar seus próprios ativos          |
| RN002 | CEP preenche endereço automaticamente                    |
| RN003 | Fluxo cria tarefa para TI após aprovação                 |
| RN004 | Solicitação rejeitada deve ser encerrada                 |
| RN005 | Task deve ser concluída antes do encerramento            |
| RN006 | Fluxo aguarda condição definida                          |
| RN007 | Descrição detalhada obrigatória para problemas complexos |

---

# 8. Estrutura do Projeto

```text
portal-reparo-computador/
│
├── README.md
│
├── docs/
│   ├── arquitetura.md
│   ├── fluxo-processo.md
│   ├── regras-negocio.md
│   └── testes.md
│
├── scripts/
│   ├── client-script-cep.js
│   └── script-include-viacep.js
│
├── screenshots/
│
└── update-sets/
    ├── PRC-01-catalog-item.xml
    ├── PRC-02-ui-policies.xml
    ├── PRC-03A-integracao-cep-glideajax.xml
    ├── PRC-03B-integracao-cep-integrationhub.xml
    ├── PRC-04-flow-aprovacao.xml
    ├── PRC-05-notification-framework.xml
    ├── PRC-06-import-set.xml
    └── PRC-07-workspace.xml
```

---

# 9. Roadmap

| Sprint  | Objetivo                  | Status       |
| ------- | ------------------------- | ------------ |
| PRC-01  | Service Catalog           | ✅ Concluído |
| PRC-02  | UI Policies               | ✅ Concluído |
| PRC-03A | GlideAjax + REST          | ✅ Concluído |
| PRC-03B | IntegrationHub            | ✅ Concluído |
| PRC-04  | Flow Designer + Approvals | ✅ Concluído |
| PRC-05  | Notification Framework    | ⬜ Planejado |
| PRC-06  | Import Sets               | ⬜ Planejado |
| PRC-07  | Workspace                 | ⬜ Planejado |

---

# 10. Lições Aprendidas

## PRC-03A

### Conhecimentos Aplicados

- GlideAjax
- Script Includes
- RESTMessageV2
- JSON
- Client Scripts

## PRC-03B

### Conhecimentos Aplicados

- IntegrationHub
- Actions
- Inputs e Outputs
- Integrações reutilizáveis
- Arquitetura low-code

## PRC-04

### Conhecimentos Aplicados

- Flow Designer
- Approvals
- Flow Logic
- Wait For Condition
- Catalog Tasks
- Workflow Studio
- Automação de processos

---

# 11. Próximos Passos

## PRC-05 — Notification Framework

### Funcionalidades

- Email Notifications
- Email Templates
- Notification Management
- Event-driven Notifications

---

## PRC-06 — Import Sets

### Funcionalidades

- Data Sources
- Import Sets
- Transform Maps
- Coalesce
- Data Import

---

## PRC-07 — Workspace

### Funcionalidades

- Agent Workspace
- Configuração de listas
- Visualização operacional
- Acompanhamento dos reparos

---

## Última Atualização

**Junho/2026**
