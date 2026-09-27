# NexoSpaces — Etapa 2: Fundação Técnica

> Continuação da Etapa 1 (arquitetura e mapeamento ITIL). Primeira etapa de build real — cria a base sobre a qual todas as etapas seguintes (3 a 7) são construídas. Sem isso pronto, nenhuma tabela, catálogo ou portal tem onde morar.

## Objetivo da Etapa

Criar o ambiente inicial da aplicação NexoSpaces na plataforma: escopo próprio, idioma, preferências e os perfis de acesso básicos — a infraestrutura mínima pra começar a modelar dados na Etapa 3.

## O Que Será Criado

- **Aplicação escopada:** `x_nexospaces`
- **Plugin de tradução:** `I18N: Brazilian Portuguese Translations` ativado globalmente (é a única forma — pacote de idioma não é escopável, e não pode ser desinstalado depois). O que muda por público não é o plugin, é a preferência de idioma de cada perfil de usuário
- **Preferências de usuário:** fuso horário e formato de data configurados pro contexto brasileiro; campo `Language` do meu perfil (admin) e dos técnicos de TI fica `English`; perfis de membro (portal) ficam `Portuguese`
- **Roles próprias:**
  - `nexospaces_admin` — acesso total à configuração da aplicação
  - `nexospaces_user` — acesso operacional (Community Manager, TI, Facilities), sem poder de configuração

## Decisões de Arquitetura

- **Por que app escopada, não global:** isolamento de tabelas, roles e lógica dentro do próprio namespace — evita colisão com o que já existe na instância (inclusive o AuMiau) e deixa claro, pra quem for revisar o código, onde termina uma aplicação e começa a outra.
- **Por que só 2 roles nesta etapa, não 5 (uma por persona):** a Etapa 0 mapeou 5 personas (Membro, Community Manager, Técnico de TI, Facilities, Diretoria), mas granularizar ACL por persona agora seria prematuro — a lógica de acesso fina (RNF03) só faz sentido depois que as tabelas existirem (Etapa 3) e o catálogo estiver de pé (Etapa 4). Por isso as 2 roles aqui são deliberadamente largas; o refinamento por persona é tratado explicitamente mais adiante (post de ACL por perfil, 26/10).
- **Por que Update Set desde o dia 1, não só documentação depois:** cada etapa fecha com um Update Set nomeado, versionado no GitHub — é o que torna o histórico de commits do projeto uma prova de processo real, não só o resultado final.
- **Por que o primeiro Update Set já se chama "ETAPA2", sem "ETAPA0" ou "ETAPA1" antes dele:** Etapas 0 e 1 foram levantamento de negócio e mapeamento ITIL — nenhuma configuração de plataforma aconteceu nelas, então não existe o que capturar num Update Set. A numeração pula de propósito, não por arquivo perdido; essa explicação também vive na Description do próprio Update Set na PDI, não só aqui.
- **Por que o Studio fica em inglês, mas o Service Portal em pt-BR:** RNF02 (interface pt-BR) é pensado pro membro do coworking, não pra quem administra. O pacote de idioma (`I18N: Brazilian Portuguese Translations`) precisa ser ativado globalmente — não existe versão escopada dele. A separação de experiência não vem do plugin, vem de duas camadas: o campo `Language` de cada perfil de usuário (admin/TI = English, membros = Portuguese, controlando a tradução nativa da plataforma), e a tabela `sys_ui_message`, escopada em `x_nexospaces`, guardando as traduções dos textos que eu mesmo escrevo no portal (ex: o botão "Reservar Sala") — assim, se o app for exportado pra outra instância um dia, essas traduções próprias vão junto no pacote.

## Critérios de Conclusão (Definition of Done)

- Aplicação `x_nexospaces` criada e visível no Studio
- Plugin de idioma pt-BR ativado (globalmente); perfis de admin/TI em `English`, perfis de membro em `Portuguese`; ao menos uma mensagem customizada traduzida via `sys_ui_message` no escopo `x_nexospaces`, testada no Service Portal (RNF02)
- As duas roles criadas e testadas (login como cada uma, confirmando visibilidade correta)
- Repositório GitHub recebendo commits direto do ServiceNow IDE
- Primeiro Update Set fechado

---

**Próximo passo (Etapa 3):** com a fundação pronta, o modelo de dados entra — tabelas de Espaços e Reservas, e as tabelas estendidas de Task (Incidentes de TI, Chamados de Facilities) que vão sustentar a Etapa 4.
