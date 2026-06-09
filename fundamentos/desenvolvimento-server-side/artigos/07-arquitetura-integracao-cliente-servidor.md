# Arquitetura de Integração Cliente-Servidor no ServiceNow

**Data:** 09/06/2026  
**Semana:** 3 (Server Scripts - Avançado)  
**Fonte:** Documentação Oficial + Projeto Portal de Reparo de Computadores + Prática própria  
**Tópico relacionado:** Client Scripts, GlideAjax, Script Includes, RESTMessageV2, APIs REST

---

# O que é Arquitetura Cliente-Servidor

O ServiceNow é uma plataforma baseada em arquitetura cliente-servidor.

Isso significa que parte do código executa no navegador do usuário (Client Side) e parte executa nos servidores da plataforma (Server Side).

Cada lado possui responsabilidades específicas.

---

# Por que isso é importante

Uma das dúvidas mais comuns de quem começa a desenvolver no ServiceNow é:

> "Por que não faço tudo no Client Script?"

A resposta é simples:

O navegador do usuário possui diversas limitações de segurança.

Por isso:

- Client Scripts não acessam banco de dados diretamente;
- Client Scripts não executam GlideRecord;
- Client Scripts não executam RESTMessageV2;
- Client Scripts não acessam APIs externas diretamente.

Quando precisamos desses recursos, devemos utilizar o servidor.

---

# Visão Geral da Arquitetura

```text
Usuário
   ↓
Formulário
   ↓
Client Script
   ↓
GlideAjax
   ↓
Script Include
   ↓
RESTMessageV2
   ↓
API Externa
   ↓
JSON
   ↓
Script Include
   ↓
GlideAjax
   ↓
Client Script
   ↓
Formulário Atualizado
```

---

# Camada 1 - Client Side

Executa no navegador do usuário.

Exemplos:

- Client Scripts
- UI Policies
- Catalog Client Scripts
- UI Scripts

Responsabilidades:

- validar campos;
- mostrar mensagens;
- esconder campos;
- melhorar experiência do usuário;
- disparar chamadas GlideAjax.

---

# Exemplo

```javascript
function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading) {
    return;
  }

  var ga = new GlideAjax("ViaCEPIntegration");

  ga.addParam("sysparm_name", "getEnderecoPorCEP");

  ga.addParam("sysparm_cep", newValue);

  ga.getXMLAnswer(function (response) {
    var dados = JSON.parse(response);

    g_form.setValue("cidade", dados.cidade);
  });
}
```

---

# Limitações do Client Side

Não pode executar:

```javascript
new GlideRecord();
```

---

Não pode executar:

```javascript
new RESTMessageV2();
```

---

Não pode acessar tabelas diretamente.

---

# Camada 2 - GlideAjax

GlideAjax funciona como uma ponte entre navegador e servidor.

Ele permite que um Client Script solicite processamento no backend.

---

# Fluxo

```text
Client Script
      ↓
GlideAjax
      ↓
Script Include
```

---

# Exemplo

```javascript
var ga = new GlideAjax("ViaCEPIntegration");

ga.addParam("sysparm_name", "getEnderecoPorCEP");

ga.addParam("sysparm_cep", cep);

ga.getXMLAnswer(callback);
```

---

# Camada 3 - Script Include

Executa no servidor.

É responsável por:

- processar regras;
- consultar banco;
- chamar APIs;
- retornar dados ao cliente.

---

# Exemplo

```javascript
var ViaCEPIntegration = Class.create();

ViaCEPIntegration.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getEnderecoPorCEP: function () {
    return "São Paulo";
  },

  type: "ViaCEPIntegration",
});
```

---

# Client Callable

Para ser acessado pelo GlideAjax:

```text
Client Callable = true
```

deve estar marcado.

---

# Camada 4 - RESTMessageV2

Responsável por integrar o ServiceNow com sistemas externos.

Exemplos:

- ViaCEP
- Slack
- Teams
- Jira
- Salesforce
- APIs corporativas

---

# Exemplo

```javascript
var request = new RESTMessageV2();

request.setEndpoint(url);

request.setHttpMethod("GET");

var response = request.execute();
```

---

# Fluxo Completo do ViaCEP

```text
Usuário digita CEP
         ↓
Client Script dispara
         ↓
GlideAjax executa
         ↓
Script Include recebe CEP
         ↓
RESTMessageV2 chama ViaCEP
         ↓
ViaCEP retorna JSON
         ↓
Script Include processa resposta
         ↓
GlideAjax recebe retorno
         ↓
Client Script preenche formulário
```

---

# Separação de Responsabilidades

| Camada         | Responsabilidade             |
| -------------- | ---------------------------- |
| Client Script  | Interação com usuário        |
| GlideAjax      | Comunicação cliente-servidor |
| Script Include | Regras de negócio            |
| RESTMessageV2  | Integrações externas         |
| API Externa    | Fornecimento de dados        |

---

# Arquitetura incorreta

```text
Client Script
      ↓
API Externa
```

Problemas:

- exposição de dados;
- falhas de segurança;
- CORS;
- credenciais visíveis.

---

# Arquitetura correta

```text
Client Script
      ↓
GlideAjax
      ↓
Script Include
      ↓
RESTMessageV2
      ↓
API Externa
```

Benefícios:

- segurança;
- reutilização;
- manutenção facilitada;
- melhor governança.

---

# Aplicação no Projeto Portal de Reparo

Milestone:

**PRC-03A – Integração ViaCEP utilizando GlideAjax e RESTMessageV2**

Componentes utilizados:

| Componente      | Papel                   |
| --------------- | ----------------------- |
| Catalog Item    | Interface do usuário    |
| Client Script   | Captura CEP             |
| GlideAjax       | Comunicação assíncrona  |
| Script Include  | Processamento backend   |
| RESTMessageV2   | Consulta ViaCEP         |
| JSON            | Troca de dados          |
| Service Catalog | Exibição dos resultados |

---

# O que um desenvolvedor ServiceNow deve saber

Ao olhar para uma solução de integração, deve conseguir responder:

- O que roda no cliente?
- O que roda no servidor?
- Como ocorre a comunicação?
- Onde fica a regra de negócio?
- Onde ocorre a integração externa?
- Como tratar erros?
- Como retornar dados ao usuário?

Essas perguntas aparecem frequentemente em entrevistas técnicas.

---

# Minhas anotações pessoais

[Preencher após a prática]

- Client Scripts não acessam banco de dados.
- GlideAjax é a ponte entre cliente e servidor.
- Script Includes centralizam lógica de negócio.
- RESTMessageV2 é utilizado para integrações REST.
- JSON é o formato padrão de troca de dados.
- Toda integração deve respeitar a separação cliente-servidor.
- Arquitetura bem definida facilita manutenção e escalabilidade.
