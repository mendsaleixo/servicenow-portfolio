# ⚡ LAB 03 — Catálogo & Automática

## O que era esperado

Implementar a experiência de solicitação de serviços por meio de um **Item de Catálogo** (com fluxo de aprovação REQ/RITM), um **Record Producer** para registro direto de pedidos, e automatizar a operação por meio de um fluxo no **Flow Designer**.

---

## Conceitos e Execução

1. Criação do Item de Catálogo _"Solicitar nova categoria de produto"_ via _Catalog Builder_ para gerenciar solicitações formais.
2. Desenvolvimento de um _Record Producer_ apontado para a tabela de Pedidos, aplicando o recurso fundamental de **Map to field** para garantir que as variáveis do portal ingressem corretamente nas colunas do registro.
3. Configuração de um fluxo no **Flow Designer** com gatilho de criação na tabela de Pedidos, automatizando a alteração de status para _"Em atendimento"_ e disparando um alerta condicional por e-mail para prioridades críticas.

---

## Comprovação Prática

> _A imagem abaixo comprova o sucesso da execução desta etapa:_

![Catálogo e Automação no Flow Designer](lab03-automacao.png)
