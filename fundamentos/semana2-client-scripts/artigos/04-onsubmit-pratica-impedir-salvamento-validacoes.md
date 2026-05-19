# onSubmit na prática: impedir salvamento com validações

**Data:** 07/05/26\
**Semana:** 2 (UI Scripts)\
**Fonte:** SNAF Módulo 4 + Documentação Oficial + Prática própria\
**Tópico relacionado:** Client Scripts, onSubmit, Validação de Dados, Prevenção de Salvamento

---

##

O que é (definição simples)

O **onSubmit** é o tipo de Client Script que executa **no momento exato em que o usuário tenta salvar o formulário** – seja clicando em "Submit", "Update" ou qualquer botão que envie os dados para o servidor.

Pense no onSubmit como o **"último fiscal"** antes dos dados serem salvos no banco. Ele permite que você:

- Verifique se todos os campos obrigatórios estão preenchidos
- Valide se os dados estão no formato correto (ex: CPF, e-mail, telefone)
- Exiba mensagens de erro claras para o usuário
- **Impeça o salvamento** se alguma validação falhar

**Diferença fundamental:** Enquanto o `onChange` valida à medida que o usuário preenche, o `onSubmit` é a **última linha de defesa** antes do salvamento. Ele garante que dados inconsistentes nunca cheguem ao banco de dados.

---

## Para que serve (casos de uso com exemplos práticos)

| Caso de uso                          | Exemplo                                                       | Consequência se não validar                                                                      |
| ------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Campos obrigatórios condicionais** | "Se prioridade for Crítica, Impacto no Negócio é obrigatório" | Incidente crítico sem impacto registrado. _OBS: validação condicional simples, usar UI polices._ |
| **Validação de formato**             | E-mail deve ter "@" e domínio válido                          | Dados inconsistentes no banco. **_Aqui está o principal uso do onSubmit!_**                      |
| **Campos numéricos**                 | "Horas trabalhadas não pode ser negativa"                     | Métricas erradas                                                                                 |
| **Regras de negócio**                | "Não permitir fechar incidente sem solução documentada"       | Incidente fechado sem resolução real                                                             |
| **Consistência entre campos**        | "Data fim não pode ser menor que data início"                 | Registro sem sentido lógico                                                                      |

---

## Como fazer (passo a passo prático)

### Estrutura básica de um Client Script onSubmit

```javascript
function onSubmit() {
  // 1. Coletar os valores dos campos
  var campo1 = g_form.getValue("nome_campo_1");
  var campo2 = g_form.getValue("nome_campo_2");

  // 2. Array para armazenar mensagens de erro
  var erros = [];

  // 3. Validações
  if (campo1 == "") {
    erros.push("O campo 1 é obrigatório.");
    g_form.showFieldMsg("nome_campo_1", "Campo obrigatório", "error");
  }

  if (campo2 != "" && campo2 < 0) {
    erros.push("O campo 2 não pode ser negativo.");
    g_form.showFieldMsg("nome_campo_2", "Valor não pode ser negativo", "error");
  }

  // 4. Se houver erros, impedir salvamento
  if (erros.length > 0) {
    g_form.addErrorMessage(
      "Por favor, corrija os seguintes erros:\n\n - " + erros.join("\n - "),
    );
    return false; // ⚠️ IMPEDE O SALVAMENTO
  }

  // 5. Se passou por todas as validações, permite salvar
  return true; // Opcional, pois true é o padrão
}
```

### Parâmetros do onSubmit

| Assinatura da função           | Quando usar           | Observação                                       |
| ------------------------------ | --------------------- | ------------------------------------------------ |
| `function onSubmit()`          | Uso mais comum        | Versão padrão, funciona em todas as versões      |
| `function onSubmit(isLoading)` | Versões mais recentes | `isLoading` indica se formulário está carregando |

### O que `return false` faz?

| Retorno                          | Efeito                                                           |
| -------------------------------- | ---------------------------------------------------------------- |
| `return false`                   | **IMPEDE** o salvamento. O formulário não é enviado ao servidor. |
| `return true` (ou nenhum return) | **PERMITE** o salvamento. Os dados são enviados ao servidor.     |
| `return` (vazio)                 | **PERMITE** o salvamento. Equivalente a `return true`.           |

---

## Exemplos de código completos

### Exemplo 1: Validação de campos obrigatórios (básico)

Este script verifica se a Descrição Curta e o Grupo Atribuído estão preenchidos.

```javascript
function onSubmit() {
  var erros = [];

  // Valida Descrição Curta
  var descricao = g_form.getValue("short_description");
  if (descricao == "") {
    erros.push("A Descrição Curta é obrigatória.");
    g_form.showFieldMsg("short_description", "Campo obrigatório", "error");
  }

  // Valida Grupo Atribuído
  var grupo = g_form.getValue("assignment_group");
  if (grupo == "") {
    erros.push("Selecione um grupo para atribuir este incidente.");
    g_form.showFieldMsg("assignment_group", "Selecione um grupo", "error");
  }

  if (erros.length > 0) {
    g_form.addErrorMessage(
      "❌ Não foi possível salvar:\n\n - " + erros.join("\n - "),
    );
    return false;
  }

  return true;
}
```

---

### Exemplo 2: Validação condicional (baseada em prioridade)

Este script valida diferentes regras dependendo da prioridade selecionada.

```javascript
function onSubmit() {
  var erros = [];
  var prioridade = g_form.getValue("priority");

  // Validação para prioridade Crítica (1)
  if (prioridade == "1") {
    var impacto = g_form.getValue("u_impacto_negocio");
    if (impacto == "") {
      erros.push(
        'Para incidentes CRÍTICOS, o campo "Impacto no Negócio" é obrigatório.',
      );
      g_form.showFieldMsg(
        "u_impacto_negocio",
        "Obrigatório para incidentes críticos",
        "error",
      );
    }

    var setor = g_form.getValue("u_setor_afetado");
    if (setor == "") {
      erros.push("Para incidentes CRÍTICOS, informe o setor afetado.");
      g_form.showFieldMsg(
        "u_setor_afetado",
        "Informe o setor afetado",
        "error",
      );
    }
  }

  // Validação para prioridade Alta (2)
  if (prioridade == "2") {
    var descricao = g_form.getValue("short_description");
    if (descricao == "" || descricao.length < 10) {
      erros.push(
        "Para incidentes de ALTA prioridade, a descrição deve ter pelo menos 10 caracteres.",
      );
      g_form.showFieldMsg(
        "short_description",
        "Mínimo de 10 caracteres",
        "error",
      );
    }
  }

  if (erros.length > 0) {
    g_form.addErrorMessage(
      "⚠️ Por favor, corrija os seguintes erros:\n\n - " + erros.join("\n - "),
    );
    return false;
  }

  g_form.addInfoMessage("✅ Incidente validado com sucesso! Salvando...");
  return true;
}
```

---

### Exemplo 3: Validação de formato (e-mail, telefone, CPF)

Este script valida e-mail e telefone com expressões regulares (regex).

```javascript
function onSubmit() {
  var erros = [];

  // Validação de e-mail
  var email = g_form.getValue("u_email_contato");
  if (email != "") {
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      erros.push(
        "O e-mail informado não é válido. Use o formato: usuario@dominio.com",
      );
      g_form.showFieldMsg("u_email_contato", "E-mail inválido", "error");
    }
  }

  // Validação de telefone (11 dígitos: DDD + 9 números)
  var telefone = g_form.getValue("u_telefone");
  if (telefone != "") {
    var telefoneNumeros = telefone.replace(/\D/g, "");
    if (telefoneNumeros.length != 11) {
      erros.push(
        "O telefone deve ter 11 dígitos (DDD + 9 dígitos). Ex: 11999999999",
      );
      g_form.showFieldMsg(
        "u_telefone",
        "Telefone deve ter 11 dígitos",
        "error",
      );
    }
  }

  if (erros.length > 0) {
    g_form.addErrorMessage(
      "❌ Corrija os erros antes de salvar:\n\n - " + erros.join("\n - "),
    );
    return false;
  }

  return true;
}
```

---

### Exemplo 4: Validação de datas (consistência entre campos)

Este script verifica se a "Data de Início" não é maior que a "Data de Término".

```javascript
function onSubmit() {
  var erros = [];

  var dataInicio = g_form.getValue("u_data_inicio");
  var dataFim = g_form.getValue("u_data_fim");

  if (dataInicio != "" && dataFim != "") {
    var inicio = new Date(dataInicio);
    var fim = new Date(dataFim);

    if (inicio > fim) {
      erros.push("A data de início não pode ser maior que a data de término.");
      g_form.showFieldMsg("u_data_inicio", "Data de início inválida", "error");
      g_form.showFieldMsg(
        "u_data_fim",
        "Data de término deve ser maior",
        "error",
      );
    }

    // Verifica se a diferença é muito grande (ex: mais de 30 dias)
    var diffDias = Math.ceil((fim - inicio) / (1000 * 60 * 60 * 24));
    if (diffDias > 30) {
      erros.push("O prazo máximo para este tipo de incidente é de 30 dias.");
      g_form.showFieldMsg(
        "u_data_fim",
        "Prazo máximo excedido (30 dias)",
        "warning",
      );
    }
  }

  if (erros.length > 0) {
    g_form.addErrorMessage(
      "⚠️ Correções necessárias:\n\n - " + erros.join("\n - "),
    );
    return false;
  }

  return true;
}
```

---

### Exemplo 5: Validação de conhecimento (prevenção de salvamento sem solução)

Este script impede que um incidente seja fechado sem uma solução documentada.

```javascript
function onSubmit() {
  var estado = g_form.getValue("state");
  var erros = [];

  // Se o usuário está tentando fechar o incidente (estado = Closed ou Resolved)
  if (estado == "3" || estado == "6") {
    // 3 = Resolved, 6 = Closed
    var solucao = g_form.getValue("close_notes");

    if (solucao == "" || solucao.length < 20) {
      erros.push(
        "Para fechar ou resolver um incidente, documente a solução com pelo menos 20 caracteres.",
      );
      g_form.showFieldMsg(
        "close_notes",
        "Documente a solução detalhadamente",
        "error",
      );
    }

    var workNotes = g_form.getValue("work_notes");
    if (workNotes == "") {
      erros.push(
        "Adicione notas de trabalho (Work Notes) antes de fechar o incidente.",
      );
      g_form.showFieldMsg("work_notes", "Work Notes obrigatórias", "warning");
    }
  }

  // Impede que um incidente crítico seja fechado sem aprovação
  var prioridade = g_form.getValue("priority");
  if (prioridade == "1" && estado == "6") {
    var aprovacao = g_form.getValue("approval");
    if (aprovacao != "approved") {
      erros.push(
        "Incidentes críticos precisam de aprovação antes de serem fechados.",
      );
      g_form.addErrorMessage(
        "⚠️ Aguarde a aprovação do gestor antes de fechar este incidente crítico.",
      );
      return false;
    }
  }

  if (erros.length > 0) {
    g_form.addErrorMessage(
      "❌ Não foi possível fechar o incidente:\n\n - " + erros.join("\n - "),
    );
    return false;
  }

  return true;
}
```

---

## Erros comuns no onSubmit

| Erro                                     | Por que acontece                                 | Correção                                                                   |
| ---------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------- |
| **Esquecer `return false`**              | O script valida mas não impede o salvamento      | Adicionar `return false` quando houver erro                                |
| **Não exibir mensagens claras**          | Usuário não sabe o que corrigir                  | Use `addErrorMessage()` ou `showFieldMsg()` com textos descritivos         |
| **Validar apenas um campo por vez**      | Vários erros, usuário corrige um e outro aparece | Use um `array` de erros e exiba todos de uma vez                           |
| **Usar `alert()` em produção**           | Invasivo e não fica registrado                   | Use `g_form.addErrorMessage()` ou `addInfoMessage()`                       |
| **Bloquear salvamento sem necessidade**  | Regra muito restritiva                           | Revise a regra de negócio; use `warning` em vez de `error` quando possível |
| **Esquecer de limpar mensagens antigas** | Mensagens antigas persistem                      | Use `hideFieldMsg()` antes de mostrar novas mensagens                      |

---

## onSubmit vs onChange (quando usar cada um)

| Situação                                                         | Use onSubmit      | Use onChange                     |
| ---------------------------------------------------------------- | ----------------- | -------------------------------- |
| Validar quando o usuário TENTA SALVAR                            | ✅                | ❌                               |
| Validar imediatamente após preencher um campo                    | ❌                | ✅                               |
| Validações que dependem de relacionamento entre múltiplos campos | ✅                | ⚠️ (pode, mas complexo)          |
| Validações que exigem busca no servidor (ex: CPF já cadastrado)  | ✅                | ✅ (com GlideAjax)               |
| Feedback instantâneo durante o preenchimento                     | ❌                | ✅                               |
| Impedir salvamento definitivamente                               | ✅ (return false) | ❌ (não impede salvamento final) |

### Regra de ouro

> **Use onChange para feedback IMEDIATO (UX) e onSubmit para validação FINAL (Integridade dos dados).**

Nunca confie apenas no onChange para validações críticas. Um usuário pode usar o teclado (Ctrl+S) ou outros métodos para salvar sem disparar o onChange.

---

## Testando seu onSubmit

### Como simular diferentes cenários de teste

| Cenário                        | Como testar                               | Resultado esperado              |
| ------------------------------ | ----------------------------------------- | ------------------------------- |
| Campos obrigatórios vazios     | Deixar Descrição Curta em branco          | Erro: "Descrição é obrigatória" |
| Prioridade Crítica sem Impacto | Selecionar Crítica, não preencher Impacto | Erro específico                 |
| Formato inválido (e-mail)      | Digitar "email_invalido"                  | Erro de formato                 |
| Tudo correto                   | Preencher todos os campos                 | Salva sem erros                 |

---

## Links úteis

- [Documentação oficial - onSubmit Client Scripts](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/configure/client-scripts/task/t_AddAnOnSubmitClientScript.html)
- [Referência da API g_form](https://developer.servicenow.com/dev.do#!/reference/api/tokyo/client/c_ClientSideAPI)

---

## Minhas anotações pessoais

- Hoje aprendi que `return false` no onSubmit IMPEDE o salvamento
- `g_form.addErrorMessage()` exibe mensagens vermelhas no topo
- Validar com array de erros é melhor porque o usuário vê todos os problemas de uma vez
- onSubmit é a última barreira antes do banco de dados
- onChange dá feedback imediato, onSubmit dá validação final
- Nunca confiar apenas no onChange para validações críticas
- SEMPRE usar UI Policy para comportamentos SIMPLES e declarativos.

---

## 🃏 Flashcards do Dia 4

[INICIO_CODIGO]
Pergunta: O que é um Client Script onSubmit no ServiceNow?
Resposta: É um script que executa no momento em que o usuário tenta salvar o formulário (clicando em Submit ou Update). Permite validar dados e pode impedir o salvamento.

Pergunta: Como impedir o salvamento em um Client Script onSubmit?
Resposta: Retornando `false` dentro da função onSubmit. Exemplo: `if (erro) { return false; }`

Pergunta: Qual a diferença entre onSubmit e onChange em relação ao momento de execução?
Resposta: onSubmit executa APENAS quando o usuário tenta salvar. onChange executa a cada mudança de campo (mas não impede o salvamento final).

Pergunta: Qual a função correta para exibir uma mensagem de erro vermelha no topo do formulário em um onSubmit?
Resposta: `g_form.addErrorMessage('Mensagem de erro aqui');`

Pergunta: Por que é recomendado usar um array de erros em vez de validar um campo por vez?
Resposta: Para mostrar TODOS os erros de uma vez ao usuário, evitando que ele corrija um erro e encontre outro em seguida (UX muito melhor).

Pergunta: O que acontece se você não colocar `return false` mesmo tendo erros no onSubmit?
Resposta: As mensagens de erro aparecem, mas o formulário AINDA ASSIM SERÁ SALVO (com dados inconsistentes).

Pergunta: Pode-se confiar apenas no onChange para validações críticas de negócio? Por quê?
Resposta: Não. Usuários podem salvar por outros meios (Ctrl+S, comandos do navegador) sem disparar o onChange. Sempre use onSubmit como validação final.

Pergunta: Qual a diferença entre `g_form.addErrorMessage()` e `g_form.showFieldMsg()`?
Resposta: addErrorMessage exibe mensagem no TOPO do formulário (erro geral). showFieldMsg exibe mensagem ABAIXO de um campo específico (erro localizado).

Pergunta: Em um cenário onde o usuário tenta fechar um incidente sem documentar a solução, qual validação deve ser usada?
Resposta: onSubmit, validando o campo `close_notes` (ou notes) antes de permitir a mudança de estado para Resolved/Closed.

Pergunta: Além de `return false`, o que mais é importante em um onSubmit?
Resposta: Exibir mensagens claras ao usuário usando `addErrorMessage()` ou `showFieldMsg()` para que ele saiba exatamente o que corrigir.
[FIM_CODIGO]

---

## Prática do Dia 4

### Atividade 1 (obrigatória)

Criar um Client Script do tipo **onSubmit** na tabela Incident que valide:

1. O campo `short_description` (Descrição Curta) não pode estar vazio
2. O campo `short_description` deve ter pelo menos 10 caracteres
3. Se a prioridade for **Crítica** (valor técnico `1`), o campo `u_impacto_negocio` (Impacto no Negócio) é obrigatório

---

### Atividade 2 (desafio)

Criar um Client Script do tipo **onSubmit** que:

1. Impede o fechamento de incidentes (estado = Resolved ou Closed) se o campo `close_notes` (ou `work_notes`) estiver vazio
2. Exige que `close_notes` tenha pelo menos 20 caracteres
3. Exibe mensagem de erro específica para o campo
4. Impede que um incidente crítico seja fechado sem aprovação (campo `approval` = `approved`)

---

### Entregável do dia

| Entregável                                                                        | Arquivo                                                        |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Print do código do Client Script onSubmit (Atividade 1)                           | `entregaveis/prints/client-script-onsubmit-codigo.png`         |
| Print do formulário mostrando erro de descrição vazia                             | `entregaveis/prints/onsubmit-erro-descricao-vazia.png`         |
| Print do formulário mostrando erro de descrição muito curta                       | `entregaveis/prints/onsubmit-erro-descricao-curta.png`         |
| Print do formulário mostrando erro de impacto obrigatório para prioridade crítica | `entregaveis/prints/onsubmit-erro-impacto-obrigatorio.png`     |
| (Desafio) Print do código do onSubmit com validação de fechamento                 | `entregaveis/prints/client-script-onsubmit-desafio-codigo.png` |
| (Desafio) Print do formulário mostrando erro de close_notes vazio                 | `entregaveis/prints/onsubmit-desafio-erro-close-notes.png`     |

---

### Checklist do Dia 4

- [x] Li e compreendi o artigo sobre onSubmit
- [x] Adicionei os flashcards ao Anki e revisei
- [x] Criei o Client Script onSubmit da Atividade 1 no PDI
- [x] Testei: descrição vazia → erro e salvamento impedido ✅
- [x] Testei: descrição com menos de 10 caracteres → erro ✅
- [x] Testei: prioridade crítica sem impacto → erro ✅
- [x] Testei: todos os campos válidos → salva com sucesso ✅
- [x] (Desafio) Criei o Client Script onSubmit da Atividade 2
- [x] (Desafio) Testei fechamento de incidente sem close_notes → erro ✅
- [x] (Desafio) Testei fechamento de incidente crítico sem aprovação → erro ✅
- [x] Tirei os prints dos códigos
- [x] Tirei os prints dos formulários funcionando
- [x] Organizei os prints na pasta `entregaveis/prints/`

---

**Próximo artigo:** Dia 5 — UI Policy vs Client Script (quando usar cada um)
