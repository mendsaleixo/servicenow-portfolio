# Testes — Portal de Reparo de Computadores

[← Voltar ao projeto](../README.md)

Matriz de cobertura de testes por regra de negócio ([`regras-negocio.md`](regras-negocio.md)), com o status real de cada cenário — evidenciado por screenshot, apenas configurado (sem print da execução) ou ainda não coberto.

> Este documento reflete o que existe de evidência no repositório (`../screenshots/`), não um log de execução formal com datas/QA — não há esse registro para este projeto.

---

## Legenda

| Status            | Significado                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| ✅ Evidenciado     | Há screenshot mostrando o resultado real (dado preenchido, execução completada) |
| 🔧 Configurado     | Há screenshot da configuração/implementação, mas não da execução em si          |
| ⬜ Não evidenciado | Sem screenshot; precisa ser testado e documentado                               |

---

## Cobertura por regra de negócio

| Regra                                                                                            | Cenário de teste                                                     | Status            | Evidência                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [RN001](regras-negocio.md#rn001--filtro-de-ativos-por-usuário)                                   | Campo Equipamento só lista ativos vinculados ao usuário logado       | ⬜ Não evidenciado | —                                                                                                                                                                           |
| [RN002](regras-negocio.md#rn002--preenchimento-automático-de-endereço-por-cep) (03A · GlideAjax) | CEP válido preenche Rua/Bairro/Cidade/UF automaticamente             | ✅ Evidenciado     | [`12-prc-03a-cep-preenchimento.png`](../screenshots/12-prc-03a-cep-preenchimento.png) — CEP 70650394 → Brasília/DF                                                          |
| RN002 (03A · GlideAjax) — CEP inválido                                                           | Erro tratado e exibido ao usuário                                    | ✅ Evidenciado     | [`13-prc-03a-cep-erro.png`](../screenshots/13-prc-03a-cep-erro.png) — "Erro ao consultar ViaCEP."                                                                           |
| RN002 (03B · IntegrationHub)                                                                     | Action resolve CEP via Connection Alias, sem script no Client Script | ✅ Evidenciado     | [`19-prc-03b-cep-preenchimento-ih.png`](../screenshots/19-prc-03b-cep-preenchimento-ih.png) — Execution Details, CEP 41720000 → Salvador/BA, `Step Status: Success` (420ms) |
| RN002 (03B · IntegrationHub) — CEP inválido                                                      | Erro tratado no fluxo low-code                                       | 🔧 Configurado     | [`20-prc-03b-cep-erro-ih.png`](../screenshots/20-prc-03b-cep-erro-ih.png)                                                                                                   |
| [RN003](regras-negocio.md#rn003--atualização-do-status-do-ativo-in-maintenance)                  | Ativo muda para In Maintenance ao ser recebido pela TI               | 🔧 Configurado     | Step "Update Computer Record" no Flow — ver [`fluxo-processo.md`](fluxo-processo.md#passo-a-passo)                                                                          |
| [RN004](regras-negocio.md#rn004--atualização-do-status-do-ativo-in-transit)                      | Ativo muda para In Transit no envio                                  | ⬜ Não evidenciado | Não é um step isolado no Flow capturado — ver nota em [`fluxo-processo.md`](fluxo-processo.md)                                                                              |
| [RN005](regras-negocio.md#rn005--atualização-do-status-do-ativo-in-use)                          | Ativo volta para In Use após confirmação do usuário                  | 🔧 Configurado     | Step "Update Catalog Task Record" — [`27-prc-04-flow-executed.png`](../screenshots/27-prc-04-flow-executed.png)                                                             |
| [RN006](regras-negocio.md#rn006--encerramento-do-fluxo)                                          | Flow só encerra após confirmação, sem timeout automático             | 🔧 Configurado     | Step "Wait For Catalog Task Condition" — [`26-prc-04-wait-condition.png`](../screenshots/26-prc-04-wait-condition.png)                                                      |
| [RN007](regras-negocio.md#rn007--obrigatoriedade-da-descrição-detalhada)                         | "Descrição detalhada" fica obrigatória condicionalmente              | ✅ Evidenciado¹    | [`06-prc-02-rn007-mandatory-working.png`](../screenshots/06-prc-02-rn007-mandatory-working.png)                                                                             |
| [RN008](regras-negocio.md#rn008--notificações-por-etapa)                                         | Notificação disparada em cada mudança de status                      | 🔧 Configurado     | [`32-prc-05-event-registry.png`](../screenshots/32-prc-05-event-registry.png), [`30-prc-05-notifications-list.png`](../screenshots/30-prc-05-notifications-list.png)        |
| [RN009](regras-negocio.md#rn009--validação-de-usuário-gestor)                                    | Gestor Aprovador preenchido a partir do manager do solicitante       | 🔧 Configurado     | Step "Ask For Approval on Requested Item" — [`23-prc-04-approval-pending.png`](../screenshots/23-prc-04-approval-pending.png)                                               |
| [RN010](regras-negocio.md#rn010--impedir-aprovação-duplicada)                                    | Aprovação/rejeição não pode ser desfeita ou reaplicada               | ⬜ Não evidenciado | —                                                                                                                                                                           |

¹ A evidência mostra a obrigatoriedade condicional funcionando com **Categoria do problema = "Hardware Crítico"**, não exatamente `tipo_problema = "Complexo"` como descrito na regra — mecânica confirmada, mas vale conferir se o nome do campo/valor no `regras-negocio.md` está atualizado com a versão final do Catalog Item.

---

## Cenários ainda sem cobertura (próximos passos)

- **RN001:** testar com dois usuários diferentes e confirmar que cada um só vê seus próprios ativos no campo Equipamento.
- **RN004:** localizar ou criar o step/regra que move o ativo para In Transit e capturar evidência.
- **RN010:** tentar aprovar/rejeitar duas vezes o mesmo RITM e confirmar que a segunda ação é bloqueada ou ignorada.
- Testes de carga/volume (múltiplas solicitações simultâneas) — fora do escopo até aqui.
