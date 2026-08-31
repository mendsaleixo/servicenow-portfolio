# LAB 06 — Desafio Extra

## O que era esperado

Turbinar a AuMiau Pet Shop com seis melhorias independentes e **opcionais**, além do escopo do Projeto Final: mensagem de confirmação no Record Producer, página de produtos no Service Portal, integração de CEP via Correios, Workspace de atendimento, ajustes na Homepage e uma etapa de aprovação no Flow do Pedido.

---

## Como foi feito

1. **Tarefa 01 — Mensagem de confirmação (Record Producer):**
   - Configuração de uma mensagem de confirmação no Record Producer `Solicitar produto` (do LAB 03), exibida ao usuário sempre que o formulário é submetido: _"Seu pedido foi enviado com sucesso para o time de Vendas!"_
     ![Mensagem de confirmação](/projetos/aumiau-virada-servicenow/docs/screenshots/lab06_01.png)

2. **Tarefa 02 — Página de produtos no portal:**
   - Criação da página `Lista de Produtos` no Service Portal da AuMiau, com URL `/produtos`.
   - Widget com a listagem completa da tabela `Produto`, e link de acesso incluído no menu do portal.
     ![Página de produtos no portal](/projetos/aumiau-virada-servicenow/docs/screenshots/lab06_02.png)

3. **Tarefa 03 — Consulta de CEP nos Correios:**
   - Criação dos campos de endereço no Record Producer `Solicitar produto`: `CEP`, `Endereço`, `Bairro`, `Estado` e `Cidade`.
   - Integração via chamada REST à Busca CEP dos Correios, disparada ao preencher o `CEP`, preenchendo automaticamente os demais campos de endereço.
     ![Consulta de CEP nos Correios](/projetos/aumiau-virada-servicenow/docs/screenshots/lab06_03.png)

4. **Tarefa 04 — Workspace de atendimento:**
   - Criação de um Workspace pelo _ServiceNow Studio_, na aplicação AuMiau, com a tabela `Pedido` adicionada para atendimento.
   - Acesso ao workspace publicado pelo menu superior _Workspaces_, após logoff/login na instância.
     ![Workspace de atendimento](/projetos/aumiau-virada-servicenow/docs/screenshots/lab06_04.png)

5. **Tarefa 05 — Capricho na home do portal:**
   - Correção da altura do banner da Homepage (estava cortando a imagem).
   - Substituição do widget "My Open Incidents" pela lista de `Pedidos` da AuMiau.
   - Ajustes finos adicionais de cores, textos e ícones.
     ![Capricho na home do portal](/projetos/aumiau-virada-servicenow/docs/screenshots/lab06_05.png)

6. **Tarefa 06 — Aprovação no fluxo:**
   - Nova action de aprovação como primeira etapa do Flow de atendimento do Pedido (do LAB 03), endereçada ao gerente do usuário que abriu o pedido.
   - Se aprovado, o fluxo segue normalmente; se rejeitado, o pedido é encerrado automaticamente e o usuário é notificado.
     ![Aprovação no fluxo](/projetos/aumiau-virada-servicenow/docs/screenshots/lab06_06.png)

---
