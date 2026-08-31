# LAB 03 — Catálogo & Automação

## O que era esperado

Implementar dois caminhos de solicitação de serviço no Service Catalog — um **Item de Catálogo** (`Solicitar nova categoria de produto`, com fluxo de aprovação via REQ/RITM) e um **Record Producer** (`Solicitar produto`, que grava direto na tabela `Pedido`, sem REQ/RITM) — e fechar o ciclo com um fluxo no **Flow Designer** que atende automaticamente cada novo Pedido, com alerta por e-mail para prioridades críticas.

---

## Como foi feito

1. **Missão 01 — Item de Catálogo "Solicitar nova categoria de produto":**
   - Criação do item pelo _Catalog Builder_ (`All > Catalog Builder > Create catalog item`), com nome e descrição curta explicando o pedido de nova categoria.
   - Publicação no catálogo `Service Catalog`, categoria `Loja AuMiau` (criada nesta missão).
   - Criação das variáveis (_Questions_): `nome_categoria` (Single Line Text, obrigatório), `descricao` (Multi Line Text, opcional) e `justificativa` (Multi Line Text, obrigatório).
   - Finalização com valores padrão em Access, Fulfillment e Review — ao submeter, gera uma REQ com RITM associado, que após atendimento cria uma nova Categoria em `x_aumiau_categoria`.
     ![Item de Catálogo — Solicitar nova categoria de produto](/projetos/aumiau-virada-servicenow/docs/screenshots/lab03_01.png)

2. **Missão 02 — Record Producer "Solicitar produto":**
   - Criação do Record Producer (`All > Maintain Items > New > Record Producer`), apontando a _Record submission table_ para `Pedido` — grava direto na tabela, sem carrinho e sem REQ/RITM.
   - Publicação no `Service Catalog`, categoria `Loja AuMiau`, ao lado do Item de Catálogo.
   - Criação das variáveis (_Questions_): `Produto` (Record reference), `Data da entrega` (Date), `Digite seu nome` (Single-line Text), `Prioridade` (Dropdown com valores da tabela `Pedido`, campo `priority`) e `Comentários adicionais` (Multi-line Text).
   - **Map to field** em cada variável, ligando ao campo correspondente do `Pedido` (Produto, Data da entrega, Cliente, Prioridade, Comentários) — sem esse passo o valor aparece no formulário mas não grava no registro.
   - Teste via Service Portal: preenchimento e envio criam o Pedido direto na tabela, já com todos os campos mapeados.
     ![Record Producer — Solicitar produto](/projetos/aumiau-virada-servicenow/docs/screenshots/lab03_02.png)

3. **Missão 03 — Flow: atendimento automático do Pedido:**
   - Criação do Flow no _Flow Designer_ (`All > Flow Designer > New > Flow`), com gatilho `Record Created` na tabela `Pedido`.
   - Ação **Update Record**: atualiza o próprio pedido (Data Pill `Trigger > Record`), mudando o `status` para _Em atendimento_.
   - Ação **Flow Logic > If**: valida se a `Prioridade` do pedido é _Crítica_ — só as ações dentro do bloco rodam para pedidos críticos.
   - Ação **Send Email** (dentro do If): dispara alerta para `pedido@aumiau.com.br` com Data Pills do pedido (número, produto, cliente) quando a prioridade é crítica.
   - Testes em _Test_ com um pedido crítico e outro não crítico, validando `Execution Details`, antes de ativar o fluxo (**Activate**).
     ![Flow — atendimento automático do Pedido](/projetos/aumiau-virada-servicenow/docs/screenshots/lab03_03.png)

---
