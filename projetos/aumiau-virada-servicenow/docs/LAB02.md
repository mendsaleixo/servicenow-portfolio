# LAB 02 — Desenvolvimento & Dados

## O que era esperado

Construir o modelo relacional de dados e a arquitetura de navegação da aplicação **AuMiau Pet Shop**, estruturando tabelas customizadas do zero, realizando a importação de dados via planilha Excel (`AuMiau-Produtos-Importacao.xlsx`), criando tabelas de processo estendidas a partir da tabela nativa `Task` para herança de fluxos de trabalho e organizando a interface em um Application Menu dividido em blocos lógicos.

---

## Como foi feito

1. **Missão 01 — Criação da Aplicação Escopada (`x_aumiau`):**
   - Acesso ao _ServiceNow Studio_ via _All Menu_ para iniciar uma nova aplicação escopada isolada.
   - Configuração dos dados principais da aplicação: nome (_AuMiau Pet Shop_), escopo (`x_aumiau`), descrição e inserção do logotipo oficial.
   - Criação das funções de acesso (_Roles_) de controle corporativo: `aumiau_admin` e `aumiau_user`.
     ![Aplicação Escopada](/projetos/aumiau-virada-servicenow/docs/screenshots/lab02_01.png)

2. **Missão 02 — Tabela de Categorias (`x_aumiau_categoria`):**
   - Criação de uma tabela em branco não extensível no Studio com o rótulo `Categoria` (`x_aumiau_categoria`).
   - Configuração da auto-numeração com prefixo `CAT`, número inicial `100` e `5` dígitos (`CAT00100`).
   - Configuração de permissões via ACLs por papel: Administrador com acesso total (`All`) e Usuário com permissões de CRUD sem exclusão (_Create, Read, Write_).
   - Cadastro manual dos 5 registros iniciais do catálogo corporativo: _Ração, Higiene, Brinquedos, Acessórios e Farmácia Pet_.
     ![Tabela de Categorias (criada do zero)](/projetos/aumiau-virada-servicenow/docs/screenshots/lab02_02.png)

3. **Missão 03 — Tabela de Produtos (`x_aumiau_produto`):**
   - Importação automatizada de dados a partir de planilha Excel (_`AuMiau-Produtos-Importacao.xlsx`_) utilizando a ferramenta _Table from spreadsheet_ no Studio.
   - Definição das propriedades com rótulo `Produto`, nome técnico `x_aumiau_produto`, prefixo `PRD` e `4` dígitos.
   - Atribuição de permissões de acesso completas de CRUD para administrador e usuário.
   - Validação do mapeamento de colunas e criação do campo de relacionamento (referência) ligando os produtos à tabela de `Categorias`.
     ![Tabela Produto (importada)](/projetos/aumiau-virada-servicenow/docs/screenshots/lab02_03.png)

4. **Missão 04 — Tabela de Ouvidoria (`x_aumiau_ouvidoria`):**
   - Construção de tabela estendida a partir da tabela nativa `Task` (`Create from an extensible table`) para gerenciar elogios, dúvidas e reclamações.
   - Configuração com o rótulo `Ouvidoria`, nome técnico `x_aumiau_ouvidoria`, prefixo `OUV` e `5` dígitos.
   - Definição de acessos por papel com privilégios totais para administradores e permissão de leitura (`Read`) para usuários.
   - Herança automática de campos essenciais de processo (`number`, `state`, `assigned_to`, SLA) e estruturação do formulário customizado.
     ![Tabela Ouvidoria (estendida)](/projetos/aumiau-virada-servicenow/docs/screenshots/lab02_04.png)

5. **Missão 05 — Tabela de Pedidos (`x_aumiau_pedido`):**

- Construção de tabela para registrar as compras de clientes, também estendida a partir da tabela nativa `Task`.
  - Configuração das propriedades com rótulo `Pedido`, nome técnico `x_aumiau_pedido`, prefixo `PED`, número inicial em `1000` e `5` dígitos.
  - Configuração de ACLs com acesso total (`All`) para administrador e usuário.
  - Criação e ajuste dos campos customizados específicos: produto (referência), data de entrega, nome do cliente (solicitante) e desconto.
    ![Tabela Pedido (estendida)](/projetos/aumiau-virada-servicenow/docs/screenshots/lab02_05.png)

6. **Missão 06 — Application Menu e Navegação:**
   - Criação de um Application Menu unificado nomeado _AuMiau Pet Shop_ no módulo de definições do sistema.
   - Geração de módulos de lista (_List of Records_) e novo registro (_New Record_) para cada uma das quatro tabelas da aplicação.
   - Organização visual da interface utilizando elementos separadores (_Separator_) para estruturar o menu final em quatro blocos lógicos (_Categorias, Produtos, Pedidos e Ouvidoria_).
     ![Tabela Ouvidoria (application menu)](/projetos/aumiau-virada-servicenow/docs/screenshots/lab02_06.png)

---
