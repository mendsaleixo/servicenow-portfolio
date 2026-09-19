# Análise de Requisitos: visão geral do curso e a conexão com o NexoSpaces

**Fonte:** resumo (via NotebookLM) da playlist de um curso de Análise de Requisitos, 14 módulos. Não é documentação oficial de nenhuma plataforma — é material de estudo próprio, então o que aparece aqui é o mapa do assunto, não uma verdade regulatória. Onde eu já tinha decisão tomada no NexoSpaces, cruzei com o `etapa00.md` do projeto pra não misturar teoria solta com o que já foi validado na prática.

---

## Introdução

Antes de qualquer código, qualquer tabela ou qualquer fluxo de aprovação, tem uma pergunta que decide se o projeto todo vai dar certo: *o que exatamente o sistema precisa fazer, e para quem?*

Foi essa pergunta que me fez recuar no NexoSpaces. Eu tinha a vontade de já sair desenhando o modelo de dados e o Service Catalog, mas parar pra formalizar "quem pede o quê, com que urgência, e o que conta como sucesso" foi o que virou o `etapa00.md` do projeto — o documento de contexto de negócio e levantamento de requisitos que hoje é a fonte de verdade para todas as etapas seguintes.

Essa disciplina de descobrir, organizar, validar e gerenciar o que um sistema precisa entregar é o que se chama **Análise de Requisitos**. Não é exclusiva de ServiceNow, nem de nenhuma plataforma — é a base de qualquer projeto de software, e é sobre isso que trata o curso resumido neste artigo.

---

## O que é Análise de Requisitos

**Análise de Requisitos** é a área responsável por descobrir, organizar, documentar e validar o que um sistema precisa fazer (e como precisa se comportar) antes — e durante — a construção. Ela existe porque a maior causa de retrabalho em projetos de software não é bug de código: é ter construído a coisa errada, ou ter entendido errado o que o cliente pediu.

Dentro dessa área, duas categorias organizam qualquer levantamento:

- **Requisitos Funcionais (RF)** — o que o sistema precisa *fazer*: uma tarefa, uma função, uma regra de negócio obrigatória.
- **Requisitos Não Funcionais (RNF)** — *como* o sistema precisa se comportar: desempenho, segurança, usabilidade, idioma, disponibilidade.

E toda análise de requisitos gira em torno de um terceiro elemento: os **stakeholders** — qualquer pessoa ou grupo impactado pelo sistema, direta ou indiretamente.

**Mini-cenário:** imagina o cenário As-Is do NexoSpaces antes desse projeto — pedidos de cabo HDMI e quedas de internet chegando pelo mesmo canal de WhatsApp, com a mesma "urgência aparente". Sem análise de requisitos, alguém decide na intuição o que atender primeiro. Com ela, existe um RF01 (portal de reserva), um RNF01 (SLA diferente por tipo de solicitação) e uma decisão registrada de que rede caindo e cabo emprestado não competem pela mesma fila.

---

## Os 14 módulos do curso

O curso organiza a disciplina em blocos que seguem, em grande parte, o ciclo de vida do requisito — do levantamento inicial até a gestão contínua de mudanças:

1. Introdução aos Requisitos de Software e Fundamentos
2. Elicitação e Levantamento de Requisitos
3. Análise, Especificação e Documentação de Requisitos
4. Validação e Verificação da Qualidade dos Requisitos
5. Gestão de Requisitos, Mudanças e Rastreabilidade
6. Modelagem de Requisitos com Diagramas UML
7. Prototipação Rápida para Validação com Usuários
8. Comunicação, Colaboração e Trabalho em Equipe
9. Desafios Comuns e Melhores Práticas na Análise
10. Estudos de Caso Práticos e Aplicação Real
11. Ferramentas e Tecnologias para Análise de Requisitos
12. Requisitos em Metodologias Ágeis e User Stories
13. Tendências Atuais, IA, PLN e Uso do ChatGPT
14. Exercícios Práticos, Avaliações e Fixação

Vou detalhar cada um a seguir — sem pular etapa, mas sem inflar o que é simples.

---

## Módulo 1 — Fundamentos

Cobre o vocabulário base: o que são requisitos, por que a área existe (evitar retrabalho) e qual o papel do analista no ciclo de vida do desenvolvimento.

- **Requisitos Funcionais** — tarefas/funções obrigatórias do sistema.
- **Requisitos Não Funcionais** — características de qualidade (desempenho, usabilidade, segurança).
- **Stakeholders** — qualquer pessoa/grupo impactado pelo sistema.

**Na prática:** distinguir se um pedido do cliente é funcionalidade indispensável ou regra de desempenho — a diferença entre "o sistema precisa permitir reserva de sala" (RF) e "a reserva precisa confirmar em menos de 2 segundos" (RNF).

## Módulo 2 — Elicitação e Levantamento

Cobre os métodos pra descobrir necessidades reais de usuários e negócio — a etapa que antecede qualquer documentação.

- **Entrevistas e Roteiros** — conversas diretas com perguntas direcionadas ao perfil do stakeholder.
- **Brainstorming e Workshops** — reuniões em grupo pra gerar volume de ideias sem julgamento prévio.
- **Observação Direta** — acompanhar o usuário no ambiente real de trabalho.

**Na prática:** reunir a equipe de operações pra entender por que o processo atual é lento, em vez de assumir a causa de antemão.

## Módulo 3 — Análise, Especificação e Documentação

Cobre a organização, classificação e escrita objetiva e padronizada das regras levantadas.

- **Priorização (Essenciais vs. Opcionais)** — separar o indispensável do secundário.
- **Especificação em Linguagem Natural** — redação clara, sem jargão excessivo.
- **Eliminação de Ambiguidades** — trocar termos vagos por critérios mensuráveis.

**Na prática:** redigir o documento de regras antes de repassar ao programador, evitando dúvida na hora de codificar.

## Módulo 4 — Validação e Verificação da Qualidade

Cobre a checagem de que a documentação está correta, viável e formalmente aprovada antes de começar a construir.

- **Revisão por Pares** — avaliação colaborativa do documento por outros profissionais.
- **Estudo de Viabilidade Técnica** — checar prazo, custo e capacidade tecnológica.
- **Aceite Formal** — aprovação oficial, assinada pelo cliente ou patrocinador.

**Na prática:** um requisito só devia ser considerado "pronto" quando passa por esse checklist — revisado, viável e aceito — não quando termina de ser escrito. É o equivalente, num levantamento de requisitos, ao estado "Draft" virar "Active": documentar não é suficiente, precisa validar e formalizar antes de liberar para construção.

## Módulo 5 — Gestão, Mudanças e Rastreabilidade

Cobre o acompanhamento do ciclo de vida dos requisitos e o controle organizado de mudanças de escopo depois que o projeto já começou.

- **Matriz de Rastreabilidade** — liga cada requisito a testes, código e origem.
- **Análise de Impacto de Mudanças** — avalia o reflexo de uma solicitação nova em prazo/custo/arquitetura.
- **Versionamento de Documentos** — controle histórico de revisões da especificação.

**Na prática:** calcular quantos dias a mais uma nova solicitação no meio do projeto vai exigir, em vez de simplesmente aceitar o pedido.

## Módulo 6 — Modelagem com Diagramas UML

Cobre a representação visual de regras, atores, interações e fluxos.

- **Diagrama de Casos de Uso** — interações entre atores e funcionalidades.
- **Diagrama de Sequência** — troca cronológica de mensagens entre componentes.
- **Diagrama de Estados** — fases/transições de um registro (pendente, aprovado, rejeitado).

**Na prática:** montar o fluxo visual de aprovação de um pedido pra a equipe inteira entender a ordem das validações sem depender só de texto.

## Módulo 7 — Prototipação Rápida

Cobre a construção de simulações e esboços visuais pra coletar feedback antes de programar.

- **Wireframes (baixa fidelidade)** — esboços estruturais sem foco estético.
- **Prototipagem de alta fidelidade** — telas interativas próximas do produto final.
- **POC / MVP** — versão enxuta pra testar a ideia na prática.

**Na prática:** rascunhar uma tela no Figma e mostrar ao usuário antes de programar — errar no wireframe custa minutos, errar no código custa dias.

## Módulo 8 — Comunicação e Trabalho em Equipe

Cobre o alinhamento transparente entre analistas, devs, QAs e stakeholders — sem isso, requisito bem escrito não sobrevive à execução.

- **Comunicação Adaptada ao Público** — ajustar linguagem técnica vs. de negócio.
- **Colaboração Interdisciplinar** — trabalho integrado entre design, dev, testes e gestão.
- **Resolução Construtiva de Conflitos** — mediar divergências de escopo.

**Na prática:** alinhar diariamente as regras de negócio com dev e QA, em vez de deixar a especificação "falar sozinha".

## Módulo 9 — Desafios Comuns e Boas Práticas

Cobre como lidar com requisitos conflitantes, falta de tempo, expectativas irreais e escopo volátil — os problemas reais do dia a dia da função.

- **Tratamento de Requisitos Conflitantes** — negociar pedidos incompatíveis.
- **Entrega Incremental** — dividir o projeto em blocos menores pra reduzir risco.
- **Gestão de Expectativas** — alinhar o que é viável entregar no prazo/orçamento.

**Na prática:** apresentar o custo de duas solicitações opostas pra ajudar quem decide a chegar num consenso, em vez de tentar agradar as duas partes.

## Módulo 10 — Estudos de Caso Práticos

Cobre a aplicação dos conceitos em cenários reais (biblioteca, delivery, ERP).

- **Mapeamento do Fluxo Existente** — levantar o processo manual/antigo antes de desenhar o novo.
- **Migração e Limpeza de Dados Legados** — padronizar e transferir dados do sistema antigo.
- **Integração de Sistemas** — conectar o software a APIs/serviços externos.

**Na prática:** entender como o cliente gerencia o processo hoje (mesmo que seja numa planilha) antes de desenhar a automação — é exatamente o exercício que o cenário As-Is do NexoSpaces já forçou a fazer.

## Módulo 11 — Ferramentas e Tecnologias

Cobre as ferramentas de mercado usadas pra documentar, desenhar, gerenciar e prototipar requisitos.

- **Gestão (Jira, Trello)** — backlog, Kanban, acompanhamento de progresso.
- **Diagramação (Draw.io, Lucidchart)** — fluxogramas e diagramas UML.
- **Prototipagem (Figma, Adobe XD)** — construção visual e interativa de interfaces.

**Na prática:** especificação escrita, diagrama em ferramenta de diagramação, cards de acompanhamento em ferramenta de gestão — três ferramentas, três funções distintas, sem tentar forçar uma só a fazer tudo.

## Módulo 12 — Requisitos em Metodologias Ágeis

Cobre como o requisito é tratado no modelo ágil — User Stories, critérios de aceitação, ciclos curtos — em vez do documento fechado do modelo tradicional (cascata).

- **User Stories** — formato "Como [usuário], quero [ação], para [objetivo]".
- **Critérios de Aceitação** — condições mínimas pra considerar a história concluída.
- **Refinamento de Backlog** — reunião pra detalhar e fatiar histórias com o time.

**Na prática:** "Como membro do coworking, quero acompanhar o status da minha solicitação, para não precisar perguntar no WhatsApp se já foi atendida" — isso já é RF06 do NexoSpaces reescrito em formato de User Story.

## Módulo 13 — IA, PLN e Tendências Atuais

Cobre o uso de IA e processamento de linguagem natural pra acelerar a escrita e a validação de requisitos.

- **Geração Automatizada de Histórias e Testes** — rascunhos via prompt.
- **PLN** — leitura/extração de regras a partir de texto bruto.
- **Elaboração de Atas e Resumos** — transformar anotações soltas em ata formal.

**Na prática:** colocar anotações soltas de uma reunião numa IA pra gerar um rascunho de User Stories e ata — rascunho, não decisão final; quem valida e aprova continua sendo humano.

## Módulo 14 — Exercícios e Fixação

Cobre atividades práticas e simulados pra consolidar o conteúdo do curso.

- **Exercícios de Fixação** — redigir requisitos e desenhar diagramas.
- **Avaliações de Desempenho** — testes de retenção.

**Na prática:** pegar uma funcionalidade real de um projeto próprio e praticar User Story + diagrama — é literalmente o que a seção seguinte deste artigo faz com o NexoSpaces.

---

## Como as fases se conectam

Os módulos 1 a 5 descrevem, na prática, o ciclo de vida de um requisito — da descoberta até a mudança controlada:

```text
Fundamentos (o que é RF/RNF/stakeholder)
        ↓
Elicitação (entrevista, workshop, observação)
        ↓
Análise e Especificação (priorizar, escrever, tirar ambiguidade)
        ↓
Validação (revisão de pares, viabilidade, aceite formal)
        ↓
Gestão contínua (rastreabilidade, impacto de mudança, versionamento)
        ↺ (nova solicitação reabre o ciclo a partir da elicitação)
```

Os demais módulos (6 a 14) não são uma fase seguinte nessa linha — são **técnicas e contextos que atravessam essas cinco fases**: UML e prototipação apoiam a análise e a validação; comunicação e desafios comuns atravessam o ciclo inteiro; ferramentas, ágil, IA e estudos de caso são o "como" prático de tudo isso no dia a dia.

---

## Boas práticas

### Separar RF de RNF desde a primeira anotação

Misturar "o que o sistema faz" com "como ele deve se comportar" na mesma frase é a origem mais comum de ambiguidade. Anotar já com o rótulo (RF/RNF) força a pergunta certa: isso é uma função ou uma característica de qualidade?

### Nomear e identificar requisitos de forma rastreável

Assim como este repositório segue uma convenção de escopo em minúsculo para identificar projeto/sprint nos commits (`prc-04`, `onboarding`), um levantamento de requisitos precisa de um identificador estável por item — `RF01`, `RNF01` — pra que ele possa ser referenciado em diagrama, User Story, teste e commit sem ambiguidade sobre a qual requisito cada um se refere.

### Priorizar o essencial antes do avançado

Nem todo módulo pesa igual no dia a dia. Pra quem está começando, faz mais sentido dominar primeiro:

- diferença entre RF e RNF (Módulo 1);
- identificação de stakeholders e elicitação por entrevista (Módulos 1-2);
- formato de User Story e critérios de aceitação (Módulo 12);
- diagrama de casos de uso (Módulo 6);
- wireframes de baixa fidelidade (Módulo 7);
- clareza e priorização, eliminando ambiguidade (Módulo 3).

E deixar pra depois — sem culpa — o que é mais situacional: matriz de rastreabilidade completa, diagramas UML avançados (sequência, estados), migração de dados legados (só relevante se houver sistema antigo a substituir) e estudo de viabilidade técnica/financeira formal (papel mais de gerência que de analista júnior).

### Não pular a validação formal

Um requisito sem aceite formal (Módulo 4) é uma suposição, não uma decisão de projeto. Vale como boa prática mesmo em projeto autoral/portfólio: registrar a data e a versão em que um requisito foi "fechado" evita retrabalho quando o escopo for revisitado meses depois.

---

## Aplicação prática no NexoSpaces

O `etapa00.md` do NexoSpaces é, na prática, o produto dos Módulos 1 a 5 aplicado a um caso real:

- **Elicitação (Módulo 2):** o levantamento partiu do cenário As-Is — os canais de entrada informais (WhatsApp/e-mail) e as dores por área (TI não distingue urgência real, Facilities usa planilha solta, diretoria decide sem métrica, membros não têm visibilidade de status). Isso é observação do processo existente, o mesmo tipo de trabalho descrito no Módulo 10 (mapear o fluxo antigo antes de desenhar o novo).
- **Stakeholders (Módulo 1):** a seção 5 do `etapa00.md` já lista as personas do projeto — Membro, Community Manager, Técnico de TI, Equipe de Facilities e Diretoria — cada uma com uma necessidade principal distinta no novo sistema. É a aplicação direta do conceito de stakeholder: cada grupo é impactado de um jeito diferente pela mesma plataforma.
- **Especificação (Módulo 3):** os requisitos já saem classificados e identificáveis — sete Requisitos Funcionais (RF01 a RF07, ex: portal de reserva, catálogo de equipamento, triagem de incidentes de TI) e quatro Requisitos Não Funcionais (RNF01 a RNF04, ex: SLA por tipo de solicitação, perfis de acesso distintos, rastreabilidade completa). A separação RF/RNF não foi acidental — foi o que permitiu, por exemplo, isolar "SLA diferenciado" (RNF01) como uma característica transversal, em vez de repeti-la dentro de cada requisito funcional.
- **Escopo e fora de escopo (Módulo 3/9):** o `etapa00.md` também documenta explicitamente o que fica de fora por ora — integração de billing, gestão financeira, app mobile nativo. Isso é gestão de expectativas (Módulo 9) e priorização (Módulo 3) na prática: dizer não a algo é parte do trabalho de análise, não uma limitação.
- **Rastreabilidade (Módulo 5):** cada RF já nasce ligado à etapa do projeto onde será construído (ex: RF01 → Etapa 5 — Portal; RF07 → Etapa 6 — Dashboards). Essa tabela é uma matriz de rastreabilidade simplificada — conecta requisito a entrega, o que facilita medir impacto se um requisito mudar mais adiante.
- **Próximo passo natural (Módulo 12):** os RFs do NexoSpaces já estão escritos como requisito funcional formal, mas ainda não como User Story. Reescrever, por exemplo, o RF06 ("Acompanhamento de status da solicitação pelo próprio membro") no formato "Como membro, quero ver o status da minha solicitação, para não depender do WhatsApp" é o exercício natural de conectar este curso à Etapa 5 do projeto, quando o portal for desenhado.

---

## Conclusão

Os 14 módulos do curso cobrem, no fim das contas, cinco competências centrais: descobrir o que o sistema precisa fazer (elicitação), organizar isso com clareza (especificação), confirmar que está certo antes de construir (validação), acompanhar o que muda ao longo do projeto (gestão e rastreabilidade) e comunicar tudo isso pras pessoas certas, no formato certo (diagramas, protótipos, User Stories, ferramentas).

O `etapa00.md` do NexoSpaces mostra que essas competências não são teoria de curso — são o motivo pelo qual dá pra abrir um projeto de ITSM sabendo exatamente o que construir em cada etapa, em vez de desenhar tabela e fluxo de aprovação por tentativa e erro. Mais importante do que decorar o nome de cada módulo é internalizar essa disciplina: nenhum requisito deveria virar código antes de estar identificado, classificado, aceito e rastreável — o resto (UML, ferramenta, IA) é o que ajuda a chegar lá mais rápido, não o que substitui o processo em si.
