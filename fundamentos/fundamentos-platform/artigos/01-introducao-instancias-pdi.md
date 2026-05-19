# O que é ServiceNow, instâncias e PDI?

**Data:** 20/02/2026
**Semana:** 1 — Fundamentos
**Fonte:** SNAF Módulos 1 e 2 + Prática própria
**Tópicos relacionados:** Incident Management, Service Catalog

---

## O que é o ServiceNow

ServiceNow é uma plataforma de nuvem que ajuda empresas a gerenciar e
automatizar fluxos de trabalho. Em vez de usar planilhas, e-mails ou
sistemas separados para TI, RH, atendimento ao cliente e outras áreas,
a empresa centraliza tudo no ServiceNow.

Pense no ServiceNow como um grande "orquestrador". Ele conecta pessoas,
processos e sistemas em um único lugar. Quando um funcionário abre um
chamado, pede um notebook ou reporta um problema de segurança, tudo isso
roda dentro da mesma plataforma, com regras automáticas, aprovações e
rastreamento.

O nome "ServiceNow" significa "Serviço Agora". A ideia é entregar serviço
de forma rápida e eficiente, no momento em que o usuário precisa.

---

## O que é uma Instância

Uma instância é uma cópia única e isolada da plataforma ServiceNow rodando
na nuvem. É como se fosse um apartamento dentro de um grande prédio. O
prédio é a ServiceNow (a empresa), e cada apartamento é uma instância de
um cliente.

Quando uma empresa contrata o ServiceNow, ela recebe uma ou mais instâncias.
Cada instância tem seu próprio endereço na web, seu próprio banco de dados,
suas próprias configurações e suas próprias customizações.

> **Exemplo de endereço de instância:** `https://minhaempresa.service-now.com`

O que você faz em uma instância não afeta as outras. É por isso que a
ServiceNow consegue atender milhares de clientes diferentes com a mesma
plataforma.

---

## Tipos de instância

| Tipo                       | Descrição                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| **Produção**               | Instância "ao vivo" onde os usuários reais trabalham. Nunca se desenvolve código diretamente nela. |
| **Desenvolvimento (Dev)**  | Onde os desenvolvedores criam e testam novas funcionalidades. Pode "quebrar" à vontade.            |
| **Teste (QA)**             | Onde o time de qualidade valida as funcionalidades antes de irem para produção.                    |
| **Homologação (Pre-Prod)** | Último ambiente antes da produção. Idêntica à produção, mas sem usuários reais.                    |

> Em empresas pequenas, às vezes você tem apenas Produção e Desenvolvimento.
> Em empresas grandes, pode ter todos esses ambientes.

---

## O que é o PDI (Personal Developer Instance)

PDI significa **Personal Developer Instance**. É uma instância de
desenvolvimento gratuita e pessoal que a ServiceNow disponibiliza para
quem quer aprender ou testar coisas na plataforma.

O PDI é seu "playground" pessoal. Você pode criar tabelas, escrever
scripts, testar integrações, quebrar tudo e reconstruir. Ninguém mais
vê o que você faz lá.

**Características do PDI:**

- **Gratuito** — basta criar conta em `developer.servicenow.com`
- **Expira se não for usado** — mais de 10 dias sem acesso e a instância
  pode ser desligada, mas é fácil reativar ou pedir uma nova
- **Limitado** — menos memória e processamento que uma instância
  empresarial, mas suficiente para aprendizado
- **Renovável** — se bagunçar muito, basta solicitar uma nova instância

---

## Para que serve cada tipo (visão do desenvolvedor)

| Instância           | O que você faz lá                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------- |
| **Produção**        | Apenas hotfixes urgentes, com muito cuidado                                                  |
| **Desenvolvimento** | Onde você passa a maior parte do tempo criando Business Rules, Client Scripts, Flow Designer |
| **Teste (QA)**      | Valida que sua entrega não quebrou nada que já funcionava                                    |
| **PDI**             | Laboratório pessoal para estudo, experimentação e portfólio                                  |

---

## Como funciona o fluxo entre instâncias

O ServiceNow não permite copiar e colar código de uma instância para outra.
O mecanismo oficial para mover customizações é o **Update Set** — um pacote
que contém todas as mudanças que você fez: novos campos, scripts, formulários
personalizados, UI Policies, etc.

**Fluxo típico:**

```
PDI / Dev → Update Set → Teste (QA) → Homologação → Produção
```

Como desenvolvedor júnior, saber criar Update Sets e mover entre ambientes
é uma das habilidades mais práticas e mais perguntadas em entrevistas.

---

## Passo a passo — Criar e acessar seu PDI

**Passo 1 — Criar conta**
Acesse `developer.servicenow.com` → Sign In → Register now → confirme o e-mail.

**Passo 2 — Solicitar a instância**
Manage → Instances → Request an instance → escolha a versão mais recente

**Passo 3 — Acessar**
Acesse o endereço no navegador → login com usuário `admin` e a senha gerada.

**Passo 4 — Explorar os módulos principais**
No filtro de navegação (lado esquerdo), digite `incident` para ver a lista
de incidentes ou `users` para ver os usuários padrão da instância.

**Passo 5 — Manter a instância ativa**
Acesse pelo menos uma vez por semana. Se desligar, solicite uma nova instância
no developer portal.

---

## Exemplo de script — informações da instância

Para rodar no **Background Scripts** (digite "Scripts Background" no
filtro de navegação):

```javascript
var instancia = gs.getProperty("instance_name");
var versao = gs.getProperty("glide.product.version");
var usuario = gs.getUserName();

gs.info("=== INFORMAÇÕES DA INSTÂNCIA ===");
gs.info("Nome da instância: " + instancia);
gs.info("Versão do ServiceNow: " + versao);
gs.info("Usuário logado: " + usuario);
gs.info("URL da instância: " + gs.getProperty("glide.servlet.uri"));
gs.print(
  "Script executado com sucesso. Verifique os logs em System Logs > System Log > All",
);
```

**O que esse script faz:**

- Pega o nome da instância (ex: `dev12345`)
- Pega a versão do ServiceNow (ex: Australia)
- Pega o nome do usuário que está executando
- Mostra a URL completa da instância

---

## Erros comuns

| Erro                                  | Correção                                                                           |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| Deixar o PDI expirar                  | Acesse pelo menos uma vez por semana. Mantenha backup dos scripts importantes.     |
| Confundir PDI com produção            | Nunca use dados reais ou sensíveis no PDI. Trate como ambiente de estudo.          |
| Desenvolver diretamente em produção   | Sempre desenvolva em Dev ou PDI, teste em QA e promova via Update Set.             |
| Perder a senha do admin               | Anote em gerenciador de senhas. Pode resetar em Manage Instances → Reset password. |
| Achar que PDI = instância empresarial | PDI tem limitações de performance e plugins. Serve para estudo e protótipos.       |

---

## Links úteis

- [Site de desenvolvedores ServiceNow](https://developer.servicenow.com)
- [Documentação oficial — Instâncias](https://docs.servicenow.com/bundle/tokyo-servicenow-platform/page/administer/instance-configure/concept/c_Instance.html)
- [Status das instâncias](https://status.servicenow.com)
- [Comunidade ServiceNow](https://www.servicenow.com/community/)

---

## Minhas anotações pessoais

- O Developer Program dá acesso não só ao PDI, mas também a cursos,
  laboratórios e comunidade ativa — vale explorar tudo.
- Na vida real, você raramente vai criar uma instância do zero. Seu trabalho
  como desenvolvedor será acessar instâncias que já existem e receber
  credenciais do time.
- O nome das instâncias em empresas grandes costuma seguir um padrão:
  `dev-empresa`, `test-empresa`, `prod-empresa`. Pergunte ao time antes
  de começar.
- Mantenha um arquivo local com os endereços e credenciais de cada instância
  que você acessa — nunca suba esse arquivo para repositório público.
- Quando solicitar o PDI, prefira "com dados de demonstração" — assim você
  já tem incidentes, usuários e artigos de conhecimento para praticar.
- Trate seu PDI como projeto profissional: mantenha organizado, documente
  o que faz e crie projetos completos, não scripts soltos.
