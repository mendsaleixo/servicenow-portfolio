# Portal de Reparo de Computadores — ServiceNow

[← Voltar ao portfólio principal](../../README.md)

Projeto de portfólio para gerenciamento de solicitações de reparo de equipamentos corporativos, construído em sprints incrementais na plataforma ServiceNow.

| Item       | Valor                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------- |
| Status     | 🟡 Em desenvolvimento                                                                     |
| Plataforma | ServiceNow (Service Catalog, Flow Designer, IntegrationHub)                               |
| Objetivo   | Demonstrar aplicação prática de conhecimentos adquiridos em estudos e micro-certificações |

---

## 1. Problema e solução

Hoje, solicitações de reparo de equipamentos costumam ser feitas por e-mail, mensagens ou planilhas — sem rastreabilidade, padronização ou controle de andamento.

**Solução:** um portal de autoatendimento onde o usuário abre a solicitação, tem o endereço preenchido automaticamente via CEP, aguarda aprovação do gestor e acompanha todo o processo com notificações automáticas.

---

## 2. Fluxo do processo

```text
Usuário abre solicitação
        ↓
Flow Designer dispara → Aprovação do Gestor
        ↓
   Aprovado?
├── Sim → Cria Task de TI → Equipe executa reparo → Atualiza solicitação → Notifica usuário
└── Não → Encerra solicitação → Notifica usuário
```

---

## 3. Roadmap

| Sprint  | Objetivo                          | Status       |
| ------- | --------------------------------- | ------------ |
| PRC-01  | Service Catalog                   | ✅ Concluído |
| PRC-02  | UI Policies                       | ✅ Concluído |
| PRC-03A | Integração CEP — GlideAjax + REST | ✅ Concluído |
| PRC-03B | Integração CEP — IntegrationHub   | ✅ Concluído |
| PRC-04  | Flow Designer + Approvals         | ✅ Concluído |
| PRC-05  | Notification Framework            | ✅ Concluído |
| PRC-06  | Import Sets                       | ⬜ Planejado |
| PRC-07  | Workspace                         | ⬜ Planejado |

---

## 4. Componentes utilizados

| Componente                  | Utilização                              |
| --------------------------- | --------------------------------------- |
| Service Catalog             | Solicitação de reparo via Catalog Item  |
| UI Policies                 | Regras de exibição e obrigatoriedade    |
| GlideAjax / Script Includes | Consulta de CEP (abordagem tradicional) |
| IntegrationHub              | Action reutilizável de CEP (low-code)   |
| Flow Designer               | Automação do fluxo de aprovação         |
| Notifications               | Comunicação automática ao usuário       |
| Import Sets                 | Carga futura de ativos _(planejado)_    |
| Workspace                   | Painel operacional _(planejado)_        |

> Detalhamento técnico de cada integração (CEP tradicional vs IntegrationHub, regras de negócio, arquitetura completa) em [`/docs`](docs/).

---

## 5. Estrutura do projeto

```text
portal-reparo-computador/
├── README.md
├── docs/              # arquitetura, regras de negócio, testes
├── scripts/           # client-script-cep.js, script-include-viacep.js
├── screenshots/       # evidências de cada sprint
└── update-sets/       # exportações XML por sprint
```

---

**Última atualização:** Junho/2026
