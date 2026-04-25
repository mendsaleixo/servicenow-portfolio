# Update Sets (fundamentos)

**Data:** 23/04/2026
**Semana:** 1 — Fundamentos
**Fonte:** SNAF Módulo 7 + Prática própria
**Tópicos relacionados:** Development Lifecycle, Release Management, Transporte de Customizações

---

## O que é (definição simples)

Um Update Set é um pacote que agrupa todas as customizações e configurações feitas em uma instância ServiceNow, permitindo que elas sejam movidas de forma controlada para outra instância (ex: de Desenvolvimento para Teste, ou de Teste para Produção).

Pense em um Update Set como uma "caixa de mudanças". Você faz várias alterações na sua instância de desenvolvimento — cria campos, escreve scripts, configura formulários. Em vez de anotar tudo e repetir manualmente na próxima instância, você coloca cada alteração dentro dessa caixa. Depois, move a caixa inteira para o próximo ambiente, e todas as alterações são aplicadas automaticamente.

Sem Update Sets, o desenvolvimento no ServiceNow seria um pesadelo: anotar cada campo criado, cada script, cada formulário modificado, e refazer tudo manualmente em produção — com enorme risco de erro.

---

## Por que Update Sets são essenciais

O ServiceNow não permite desenvolver diretamente em produção por dois motivos:

- **Segurança:** um erro de script pode parar o sistema para todos os usuários
- **Controle:** toda mudança precisa ser revisada, testada e aprovada antes de ir para produção

O Update Set resolve três problemas fundamentais:

- **Transporte:** move customizações entre instâncias sem repetir trabalho manual
- **Rastreabilidade:** mostra exatamente quais mudanças foram feitas, por quem e quando
- **Rollback:** se algo der errado, você pode reverter o Update Set inteiro de uma só vez

---

## O que pode ir dentro de um Update Set

Quase tudo o que você configura no ServiceNow pode ser capturado:

- Campos personalizados (novos campos em formulários existentes)
- Tabelas customizadas
- Client Scripts (onLoad, onChange, onSubmit, onCellEdit)
- Business Rules (before, after, query)
- UI Policies
- UI Actions (botões e links personalizados)
- Script Includes
- Flow Designer
- Catalog Items e Variable Sets
- ACLs (controle de acesso)
- Relatórios e dashboards
- Notificações por e-mail
- Listas e filtros salvos

---

## O que NÃO deve ir dentro de um Update Set

- **Dados de produção:** registros de incidentes, problemas, usuários (com exceção de usuários de sistema)
- **Senhas e credenciais:** configurações de integração são diferentes entre ambientes
- **Logs e arquivos temporários**
- **Propriedades do sistema que variam por ambiente** (URL da instância, servidor SMTP)
- **Plugins** que precisam ser ativados manualmente

> **Regra de ouro:** Update Sets transportam **configuração** (o que você construiu), não **dados** (o que os usuários criaram).

---

## Os três tipos de Update Set

**Update Set Local (Original):** criado na instância de desenvolvimento. Captura as mudanças feitas enquanto está ativo. Você pode ter vários abertos, mas apenas um é "Current" por vez.

**Update Set Exportado:** quando concluído, é marcado como "Complete" e preparado para mover. Pode ser baixado como arquivo XML ou recuperado diretamente por outra instância.

**Update Set Aplicado (Committed):** quando chega na instância de destino, é "aplicado" (committed) — o ServiceNow lê todas as mudanças e as executa no ambiente de destino.

---

## Ciclo de vida de um Update Set (passo a passo)

### Passo 1 — Criar na instância de Desenvolvimento

Acesse `sys_update_set.list` → clique em **New**. Dê um nome descritivo e uma breve descrição. O estado inicial é "In Progress".

### Passo 2 — Ativar como Current

No formulário do Update Set, clique em **Set as Current Update Set** (em Related Links). A partir desse momento, todas as customizações feitas serão capturadas automaticamente neste Update Set.

### Passo 3 — Desenvolver as mudanças

Crie campos, scripts, formulários — o ServiceNow captura tudo automaticamente no Update Set ativo.

### Passo 4 — Completar o Update Set

Após terminar, marque o Update Set como **Complete**. Nenhuma mudança adicional será capturada (a menos que seja reaberto).

### Passo 5 — Mover para a instância de Teste

Via "Retrieve Update Set" (buscando diretamente de outra instância) ou via download/upload do arquivo XML.

### Passo 6 — Aplicar (Commit) na instância de Teste

Na instância de Teste, o Update Set aparece como "Loaded". Após revisão, clique em **Commit Update Set**. O ServiceNow aplica todas as mudanças.

### Passo 7 — Testar

O time de QA testa as funcionalidades. Se houver problemas, o Update Set é rejeitado e o desenvolvedor corrige no Dev com um novo Update Set.

### Passo 8 — Mover e aplicar em Produção

O mesmo processo se repete. Após o commit em Produção, as mudanças estão disponíveis para todos os usuários.

---

## Bons nomes para Update Sets

**Exemplos de bons nomes:**

```
INC-001 - Criar campo Setor Afetado no formulário de Incidente
PRB-002 - Implementar UI Policy para validação de prioridade
REQ-003 - Criar Catalog Item de Solicitação de Notebook
FIX-BUG-1234 - Corrigir Business Rule de notificação de e-mail
```

**Exemplos de maus nomes:**

```
Update Set 1
teste
coisas novas
mudancas
```

Além do nome, sempre preencha a descrição com detalhes: o que foi feito, por quê, qual ticket está relacionado.

---

## Conflitos de Update Sets

Conflitos acontecem quando dois Update Sets diferentes tentam modificar o mesmo objeto.

**Como evitar:**

- Trabalhe em Update Sets pequenos e focados (um por funcionalidade)
- Comunique-se com o time sobre o que cada um está desenvolvendo
- Se houver conflito, o ServiceNow avisa e você resolve manualmente (escolhendo qual versão prevalece)

---

## Update Set vs Source Control (Git)

Para equipes pequenas (1-3 desenvolvedores), Update Sets são suficientes. Para equipes maiores, a ServiceNow oferece integração com Git (Source Control) via App Engine Studio. Para o início da carreira e para o PDI pessoal, Update Sets são mais que suficientes.

---

## Erros comuns

| Erro                                    | Correção                                                              |
| --------------------------------------- | --------------------------------------------------------------------- |
| Trabalhar com o Update Set errado ativo | Sempre verifique qual Update Set está como "Current" antes de começar |
| Update Set muito grande (megaset)       | Divida em Update Sets menores por funcionalidade                      |
| Esquecer de completar o Update Set      | Ao terminar as customizações, imediatamente marque como "Complete"    |
| Colocar dados no Update Set             | Desative o Update Set atual antes de criar dados de teste             |
| Não documentar o Update Set             | Sempre preencha nome e descrição de forma clara e detalhada           |

---

## Passo a passo prático no PDI

**1.** No filtro de navegação, digite `update set` → clique em **Local Update Sets**

**2.** Clique em **New** e preencha:

| Campo       | Valor                                                                   |
| ----------- | ----------------------------------------------------------------------- |
| Name        | `Semana1-Fundamentos-MendelsonAleixo`                                   |
| Description | Campos personalizados, UI Policies e filtros criados durante a Semana 1 |
| State       | In Progress                                                             |

**3.** Abra o Update Set criado → clique em **Set as Current Update Set**

**4.** Faça suas customizações normalmente — tudo será capturado automaticamente

**5.** Para verificar o que foi capturado: role para baixo na aba **Customer Updates** da Related List

**6.** Ao terminar: clique em **Complete**

**7.** Para exportar: clique em **Export to XML** e salve o arquivo na pasta `update-sets/` do seu repositório

---

## O que estudar depois

- **Semana 4:** Update Sets em equipe, conflitos e resolução
- **Semana 6:** Update Sets para projetos de portfólio (exportar seus projetos como Update Sets)
- **Futuro:** Integração com Git e Source Control

---

## Exemplo de código (para consulta futura — Semana 3 ou 4)

Script que lista seus Update Sets em andamento e quantas mudanças cada um contém:

```javascript
var grUs = new GlideRecord("sys_update_set");
grUs.addQuery("state", "=", "in_progress");
grUs.addQuery("sys_created_by", "=", gs.getUserName());
grUs.orderByDesc("sys_created_on");
grUs.query();

gs.info("=== MEUS UPDATE SETS EM ANDAMENTO ===");
while (grUs.next()) {
  gs.info("Nome: " + grUs.name);
  gs.info("Descrição: " + grUs.description);
  gs.info("Criado em: " + grUs.sys_created_on);

  var grChanges = new GlideRecord("sys_update_xml");
  grChanges.addQuery("update_set", grUs.sys_id);
  grChanges.query();
  gs.info("Total de mudanças: " + grChanges.getRowCount());
  gs.info("---");
}
```

---

## Resumo para guardar

| Conceito          | Definição                                                                           |
| ----------------- | ----------------------------------------------------------------------------------- |
| **O que é**       | Pacote de customizações transportável entre instâncias                              |
| **O que vai**     | Campos, tabelas, scripts, formulários, regras, configurações                        |
| **O que NÃO vai** | Dados (registros), senhas, logs                                                     |
| **Fluxo básico**  | Criar → Ativar como Current → Desenvolver → Completar → Mover → Commit              |
| **No PDI**        | Crie Update Sets para organizar seus projetos, mesmo sem outra instância para mover |

O Update Set é a ferramenta que separa um desenvolvedor amador (que faz mudanças direto em produção) de um profissional (que segue o fluxo controlado). Você está aprendendo o jeito certo desde o início.
