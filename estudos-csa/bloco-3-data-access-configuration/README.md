# Bloco 3 — Data, Access & Configuration

[← Voltar à visão geral](../README.md)

**Peso ~42% da prova — maior bloco.** Checklist de estudo para ACLs, Import Sets/Transform Maps e Update Sets, com links para artigos e entregáveis já produzidos neste portfólio.

---

## Checklist

- [ ] ACLs: nível de tabela vs campo, operações (create/read/write/delete), role exigida, condition, script
  - [LAB 02 — Desenvolvimento & Dados](../../projetos/aumiau-virada-servicenow/docs/LAB02.md) — ACLs por papel nas tabelas `x_aumiau_categoria`, `x_aumiau_produto`, `x_aumiau_ouvidoria` e `x_aumiau_pedido` (admin com acesso total, usuário com CRUD restrito)
- [ ] Regra crítica: uma operação só é permitida se TODAS as ACLs aplicáveis forem satisfeitas — não basta satisfazer uma
- [ ] Import Sets (tabelas de staging), Transform Maps, field mapping, coalesce, scheduled imports
  - [Portal de Reparo de Computadores — README](../../projetos/portal-reparo-computador/README.md) — Import Sets está no roadmap (sprint PRC-06, ainda não iniciado nesta data)
  - ⚠️ Gap de conteúdo: nenhum artigo/entregável próprio sobre Import Sets/Transform Maps ainda — reforçar via simulados
- [ ] Update Sets: captura de configuração (não dados), local vs remoto, status "completed" antes de mover, batch install
  - [Update Sets (fundamentos)](../../fundamentos/fundamentos-platform/artigos/05-fundamentos-update-sets.md)
  - [Entregável — Update Set](../../fundamentos/fundamentos-platform/entregaveis/entregavel-update-set.md)
- [ ] Distinção Role x ACL x User Criteria (montar simulado dedicado a isso)
  - ⚠️ Ainda não existe uma pasta `/areas/csa-exam-prep` neste repositório com os erros já identificados — criar/consolidar esse material de simulado como próximo passo

---

## Nota de atenção

- **Coalesce mal configurado** gera duplicata em vez de update no Import Set.
- **Update Set "in progress"** não migra corretamente — precisa estar com status "completed" antes de exportar/mover.
