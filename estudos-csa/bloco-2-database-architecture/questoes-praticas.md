# Questões de Treino — Bloco 2: The Database & Table Architecture

[← Voltar ao checklist do bloco](README.md) · [Sobre o banco de questões](../README.md#banco-de-questões-de-treino)

Pratique aqui depois de revisar o checklist deste bloco. Marque a alternativa que você acha correta antes de abrir "Ver resposta e explicação".

> As questões abaixo são sobre CMDB / Configuration Items — não é um bullet explícito do checklist deste bloco, mas encaixa aqui porque é, na prática, tabela e relacionamento (`cmdb_ci` e suas extensões, referenced/related records) aplicados a infraestrutura.

---

## Questões

### Q1 — Visualizar relacionamentos de CIs

Which ServiceNow utility provides a modern interactive graphical interface to visualize configuration items and their relationships?

- [ ] Flow Design
- [ ] CI Class Map
- [ ] Dependency View
- [ ] Business Service Map

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Dependency View** — interface gráfica interativa que mostra dependências e conexões entre CIs.
❌ Flow Design — cria/automatiza workflows, não visualiza relacionamentos de CI.
❌ CI Class Map — gerencia classes de CI na CMDB, sem interface gráfica interativa de relacionamentos.
❌ Business Service Map — mapeia serviços de negócio e suas dependências, não CIs individuais numa visão interativa.

</details>

---

### Q2 — Rastrear a conexão de um item de infraestrutura até os serviços dependentes

What enables you to trace the connection from an infrastructure item, like a Server, to the Services that are dependent on that Server?

- [ ] Automapping Utility
- [ ] Relationships
- [ ] Service Tracer
- [ ] Transform Map

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Relationships** — define e visualiza as conexões entre CIs (ex: servidor → serviços que dependem dele).
❌ Automapping Utility — ajuda a descobrir/mapear relacionamentos automaticamente, mas não é a ferramenta usada para "traçar" a conexão em si.
❌ Service Tracer — não existe como ferramenta padrão do ServiceNow para esse fim.
❌ Transform Map — mapeia dados no import, não relacionamentos de CMDB.

</details>

---

### Q3 — O que é gerenciado na CMDB

While using the CMDB, what do you call the component that needs to be managed in order to deliver services?

- [ ] Configuration Item
- [ ] Asset
- [ ] Catalog Items
- [ ] Data Flow
- [ ] Service Offerings

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Configuration Item (CI)** — é o componente que precisa ser gerenciado/rastreado para entregar um serviço; é a unidade básica da CMDB.
❌ Asset — recurso físico/virtual controlado pela organização, gerenciado por motivos financeiros/inventário; não é a definição de CI.
❌ Catalog Items — itens disponíveis para solicitação via Service Catalog, não são a unidade gerenciada na CMDB.
❌ Data Flow — descreve movimento de dados entre sistemas, não um componente gerenciado na CMDB.
❌ Service Offerings — representam os serviços oferecidos, não os componentes individuais que os sustentam.

</details>

---
