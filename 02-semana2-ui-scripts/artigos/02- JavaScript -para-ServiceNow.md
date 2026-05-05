# JavaScript para ServiceNow: g_form, g_user e alertas

**Data:** 05/05/2026
**Semana:** 2 (UI Scripts)
**Fonte:** SNAF Módulo 4 + Documentação Oficial + Prática própria
**Tópico relacionado:** Client Scripts, Validação de Campos, UX na Plataforma

---

## O que é (definição simples)

Quando você escreve um Client Script no ServiceNow, você tem acesso a dois objetos globais que são a espinha dorsal da manipulação da interface:

- **`g_form`** : É o "controle remoto" do formulário. Com ele, você lê, escreve, mostra, esconde, valida e modifica qualquer campo do formulário atual.
- **`g_user`** : É o "documento de identidade" do usuário logado. Com ele, você sabe quem está na tela, seu nome, seu ID e quais permissões (papéis) ele possui.

Dominar esses dois objetos é o que separa um script funcional de um script profissional e robusto. Quase tudo o que você fará em Client Scripts passará por um desses dois objetos.

---

## Para que serve (casos de uso)

| Objeto       | Caso de uso                         | Exemplo                                                      |
| ------------ | ----------------------------------- | ------------------------------------------------------------ |
| **`g_form`** | Validar campos antes de salvar      | Impedir envio se "Descrição" estiver vazia                   |
| **`g_form`** | Preencher campos automaticamente    | Copiar dados do usuário para o incidente                     |
| **`g_form`** | Mostrar ou esconder campos          | Exibir "Motivo da Rejeição" apenas se estado for "Rejeitado" |
| **`g_form`** | Exibir mensagens para o usuário     | "Erro: campo X é obrigatório"                                |
| **`g_user`** | Personalizar a interface por perfil | Mostrar campo "Admin" apenas se usuário for admin            |
| **`g_user`** | Pré-preencher dados do usuário      | Preencher "Solicitante" com o nome do usuário logado         |

---

## Como fazer (passo a passo prático)

### A estrutura de um Client Script com validação

Um Client Script bem estruturado no ServiceNow segue este esqueleto:

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  // 1. SEMPRE verificar se o formulário está carregando
  if (isLoading || isTemplate) {
    return;
  }

  // 2. Sua lógica aqui
  var valor = g_form.getValue("nome_do_campo");

  // 3. Validação e feedback
  if (valor == "") {
    g_form.showFieldMsg("nome_do_campo", "Este campo é obrigatório", "error");
  } else {
    g_form.hideFieldMsg("nome_do_campo");
  }
}
```

**Regras de ouro:**

1. `isLoading` e `isTemplate` sempre no início – ignoram execução durante carregamento
2. Use `g_form.showFieldMsg()` em vez de `alert()` para feedback ao usuário
3. Sempre limpe mensagens antigas com `hideFieldMsg()` antes de mostrar novas

---

## Referência completa: g_form (Client Script)

### Métodos de leitura (obter valores)

| Método                                 | O que faz                                               | Retorna     | Exemplo                                       |
| -------------------------------------- | ------------------------------------------------------- | ----------- | --------------------------------------------- |
| `g_form.getValue(campo)`               | Obtém o valor técnico do campo                          | String      | `g_form.getValue('priority')` → "3"           |
| `g_form.getDisplayValue(campo)`        | Obtém o label exibido (útil para Choice)                | String      | `g_form.getDisplayValue('priority')` → "Alta" |
| `g_form.getReference(campo, callback)` | Obtém o objeto completo do campo Reference (assíncrono) | GlideRecord | Buscar usuário inteiro pelo campo caller_id   |

**Exemplo de getReference (avançado):**

```javascript
function onChange() {
  var callerId = g_form.getValue("caller_id");
  if (callerId) {
    g_form.getReference("caller_id", function (user) {
      g_form.setValue("location", user.location); // Copia a localização do usuário
    });
  }
}
```

### Métodos de escrita (definir valores)

| Método                                 | O que faz                                    | Exemplo                                         |
| -------------------------------------- | -------------------------------------------- | ----------------------------------------------- |
| `g_form.setValue(campo, valor)`        | Define o valor técnico do campo              | `g_form.setValue('priority', '1')`              |
| `g_form.setDisplayValue(campo, label)` | Define o campo pelo label (útil para Choice) | `g_form.setDisplayValue('priority', 'Crítica')` |
| `g_form.clearValue(campo)`             | Limpa o valor do campo                       | `g_form.clearValue('assignment_group')`         |

**Atenção:** Para campos do tipo Choice, `setValue` exige o valor técnico (ex: "1", "2", "3"). Use `setDisplayValue` se você quiser usar o texto que aparece (ex: "Crítica", "Alta").

### Métodos de validação e feedback (mensagens ao usuário)

| Método                                  | O que faz                               | Quando usar                    |
| --------------------------------------- | --------------------------------------- | ------------------------------ |
| `g_form.addInfoMessage(mensagem)`       | Mensagem amarela no topo do formulário  | Informações gerais, dicas      |
| `g_form.addErrorMessage(mensagem)`      | Mensagem vermelha no topo               | Erros de validação importantes |
| `g_form.showFieldMsg(campo, msg, tipo)` | Mensagem abaixo do campo específico     | Erro específico daquele campo  |
| `g_form.hideFieldMsg(campo)`            | Remove mensagens de um campo            | Limpar erro após correção      |
| `g_form.hideAllFieldMsgs()`             | Remove todas as mensagens do formulário | Resetar validações             |

**Tipos válidos para `showFieldMsg`:**

- `'error'` – texto vermelho com ícone de erro
- `'info'` – texto azul com ícone de informação
- `'warning'` – texto amarelo com ícone de alerta

**Exemplo prático:**

```javascript
if (g_form.getValue("short_description") == "") {
  g_form.showFieldMsg("short_description", "Descrição é obrigatória", "error");
} else {
  g_form.hideFieldMsg("short_description");
  g_form.addInfoMessage("Descrição preenchida corretamente.");
}
```

### Métodos de controle de campos (comportamento)

| Método                                   | O que faz                                  | Exemplo                                          |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------ |
| `g_form.setMandatory(campo, true/false)` | Torna campo obrigatório ou opcional        | `g_form.setMandatory('short_description', true)` |
| `g_form.setReadOnly(campo, true/false)`  | Torna campo somente leitura (não editável) | `g_form.setReadOnly('number', true)`             |
| `g_form.setVisible(campo, true/false)`   | Mostra ou esconde o campo do formulário    | `g_form.setVisible('u_campo_secreto', false)`    |

**Dica de ouro:** Para campos obrigatórios, sempre combine `setMandatory(true)` com uma mensagem visual via `showFieldMsg`.

### Métodos de utilidade

| Método                     | O que faz                                | Exemplo                                        |
| -------------------------- | ---------------------------------------- | ---------------------------------------------- |
| `g_form.getControl(campo)` | Obtém o elemento DOM do campo (avançado) | Mudar estilo CSS                               |
| `g_form.getLabelOf(campo)` | Obtém o label (rótulo) do campo          | `g_form.getLabelOf('priority')` → "Prioridade" |

---

## Referência completa: g_user (Client Script)

| Propriedade/Método            | O que faz                                      | Retorna              | Exemplo                                |
| ----------------------------- | ---------------------------------------------- | -------------------- | -------------------------------------- |
| `g_user.userName`             | Nome de usuário (login)                        | String               | `g_user.userName` → "mendelson.aleixo" |
| `g_user.userID`               | Sys ID único do usuário                        | String (32 chars)    | `g_user.userID` → "abc123def456..."    |
| `g_user.firstName`            | Primeiro nome do usuário                       | String               | `g_user.firstName` → "Mendelson"       |
| `g_user.lastName`             | Sobrenome do usuário                           | String               | `g_user.lastName` → "Aleixo"           |
| `g_user.hasRole(role)`        | Verifica se usuário possui um papel específico | Boolean (true/false) | `g_user.hasRole('itil')`               |
| `g_user.hasRoleExactly(role)` | Verifica papel exato (sem herança)             | Boolean              | Para casos específicos                 |

**Exemplo prático com g_user:**

```javascript
function onLoad() {
  // Exibe saudação personalizada
  g_form.addInfoMessage("Olá, " + g_user.firstName + "!");

  // Verifica se é administrador
  if (g_user.hasRole("admin")) {
    g_form.setVisible("u_campos_admin", true);
    g_form.addInfoMessage("Você está no modo administrador.");
  } else {
    g_form.setVisible("u_campos_admin", false);
  }

  // Pré-preencher o campo "Solicitante" com o usuário logado
  g_form.setValue("caller_id", g_user.userID);
}
```

---

## Exemplo de código (Client Script onChange completo)

Este script valida o campo "Prioridade" e, se for Crítica, exige preenchimento do campo "Impacto no Negócio" e exibe um alerta estilizado.

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  // Ignora durante carregamento
  if (isLoading || isTemplate) {
    return;
  }

  // Obtém a prioridade selecionada (valor técnico)
  var prioridade = g_form.getValue("priority");

  // Se for prioridade Crítica (valor = 1)
  if (prioridade == "1") {
    // Torna o campo "Impacto no Negócio" obrigatório
    g_form.setMandatory("u_impacto_negocio", true);

    // Exibe mensagem de aviso abaixo do campo
    g_form.showFieldMsg(
      "u_impacto_negocio",
      "Para incidentes críticos, informe o impacto no negócio.",
      "warning",
    );

    // Exibe mensagem informativa no topo
    g_form.addInfoMessage("Incidente crítico registrado. Prioridade máxima.");

    // Opcional: altera a cor do campo (via CSS)
    // g_form.getControl('priority').style.backgroundColor = '#ffcccc';
  } else {
    // Se não for Crítica, remove a obrigatoriedade e limpa mensagens
    g_form.setMandatory("u_impacto_negocio", false);
    g_form.hideFieldMsg("u_impacto_negocio");
  }
}
```

**O que este código faz:**

1. Detecta quando o campo Prioridade muda
2. Se o valor for "1" (Crítica), torna outro campo obrigatório e exibe mensagens
3. Se o valor for qualquer outro, remove a obrigatoriedade
4. Tudo isso com feedback visual adequado (sem `alert()` intrusivo)

---

## Quando usar cada tipo de mensagem

| Situação                                       | Qual função usar                             | Por quê                                   |
| ---------------------------------------------- | -------------------------------------------- | ----------------------------------------- |
| Usuário fez algo errado em um campo específico | `g_form.showFieldMsg(campo, msg, 'error')`   | O erro fica claramente associado ao campo |
| Informação geral sobre o formulário            | `g_form.addInfoMessage(msg)`                 | Não atrapalha a edição                    |
| Erro grave que impede o envio                  | `g_form.addErrorMessage(msg)` no onSubmit    | Chama atenção antes de salvar             |
| Aviso sobre um campo                           | `g_form.showFieldMsg(campo, msg, 'warning')` | Menos severo que erro                     |
| Desenvolvimento/teste                          | `alert(msg)`                                 | Rápido, mas NÃO use em produção           |

---

## Erros comuns e boas práticas

| Erro                                             | Correção                                                                     |
| ------------------------------------------------ | ---------------------------------------------------------------------------- |
| Usar `alert()` em produção                       | Use `g_form.addInfoMessage()` ou `g_form.showFieldMsg()`                     |
| Esquecer `isLoading` no onChange                 | Adicione `if (isLoading) return;` sempre                                     |
| Usar `setValue` com label em campo Choice        | Use `setDisplayValue` para labels, `setValue` para valores técnicos          |
| Não limpar mensagens antigas                     | Use `hideFieldMsg(campo)` antes de mostrar novas mensagens                   |
| Confundir `getValue` com `getDisplayValue`       | `getValue` = valor técnico; `getDisplayValue` = texto exibido                |
| Acreditar que `setMandatory` mostra aviso visual | `setMandatory` só controla obrigatoriedade; use `showFieldMsg` para feedback |

**Boas práticas adicionais:**

- Sempre documente seus scripts com comentários (quem, quando, por quê)
- Use nomes de variáveis descritivos (`prioridade` não `p`)
- Agrupe validações relacionadas em funções separadas
- Teste com diferentes perfis de usuário usando `Impersonate User`

---

## Links úteis

- [Documentação oficial - g_form API](https://developer.servicenow.com/dev.do#!/reference/api/tokyo/client/c_ClientSideAPI)
- [Documentação oficial - g_user API](https://developer.servicenow.com/dev.do#!/reference/api/tokyo/client/g_user_ClientSideAPI)
- [Boas práticas de Client Scripts](https://www.servicenow.com/community/developer-blog/best-practices-for-client-scripts/ba-p/2301234)

---

## Minhas anotações pessoais

_[preenche após a prática]_

- Hoje aprendi que `g_form` é o controle remoto do formulário
- `g_form.getValue()` e `g_form.getDisplayValue()` são diferentes para campos Choice
- `g_user.hasRole()` é útil para personalizar a interface por perfil
- Para produção, nunca usar `alert()` – sempre usar `g_form.addInfoMessage()` ou `showFieldMsg()`
- `isLoading` é obrigatório no onChange para evitar execução durante carregamento do formulário
- Campos Reference exigem `g_form.getReference()` para acessar propriedades do objeto relacionado

---

## Flashcards do Dia 2

[INICIO]
Pergunta: Qual a diferença entre g_form.getValue() e g_form.getDisplayValue()?
Resposta: getValue() retorna o valor técnico (ex: "3" para Prioridade Alta). getDisplayValue() retorna o label exibido (ex: "Alta").

Pergunta: Como obter o nome do usuário logado em um Client Script?
Resposta: g_user.firstName e g_user.lastName, ou g_user.userName para o login.

Pergunta: Como verificar se um usuário tem o papel "itil" em um Client Script?
Resposta: g_user.hasRole('itil') retorna true ou false.

Pergunta: Qual a função correta para exibir uma mensagem de erro abaixo de um campo específico?
Resposta: g_form.showFieldMsg('nome_do_campo', 'mensagem de erro', 'error').

Pergunta: O que acontece se você usar g_form.setDisplayValue() em um campo Choice?
Resposta: O ServiceNow encontra o valor técnico correspondente ao label informado e o define.

Pergunta: Por que devemos evitar alert() em Client Scripts de produção?
Resposta: Porque alert() trava a interface, é invasivo e oferece experiência ruim ao usuário. Use g_form.addInfoMessage() ou showFieldMsg().

Pergunta: Qual a primeira linha que deve vir em um Client Script onChange?
Resposta: if (isLoading || isTemplate) return; para ignorar execução durante carregamento do formulário.

Pergunta: Como tornar um campo obrigatório via Client Script?
Resposta: g_form.setMandatory('nome_do_campo', true).

Pergunta: Como limpar mensagens de erro de um campo específico?
Resposta: g_form.hideFieldMsg('nome_do_campo').

Pergunta: Qual método deve ser usado para buscar dados de um campo Reference (ex: buscar o telefone do usuário solicitante)?
Resposta: g_form.getReference('caller_id', function(record) { ... }); O callback recebe o objeto GlideRecord do registro referenciado.
[FIM]

---

## Prática do Dia 2

### Atividade 1 (obrigatória)

Criar um Client Script do tipo onLoad que:

1. Verifica se o campo "Short Description" (Descrição Curta) está vazio
2. Se estiver vazio, exibe uma mensagem de aviso em amarelo (warning) abaixo do campo
3. Se estiver preenchido, limpa a mensagem
4. Também exibe uma mensagem informativa no topo com o nome do usuário logado e a data/hora atual

Use:

- `g_user.firstName` para o nome do usuário
- `new Date()` para a data/hora
- `g_form.showFieldMsg()` para o aviso
- `g_form.addInfoMessage()` para a mensagem no topo

### Atividade 2 (desafio)

Criar um Client Script do tipo onLoad que:

1. Verifica se o usuário logado tem o papel `itil`
2. Se NÃO tiver, esconde o campo `assignment_group` (grupo atribuído) e exibe uma mensagem informativa
3. Se tiver, mantém o campo visível

Use `g_user.hasRole('itil')` e `g_form.setVisible()`.

### Entregável do dia

| Entregável                                        | Arquivo                                                           |
| ------------------------------------------------- | ----------------------------------------------------------------- |
| Print do código do Client Script onChange         | `entregaveis/prints/client-script-onchange-codigo.png`            |
| Print do formulário mostrando a mensagem de aviso | `entregaveis/prints/client-script-onchange-funcionando.png`       |
| (Desafio) Print do código do Client Script onLoad | `entregaveis/prints/client-script-onload-desafio-codigo.png`      |
| (Desafio) Print do formulário com campo escondido | `entregaveis/prints/client-script-onload-desafio-funcionando.png` |

---

## Checklist do Dia 2

- [ ] Li e compreendi o artigo sobre g_form e g_user
- [ ] Adicionei os flashcards ao Anki e revisei
- [ ] Criei o Client Script onChange no PDI
- [ ] Testei o script com diferentes prioridades
- [ ] (Desafio) Criei o Client Script onLoad com verificação de papel
- [ ] (Desafio) Testei o script com diferentes perfis de usuário
- [ ] Tirei os prints dos códigos
- [ ] Tirei os prints dos formulários funcionando
- [ ] Organizei os prints na pasta `entregaveis/prints/`
