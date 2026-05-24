# Script Include + GlideAjax (Conceitual)

**Data:** 14/05/26\
**Semana:** 3 (Server Scripts - Compacta)\
**Fonte:** SNAF Módulo 4 + Prática própria\
**Tópico relacionado:** Business Rules, GlideRecord, Reutilização de código

---

## O que é Script Include (definição simples)

Um **Script Include** é um código JavaScript reutilizável que fica no servidor. Pense nele como uma **biblioteca de funções** que você pode chamar de qualquer lugar: Business Rules, Flow Designer, Scheduled Jobs, e até do lado do cliente (via GlideAjax).

**O que preciso saber agora (nível Júnior):**

- O que é um Script Include (conceito)
- Para que serve (reutilização de código)
- Como ler um Script Include existente

**O que NÃO preciso saber agora:**

- Criar Script Includes complexos
- GlideAjax avançado
- Client-callable em detalhes

**Por que estudar isso agora?**

- Conseguir ler código legado que usa Script Includes
- Entender o ecossistema (saber que existe)
- Diferenciar do que é Client Script vs Server Script

---

## Para que serve (casos de uso)

| Caso de uso                                            | Exemplo                             |
| ------------------------------------------------------ | ----------------------------------- |
| Reutilizar lógica em múltiplas Business Rules          | Calcular SLA                        |
| Centralizar validações complexas                       | Validar CPF em vários lugares       |
| Buscar dados do servidor via Client Script (GlideAjax) | Preencher campos baseado em seleção |
| Organizar código por assunto                           | Agrupar funções de incidente        |

---

## Estrutura básica de um Script Include

```javascript
var MeuHelper = Class.create();
MeuHelper.prototype = {
  initialize: function () {
    // Construtor (opcional)
  },

  minhaFuncao: function (parametro) {
    // Sua lógica aqui
    return resultado;
  },

  type: "MeuHelper",
};
```

### Anatomia de um Script Include

| Parte                        | O que faz                               |
| ---------------------------- | --------------------------------------- |
| `var Nome = Class.create();` | Cria uma nova classe                    |
| `Nome.prototype = { ... }`   | Define os métodos da classe             |
| `initialize: function() { }` | Construtor (roda ao criar instância)    |
| `meuMetodo: function() { }`  | Um método que você pode chamar          |
| `type: 'Nome'`               | Identificador da classe (boas práticas) |

---

## Exemplo simples (apenas para entender)

**Script Include (IncidenteHelper):**

```javascript
var IncidenteHelper = Class.create();
IncidenteHelper.prototype = {
  initialize: function () {
    // Construtor
  },

  contarPorPrioridade: function (prioridade) {
    var gr = new GlideRecord("incident");
    gr.addQuery("priority", prioridade);
    gr.query();
    return gr.getRowCount();
  },

  type: "IncidenteHelper",
};
```

**Como usar em uma Business Rule:**

```javascript
var helper = new IncidenteHelper();
var totalCriticos = helper.contarPorPrioridade(1);
gs.info("Total de incidentes críticos: " + totalCriticos);
```

---

## O que é GlideAjax (conceitual)

**GlideAjax** é uma ponte que permite um **Client Script** (que roda no navegador) chamar um **Script Include** (que roda no servidor).

**Por que isso é necessário?**

- Client Scripts NÃO podem acessar o banco de dados diretamente
- GlideAjax permite buscar dados do servidor sem recarregar a página

**O que você precisa saber agora:**

- O conceito: Client Script → GlideAjax → Script Include → Servidor
- Que isso existe e é usado para buscas assíncronas
- Não precisa implementar agora

**Fluxo do GlideAjax:**\
**Etapa 1: Usuário interage com o formulário**

O usuário seleciona um valor em um campo (ex: escolhe um cliente)

**Etapa 2: Client Script detecta a mudança**

Um Client Script do tipo onChange é disparado

**Etapa 3: GlideAjax faz a chamada**

O Client Script cria uma instância do GlideAjax

Aponta para o Script Include que será chamado

Envia os parâmetros necessários (ex: o ID do cliente selecionado)

**Etapa 4: Script Include processa no servidor**

O Script Include recebe a chamada no servidor

Executa a lógica (ex: busca dados do cliente no banco usando GlideRecord)

**Etapa 5: Retorno dos dados**

O Script Include retorna os dados (geralmente em formato JSON)

**Etapa 6: Client Script atualiza o formulário**

O Client Script recebe a resposta

Preenche os campos automaticamente (ex: endereço, telefone, e-mail)

---

## Exemplo de GlideAjax (apenas para entender o conceito)

**Script Include (Client-callable):**

```javascript
var BuscarUsuario = Class.create();
BuscarUsuario.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getUsuario: function () {
    var sysId = this.getParameter("sysparm_user_id");
    var gr = new GlideRecord("sys_user");
    if (gr.get(sysId)) {
      return JSON.stringify({
        nome: gr.name,
        email: gr.email,
        departamento: gr.department.getDisplayValue(),
      });
    }
    return "{}";
  },
});
```

**Client Script que chama o Script Include:**

```javascript
function onChange() {
  var userId = g_form.getValue("caller_id");
  if (userId) {
    var ga = new GlideAjax("BuscarUsuario");
    ga.addParam("sysparm_name", "getUsuario");
    ga.addParam("sysparm_user_id", userId);
    ga.getXMLAnswer(function (response) {
      var dados = JSON.parse(response);
      g_form.setValue("u_email", dados.email);
    });
  }
}
```

**O que este código faz:**

1. Usuário seleciona um solicitante (`caller_id`)
2. Client Script detecta a mudança (onChange)
3. GlideAjax chama o Script Include `BuscarUsuario`
4. Script Include busca os dados do usuário no banco
5. Retorna os dados em JSON
6. Client Script preenche o campo de e-mail automaticamente

---

## Script Include vs Outras Ferramentas

| Ferramenta         | Onde roda | Quando usar                |
| ------------------ | --------- | -------------------------- |
| **Script Include** | Servidor  | Reutilizar lógica complexa |
| **Business Rule**  | Servidor  | Automatizar ao salvar      |
| **Client Script**  | Navegador | Feedback ao usuário        |
| **Flow Designer**  | Servidor  | Automação low-code         |

---

## Para que NÃO usar Script Include (agora)

| Uso                   | Por que evitar          | Alternativa                |
| --------------------- | ----------------------- | -------------------------- |
| Lógica simples        | Overkill                | Business Rule direta       |
| Validação de um campo | Muito código            | UI Policy ou Client Script |
| Primeira solução      | Tente low-code primeiro | Flow Designer              |

---

## Links úteis

- [Documentação - Script Includes](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/configure/script-includes/concept/c_ScriptIncludes.html)
- [Documentação - GlideAjax](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/configure/glide-ajax/concept/c_GlideAjax.html)

---

## Minhas anotações pessoais

- Script Include é uma biblioteca de funções reutilizáveis no servidor
- GlideAjax é a ponte que permite Client Script chamar Script Include
- Nessa etapa, meu foco é saber que isso existe e conseguir ler, não preciso criar Script Includes complexos agora
- Flow Designer vai resolver a maioria das automações que eu precisar

---

## 🃏 Flashcards do Dia 3

[INICIO_CODIGO]
Pergunta: O que é um Script Include no ServiceNow?
Resposta: É um código JavaScript reutilizável que fica no servidor, similar a uma biblioteca de funções. Pode ser chamado de Business Rules, Flows, e via GlideAjax.

Pergunta: Para que serve o GlideAjax?
Resposta: É uma ponte que permite um Client Script (navegador) chamar um Script Include (servidor) para buscar dados sem recarregar a página.

Pergunta: Um Client Script consegue acessar o banco de dados diretamente?
Resposta: Não. Client Scripts rodam no navegador e não têm acesso direto ao banco. Para buscar dados, precisam de GlideAjax + Script Include.

Pergunta: Qual a estrutura básica de um Script Include?
Resposta: var Nome = Class.create(); Nome.prototype = { initialize: function() {}, metodos: function() {}, type: 'Nome' };

Pergunta: O que significa "Client-callable" em um Script Include?
Resposta: Significa que o Script Include pode ser chamado por um Client Script via GlideAjax. É uma configuração no cabeçalho do script.

Pergunta: Como Júnior, você precisa criar Script Includes complexos?
Resposta: Não. O foco é entender o conceito e conseguir ler código legado. Flow Designer resolve a maioria das necessidades de automação.

Pergunta: GlideAjax é síncrono ou assíncrono?
Resposta: Assíncrono. O Client Script continua executando enquanto espera a resposta do servidor, usando callback (getXMLAnswer).
[FIM_CODIGO]

---

## Resumo da Semana 3 (Compacta)

| Dia | Tópico                                               | Nível exigido       | Concluído |
| --- | ---------------------------------------------------- | ------------------- | --------- |
| 1   | Business Rule básica (before insert, setAbortAction) | Criar o básico      | [X]       |
| 2   | GlideRecord simples (get, query, addQuery)           | Consultar dados     | [X]       |
| 3   | Script Include + GlideAjax (conceitual)              | Entender o conceito | [X]       |

**Checklist para fechar a Semana 3:**

- [x] Criei 1 Business Rule funcional
- [x] Executei 1 consulta GlideRecord no Scripts Background
- [x] Entendo o conceito de Script Include e GlideAjax
- [x] Exportei o Update Set da Semana 3
- [x] Criei o README-semana3.md
- [x] Organizei os prints na pasta `entregaveis/prints/`

---
