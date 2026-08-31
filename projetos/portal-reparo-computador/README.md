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

> Código-fonte em [`scripts/`](scripts/): `script-include-viacep.js` foi recuperado a partir de screenshots reais do código; `client-script-cep.js` é uma implementação de referência (o registro original não foi capturado no Update Set) — detalhes em [`docs/arquitetura.md`](docs/arquitetura.md#integração-de-cep--duas-abordagens-prc-03a-x-prc-03b).

---

## 5. Documentação técnica

- [Arquitetura](docs/arquitetura.md) — visão geral, modelo de dados, as duas abordagens de integração de CEP (GlideAjax x IntegrationHub), Flow Designer e Notification Framework
- [Fluxo do processo](docs/fluxo-processo.md) — passo a passo real do Flow de aprovação, com diagrama
- [Regras de negócio](docs/regras-negocio.md) — RN001 a RN010
- [Testes](docs/testes.md) — cobertura de testes por regra de negócio, com evidências

---

## 6. Estrutura do projeto

```text
portal-reparo-computador/
├── README.md
├── docs/              # arquitetura, fluxo de processo, regras de negócio, testes
├── scripts/           # client-script-cep.js, script-include-viacep.js
├── screenshots/       # evidências de cada sprint (NN-prc-XX-descricao.png)
└── update-sets/       # exportações XML por sprint
```

---

**Última atualização:** Junho/2026
