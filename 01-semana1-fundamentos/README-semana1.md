# Semana 1 - Fundamentos + Incidentes

**Período:** 20/04/26 a 26/04/26

**Status:** ✅ Concluído

---

## Objetivo da Semana

Estabelecer uma base sólida na plataforma ServiceNow, compreendendo os conceitos fundamentais de ITSM (ITIL) e desenvolvendo habilidades práticas de navegação, gerenciamento de incidentes e organização de customizações via Update Sets.

---

## Conteúdos Estudados

### Teoria

| Tópico | Descrição |
|--------|-----------|
| O que é ServiceNow | Plataforma de workflow e ITSM em nuvem |
| Instâncias e PDI | Ambientes de desenvolvimento pessoal e suas características |
| ITIL: Incidente vs Requisição vs Problema | Diferenças fundamentais entre os três conceitos |
| Ciclo de vida do incidente | Estados: New, In Progress, Resolved, Closed, Canceled |
| Navegação na plataforma | Listas, filtros, formulários e favoritos |
| Update Sets | Pacotes de customização para transporte entre ambientes |

### Artigos Produzidos

1. `01-o-que-e-servicenow-instancias-pdi.md`
2. `02-itil-incidente-vs-requisicao-vs-problema.md`
3. `03-navegacao-listas-filtros-formularios.md`
4. `04-ciclo-de-vida-do-incidente.md`
5. `05-update-sets-conceito.md`

### Flashcards

Foram criados mais de 100 flashcards no Anki para revisão dos conceitos. Arquivo disponível em `flashcards-semana1.txt`.

---

## Práticas Realizadas

### Prática 1: Primeiros passos no PDI

- Criação de conta no Developer Site
- Solicitação e acesso ao PDI (Personal Developer Instance)
- Exploração dos módulos principais (Incidentes, Usuários, Grupos)

### Prática 2: Gerenciamento de Incidentes

- Criação de 5 incidentes com diferentes cenários
- Simulação do ciclo de vida completo de um incidente
- Registro de comentários e documentação de soluções

### Prática 3: Navegação e Filtros

- Aplicação de filtros em listas
- Criação de filtros salvos: "Incidentes Prioritários - Nova Fila" e "Meus testes"
- Personalização de colunas na lista de incidentes

### Prática 4: Personalização de Formulários

- Adição de campos personalizados: "Setor Afetado" e "Impacto no Negócio"
- Reorganização do layout do formulário de incidente
- Configuração de UI Policy para tornar campo obrigatório em prioridade Crítica

### Prática 5: Update Sets

- Criação de Update Set "Semana1 - Customizacoes Incidentes"
- Ativação como Current e desenvolvimento de mudanças
- Completação e exportação do Update Set como XML

### Prática 6: Teste de Proficiência

- Execução de tarefas sem consulta a anotações
- Criação, atribuição, resolução e fechamento de incidente
- Criação de filtro personalizado

---

## Entregáveis

Todos os entregáveis estão disponíveis na pasta `entregaveis/`:

| Arquivo | Descrição |
|---------|-----------|
| `print-lista-incidentes.png` | Lista com 5 incidentes criados |
| `print-incidente-fechado.png` | Incidente no estado Closed com comentários |
| `print-filtro-salvo.png` | Filtro aplicado na lista |
| `print-filtro-salvo-lateral.png` | Filtro salvo na barra lateral |
| `print-formulario-campos.png` | Formulário com campos personalizados |
| `print-ui-policy-config.png` | Configuração da UI Policy |
| `print-ui-policy-funcionando.png` | UI Policy em execução |
| `print-update-set-complete.png` | Update Set no estado Complete |
| `print-teste-proficiencia.png` | Teste prático realizado |
| `print-filtro-meus-testes.png` | Filtro personalizado "Meus testes" |
| `Semana1-Customizacoes-Incidentes.xml` | Update Set exportado |

---

## Reflexão e Aprendizados

### O que aprendi

1. O ServiceNow não é apenas uma ferramenta de chamados – é uma plataforma de workflow que conecta pessoas, processos e sistemas.

2. Incidente, Requisição e Problema são conceitos distintos no ITIL, e misturá-los é o erro mais comum de quem está começando.

3. O ciclo de vida do incidente (New → In Progress → Resolved → Closed) é o "coração" do gerenciamento de incidentes. Cada estado tem um propósito claro.

4. Filtros salvos são ferramentas simples mas poderosas para eficiência diária.

5. Update Sets são fundamentais para o desenvolvimento profissional. Eles separam quem faz mudança "na unha" de quem trabalha com rastreabilidade.

### Dificuldades encontradas

- Inicialmente confundi Update Set com Backup. Entendi que Update Set transporta configuração, não dados.
- UI Policy demorou um pouco para entender a diferença entre "Visible" e "Mandatory".
- A organização dos prints e documentação consumiu mais tempo do que o esperado – mas valeu a pena.

### Próximos passos

Na Semana 2, o foco será Client Scripts:
- onLoad (quando o formulário carrega)
- onChange (quando um campo muda)
- onSubmit (quando o formulário é enviado)
- Integração com UI Policies para comportamento avançado

---

## Flashcards Criados (amostra)

Os flashcards estão disponíveis no Anki. Abaixo, alguns exemplos:

| Pergunta | Resposta |
|----------|----------|
| O que é um Update Set? | Pacote de customizações movido entre instâncias |
| Quais os 5 estados do incidente? | New, In Progress, Resolved, Closed, Canceled |
| Diferença entre Incidente e Problema? | Incidente é o sintoma; Problema é a causa raiz |
| O que NÃO deve ir em um Update Set? | Dados, senhas, logs, propriedades específicas de ambiente |
| O que faz o estado Resolved? | Técnico resolveu; aguarda validação do usuário |

---

## Links Úteis

- [ServiceNow Developer Portal](https://developer.servicenow.com)
- [Meu PDI](https://[seu-pdi].service-now.com)
- [Documentação ITIL 4](https://www.axelos.com/itil-4)

---

## Horas de Estudo na Semana

| Atividade | Horas |
|-----------|-------|
| Teoria (leitura e artigos) | 5h |
| Prática no PDI | 6h |
| Produção de conteúdo (README, flashcards) | 2h |
| **Total** | **13h** |

---

*Este README será atualizado conforme novos aprendizados forem incorporados.*

*Próxima revisão: após conclusão da Semana 2*
