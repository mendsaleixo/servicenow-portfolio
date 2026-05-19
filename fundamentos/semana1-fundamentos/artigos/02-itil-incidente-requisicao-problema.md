# ITIL: Incidente vs Requisição vs Problema

**Data:** 21/04/2026
**Semana:** 1 — Fundamentos
**Fonte:** ITIL 4 + SNAF Módulo 1 + Prática própria
**Tópicos relacionados:** Incident Management, Problem Management, Service Request Management

---

## O que é (definição simples)

No dia a dia de TI, as pessoas usam palavras como "chamado", "problema", "requisição" como se fossem a mesma coisa. Mas no ITIL e no ServiceNow, cada um desses termos tem um significado técnico específico e um propósito diferente.

Pensar que Incidente, Requisição e Problema são a mesma coisa é como pensar que "tosse", "pneumonia" e "bronquite" são a mesma coisa porque todas afetam os pulmões. Um médico trata cada um de forma diferente. Um gestor de TI também.

A diferença fundamental está na resposta a três perguntas:

- O que aconteceu? **(Incidente)**
- O que o usuário pediu? **(Requisição)**
- O que causou isso? **(Problema)**

Entender essa diferença não é só teoria. É o que separa um profissional que apenas "abre chamados" de um profissional que realmente entende a plataforma.

---

## A Analogia do Restaurante

Para entender a diferença, imagine um restaurante.

**Incidente:** O cliente pediu um bife e veio queimado. Ou o garçom derrubou um copo de água na mesa. Ou o sistema de comandas caiu e ninguém consegue pedir. É uma falha na entrega do serviço. Algo que deveria funcionar não está funcionando.

**Requisição:** O cliente pede um copo de água, uma cerveja ou a conta. É um pedido padronizado de algo que o restaurante já oferece. Não é uma falha. É o cliente pedindo um serviço dentro do que é esperado.

**Problema:** O bife vem queimado sempre que o churrasqueiro B está no turno da noite. A causa raiz é que ele não foi treinado para usar a nova grelha. Descobrir isso e providenciar o treinamento resolve o problema de uma vez.

No ServiceNow, a lógica é exatamente a mesma.

---

## O que é um Incidente

Incidente é **qualquer interrupção não planejada ou redução na qualidade de um serviço de TI**.

Traduzindo: algo que deveria funcionar parou de funcionar ou está funcionando mal.

**Exemplos de incidentes:**

- Um funcionário não consegue acessar seu e-mail
- O sistema de folha de pagamento está lento
- A VPN caiu e ninguém consegue trabalhar de casa
- A impressora não imprime
- Um aplicativo fecha sozinho ao abrir um arquivo

### Características fundamentais

**Tem impacto no usuário agora.** O usuário está parado ou sendo prejudicado de alguma forma.

**Precisa de restauração rápida.** O objetivo primário não é descobrir a causa — é fazer o serviço voltar a funcionar o mais rápido possível, mesmo que com um workaround (solução temporária).

**Gera um registro na tabela `incident`.** Cada incidente tem seu próprio número (INC0010001, INC0010002, etc).

**Tem um ciclo de vida:** New → In Progress → Resolved → Closed.

> O ITIL não diz "descobrir a causa raiz". Diz "restaurar o serviço". A causa raiz é trabalho do Gerenciamento de Problemas.

---

## O que é uma Requisição de Serviço

Requisição de Serviço é um **pedido formal de um usuário para algo que já é padronizado, pré-aprovado e de baixo risco**.

Traduzindo: o usuário quer algo que a empresa já oferece como serviço. Não é uma falha. É um pedido.

**Exemplos de requisições:**

- "Quero acesso ao sistema SAP"
- "Preciso de um notebook novo"
- "Quero uma chave de acesso à sala 302"
- "Preciso instalar o Adobe Reader no meu computador"

### Características fundamentais

**É padronizada.** A empresa já definiu como atender aquele pedido.

**É pré-aprovada** (ou tem um fluxo de aprovação simples). Não precisa de um comitê para decidir.

**Não é uma falha.** O sistema não quebrou. O usuário só quer algo.

**Gera registros nas tabelas** `sc_request`, `sc_req_item` e `sc_task`.

> **A confusão comum:** Se um notebook quebra, o usuário abre um incidente (a quebra) ou uma requisição (o pedido de um novo)? A resposta é: ambos. O incidente registra a falha. A requisição registra o pedido de reposição.

---

## O que é um Problema

**Problema é a causa raiz, ou causa potencial, de um ou mais incidentes.**

Traduzindo: é o defeito escondido que está causando os sintomas que o usuário está vendo.

**Exemplos de problemas:**

- O servidor de e-mail reinicia sozinho toda noite porque uma atualização de segurança mal configurada força o reboot. Os usuários reclamam de lentidão pela manhã (incidentes), mas a causa é essa atualização (problema).
- Vários usuários relatam lentidão no sistema de vendas. A investigação revela que o banco de dados está com falta de índice em uma tabela crítica. Esse é o problema.

### Características fundamentais

**Pode existir mesmo sem incidente (problema proativo).** A equipe de TI pode analisar tendências e encontrar um defeito antes que ele cause uma falha.

**Não tem pressa de restauração.** Diferente do incidente, o problema pode ser investigado com calma.

**Gera um registro na tabela `problem`.** Cada problema tem seu próprio número (PRB0010001, PRB0010002, etc).

**Quando descoberta a causa raiz, o problema vira um Known Error (Erro Conhecido).**

> O objetivo do Gerenciamento de Problemas é **prevenir a ocorrência de incidentes**, **eliminar incidentes recorrentes** e **minimizar o impacto daqueles que não podem ser prevenidos**.

---

## Tabela comparativa

| Aspecto                  | Incidente                      | Requisição                    | Problema                              |
| ------------------------ | ------------------------------ | ----------------------------- | ------------------------------------- |
| **Propósito**            | Restaurar o serviço rápido     | Atender um pedido padronizado | Eliminar a causa raiz                 |
| **Pergunta**             | "O que quebrou?"               | "O que o usuário quer?"       | "Por que quebrou?"                    |
| **Urgência**             | Alta (usuário parado)          | Baixa a média                 | Baixa (investigação sem pressa)       |
| **Tabela no ServiceNow** | `incident`                     | `sc_request` / `sc_req_item`  | `problem`                             |
| **Quem abre**            | Usuário final ou monitoramento | Usuário final via catálogo    | Técnico ou gestor de TI               |
| **Solução típica**       | Workaround ou correção rápida  | Entrega do serviço solicitado | Correção definitiva na infraestrutura |

---

## O relacionamento entre os três

**Incidente pode gerar Problema.** Um incidente grave é resolvido com workaround, mas a mesma falha já aconteceu antes. Um problema é aberto para investigar a causa raiz, e os incidentes são vinculados a ele.

**Incidente NUNCA vira Problema.** Esta é uma regra importante. Você não "transforma" um incidente em problema. Você **cria um problema e vincula os incidentes a ele**. Os incidentes podem ser fechados enquanto a investigação continua no problema.

**Problema pode gerar Mudança.** Quando a causa raiz é descoberta, a solução definitiva geralmente exige uma Change Request.

**Incidente pode ser resolvido por um artigo da Knowledge Base.** O atendente consulta a base, encontra a solução e resolve sem precisar abrir um problema.

---

## Por que isso importa no ServiceNow (visão do desenvolvedor)

**Para Incidente, você configura:**

- Client Scripts e UI Policies para validar campos e orientar o atendente
- Business Rules para notificar grupos e atualizar campos automaticamente
- SLAs para medir tempo de resposta e resolução
- Flows para automatizar ações comuns

**Para Requisição, você configura:**

- Catalog Items com variáveis para capturar o que o usuário precisa
- Flow Designer para automatizar aprovações e entregas
- Variable Sets para reutilizar grupos de campos

**Para Problema, você configura:**

- UI Actions como "Create Problem" a partir de um incidente
- Estados de investigação (New, Assess, RCA, Fix in Progress)
- Campo Workaround para documentar solução temporária
- Relacionamento com Change Request para a correção definitiva

---

## Exemplo de código (para consulta futura)

Business Rule no `incident` que verifica se há incidentes recorrentes e cria um problema automaticamente:

```javascript
// Business Rule no incident (after update, estado = Resolved)
var grInc = new GlideRecord("incident");
grInc.addQuery("short_description", current.short_description);
grInc.addQuery("sys_id", "!=", current.sys_id);
grInc.addQuery("state", 6); // Resolved
grInc.query();

if (grInc.getRowCount() > 0) {
  var grProb = new GlideRecord("problem");
  grProb.initialize();
  grProb.short_description =
    "Incidentes recorrentes: " + current.short_description;
  grProb.description =
    "Problema criado automaticamente por múltiplos incidentes com a mesma descrição.";
  var probSysId = grProb.insert();

  current.problem_id = probSysId;
  current.update();

  gs.addInfoMessage(
    "Problema " + grProb.number + " criado devido a incidentes recorrentes",
  );
}
```

Este código faz exatamente o que o ITIL preconiza: incidentes recorrentes disparam a criação de um problema para investigação da causa raiz.

---

## O que estudar depois

- **Semana 3:** Scripts específicos para Incidente (Business Rules, Client Scripts)
- **Semana 5:** Configuração de Catálogo e Requisições (Catalog Items, Flow Designer)
- **Semana 3 (adicional):** Fluxo completo de Problem Management e Known Error

---

## Resumo para guardar

> **Incidente** é o sintoma. "A luz de óleo do carro acendeu."
>
> **Requisição** é o pedido. "Quero trocar o óleo do carro."
>
> **Problema** é a causa. "O motor está com folga no pistão."

No ServiceNow, cada um tem sua tabela, seus estados e suas automações. Misturá-los é o erro mais comum de quem está começando. Saber diferenciar é o que te torna profissional.
