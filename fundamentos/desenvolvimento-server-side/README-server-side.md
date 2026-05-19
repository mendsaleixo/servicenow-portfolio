# Desenvolvimento Server-Side — Business Rules e GlideRecord

Implementações práticas utilizando Business Rules e GlideRecord na plataforma ServiceNow para validações no servidor e consulta de dados ITSM.

---

**Status:** ✅ Concluído | **Tipo:** Fundamentos | **Módulo:** Server Scripts

---

## Contexto do projeto

Validações de dados no servidor e consultas ao banco de dados utilizando GlideRecord,
preparando o terreno para entender código legado e fazer pequenas customizações
no backend da plataforma.

**Foco:** Entender o ecossistema, não dominar scripts complexos.

---

## Tecnologias e recursos utilizados

- Business Rules (before insert)
- GlideRecord (consultas simples)
- Script Includes (conceito)
- GlideAjax (conceito)
- Background Scripts
- Update Sets

---

## Navegação

### Artigos Produzidos

- [Business Rule básica (before insert, setAbortAction)](artigos/01-business-rules-basico.md)
- [GlideRecord: consultas simples (get, query, addQuery)](artigos/02-gliderecord-consultas-simples.md)
- [Script Include + GlideAjax (conceitual)](artigos/03-script-include-conceitual.md)

### Evidências

- [Screenshots das implementações](entregaveis/prints/)

### Update Set

- [Exportação XML](update-sets/ESTUDO-S03-Mendelson-ServerScripts.xml)

---

## Implementações realizadas

### Business Rules

| Tipo          | Implementação                                      |
| ------------- | -------------------------------------------------- |
| before insert | Validação de descrição (mínimo 10 caracteres)      |
| before insert | Impedimento de salvamento com setAbortAction(true) |

### GlideRecord (Background Scripts)

| Operação                | Descrição                                |
| ----------------------- | ---------------------------------------- |
| Consulta com filtro     | Busca incidentes críticos (priority = 1) |
| addQuery + query + next | Percorre resultados e exibe no log       |
| getRowCount()           | Conta total de incidentes encontrados    |

### Script Includes (conceitual)

| Conceito       | Entendimento                                      |
| -------------- | ------------------------------------------------- |
| O que é        | Biblioteca de funções reutilizáveis no servidor   |
| Para que serve | Centralizar lógica complexa                       |
| GlideAjax      | Ponte para chamar Script Include do Client Script |

---

## Conceitos aplicados

| Conceito        | Aplicação prática                               |
| --------------- | ----------------------------------------------- |
| Business Rule   | Validação no servidor antes de salvar           |
| setAbortAction  | Impedimento de salvamento quando regra falha    |
| GlideRecord     | Consulta de dados no banco                      |
| addQuery        | Filtro de resultados                            |
| getValue        | Valor técnico do campo                          |
| getDisplayValue | Label exibido do campo                          |
| Script Include  | Reutilização de código no servidor (conceitual) |
| GlideAjax       | Comunicação assíncrona cliente-servidor         |

---

## Observações técnicas

- **Business Rule:** `before insert` executa antes de salvar; `setAbortAction(true)` impede o salvamento
- **GlideRecord:** `query()` é obrigatório antes de `next()`; `get()` busca registro direto sem query
- **getValue vs getDisplayValue:** `getValue()` retorna valor técnico (ex: "1"); `getDisplayValue()` retorna label (ex: "Critical")
- **Script Include:** É uma biblioteca de funções; como Júnior, o foco é saber que existe
- **GlideAjax:** Ponte assíncrona que permite Client Script buscar dados no servidor

---

## O que não foi feito (intencionalmente)

| Tópico                                                              | Motivo                                                    |
| ------------------------------------------------------------------- | --------------------------------------------------------- |
| Business Rules complexas (after update, loops, previous vs current) | Não é comum Júnior criar do zero                          |
| GlideRecord avançado (joins, agregações complexas)                  | Flow Designer resolve casos mais simples                  |
| Script Includes complexos (criação do zero)                         | Raro em vagas júnior                                      |
| GlideAjax prático (implementação)                                   | Conceito é suficiente; prática fica para projetos futuros |

---

## Estrutura do diretório

```text
artigos/        -> documentação técnica
entregaveis/    -> screenshots e testes
update-sets/    -> exportações XML

```
