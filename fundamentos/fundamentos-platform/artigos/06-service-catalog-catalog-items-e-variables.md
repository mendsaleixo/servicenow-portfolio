# Service Catalog, Catalog Items e Variables no ServiceNow

## Introdução

O **Service Catalog** é um dos componentes mais importantes do ServiceNow, pois permite que usuários solicitem serviços, equipamentos, acessos e processos corporativos por meio de formulários padronizados. A documentação oficial descreve o catálogo como uma aplicação voltada a self-service, com itens que podem ser solicitados em portais e com fulfillment padronizado para garantir consistência e disponibilidade. [web:18]

Dentro desse contexto, os **Catalog Items** representam os itens disponíveis para solicitação pelos usuários. Já as **Variables** definem os campos que coletam as informações necessárias para que a solicitação seja compreendida, aprovada e executada corretamente. [web:30][web:21]

Exemplos comuns de uso:

- solicitação de notebook;
- acesso VPN;
- criação de usuário;
- reparo de computador;
- solicitação de software;
- onboarding de funcionário. [web:18]

---

## O que é o Service Catalog

O **Service Catalog** é a área do ServiceNow onde a organização publica serviços e produtos que podem ser solicitados em formato de autoatendimento. A plataforma permite criar catálogos customizáveis e padronizar o fulfillment das solicitações, o que transforma pedidos dispersos em processos estruturados. [web:18][web:16]

Na prática, ele funciona como uma vitrine corporativa de serviços internos. Em vez de o usuário abrir um chamado genérico, ele seleciona um item específico, preenche os dados exigidos e inicia um processo com regras, aprovações, tarefas e notificações. [web:18]

---

## O que é um Catalog Item

Um **Catalog Item** é um formulário de solicitação disponibilizado no Service Catalog. Ele representa uma necessidade específica do usuário e funciona como o container principal que reúne os elementos usados para coletar dados e automatizar o atendimento. [web:18][web:21]

Exemplos de Catalog Items:

- Solicitação de Mouse;
- Solicitação de Notebook;
- Solicitação de Acesso VPN;
- Reparo de Equipamento;
- Solicitação de Software. [web:18]

Um Catalog Item pode agrupar:

- variables;
- variable sets;
- UI Policies;
- Catalog Client Scripts;
- Flow Designer;
- approvações;
- notifications;
- tarefas automáticas. [web:21][web:18]

Seu principal objetivo é padronizar a entrada da solicitação e preparar o processo para execução e automação.

---

## Estrutura de um Catalog Item

| Componente             | Função                             |
| ---------------------- | ---------------------------------- |
| Catalog Item           | Container principal da solicitação |
| Variables              | Campos preenchidos pelo usuário    |
| Variable Sets          | Grupo reutilizável de variables    |
| UI Policies            | Comportamento visual do formulário |
| Catalog Client Scripts | Comportamento lógico client-side   |
| Flow Designer          | Automação backend                  |
| Approvals              | Fluxos de aprovação                |
| Notifications          | Comunicação automática             |

Essa estrutura mostra que o Catalog Item não é apenas um formulário. Ele é o ponto de entrada de um processo completo, que pode envolver coleta de dados, validações, decisão de negócio, execução operacional e encerramento. [web:18][web:30]

---

## Variables

As **Variables** representam os campos preenchidos pelo usuário no formulário do catálogo. Segundo a documentação oficial, elas capturam e repassam as informações sobre as escolhas feitas durante o pedido, ajudando a definir a estrutura do formulário exibido ao usuário. [web:30]

Exemplos de variables:

- nome;
- justificativa;
- urgência;
- equipamento;
- categoria do problema;
- descrição detalhada. [web:30]

As variables são importantes porque reduzem ambiguidades e fornecem contexto suficiente para o fulfillment. Elas também podem ser armazenadas, acessadas em diferentes pontos do processo e exibidas depois nos formulários de Requested Item e Catalog Task. [web:30]

---

## Principais propriedades de uma Variable

| Campo         | Função                                     |
| ------------- | ------------------------------------------ |
| Question      | Texto exibido ao usuário                   |
| Name          | Nome interno utilizado em scripts e lógica |
| Type          | Tipo do campo                              |
| Mandatory     | Define se o preenchimento é obrigatório    |
| Order         | Ordem de exibição no formulário            |
| Default Value | Valor padrão da variável                   |

Na criação de variables em um Catalog Item, a própria ServiceNow orienta que o administrador selecione o tipo, defina a pergunta, atribua um nome único e configure propriedades como obrigatoriedade e ordem de exibição. [web:21]

---

## Principais tipos de Variables

O Service Catalog oferece vários tipos de variables, também chamadas de questions. Entre os tipos mais usados estão campos de texto, seleção, referência e opções booleanas. [web:30][web:21]

| Tipo              | Uso                          |
| ----------------- | ---------------------------- |
| Single Line Text  | Texto simples                |
| Multi Line Text   | Texto longo                  |
| Select Box        | Lista de opções              |
| Multiple Choice   | Escolha entre alternativas   |
| Reference         | Referência para outra tabela |
| Yes/No            | Booleano                     |
| Checkbox          | Marcação                     |
| Date              | Data                         |
| Lookup Select Box | Busca dinâmica               |

Esses tipos permitem modelar formulários simples ou mais complexos, dependendo da natureza da solicitação. [web:30]

---

## Select Box

Variáveis do tipo **Select Box** permitem criar listas de opções para o usuário. A documentação da comunidade ServiceNow mostra que, após criar uma variável desse tipo, é possível cadastrar os valores em **Question Choices**, definindo texto, valor interno, ordem e até impacto em preço quando necessário. [web:21]

Exemplo:

**Campo:** Nível de urgência

- Baixa
- Média
- Alta
- Crítica

Esse tipo é muito utilizado para:

- categorização;
- priorização;
- classificação de solicitações. [web:21]

---

## Reference Variables

Variables do tipo **Reference** permitem selecionar registros de outras tabelas do ServiceNow. Isso é especialmente útil quando a solicitação precisa apontar para ativos, usuários, departamentos, configurações ou itens da CMDB. [web:30]

Exemplo:

**Tabela:** `cmdb_ci_computer`

Com isso, o usuário pode selecionar um computador já registrado na CMDB, em vez de digitar um nome manualmente.

### Reference Qualifier

O **Reference Qualifier** é utilizado para filtrar os registros exibidos em um campo Reference.

Exemplo:

```javascript
owned_by=javascript:gs.getUserID()
```

Objetivo: mostrar apenas os computadores vinculados ao usuário logado.

Esse recurso é importante porque melhora a usabilidade e reduz erros de seleção no catálogo.

---

## Variable Sets

**Variable Sets** representam grupos reutilizáveis de variables. Eles permitem criar um conjunto de campos uma vez e reutilizá-lo em vários Catalog Items, reduzindo retrabalho e aumentando padronização. [web:30]

Exemplo:

**Variable Set:** Endereço

Contendo:

- CEP;
- Rua;
- Bairro;
- Cidade;
- UF.

Em vez de recriar essas variables em vários catálogos, o Variable Set pode ser reutilizado.

### Vantagens dos Variable Sets

- reutilização;
- padronização;
- manutenção simplificada;
- redução de retrabalho;
- organização.

---

## Container Start e Container End

**Containers** controlam o layout visual das variables no formulário. Eles ajudam a organizar os campos na interface, mas não são a mesma coisa que Variable Sets.

Exemplo:

- Container Start → Endereço
- CEP
- Rua
- Cidade
- UF
- Container End

A diferença principal é simples:

| Conceito     | Objetivo                         |
| ------------ | -------------------------------- |
| Variable     | Campo individual                 |
| Variable Set | Grupo reutilizável de variables  |
| Container    | Organização visual do formulário |

---

## UI Policies

As **UI Policies** controlam o comportamento visual do formulário do catálogo. Elas são úteis quando a regra é simples e relacionada à interface, sem necessidade de script complexo.

Exemplos:

- esconder campos;
- tornar obrigatório;
- tornar somente leitura;
- exibir campos dinamicamente.

### Exemplo de UI Policy

**Regra**

Se:

- Urgência = Crítica

Então:

- Descrição detalhada = Mandatory

Esse tipo de regra melhora a experiência do usuário e ajuda a garantir qualidade dos dados antes do envio da solicitação.

---

## Catalog Client Scripts

**Catalog Client Scripts** adicionam comportamento lógico client-side ao formulário. Eles são usados quando a interface precisa reagir dinamicamente às escolhas do usuário ou exibir mensagens e validações mais específicas.

São utilizados para:

- validações;
- preenchimentos automáticos;
- mensagens;
- manipulação dinâmica do formulário.

### Exemplo de uso

```javascript
if (g_form.getValue("urgencia") == "critica") {
  g_form.showFieldMsg(
    "urgencia",
    "Descreva o problema detalhadamente.",
    "warning",
  );
}
```

Nesse cenário, o script orienta o usuário a fornecer mais detalhes quando a urgência for crítica.

---

## UI Policy vs Client Script

| Ferramenta    | Melhor uso                   |
| ------------- | ---------------------------- |
| UI Policy     | Comportamento visual simples |
| Client Script | Lógica dinâmica no cliente   |
| Flow Designer | Processos backend            |
| Business Rule | Validação server-side        |

Separar bem essas responsabilidades evita soluções confusas e difíceis de manter.

---

## O fluxo mental do Service Catalog

Uma forma prática de entender o Service Catalog é usar o seguinte modelo mental:

- **Catalog Item** = container principal;
- **Variables** = entradas do usuário;
- **Variable Set** = grupo reutilizável;
- **UI Policy** = comportamento visual;
- **Client Script** = comportamento lógico;
- **Flow** = backend e processo;
- **Approval** = decisão de negócio;
- **Task** = execução operacional.

Quando esse modelo mental é internalizado, torna-se muito mais fácil construir soluções completas no ServiceNow.

---

## O que acontece após o envio da solicitação

Quando o usuário envia um Catalog Item, o ServiceNow cria registros relacionados ao processo de request fulfillment. A estrutura mais importante para estudo é a seguinte: **REQ** para o pedido principal, **RITM** para o item solicitado e **SCTASK** para a tarefa operacional. [web:25][web:28]

A hierarquia pode ser pensada assim:

```text
Catalog Item
      ↓
REQ (Request)
      ↓
RITM (Requested Item)
      ↓
SCTASK (Catalog Task)
```

### Exemplo

**Solicitar Reparo de Computador** gera:

- `REQ0010001`
- dentro dele: `RITM0010001`
- e depois: `SCTASK0010001`

Na prática:

- **REQ** = pedido principal;
- **RITM** = item específico solicitado;
- **SCTASK** = trabalho executado pela equipe responsável. [web:25]

---

## RITM como centro do fluxo

Para muitos cenários de catálogo, especialmente quando há aprovação e execução operacional, o **RITM** é o melhor nível para centralizar o fluxo. Isso ocorre porque o Requested Item concentra o contexto da solicitação específica, enquanto o trabalho costuma seguir para Catalog Tasks associadas a ele. [web:25][web:28]

A própria ação **Create Catalog Task** do Flow Designer é descrita como responsável por criar um registro em `sc_task` associado a um registro de `sc_req_item`, o que reforça o papel do RITM como centro do processo. [web:28]

No contexto do seu projeto, isso ajuda a responder uma pergunta essencial: o flow tende a fazer mais sentido iniciando no **RITM** do que no **REQ**, porque a aprovação, a criação da task e o acompanhamento da execução acontecem em torno do item solicitado. [web:25][web:28]

---

## Onde ficam as variables

Existem dois níveis importantes para entender variables no Service Catalog:

- o nível de **definição**, onde as variables são configuradas no Catalog Item ou Variable Set;
- o nível de **instância/valor**, quando essas informações passam a existir para um pedido específico feito pelo usuário. [web:27]

A documentação oficial afirma que variables podem ser armazenadas, acessadas em diferentes pontos e passadas entre tasks durante o fulfillment de um request. Elas também podem ser exibidas depois nos formulários de Requested Item e Catalog Task. [web:30]

Isso é muito importante para automação, porque o Flow Designer pode usar essas informações como entrada para decisões, aprovações e criação de tarefas. [web:28][web:30]

---

## Boas práticas

### Nomeação consistente

Exemplos:

- `u_tipo_equipamento`
- `u_urgencia`
- `u_categoria_problema`

Uma boa convenção ajuda na manutenção e facilita scripts, flows e leitura do formulário.

### Utilizar Order corretamente

Sugestão:

- 100
- 200
- 300
- 400

Essa estratégia ajuda a reorganizar o formulário no futuro sem precisar renumerar tudo.

### Separar responsabilidades

| Necessidade        | Ferramenta           |
| ------------------ | -------------------- |
| Visual             | UI Policy            |
| Lógica client-side | Client Script        |
| Backend            | Flow / Business Rule |
| Reutilização       | Variable Set         |

### Coletar apenas o necessário

Um bom Catalog Item não deve pedir informações em excesso. As variables devem capturar o que é realmente necessário para aprovar, entender e executar a solicitação. [web:30]

---

## Aplicação prática no portfólio

Para um projeto como **Solicitação de Reparo de Equipamento**, o Service Catalog pode ser estruturado assim:

### Catalog Item

**Solicitar Reparo de Equipamento**

### Variables

- equipamento;
- número de patrimônio;
- descrição do problema;
- urgência;
- precisa de equipamento reserva?;
- justificativa.

### Automação esperada

- criação do REQ;
- criação do RITM;
- aprovação do gestor;
- criação de Catalog Task para a TI;
- atualização do ciclo de vida do ativo;
- encerramento automático ao final do processo. [web:25][web:28]

Esse exemplo conecta teoria e prática e já prepara o terreno para estudar Flow Designer, aprovação e Wait for Condition.

---

## Exercícios sugeridos

### Exercício 1 — Solicitação de Mouse

**Objetivo**

Treinar:

- Catalog Item;
- category;
- variables;
- mandatory;
- select box;
- submit.

**Criar**

**Catalog Item**

- Solicitação de Mouse

**Variables**

- tipo de mouse;
- sem fio?;
- urgência;
- justificativa.

**Tempo alvo**

- 20 minutos

---

### Exercício 2 — Solicitação de Acesso VPN

**Objetivo**

Treinar:

- UI Policy;
- hidden/show field;
- mandatory condicional.

**Regra**

Se:

- Acesso externo = Sim

Então:

- Justificativa = Mandatory

**Tempo alvo**

- 30 minutos

---

### Exercício 3 — Solicitação de Notebook

**Objetivo**

Replicar conceitos de catálogo com maior profundidade.

**Implementar**

- Catalog Item;
- Variable Set;
- Reference Variable;
- Reference Qualifier;
- Catalog Client Script simples.

**Regras sugeridas**

Mostrar apenas notebooks vinculados ao usuário logado.

**Tempo alvo**

- 45 minutos

---

## Conclusão

O **Service Catalog** é um dos principais pilares do ServiceNow para automação de serviços corporativos. Ele fornece uma estrutura de self-service padronizada, organiza a entrada de dados e prepara a solicitação para fulfillment com aprovações, tarefas e automações. [web:18][web:16]

Compreender **Catalog Items**, **Variables**, **Variable Sets**, **UI Policies**, **Catalog Client Scripts** e a hierarquia **REQ → RITM → SCTASK** é fundamental para construir soluções organizadas, reutilizáveis e escaláveis. Além disso, esse entendimento facilita muito o estudo do Flow Designer, porque deixa claro onde o processo começa, quais dados são coletados e como o trabalho operacional é executado. [web:25][web:28][web:30]

Mais importante do que decorar menus é internalizar o modelo mental do Service Catalog e a responsabilidade de cada componente dentro da arquitetura da solução.
