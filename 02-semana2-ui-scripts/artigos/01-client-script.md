# Client Scripts: O que são, tipos (onLoad, onChange, onSubmit, onCellEdit) e quando usar cada um

**Data:** 04/05/2026 \
**Semana:** 2 (UI Scripts) \
**Fonte:** SNAF Módulo 4 + Documentação Oficial + Prática própria \
**Tópico relacionado:** UI Policy, JavaScript, g_form, g_user

---

## O que é (definição simples)

Um Client Script é um trecho de código JavaScript que roda no **navegador do usuário** (lado do cliente), não no servidor. Ele é executado em momentos específicos da interação com um formulário: quando a página carrega, quando um campo é alterado, quando o usuário tenta enviar o formulário ou quando uma célula em uma lista é editada.

Pense no Client Script como o "comportamento inteligente" do formulário. Ele permite a você:

- Mostrar mensagens de alerta ou informação
- Validar dados antes do envio ao servidor
- Preencher campos automática e dinamicamente
- Mostrar, esconder ou alterar características de campos
- Buscar dados de forma assíncrona (sem recarregar a página)

**Diferença fundamental que você deve guardar:** Client Script roda no computador do usuário (navegador). Business Rule (que será visto na Semana 3) roda no servidor.

Client Scripts são sobre **experiência do usuário e validação rápida**. Eles tornam o formulário mais inteligente e responsivo, mas NUNCA devem ser usados para lógica de segurança ou regras críticas de negócio (isso é papel do servidor).

---

## Para que serve (casos de uso por tipo)

| Tipo de Client Script | Quando executa                                                                        | Caso de uso                                                                                                                           | Exemplo prático                                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **onLoad**            | Quando o formulário termina de carregar na tela                                       | Preparar o ambiente, definir valores padrão, mostrar/esconder seções com base no perfil do usuário                                    | Exibir uma saudação personalizada; Esconder campos avançados para usuários normais; Pré-preencher o campo "Solicitante" com o usuário logado      |
| **onChange**          | Quando um campo específico tem seu valor alterado e o campo perde o foco (on blur)    | Validar um campo imediatamente após o preenchimento; Buscar dados automaticamente baseado em outro campo; Mostrar avisos condicionais | Se prioridade for "Crítica", tornar campo "Impacto" obrigatório; Buscar endereço automaticamente a partir do CEP                                  |
| **onSubmit**          | Quando o usuário clica em "Submit", "Update" ou qualquer botão que salva o formulário | Validar todos os campos antes do envio; Impedir o salvamento se algo estiver errado; Exibir resumo antes de enviar                    | Verificar se todos os campos obrigatórios foram preenchidos; Confirmar com o usuário se ele realmente quer fechar um incidente crítico            |
| **onCellEdit**        | Quando uma célula é editada diretamente em uma lista (sem abrir o formulário)         | Validar dados inseridos em listas editáveis; Aplicar formatação ou regras em tempo real                                               | Validar se o valor inserido em uma coluna "Horas Trabalhadas" é numérico; Atualizar automaticamente uma coluna "Total" com base em outras colunas |

---

## Como fazer (passo a passo prático)

### Criar um Client Script no ServiceNow

1. No filtro de navegação, digite `Client Scripts`
2. Clique em `System UI` > `Client Scripts` (ou `All` > `Client Scripts` dependendo da versão)
3. Clique no botão `New`
4. Preencha os campos do formulário de criação:
   - **Table:** Selecione a tabela onde o script deve atuar (ex: `Incident [incident]`)
   - **Name:** Dê um nome descritivo (ex: `Alerta de boas-vindas no incidente`)
   - **Type:** Escolha o tipo: `onLoad`, `onChange`, `onSubmit` ou `onCellEdit`
   - **Field name:** (Apenas para onChange) Selecione o campo que será monitorado para mudanças
   - **Applies to:** Geralmente deixe o padrão "Selected fields only" ou "All fields" conforme necessidade
   - **UI Type:** `Desktop` (padrão) - ignore as opções móveis por enquanto
5. No campo `Script`, escreva seu código JavaScript seguindo as boas práticas
6. Clique em `Submit` para salvar

### Estrutura básica de cada tipo de Client Script

**Estrutura para onLoad:**

```javascript
function onLoad() {
  // Código executado quando o formulário carrega
  // Não precisa verificar isLoading pois onLoad só executa após carregamento completo
  alert("Bem-vindo ao formulário!");
}
```

**Estrutura para onChange:**

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  // Parâmetros importantes:
  // control: o campo que disparou a mudança (você raramente usa)
  // oldValue: o valor ANTES da mudança
  // newValue: o valor DEPOIS da mudança
  // isLoading: true se o formulário ainda está carregando (IGNORE quando true)
  // isTemplate: true se é um template (IGNORE quando true)

  // ✅ SEMPRE comece com esta linha:
  if (isLoading || isTemplate) {
    return;
  }

  // Sua lógica aqui
  if (newValue == "1") {
    alert("Prioridade Crítica selecionada!");
  }
}
```

**Estrutura para onSubmit:**

```javascript
function onSubmit() {
  // Código executado ANTES de salvar
  var descricao = g_form.getValue("short_description");

  if (descricao == "") {
    alert("O campo Descrição é obrigatório!");
    return false; // ⚠️ Retornar false IMPEDE o salvamento
  }

  // Se retornar true (ou nada), o salvamento continua normalmente
}
```

**Estrutura para onCellEdit (menos comum, mas bom saber):**

```javascript
function onCellEdit(value, column, record, isLoading, isTemplate) {
  // value: valor digitado na célula editada
  // column: nome técnico da coluna editada
  // record: sys_id do registro sendo editado

  if (isLoading || isTemplate) {
    return value;
  }

  // Validação e transformação do valor
  if (column == "work_notes" && value == "") {
    alert("Work Notes não pode ser vazio");
    return false; // Reverte a edição
  }

  return value; // Retorna o valor (pode ser modificado)
}
```

---

## Exemplos de código completos

### Exemplo 1: Client Script onLoad com saudação personalizada

Este script exibe uma mensagem de boas-vindas quando o formulário de incidente é carregado e verifica o perfil do usuário para personalizar a experiência.

```javascript
function onLoad() {
  // Obtém informações do usuário logado
  var nomeCompleto = g_user.firstName + " " + g_user.lastName;
  var userName = g_user.userName;

  // Exibe saudação personalizada
  g_form.addInfoMessage("Olá, " + nomeCompleto + "! (login: " + userName + ")");
  g_form.addInfoMessage("Lembre-se de preencher todos os campos obrigatórios.");

  // Personaliza a interface baseado no perfil do usuário
  if (g_user.hasRole("admin")) {
    // Usuário admin vê campos extras
    g_form.setVisible("u_campos_admin", true);
    g_form.addInfoMessage(
      "⚠️ Modo administrador ativo. Tenha cuidado com alterações.",
    );
  } else {
    // Usuário normal não vê campos de admin
    g_form.setVisible("u_campos_admin", false);
  }

  // Pré-preenche o campo "Solicitante" com o usuário logado
  if (g_form.getValue("caller_id") == "") {
    g_form.setValue("caller_id", g_user.userID);
    g_form.addInfoMessage(
      'Campo "Solicitante" preenchido automaticamente com o usuário logado.',
    );
  }
}
```

**O que este código faz:**

1. Pega o nome completo e login do usuário logado
2. Exibe saudação personalizada e lembretes
3. Se o usuário for administrador (`hasRole('admin')`), mostra campos extras
4. Se o campo "Solicitante" estiver vazio, preenche com o usuário atual

---

### Exemplo 2: Client Script onChange com validação de prioridade crítica

Este script monitora o campo "Prioridade" e, quando alterado, aplica regras condicionais.

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  // ✅ Verificação obrigatória: ignorar durante carregamento
  if (isLoading || isTemplate) {
    return;
  }

  // Obtém o nome do campo que mudou (para scripts reutilizáveis)
  var campo = control.name;

  // Limpa mensagens anteriores do campo que estamos validando
  g_form.hideFieldMsg("u_impacto_negocio");
  g_form.hideFieldMsg("u_justificativa");

  // Lógica baseada no novo valor
  if (newValue == "1") {
    // Prioridade Crítica (valor técnico = 1)
    // Torna o campo "Impacto no Negócio" obrigatório
    g_form.setMandatory("u_impacto_negocio", true);
    g_form.showFieldMsg(
      "u_impacto_negocio",
      "Para incidentes críticos, informe o impacto no negócio detalhadamente.",
      "warning",
    );

    // Torna o campo "Justificativa" obrigatório
    g_form.setMandatory("u_justificativa", true);
    g_form.showFieldMsg(
      "u_justificativa",
      "Explique por que este incidente é considerado crítico.",
      "warning",
    );

    // Exibe mensagem geral no topo
    g_form.addErrorMessage(
      "⚠️ ATENÇÃO: Incidente Crítico. A prioridade máxima foi aplicada.",
    );
  } else if (newValue == "2") {
    // Prioridade Alta (valor técnico = 2)
    g_form.setMandatory("u_impacto_negocio", false);
    g_form.setMandatory("u_justificativa", false);
    g_form.addInfoMessage("Incidente de Alta prioridade. Acompanhe de perto.");
  } else {
    // Para prioridades Média (3) ou Baixa (4)
    g_form.setMandatory("u_impacto_negocio", false);
    g_form.setMandatory("u_justificativa", false);
    g_form.addInfoMessage("Prioridade alterada. Incidente não é crítico.");
  }
}
```

**O que este código faz:**

1. Ignora execução durante carregamento do formulário (`isLoading`)
2. Limpa mensagens anteriores para evitar duplicação
3. Se for prioridade Crítica, torna dois campos obrigatórios e exibe avisos
4. Se for prioridade Alta, remove obrigatoriedade mas mantém atenção
5. Para outras prioridades, remove obrigatoriedade e exibe mensagem informativa

---

### Exemplo 3: Client Script onSubmit com validação completa

Este script valida todos os campos antes de permitir o salvamento do incidente.

```javascript
function onSubmit() {
  // Coleção de erros para exibir ao usuário
  var erros = [];

  // 1. Validar campo "Descrição Curta"
  var descricao = g_form.getValue("short_description");
  if (descricao == "") {
    erros.push("A Descrição Curta é obrigatória.");
    g_form.showFieldMsg("short_description", "Campo obrigatório", "error");
  } else {
    g_form.hideFieldMsg("short_description");
  }

  // 2. Validar campo "Impacto no Negócio" se prioridade for Crítica
  var prioridade = g_form.getValue("priority");
  var impacto = g_form.getValue("u_impacto_negocio");

  if (prioridade == "1" && impacto == "") {
    erros.push(
      'Para incidentes críticos, o campo "Impacto no Negócio" é obrigatório.',
    );
    g_form.showFieldMsg(
      "u_impacto_negocio",
      "Campo obrigatório para incidentes críticos",
      "error",
    );
  } else {
    g_form.hideFieldMsg("u_impacto_negocio");
  }

  // 3. Validar campo "Grupo Atribuído"
  var grupo = g_form.getValue("assignment_group");
  if (grupo == "") {
    erros.push("Selecione um grupo para atribuir este incidente.");
    g_form.showFieldMsg("assignment_group", "Selecione um grupo", "error");
  }

  // 4. Se houver erros, exibir resumo e impedir salvamento
  if (erros.length > 0) {
    var mensagemErro =
      "❌ Não foi possível salvar o incidente devido aos seguintes erros:\n\n - " +
      erros.join("\n - ");
    g_form.addErrorMessage(mensagemErro);

    // Scrola para o topo do formulário (opcional, via JavaScript puro)
    window.scrollTo(0, 0);

    return false; // ⚠️ IMPEDE O SALVAMENTO
  }

  // Se chegou aqui, todas as validações passaram
  g_form.addInfoMessage("✅ Incidente validado com sucesso! Salvando...");
  return true; // Permite o salvamento (opcional, pois true é o padrão)
}
```

**O que este código faz:**

1. Cria um array para armazenar todas as mensagens de erro
2. Valida campo a campo: Descrição, Impacto (condicional), Grupo
3. Para cada erro, exibe mensagem específica abaixo do campo
4. Se houver qualquer erro, exibe resumo e retorna `false` (impede salvamento)
5. Se tudo estiver correto, exibe confirmação e permite salvamento

---

## ⚠️ Erros comuns e boas práticas

| Erro                                          | Por que acontece                                             | Correção                                                                                     |
| :-------------------------------------------- | :----------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Usar `alert()` em produção                    | Desenvolvedor usa alerta para testar e esquece de remover    | Use `g_form.addInfoMessage()` ou `g_form.showFieldMsg()` para feedback ao usuário final      |
| Esquecer de verificar `isLoading` no onChange | O script executa enquanto o formulário ainda está carregando | Sempre inicie o onChange com `if (isLoading \|\| isTemplate) return;`                        |
| Usar Client Script para lógica de segurança   | Desenvolvedor não conhece ACLs ou quer "facilitar"           | Validação de segurança (quem pode ver/editar) vai no servidor via ACL, não no cliente        |
| Não testar com diferentes perfis de usuário   | Desenvolvedor testa apenas como admin                        | Use `Impersonate User` para testar como outros perfis                                        |
| Confundir `setValue` com `setDisplayValue`    | Não conhece a diferença entre valor técnico e label          | Para campos Choice: `getValue()` retorna código (ex: "1"), `getDisplayValue()` retorna texto |
| Client Script muito longo                     | Tenta colocar toda lógica em um único script                 | Divida em funções menores ou use Script Includes                                             |
| Não limpar mensagens antigas                  | Mensagens ficam acumulando no formulário                     | Use `g_form.hideFieldMsg('campo')` antes de mostrar uma nova mensagem                        |

---

## 🆚 Client Script vs UI Policy (quando usar cada um)

Esta é uma das perguntas mais frequentes em entrevistas para desenvolvedor ServiceNow Júnior.

| Cenário                                    | Use Client Script | Use UI Policy | Por quê                                                    |
| ------------------------------------------ | ----------------- | ------------- | ---------------------------------------------------------- |
| Mostrar ou esconder campo baseado em valor | ❌                | ✅            | UI Policy é declarativa (sem código), mais fácil de manter |
| Tornar campo obrigatório condicionalmente  | ❌                | ✅            | UI Policy é mais limpa e eficiente                         |
| Validar formato de um campo (ex: CPF)      | ✅                | ❌            | UI Policy não suporta validações complexas                 |
| Buscar dados via API ao mudar um campo     | ✅                | ❌            | UI Policy não suporta chamadas assíncronas                 |
| Exibir mensagem de erro customizada        | ✅                | ❌            | UI Policy tem mensagens limitadas                          |
| Preencher automaticamente múltiplos campos | ✅                | ❌            | UI Policy é para comportamento simples                     |

**Resumo prático:** Use UI Policy para comportamentos simples (aparece/desaparece, obrigatório/não obrigatório). Use Client Script para lógica complexa, validações customizadas, chamadas assíncronas e preenchimento automático de campos.

---

## 🔗 Links úteis

- [Documentação oficial - Client Scripts (ServiceNow)](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/configure/client-scripts/concept/c_ClientScripts.html)
- [Referência da API g_form (Client Side)](https://www.servicenow.com/docs/r/api-reference/c_GlideFormAPI.html)
- [Referência da API g_user (Client Side)](https://www.servicenow.com/docs/r/api-reference/c_GlideUserAPI.html)
- [Boas práticas de desenvolvimento em Client Scripts](https://www.servicenow.com/community/community-central-forum/complete-guide-to-client-scripts-in-servicenow-beginner-advanced/m-p/3509244)

---

## Minhas anotações pessoais

_[preencher após a prática]_

- Hoje aprendi que existem 4 tipos de Client Script: onLoad, onChange, onSubmit e onCellEdit
- O mais importante para mim agora é onLoad (preparar formulário) e onChange (reagir a mudanças)
- `onSubmit` com `return false` é o que impede o salvamento – essencial para validações
- `isLoading` no onChange NÃO é opcional – é obrigatório para evitar bugs
- `g_user.hasRole()` é muito útil para personalizar interface por perfil
- **Regra de ouro:** UI Policy para comportamento simples, Client Script para lógica complexa

---

## Flashcards do Dia 1

[FLASHCARD_START]
Pergunta: O que é um Client Script no ServiceNow?
Resposta: É um script JavaScript que roda no navegador do usuário (lado do cliente), executado em momentos específicos da interação com formulários.

Pergunta: Quais são os quatro tipos de Client Script?
Resposta: onLoad (quando o formulário carrega), onChange (quando um campo muda), onSubmit (antes de salvar) e onCellEdit (edição inline em listas).

Pergunta: Para que serve o Client Script do tipo onLoad?
Resposta: Executa código automaticamente quando o formulário é aberto/carregado. Ex: preencher campos padrão, exibir mensagens de boas-vindas, personalizar interface por perfil.

Pergunta: Para que serve o Client Script do tipo onChange?
Resposta: Executa código quando um campo específico tem seu valor alterado. Ex: validar um campo imediatamente, buscar dados automaticamente, mostrar avisos condicionais.

Pergunta: Para que serve o Client Script do tipo onSubmit?
Resposta: Executa código antes de salvar/enviar o formulário. É usado para validações finais. Retornar false impede o salvamento.

Pergunta: Qual a diferença fundamental entre Client Script e Business Rule?
Resposta: Client Script roda no navegador do usuário (lado do cliente). Business Rule roda no servidor.

Pergunta: O que o parâmetro isLoading faz no onChange?
Resposta: Indica se o formulário ainda está carregando. Se isLoading for true, o script não deve executar. Sempre comece onChange com if (isLoading || isTemplate) return;.

Pergunta: Como obter o nome do usuário logado em um Client Script?
Resposta: Usando g_user.firstName (primeiro nome), g_user.lastName (sobrenome) ou g_user.userName (login).

Pergunta: Como exibir uma mensagem informativa amarela no topo do formulário?
Resposta: g_form.addInfoMessage('mensagem informativa');

Pergunta: Como exibir uma mensagem de erro abaixo de um campo específico?
Resposta: g_form.showFieldMsg('nome_do_campo', 'mensagem de erro', 'error');

Pergunta: Como tornar um campo obrigatório via Client Script?
Resposta: g_form.setMandatory('nome_do_campo', true);

Pergunta: Como impedir o salvamento do formulário em um onSubmit?
Resposta: Retornar false dentro da função onSubmit.

Pergunta: Qual a regra de ouro para decidir entre Client Script e UI Policy?
Resposta: Use UI Policy para comportamentos simples (aparece/desaparece, obrigatório). Use Client Script para lógica complexa, validações customizadas e chamadas assíncronas.

Pergunta: Para que serve o método g_user.hasRole('itil')?
Resposta: Verifica se o usuário logado possui o papel 'itil' (ou qualquer outro papel informado). Retorna true ou false.

Pergunta: O que acontece se você esquecer de verificar isLoading em um onChange?
Resposta: O script pode executar durante o carregamento do formulário, causando comportamentos indesejados e erros.
[FLASHCARD_END]

---

## Prática do Dia 1

### Atividade 1 (obrigatória)

Criar um Client Script do tipo onLoad que exibe uma mensagem de boas-vindas personalizada e pré-preenche o campo "Solicitante" com o usuário logado.

**Passo a passo:**

1. Acesse seu PDI (Personal Developer Instance)
2. No filtro de navegação, digite `Client Scripts` e clique na opção
3. Clique em `New`
4. Preencha o formulário:
   - **Table:** `Incident [incident]`
   - **Name:** `Saudacao personalizada e preenchimento automatico`
   - **Type:** `onLoad`
5. No campo `Script`, siga o código do Exemplo 1 deste artigo
6. Clique em `Submit`
7. Teste: abra um incidente existente ou crie um novo. Você deve ver a saudação e o campo "Solicitante" preenchido automaticamente

### Atividade 2 (desafio)

Criar um Client Script do tipo onChange no campo "Prioridade" que:

- Se prioridade for Crítica, exibe um aviso e torna um campo adicional obrigatório
- Se prioridade não for Crítica, remove a obrigatoriedade

Use o código do Exemplo 2 como base, adaptando para seus campos personalizados da Semana 1 (`u_setor_afetado`).

### Entregável do dia

- Print do código do Client Script onLoad
- Print do formulário de incidente mostrando a saudação e o campo "Solicitante" preenchido
- (Desafio) Print do código do Client Script onChange
- (Desafio) Print do formulário mostrando o aviso e o campo obrigatório

Salve tudo em `entregaveis/prints/` com nomes claros:

- `client-script-onload-codigo.png`()
- `client-script-onload-funcionando.png`
- `client-script-onchange-codigo.png`
- `client-script-onchange-funcionando.png`

---

## Checklist do Dia 1

- [ X ] Li e compreendi o artigo sobre Client Scripts
- [ X ] Criei o Client Script onLoad no PDI
- [ X ] Testei o script e vi a saudação aparecendo
- [ x ] (Desafio) Criei o Client Script onChange no PDI
- [ x ] (Desafio) Testei o script com diferentes prioridades
- [ x ] Tirei os prints dos códigos
- [ x ] Tirei os prints dos formulários funcionando
- [ x ] Organizei os prints na pasta `entregaveis/prints/`
