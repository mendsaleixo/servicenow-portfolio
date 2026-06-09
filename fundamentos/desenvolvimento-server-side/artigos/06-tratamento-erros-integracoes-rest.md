# Tratamento de Erros e Boas Práticas em Integrações REST

**Data:** 09/06/2026  
**Semana:** 3 (Server Scripts - Avançado)  
**Fonte:** Documentação Oficial + Prática própria + Projeto Portal de Reparo de Computadores  
**Tópico relacionado:** RESTMessageV2, JSON, GlideAjax, Script Includes, Integrações

---

# O que é Tratamento de Erros em Integrações

Quando integramos o ServiceNow com sistemas externos, assumimos que algo pode dar errado a qualquer momento.

Alguns exemplos:

- API fora do ar;
- CEP inexistente;
- Timeout de conexão;
- Erro de autenticação;
- Resposta em formato inválido;
- Limite de requisições atingido.

Por isso, uma integração profissional não deve apenas funcionar quando tudo está correto.

Ela deve prever falhas e informar adequadamente o usuário.

---

# Por que isso é importante

Imagine o cenário do projeto Portal de Reparo:

Usuário informa o CEP.

O sistema consulta a API ViaCEP.

Se a API estiver indisponível e nenhum tratamento existir:

- os campos permanecem vazios;
- o usuário não entende o que aconteceu;
- chamados são abertos para o suporte;
- a experiência do usuário piora.

Com tratamento adequado:

- o erro é identificado;
- uma mensagem amigável é exibida;
- os campos são limpos;
- o usuário sabe o que fazer.

---

# Principais Tipos de Erros

## 1. Erro de Validação

Ocorre antes mesmo de chamar a API.

Exemplo:

CEP informado possui menos de 8 dígitos.

```javascript
if (cep.length != 8) {
  return JSON.stringify({
    erro: true,
    mensagem: "CEP inválido. Digite os 8 números.",
  });
}
```

---

## 2. Erro HTTP

A API respondeu com um código diferente de sucesso.

```javascript
var statusCode = response.getStatusCode();

if (statusCode != 200) {
  return JSON.stringify({
    erro: true,
    mensagem: "Erro ao consultar o serviço.",
  });
}
```

---

## 3. CEP Não Encontrado

A comunicação funcionou.

Mas o recurso solicitado não existe.

Resposta do ViaCEP:

```json
{
  "erro": true
}
```

Tratamento:

```javascript
if (endereco.erro) {
  return JSON.stringify({
    erro: true,
    mensagem: "CEP não encontrado.",
  });
}
```

---

## 4. Timeout

A API demorou mais do que o esperado.

Possíveis causas:

- internet lenta;
- servidor externo sobrecarregado;
- indisponibilidade temporária.

```javascript
if (statusCode == 0) {
  return JSON.stringify({
    erro: true,
    mensagem: "Tempo de resposta excedido.",
  });
}
```

---

## 5. Erro de Autenticação

Muito comum em APIs corporativas.

Código HTTP:

```text
401 Unauthorized
```

ou

```text
403 Forbidden
```

Tratamento:

```javascript
if (statusCode == 401 || statusCode == 403) {
  return JSON.stringify({
    erro: true,
    mensagem: "Falha de autenticação.",
  });
}
```

---

# Principais Códigos HTTP

| Código | Significado          |
| ------ | -------------------- |
| 200    | Sucesso              |
| 201    | Criado com sucesso   |
| 400    | Requisição inválida  |
| 401    | Não autorizado       |
| 403    | Acesso negado        |
| 404    | Não encontrado       |
| 429    | Muitas requisições   |
| 500    | Erro interno         |
| 503    | Serviço indisponível |

---

# Uso de Try/Catch

Uma boa prática é envolver a integração em um bloco de tratamento de exceções.

```javascript
try {
  var request = new RESTMessageV2();

  request.setEndpoint(url);

  request.setHttpMethod("GET");

  var response = request.execute();
} catch (ex) {
  gs.error("Erro na integração: " + ex.message);

  return JSON.stringify({
    erro: true,
    mensagem: "Erro inesperado na integração.",
  });
}
```

---

# Validação de JSON

Nem toda resposta recebida será um JSON válido.

Por isso podemos proteger o JSON.parse().

```javascript
try {
  var dados = JSON.parse(responseBody);
} catch (ex) {
  return JSON.stringify({
    erro: true,
    mensagem: "Resposta inválida recebida da API.",
  });
}
```

---

# Exemplo Completo de Tratamento

```javascript
try {
  var request = new RESTMessageV2();

  request.setEndpoint(url);

  request.setHttpMethod("GET");

  var response = request.execute();

  var statusCode = response.getStatusCode();

  if (statusCode != 200) {
    return JSON.stringify({
      erro: true,
      mensagem: "Falha na consulta.",
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
    logradouro: endereco.logradouro,
    bairro: endereco.bairro,
    cidade: endereco.localidade,
    uf: endereco.uf,
  });
} catch (ex) {
  gs.error(ex);

  return JSON.stringify({
    erro: true,
    mensagem: "Erro inesperado.",
  });
}
```

---

# Boas Práticas para Integrações REST

## Sempre validar entradas

Nunca confiar nos dados informados pelo usuário.

```javascript
if (!cep) {
  return;
}
```

---

## Sempre validar o Status Code

Nunca assumir que a API respondeu corretamente.

```javascript
if (statusCode != 200)
```

---

## Sempre validar o JSON recebido

```javascript
JSON.parse();
```

deve estar protegido por try/catch.

---

## Nunca exibir erros técnicos para o usuário

Evite:

```javascript
Connection Timeout Error 504
```

Prefira:

```javascript
Não foi possível consultar o CEP. Tente novamente mais tarde.
```

---

## Registrar erros no Log

```javascript
gs.error(ex);
```

Isso ajuda no suporte e troubleshooting.

---

## Limpar campos quando houver falha

No projeto ViaCEP:

```javascript
g_form.setValue("rua", "");
g_form.setValue("bairro", "");
g_form.setValue("cidade", "");
g_form.setValue("uf", "");
```

---

# Relação com o Projeto Portal de Reparo

Este conceito será aplicado diretamente no milestone:

**PRC-03A – Integração ViaCEP utilizando GlideAjax e RESTMessageV2**

Cenários tratados:

- CEP inválido;
- CEP inexistente;
- API indisponível;
- Timeout;
- Resposta inválida;
- Falha inesperada.

Objetivo:

Garantir uma integração resiliente e com boa experiência para o usuário.

---

# Minhas anotações pessoais

[Preencher após a prática]

- Toda integração deve prever falhas.
- Status Code deve ser validado antes do JSON.parse().
- Try/Catch evita que erros interrompam a execução.
- Usuários devem receber mensagens amigáveis.
- gs.error() ajuda no troubleshooting.
- APIs externas podem falhar a qualquer momento.
- Integrações robustas são diferenciais para desenvolvedores ServiceNow.
