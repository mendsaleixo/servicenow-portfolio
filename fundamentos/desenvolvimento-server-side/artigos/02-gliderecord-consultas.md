# GlideRecord: consultas simples (get, query, addQuery)

**Data:** 12/05/26\
**Semana:** 3 (Server Scripts)\
**Fonte:** SNAF Módulo 4 + Prática própria\
**Tópico relacionado:** Business Rules, Background Scripts, Consultas de dados

---

## O que é (definição simples)

**GlideRecord** é a API do ServiceNow para consultar e manipular dados no banco de dados. Pense nela como um "SQL em JavaScript".

**O que preciso saber agora (nível Júnior):**

- Fazer consultas simples (`get` e `query`)
- Filtrar resultados (`addQuery`)
- Percorrer resultados (`next()`)

**O que NÃO preciso saber agora:**

- Joins complexos
- Agregações avançadas
- GlideRecord em profundidade

**Onde vou usar GlideRecord como Júnior:**

- Em Background Scripts (testes rápidos)
- Para entender código legado (Business Rules existentes)
- Pequenas customizações em catálogo/fluxo

---

## Para que serve (casos de uso para Júnior)

| Caso de uso                               | Exemplo                                | Quão comum para Júnior |
| ----------------------------------------- | -------------------------------------- | ---------------------- |
| Consultar incidentes no Background Script | "Quantos incidentes críticos existem?" | ✅ Muito comum         |
| Buscar um registro específico             | "Achar incidente INC0012345"           | ✅ Muito comum         |
| Filtrar dados                             | "Listar incidentes abertos do grupo X" | ✅ Comum               |
| Validar dados em Business Rule            | "Impedir duplicata"                    | ⚠️ Médio               |
| Atualizar dados em lote                   | "Mover incidentes de grupo"            | ⚠️ Médio (cuidado)     |

---

## Como fazer (passo a passo prático)

### Estrutura básica de uma consulta

No **Scripts Background** (filtro de navegação → digite `Scripts Background`):

```javascript
// 1. Criar a consulta para a tabela Incident
var gr = new GlideRecord("incident");

// 2. Adicionar condições (filtros)
gr.addQuery("priority", 1); // Prioridade Crítica
gr.addQuery("active", true); // Apenas ativos

// 3. Executar a consulta
gr.query();

// 4. Percorrer os resultados
while (gr.next()) {
  gs.info(gr.number + " - " + gr.short_description);
}
```

---

## Métodos essenciais (que preciso agora)

### 1. `new GlideRecord(tabela)`

Cria uma consulta para uma tabela.

```javascript
// Incidentes
var grInc = new GlideRecord("incident");

// Usuários
var grUser = new GlideRecord("sys_user");

// Problemas
var grProb = new GlideRecord("problem");
```

---

### 2. `addQuery(campo, valor)` ou `addQuery(campo, operador, valor)`

Adiciona uma condição (filtro) à consulta.

```javascript
var gr = new GlideRecord("incident");

// Igual (operador padrão)
gr.addQuery("priority", 1);

// Com operador explícito
gr.addQuery("priority", "=", 1);

// Diferente
gr.addQuery("state", "!=", 6);

// Contém texto
gr.addQuery("short_description", "CONTAINS", "servidor");

// Maior que (datas)
gr.addQuery("sys_created_on", ">", gs.daysAgoStart(7));

gr.query();
```

**Operadores mais úteis:**

| Operador          | O que faz     | Exemplo                                               |
| ----------------- | ------------- | ----------------------------------------------------- |
| `=` (padrão)      | Igual         | `gr.addQuery('priority', 1)`                          |
| `!=`              | Diferente     | `gr.addQuery('state', '!=', 6)`                       |
| `CONTAINS`        | Contém texto  | `gr.addQuery('short_description', 'CONTAINS', 'vpn')` |
| `>` `<` `>=` `<=` | Comparação    | `gr.addQuery('priority', '>', 2)`                     |
| `IN`              | Está na lista | `gr.addQuery('priority', 'IN', '1,2')`                |

---

### 3. `query()`

Executa a consulta. **Nunca esquecer!**

```javascript
var gr = new GlideRecord("incident");
gr.addQuery("active", true);
gr.query(); // <-- SEMPRE chamar antes do next()
```

---

### 4. `next()`

Move para o próximo registro. Retorna `true` se existe, `false` se acabou.

```javascript
var gr = new GlideRecord("incident");
gr.query();

while (gr.next()) {
  // Processa cada registro
  gs.info(gr.number);
}
```

---

### 5. `get(sys_id)` ou `get(campo, valor)`

Busca um registro específico (NÃO precisa de `query()` e `next()`).

```javascript
var gr = new GlideRecord("incident");

// Buscar por sys_id (mais rápido)
if (gr.get("abc123def456")) {
  gs.info("Encontrado: " + gr.number);
}

// Buscar por número do incidente
if (gr.get("number", "INC0012345")) {
  gs.info("Encontrado: " + gr.short_description);
} else {
  gs.info("Não encontrado");
}
```

---

### 6. `getValue(campo)` e acesso direto

Para acessar valores do registro.

```javascript
var gr = new GlideRecord("incident");
gr.get("number", "INC0012345");

// Acesso direto (recomendado)
var numero = gr.number;
var descricao = gr.short_description;

// getValue() (útil para nomes de campo dinâmicos)
var prioridade = gr.getValue("priority");

// getDisplayValue() (pega o label, não o valor técnico)
var prioridadeLabel = gr.getDisplayValue("priority"); // "Critical"
```

---

### 7. `getRowCount()`

Conta quantos registros a consulta retornou.

```javascript
var gr = new GlideRecord("incident");
gr.addQuery("priority", 1);
gr.query();

var total = gr.getRowCount();
gs.info("Total de incidentes críticos: " + total);
```

---

### 8. `setLimit(n)` e `orderBy(campo)`

Limita e ordena resultados.

```javascript
var gr = new GlideRecord("incident");
gr.addQuery("active", true);
gr.setLimit(10); // Máximo 10 resultados
gr.orderByDesc("sys_created_on"); // Mais recentes primeiro
gr.query();

while (gr.next()) {
  gs.info(gr.number + " - " + gr.sys_created_on);
}
```

---

## Exemplos práticos (para testar no Scripts Background)

### Exemplo 1: Listar incidentes críticos abertos

```javascript
var gr = new GlideRecord("incident");
gr.addQuery("priority", 1);
gr.addQuery("active", true);
gr.orderByDesc("sys_created_on");
gr.setLimit(10);
gr.query();

gs.info("=== INCIDENTES CRÍTICOS ABERTOS ===");
while (gr.next()) {
  gs.info(gr.number + " - " + gr.short_description);
}
```

---

### Exemplo 2: Buscar um incidente por número

```javascript
var numeroBusca = "INC0012345";

var gr = new GlideRecord("incident");
if (gr.get("number", numeroBusca)) {
  gs.info("=== INCIDENTE ENCONTRADO ===");
  gs.info("Número: " + gr.number);
  gs.info("Descrição: " + gr.short_description);
  gs.info("Prioridade: " + gr.getDisplayValue("priority"));
  gs.info("Estado: " + gr.getDisplayValue("state"));
  gs.info("Grupo: " + gr.assignment_group.getDisplayValue());
} else {
  gs.error("Incidente " + numeroBusca + " não encontrado.");
}
```

---

### Exemplo 3: Contar incidentes por prioridade

```javascript
var prioridades = [
  { valor: 1, nome: "Crítica" },
  { valor: 2, nome: "Alta" },
  { valor: 3, nome: "Média" },
  { valor: 4, nome: "Baixa" },
];

for (var i = 0; i < prioridades.length; i++) {
  var gr = new GlideRecord("incident");
  gr.addQuery("priority", prioridades[i].valor);
  gr.query();

  gs.info(
    "Prioridade " +
      prioridades[i].nome +
      ": " +
      gr.getRowCount() +
      " incidentes",
  );
}
```

---

## Erros comuns (e como evitar)

| Erro                               | Correção                                                              |
| ---------------------------------- | --------------------------------------------------------------------- |
| **Esquecer `query()`**             | Sempre chamar `gr.query()` antes do `while(gr.next())`                |
| **Usar `getValue()` sem `get()`**  | `getValue()` só funciona após `get()` ou `next()`                     |
| **Loop infinito ao atualizar**     | Não atualizar registros dentro da mesma consulta que está percorrendo |
| **Não tratar quando não encontra** | Sempre usar `if (gr.get(...))` antes de acessar valores               |

---

## Links úteis

- [Documentação GlideRecord (ServiceNow)](https://developer.servicenow.com/dev.do#!/reference/api/tokyo/server/c_GlideRecordAPI)

---

## Minhas anotações pessoais

- GlideRecord é o "SQL do ServiceNow"
- `get()` busca UM registro; `query()` busca VÁRIOS
- `query()` + `next()` é o padrão para listas
- `getDisplayValue()` pega o label, `getValue()` pega o valor técnico
- Para Júnior, saber consultar é mais importante que saber atualizar

---

## Flashcards do Dia 2

[INICIO_CODIGO]
Pergunta: O que é GlideRecord no ServiceNow?
Resposta: É a API para consultar e manipular dados no banco de dados. Equivalente ao SQL em JavaScript.

Pergunta: Qual a diferença entre get() e query()?
Resposta: get() busca um registro específico (não precisa de query() nem next()). query() busca múltiplos registros (precisa de next() para percorrer).

Pergunta: O que acontece se você esquecer de chamar query() antes de next()?
Resposta: A consulta não é executada. next() retorna false e nada é processado.

Pergunta: Como buscar um incidente pelo número INC0012345?
Resposta: var gr = new GlideRecord('incident'); gr.get('number', 'INC0012345');

Pergunta: Como listar todos os incidentes ativos (active = true)?
Resposta: var gr = new GlideRecord('incident'); gr.addQuery('active', true); gr.query(); while (gr.next()) { ... }

Pergunta: Qual a diferença entre getValue() e getDisplayValue()?
Resposta: getValue() retorna o valor técnico (ex: "1"). getDisplayValue() retorna o label exibido (ex: "Critical").

Pergunta: Como contar quantos incidentes críticos existem?
Resposta: var gr = new GlideRecord('incident'); gr.addQuery('priority', 1); gr.query(); var total = gr.getRowCount();

Pergunta: Para que serve setLimit() no GlideRecord?
Resposta: Limita o número máximo de registros retornados pela consulta. Útil para performance.
[FIM_CODIGO]

---

## Prática do Dia 2 (GlideRecord)

### Atividade (obrigatória)

No **Scripts Background**, escreva um script que:

1. Busca todos os incidentes com prioridade **Crítica** (priority = 1)
2. Exibe no log o número e descrição curta de cada um
3. Exibe a quantidade total encontrada

**Passo a passo:**

1. No filtro de navegação, digite `Scripts Background`
2. Clique em `System Definition` → `Scripts Background`
3. Cole o código
4. Clique em `Run script`
5. Verifique o resultado no log (`System Logs` → `System Log` → `All`)

---

### Desafio (opcional - praticar mais)

Escreva um script que:

1. Pede um número de incidente (substitua na variável)
2. Busca este incidente
3. Exibe: número, descrição, prioridade (label), estado (label), grupo atribuído

---

### Entregável do dia

| Entregável                            | Arquivo                                                |
| ------------------------------------- | ------------------------------------------------------ |
| Print do código no Scripts Background | `entregaveis/prints/gliderecord-codigo.png`            |
| Print do resultado no log             | `entregaveis/prints/gliderecord-resultado.png`         |
| (Desafio) Print do código             | `entregaveis/prints/gliderecord-desafio-codigo.png`    |
| (Desafio) Print do resultado          | `entregaveis/prints/gliderecord-desafio-resultado.png` |

---

### Checklist do Dia 2

- [ ] Li e compreendi o artigo sobre GlideRecord
- [ ] Adicionei os flashcards ao Anki e revisei
- [ ] Executei a atividade no Scripts Background
- [ ] Verifiquei os resultados no System Log
- [ ] (Opcional) Executei o desafio
- [ ] Tirei os prints dos códigos
- [ ] Tirei os prints dos resultados
- [ ] Organizei os prints na pasta `entregaveis/prints/`

---
