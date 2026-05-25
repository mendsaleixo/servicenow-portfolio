# Catalog Items e Variables no ServiceNow

## Introdução

O Service Catalog é um dos componentes mais importantes do ecossistema ServiceNow, permitindo que usuários solicitem serviços, equipamentos, acessos e processos corporativos através de formulários padronizados.

Dentro desse contexto, os **Catalog Items** representam os itens disponíveis para solicitação pelos usuários.

Exemplos comuns:

- solicitação de notebook;
- acesso VPN;
- criação de usuário;
- reparo de computador;
- solicitação de software;
- onboarding de funcionário.

---

# O que é um Catalog Item

Um **Catalog Item** é um formulário de solicitação disponibilizado no Service Catalog.

Ele funciona como um container principal que agrupa:

- variables;
- variable sets;
- UI Policies;
- Client Scripts;
- workflows;
- automações;
- aprovações.

Seu objetivo é padronizar solicitações e automatizar processos corporativos.

---

# Estrutura de um Catalog Item

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

---

# Variables

Variables representam os campos preenchidos pelo usuário no formulário.

Exemplos:

- nome;
- justificativa;
- urgência;
- equipamento;
- categoria do problema.

---

# Principais propriedades de uma Variable

| Campo         | Função                            |
| ------------- | --------------------------------- |
| Question      | Texto exibido ao usuário          |
| Name          | Nome interno utilizado em scripts |
| Type          | Tipo do campo                     |
| Mandatory     | Campo obrigatório                 |
| Order         | Ordem de exibição                 |
| Default Value | Valor padrão                      |

---

# Principais tipos de Variables

| Tipo              | Uso                          |
| ----------------- | ---------------------------- |
| Single Line Text  | Texto simples                |
| Multi Line Text   | Texto longo                  |
| Select Box        | Lista de opções              |
| Reference         | Referência para outra tabela |
| Yes/No            | Booleano                     |
| Checkbox          | Marcação                     |
| Date              | Data                         |
| Lookup Select Box | Busca dinâmica               |

---

# Select Box

Variáveis do tipo Select Box permitem criar listas de opções.

Exemplo:

## Campo: Nível de urgência

- Baixa
- Média
- Alta
- Crítica

Esse tipo é muito utilizado para:

- categorização;
- priorização;
- classificação de solicitações.

---

# Reference Variables

Variables do tipo Reference permitem selecionar registros de outras tabelas.

Exemplo:

```text
Tabela: cmdb_ci_computer
```

Isso permite selecionar computadores registrados na CMDB.

---

# Reference Qualifier

Reference Qualifier é utilizado para filtrar os registros exibidos em um campo Reference.

Exemplo:

```javascript
owned_by=javascript:gs.getUserID()
```

Objetivo:
mostrar apenas os computadores vinculados ao usuário logado.

---

# Variable Sets

Variable Sets representam grupos reutilizáveis de variables.

Exemplo:

## Variable Set: Endereço

Contendo:

- CEP;
- Rua;
- Bairro;
- Cidade;
- UF.

Ao invés de recriar essas variables em vários catálogos, o Variable Set pode ser reutilizado.

---

# Vantagens dos Variable Sets

- reutilização;
- padronização;
- manutenção simplificada;
- redução de retrabalho;
- organização.

---

# Container Start e Container End

Containers controlam o layout visual das variables.

Eles NÃO são Variable Sets.

Seu objetivo é organizar visualmente os campos no formulário.

Exemplo:

```text
Container Start → Endereço
CEP
Rua
Cidade
UF
Container End
```

---

# Diferença entre Variable e Variable Set

| Conceito     | Objetivo                        |
| ------------ | ------------------------------- |
| Variable     | Campo individual                |
| Variable Set | Grupo reutilizável de variables |

---

# UI Policies

UI Policies controlam comportamento visual do formulário.

Exemplos:

- esconder campos;
- tornar obrigatório;
- tornar somente leitura;
- exibir dinamicamente.

---

# Exemplo de UI Policy

## Regra

Se:

```text
Urgência = Crítica
```

Então:

```text
Descrição detalhada = Mandatory
```

---

# Catalog Client Scripts

Catalog Client Scripts adicionam comportamento lógico client-side.

São utilizados para:

- validações;
- preenchimentos automáticos;
- mensagens;
- manipulação dinâmica do formulário.

---

# Exemplo de uso

```javascript
if (g_form.getValue("urgencia") == "critica") {
  g_form.showFieldMsg(
    "urgencia",
    "Descreva o problema detalhadamente.",
    "warning",
  );
}
```

---

# UI Policy vs Client Script

| Ferramenta    | Melhor uso                   |
| ------------- | ---------------------------- |
| UI Policy     | Comportamento visual simples |
| Client Script | Lógica dinâmica              |
| Flow Designer | Processos backend            |
| Business Rule | Validação server-side        |

---

# Fluxo mental do Service Catalog

```text
Catalog Item = container principal
Variables = entradas do usuário
Variable Set = grupo reutilizável
UI Policy = comportamento visual
Client Script = comportamento lógico
Flow = backend/processo
```

Quando esse modelo mental é internalizado, torna-se muito mais fácil construir soluções completas no ServiceNow.

---

# Boas práticas

## Nomeação consistente

Exemplo:

```text
u_tipo_equipamento
u_urgencia
u_categoria_problema
```

---

## Utilizar Order corretamente

Sugestão:

```text
100
200
300
400
```

Facilita manutenção futura.

---

## Separar responsabilidades

| Necessidade        | Ferramenta    |
| ------------------ | ------------- |
| Visual             | UI Policy     |
| Lógica client-side | Client Script |
| Backend            | Flow / BR     |
| Reutilização       | Variable Set  |

---

# Exercício 1 — Solicitação de Mouse

## Objetivo

Treinar:

- Catalog Item;
- category;
- variables;
- mandatory;
- select box;
- submit.

---

## Criar

### Catalog Item

```text
Solicitação de Mouse
```

### Variables

- tipo de mouse;
- sem fio?;
- urgência;
- justificativa.

---

## Tempo alvo

```text
20 minutos
```

---

# Exercício 2 — Solicitação de Acesso VPN

## Objetivo

Treinar:

- UI Policy;
- hidden/show field;
- mandatory condicional.

---

## Regra

Se:

```text
Acesso externo = Sim
```

Então:

```text
Justificativa = Mandatory
```

---

## Tempo alvo

```text
30 minutos
```

---

# Exercício 3 — Solicitação de Notebook

## Objetivo

Replicar conceitos do projeto PRC-01.

---

## Implementar

- Catalog Item;
- variable set;
- reference variable;
- reference qualifier;
- catalog client script simples.

---

## Regras sugeridas

Mostrar apenas notebooks vinculados ao usuário logado.

---

## Tempo alvo

```text
45 minutos
```

---

# Conclusão

Catalog Items representam um dos principais pilares do ServiceNow para automação de serviços corporativos.

Compreender:

- variables;
- variable sets;
- UI Policies;
- client scripts;
- reference qualifiers;

é fundamental para construir soluções organizadas, reutilizáveis e escaláveis dentro da plataforma.

Mais importante do que decorar menus é compreender o modelo mental do Service Catalog e a responsabilidade de cada componente dentro da arquitetura da solução.
