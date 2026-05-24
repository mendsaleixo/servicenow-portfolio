# Fundamentos da Plataforma — ITSM e Incident Management

Implementações práticas na plataforma ServiceNow para gerenciamento de incidentes, customização de formulários, controle de versão com Update Sets e aplicação de conceitos ITIL.

---

**Status:** ✅ Concluído | **Tipo:** Fundamentos | **Módulo:** ITSM / Incident Management

---

## Contexto do projeto

Configuração e operação do módulo de Incident Management no ServiceNow,
aplicando conceitos ITIL para gestão de chamados, personalização de formulários
e versionamento de customizações via Update Sets.

---

## Tecnologias e recursos utilizados

- Incident Management (ITSM)
- ITIL 4 (Incidente, Problema, Requisição)
- Form Layout e personalização de formulários
- UI Policies
- Update Sets
- Listas, filtros e navegação
- PDI (Personal Developer Instance)

---

## Navegação

### Artigos Produzidos

- [O que é ServiceNow, instâncias e PDI](artigos/01-introducao-instancias-pdi.md)
- [ITIL: Incidente vs Requisição vs Problema](artigos/02-itil-incidente-requisicao-problema.md)
- [Navegação: listas, filtros, formulários](artigos/03-navegacao-listas-filtros-formularios.md)
- [Ciclo de vida do incidente](artigos/04-ciclo-vida-incidente.md)
- [Update Sets (fundamentos)](artigos/05-fundamentos-update-sets.md)

### Evidências

- [Screenshots das implementações](entregaveis/prints/)

### Update Set

- [Exportação XML](update-sets/ESTUDO-S01-Mendelson-Fundamentos_ServiceNow.xml)

---

## Implementações realizadas

### Incident Management

| Atividade                    | Descrição                                                        |
| ---------------------------- | ---------------------------------------------------------------- |
| Criação de incidentes        | 5 incidentes simulando ambiente corporativo real                 |
| Ciclo de vida completo       | Incidente VPN: New → In Progress → Resolved → Closed             |
| Personalização de formulário | Campos `u_setor_afetado` (Choice) e `u_impacto_negocio` (Choice) |
| Filtros salvos               | "Incidentes Prioritários - Nova Fila" e "Meus Incidentes Ativos" |

### UI Policies

| Regra                                             | Comportamento                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| Setor Afetado obrigatório para prioridade crítica | Campo obrigatório quando Priority = Critical, com Reverse if false |

### Update Sets

- Update Set criado e mantido ativo durante toda a semana
- Captura de campos customizados, form layout, choices e UI Policies
- Exportado como XML ao final da semana

---

## Conceitos aplicados

| Conceito                     | Aplicação prática                                          |
| ---------------------------- | ---------------------------------------------------------- |
| Incident Management          | Abertura, acompanhamento e fechamento de chamados          |
| Ciclo de vida do incidente   | New → In Progress → Resolved → Closed                      |
| ITIL (Incidente vs Problema) | Diferenciação conceitual entre sintoma e causa raiz        |
| Update Set                   | Versionamento e transporte de customizações                |
| UI Policy                    | Comportamento dinâmico de formulários                      |
| Form Layout                  | Organização de campos no formulário                        |
| Choice Lists                 | Configuração de dropdowns com valores técnicos vs exibição |

---

## Observações técnicas

- **Work Notes vs Additional Comments:** Work Notes são internas (equipe); Additional Comments são visíveis ao usuário final
- **Element vs Label em Choice Lists:** Element exige nome técnico da coluna, não o label de exibição — erro comum que causa dropdown vazio
- **Reverse if false em UI Policies:** elimina a necessidade de criar uma segunda policy para desfazer a regra
- **On load em UI Policies:** necessário para que a policy seja avaliada ao abrir o formulário
- **Update Sets capturam configuração, não dados:** campos e UI Policies são transportados; registros de incidentes não entram no Update Set
- **View Default vs outras views:** a navegação pelo Application Navigator garante abertura na view correta com todos os campos disponíveis

---

## Estrutura do diretório

```text
01-semana1-fundamentos/
├── README-semana1.md
├── flashcards-semana1.txt
├── artigos/               # documentação técnica
├── entregaveis/           # evidências e testes
│   └── prints/            # screenshots
└── update-sets/           # exportações XML

---

## Links úteis

- [ServiceNow Developer Portal](https://developer.servicenow.com)
- [Comunidade ServiceNow](https://www.servicenow.com/community/)
- [Documentação ITIL 4](https://www.axelos.com/itil-4)
```
