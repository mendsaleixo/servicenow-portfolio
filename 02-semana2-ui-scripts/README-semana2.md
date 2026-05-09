# Semana 2 — UI Scripts (Client Scripts)

**Autor:** Mendelson Aleixo  
**Instância:** PDI ServiceNow (versão Australia)  
**Update Set:** [ESTUDO-S02-Mendelson-UIScripts.xml (exportado)](update-sets/Semana2-UIScripts.xml)  
**Status:** ✅ Concluído
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

| #   | Artigo                                                                                                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------ |
| 01  | [Client Scripts: tipos e quando usar](artigos/01-client-script.md)                                                             |
| 02  | [JavaScript para ServiceNow: g_form, g_user e alertas](artigos/02-%20JavaScript%20-para-ServiceNow.md)                         |
| 03  | [onChange na prática: validar campos e preenchimento automático](artigos/04-onsubmit-pratica-impedir-salvamento-validacoes.md) |
| 05  | [UI Policy vs Client Script: qual usar e quando](artigos/05-ui-policy-vs-client-script.md)                                     |

---

## O que foi feito

### Ambiente e estrutura

- PDI mantido ativo durante toda a semana
- Update Set [`Semana2-UIScripts`](<(update-sets/Semana2-UIScripts.xml)>) criado e mantido como _Current_
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

- isLoading com onLoading → não executa o script
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

### Códigos e configurações

| Entregável                                    | Arquivo                                                                                                    |
| :-------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| Client Script onLoad (código)                 | [entregaveis/client-script-onload.js](entregaveis/client-script-onload.js)                                 |
| Client Script onChange validação (código)     | [entregaveis/client-script-onchange-validacao.js](entregaveis/client-script-onchange-validacao.js)         |
| Client Script onChange preenchimento (código) | [entregaveis/client-script-onchange-preenchimento.js](entregaveis/client-script-onchange-preenchimento.js) |
| Client Script onSubmit (código)               | [entregaveis/client-script-onsubmit.js](entregaveis/client-script-onsubmit.js)                             |
| UI Policy (configuração)                      | [entregaveis/ui-policy-comparacao.md](entregaveis/ui-policy-comparacao.md)                                 |
| Update Set exportado                          | [update-sets/ESTUDO-S02-Mendelson-UIScripts.xml](update-sets/ESTUDO-S02-Mendelson-UIScripts.xml)           |

---

### Prints de funcionamento

| Entregável                                           | Arquivo                                                                                                                                    |
| :--------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| Client Script onChange (código)                      | [entregaveis/prints/01-client-script-onchange-codigo.png](entregaveis/prints/01-client-script-onchange-codigo.png)                         |
| Client Script onChange (funcionando)                 | [entregaveis/prints/02-client-script-onchange-funcionando.png](entregaveis/prints/02-client-script-onchange-funcionando.png)               |
| Client Script onLoad Atividade 1 (código)            | [entregaveis/prints/03-client-script-onload-codigo.png](entregaveis/prints/03-client-script-onload-codigo.png)                             |
| Client Script onLoad Atividade 1 (funcionando)       | [entregaveis/prints/04-client-script-onload-funcionando.png](entregaveis/prints/04-client-script-onload-funcionando.png)                   |
| Client Script onLoad - validação setor (código)      | [entregaveis/prints/05-client-script-onload-codigo.png](entregaveis/prints/05-client-script-onload-codigo.png)                             |
| Client Script onLoad - validação setor (funcionando) | [entregaveis/prints/06-client-script-onload-funcionando.png](entregaveis/prints/06-client-script-onload-funcionando.png)                   |
| Desafio onLoad (código)                              | [entregaveis/prints/07-client-script-onload-desafio-codigo.png](entregaveis/prints/07-client-script-onload-desafio-codigo.png)             |
| Desafio onLoad (funcionando)                         | [entregaveis/prints/08-client-script-onload-desafio-funcionando.png](entregaveis/prints/08-client-script-onload-desafio-funcionando.png)   |
| Atividade 1 onChange (código)                        | [entregaveis/prints/09-client-script-onchange-codigo.png](entregaveis/prints/09-client-script-onchange-codigo.png)                         |
| Atividade 1 - prioridade Crítica                     | [entregaveis/prints/10-client-script-onchange-prioridade-critica.png](entregaveis/prints/10-client-script-onchange-prioridade-critica.png) |
| Atividade 1 - prioridade Alta                        | [entregaveis/prints/11-client-script-onchange-prioridade-alta.png](entregaveis/prints/11-client-script-onchange-prioridade-alta.png)       |
| Desafio onChange (código)                            | [entregaveis/prints/12-client-script-onchange-desafio-codigo.png](entregaveis/prints/12-client-script-onchange-desafio-codigo.png)         |
| Desafio onChange - setor TI                          | [entregaveis/prints/13-client-script-onchange-desafio-ti.png](entregaveis/prints/13-client-script-onchange-desafio-ti.png)                 |
| Desafio onChange - setor RH                          | [entregaveis/prints/14-client-script-onchange-desafio-rh.png](entregaveis/prints/14-client-script-onchange-desafio-rh.png)                 |
| onSubmit Atividade 1 (código)                        | [entregaveis/prints/15-client-script-onsubmit-codigo.png](entregaveis/prints/15-client-script-onsubmit-codigo.png)                         |
| onSubmit - erro impacto obrigatório                  | [entregaveis/prints/16-onsubmit-erro-impacto-obrigatorio.png](entregaveis/prints/16-onsubmit-erro-impacto-obrigatorio.png)                 |
| Desafio onSubmit (código)                            | [entregaveis/prints/18-client-script-onsubmit-desafio-codigo](entregaveis/prints/18-client-script-onsubmit-desafio-codigo)                 |
| Desafio onSubmit - erro close notes                  | [entregaveis/prints/19-onsubmit-desafio-erro-close-notes.png](entregaveis/prints/19-onsubmit-desafio-erro-close-notes.png)                 |
| UI Policy (configuração)                             | [entregaveis/prints/21-ui-policy-config.png](entregaveis/prints/21-ui-policy-config.png)                                                   |
| UI Policy - campo obrigatório na prática             | [entregaveis/prints/22-ui-policy-critica-obrigatori.png](entregaveis/prints/22-ui-policy-critica-obrigatori.png)                           |
| Desafio final onChange (código)                      | [entregaveis/prints/23-client-script-onchange-desafio-codigo.png](entregaveis/prints/23-client-script-onchange-desafio-codigo.png)         |
| Desafio final - mensagem info (Crítica)              | [entregaveis/prints/24-onsubmit-desafio-mensagem-info.png](entregaveis/prints/24-onsubmit-desafio-mensagem-info.png)                       |
| Desafio final - mensagem warning (Alta)              | [entregaveis/prints/25-onsubmit-desafio-mensagem-warning.png](entregaveis/prints/25-onsubmit-desafio-mensagem-warning.png)                 |

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

## 🔗 Links úteis

- Documentação oficial - Client Scripts
- Referência API g_form
- Referência API g_user
