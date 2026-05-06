# onChange na prática: validar campos e preenchimento automático

**Data:** 06/05/2026\
**Semana:** 2 (UI Scripts)\
**Fonte:** SNAF Módulo 4 + Documentação Oficial + Prática própria\
**Tópico relacionado:** Client Scripts, onChange, Validação de Campos, Automação

---

## O que é (definição simples)

O **onChange** é o tipo de Client Script mais versátil e poderoso do ServiceNow. Ele é executado **sempre que um campo específico tem seu valor alterado e perde o foco** (evento "on blur" no JavaScript).

Pense no onChange como um "vigilante" que fica observando um campo. Quando o usuário muda o valor e sai do campo (clicando em outro lugar ou pressionando TAB), o script é disparado automaticamente.

**O que o onChange pode fazer por você:**

| Funcionalidade                     | Exemplo                                                            |
| ---------------------------------- | ------------------------------------------------------------------ |
| Validar dados                      | Verificar se o CEP digitado tem 8 dígitos                          |
| Buscar informações automaticamente | Preencher endereço completo a partir do CEP                        |
| Mostrar/esconder campos            | Exibir campo "Motivo da Rejeição" apenas se status for "Rejeitado" |
| Tornar campos obrigatórios         | Se prioridade for "Crítica", tornar "Impacto" obrigatório          |
| Exibir mensagens de alerta         | Avisar que um valor selecionado tem consequências                  |
| Alterar valores de outros campos   | Preencher "Descrição" automaticamente baseado na "Categoria"       |

---

## Para que serve (casos de uso com exemplos práticos)

### Caso 1: Validação de dados

**Cenário:** O usuário digita um número de telefone no campo `u_telefone_contato` e você quer garantir que ele tenha exatamente 11 dígitos.

**Comportamento esperado:** Se o usuário digitar um número inválido, exibir mensagem de erro e limpar o campo.

### Caso 2: Preenchimento automático

**Cenário:** O usuário seleciona um cliente no campo `u_cliente` (campo do tipo Reference). Você quer buscar automaticamente o endereço, telefone e e-mail desse cliente e preencher os campos correspondentes.

**Comportamento esperado:** Ao selecionar o cliente, o sistema busca os dados e preenche os campos de contato automaticamente.

### Caso 3: Comportamento condicional

**Cenário:** O usuário seleciona um setor no campo `u_setor_afetado`. Com base nessa escolha, você deseja exibir campos específicos (ex: se for "TI", mostrar campo `u_sistema_afetado`; se for "RH", mostrar campo `u_processo_rh`).

**Comportamento esperado:** Os campos aparecem e desaparecem conforme a seleção do usuário.

### Caso 4: Acumulador/Calculadora

**Cenário:** Em um catálogo de serviços, o usuário seleciona a quantidade de itens. Você quer calcular automaticamente o preço total (quantidade × preço unitário) e exibir em um campo.

**Comportamento esperado:** Ao alterar a quantidade, o preço total é recalculado instantaneamente.

---

## Como fazer (passo a passo prático)

### Estrutura básica de um Client Script onChange

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  // 1. SEMPRE verificar se o formulário está carregando
  if (isLoading || isTemplate) {
    return;
  }

  // 2. Sua lógica começa aqui
  var valor = g_form.getValue("nome_do_campo");

  // 3. Validação e ações
  if (valor == "1") {
    g_form.showFieldMsg("nome_do_campo", "Mensagem de aviso", "warning");
  } else {
    g_form.hideFieldMsg("nome_do_campo");
  }
}
```

### Parâmetros do onChange (você precisa conhecer cada um)

| Parâmetro    | O que é                             | Quando usar                                            | Exemplo                                          |
| ------------ | ----------------------------------- | ------------------------------------------------------ | ------------------------------------------------ |
| `control`    | O campo que disparou a mudança      | Scripts reutilizáveis onde não se sabe o nome do campo | `var nomeCampo = control.name;`                  |
| `oldValue`   | O valor do campo ANTES da mudança   | Comparar valor antigo com novo                         | Saber se o usuário mudou de um status para outro |
| `newValue`   | O valor do campo DEPOIS da mudança  | Baseado no novo valor, tomar decisões                  | `if (newValue == '1') // Crítica`                |
| `isLoading`  | True se formulário ainda carregando | **SEMPRE** verificar no início                         | `if (isLoading) return;`                         |
| `isTemplate` | True se é um template               | **SEMPRE** verificar no início                         | `if (isTemplate) return;`                        |

### Observação importante sobre `oldValue` vs `newValue`

**Qual usar?** Use `newValue` para tomar decisões baseadas no que o usuário acabou de selecionar. Use `oldValue` quando você precisa saber o que era antes (ex: "o usuário mudou de status A para status B").

```javascript
// Exemplo: comparando valores
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || isTemplate) {
    return;
  }

  // Usando newValue (mais comum)
  if (newValue == "1") {
    g_form.addInfoMessage("Prioridade crítica selecionada!");
  }

  // Usando oldValue (comparação)
  if (oldValue == "1" && newValue != "1") {
    g_form.addInfoMessage(
      "Prioridade removida de Crítica para " +
        g_form.getDisplayValue("priority"),
    );
  }
}
```

---

## Exemplos de código completos

### Exemplo 1: Validação de formato (onChange no campo "Telefone")

Este script valida se o campo `u_telefone` tem exatamente 11 dígitos.

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || isTemplate) {
    return;
  }

  var telefone = newValue;

  // Remove caracteres não numéricos (espaços, traços, parênteses)
  var telefoneNumeros = telefone.replace(/\D/g, "");

  if (telefoneNumeros.length > 0 && telefoneNumeros.length != 11) {
    g_form.showFieldMsg(
      "u_telefone",
      "Telefone deve ter 11 dígitos (DDD + 9 dígitos). Ex: 11999999999",
      "error",
    );
    g_form.setValue("u_telefone", ""); // Limpa o campo
  } else {
    g_form.hideFieldMsg("u_telefone");
  }
}
```

**O que este código faz:**

1. Remove caracteres especiais do telefone digitado
2. Se tiver algo digitado, verifica se tem 11 dígitos
3. Se não tiver, exibe erro e limpa o campo
4. Se estiver correto, limpa a mensagem de erro

---

### Exemplo 2: Preenchimento automático (onChange no campo "Cliente")

Este script busca dados de um cliente quando ele é selecionado e preenche outros campos.

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || isTemplate) {
    return;
  }

  var clienteSysId = newValue;

  if (clienteSysId == "") {
    // Se o campo foi limpo, limpa os campos dependentes
    g_form.setValue("u_telefone_cliente", "");
    g_form.setValue("u_email_cliente", "");
    g_form.setValue("u_endereco_cliente", "");
    return;
  }

  // Busca os dados do cliente usando GlideRecord (server-side)
  var ga = new GlideAjax("ClienteAjax");
  ga.addParam("sysparm_name", "getClienteInfo");
  ga.addParam("sysparm_sys_id", clienteSysId);
  ga.getXMLAnswer(function (response) {
    var cliente = JSON.parse(response);
    if (cliente) {
      g_form.setValue("u_telefone_cliente", cliente.telefone);
      g_form.setValue("u_email_cliente", cliente.email);
      g_form.setValue("u_endereco_cliente", cliente.endereco);
      g_form.addInfoMessage(
        "Dados do cliente " + cliente.nome + " carregados com sucesso.",
      );
    }
  });
}
```

**O que este código faz:**

1. Quando um cliente é selecionado, obtém o sys_id
2. Se for vazio (desmarcou), limpa os campos de telefone/email/endereço
3. Usa GlideAjax para buscar mais informações do cliente no servidor
4. Preenche os campos de contato automaticamente
5. Exibe mensagem de confirmação

> **Nota:** Este exemplo usa conceitos avançados (GlideAjax) que veremos com mais detalhes na Semana 3. Por enquanto, entenda a lógica.

---

### Exemplo 3: Comportamento condicional (onChange no campo "Setor Afetado")

Este script mostra/esconde campos baseado no setor selecionado.

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || isTemplate) {
    return;
  }

  // Limpa mensagens anteriores
  g_form.hideFieldMsg("u_sistema_afetado");
  g_form.hideFieldMsg("u_processo_rh");

  // Esconde ambos os campos inicialmente
  g_form.setVisible("u_sistema_afetado", false);
  g_form.setVisible("u_processo_rh", false);

  // Obtém o label do setor selecionado (não o valor técnico)
  var setorLabel = g_form.getDisplayValue("u_setor_afetado");

  if (setorLabel == "TI") {
    g_form.setVisible("u_sistema_afetado", true);
    g_form.showFieldMsg(
      "u_sistema_afetado",
      "Selecione o sistema afetado para agilizar a resolução.",
      "info",
    );
  } else if (setorLabel == "RH") {
    g_form.setVisible("u_processo_rh", true);
    g_form.showFieldMsg(
      "u_processo_rh",
      "Selecione o processo de RH afetado.",
      "info",
    );
  } else {
    // Para outros setores, mantém ambos escondidos
    g_form.addInfoMessage(
      "Setor " +
        setorLabel +
        " selecionado. Nenhum campo adicional necessário.",
    );
  }
}
```

**O que este código faz:**

1. Limpa mensagens e esconde ambos os campos condicionais
2. Pega o label (texto) do setor selecionado
3. Se for "TI", mostra o campo de sistema afetado
4. Se for "RH", mostra o campo de processo RH
5. Para outros setores, exibe mensagem informativa

---

### Exemplo 4: Acumulador/calculadora (onChange no campo "Quantidade")

Este script calcula o preço total de um item de catálogo baseado na quantidade.

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || isTemplate) {
    return;
  }

  // Preço unitário fixo (poderia vir de outro campo)
  var precoUnitario = 150.0;

  // Converte os valores para número
  var quantidade = parseFloat(newValue) || 0;
  var total = quantidade * precoUnitario;

  // Formata o total para moeda brasileira
  var totalFormatado = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  // Atualiza o campo de preço total
  g_form.setValue("u_preco_total", total);

  // Exibe mensagem informativa
  if (quantidade > 0) {
    g_form.setDisplayValue("u_preco_total_exibicao", totalFormatado);
    g_form.addInfoMessage("Total calculado: " + totalFormatado);
  }
}
```

**O que este código faz:**

1. Pega a quantidade selecionada pelo usuário
2. Calcula o preço total (quantidade × preço unitário)
3. Atualiza o campo de preço total (valor técnico)
4. Atualiza um campo de exibição com o valor formatado
5. Exibe mensagem com o total

---

## Erros comuns no onChange

| Erro                                                  | Por que acontece                                                                         | Correção                                                  |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Esquecer `if (isLoading) return;`**                 | O script executa durante o carregamento do formulário, causando comportamentos estranhos | Adicionar a verificação na primeira linha do script       |
| **Usar `getValue()` em campo Choice esperando texto** | Choice retorna valor técnico (número), não o texto                                       | Use `getDisplayValue()` para obter o texto exibido        |
| **Não limpar mensagens antigas**                      | Mensagens se acumulam no formulário                                                      | Use `hideFieldMsg()` antes de mostrar novas mensagens     |
| **Loop infinito**                                     | Um `setValue()` dentro do onChange dispara o evento novamente                            | Use verificações como `if (oldValue == newValue) return;` |
| **Campo monitorado não está no formulário**           | O onChange só funciona se o campo existir no layout                                      | Adicione o campo ao Form Layout (pode ser escondido)      |

### Como evitar loop infinito

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || isTemplate) {
    return;
  }

  // Evita loop: se o valor não mudou, não faz nada
  if (oldValue == newValue) {
    return;
  }

  // Sua lógica aqui
}
```

---

## onChange vs Outros Tipos de Client Script

| Tipo         | Quando usar                              | Por que não usar onChange para tudo                              |
| ------------ | ---------------------------------------- | ---------------------------------------------------------------- |
| **onChange** | Reagir a mudanças em um campo específico | Se a regra não depende de um campo específico, use onLoad        |
| **onLoad**   | Preparar o formulário ao abrir           | Não depende de mudança do usuário                                |
| **onSubmit** | Validar antes de salvar                  | Mudanças durante a edição não precisam ser validadas até o envio |

---

## Links úteis

- [Documentação oficial - onChange Client Scripts](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/configure/client-scripts/task/t_AddAnOnChangeClientScript.html)
- [Referência da API g_form - onChange](https://developer.servicenow.com/dev.do#!/reference/api/tokyo/client/c_ClientSideAPI)

---

## Minhas anotações pessoais

_[Você preenche após a prática]_

- Hoje aprendi que o onChange é disparado quando o campo PERDE O FOCO (on blur), não a cada tecla digitada
- `isLoading` é obrigatório para evitar execução durante carregamento
- `oldValue` permite comparar o valor antigo com o novo
- `getValue()` retorna valor técnico; `getDisplayValue()` retorna texto exibido (crucial para Choice)
- Para evitar loop infinito, sempre comparar `oldValue == newValue` antes de ações que modificam campos

---

## Flashcards do Dia 3

[INICIO_CODIGO]
Pergunta: O que é um Client Script onChange no ServiceNow?
Resposta: É um script que executa quando um campo específico tem seu valor alterado e perde o foco (evento on blur). Disparado automaticamente pelo sistema.

Pergunta: Quais são os 5 parâmetros da função onChange?
Resposta: control (campo que mudou), oldValue (valor antigo), newValue (valor novo), isLoading (carregando), isTemplate (é template).

Pergunta: Qual a primeira linha que deve vir em um Client Script onChange?
Resposta: if (isLoading || isTemplate) return; para ignorar execução durante carregamento do formulário.

Pergunta: Para que serve o parâmetro oldValue no onChange?
Resposta: Contém o valor do campo ANTES da mudança. Útil para comparar o que era com o que passou a ser.

Pergunta: Para que serve o parâmetro newValue no onChange?
Resposta: Contém o valor do campo DEPOIS da mudança. Usado para tomar decisões baseadas no novo valor selecionado.

Pergunta: Como evitar um loop infinito em um Client Script onChange?
Resposta: Adicionar verificação if (oldValue == newValue) return; antes de qualquer ação que modifique campos.

Pergunta: Qual a diferença entre usar getValue() e getDisplayValue() em um campo do tipo Choice dentro de um onChange?
Resposta: getValue() retorna o valor técnico (ex: "1" para Prioridade Alta). getDisplayValue() retorna o texto exibido (ex: "Alta").

Pergunta: O onChange é executado a cada tecla digitada ou apenas quando o campo perde o foco?
Resposta: Apenas quando o campo perde o foco (evento on blur), não a cada tecla digitada.

Pergunta: Em um onChange, como saber qual campo disparou o evento em scripts reutilizáveis?
Resposta: Usando o parâmetro control.name, que contém o nome técnico do campo que foi alterado.
[FIM_CODIGO]

---

## Prática do Dia 3

### Atividade 1 (obrigatória)

Criar um Client Script do tipo **onChange** no campo `priority` (Prioridade) que:

1. Se a prioridade for alterada para **Crítica** (valor técnico = `1`), exibe uma mensagem de aviso em amarelo (warning) abaixo do campo `u_impacto_negocio`
2. Se a prioridade for alterada para **Alta** (valor técnico = `2`), exibe uma mensagem informativa em azul (info) abaixo do campo `u_impacto_negocio`
3. Se a prioridade for alterada para qualquer outro valor, limpa a mensagem

**Código base (pronto para copiar):**

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || isTemplate) {
    return;
  }

  // Evita loop infinito
  if (oldValue == newValue) {
    return;
  }

  // Limpa mensagem anterior
  g_form.hideFieldMsg("u_impacto_negocio");

  if (newValue == "1") {
    g_form.showFieldMsg(
      "u_impacto_negocio",
      "Atenção: Incidentes críticos exigem o preenchimento do Impacto no Negócio.",
      "warning",
    );
  } else if (newValue == "2") {
    g_form.showFieldMsg(
      "u_impacto_negocio",
      "Informe o impacto no negócio para priorizar corretamente.",
      "info",
    );
  }
}
```

---

### Atividade 2 (desafio)

Criar um Client Script do tipo **onChange** no campo `u_setor_afetado` (Setor Afetado) que:

1. Se o setor selecionado for **TI**, torna o campo `u_sistema_afetado` visível e obrigatório
2. Se o setor selecionado for **RH**, torna o campo `u_processo_rh` visível e obrigatório
3. Para qualquer outro setor (ou se o campo for limpo), esconde ambos os campos e remove obrigatoriedade

**Nota:** Os campos `u_sistema_afetado` e `u_processo_rh` você pode criar como campos do tipo String (String) na tabela Incident, usando o prefixo `u_`.

**Código base (prático para copiar e adaptar):**

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || isTemplate) {
    return;
  }

  // Esconde e remove obrigatoriedade de ambos os campos
  g_form.setVisible("u_sistema_afetado", false);
  g_form.setVisible("u_processo_rh", false);
  g_form.setMandatory("u_sistema_afetado", false);
  g_form.setMandatory("u_processo_rh", false);

  // Obtém o label do setor selecionado
  var setorLabel = g_form.getDisplayValue("u_setor_afetado");

  if (setorLabel == "TI") {
    g_form.setVisible("u_sistema_afetado", true);
    g_form.setMandatory("u_sistema_afetado", true);
    g_form.showFieldMsg(
      "u_sistema_afetado",
      "Selecione o sistema afetado.",
      "info",
    );
  } else if (setorLabel == "RH") {
    g_form.setVisible("u_processo_rh", true);
    g_form.setMandatory("u_processo_rh", true);
    g_form.showFieldMsg(
      "u_processo_rh",
      "Selecione o processo de RH afetado.",
      "info",
    );
  }
}
```

---

### Entregável do dia

| Entregável                                                              | Arquivo                                                            |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Print do código do Client Script onChange (Atividade 1)                 | `entregaveis/prints/client-script-onchange-codigo.png`             |
| Print do formulário mostrando a mensagem para prioridade Crítica        | `entregaveis/prints/client-script-onchange-prioridade-critica.png` |
| Print do formulário mostrando a mensagem para prioridade Alta           | `entregaveis/prints/client-script-onchange-prioridade-alta.png`    |
| (Desafio) Print do código do onChange com setor                         | `entregaveis/prints/client-script-onchange-desafio-codigo.png`     |
| (Desafio) Print do formulário com campo adicional visível para setor TI | `entregaveis/prints/client-script-onchange-desafio-ti.png`         |
| (Desafio) Print do formulário com campo adicional visível para setor RH | `entregaveis/prints/client-script-onchange-desafio-rh.png`         |

---

### Checklist do Dia 3

- [ ] Li e compreendi o artigo sobre onChange
- [ ] Adicionei os flashcards ao Anki e revisei
- [ ] Criei o Client Script onChange da Atividade 1 no PDI
- [ ] Testei o script com prioridade Crítica, Alta e outras
- [ ] (Desafio) Criei os campos `u_sistema_afetado` e `u_processo_rh` na tabela Incident
- [ ] (Desafio) Criei o Client Script onChange da Atividade 2
- [ ] (Desafio) Testei o script com setor TI e setor RH
- [ ] Tirei os prints dos códigos
- [ ] Tirei os prints dos formulários funcionando
- [ ] Organizei os prints na pasta `entregaveis/prints/`

---

**Próximo artigo:** Dia 4 — onSubmit na prática: impedir salvamento com validações
