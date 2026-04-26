# Semana 1 — Fundamentos + Incidentes

**Autor:** Mendelson Aleixo
**Instância:** PDI ServiceNow (versão Australia)
**Update Set:** ESTUDO-S01-Mendelson-Fundamentos_ServiceNow (exportado)
**Período:** 20/04/2026 a 26/04/2026
**Status:** ✅ Concluído

---

## Objetivo da Semana

Estabelecer uma base sólida na plataforma ServiceNow, compreendendo os
conceitos fundamentais de ITSM e ITIL, e desenvolvendo habilidades práticas
de navegação, gerenciamento de incidentes e organização de customizações
via Update Sets.

---

## Conhecimento estudado

| Tópico                     | O que saber                            | Profundidade              |
| -------------------------- | -------------------------------------- | ------------------------- |
| O que é ServiceNow         | Plataforma de workflow e ITSM em nuvem | Conceito                  |
| O que é um Incidente       | Interrupção não planejada de serviço   | Conceito + identificar um |
| Incidente vs Problema      | Sintoma vs Causa raiz                  | Conceito                  |
| Incidente vs Requisição    | Falha vs Pedido                        | Conceito                  |
| Ciclo de vida do Incidente | New → In Progress → Resolved → Closed  | Prático (PDI)             |
| Navegação básica           | Listas, filtros, formulários           | Prático no PDI            |
| Update Set                 | Pacote de customizações transportável  | Saber o que é             |

---

## Artigos produzidos

Cada conceito estudado foi documentado em um artigo próprio na pasta `artigos/`:

| #   | Artigo                                                                                         |
| --- | ---------------------------------------------------------------------------------------------- |
| 01  | [O que é ServiceNow, instâncias e PDI?](artigos/01-o-que-e-servicenow.md)                      |
| 02  | [ITIL: Incidente vs Requisição vs Problema](artigos/02-incidente-vs-requisicao-vs-problema.md) |
| 03  | [Navegação: listas, filtros, formulários](artigos/03-navegacao-listas-filtros-formularios.md)  |
| 04  | [Ciclo de vida do incidente](artigos/04-ciclo-de-vida-do-incidente.md)                         |
| 05  | [Update Sets (fundamentos)](artigos/05-update-sets-fundamentos.md)                             |

### Flashcards

Foram criados mais de 100 flashcards no Anki para revisão dos conceitos.
Arquivo disponível em `flashcards-semana1.txt`.

| Pergunta                              | Resposta                                                  |
| ------------------------------------- | --------------------------------------------------------- |
| O que é um Update Set?                | Pacote de customizações movido entre instâncias           |
| Quais os 5 estados do incidente?      | New, In Progress, Resolved, Closed, Canceled              |
| Diferença entre Incidente e Problema? | Incidente é o sintoma; Problema é a causa raiz            |
| O que NÃO deve ir em um Update Set?   | Dados, senhas, logs, propriedades específicas de ambiente |
| O que faz o estado Resolved?          | Técnico resolveu; aguarda validação do usuário            |

---

## O que foi feito

### Ambiente e estrutura

- PDI configurado e acessível na versão Australia
- 3 grupos criados: N1 - Suporte Técnico, N2 - Infraestrutura, N2 - Desenvolvimento
- 8 usuários criados com papéis ITIL e distribuídos nos grupos
- Update Set criado, mantido ativo durante toda a semana e exportado como XML ao final

### Incidentes

- 5 incidentes criados simulando um ambiente corporativo real, com categoria,
  subcategoria, impacto, urgência e atribuição corretamente preenchidos
- 1 incidente (INC001 – VPN) com ciclo de vida completo documentado:
  New → In Progress → Resolved → Closed
- `entregaveis/ciclo-de-vida.md` contém a linha do tempo, comentários
  e lições aprendidas

### Filtros

- 2 filtros salvos criados na lista de incidentes:
  "Incidentes Prioritários - Nova Fila" e "Meus Incidentes Ativos"

### Personalização de formulário

- 2 campos customizados criados na tabela Incident:
  `u_setor_afetado` (Choice) e `u_impacto_negocio` (Choice)
- Choices configuradas via `sys_choice.list` com vinculação correta
  pelo nome técnico do campo (Element)
- Campos posicionados no Form Layout logo abaixo de Short Description
  e Priority

### UI Policy

- 1 UI Policy configurada: campo Setor Afetado torna-se obrigatório
  quando Priority = Critical, com Reverse if false ativo para
  comportamento dinâmico bidirecional

---

## Aprendizados técnicos

- **Work Notes vs Additional Comments:** Work Notes são internas à equipe;
  Additional Comments chegam ao usuário final — usar o campo errado
  expõe informações técnicas que o usuário não deveria ver
- **Element vs Label em Choice Lists:** o campo Element exige o nome
  técnico da coluna (`u_setor_afetado`), não o label de exibição —
  erro comum que causa dropdown vazio; identificado via botão direito
  no campo → Show field name
- **Reverse if false em UI Policies:** elimina a necessidade de criar
  uma segunda policy para desfazer a regra — sempre ativar quando
  a ação deve ser reversível
- **On load em UI Policies:** necessário para que a policy seja avaliada
  ao abrir o formulário, não apenas ao alterar campos
- **Update Sets capturam configuração, não dados:** campos, choices,
  form layout e UI Policies são capturados; registros de incidentes,
  usuários e grupos não entram no Update Set
- **View Default vs outras views:** a navegação pelo Application Navigator
  (All → Incident) garante abertura na view correta para usuários com
  papel itil — outras views podem omitir campos importantes como Assigned to
- **UI Policy vs Business Rule:** UI Policies controlam comportamento visual
  no lado do cliente; Business Rules executam lógica no servidor — para
  validações visuais simples, UI Policy é a ferramenta correta

---

## Dificuldades encontradas

- Campo **Category** não aparecia no formulário na versão Australia —
  resolvido via Form Layout (Configure → Form Layout)
- **Choice Lists** criadas sem o Element correto resultaram em dropdown
  vazio — corrigido identificando o nome técnico via Show field name
- **Erro de CSRF token** ao criar incidente direto na lista — resolvido
  reabrindo a sessão
- Filtro "Meus Incidentes Ativos" não exibia resultados esperados —
  resolvido trocando para a Default view, que expõe os campos corretos
  para filtragem incluindo Assigned to
- Confusão inicial entre Update Set e Backup — entendido que Update Set
  transporta configuração, não dados
- UI Policy: demorou para entender a diferença prática entre os campos
  Visible, Mandatory e Read only na UI Policy Action

---

## Entregáveis

| Entregável                          | Arquivo                                                       |
| ----------------------------------- | ------------------------------------------------------------- |
| 5 incidentes criados                | `entregaveis/incidentes.md`                                   |
| Ciclo de vida INC001                | `entregaveis/ciclo-de-vida.md`                                |
| Filtros salvos                      | `entregaveis/filtros.md`                                      |
| Form Layout com campos customizados | `entregaveis/form-layout.md`                                  |
| UI Policy configurada               | `entregaveis/ui-policy.md`                                    |
| Update Set exportado                | `update-sets/ESTUDO-S01-Mendelson-Fundamentos_ServiceNow.xml` |

---

## Horas de estudo na semana

| Atividade                                              | Horas   |
| ------------------------------------------------------ | ------- |
| Teoria (leitura e artigos)                             | 5h      |
| Prática no PDI                                         | 6h      |
| Produção de conteúdo (README, flashcards, entregáveis) | 2h      |
| **Total**                                              | **13h** |

---

## Estrutura da pasta

```
01-semana1-fundamentos/
├── README-semana1.md
├── flashcards-semana1.txt
├── artigos/
│   ├── 01-o-que-e-servicenow.md
│   ├── 02-incidente-vs-requisicao-vs-problema.md
│   ├── 03-navegacao-listas-filtros-formularios.md
│   ├── 04-ciclo-de-vida-do-incidente.md
│   └── 05-update-sets-fundamentos.md
├── entregaveis/
│   ├── incidentes.md
│   ├── ciclo-de-vida.md
│   ├── filtros.md
│   ├── form-layout.md
│   ├── ui-policy.md
│   └── prints/
└── update-sets/
    └── ESTUDO-S01-Mendelson-Fundamentos_ServiceNow.xml
```

---

## Links úteis

- [ServiceNow Developer Portal](https://developer.servicenow.com)
- [Comunidade ServiceNow](https://www.servicenow.com/community/)
- [Documentação ITIL 4](https://www.axelos.com/itil-4)
