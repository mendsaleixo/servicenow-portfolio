# LAB 02 — Desenvolvimento & Dados

## O que era esperado

Construir o modelo relacional de dados da loja estruturando tabelas customizadas, realizando a importação de uma massa de dados via planilha Excel, estendendo a tabela nativa `Task` para processos de trabalho e organizando a navegação em um Application Menu por blocos.

---

## Como foi feito

1. Criação da tabela de Categorias (`x_aumiau_categoria`) do zero no Studio, configurando auto-numeração (`CAT`) e regras de CRUD por ACLs.
2. Importação da planilha de produtos (`AuMiau-Produtos-Importacao.xlsx`) para gerar a tabela de Produtos (`x_aumiau_produto`) já vinculada às categorias.
3. Criação das tabelas de **Ouvidoria** (`x_aumiau_ouvidoria`) e **Pedidos** (`x_aumiau_pedido`) estendidas a partir da tabela `Task`, herdando estados, numeração e controle de SLA.
4. Configuração de um **Application Menu** unificado com divisores (separators) dividindo a navegação em blocos lógicos.

---

## Comprovação Prática

> _A imagem abaixo comprova o sucesso da execução desta etapa:_

![Modelo de Dados e Menu](lab02-dados.png)
