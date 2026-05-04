# Semana 2 — UI Scripts (Client Scripts)

**Autor:** Mendelson Aleixo  
**Instância:** PDI ServiceNow (versão Australia)  
**Update Set:** ESTUDO-S02-Mendelson-UIScripts.xml (exportado ao final)  
**Status:** Em andamento
**Período:** [maio/2026]

---

## Objetivo da semana

Compreender o funcionamento dos Client Scripts no ServiceNow, aprendendo a criar comportamentos dinâmicos no lado do cliente para validação, automação e melhoria da experiência do usuário nos formulários.

---

## Conhecimento estudado

| Tópico                     | O que saber                                               | Profundidade              |
| -------------------------- | --------------------------------------------------------- | ------------------------- |
| O que é um Client Script   | Script JavaScript que roda no navegador (lado do cliente) | Conceito + identificar    |
| Tipos de Client Script     | onLoad, onChange, onSubmit, onCellEdit                    | Saber quando usar cada    |
| onLoad                     | Executa quando o formulário carrega                       | Prático (PDI)             |
| onChange                   | Executa quando um campo específico muda                   | Prático (PDI)             |
| onSubmit                   | Executa antes de salvar (pode impedir envio)              | Prático (PDI)             |
| Objeto g_form              | Manipula campos do formulário                             | Prático (PDI)             |
| Objeto g_user              | Obtém informações do usuário logado                       | Prático (PDI)             |
| UI Policy vs Client Script | Declarativo vs código                                     | Conceito + saber explicar |

---

## Artigos produzidos

Cada conceito estudado foi documentado em um artigo próprio na pasta `artigos/`:

1. Client Scripts: tipos e quando usar
2. JavaScript para ServiceNow: g_form, g_user e alertas
3. onChange na prática: validar campos e preenchimento automático
4. onSubmit na prática: impedir salvamento com validações
5. UI Policy vs Client Script: qual usar e quando

---

## O que foi feito

### Ambiente e estrutura

- PDI mantido ativo durante toda a semana
- Update Set `Semana2-UIScripts` criado e mantido como _Current_
- 5 Client Scripts criados e testados na tabela Incident
- 1 UI Policy criada para comparação

---

## Client Scripts desenvolvidos

| Tipo       | Nome                            | Funcionalidade                           |
| ---------- | ------------------------------- | ---------------------------------------- |
| onLoad     | Saudação personalizada          | Exibe saudação e preenche "Solicitante"  |
| onChange   | Validação de prioridade crítica | Exige campo "Setor Afetado"              |
| onChange   | Preenchimento automático        | Preenche descrição com base na categoria |
| onSubmit   | Validação pré-salvamento        | Valida antes de salvar                   |
| onCellEdit | Validação inline                | Valida edição na lista                   |

---

## UI Policy (comparação)

- Torna "Setor Afetado" obrigatório quando prioridade = Crítica
- Objetivo: comparar abordagem declarativa vs programática

---

## Aprendizados técnicos

- UI Policy vs Client Script: declarativo vs flexível
- `isLoading` no onChange evita execução duplicada
- `g_form` manipula formulário / `g_user` traz dados do usuário
- `return false` no onSubmit impede salvamento
- `getValue()` vs `getDisplayValue()` é crítico
- Prefira `g_form.addInfoMessage()` em vez de `alert()`
- `setMandatory()` ≠ feedback visual → usar `showFieldMsg()`

---

## Dificuldades encontradas

- Campo não aparecia → resolvido via Form Layout
- onChange não disparava → campo precisava estar visível
- isLoading esquecido → execução duplicada
- Conflito UI Policy vs Script → separação de responsabilidades
- setValue em Choice → precisava valor técnico

---

## Comparação: UI Policy vs Client Script

| Critério               | UI Policy    | Client Script |
| ---------------------- | ------------ | ------------- |
| Complexidade           | Baixa        | Alta          |
| Manutenção             | Fácil        | Média         |
| Velocidade             | Muito rápida | Rápida        |
| Mostrar/esconder       | ✅           | ✅            |
| Tornar obrigatório     | ✅           | ✅            |
| Validação complexa     | ❌           | ✅            |
| API externa            | ❌           | ✅            |
| Mensagens customizadas | ❌           | ✅            |
| Assíncrono             | ❌           | ✅            |

**Conclusão:**  
Use UI Policy para regras simples e Client Script para lógica complexa.

---

## Entregáveis

| Entregável               | Arquivo                                             |
| ------------------------ | --------------------------------------------------- |
| onLoad                   | entregaveis/client-script-onload.js                 |
| onChange (validação)     | entregaveis/client-script-onchange-validacao.js     |
| onChange (preenchimento) | entregaveis/client-script-onchange-preenchimento.js |
| onSubmit                 | entregaveis/client-script-onsubmit.js               |
| UI Policy                | entregaveis/ui-policy-comparacao.md                 |
| Update Set               | update-sets/Semana2-UIScripts.xml                   |

---

## Reflexão sobre a semana

### O que aprendi

- Client Scripts são poderosos, mas não devem substituir UI Policy
- `isLoading` economiza horas de debugging
- `getValue` vs `getDisplayValue` é armadilha comum
- `g_user.hasRole()` permite personalização elegante
- Saber quando NÃO usar script é essencial

### Dificuldades que persistem

- Uso de `g_form.getReference()`
- Diferença prática entre `setValue` e `setDisplayValue`

---

## Próximos passos

Semana 3:

- Business Rules
- Script Includes
- GlideRecord

Foco: backend (server-side)

---

## 🔗 Links úteis

- Documentação oficial - Client Scripts
- Referência API g_form
- Referência API g_user
