# Notification Framework no ServiceNow

## Introdução

No ServiceNow, muitos processos não terminam apenas quando um registro é criado ou atualizado. Depois disso, normalmente o sistema precisa comunicar o usuário, a equipe responsável ou outros envolvidos sobre o que aconteceu.

Essa comunicação é feita por meio do **Notification Framework**.

Dentro da plataforma, esse framework organiza como as notificações são criadas, como o conteúdo é reaproveitado e como os eventos do sistema podem disparar mensagens automáticas. A documentação oficial do ServiceNow descreve notifications como recursos para alertar usuários sobre eventos importantes da aplicação e explica que email templates permitem criar conteúdo reutilizável para assunto e corpo das mensagens.

## O que é o Notification Framework

O **Notification Framework** é o conjunto de recursos usado para controlar como o ServiceNow envia mensagens automáticas.

Ele ajuda a responder perguntas como:

- quando uma mensagem deve ser enviada;
- quem deve recebê-la;
- qual conteúdo será enviado;
- se o disparo será direto ou baseado em evento.

Na prática, o framework evita que a comunicação fique espalhada e duplicada em vários pontos da solução. A documentação oficial mostra que notificações podem ser baseadas em atualização de tabela ou em evento, e que eventos registrados podem ser usados para automatizar notificações e outras atividades.

---

## Email Notifications

As **Email Notifications** são as notificações de email configuradas dentro da plataforma.

Elas definem:

- quando o email será enviado;
- quem vai receber;
- qual será o assunto;
- qual conteúdo será entregue.

A documentação do ServiceNow explica que notificações podem ser configuradas para alertar usuários sobre eventos importantes da aplicação e que esse disparo pode acontecer por condições em tabelas ou por eventos específicos.

Exemplos de uso:

- avisar abertura de solicitação;
- informar aprovação ou rejeição;
- comunicar conclusão de tarefa;
- notificar alteração de estado em um registro.

No contexto da sprint, esse é o recurso principal para a comunicação automática por email.

---

## Email Templates

Os **Email Templates** permitem criar conteúdo reutilizável para o assunto e para o corpo das notificações.

A documentação oficial informa que email templates permitem aos administradores criar conteúdo reutilizável para o subject line e para o message body das email notifications.

Na prática, isso traz vantagens como:

- manter padronização entre mensagens;
- reduzir repetição de texto;
- facilitar manutenção;
- acelerar criação de novas notificações.

Depois de criar um template, ele pode ser aplicado a uma notificação no campo apropriado do formulário. A própria documentação do ServiceNow descreve o procedimento de abrir a email notification, ir até a seção de conteúdo e selecionar o template desejado no campo **Email template**.

---

## Notification Management

**Notification Management** é a parte de organização, manutenção e governança das notificações.

Não basta apenas criar emails. Em ambientes reais, é preciso administrar o conjunto de notificações para evitar excesso de mensagens, duplicidade de conteúdo e confusão entre regras de disparo. A documentação do ServiceNow trata notifications como parte da forma como a aplicação se comunica com os usuários e recomenda escolher entre notificações diretas e notificações baseadas em eventos conforme a complexidade do cenário.

Na prática, o gerenciamento de notificações envolve:

- revisar notificações ativas;
- padronizar nomes;
- controlar destinatários;
- reutilizar templates;
- decidir quando usar evento;
- validar logs e comportamento de envio.

Em Flow Designer, também é possível acionar notificações por meio da action **Send Notification**, que usa um registro de notification previamente configurado. A documentação descreve essa action como um meio de enviar email notification para destinatários e conteúdo predefinidos usando um registro `sysevent_email_action`.

---

## Event-driven Notifications

As **Event-driven Notifications** são notificações disparadas por eventos registrados no sistema.

O ServiceNow explica que o **Event Registry** lista os eventos reconhecidos pela plataforma e que esses eventos podem ser usados para automatizar atividades como notificações e script actions.

Isso significa que, em vez de colocar toda a lógica de envio diretamente dentro de um flow ou business rule, a solução pode funcionar assim:

1. um evento é registrado no Event Registry;
2. o flow, workflow, script ou business rule dispara esse evento;
3. a notification fica configurada para responder a esse evento;
4. o email é enviado quando o evento acontece.

A própria documentação do ServiceNow recomenda uso de notificações baseadas em evento em cenários mais complexos, especialmente quando os requisitos de disparo não são simples de implementar apenas com condições da notification ou quando o disparo vem de workflow.

---

## Notifications diretas vs notificações por evento

Uma distinção importante no PRC-05 é entender que nem toda notificação precisa seguir o mesmo modelo.

De forma simples:

| Tipo                   | Característica                                                    |
| ---------------------- | ----------------------------------------------------------------- |
| Notificação direta     | Pode ser acionada por condição simples ou por action de flow.     |
| Notificação por evento | Usa Event Registry e responde a um evento disparado pelo sistema. |

A documentação oficial indica que, para casos simples, pode-se usar a action **Send an email** no Flow Designer, enquanto para notificações complexas ou críticas é melhor disparar um evento e configurar uma notification para responder a ele.

---

## Como os componentes se conectam

Os temas da sprint PRC-05 se conectam entre si:

- **Email Notifications** fazem o envio da mensagem;
- **Email Templates** padronizam o conteúdo;
- **Notification Management** organiza e mantém a estrutura;
- **Event-driven Notifications** desacoplam o disparo da mensagem da lógica do processo.

Quando esses componentes são entendidos em conjunto, fica mais fácil enxergar a comunicação automática como parte da arquitetura da aplicação e não apenas como um email isolado.

---

## Exemplo mental do processo

Um exemplo simples de uso do Notification Framework pode ser pensado assim:

```text
Usuário envia solicitação
        ↓
Registro é criado
        ↓
Flow ou regra identifica o evento
        ↓
Evento é disparado
        ↓
Notification escuta o evento
        ↓
Email Template define o conteúdo
        ↓
Email Notification envia a mensagem
```

Esse modelo ajuda a entender que o evento, a notificação e o template têm funções diferentes, mas trabalham juntos.

---

## Boas práticas

### Usar templates para mensagens repetidas

Se várias notificações usam mensagens parecidas, é melhor centralizar o conteúdo em um template. A documentação oficial afirma que email templates existem justamente para criar conteúdo reutilizável para assunto e corpo das notificações.

### Preferir eventos em cenários complexos

Quando a lógica de disparo fica mais avançada, notificações baseadas em evento costumam ser uma abordagem melhor. O ServiceNow recomenda esse modelo quando os requisitos não são fáceis de implementar apenas nas condições da notification ou quando o disparo vem de workflow.

### Nomear bem notificações e eventos

Exemplos:

- `PRC05 - Solicitação Aberta`
- `PRC05 - Aprovação Rejeitada`
- `prc05.request.created`
- `prc05.request.closed`

Uma boa nomeação facilita manutenção e troubleshooting.

### Revisar o destino das mensagens

Nem toda atualização precisa gerar email. Parte do Notification Management é garantir que apenas mensagens realmente úteis sejam enviadas.

### Validar logs

## A análise de logs ajuda a confirmar se a notificação foi criada e enviada corretamente. O ServiceNow mantém registros de email no system email log, o que ajuda na validação e no troubleshooting.

## Aplicação prática no PRC-05

No PRC-05, o Notification Framework pode ser aplicado para mostrar como o ServiceNow comunica informações automaticamente dentro de um processo.

Exemplo de estrutura:

1. criar uma email notification;
2. criar um email template para o conteúdo;
3. registrar um evento no Event Registry;
4. disparar esse evento por flow, workflow ou regra;
5. fazer a notification responder ao evento;
6. validar o envio no log.

Esse é um exemplo claro de comunicação automatizada, reutilizável e organizada dentro da plataforma.

---

## Conclusão

O **Notification Framework** representa a base da comunicação automática no ServiceNow.

Ele reúne **Email Notifications**, **Email Templates**, **Notification Management** e **Event-driven Notifications** em uma estrutura que permite comunicar eventos importantes de forma consistente, reutilizável e administrável. A documentação oficial mostra que notifications podem ser disparadas por condições ou eventos, que templates reaproveitam conteúdo e que o Event Registry permite automatizar notificações e outras ações do sistema.

Para a sprint PRC-05, compreender esses quatro pilares é suficiente para construir uma visão sólida sobre como a plataforma envia mensagens e como essa comunicação pode ser organizada de forma mais profissional.
