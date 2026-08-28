# Navegação: listas, filtros e formulários

**Data:** 22/04/2026
**Semana:** 1 — Fundamentos
**Fonte:** SNAF Módulo 3 + Prática própria
**Tópicos relacionados:** Incident Management, Form Configuration, List Views, Global Search, User Preferences, Plugins

---

## O que é (definição simples)

A navegação no ServiceNow é a forma como você se movimenta dentro da plataforma para encontrar, visualizar, criar e modificar registros.

Imagine que o ServiceNow é uma cidade enorme, cheia de prédios (módulos como Incidentes, Problemas, Mudanças). Dentro de cada prédio, há andares (tabelas) e salas (registros individuais). A navegação é o mapa, o elevador e as placas de sinalização que permitem você chegar onde precisa sem se perder.

Dominar a navegação não é apenas "saber onde clicar". É entender a estrutura lógica da plataforma.

---

## Os três elementos da navegação

**Listas:** visão de vários registros ao mesmo tempo. É como um supermercado — você vê todos os produtos nas prateleiras. Exemplo: a lista de incidentes mostra todos os chamados abertos, resolvidos e fechados.

**Filtros:** refinam o que você vê na lista. É como um filtro no supermercado para mostrar apenas "produtos sem glúten" ou "produtos em promoção". Exemplo: filtrar apenas incidentes críticos ainda não atribuídos.

**Formulários:** visão detalhada de um único registro. É como pegar um produto da prateleira e ler todas as informações na embalagem. Exemplo: ao clicar em um incidente específico, você vê todos os seus campos (descrição, prioridade, usuário, etc).

---

## O Filtro de Navegação

O Filtro de Navegação é a barra localizada no canto superior esquerdo, dentro de **All**. É o principal ponto de entrada para tudo na plataforma.

**Como funciona:** você digita o nome do que procura (ex: `incident`, `user`, `problem`) e o sistema sugere módulos, tabelas e relatórios relacionados. Não precisa digitar o nome completo — `inc` já mostra "Incidentes".

> **Dica de ouro:** Desenvolvedores experientes raramente usam os menus laterais — eles vivem no filtro de navegação. Treine usar ele para tudo.

### Favoritos

Ao lado do Filtro de Navegação existe um ícone de estrela. Salve os módulos e listas que você usa com frequência. Um bom conjunto de 5 a 10 favoritos corta o tempo de navegação pela metade.

**Como adicionar:** navegue até a lista ou formulário → clique na estrela no canto superior direito → dê um nome → salve.

### Busca Global

Diferente do Filtro de Navegação (que busca **módulos, tabelas e páginas**), a Busca Global pesquisa **dentro dos dados** — em registros de várias tabelas ao mesmo tempo. Fica no ícone de lupa (🔍) no cabeçalho superior.

**Como funciona:** digite um termo (ex: um número de telefone, nome de usuário ou parte de uma descrição) e o sistema retorna registros correspondentes, agrupados por tabela (Incidentes, Usuários, Problemas, etc).

> **Diferença que cai em prova:** Filtro de Navegação = "para onde eu vou" (módulos e tabelas). Busca Global = "o que eu encontro" (dados dentro dos registros).

### Histórico Recente

O sistema guarda automaticamente os últimos registros e módulos que você visitou, disponíveis no ícone de relógio (🕒) ao lado do Filtro de Navegação.

**Para que serve:** voltar rapidamente a um registro que você acabou de sair, sem precisar buscar de novo ou lembrar o número.

---

## Preferências do Usuário

Preferências são ajustes pessoais que cada usuário faz na própria experiência — sem alterar nada para os demais. É a diferença entre organizar sua própria mesa de trabalho e reformar o escritório inteiro (isso seria uma mudança de sistema, feita via configurações administrativas).

**Como acessar:** clique no ícone do seu perfil (canto superior direito) → **Preferences**.

**O que pode ser personalizado:**

| Preferência      | O que ajusta                                                     |
| ---------------- | ---------------------------------------------------------------- |
| Idioma           | Idioma da interface (requer plugin de tradução instalado)        |
| Fuso horário     | Datas e horários exibidos conforme seu local                     |
| Notificações     | Como e quando você recebe alertas (e-mail, dentro da plataforma) |
| Layout de listas | Registros por página, colunas padrão                             |
| Temas            | Aparência visual (claro/escuro, cores)                           |
| Atalhos          | Shortcuts pessoais salvos                                        |

> **Atenção:** Preferences afetam só o usuário logado. Não confunda com Branding ou System Properties, que são configurações administrativas e mudam a experiência de **toda a instância**.

---

## Plugins — Funcionalidades Opcionais da Instância

Plugins são pacotes de funcionalidade opcionais que podem ser ativados dentro de uma instância — aplicativos prontos, workspaces, integrações ou dados de demonstração. Pense neles como "módulos extras" que você liga quando precisa, em vez de desenvolver do zero.

**Exemplos comuns:** plugin de tradução (ex: I18N Brazilian Portuguese), Service Portal, IntegrationHub, dados de demonstração de ITSM.

**Como ativar:** **All Menu → System Definition → Plugins**, busque o plugin desejado e clique em **Install/Activate**.

> Ativar plugins é uma ação administrativa — normalmente exige a role `admin`. Avalie o impacto antes de ativar em uma instância de produção.

---

## Listas

Uma lista exibe vários registros de uma mesma tabela, cada registro em uma linha e cada campo em uma coluna.

**Ações comuns:**

- **Ordenar:** clique no cabeçalho de uma coluna para ordenar por aquele campo
- **Agrupar (Group by):** agrupe registros por um campo para somar ou segmentar resultados (ex: incidentes agrupados por Assignment group)
- **Redimensionar colunas:** arraste a borda do cabeçalho
- **Reorganizar colunas:** arraste o cabeçalho para uma nova posição
- **Mostrar/Esconder colunas:** clique no ícone de engrenagem (⚙️) no canto superior direito
- **Exportar:** clique no ícone de download para exportar para Excel, CSV ou PDF

Você pode criar **views** (visualizações) personalizadas da lista, salvando uma combinação específica de colunas, ordenação e filtros — útil para equipes com necessidades diferentes.

---

## Filtros

Filtros são condições que você aplica sobre uma lista para mostrar apenas os registros que atendem a certos critérios.

**Como aplicar:**

1. Na lista, clique no ícone de funil (🔽) para abrir o **Condition Builder** (barra de filtros)
2. Adicione uma condição — escolha campo, operador e valor
3. Clique em **Run** para aplicar

**Operadores comuns:**

| Operador              | Uso                              |
| --------------------- | -------------------------------- |
| é / não é             | Igualdade ou diferença exata     |
| contém / não contém   | Busca parcial em campos de texto |
| maior que / menor que | Números, datas e prioridades     |
| entre                 | Intervalo entre dois valores     |
| é vazio / não é vazio | Campos preenchidos ou não        |

### Breadcrumbs

A trilha de condições exibida no topo da lista, logo abaixo do cabeçalho, mostra os filtros aplicados no momento — cada pedaço da frase representa uma condição.

**Para que serve:** clique em qualquer parte da trilha para refinar ou remover aquela condição especificamente, sem precisar reabrir o Condition Builder inteiro.

### Exercício rápido (5 min)

Pratique montando seu próprio filtro em uma lista de incidentes:

1. Abra a lista de incidentes pelo Filtro de Navegação: `Incident > All`
2. Clique no ícone de funil (🔽) para abrir o Condition Builder
3. Monte a condição `Priority is 1 - Critical` e clique em **Run**
4. Confira a lista recortada e depois troque a condição para `Active is true`

> **Boas práticas:** combine condições com `AND`/`OR` para recortes precisos; use os breadcrumbs para refinar ou remover filtros com um clique; salve filtros recorrentes como favoritos; e prefira o operador `is` a `contains` quando possível — é mais rápido e exato.

### Filtros salvos

Depois de criar um filtro complexo que você usa com frequência, salve-o para reutilizar:

1. Crie o filtro
2. Clique na estrela ou em "Save Filter"
3. Dê um nome descritivo (ex: "Incidentes Críticos do Suporte N1")
4. Clique em **Save**

**Exemplos de filtros úteis para salvar:**

- **"Meus incidentes abertos":** State não é Resolved e não é Closed, e Assigned to é mim
- **"Incidentes sem grupo":** Assignment group está vazio
- **"Requisições pendentes de aprovação":** State é Awaiting Approval

---

## Formulários

Um formulário mostra todos os campos de um registro específico, permitindo visualizar, editar e criar novos registros.

Formulários também suportam comportamentos dinâmicos — campos obrigatórios, regras de visibilidade e validações — além de ações rápidas, botões e automações integradas que garantem que os dados sejam coletados corretamente e o processo avance (detalhes na seção [Personalização de formulários](#personalização-de-formulários-para-desenvolvedores), mais abaixo).

**Como acessar:**

- Na lista, clique no número do registro (ex: INC0010001)
- No Filtro de Navegação, digite o número do registro diretamente
- Use os botões "Next" e "Previous" para navegar entre registros

**Estrutura típica:**

- **Cabeçalho:** número do registro e ações principais (Submit, Update, Delete)
- **Campos:** organizados em seções
- **Abas (tabs):** agrupam campos relacionados (ex: Comentários, Workflow, SLA)
- **Related Lists:** na parte inferior, mostram registros de outras tabelas vinculados ao registro atual

**Ações comuns:**

| Ação            | O que faz                                              |
| --------------- | ------------------------------------------------------ |
| Submit          | Cria um novo registro e fecha                          |
| Update          | Salva alterações em registro existente (mantém aberto) |
| Delete          | Remove o registro (cuidado!)                           |
| Insert and Stay | Cria e permanece no formulário para criar outro        |

> **Atenção:** o cabeçalho do formulário também traz o **form context menu** (ícone ☰, "hambúrguer") — reúne ações como Save, Insert e a configuração de layout. É o caminho mais rápido para administrar o registro sem sair do formulário.

---

## Personalização de formulários (para desenvolvedores)

**Editores disponíveis:**

| Editor                 | Caminho                     | Quando usar                                                                                 |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------------------------- |
| Form Builder           | Configure ▸ Form Builder    | Editor visual moderno (arrastar e soltar); campos, seções, abas, formatters e related lists |
| Form Layout (Classic)  | Configure ▸ Form Layout     | Editor clássico (slushbucket) para adicionar/remover/ordenar campos com rapidez             |
| Form Designer          | Predecessor do Form Builder | Editor visual drag-and-drop anterior ao Form Builder, mesma lógica de seções e campos       |
| UI Builder (Workspace) | Next Experience / Workspace | Monta formulários por componentes low-code nas experiências Workspace (Agent/CSM)           |

> A disponibilidade de cada editor varia conforme a versão da plataforma e os plugins ativos na instância.

**Como personalizar o layout (via Form Layout Classic):**

1. Abra qualquer registro da tabela
2. Clique com **botão direito** no cabeçalho do formulário
3. Selecione **Configure → Form Layout**
4. Mova campos entre as colunas "Selected" e "Available"
5. Reorganize a ordem com as setas
6. Clique em **Save**

> **Atenção:** Alterações no layout afetam todos os usuários daquela tabela. Sempre verifique com o time antes de mudanças drásticas.

**Personalizações comuns:**

- Adicionar ou remover campos
- Criar seções e abas
- Tornar campos obrigatórios
- Tornar campos somente leitura
- Mostrar/esconder campos condicionalmente via UI Policies

---

## Related Lists

As Related Lists aparecem na parte inferior do formulário e mostram registros de outras tabelas relacionados ao registro atual.

**Exemplos:**

- No formulário de um Problema: Related List "Incidentes" mostra todos os incidentes vinculados
- No formulário de um Usuário: Related List "Incidentes Abertos" mostra os chamados que aquele usuário abriu
- No formulário de uma Mudança: Related List "Tarefas" mostra as atividades necessárias

**Como usar:**

- **Criar novo registro relacionado:** clique em "New" dentro da Related List
- **Editar:** clique no número do registro dentro da Related List
- **Remover relacionamento:** selecione o registro e clique em "Delete" (remove o vínculo, não apaga o registro)

> Sempre que abrir um formulário, role até o final e veja quais Related Lists estão disponíveis. Você vai descobrir conexões entre dados que não imaginava.

---

## Atalhos de teclado

| Atalho           | Ação                                           |
| ---------------- | ---------------------------------------------- |
| `Ctrl + Alt + F` | Abre o Filtro de Navegação                     |
| `Ctrl + Enter`   | Salva/submite o formulário atual               |
| `Tab`            | Avança para o próximo campo                    |
| `Shift + Tab`    | Volta para o campo anterior                    |
| Setas ↑↓         | Em listas, navega entre registros sem abri-los |

> Comece com um atalho por vez. Primeiro, force-se a usar `Ctrl + Alt + F`. Depois de uma semana, adicione outro.

---

## Erros comuns

| Erro                                                   | Correção                                                    |
| ------------------------------------------------------ | ----------------------------------------------------------- |
| Usar o mouse para tudo                                 | Aprenda um atalho novo por semana                           |
| Não usar filtros e reclamar da quantidade de registros | Crie filtros salvos para as 3 perguntas mais comuns         |
| Criar campos sem verificar se já existem               | Busque no Filtro de Navegação antes de criar qualquer coisa |
| Esquecer de salvar o filtro                            | Todo filtro usado mais de uma vez merece ser salvo          |
| Não explorar as Related Lists                          | Role até o final de todo formulário que você abrir          |

---

## Exemplo de código (para consulta futura — Semana 3)

Script que aplica filtro programaticamente, equivalente ao que você faz clicando no funil:

```javascript
var gr = new GlideRecord("incident");

gr.addQuery("priority", 1); // Incidentes críticos
gr.addQuery("state", "IN", "1,2"); // New (1) ou In Progress (2)
gr.addQuery("assignment_group.name", "Suporte N1");

gr.query();

gs.info("Total de incidentes críticos no Suporte N1: " + gr.getRowCount());

while (gr.next()) {
  gs.info("Incidente: " + gr.number + " - " + gr.short_description);
}
```

---

## Resumo para guardar

- O **Filtro de Navegação** é seu ponto de partida para tudo — treine usá-lo
- **Busca Global** encontra dados dentro dos registros; **Histórico Recente** leva você de volta ao que acabou de ver
- **Preferências** personalizam sua experiência pessoal sem afetar outros usuários
- **Plugins** ligam funcionalidades opcionais da instância sem precisar desenvolver do zero
- **Listas** mostram vários registros — use ordenação, agrupamento (Group by) e colunas para organizar
- **Filtros** refinam o que você vê — o Condition Builder monta condições, os breadcrumbs mostram e ajustam o que está aplicado, e filtros recorrentes merecem ser salvos
- **Formulários** mostram um registro em detalhe — Form Builder, Form Layout (Classic), Form Designer e UI Builder são os editores disponíveis para personalizar o layout
- **Related Lists** conectam registros de diferentes tabelas — explore-as sempre
- **Atalhos de teclado** aceleram seu trabalho — aprenda um por vez
