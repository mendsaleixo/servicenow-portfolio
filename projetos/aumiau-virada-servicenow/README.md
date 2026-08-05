# AuMiau Pet Shop

Repositório do projeto prático desenvolvido durante o bootcamp **Virada ServiceNow** promovido pela **4MATT**, simulando a modernização e automação de uma rede de pet shops e e-commerce que operava de forma manual.

O projeto cobre o **ciclo de vida completo de uma aplicação na Now Platform**, estruturando desde a fundação técnica até painéis analíticos gerenciais.

---

## Visão Geral do Projeto

A **AuMiau Pet Shop** (fundada em 2015, com 8 lojas e e-commerce) operava com mais de 3.000 produtos baseada em planilhas soltas e controle manual via WhatsApp. O desafio técnico consistiu em migrar toda essa operação para uma **aplicação escopada corporativa no ServiceNow**, garantindo governança, automação de ponta a ponta e uma vitrine moderna para o cliente final.

---

## Arquitetura e Módulos Utilizados

A solução foi desenvolvida utilizando os principais pilares de desenvolvimento e configuração do ecossistema ServiceNow:

- **App Engine / Studio:** Criação de aplicação escopada (`x_aumiau`) e configuração de ACLs baseadas em papéis (`aumiau_admin` e `aumiau_user`).
- **Data Model & Data Management:**
  - Tabela customizada do zero (Categorias).
  - Importação de massa de dados via planilha Excel (Produtos).
  - Tabelas estendidas a partir da tabela `Task` (Ouvidoria e Pedidos) herdando numeração automática, estados e SLAs.
- **Service Catalog & Record Producers:** Implementação de _Item de Catálogo_ para pedidos formais com fluxo de aprovação (REQ/RITM) e _Record Producer_ com mapeamento de campos (_Map to field_) para geração de pedidos em um único clique.
- **Flow Designer:** Automação de processos de negócio baseada em eventos (gatilho de criação de registros, atualização automática de status e disparos condicionais de e-mails para casos críticos).
- **Service Portal & Branding Editor:** Criação de portal dedicado (`/aumiau`), enxugamento de menus de navegação, aplicação de identidade visual personalizada (paleta de cores, logotipos e ícones) e construção de homepage com widgets customizados e busca inteligente (_"Como posso AUjudar?"_).
- **Platform Analytics:** Construção de painel gerencial (_AuMiau — Gestão_) contendo visualizações em _Single Score_, barras horizontais (_Horizontal Bar_) e listas para acompanhamento de vendas, volume de pedidos e fila de atendimento.

---

## Estrutura dos Laboratórios (Etapas de Desenvolvimento)

- **LAB 01 — Fundação da Aplicação:** Configuração do ambiente inicial, escopo da aplicação (`x_aumiau`), plugin de tradução pt-BR e definição de perfis de acesso.
- **LAB 02 — Desenvolvimento & Dados:** Construção do modelo de dados relacional, importação de produtos via Excel e estruturação do menu de navegação da aplicação em blocos.
- **LAB 03 — Catálogo & Automação:** Implementação da experiência de solicitação via catálogo e automação de fluxo de atendimento para prioridades críticas no _Flow Designer_.
- **LAB 04 — Portal & Ouvidoria:** Criação e personalizzazione do _Service Portal_ (`/aumiau`), aplicação de branding visual da marca e estruturação da página inicial.
- **LAB 05 — Dashboards & Relatórios:** Inserção de dados de exemplo e criação de painel analítico gerencial consolidando indicadores de pedidos, produtos por categoria e ouvidoria.

---

## Galeria de Evidências

- **1. Service Portal (`/aumiau`):** [Ver print na pasta docs/portal.png](docs/)
  - _O que mostra:_ A homepage finalizada contendo o banner oficial da marca, o menu superior enxuto e o widget de busca customizado _"Como posso AUjudar?"_.
- **2. Automação no Flow Designer:** [Ver print na pasta docs/flow-designer.png](docs/)
  - _O que mostra:_ O fluxo configurado com gatilho de criação de pedidos, alteração automática de status para "Em atendimento" e o disparo condicional de e-mail para o grupo de suporte em casos de alta criticidade.
- **3. Dashboard de Gestão (Platform Analytics):** [Ver print na pasta docs/dashboard.png](docs/)
  - _O que mostra:_ O painel gerencial consolidado com 5 visualizações analíticas, incluindo indicadores de _Single Score_ para pedidos e a fila de ouvidoria.

---

## Sobre Mim

Profissional em transição/evolução para o ecossistema ServiceNow, com foco em desenvolvimento _low-code/pro-code_, automação de fluxos e criação de experiências digitais eficientes na Now Platform.

Acesse o meu [LinkedIn](https://www.linkedin.com/in/mendelson-aleixo/) para acompanhar minha trajetória profissional e novos projetos.

---
