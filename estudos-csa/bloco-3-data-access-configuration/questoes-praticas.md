# Questões de Treino — Bloco 3: Data, Access & Configuration

[← Voltar ao checklist do bloco](README.md) · [Sobre o banco de questões](../README.md#banco-de-questões-de-treino)

Pratique aqui depois de revisar o checklist deste bloco. Marque a alternativa que você acha correta antes de abrir "Ver resposta e explicação".

---

## Questões

### Q1 — Mapear campos entre import set e tabela de destino

Which tool is used to define relationships between fields in an import set table and a target table?

- [ ] Schema Map
- [ ] Field Transformer
- [ ] Transform Map
- [ ] Transform Schema

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Transform Map** — mapeia campos da import set table para a tabela de destino, controlando a transformação e carga dos dados.
❌ Schema Map — mostra visualmente tabelas e relações do schema, não mapeia campos import → target.
❌ Field Transformer — transforma valores de campo durante o import, mas não define o mapeamento em si.
❌ Transform Schema — não é uma ferramenta real do ServiceNow para esse fim.

</details>

---

### Q2 — Mover homepage/dashboard entre instâncias

When moving a homepage or dashboard between instances, what must you remember?

- [ ] Download both as PDF and XML files
- [ ] They cannot be moved via update set
- [ ] The Platform will automatically add them to the update set
- [ ] Manually add them to the update set

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Manually add them to the update set** — é preciso adicionar manualmente o homepage/dashboard ao Update Set para que a migração funcione.
❌ Download both as PDF and XML files — desnecessário; XML é para export/import de configuração, PDF é só visualização.
❌ They cannot be moved via update set — falso, homepages e dashboards podem sim ser movidos por Update Set.
❌ The Platform will automatically add them to the update set — a plataforma não adiciona automaticamente; é uma ação manual.

</details>

---

### Q3 — Quem pode escrever artigos na base de conhecimento

On the knowledge base record, which tab would you use to define which users are able to write articles to the knowledge base?

- [ ] Can Contribute
- [ ] Cannot Author
- [ ] Can Read
- [ ] Can Write
- [ ] Can Author

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Can Contribute** — define, via User Criteria, quem pode escrever/contribuir artigos na base de conhecimento.
❌ Cannot Author — não existe como aba com essa função.
❌ Can Read — controla quem pode ler, não escrever.
❌ Can Write — parece certo pelo nome, mas a aba correta no ServiceNow chama-se "Can Contribute".
❌ Can Author — não é o nome real de nenhuma aba do knowledge base.

> Conexão com o bloco: "Can Contribute" / "Can Read" no Knowledge Management são um exemplo prático de **User Criteria** controlando acesso — o mesmo mecanismo do bullet "Role x ACL x User Criteria" do checklist deste bloco.

</details>

---

### Q4 — Primeiro passo para importar dados de planilha

What is the first step in the process to import spreadsheet data into ServiceNow?

- [ ] Select Import Set
- [ ] Run Data Scrubber
- [ ] Define Data Source
- [ ] Create import Set
- [ ] Set Coalesce

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Define Data Source** — primeiro passo: especificar de onde vêm os dados (ex: planilha) e configurar a conexão.
❌ Select Import Set — a import set só existe depois que a fonte de dados foi definida.
❌ Run Data Scrubber — a limpeza de dados acontece depois que os dados já estão na import set.
❌ Create import Set — a import set é criada depois de definir a fonte de dados.
❌ Set Coalesce — coalesce é configurado no Transform Map, já depois que a fonte de dados foi definida.

</details>

---
