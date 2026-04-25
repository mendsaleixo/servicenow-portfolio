# Ciclo de vida do incidente

**Data:** 23/04/2026
**Semana:** 1 — Fundamentos
**Fonte:** ITIL 4 + SNAF Módulos 1 e 3 + Prática própria
**Tópicos relacionados:** Incident Management, State Management, Workflow

---

## O que é (definição simples)

O ciclo de vida do incidente é **a jornada que um chamado percorre desde o momento em que é criado até o momento em que é definitivamente encerrado.** É como o rastreamento de um pedido no e-commerce: você sabe se está sendo preparado, se saiu para entrega ou se já foi entregue.

No ServiceNow, essa jornada é controlada pelo campo **State (Estado)**. Cada estado representa uma fase do atendimento, e o técnico (ou o sistema) avança o incidente de um estado para outro conforme o trabalho progride.

Entender o ciclo de vida não é apenas "saber os nomes dos estados". É entender o que acontece em cada fase, quem é responsável pelo quê, e como o ServiceNow automatiza essas transições.

---

## Por que o ciclo de vida é importante

- **Rastreabilidade:** a qualquer momento, um gestor sabe quantos incidentes estão abertos, em andamento ou resolvidos
- **Responsabilidade clara:** cada estado está associado a ações específicas e a um responsável
- **Eficiência:** incidentes não ficam "perdidos" no sistema — estados como "New" sinalizam que algo ainda precisa ser atendido
- **Automação:** o ServiceNow dispara ações automáticas em cada mudança de estado (ex: notificar o usuário ao resolver)

---

## Os 5 estados principais

### Estado 1 — New (Novo)

**O que significa:** o incidente acabou de ser criado, está na fila aguardando alguém assumir.

**Quando é usado:** usuário abre um chamado pelo portal, atendente cria manualmente, ou sistema de monitoramento gera automaticamente.

**O que o técnico deve fazer:** verificar se pertence ao seu grupo, se não é duplicado, e avançar para In Progress ou reatribuir.

**Tempo típico:** minutos (idealmente segundos). Quanto menos tempo em "New", mais rápido o usuário é atendido.

---

### Estado 2 — In Progress (Em Andamento)

**O que significa:** um técnico assumiu a responsabilidade e está trabalhando ativamente na resolução.

**Quando é usado:** o técnico clica em "Assign to me" ou altera manualmente o estado.

**O que o técnico deve fazer:** investigar o problema, coletar informações, aplicar workaround se possível, e documentar os passos nos Work Notes.

> **Dica:** Work Notes são visíveis apenas para a equipe técnica. Additional Comments chegam ao usuário final. Use cada um no momento certo.

**Tempo típico:** varia de minutos a horas conforme a complexidade.

---

### Estado 3 — Resolved (Resolvido)

**O que significa:** o técnico aplicou uma solução e acredita que o serviço voltou a funcionar. Aguarda confirmação do usuário.

**Quando é usado:** o técnico clica em "Resolve" ou altera o estado para Resolved.

**Campos obrigatórios:** `Resolution code` e `Resolution notes`.

**O que o usuário deve fazer:** testar se o serviço voltou. Se sim, fechar. Se não, reativar o incidente.

**Tempo típico:** 1 a 3 dias úteis. Muitas empresas configuram fechamento automático após 48h sem retorno.

> **Importante:** Resolved não significa Closed. O incidente ainda está "vivo" aguardando validação.

---

### Estado 4 — Closed (Fechado)

**O que significa:** incidente definitivamente encerrado. Usuário confirmou a resolução ou o sistema fechou automaticamente.

**O que acontece:** nenhuma alteração é permitida normalmente. O registro alimenta relatórios e histórico.

**Tempo:** permanente. Incidentes fechados são arquivados para auditoria.

---

### Estado 5 — Canceled (Cancelado)

**O que significa:** o incidente foi cancelado — não era válido, era duplicado, ou foi aberto por engano.

**O que o técnico deve fazer:** documentar o motivo do cancelamento no campo Close notes.

> Incidentes cancelados não devem ser contabilizados como "resolvidos" em relatórios de performance.

---

## Estados adicionais (conheça, mas não é prioridade agora)

| Estado                 | Quando usar                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| **Awaiting User Info** | Técnico pediu mais informações e aguarda resposta. SLA pode pausar. |
| **Awaiting Approval**  | Incidente precisa de aprovação antes de prosseguir.                 |
| **Awaiting Change**    | Solução depende de uma mudança ainda não implementada.              |
| **On Hold**            | Pausa genérica por qualquer motivo. SLA também pausa.               |

---

## Fluxos de transição

**Incidente bem-sucedido:**

```
New → In Progress → Resolved → Closed
```

**Incidente que precisa de mais informações:**

```
New → In Progress → Awaiting User Info → In Progress → Resolved → Closed
```

**Incidente cancelado:**

```
New → Canceled
```

**Incidente reaberto (usuário diz que ainda não funciona):**

```
Resolved → In Progress → Resolved → Closed
```

---

## O que o técnico faz em cada estado

### No estado New:

- Verifica se o incidente pertence ao seu grupo
- Verifica se não é duplicado
- Confirma se a prioridade está correta
- Move para In Progress ou reatribui

### No estado In Progress:

- Investiga a causa
- Consulta a Knowledge Base
- Coleta logs e evidências
- Aplica workaround se disponível
- Documenta os passos nos comentários

### No estado Resolved:

- Documenta a solução nos campos de resolução
- Notifica o usuário
- Aguarda validação
- Se usuário confirmar → Closed
- Se usuário reclamar → de volta para In Progress

### No estado Closed:

- Nenhuma ação necessária
- Registro vai para a base histórica e alimenta métricas como MTTR

---

## Como o ServiceNow automatiza o ciclo de vida

- **Atribuição automática:** o sistema atribui ao grupo correto baseado no conteúdo da descrição
- **Notificações automáticas:** e-mail ao usuário quando o estado muda (ex: New → In Progress)
- **Escalonamento automático:** se o incidente fica muito tempo no mesmo estado, reatribui para nível superior
- **Fechamento automático:** após X dias em Resolved sem retorno, move para Closed

---

## SLAs e estados

- **SLA de resposta:** tempo desde New até In Progress (ex: 15 min para críticos)
- **SLA de resolução:** tempo desde New até Resolved (ex: 4h para críticos, 2 dias úteis para normais)
- **SLA pausado:** em estados como Awaiting User Info, o relógio pode pausar — o tempo do usuário não conta contra o técnico

---

## Exemplo prático — INC0010023 do início ao fim

- **9h00** — João não consegue acessar o e-mail. Incidente criado: estado = **New**
- **9h02** — Sistema atribui ao grupo "Suporte E-mail". Estado continua **New**
- **9h03** — Maria assume: clica em "Assign to me". Estado → **In Progress**. SLA de resposta cumprido em 3 min (meta: 15 min)
- **9h05** — Maria identifica alta utilização de CPU no servidor. Reinicia o serviço. E-mail volta a funcionar. Documenta nos Work Notes
- **9h15** — Estado → **Resolved**. Resolution notes: "Serviço de e-mail reiniciado. Monitoramento em andamento"
- **9h20** — Sistema envia e-mail para João pedindo confirmação
- **14h00** — João confirma no portal. Estado → **Closed**

Ciclo completo em 5 horas.

---

## Erros comuns

| Erro                             | Correção                                                                            |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| Esquecer de atualizar o estado   | Crie o hábito de atualizar o estado ao concluir cada fase                           |
| Fechar o incidente sem resolver  | Resolva primeiro, feche depois. Se não pode resolver, reatribua                     |
| Não documentar a resolução       | Sempre preencha Resolution notes com clareza — é um favor para você mesmo no futuro |
| Ignorar incidentes no estado New | Gestores devem criar relatórios de incidentes "órfãos" regularmente                 |

---

## O que estudar depois

- **Semana 3:** Automação de estados via Business Rules (ex: ao mudar para Resolved, enviar e-mail)
- **Semana 5:** Flow Designer para transições complexas e SLAs
- **Semana 6:** Relatórios baseados em estados e métricas

---

## Exemplo de código (para consulta futura — Semana 3)

Script que busca incidentes abandonados no estado New há mais de 2 horas e os reatribui:

```javascript
var grInc = new GlideRecord("incident");
grInc.addQuery("state", 1); // 1 = New
grInc.addQuery("sys_created_on", "<=", gs.daysAgoStart(0, 2)); // mais de 2 horas
grInc.query();

gs.info("Incidentes abandonados em New: " + grInc.getRowCount());

while (grInc.next()) {
  grInc.work_notes =
    "Este incidente está no estado New há mais de 2 horas. Será reatribuído para o gestor da fila.";
  grInc.assignment_group = "sys_id_do_grupo_gestao";
  grInc.update();

  gs.info("Incidente " + grInc.number + " foi reatribuído");
}
```

---

## Resumo para guardar

| Estado          | Significado                                    |
| --------------- | ---------------------------------------------- |
| **New**         | Incidente criado, aguarda atendimento          |
| **In Progress** | Técnico assumiu e está trabalhando             |
| **Resolved**    | Solução aplicada, aguarda validação do usuário |
| **Closed**      | Incidente encerrado definitivamente            |
| **Canceled**    | Incidente inválido ou duplicado                |

O ciclo de vida não é só teoria. É o coração do gerenciamento de incidentes. Um incidente mal gerenciado (estado errado, transição errada) gera métricas erradas, SLAs quebrados e usuários insatisfeitos.
