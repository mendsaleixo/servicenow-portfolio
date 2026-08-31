# LAB 05 — Dashboards & Relatórios

## O que era esperado

Concluir o Projeto Final com foco gerencial: popular as tabelas `Pedido` e `Ouvidoria` com dados de exemplo e montar o dashboard **AuMiau — Gestão** no **Platform Analytics**, com 5 visualizações que dão à liderança a visão de vendas, atendimento e ouvidoria em um só lugar.

---

## Como foi feito

1. **Missão 01 — Registros (dar o que medir):**
   - Criação de pelo menos 10 registros na tabela `Pedido` (`x_aumiau_pedido`), com o campo `Assigned to` preenchido em 6 deles e vazio nos outros 4, para alimentar a visualização de pedidos sem atribuição.
   - Criação de pelo menos 10 registros na tabela `Ouvidoria`, variando prioridade e estado para uma lista mais realista.
   - Produtos já importados no LAB 02 não precisaram de novos registros — o foco ficou em `Pedido` e `Ouvidoria`.
     ![Registros — dar o que medir](/projetos/aumiau-virada-servicenow/docs/screenshots/lab05_01.png)

2. **Missão 02 — Dashboard (o painel de gestão):**
   - Criação do dashboard `AuMiau — Gestão` no _Platform Analytics_ (`All > Platform Analytics > Analytics Overview`), via _in-line editor_.
   - Dashboard criado vazio, pronto para receber as 5 visualizações das próximas missões.
     ![Dashboard — o painel de gestão](/projetos/aumiau-virada-servicenow/docs/screenshots/lab05_02.png)

3. **Missão 03 — Visualizações, parte 1 (volume e catálogo):**
   - **Single Score** "Todos os pedidos": tabela `Pedido`, sem condição — total geral de pedidos.
   - **Single Score** "Pedidos completos": tabela `Pedido`, condição `State is Closed Complete`.
   - **Horizontal Bar** "Produtos por categoria": tabela `Produto`, `Group by` Categoria, com `Show display label` ativado.
   - As três visualizações criadas via _Add new element > Data visualization_ e adicionadas ao dashboard `AuMiau — Gestão`.
     ![Visualizações — volume e catálogo](/projetos/aumiau-virada-servicenow/docs/screenshots/lab05_03.png)

4. **Missão 04 — Visualizações, parte 2 (vendas e atendimento):**
   - **Single Score** "Pedidos sem atribuição": tabela `Pedido`, condição `Assigned to is Empty`.
   - **List** "Ouvidoria — últimas manifestações": tabela `Ouvidoria`, colunas `Number`, `Priority`, `State`, `Assigned to`, `Short description`, `Task type`.
   - Organização final do painel: indicadores (_Single Score_) no topo, a distribuição de produtos por categoria no meio e a lista da ouvidoria embaixo.
     ![Visualizações — vendas e atendimento](/projetos/aumiau-virada-servicenow/docs/screenshots/lab05_04.png)

---
