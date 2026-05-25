# Portal de Reparo de Computadores — ServiceNow

Fluxo completo para solicitação de reparo de equipamentos corporativos via Service Portal, com aprovação do gestor, integração de CEP, tarefas automáticas, notificações e lifecycle do ativo.

---

**Status:** 🟡 Em desenvolvimento | **Tipo:** Projeto de Implementação | **Módulos:** ITSM, Catalog, Flow, Asset Management, Integrations

---

## 1. Problema de negócio

Funcionários precisam reportar problemas em equipamentos corporativos (computadores, notebooks) e solicitar reparo. O processo atual é manual, sem rastreabilidade, e gera retrabalho para a equipe de TI.

**Solução:** Portal de autoatendimento onde o usuário abre a solicitação, o gestor aprova, a TI recebe a tarefa, o ativo é rastreado durante todo o lifecycle, e o fluxo é encerrado com confirmação do usuário.

---

## 2. Fluxo do processo

```text
Usuário abre solicitação (Catálogo)
                ↓
Aprovação do gestor
                ↓
Criação automática de tarefa para TI
                ↓
Envio do equipamento para a TI
                ↓
Ativo → In Transit (em trânsito)
                ↓
Recebimento pela TI
                ↓
Ativo → In Maintenance (em manutenção)
                ↓
Execução do reparo
                ↓
Agendamento de devolução
                ↓
Ativo → In Transit (retorno)
                ↓
Usuário confirma recebimento
                ↓
Ativo → In Use (em uso)
                ↓
Notificação de encerramento
                ↓
Fluxo concluído
```

---

## 3. Componentes da plataforma utilizados

| Componente              | Uso no projeto                                                      |
| ----------------------- | ------------------------------------------------------------------- |
| Catalog Item            | Formulário de solicitação de reparo                                 |
| Variables               | Captura de dados (equipamento, descrição, endereço, CEP)            |
| UI Policies             | Mostrar/esconder campos baseado no tipo de problema                 |
| Flow Designer           | Automação do fluxo de aprovação, tarefas e lifecycle                |
| Approvals               | Aprovação do gestor                                                 |
| Record Producer         | Criação de tarefa para a TI                                         |
| Script Includes         | Busca de endereço via ViaCEP (client-callable)                      |
| GlideAjax               | Comunicação assíncrona entre Client Script e servidor               |
| Service Portal          | Interface do usuário                                                |
| CMDB / Asset Management | Atualização do status do ativo (In Transit, In Maintenance, In Use) |
| Notifications           | E-mails automáticos para cada etapa                                 |
| REST Integration        | Consumo da API ViaCEP                                               |

---

## 4. Regras de negócio

Documentadas em [`docs/regras-negocio.md`](docs/regras-negocio.md)

| Regra | Descrição                                                           |
| ----- | ------------------------------------------------------------------- |
| RN001 | Usuário só pode selecionar ativos vinculados ao seu próprio usuário |
| RN002 | CEP deve preencher automaticamente rua, bairro, cidade e UF         |
| RN003 | Ativo deve mudar para "In Maintenance" quando recebido pela TI      |
| RN004 | Ativo deve mudar para "In Transit" quando enviado ou devolvido      |
| RN005 | Ativo deve voltar para "In Use" após confirmação do usuário         |
| RN006 | Fluxo só encerra após confirmação de recebimento pelo usuário       |
| RN007 | Descrição detalhada é obrigatória apenas para problemas complexos   |

---

## 5. Estrutura do projeto

```text
portal-reparo-computador/
│
├── README.md # Este arquivo
├── update-sets/ # Exportações XML por funcionalidade
│ ├── PRC-01-catalog-item.xml
│ ├── PRC-02-ui-policies.xml
│ ├── PRC-03-integracao-cep.xml
│ ├── PRC-04-flow-aprovacao.xml
│ └── PRC-05-notificacoes.xml
│
├── scripts/ # Códigos fonte
│ ├── client-script-cep.js
│ └── script-include-viacep.js
│
├── screenshots/ # Evidências visuais
│ ├── 01-catalog-item.png
│ ├── 02-ui-policy.png
│ ├── 03-viacep-integracao.png
│ ├── 04-flow-designer.png
│ ├── 05-approval.png
│ ├── 06-task-created.png
│ └── 07-portal-confirmation.png
│
└── docs/ # Documentação funcional
├── arquitetura.md
├── regras-negocio.md
├── testes.md
└── fluxo-processo.md
```

---

## 6. Entregáveis por funcionalidade

| ID     | Funcionalidade                | Update Set                  | Status        |
| ------ | ----------------------------- | --------------------------- | ------------- |
| PRC-01 | Catalog Item + Variables      | `PRC-01-catalog-item.xml`   | [x] Concluído |
| PRC-02 | UI Policies + Record Producer | `PRC-02-ui-policies.xml`    | [ ] Pendente  |
| PRC-03 | Integração ViaCEP (GlideAjax) | `PRC-03-integracao-cep.xml` | [ ] Pendente  |
| PRC-04 | Flow + Aprovação + Lifecycle  | `PRC-04-flow-aprovacao.xml` | [ ] Pendente  |
| PRC-05 | Notificações + Encerramento   | `PRC-05-notificacoes.xml`   | [ ] Pendente  |

---

## 7. Como testar

1. Acesse o PDI
2. Navegue até: `Self-Service` → `Service Catalog` → `Reparo de Computador`
3. Preencha o formulário:
   - Selecione um equipamento vinculado ao seu usuário
   - Descreva o problema
   - Informe o CEP (campos de endereço devem preencher automaticamente)
4. Envie a solicitação
5. Acompanhe as notificações por e-mail
6. Como gestor, acesse `My Approvals` e aprove/rejeite
7. Como TI, verifique a tarefa criada em `My Tasks`
8. Como usuário, confirme o recebimento após o reparo

---

## 8. Melhorias futuras

| ID    | Melhoria                    | Descrição                                      | Prioridade |
| ----- | --------------------------- | ---------------------------------------------- | ---------- |
| MF-01 | Dashboard de acompanhamento | Visão de todas as solicitações por status      | Alta       |
| MF-02 | SLA para reparo             | Tempo máximo para conclusão do reparo          | Média      |
| MF-03 | Integração com Teams/Slack  | Notificações via chat corporativo              | Média      |
| MF-04 | Aprovação multinível        | Gestor + TI + Compliance                       | Baixa      |
| MF-05 | QR Code para check-in/out   | Controle de entrada/saída do equipamento na TI | Baixa      |
| MF-06 | Catálogo mobile responsivo  | Versão otimizada para dispositivos móveis      | Baixa      |

---

## 9. Lições aprendidas

_[A serem preenchidas durante o desenvolvimento]_

---

_Última atualização: [25/05/26]_
