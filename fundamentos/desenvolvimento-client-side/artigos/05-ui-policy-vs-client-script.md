# UI Policy vs Client Script: qual usar e quando

**Data:** 09/05/26\
**Semana:** 2 (UI Scripts)
**Fonte:** SNAF Módulo 4 + Documentação Oficial + Prática própria + ServiceNow Community\
**Tópico relacionado:** Client Scripts, UI Policy, Boas Práticas, Performance

---

## O que é (definição simples)

**UI Policy** e **Client Script** são duas ferramentas do ServiceNow que permitem criar comportamentos dinâmicos em formulários. Ambas executam no lado do cliente (navegador), mas funcionam de formas diferentes e servem a propósitos diferentes.

| Ferramenta        | Como funciona                               | Precisa de código? |
| ----------------- | ------------------------------------------- | ------------------ |
| **UI Policy**     | Configuração declarativa (marca checkboxes) | ❌ Não             |
| **Client Script** | Código JavaScript escrito manualmente       | ✅ Sim             |

Pense na diferença como:

- **UI Policy** = "Eu quero que aconteça isso" (você diz O QUÊ, o sistema faz COMO)
- **Client Script** = "Eu vou programar exatamente como isso deve acontecer" (você controla O QUÊ e COMO)

---

## Para que serve cada um (visão geral)

### UI Policy: O que ela faz

| Funcionalidade               | Exemplo                                                    |
| ---------------------------- | ---------------------------------------------------------- |
| Mostrar/esconder campo       | Se prioridade for "Crítica", mostrar campo "Justificativa" |
| Tornar campo obrigatório     | Se estado for "Resolvido", "Resolution Notes" obrigatório  |
| Tornar campo somente leitura | Se incidente estiver "Fechado", todos os campos readonly   |

### Client Script: O que ele faz

| Funcionalidade                           | Exemplo                                       |
| ---------------------------------------- | --------------------------------------------- |
| Validar formato                          | CPF, e-mail, telefone, CEP                    |
| Preencher automaticamente                | Buscar endereço a partir do CEP               |
| Calcular valores                         | Quantidade × Preço unitário = Total           |
| Exibir mensagens personalizadas          | "Atenção: Esta ação não pode ser desfeita"    |
| Chamar APIs externas                     | Buscar dados de sistemas externos             |
| Validar múltiplos campos simultaneamente | Verificar se data fim é maior que data início |

---

## Tabela comparativa completa

| Critério                       | UI Policy                       | Client Script                               |
| ------------------------------ | ------------------------------- | ------------------------------------------- |
| **Requer código**              | ❌ Não                          | ✅ Sim (JavaScript)                         |
| **Manutenção**                 | Fácil (alteração visual)        | Média (precisa editar código)               |
| **Performance**                | Muito rápida (nativa)           | Rápida (mas depende da qualidade do código) |
| **Curva de aprendizado**       | Baixa                           | Média/Alta                                  |
| **Mostrar/esconder campo**     | ✅ Excelente                    | ✅ Possível (mas não recomendado)           |
| **Tornar obrigatório**         | ✅ Excelente                    | ✅ Possível (mas não recomendado)           |
| **Tornar readonly**            | ✅ Excelente                    | ✅ Possível (mas não recomendado)           |
| **Mensagens personalizadas**   | ❌ Limitado (mensagens padrão)  | ✅ Completo (texto livre, cores)            |
| **Validação de formato**       | ❌ Não                          | ✅ Sim                                      |
| **Cálculos**                   | ❌ Não                          | ✅ Sim                                      |
| **Chamadas assíncronas (API)** | ❌ Não                          | ✅ Sim (GlideAjax)                          |
| **Acesso a dados do servidor** | ❌ Não                          | ✅ Sim (GlideAjax)                          |
| **Reutilização entre campos**  | ✅ Fácil (por tabela)           | ⚠️ Depende do script                        |
| **Condições complexas**        | ⚠️ Limitado (até 2-3 condições) | ✅ Ilimitado                                |

---

## Quando usar cada um (regras de ouro)

### Use UI Policy quando:

| Situação                         | Exemplo                                      | Por quê                 |
| -------------------------------- | -------------------------------------------- | ----------------------- |
| Mostrar/esconder campo           | Setor = TI → mostra campo "Sistema"          | Sem código, mais fácil  |
| Tornar obrigatório               | Prioridade = Crítica → "Impacto" obrigatório | Declarativo, mais limpo |
| Tornar readonly                  | Estado = Fechado → todos os campos readonly  | Performance melhor      |
| Regras simples com 1-2 condições | Categoria = Hardware → mostra Subcategoria   | Manutenção trivial      |

### Use Client Script quando:

| Situação                 | Exemplo                                      | Por quê                           |
| ------------------------ | -------------------------------------------- | --------------------------------- |
| Validar formato          | Verificar se CPF tem 11 dígitos              | UI Policy não faz                 |
| Mensagem personalizada   | "ATENÇÃO: Esta ação não pode ser desfeita!"  | UI Policy tem mensagens genéricas |
| Buscar dados             | Selecionou cliente → buscar endereço via API | UI Policy não faz chamadas        |
| Calcular valores         | Quantidade × Preço = Total                   | UI Policy não faz matemática      |
| Validar múltiplos campos | Data fim > Data início?                      | UI Policy tem limitações          |
| Lógica complexa          | Combinação de 5+ condições com cálculos      | Client Script tem mais poder      |
| Chamada assíncrona       | Buscar dados de API externa                  | UI Policy não faz                 |

---

## Exemplos práticos comparativos

### Exemplo 1: Mostrar campo quando prioridade = Crítica

**Solução com UI Policy (recomendada):**

| Configuração     | Valor                                                          |
| ---------------- | -------------------------------------------------------------- |
| **Condition**    | `Priority` → `is` → `1 - Critical`                             |
| **Field Action** | `u_justificativa` → `Visible` (marcado), `Mandatory` (marcado) |

**Nenhuma linha de código.** Pronto.

**Solução com Client Script (não recomendada para este caso, apenas para comparação):**

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || isTemplate) return;

  if (g_form.getValue("priority") == "1") {
    g_form.setVisible("u_justificativa", true);
    g_form.setMandatory("u_justificativa", true);
  } else {
    g_form.setVisible("u_justificativa", false);
    g_form.setMandatory("u_justificativa", false);
  }
}
```

**Por que UI Policy é melhor?** Sem código, mais rápido, menos propenso a erro, mais fácil de manter. Por exemplo, uma atualização pode quebrar um script mas não uma ui policy.

---

### Exemplo 2: Validar CPF (Client Script obrigatório)

Este é um caso onde **UI Policy não resolve**. Só Client Script pode validar formato.

```javascript
function onSubmit() {
  var cpf = g_form.getValue("u_cpf").replace(/\D/g, "");

  if (cpf.length > 0 && cpf.length != 11) {
    g_form.addErrorMessage("CPF inválido. Deve ter 11 dígitos.");
    g_form.showFieldMsg("u_cpf", "CPF deve ter 11 dígitos", "error");
    return false;
  }

  return true;
}
```

---

### Exemplo 3: Mensagem personalizada (Client Script)

UI Policy não permite mensagens customizadas. Client Script sim.

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || isTemplate) return;

  if (newValue == "1") {
    g_form.showFieldMsg(
      "u_impacto",
      "⚠️ ATENÇÃO: Incidentes críticos impactam diretamente a operação. Justifique detalhadamente.",
      "warning",
    );
    g_form.addInfoMessage("Este incidente será tratado com prioridade máxima.");
  }
}
```

---

## Fluxo de decisão (árvore para qualquer situação)

Precisa de comportamento dinâmico no formulário?\
│\
├─→ É MOSTRAR/ESCONDER campo?\
││\
│└─→ ✅ UI POLICY\
│\
├─→ É TORNAR OBRIGATÓRIO?\
│ │\
│ └─→ ✅ UI POLICY\
│\
├─→ É TORNAR READONLY?\
│ │\
│ └─→ ✅ UI POLICY\
│\
├─→ Precisa de MENSAGEM PERSONALIZADA\
│ │\
│ └─→ ✅ CLIENT SCRIPT\
│\
├─→ Precisa VALIDAR FORMATO (CPF, e-mail, CEP)?\
│ │\
│ └─→ ✅ CLIENT SCRIPT\
│\
├─→ Precisa BUSCAR DADOS (API)?\
│ │\
│ └─→ ✅ CLIENT SCRIPT\
│\
├─→ Precisa CALCULAR valores?\
│ │\
│ └─→ ✅ CLIENT SCRIPT\
│\
└─→ São MÚLTIPLAS CONDIÇÕES COMPLEXAS?\
│\
└─→ ✅ CLIENT SCRIPT

---

## Erros comuns

| Erro                                               | Por que acontece                      | Correção                                           |
| -------------------------------------------------- | ------------------------------------- | -------------------------------------------------- |
| **Usar Client Script para mostrar/esconder campo** | Desenvolvedor não conhece UI Policy   | Use UI Policy (sem código, mais fácil)             |
| **Usar UI Policy para validação complexa**         | Desenvolvedor não sabe os limites     | UI Policy só faz coisas simples. Use Client Script |
| **Duplicar regras (UI Policy + Client Script)**    | Desenvolvedor não confia na UI Policy | Escolha UMA. Evite conflitos                       |
| **Fazer validação de segurança no Client Script**  | Desenvolvedor não conhece ACLs        | Segurança vai no SERVIDOR (ACL), não no cliente    |

---

## Resumo para entrevistas

**Pergunta:**

> _"Qual a diferença entre UI Policy e Client Script?"_

**Resposta:**

> _"UI Policy é declarativa – você configura visualmente o que quer fazer (mostrar, esconder, tornar obrigatório) sem escrever código. Client Script exige JavaScript e permite lógica mais complexa como validações de formato, cálculos e chamadas assíncronas. A regra de ouro é: use UI Policy para comportamentos simples e Client Script para lógica complexa que UI Policy não consegue fazer."_

---

## Referência rápida

| Comportamento                 | UI Policy   | Client Script                     |
| ----------------------------- | ----------- | --------------------------------- |
| Mostrar/Esconder              | ✅ Sim      | ⚠️ Possível (mas não recomendado) |
| Obrigatório                   | ✅ Sim      | ⚠️ Possível (mas não recomendado) |
| Readonly                      | ✅ Sim      | ⚠️ Possível (mas não recomendado) |
| Mensagem customizada          | ❌ Não      | ✅ Sim                            |
| Validação de formato          | ❌ Não      | ✅ Sim                            |
| Cálculo                       | ❌ Não      | ✅ Sim                            |
| Chamada assíncrona            | ❌ Não      | ✅ Sim                            |
| Múltiplas condições complexas | ⚠️ Limitado | ✅ Sim                            |

---

## Links úteis

- [Documentação oficial - UI Policy](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/configure/ui-policies/concept/c_UI Policies.html)
- [Documentação oficial - Client Scripts](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/configure/client-scripts/concept/c_ClientScripts.html)

---

## Minhas anotações pessoais

- Hoje aprendi que UI Policy é declarativa (sem código) e Client Script é programático (com código)
- A regra de ouro: comportamento simples = UI Policy; lógica complexa = Client Script
- Mostrar/esconder, obrigatório e readonly são UI Policy puro
- Validação de formato, cálculos, buscas de dados = Client Script
- Nunca fazer validação de segurança no cliente (ACL resolve)
- UI Policy é mais fácil de manter e menos propensa a erros

---

## Flashcards do Dia 5

[INICIO_CODIGO]
Pergunta: Qual a principal diferença entre UI Policy e Client Script?
Resposta: UI Policy é declarativa (configuração visual, sem código). Client Script requer código JavaScript. UI Policy é melhor para mostrar/esconder campos; Client Script é necessário para lógica complexa.

Pergunta: Para que serve UI Policy no ServiceNow?
Resposta: Para comportamentos dinâmicos simples: mostrar/esconder campos, tornar campos obrigatórios ou somente leitura baseados em condições – tudo sem escrever código.

Pergunta: Para que serve Client Script no ServiceNow?
Resposta: Para lógica complexa como validação de formato (CPF, email), cálculos, mensagens personalizadas, chamadas assíncronas e condições que UI Policy não consegue fazer.

Pergunta: Se você precisa mostrar um campo apenas quando a prioridade for Crítica, qual ferramenta escolher e por quê?
Resposta: UI Policy. Porque é declarativa, não requer código, é mais fácil de manter e foi feita exatamente para isso.

Pergunta: Se você precisa validar se um CPF tem 11 dígitos antes de salvar, qual ferramenta escolher?
Resposta: Client Script (onSubmit). UI Policy não valida formato de dados, apenas comportamentos visuais.

Pergunta: UI Policy consegue exibir uma mensagem personalizada como "Atenção: esta ação não pode ser desfeita"?
Resposta: Não. UI Policy tem mensagens padrão e limitadas. Para mensagens personalizadas, use Client Script com g_form.showFieldMsg() ou addInfoMessage().

Pergunta: É boa prática usar Client Script para mostrar/esconder campos? Por quê?
Resposta: Não. UI Policy é mais adequada: sem código, mais fácil de manter, menos propensa a erros e com melhor performance.

Pergunta: Qual ferramenta deve ser usada para chamar uma API externa ao selecionar um valor em um campo?
Resposta: Client Script (onChange) com GlideAjax. UI Policy não suporta chamadas assíncronas ou acesso externo.

Pergunta: Se você precisa que um campo seja obrigatório APENAS quando outro campo tem um valor específico, qual ferramenta usar?
Resposta: UI Policy. É o caso de uso clássico: comportamento condicional simples sobre obrigatoriedade.

Pergunta: Por que validações de segurança (quem pode ver ou editar um campo) NÃO devem ser feitas em Client Script?
Resposta: Porque Client Script roda no navegador e pode ser burlado pelo usuário. Segurança deve ser reforçada no servidor via ACL (Access Control List).
[FIM_CODIGO]

---

## Prática do Dia 5

### Atividade 1 (obrigatória) - Implementar com UI Policy

Criar uma **UI Policy** na tabela Incident que:

1. Quando a prioridade for **Crítica** (`priority = 1`), o campo `u_setor_afetado` (Setor Afetado) deve ser **obrigatório**
2. Quando a prioridade NÃO for Crítica, o campo deve ser opcional

**Entregável:** Print da configuração da UI Policy e print do formulário com o campo obrigatório.

---

### Atividade 2 (desafio) - Implementar com Client Script

Criar um Client Script do tipo **onChange** no campo `priority` que:

1. Se a prioridade for **Crítica**, exibe uma mensagem de aviso personalizada EM AZUL (info) abaixo do campo `u_setor_afetado`
2. Se a prioridade for **Alta**, exibe uma mensagem de aviso AMARELA (warning)
3. Se a prioridade for **Média ou Baixa**, limpa as mensagens

**Entregável:** Print do código e print do formulário mostrando as mensagens para cada prioridade.

---

### Entregável do dia

| Entregável                                               | Arquivo                                                        |
| -------------------------------------------------------- | -------------------------------------------------------------- |
| Print da configuração da UI Policy                       | `entregaveis/prints/ui-policy-config.png`                      |
| Print do formulário com campo obrigatório (Crítica)      | `entregaveis/prints/ui-policy-critica-obrigatorio.png`         |
| Print do código do Client Script (desafio)               | `entregaveis/prints/client-script-onchange-desafio-codigo.png` |
| Print da mensagem azul (info) para prioridade Crítica    | `entregaveis/prints/onsubmit-desafio-mensagem-info.png`        |
| Print da mensagem amarela (warning) para prioridade Alta | `entregaveis/prints/onsubmit-desafio-mensagem-warning.png`     |

---

### Checklist do Dia 5

- [x] Li e compreendi o artigo comparando UI Policy e Client Script
- [x] Adicionei os flashcards ao Anki e revisei
- [x] Criei a UI Policy da Atividade 1 no PDI
- [x] Testei a UI Policy com prioridade Crítica e não Crítica
- [x] (Desafio) Criei o Client Script onChange da Atividade 2
- [x] (Desafio) Testei as mensagens para os tipos de prioridade
- [x] Tirei os prints das configurações e códigos
- [x] Tirei os prints dos formulários funcionando
- [x] Organizei os prints na pasta `entregaveis/prints/`

---

## Fim da Semana 2

Bons estudos!
