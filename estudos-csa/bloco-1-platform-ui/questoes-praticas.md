# Questões de Treino — Bloco 1: The ServiceNow Platform & UI

[← Voltar ao checklist do bloco](README.md) · [Sobre o banco de questões](../README.md#banco-de-questões-de-treino)

Pratique aqui depois de revisar o checklist deste bloco. Marque a alternativa que você acha correta antes de abrir "Ver resposta e explicação".

---

## Questões

### Q1 — Grupos e acesso de um novo usuário

A new employee joins the IT department and needs to perform work assigned to Network and Hardware groups. How would you set up their access? _(Choose three)_

- [ ] Create User Account
- [ ] Add User Account to Network group
- [ ] Add User Account to Hardware group
- [ ] Add User Account to IT Knowledgebase
- [ ] Add User Account to itil group
- [ ] Add User Account to ACL

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Create User Account** — sem conta de usuário não há como conceder qualquer acesso.
✅ **Add User Account to Network group** — dá acesso às tarefas atribuídas ao grupo Network.
✅ **Add User Account to Hardware group** — dá acesso às tarefas atribuídas ao grupo Hardware.
❌ Add User Account to IT Knowledgebase — Knowledge Base é para documentação/consulta, não concede acesso a trabalho de grupo.
❌ Add User Account to itil group — a role `itil` está ligada a processos gerais de ITSM, não aos grupos técnicos específicos.
❌ Add User Account to ACL — ACLs definem regras de segurança; usuário não é "adicionado" a uma ACL.

</details>

---

### Q2 — Reordenar colunas de uma lista

The customer has asked that you change the default layout of the Task list. They would like these columns, in this order: Number, Task Type, Parent, Short Description, Assignment Group, Assignee, Updated. After navigating to the list, where would you click to meet this requirement?

- [ ] Click List Context Menu > Personalize List
- [ ] Click List Context Menu > Configure > Columns
- [ ] Right click List Gear icon > Configure > Columns
- [ ] Right click on any column header, Context Menu > Configure > List Layout

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Right click on any column header → Context Menu → Configure → List Layout** — único caminho que permite reordenar as colunas do layout padrão da lista.
❌ List Context Menu > Personalize List — personaliza a visualização por usuário, não reordena o layout padrão.
❌ List Context Menu > Configure > Columns — controla visibilidade das colunas, não a ordem delas.
❌ List Gear icon > Configure > Columns — mesma limitação: mexe em quais colunas aparecem, não na ordem.

</details>

---

### Q3 — Virtual Agent x Instance Chat ⚠️ questão incompleta

O texto colado para esta questão veio cortado — faltaram o enunciado completo e as demais alternativas. Pelo fragmento que sobrou, dá pra recuperar o essencial:

> "[Virtual Agent] does not specifically focus on providing knowledge articles via a conversational messaging interface" — comparando com **Instance Chat**, que só permite troca de mensagens instantâneas entre usuários dentro da instância.

**O que ficou claro:** a resposta certa provavelmente é **Virtual Agent** (entrega artigos de conhecimento e completa tarefas via interface conversacional), com **Instance Chat** como alternativa errada (é só chat interno entre usuários, sem esse foco em knowledge/tarefas).

> Recole esta questão completa (enunciado + todas as alternativas) quando encontrar de novo, para eu formatar direito.

---

### Q4 — Acessar templates de formulário

On the Form header, which element do you use to access form templates?

- [ ] Stamp
- [ ] More Options (...)
- [ ] Pages
- [ ] Paperclip

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **More Options (...)** — abre o menu que inclui a opção de aplicar Form Templates.
❌ Stamp — indica aprovação/carimbo, não acessa templates.
❌ Pages — refere-se a seções/abas do formulário, não a templates.
❌ Paperclip — indica anexos do registro, não templates.

</details>

---

### Q5 — Definição de group

What is the definition of a group?

- [ ] A collection of subject matter experts
- [ ] A department
- [ ] An escalation pod
- [ ] A collection of users
- [ ] A collection of tasks

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **A collection of users** — grupos reúnem usuários para gerenciar acesso, atribuição de tarefas e comunicação.
❌ A collection of subject matter experts — SMEs podem estar num grupo, mas isso não é a definição do conceito.
❌ A department — departamento é estrutura organizacional; group é um conceito diferente na plataforma.
❌ An escalation pod — usado para escalonamento de incidentes, não é a definição de group.
❌ A collection of tasks — tarefas são atribuídas a grupos, mas o grupo em si não é "uma coleção de tarefas".

</details>

---

### Q6 — Editar o nome de um Favorite

What icon do you use to change the label on a Favorite?

- [ ] Star
- [ ] Clock
- [ ] Triangle
- [ ] Pencil

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Pencil** — ícone padrão de edição; é o que renomeia o favorito.
❌ Star — marca um item como favorito, não edita o nome.
❌ Clock — associado a histórico/tempo, não a edição.
❌ Triangle — indica alerta/atenção, não edição.

</details>

---

### Q7 — Onde ver as atualizações mais recentes de um registro

What section on a task record is used to see the most recent updates made to a record?

- [ ] Timeline
- [ ] Related List
- [ ] Activity Stream
- [ ] Audit Log

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Activity Stream** — feed em tempo real com as atualizações, comentários e interações mais recentes do registro.
❌ Timeline — mostra eventos em ordem cronológica, mas não é o local padrão para ver as atualizações mais recentes.
❌ Related List — mostra registros vinculados de outras tabelas, não o histórico de updates do próprio registro.
❌ Audit Log — guarda histórico detalhado de mudanças, mas não é o mais rápido/direto para ver "o que mudou recentemente".

</details>

---
