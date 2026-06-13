# Fluxos de Trabalho e Flow Designer no ServiceNow

## Introdução

No ServiceNow, muitas solicitações não terminam quando o usuário envia um formulário. Depois do envio, normalmente existe um processo interno com aprovações, criação de tarefas, atualizações de registros, notificações e encerramento.

Esse processo é chamado de **fluxo de trabalho**.

Dentro da plataforma, o principal recurso moderno para construir esse tipo de automação é o **Flow Designer**. A documentação oficial descreve o Flow Designer como um recurso de automação de processos que permite criar fluxos de várias etapas a partir de componentes reutilizáveis, sem necessidade de programar tudo manualmente.

---

## O que são fluxos de trabalho

Um **fluxo de trabalho** representa a sequência de etapas que um processo deve seguir dentro da plataforma.

Exemplos:

- aprovar uma solicitação;
- criar tarefa para uma equipe;
- atualizar um registro;
- enviar notificação;
- encerrar o atendimento.

Na prática, o fluxo de trabalho define **o que acontece depois que um evento ocorre**.

Exemplo:

- usuário solicita reparo de computador;
- o sistema pede aprovação do gestor;
- se aprovado, cria tarefa para a TI;
- espera a tarefa ser concluída;
- atualiza o ativo;
- encerra a solicitação.

---

## Workflow clássico vs Flow Designer

Historicamente, o ServiceNow utilizava bastante o recurso chamado **Workflow** clássico.

Hoje, o foco da plataforma está no **Flow Designer**, que é a ferramenta moderna para automação low-code. A documentação oficial destaca o Flow Designer como um ambiente consolidado para automação de processos, com ações reutilizáveis e construção visual de fluxos.

De forma simples:

| Recurso           | Característica                        |
| ----------------- | ------------------------------------- |
| Workflow clássico | Modelo mais antigo de automação       |
| Flow Designer     | Modelo moderno, visual e reutilizável |

Para meus estudos e para projetos de portfólio, faz mais sentido priorizar o **Flow Designer**.

---

## O que é o Flow Designer

O **Flow Designer** é a ferramenta do ServiceNow usada para automatizar processos de forma visual.

Ele permite construir automações com etapas como:

- aprovações;
- criação de tarefas;
- atualização de registros;
- notificações;
- consultas em tabelas;
- espera por condições;
- chamadas de subflows e actions.

Em vez de escrever toda a lógica em script, o administrador ou desenvolvedor monta o fluxo usando blocos reutilizáveis.

---

## Principais componentes do Flow Designer

Os componentes mais importantes para entender o Flow Designer são:

- Flow;
- Subflow;
- Action;
- Trigger;
- Flow Logic;
- Data Pills.

Quando esses conceitos ficam claros, o desenho de automações fica muito mais simples.

---

## Flow

Um **Flow** é a automação principal.

Ele tem um início definido por um **trigger** e executa uma sequência de etapas.

Exemplo:

- quando um Requested Item é criado;
- pedir aprovação;
- criar Catalog Task;
- esperar conclusão;
- atualizar registro;
- encerrar solicitação.

O Flow é, portanto, o processo completo.

---

## Subflow

Um **Subflow** é um bloco reutilizável de lógica que pode ser chamado dentro de um Flow ou de outros pontos da plataforma. A comunidade ServiceNow destaca que subflows são úteis para quebrar fluxos longos em partes menores e reutilizáveis, recebendo entradas e retornando saídas.

Exemplo:

Um fluxo principal de reparo pode chamar um subflow chamado:

- `Atualizar ciclo de vida do ativo`

Ou outro chamado:

- `Notificar usuário sobre conclusão`

Isso ajuda a evitar repetição e deixa o fluxo principal mais limpo.

---

## Action

Uma **Action** é uma etapa executável dentro do Flow Designer.

Cada action realiza uma tarefa específica.

Exemplos comuns:

- `Ask for Approval`;
- `Create Record`;
- `Update Record`;
- `Create Catalog Task`;
- `Look Up Record`;
- `Send Notification`;
- `Wait for Condition`.

As actions são os blocos operacionais do fluxo.

---

## Trigger

O **Trigger** define quando o Flow deve começar.

Sem trigger, o flow não sabe quando executar.

Exemplos de trigger:

- criação de registro;
- atualização de registro;
- evento da aplicação;
- agendamento;
- trigger de Service Catalog. [web:90][web:87]

No caso de catálogo, o trigger costuma estar associado ao **Catalog Item**, e o flow inicia quando a solicitação é enviada e o RITM é criado. [web:64][web:66]

---

## Flow Logic

A **Flow Logic** é a parte do fluxo que controla decisões e caminhos alternativos.

Ela permite criar estruturas como:

- IF;
- ELSE;
- AND;
- OR;
- For Each;
- ramificações condicionais.

Exemplo:

- se aprovado → criar tarefa;
- se rejeitado → encerrar solicitação.

A lógica é o que permite que o flow não seja apenas linear, mas adaptável às condições do processo.

---

## Data Pills

As **Data Pills** são os dados disponíveis dentro do Flow Designer para alimentar outras etapas do fluxo. A documentação oficial explica que, cada vez que uma action é adicionada, o Workflow Studio cria data pills para armazenar seus resultados, que podem ser usados como entrada em outros flows, actions ou subflows.

Em termos simples, elas são as “pílulas azuis” usadas para passar dados entre os passos do fluxo.

Exemplos:

- Trigger → Requested Item → Number;
- Trigger → Requested Item → Requested for;
- Ask for Approval → Approval State;
- Create Catalog Task → Task → Sys ID.

As data pills são essenciais porque mostram como os dados circulam dentro da automação.

---

## Como os dados passam no fluxo

No Flow Designer, cada etapa pode produzir um resultado.

Esse resultado fica disponível como data pill para as etapas seguintes.

Exemplo prático:

1. o trigger gera o registro do RITM;
2. a action de aprovação devolve o `Approval State`;
3. a action de criação de task devolve a task criada;
4. a action de update usa esses dados para atualizar outros registros.

Esse encadeamento é um dos conceitos mais importantes do Flow Designer.

---

## Teste do fluxo

Antes de ativar um flow, é importante testá-lo.

A documentação oficial e os materiais de introdução ao Flow Designer destacam a importância de validar se o fluxo produz os resultados esperados e de inspecionar os detalhes de execução durante os testes.

No teste, o ideal é verificar:

- se o trigger dispara corretamente;
- se as actions executam na ordem esperada;
- se as data pills estão trazendo os valores corretos;
- se o fluxo segue o caminho certo em aprovações e rejeições;
- se os registros realmente são criados ou atualizados.

Testar evita ativar fluxos com erro lógico ou com dados mal mapeados.

---

## Ativação do fluxo

Depois de testar, o flow precisa ser **ativado**.

A documentação oficial deixa claro que apenas flows ativados executam quando suas condições de trigger são atendidas. Um flow em estado de draft ou inactive não será executado automaticamente.

Em termos práticos:

- **Draft** = flow ainda em construção;
- **Active** = flow disponível para execução.

Por isso, criar o flow não é suficiente. É necessário testar, revisar e ativar.

---

## Exemplo mental de fluxo

Um exemplo simples de fluxo de catálogo pode ser pensado assim:

```text
Usuário envia solicitação
        ↓
Trigger do Catalog Item
        ↓
Ask for Approval
        ↓
Aprovado?
├── Sim
│   ↓
│ Create Catalog Task
│   ↓
│ Wait for Condition
│   ↓
│ Update Record
│   ↓
│ Send Notification
│
└── Não
    ↓
    Update Record
    ↓
    Send Notification
```

Esse modelo ajuda a visualizar como os componentes do Flow Designer se conectam.

---

## Boas práticas

### Começar simples

Antes de criar um fluxo complexo, é melhor montar um fluxo pequeno e funcional.

Exemplo:

- trigger;
- aprovação;
- IF;
- update record.

Depois disso, adicionar tarefas, notificações e subflows.

### Usar Subflows quando o fluxo crescer

Se o flow ficar longo demais, quebrar partes reutilizáveis em subflows ajuda na manutenção.

### Nomear bem

Exemplos:

- `PRC04 - Solicitação de Reparo`
- `Subflow - Atualizar Lifecycle do Ativo`
- `Action - Definir Grupo de Atendimento`

Uma boa nomeação facilita leitura e manutenção.

### Testar antes de ativar

Nunca ativar um fluxo relevante sem validar o comportamento esperado.

### Entender as Data Pills

Muitos erros no Flow Designer acontecem não por falta de action, mas por uso incorreto das data pills.

---

## Aplicação prática no PRC-04

No projeto de solicitação de reparo, o Flow Designer é a ferramenta que vai transformar a solicitação do catálogo em um processo automatizado.

Exemplo de estrutura:

1. Trigger do Catalog Item;
2. Ask for Approval;
3. IF aprovado ou rejeitado;
4. Create Catalog Task para TI;
5. Wait for Condition até conclusão;
6. Update Record no ativo;
7. Update Record no RITM;
8. Send Notification.

Esse é um exemplo clássico de fluxo de trabalho moderno dentro do ServiceNow.

---

## Conclusão

Os **fluxos de trabalho** representam a lógica que move os processos dentro do ServiceNow depois que uma solicitação ou evento ocorre.

Dentro da plataforma, o **Flow Designer** é a principal ferramenta para construir essas automações de forma visual, reutilizável e escalável.

Compreender os conceitos de **Flow**, **Subflow**, **Action**, **Trigger**, **Flow Logic**, **Data Pills**, **teste** e **ativação** é fundamental para construir automações consistentes.

Mais importante do que decorar nomes de actions é entender como os dados entram no fluxo, como as decisões são tomadas e como cada etapa contribui para levar a solicitação do início ao encerramento.
