# Business Rules: o que são, tipos (before/after, insert/update/delete/query) e quando usar cada

**Data:** 11/05/26\
**Semana:** 3 (Server Scripts)\
**Fonte:** SNAF Módulo 4 + Documentação Oficial + Prática própria\
**Tópico relacionado:** Client Scripts, GlideRecord, Script Includes, Eventos de Tabela

---

## O que é (definição simples)

Uma **Business Rule** é um script JavaScript que roda **no servidor** (lado do servidor) automaticamente quando um registro é **inserido, atualizado, deletado ou consultado** em uma tabela do ServiceNow.

Pense na Business Rule como um "vigilante invisível" que fica monitorando o banco de dados. Toda vez que alguém cria, altera, remove ou até mesmo apenas visualiza um registro, a Business Rule pode ser disparada para executar alguma lógica.

**Diferença fundamental que você deve guardar:**

| Característica        | Client Script                                 | Business Rule                                 |
| --------------------- | --------------------------------------------- | --------------------------------------------- |
| **Onde roda**         | Navegador (lado do cliente)                   | Servidor (lado do servidor)                   |
| **Quando executa**    | Durante interação do usuário com o formulário | Quando o registro é salvo/consultado no banco |
| **Pode ser burlada?** | Sim (usuário pode desabilitar JavaScript)     | Não (roda no servidor, seguro)                |
| **Feedback visual**   | ✅ Sim (mensagens, alertas)                   | ❌ Não (roda em background)                   |

**Regra de ouro:** Use Business Rule para **lógica que precisa ser confiável e segura**. Use Client Script para **feedback ao usuário**.

---

## Para que serve (casos de uso com exemplos práticos)

| Caso de uso                          | Exemplo                                           | Tipo de Business Rule              |
| ------------------------------------ | ------------------------------------------------- | ---------------------------------- |
| **Validar dados antes de salvar**    | Impedir incidente sem descrição                   | `before insert`                    |
| **Preencher campos automaticamente** | Calcular data de vencimento baseada em prioridade | `before insert` ou `before update` |
| **Notificar usuários**               | Enviar e-mail ao criar incidente crítico          | `after insert`                     |
| **Registrar log de alterações**      | Auditar quem mudou o campo "Prioridade"           | `after update`                     |
| **Criar registros relacionados**     | Ao fechar problema, criar artigo de conhecimento  | `after update`                     |
| **Impedir deleção**                  | Não permitir excluir incidente resolvido          | `before delete`                    |
| **Filtrar consultas (Query)**        | Ocultar incidentes de um grupo específico         | `before query`                     |

---

## Como fazer (passo a passo prático)

### Criar uma Business Rule no ServiceNow

1. No filtro de navegação, digite `Business Rules`
2. Clique em `System Definition` → `Business Rules`
3. Clique no botão `New`
4. Preencha os campos:
   - **Table:** Selecione a tabela (ex: `Incident [incident]`)
   - **Name:** Dê um nome descritivo (ex: `Validar descrição ao criar incidente`)
   - **Order:** Número de ordem de execução (100 é o padrão)
5. Selecione **When to run** (quando executar):
   - **Before** (antes) / **After** (depois)
   - **Insert** (inserir) / **Update** (atualizar) / **Delete** (deletar) / **Query** (consultar)
6. **Condition:** (opcional) Condição para executar (ex: `current.priority == 1`)
7. No campo **Advanced** (ou Script), escreva seu código JavaScript
8. Marque **Active** (checkbox) para ativar a Business Rule
9. Clique em `Submit`

### Estrutura básica de uma Business Rule

```Javascript
(function executeRule(current, previous /*null quando insert*/ ) {

    // Lógica
    // current: o registro que está sendo processado
    // previous: o registro ANTES da mudança (apenas para update)

    gs.info('Business Rule executada para o incidente: ' + current.number);

})(current, previous);
```

---

## Os 4 eventos principais (INSERT, UPDATE, DELETE, QUERY)

### 1. INSERT

Executa quando um **novo registro é criado**.

| Momento         | `current`                                       | `previous` |
| --------------- | ----------------------------------------------- | ---------- |
| `before insert` | O registro que será salvo (ainda não foi salvo) | `null`     |
| `after insert`  | O registro já salvo (com sys_id gerado)         | `null`     |

**Exemplo prático (before insert): Validar descrição**

```Javascript
(function executeRule(current, previous) {

    if (current.short_description == '') {
        gs.addErrorMessage('A descrição do incidente é obrigatória.');
        current.setAbortAction(true); // IMPEDE O SALVAMENTO
    }

})(current, previous);
```

**Exemplo prático (after insert): Notificar grupo**

```Javascript
(function executeRule(current, previous) {

    var grupo = current.assignment_group.getDisplayValue();
    gs.eventQueue('incident.created', current, grupo, current.number);

})(current, previous);
```

---

### 2. UPDATE

Executa quando um **registro existente é modificado**.

| Momento         | `current`                                          | `previous`                        |
| --------------- | -------------------------------------------------- | --------------------------------- |
| `before update` | O registro com os NOVOS valores (ainda não salvos) | O registro com os VALORES ANTIGOS |
| `after update`  | O registro já salvo com os novos valores           | O registro com os VALORES ANTIGOS |

**Exemplo prático (before update): Impedir reabertura de incidente fechado**

```Javascript
(function executeRule(current, previous) {

    if (previous.state == 6 && current.state != 6) {
        gs.addErrorMessage('Incidentes fechados não podem ser reabertos.');
        current.setAbortAction(true);
    }

})(current, previous);
```

**Exemplo prático (after update): Log de mudança de prioridade**

```Javascript
(function executeRule(current, previous) {

    if (current.priority != previous.priority) {
        gs.info('Prioridade do incidente ' + current.number + ' alterada de ' +
                 previous.priority + ' para ' + current.priority);
    }

})(current, previous);
```

---

### 3. DELETE

Executa quando um **registro é removido**.

| Momento         | `current`                                               | `previous` |
| --------------- | ------------------------------------------------------- | ---------- |
| `before delete` | O registro que será deletado                            | `null`     |
| `after delete`  | O registro já foi deletado (não pode mais ser acessado) | `null`     |

**Exemplo prático (before delete): Impedir deleção de incidente crítico**

```Javascript
(function executeRule(current, previous) {

    if (current.priority == 1) {
        gs.addErrorMessage('Incidentes críticos não podem ser excluídos.');
        current.setAbortAction(true);
    }

})(current, previous);
```

---

### 4. QUERY

Executa **antes de uma consulta ser feita na tabela**. Usado para **filtrar registros** que o usuário pode ver.

| Momento        | `current`                                         | `previous` |
| -------------- | ------------------------------------------------- | ---------- |
| `before query` | Objeto que permite adicionar condições à consulta | `null`     |

**Exemplo prático (before query): Ocultar incidentes de um grupo específico**

```Javascript
(function executeRule(current, previous) {

    // Adiciona condição para NÃO mostrar incidentes do grupo "Interno"
    current.addQuery('assignment_group.name', '!=', 'Internal');

})(current, previous);
```

---

## Before vs After (quando usar cada)

| Critério                             | Before                               | After                              |
| ------------------------------------ | ------------------------------------ | ---------------------------------- |
| **Momento**                          | ANTES de salvar no banco             | DEPOIS de salvar no banco          |
| **Pode impedir salvamento?**         | ✅ Sim (`setAbortAction(true)`)      | ❌ Não (já salvou)                 |
| **Pode acessar valores antigos?**    | ✅ Sim (`previous`)                  | ✅ Sim (`previous`)                |
| **Pode modificar o registro atual?** | ✅ Sim                               | ⚠️ Sim, mas precisa de novo update |
| **Sys_id está disponível?**          | ❌ Não (ainda não foi gerado)        | ✅ Sim                             |
| **Use para**                         | Validações, preenchimento automático | Notificações, ações assíncronas    |

**Regra de ouro:** Use `before` para VALIDAR e IMPEDIR. Use `after` para NOTIFICAR e REGISTRAR.

---

## Business Rule vs Client Script (comparação)

| Critério                     | Business Rule                          | Client Script                         |
| ---------------------------- | -------------------------------------- | ------------------------------------- |
| **Onde roda**                | Servidor                               | Navegador (cliente)                   |
| **Segurança**                | ✅ Segura (não pode ser burlada)       | ❌ Pode ser desabilitada              |
| **Mensagens ao usuário**     | ❌ Limitada (`gs.addErrorMessage()`)   | ✅ Completa (`g_form.showFieldMsg()`) |
| **Pode impedir salvamento?** | ✅ Sim (`setAbortAction`)              | ✅ Sim (`return false` no onSubmit)   |
| **Acesso ao servidor**       | ✅ Direto                              | ❌ Indireto (via GlideAjax)           |
| **Performance em lote**      | ✅ Excelente                           | ❌ Não se aplica                      |
| **Feedback visual**          | ❌ Não                                 | ✅ Sim                                |
| **Quando usar**              | Lógica confiável, segurança, automação | Feedback, validações rápidas          |

---

## Erros comuns e boas práticas

| Erro                                                 | Por que acontece                                       | Correção                                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **Loop infinito**                                    | Business Rule atualiza o registro e chama a si mesma   | Adicionar verificação `if (current.operation() == 'insert')` ou verificar se valores realmente mudaram |
| **Esquecer `setAbortAction`**                        | O script valida mas não impede o salvamento            | Após detecção de erro, chamar `current.setAbortAction(true)`                                           |
| **Usar `gs.addErrorMessage()` sem `setAbortAction`** | Mensagem aparece, mas registro é salvo                 | Sempre combine com `setAbortAction(true)`                                                              |
| **Modificar `current` no `after`**                   | O registro já foi salvo, modificações não terão efeito | Use `before` para modificações ou faça um novo `update()`                                              |
| **Não tratar `previous` em update**                  | `previous` é `null` em insert                          | Sempre verificar `if (previous)` antes de usar                                                         |

---

## Links úteis

- [Documentação oficial - Business Rules](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/configure/business-rules/concept/c_BusinessRules.html)
- [Referência da API GlideRecord](https://developer.servicenow.com/dev.do#!/reference/api/tokyo/server/c_GlideRecordAPI)

---

## Minhas anotações pessoais

- `before` vs `after`: before para validar/impedir; after para notificar
- `current` tem o registro atual; `previous` tem o valor antigo (apenas em update)
- `setAbortAction(true)` impede o salvamento (essencial para validações)
- Query Business Rule é poderosa para filtrar dados por regra de negócio
- Loop infinito é o erro mais comum — sempre verificar se valores realmente mudaram

---

## Flashcards do Dia 1

[INICIO_CODIGO]
Pergunta: O que é uma Business Rule no ServiceNow?
Resposta: É um script JavaScript que roda no servidor automaticamente quando um registro é inserido, atualizado, deletado ou consultado em uma tabela.

Pergunta: Qual a principal diferença entre Business Rule e Client Script?
Resposta: Business Rule roda no servidor (segura, não pode ser burlada). Client Script roda no navegador (feedback visual imediato, mas pode ser desabilitado).

Pergunta: Quais são os 4 eventos principais que uma Business Rule pode interceptar?
Resposta: Insert (inserir), Update (atualizar), Delete (deletar) e Query (consultar).

Pergunta: Qual a diferença entre antes (before) e depois (after) em Business Rules?
Resposta: Before executa ANTES de salvar (pode impedir salvamento com setAbortAction). After executa DEPOIS de salvar (já tem sys_id, não pode impedir).

Pergunta: O que o comando `current.setAbortAction(true)` faz?
Resposta: Impede o salvamento do registro. Usado em Business Rules do tipo before para cancelar a operação.

Pergunta: O que o parâmetro `previous` representa em uma Business Rule de update?
Resposta: Representa o registro com os VALORES ANTIGOS antes da atualização. Usado para comparar com `current`.

Pergunta: Em qual tipo de Business Rule o `previous` é `null`?
Resposta: Em operações de insert e delete. Insert não tem valor anterior; delete não tem valor depois.

Pergunta: Para que serve uma Business Rule do tipo before query?
Resposta: Para adicionar condições a consultas de lista, filtrando automaticamente registros que o usuário pode ver.

Pergunta: Como evitar loop infinito em uma Business Rule?
Resposta: Verificando se os valores realmente mudaram antes de executar ações que disparam novas execuções, ou usando `if (current.operation() == 'insert')`.

Pergunta: Uma Business Rule do tipo after insert pode impedir o salvamento do registro?
Resposta: Não. O registro já foi salvo. Para impedir salvamento, use before insert com setAbortAction(true).
[FIM_CODIGO]

---

## Prática do Dia 1

### Atividade 1 (obrigatória)

Criar uma **Business Rule** do tipo `before insert` na tabela Incident que:

1. Verifica se o campo `short_description` (Descrição Curta) está vazio
2. Se estiver vazio, exibe uma mensagem de erro e **impede o salvamento** do incidente

---

### Atividade 2 (desafio)

Criar uma **Business Rule** do tipo `before insert e update` na tabela Incident que:

1. Verifica o conteúdo do campo `short_description` (Descrição Curta).
2. Avalia se a descrição contém palavras genéricas consideradas inválidas pelo Service Desk (ex: "teste", "urgente" ou "socorro").
3. Se o texto contiver alguma dessas palavras, exibe uma mensagem de erro educativa e **impede o salvamento**

---

### Entregável do dia

| Entregável                                                            | Arquivo                                               |
| --------------------------------------------------------------------- | ----------------------------------------------------- |
| Print do código da Business Rule (Atividade 1)                        | `entregaveis/prints/br-validar-descricao-codigo.png`  |
| Print da mensagem de erro ao criar incidente sem descrição            | `entregaveis/prints/br-validar-descricao-erro.png`    |
| (Desafio) Print do código da Business Rule (Atividade 2)              | `entregaveis/prints/br-descricao-invalida-codigo.png` |
| (Desafio) Print da mensagem de erro ao identificar palavras proibidas | `entregaveis/prints/br-descricao-invalida-erro.png`   |

---

### Checklist do Dia 1

- [x] Li e compreendi o artigo sobre Business Rules
- [x] Adicionei os flashcards ao Anki e revisei
- [x] Criei a Business Rule `before insert` da Atividade 1 no PDI
- [x] Testei: criar incidente sem descrição → erro e salvamento impedido ✅
- [x] Testei: criar incidente com descrição → salva normalmente ✅
- [x] (Desafio) Criei a Business Rule `before update` da Atividade 2
- [x] (Desafio) Testei: resolver incidente sem resolution_notes → erro ✅
- [x] (Desafio) Testei: resolver incidente com resolution_notes → sucesso ✅
- [x] Tirei os prints dos códigos
- [x] Tirei os prints dos formulários funcionando
- [x] Organizei os prints na pasta `entregaveis/prints/`

---
