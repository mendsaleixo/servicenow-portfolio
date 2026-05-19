# Regras de Negócio — Portal de Reparo de Computador

## RN001 — Filtro de ativos por usuário

**Descrição:** O usuário só pode selecionar, no campo "Equipamento", ativos que estejam vinculados ao seu próprio usuário (campo `owned_by` na tabela `cmdb_ci_computer`).

**Implementação:** Reference Qualifier no Catalog Item.

**Fórmula:** `owned_by = javascript:gs.getUserID()`

---

## RN002 — Preenchimento automático de endereço por CEP

**Descrição:** Ao informar o CEP, os campos rua, bairro, cidade e UF devem ser preenchidos automaticamente via integração com a API ViaCEP.

**Implementação:** Client Script (onChange) + GlideAjax + Script Include.

**Fluxo:** Usuário digita CEP → Client Script chama Script Include → Script Include consome API ViaCEP → Retorna dados → Client Script preenche campos.

---

## RN003 — Atualização do status do ativo (In Maintenance)

**Descrição:** Quando a equipe de TI recebe o equipamento fisicamente, o status do ativo na CMDB deve ser atualizado para "In Maintenance".

**Implementação:** Flow Designer (após aprovação e confirmação de recebimento pela TI).

**Status:** `install_status` = 7 (In Maintenance) ou customizado.

---

## RN004 — Atualização do status do ativo (In Transit)

**Descrição:** Quando o equipamento é enviado (usuário → TI ou TI → usuário), o status do ativo deve ser atualizado para "In Transit".

**Implementação:** Flow Designer.

**Status:** `install_status` = 2 (In Transit) ou customizado.

---

## RN005 — Atualização do status do ativo (In Use)

**Descrição:** Após o usuário confirmar o recebimento do equipamento reparado, o status do ativo deve voltar para "In Use".

**Implementação:** Flow Designer + Record Producer (confirmação do usuário).

**Status:** `install_status` = 1 (In Use).

---

## RN006 — Encerramento do fluxo

**Descrição:** O fluxo só é encerrado após o usuário confirmar o recebimento do equipamento reparado. Não deve haver encerramento automático baseado em tempo.

**Implementação:** Flow Designer com condição de espera (Wait for condition) ou Approval (usuário confirma).

---

## RN007 — Obrigatoriedade da descrição detalhada

**Descrição:** O campo "Descrição detalhada" deve ser obrigatório apenas quando o tipo de problema for classificado como "Complexo".

**Implementação:** UI Policy.

**Regra:** Se `tipo_problema` = "Complexo" → `descricao_detalhada` obrigatório.

---

## RN008 — Notificações por etapa

**Descrição:** Cada mudança de status deve gerar uma notificação por e-mail para os envolvidos.

**Etapas com notificação:**

- Solicitação criada → Usuário (confirmação de envio)
- Gestor aprova/rejeita → Usuário e TI
- Tarefa criada → TI
- Equipamento reparado → Usuário
- Usuário confirma recebimento → TI e Gestor
- Fluxo encerrado → Usuário, TI e Gestor

**Implementação:** Notifications no Flow Designer.

---

## RN009 — Validação de usuário gestor

**Descrição:** O campo "Gestor Aprovador" deve ser preenchido automaticamente com o gestor direto do solicitante (campo `manager` na tabela `sys_user`).

**Implementação:** Default value no Catalog Item (via script) ou Flow Designer.

**Fórmula:** `current.caller_id.manager`

---

## RN010 — Impedir aprovação duplicada

**Descrição:** Uma vez que o gestor aprova ou rejeita, a ação não pode ser desfeita nem reaplicada pelo mesmo usuário.

**Implementação:** Flow Designer com verificação de estado.
