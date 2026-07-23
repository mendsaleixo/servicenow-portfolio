# Convenções de Commit

Este repositório segue o padrão [Conventional Commits](https://www.conventionalcommits.org/) para manter um histórico claro e rastreável do progresso dos estudos e projetos.

## Formato

```
<prefixo>(<escopo opcional>): <descrição curta>

- detalhe adicional (opcional)
- detalhe adicional (opcional)
```

## Prefixos utilizados

| Prefixo    | Quando usar                                                                 | Exemplo                                                               |
| ---------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `feat`     | Nova funcionalidade implementada em um projeto (ex: uma etapa do PRC)       | `feat(prc-04): implement repair workflow automation`                  |
| `docs`     | Criação ou atualização de documentação, README ou artigos de estudo         | `docs: adiciona destaque visual e detalha progresso do projeto ativo` |
| `fix`      | Correção de bug ou erro em script/configuração                              | `fix(prc-03): corrige validação de CEP inválido`                      |
| `refactor` | Reorganização de código sem mudar comportamento                             | `refactor(prc-02): simplifica lógica da UI Policy`                    |
| `chore`    | Tarefas de manutenção (organização de pastas, renomeação de arquivos, etc.) | `chore: reorganiza estrutura de screenshots`                          |

## Convenção de escopo

O escopo (entre parênteses) identifica o projeto ou sprint afetado, sempre em **minúsculo**:

- `prc-01`, `prc-02`, `prc-03a`, `prc-03b`, `prc-04`, `prc-05` → sprints do Portal de Reparo de Computadores
- Outros projetos devem seguir o mesmo padrão (ex: `onboarding`, `solicitacao-equip`)

## Commits com corpo (múltiplas linhas)

Para evitar que as linhas do corpo do commit fiquem "coladas" em uma só, use múltiplos `-m`:

```bash
git commit -m "feat(prc-06): implement slack integration" \
  -m "- Configura Connection Alias" \
  -m "- Cria Slack Webhook Action"
```

Ou, para mensagens mais longas, prefira abrir o editor padrão:

```bash
git commit
```
