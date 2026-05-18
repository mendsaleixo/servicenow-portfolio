# Semana 3 — Server Scripts (Essenciais)

**Autor:** Mendelson Aleixo  
**Instância:** PDI ServiceNow (versão Australia)  
**Update Set:** ESTUDO-S03-Mendelson-ServerScripts.xml (exportado)  
**Status:** ✅ Concluído  
**Período:** Maio/2026

---

## Objetivo da semana

Compreender o funcionamento básico dos scripts do lado do servidor no ServiceNow, focando no que é essencial para um desenvolvedor Júnior: entender o ecossistema, ler código legado e fazer pequenas customizações.

**Foco:** Entender, não dominar.

---

## Conhecimento estudado

| Tópico         | O que saber                                     | Profundidade                             |
| -------------- | ----------------------------------------------- | ---------------------------------------- |
| Business Rule  | Script que roda no servidor ao salvar/consultar | Criar o básico (before insert)           |
| GlideRecord    | API para consultar dados no banco               | Consultas simples (get, query, addQuery) |
| Script Include | Código reutilizável no servidor                 | Conceito (saber o que é)                 |
| GlideAjax      | Ponte entre Client Script e servidor            | Conceito (entender o fluxo)              |

---

## Artigos produzidos

Cada conceito estudado foi documentado em um artigo próprio na pasta `artigos/`:

| #   | Artigo                                                                                               |
| --- | ---------------------------------------------------------------------------------------------------- |
| 01  | [Business Rule básica (before insert, setAbortAction)](artigos/01-business-rules-basico.md)          |
| 02  | [GlideRecord: consultas simples (get, query, addQuery)](artigos/02-gliderecord-consultas-simples.md) |
| 03  | [Script Include + GlideAjax (conceitual)](artigos/03-script-include-conceitual.md)                   |

---

## O que foi feito

### Business Rule

- Criada uma Business Rule `before insert` na tabela Incident
- Valida se a descrição curta tem pelo menos 10 caracteres
- Impede o salvamento com `setAbortAction(true)`

### GlideRecord

- Executado script no Background Scripts para consultar incidentes críticos
- Utilizado `addQuery`, `query()`, `next()` e `getRowCount()`
- Listagem de incidentes no log do sistema

### Script Include (conceitual)

- Estudo do conceito: o que é, para que serve
- Entendimento do GlideAjax como ponte entre cliente e servidor
- Sem criação prática (apenas conceito)

---

## Aprendizados técnicos

- **Business Rule:** `before insert` executa antes de salvar. `setAbortAction(true)` impede o salvamento.
- **GlideRecord:** `query()` é obrigatório antes de `next()`. `get()` busca registro direto.
- **getValue vs getDisplayValue:** `getValue()` retorna valor técnico; `getDisplayValue()` retorna o label.
- **Script Include:** É uma biblioteca de funções reutilizáveis no servidor.
- **GlideAjax:** Ponte assíncrona entre Client Script e Script Include.

---

## Dificuldades encontradas

- **`isLoading` não existe no onLoad** — aprendi que isso é específico do onChange.
- **Campo `short_description` já é obrigatório nativamente** — ajustei a Business Rule para `description`.
- **Fluxo do GlideAjax é confuso no início** — entendi o conceito, mas não implementei na prática.

---

## O que NÃO foi feito (intencionalmente)

| Tópico                                         | Por que não foi feito                 |
| ---------------------------------------------- | ------------------------------------- |
| Business Rules complexas (after update, loops) | Não é comum Júnior criar isso         |
| GlideRecord avançado (joins, agregações)       | Flow e Catálogo resolvem              |
| Script Includes complexos                      | Raro em vaga júnior                   |
| GlideAjax prático                              | Será visto na Semana 6, se necessário |

---

## Entregáveis

### Business Rules e Scripts

| Entregável             | Arquivo                                              |
| ---------------------- | ---------------------------------------------------- |
| Business Rule (código) | `entregaveis/br-validar-descricao.js`                |
| GlideRecord (script)   | `entregaveis/gliderecord-consulta.js`                |
| Update Set exportado   | `update-sets/ESTUDO-S03-Mendelson-ServerScripts.xml` |

### Prints de funcionamento

| Entregável                       | Arquivo                                        |
| -------------------------------- | ---------------------------------------------- |
| Business Rule configurada        | `entregaveis/prints/br-config.png`             |
| Erro da Business Rule ao salvar  | `entregaveis/prints/br-erro.png`               |
| Código GlideRecord no Background | `entregaveis/prints/gliderecord-codigo.png`    |
| Resultado da consulta no log     | `entregaveis/prints/gliderecord-resultado.png` |

---

## Reflexão sobre a semana

### O que aprendi

1. **Business Rule** é útil para validações no servidor, mas muitas já são nativas
2. **GlideRecord** é a ferramenta para consultar dados — essencial saber o básico
3. **Script Include** existe, mas como Júnior meu foco não é criar um agora
4. **GlideAjax** é a ponte para buscar dados do servidor sem recarregar a página

### Para a Semana 4

O foco muda para **Catálogo, UI Policy e Record Producer** — o que realmente as empresas esperam de um desenvolvedor Júnior.

---

## Links úteis

- [Documentação - Business Rules](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/configure/business-rules/concept/c_BusinessRules.html)
- [Documentação - GlideRecord](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/configure/glide-record/concept/c_GlideRecord.html)
- [Documentação - Script Includes](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/configure/script-includes/concept/c_ScriptIncludes.html)

---
