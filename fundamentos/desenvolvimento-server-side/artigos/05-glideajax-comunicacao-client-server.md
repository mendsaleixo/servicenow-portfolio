# GlideAjax na Prática: Comunicação entre Client e Server no ServiceNow

**Data:** 09/06/2026
**Semana:** 3 (Server Scripts - Avançado)  
**Fonte:** Documentação Oficial + Prática própria + Projeto Portal de Reparo de Computadores  
**Tópico relacionado:** Client Scripts, Script Includes, RESTMessageV2, Integrações

---

# O que é GlideAjax

GlideAjax é um mecanismo do ServiceNow que permite que um **Client Script execute código no servidor sem recarregar a página**.

Em outras palavras, ele funciona como uma ponte entre:

```text
Navegador do usuário (Client)
↓
GlideAjax
↓
Script Include (Server)
↓
Banco de dados, APIs ou lógica de negócio
```

O usuário interage com o formulário enquanto o ServiceNow executa processamento no servidor de forma assíncrona.

---

# Por que o GlideAjax existe?

Client Scripts possuem diversas limitações de segurança.

Por exemplo:

| Ação                     | Client Script    |
| ------------------------ | ---------------- |
| Consultar banco de dados | ❌ Não           |
| Executar GlideRecord     | ❌ Não           |
| Consumir RESTMessageV2   | ❌ Não           |
| Executar Script Include  | ✅ Via GlideAjax |
| Manipular formulário     | ✅ Sim           |

O GlideAjax existe justamente para permitir que o cliente solicite informações ao servidor sem expor lógica sensível.

---

# Casos de uso mais comuns

| Caso de uso              | Exemplo                                    |
| ------------------------ | ------------------------------------------ |
| Consulta de dados        | Buscar nome do usuário a partir do sys_id  |
| Validação                | Verificar se um CPF já existe              |
| Integração               | Consultar CEP na API ViaCEP                |
| Regras de negócio        | Verificar permissões específicas           |
| Preenchimento automático | Buscar endereço, departamento ou gestor    |
| Catálogo de serviços     | Retornar informações de ativos ou usuários |

---

# Arquitetura de funcionamento

Imagine o cenário do projeto Portal de Reparo de Computadores:

O usuário digita um CEP.

```text
Usuário informa CEP
↓
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
Client Script
↓
Campos preenchidos automaticamente
```

Observe que:

- O Client Script não acessa a API diretamente
- O Client Script não utiliza RESTMessageV2
- Toda comunicação externa ocorre no servidor

Essa é uma boa prática de arquitetura no ServiceNow.

---

# Componentes necessários

Para utilizar GlideAjax são necessários três elementos:

## 1. Client Script

Responsável por iniciar a chamada.

```javascript
var ga = new GlideAjax("MeuScriptInclude");
```

---

## 2. Script Include

Responsável por executar a lógica no servidor.

Deve obrigatoriamente:

- estender AbstractAjaxProcessor
- ser Client Callable

```javascript
var MeuScriptInclude = Class.create();

MeuScriptInclude.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  buscarDados: function () {
    return "Sucesso";
  },

  type: "MeuScriptInclude",
});
```

---

## 3. Callback

Função executada quando o servidor responde.

```javascript
ga.getXMLAnswer(function (response) {
  alert(response);
});
```

---

# Entendendo o fluxo completo

## Passo 1 — Criar a instância GlideAjax

```javascript
var ga = new GlideAjax("MeuScriptInclude");
```

O parâmetro é o nome do Script Include.

---

## Passo 2 — Informar o método a executar

```javascript
ga.addParam("sysparm_name", "buscarDados");
```

O método deve existir dentro do Script Include.

---

## Passo 3 — Enviar parâmetros adicionais

```javascript
ga.addParam("sysparm_usuario", g_form.getValue("caller_id"));
```

Podemos enviar quantos parâmetros forem necessários.

---

## Passo 4 — Executar a chamada

```javascript
ga.getXMLAnswer(function (response) {});
```

O ServiceNow executa a chamada de forma assíncrona.

---

## Passo 5 — Processar a resposta

```javascript
ga.getXMLAnswer(function (response) {
  g_form.setValue("resultado", response);
});
```

---

# Exemplo simples: Retornando uma mensagem

## Script Include

```javascript
var TesteAjax = Class.create();

TesteAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getMensagem: function () {
    return "Olá do servidor!";
  },

  type: "TesteAjax",
});
```

---

## Client Script

```javascript
function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading) {
    return;
  }

  var ga = new GlideAjax("TesteAjax");

  ga.addParam("sysparm_name", "getMensagem");

  ga.getXMLAnswer(function (response) {
    g_form.addInfoMessage(response);
  });
}
```

Resultado:

```text
Olá do servidor!
```

---

# Exemplo prático: Consulta de usuário

## Script Include

```javascript
var UsuarioUtils = Class.create();

UsuarioUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getNomeUsuario: function () {
    var userId = this.getParameter("sysparm_user");

    var gr = new GlideRecord("sys_user");

    if (gr.get(userId)) {
      return gr.name.toString();
    }

    return "";
  },

  type: "UsuarioUtils",
});
```

---

## Client Script

```javascript
var ga = new GlideAjax("UsuarioUtils");

ga.addParam("sysparm_name", "getNomeUsuario");

ga.addParam("sysparm_user", g_form.getValue("caller_id"));

ga.getXMLAnswer(function (response) {
  g_form.addInfoMessage(response);
});
```

---

# Trabalhando com JSON

Em projetos reais geralmente retornamos JSON.

## Script Include

```javascript
return JSON.stringify({
  nome: "Mendelson",
  cargo: "Administrador",
  ativo: true,
});
```

## Client Script

```javascript
ga.getXMLAnswer(function (response) {
  var dados = JSON.parse(response);

  g_form.addInfoMessage(dados.nome);
});
```

---

# Comunicação assíncrona

Uma característica importante:

GlideAjax é assíncrono.

Isto significa:

```text
Cliente faz requisição
↓
Continua funcionando
↓
Servidor processa
↓
Resposta retorna depois
```

O formulário não fica travado aguardando.

Isso melhora significativamente a experiência do usuário.

---

# Erros comuns

| Erro                       | Causa                        | Solução                   |
| -------------------------- | ---------------------------- | ------------------------- |
| Script Include não aparece | Client Callable não marcado  | Marcar Client Callable    |
| Método não executa         | sysparm_name incorreto       | Verificar nome do método  |
| Retorno vazio              | Callback não implementado    | Verificar getXMLAnswer    |
| JSON.parse quebra          | JSON inválido                | Validar retorno           |
| GlideRecord não funciona   | Código está no Client Script | Mover para Script Include |
| Erro de permissão          | ACL bloqueando acesso        | Revisar permissões        |

---

# Boas práticas

## Centralize lógica no servidor

Evite colocar regras complexas no Client Script.

---

## Utilize Script Includes reutilizáveis

Um Script Include pode ser chamado por:

- Client Scripts
- Business Rules
- Flow Designer
- Outras integrações

---

## Retorne JSON para estruturas complexas

Prefira:

```javascript
JSON.stringify({
  nome: nome,
  email: email,
});
```

ao invés de:

```javascript
return nome + "|" + email;
```

---

## Valide entradas

Nunca confie nos dados enviados pelo cliente.

Valide:

- formatos
- permissões
- existência dos registros

---

## Trate exceções

Utilize try/catch sempre que possível.

```javascript
try {
  // processamento
} catch (ex) {
  gs.error(ex.message);
}
```

---

# Relação com o Projeto Portal de Reparo de Computadores

No milestone **PRC-03A**, GlideAjax será utilizado para:

```text
Campo CEP
↓
Client Script onChange
↓
GlideAjax
↓
Script Include ViaCEPIntegration
↓
RESTMessageV2
↓
API ViaCEP
↓
JSON
↓
Preenchimento automático do endereço
```

Essa implementação aplica simultaneamente:

- Client Scripts
- Script Includes
- GlideAjax
- RESTMessageV2
- JSON
- Integração com API externa

representando um cenário muito comum em projetos reais de ServiceNow.

---

# Anotações:

- GlideAjax é a ponte entre Client Script e Script Include.
- Client Scripts não acessam banco de dados nem APIs diretamente.
- Script Includes utilizados com GlideAjax precisam ser Client Callable.
- AbstractAjaxProcessor é obrigatório para receber parâmetros do cliente.
- JSON é a melhor forma de retornar estruturas complexas.
- GlideAjax trabalha de forma assíncrona e melhora a experiência do usuário.
- No projeto Portal de Reparo de Computadores, GlideAjax será utilizado para consultar a API ViaCEP através de um Script Include.
