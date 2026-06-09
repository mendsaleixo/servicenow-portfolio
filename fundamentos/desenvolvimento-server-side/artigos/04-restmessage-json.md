# RESTMessageV2 e JSON: Consumindo APIs REST no ServiceNow

**Data:** [insira a data de hoje]  
**Semana:** 3 (Server Scripts - Avançado)  
**Fonte:** Documentação Oficial + Prática própria + Micro-certificação IntegrationHub  
**Tópicos relacionados:** Script Includes, GlideAjax, Integrações, APIs REST

---

# O que é RESTMessageV2

RESTMessageV2 é uma classe nativa do ServiceNow que permite fazer chamadas HTTP (**GET, POST, PUT, DELETE e PATCH**) para APIs REST externas diretamente do servidor.

Pense nela como um "navegador programável" que roda no backend do ServiceNow. Enquanto o usuário interage com formulários, o servidor pode silenciosamente buscar dados em sistemas externos, enviar notificações ou sincronizar informações.

## Onde você pode usar RESTMessageV2

| Local           | É possível?                    | Exemplo                              |
| --------------- | ------------------------------ | ------------------------------------ |
| Script Includes | ✅ Sim (recomendado)           | Centralizar chamadas de API          |
| Business Rules  | ✅ Sim                         | Buscar dados ao salvar um registro   |
| Scheduled Jobs  | ✅ Sim                         | Sincronização periódica              |
| Flow Designer   | ⚠️ Via IntegrationHub (melhor) | Low-code                             |
| Client Scripts  | ❌ Não (use GlideAjax)         | Código cliente não tem acesso direto |

> **Diferença fundamental:** RESTMessageV2 roda no servidor. GlideAjax é a ponte para o cliente chamar um Script Include que usa RESTMessageV2.

---

# Para que serve

## Casos de uso práticos

| Caso de uso                          | Exemplo                                                 | API utilizada     |
| ------------------------------------ | ------------------------------------------------------- | ----------------- |
| Preenchimento automático de endereço | Usuário digita CEP e sistema busca rua, bairro e cidade | ViaCEP            |
| Validação de CEP                     | Verificar se CEP informado existe                       | ViaCEP            |
| Busca de clima                       | Exibir temperatura no portal do funcionário             | OpenWeather       |
| Previsão do tempo para logística     | Planejar entregas conforme clima                        | OpenWeather       |
| Consulta de CNPJ                     | Buscar dados de empresa parceira                        | ReceitaWS         |
| Envio de notificações                | Disparar alerta para Slack ou Teams                     | Webhooks          |
| Sincronização de dados               | Atualizar estoque com sistema externo                   | API do fornecedor |
| Validação de endereço                | Confirmar endereço informado                            | Correios API      |

> **Por que isso é importante?** Integrações são um dos pontos mais valorizados em desenvolvedores ServiceNow. Dominar RESTMessageV2 é essencial para qualquer profissional que trabalhe com a plataforma.

---

# Como fazer

## 1. Estrutura básica do RESTMessageV2

```javascript
// 1. Criar a instância
var request = new RESTMessageV2();

// 2. Configurar o endpoint
request.setEndpoint("https://api.exemplo.com/v1/dados");

// 3. Configurar o método HTTP
request.setHttpMethod("GET");

// 4. Adicionar cabeçalhos (opcional)
request.setRequestHeader("Content-Type", "application/json");
request.setRequestHeader("Authorization", "Bearer SEU_TOKEN_AQUI");

// 5. Corpo da requisição (POST/PUT)
request.setRequestBody('{"campo":"valor"}');

// 6. Executar
var response = request.execute();

// 7. Obter status
var statusCode = response.getStatusCode();

// 8. Obter resposta
var responseBody = response.getBody();
```

---

## 2. Métodos essenciais do RESTMessageV2

| Método                       | O que faz                    | Exemplo                                                    |
| ---------------------------- | ---------------------------- | ---------------------------------------------------------- |
| setEndpoint(url)             | Define URL da API            | setEndpoint('https://api.viacep.com.br/ws/01001000/json/') |
| setHttpMethod(method)        | Define método HTTP           | setHttpMethod('GET')                                       |
| setRequestHeader(name,value) | Adiciona cabeçalho           | setRequestHeader('Content-Type','application/json')        |
| setRequestBody(body)         | Define corpo da requisição   | setRequestBody('{"nome":"Joao"}')                          |
| execute()                    | Executa a requisição         | request.execute()                                          |
| getStatusCode()              | Obtém código HTTP            | 200, 404, 500                                              |
| getBody()                    | Obtém resposta da API        | '{"logradouro":"Praça da Sé"}'                             |
| getHeaders()                 | Obtém cabeçalhos da resposta | Debug                                                      |

---

## 3. Códigos HTTP mais comuns

| Código | Significado           | O que fazer          |
| ------ | --------------------- | -------------------- |
| 200    | OK                    | Processar resposta   |
| 201    | Created               | Recurso criado       |
| 400    | Bad Request           | Revisar parâmetros   |
| 401    | Unauthorized          | Revisar autenticação |
| 403    | Forbidden             | Revisar permissões   |
| 404    | Not Found             | Verificar endpoint   |
| 500    | Internal Server Error | Erro no servidor     |
| 503    | Service Unavailable   | API indisponível     |

---

# JSON: O formato dos dados

## O que é JSON

JSON (JavaScript Object Notation) é o formato padrão para troca de dados entre sistemas.

### Estrutura básica

```json
{
  "nome": "João Silva",
  "idade": 30,
  "email": "joao@exemplo.com",
  "endereco": {
    "rua": "Av. Paulista",
    "numero": 1000
  },
  "telefones": ["11999999999", "11888888888"]
}
```

---

## Tipos de dados JSON

| Tipo     | Exemplo         |
| -------- | --------------- |
| String   | "nome": "João"  |
| Número   | "idade": 30     |
| Booleano | "ativo": true   |
| Array    | "telefones": [] |
| Objeto   | "endereco": {}  |
| Nulo     | "valor": null   |

---

## JSON.parse() e JSON.stringify()

| Método           | O que faz                                |
| ---------------- | ---------------------------------------- |
| JSON.parse()     | Converte texto JSON em objeto JavaScript |
| JSON.stringify() | Converte objeto JavaScript em texto JSON |

### Exemplo

```javascript
var resposta =
  '{"logradouro":"Praça da Sé","bairro":"Sé","cidade":"São Paulo"}';

var endereco = JSON.parse(resposta);

gs.info(endereco.logradouro);
gs.info(endereco.bairro);
gs.info(endereco.cidade);
```

---

# Exemplo completo: Integração ViaCEP

## Arquitetura da solução

```text
Client Script
      ↓
GlideAjax
      ↓
Script Include
      ↓
RESTMessageV2
      ↓
API ViaCEP
      ↓
Retorno JSON
      ↓
Preenchimento automático dos campos
```

---

## Passo 1: Script Include

**Nome:** ViaCEPIntegration

**Client Callable:** Sim

```javascript
var ViaCEPIntegration = Class.create();
ViaCEPIntegration.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getEnderecoPorCEP: function () {
    var cep = this.getParameter("sysparm_cep");
    cep = cep.replace(/\D/g, "");

    if (cep.length != 8) {
      return JSON.stringify({
        erro: true,
        mensagem: "CEP inválido. Digite 8 dígitos.",
      });
    }

    var url = "https://viacep.com.br/ws/" + cep + "/json/";

    var request = new RESTMessageV2();
    request.setEndpoint(url);
    request.setHttpMethod("GET");

    var response = request.execute();
    var statusCode = response.getStatusCode();

    if (statusCode != 200) {
      return JSON.stringify({
        erro: true,
        mensagem: "Erro ao consultar CEP.",
      });
    }

    var endereco = JSON.parse(response.getBody());

    if (endereco.erro) {
      return JSON.stringify({
        erro: true,
        mensagem: "CEP não encontrado.",
      });
    }

    return JSON.stringify({
      erro: false,
      logradouro: endereco.logradouro || "",
      bairro: endereco.bairro || "",
      cidade: endereco.localidade || "",
      uf: endereco.uf || "",
    });
  },

  type: "ViaCEPIntegration",
});
```

---

## Passo 2: Client Script

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || isTemplate) {
    return;
  }

  if (newValue == "" || newValue == oldValue) {
    return;
  }

  var ga = new GlideAjax("ViaCEPIntegration");

  ga.addParam("sysparm_name", "getEnderecoPorCEP");
  ga.addParam("sysparm_cep", newValue);

  ga.getXMLAnswer(function (response) {
    var dados = JSON.parse(response);

    if (dados.erro) {
      g_form.showFieldMsg("cep", dados.mensagem, "error");
    } else {
      g_form.setValue("rua", dados.logradouro);
      g_form.setValue("bairro", dados.bairro);
      g_form.setValue("cidade", dados.cidade);
      g_form.setValue("uf", dados.uf);
    }
  });
}
```

---

# Tratamento de erros avançado

```javascript
if (statusCode == 500 || statusCode == 503) {
  return JSON.stringify({
    erro: true,
    mensagem: "Serviço temporariamente indisponível.",
  });
}

if (statusCode == 0) {
  return JSON.stringify({
    erro: true,
    mensagem: "Tempo limite excedido.",
  });
}

if (statusCode == 429) {
  return JSON.stringify({
    erro: true,
    mensagem: "Muitas tentativas. Aguarde.",
  });
}
```

---

# Erros comuns e boas práticas

| Erro                         | Causa                         | Solução            |
| ---------------------------- | ----------------------------- | ------------------ |
| Client Script não dispara    | Campo incorreto               | Verificar onChange |
| Script Include não aparece   | Client Callable não marcado   | Marcar checkbox    |
| RESTMessageV2 falha          | Plugin REST ausente           | Ativar plugin      |
| JSON.parse quebra            | Resposta inválida             | Validar JSON       |
| CEP inválido retorna sucesso | API retorna erro=true         | Validar retorno    |
| Campos não preenchem         | Nome técnico incorreto        | Revisar variáveis  |
| Requisição bloqueada         | Firewall ou restrição externa | Validar acesso     |

---

# Links úteis

- Documentação RESTMessageV2
- Documentação GlideAjax
- Documentação Script Includes
- API ViaCEP
- JSON.org

---

# Minhas anotações pessoais

- RESTMessageV2 é a classe para consumir APIs REST do servidor.
- GET busca dados, POST cria, PUT atualiza e DELETE remove.
- Sempre validar o status HTTP antes de processar a resposta.
- JSON.parse() transforma texto em objeto.
- JSON.stringify() transforma objeto em texto.
- GlideAjax é a ponte entre Client Script e Script Include.
- Script Include precisa ser Client Callable para funcionar com GlideAjax.
- APIs podem falhar; trate erros e exceções adequadamente.
